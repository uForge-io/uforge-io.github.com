---
icon: lucide/hard-drive
title: "Use External Flash"
description: "Configure, access, mount, and port external NOR Flash, NAND Flash, and PSRAM with SiFli-SDK."
tags: [Develop, SiFli-SDK, Application Notes, Flash]
---

# Use External Flash

This article adapts SiFli's [Flash usage guide](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/app_note/flash_usage.html) into a practical integration path for SF32LB52x, SF32LB55x, SF32LB56x, and SF32LB58x. It covers controller configuration, family-specific address spaces, RT-Thread direct access, MTD filesystems, reserved regions, new Flash-part porting, PSRAM, and J-Link Open Flashloader support.

The source guide uses `FLASH` for both NOR Flash and NAND Flash. The examples preserve its SDK symbols and device names; confirm the target SDK branch and board schematic before copying a configuration into a product.

## 1. Controller model and capabilities

The SiFli Flash controller can connect several Flash devices at the same time:

<div align="center"><em>Table: Flash-controller capabilities by family</em></div>

| Family | Maximum devices | PSRAM line modes covered by this guide | Controller naming in the examples |
|---|---:|---|---|
| SF32LB52x | Not tabulated in the consolidated source details | Verify the target family guide | Verify the target SDK's QSPI/MPI naming |
| SF32LB55x | 4 | 4-line PSRAM only | QSPI |
| SF32LB56x | 4 | 4-line and 8-line PSRAM | MPI/QSPI compatibility names |
| SF32LB58x | 5 | 4-line, 8-line, and 16-line PSRAM | MPI/QSPI compatibility names |

The devices can be NOR Flash or NAND Flash. Compared with SF32LB55x, the SF32LB58x and SF32LB56x controllers also support 8-line and 16-line PSRAM. The controller is called QSPI on the earlier arrangement and MPI on the newer memory-oriented arrangement.

The usual controller assignments are:

- **SF32LB55x:** controller 1 normally handles the on-chip NOR Flash; controllers 2 and 3 depend on the board design; controller 4 connects to NOR Flash and can be accessed by LCPU (and by HCPU as well).
- **SF32LB58x:** controllers 1 and 2 normally handle on-chip NOR Flash or PSRAM, depending on the package; controllers 3 and 4 depend on the board design; controller 5 is on-chip NOR Flash and can be accessed by LCPU (and by HCPU as well).
- **SF32LB56x:** controllers 1 and 2 normally handle on-chip NOR Flash or PSRAM, depending on the package; controller 3 depends on the board design; controller 5 is on-chip NOR Flash and can be accessed by LCPU (and by HCPU as well). There is no controller 4.

The driver is split into two layers. The HAL layer provides hardware-register access and simple logic. The DRV layer provides Flash read/write/erase operations, initialization and control, and interfaces used by devices and filesystems.

The controller supports single-line and four-line Flash operations, DMA acceleration, page programming, page reads, and sector/block erase. NOR Flash can also be read directly through the AHB memory interface. The basic erase unit depends on the Flash part.

## 2. Configure QSPI or MPI

Flash attributes and usage are configured through `menuconfig`, which generates `rtconfig.h`. The options include whether a controller is enabled, DMA usage, MTD registration, filesystem settings, memory size, and the manual/device ID.

### SF32LB55x QSPI example

From `menuconfig`, the source guide enters **RTOS → On-chip Peripheral Driver → Enable QSPI → Enable QSPI Driver → QSPI Controller 1 Enable** and then selects the QSPI1 mode, filesystem use, memory size, and manual/device ID.

The corresponding `rtconfig.h` definitions are:

```c
#define BSP_USING_QSPI 1            /*使能QSPI 模块*/
#define BSP_USING_SPI_FLASH 1       /*使能QSPI 控制FLASH功能（为了兼容以前版本）*/
#define BSP_ENABLE_QSPI1 1          /*使能QSPI控制器1*/
#define BSP_QSPI1_USING_DMA 1       /*QSPI1 使用FIFO DMA */
#define BSP_QSPI1_MODE 0            /*QSPI1 连接控制Nor FLASH*/
#define BSP_QSPI1_MEM_SIZE 4        /*配置FLASH1的总大小为4MB*/
#define BSP_QSPI1_CHIP_ID 0         /*FLASH1 DEV ID 由系统获取，不需要手动输入（这个配置是为了当有些FLASH获取ID的命令时序与默认设置不同时，手动添加ID以便查找正确的命令表）*/
```

For a second NOR Flash and a third NAND Flash, the source examples are:

```c
#define BSP_ENABLE_QSPI2 1          /*使能QSPI2 模块*/
#define BSP_QSPI2_USING_DMA 1       /*使能QSPI2 FIFO DMA <*/
#define BSP_QSPI2_MODE 0            /*设置FLASH2 为NOR-FLASH*/
#define BSP_QSPI2_MTD_EN 1          /*FLASH2 注册MTD 设备 */
#define BSP_QSPI2_FS_START 2048     /*FLASH2 MTD 设备可访问地址的起始位置为8MB(2048*4K)*/
#define BSP_QSPI2_FS_SIZE 2048      /*长度为8MB(2048*4KB)*/
#define BSP_QSPI2_MEM_SIZE 32       /*配置FLASH2的总大小为32MB*/
#define BSP_QSPI2_CHIP_ID 0         /*FLASH2 DEV ID 由系统获取，不需要手动输入*/
```

```c
#define BSP_ENABLE_QSPI3 1          /*使能QSPI3 模块*/
#define BSP_QSPI3_USING_DMA 1       /*使能QSPI3 FIFO DMA <*/
#define BSP_QSPI3_MODE 1            /*设置FLASH2 为NAND-FLASH*/
#define BSP_QSPI3_MEM_SIZE 128      /*配置FLASH3的总大小为128MB*/
#define BSP_QSPI3_CHIP_ID 0         /*FLASH3 DEV ID 由系统获取，不需要手动输入*/
```

### SF32LB58x MPI example

On the SF32LB58x EVB, the source guide enters **RTOS → On-chip Peripheral Driver → Enable MPI → Enable QSPI Driver → MPI Controller 1 Enable**, then selects the MPI mode, memory size, and other device options. The mode values are `0 NOR`, `1 NAND`, `2 PSRAM`, `3 OPSRAM`, `4 HPSRAM`, and `5 LEGACY_PSRAM`.

The common MPI enable and per-controller examples are:

```c
#define BSP_USING_MPI 1             /*使能MPI 模块*/
#define BSP_USING_SPI_FLASH 1       /*使能MPI 控制FLASH功能（为了兼容之前版本）*/
```

```c
#define BSP_ENABLE_MPI1 1           /*使能MPI 1 模块*/
#define BSP_ENABLE_QSPI1 1          /*使能MPI 1（为了兼容之前版本）*/
#define BSP_MPI1_MODE_4 1           /*MPI1 设置为功能4---16线PSRAM*/
#define BSP_QSPI1_MODE 4
#define BSP_USING_PSRAM1 1
#define BSP_QSPI1_MEM_SIZE 32       /*配置MPI1的总大小为16MB*/
```

```c
#define BSP_ENABLE_MPI2 1           /*使能MPI 2 模块*/
#define BSP_ENABLE_QSPI2 1          /*使能MPI 2（为了兼容之前版本）*/
#define BSP_MPI2_MODE_4 1           /*MPI2 设置为功能4---16线PSRAM*/
#define BSP_QSPI2_MODE 4
#define BSP_USING_PSRAM2 1
#define BSP_QSPI2_MEM_SIZE 32       /*配置MPI2的总大小为32MB*/
```

```c
#define BSP_ENABLE_MPI3 1           /*使能MPI 3 模块*/
#define BSP_ENABLE_QSPI3 1          /*使能MPI 3（为了兼容之前版本）*/
#define BSP_MPI3_MODE_0 1           /*MPI3 设置为功能0---NOR FLASH*/
#define BSP_QSPI3_MODE 0
#define BSP_USING_NOR_FLASH3 1
#define BSP_QSPI3_USING_DMA 1       /*MPI3 使用DMA*/
#define BSP_QSPI3_MEM_SIZE 32       /*配置MPI2的总大小为32MB*/
```

```c
#define BSP_ENABLE_MPI4 1           /*使能MPI 4 模块*/
#define BSP_ENABLE_QSPI4 1          /*使能MPI 4（为了兼容之前版本）*/
#define BSP_MPI4_MODE_1 1           /*MPI4 设置为功能1---NAND FLASH*/
#define BSP_QSPI4_MODE 1
#define BSP_USING_NAND_FLASH4 1
#define BSP_QSPI4_USING_DMA 1       /*MPI5 使用DMA*/
#define BSP_QSPI4_MEM_SIZE 128      /*配置MPI2的总大小为128MB*/
```

```c
#define BSP_ENABLE_MPI5 1           /*使能MPI 5 模块*/
#define BSP_ENABLE_QSPI5 1          /*使能MPI 5（为了兼容之前版本）*/
#define BSP_MPI5_MODE_0 1           /*MPI5 设置为功能0---NOR FLASH*/
#define BSP_QSPI5_MODE 0
#define BSP_USING_NOR_FLASH5 1
#define BSP_QSPI5_USING_DMA 1       /*MPI5 使用DMA*/
#define BSP_QSPI5_MEM_SIZE 4        /*配置MPI5的总大小为4MB*/
```

SF32LB56x uses essentially the same MPI configuration as SF32LB58x, except that MPI4 is not present.

## 3. Flash address spaces

The following ranges are the maximum controller windows. The actual usable size comes from the Flash part selected in `menuconfig`, not from the maximum window alone.

### SF32LB55x

<div align="center"><em>Table: SF32LB55x Flash controller address windows</em></div>

| Controller | Start | End | Maximum window | EVB description |
|:-----------|:------|:----|:---------------|:----------------|
| FLASH1 | `0x10000000` | `0x11FFFFFF` | 32 × 1024 × 1024 bytes | EVB capacity 4 MB |
| FLASH2 | `0x64000000` | `0x67FFFFFF` | 64 × 1024 × 1024 bytes | EVB capacity 32 MB |
| FLASH3 | `0x68000000` | `0x6FFFFFFF` | 128 × 1024 × 1024 bytes | EVB not enabled |
| FLASH4 | `0x12000000` | `0x13FFFFFF` | 32 × 1024 × 1024 bytes | EVB not enabled |

The controller-base definitions are in `mem_map.h`:

```c
#define QSPI1_MEM_BASE   (0x10000000)
#define QSPI2_MEM_BASE   (0x64000000)
#define QSPI3_MEM_BASE   (0x68000000)
#define QSPI4_MEM_BASE   (0x12000000)
```

### SF32LB58x

**C-BUS address space**

<div align="center"><em>Table: SF32LB58x C-BUS address space</em></div>

| Controller | Start | End | Maximum window | EVB description |
|:-----------|:------|:----|:---------------|:----------------|
| MPI1 | `0x10000000` | `0x11FFFFFF` | 32 × 1024 × 1024 bytes | EVB capacity 16 MB |
| MPI2 | `0x12000000` | `0x13FFFFFF` | 32 × 1024 × 1024 bytes | EVB capacity 16 MB |
| MPI3 | `0x14000000` | `0x17FFFFFF` | 64 × 1024 × 1024 bytes | EVB capacity 32 MB |
| MPI4 | `0x18000000` | `0x1BFFFFFF` | 64 × 1024 × 1024 bytes | EVB capacity 64 MB |
| MPI5 | `0x1C000000` | `0x1FFFFFFF` | 64 × 1024 × 1024 bytes | EVB capacity 4 MB |

**S-BUS address space**

<div align="center"><em>Table: SF32LB58x S-BUS address space</em></div>

| Controller | Start | End | Maximum window | EVB description |
|:-----------|:------|:----|:---------------|:----------------|
| MPI1 | `0x60000000` | `0x61FFFFFF` | 32 × 1024 × 1024 bytes | EVB capacity 16 MB |
| MPI2 | `0x62000000` | `0x63FFFFFF` | 32 × 1024 × 1024 bytes | EVB capacity 16 MB |
| MPI3 | `0x64000000` | `0x67FFFFFF` | 64 × 1024 × 1024 bytes | EVB capacity 32 MB |
| MPI4 | `0x68000000` | `0x9FFFFFFF` | 896 × 1024 × 1024 bytes | EVB capacity 64 MB |

For NAND Flash larger than 64 MB, the guide recommends mounting it on MPI4 and using addresses beginning at `0x68000000`.

```c
#define QSPI1_MEM_BASE   (0x10000000)
#define QSPI2_MEM_BASE   (0x12000000)
#define QSPI3_MEM_BASE   (0x14000000)
#define QSPI4_MEM_BASE   (0x18000000)
#define QSPI5_MEM_BASE   (0x1C000000)
```

### SF32LB56x

**C-BUS address space**

<div align="center"><em>Table: SF32LB56x C-BUS address space</em></div>

| Controller | Start | End | Maximum window | EVB description |
|:-----------|:------|:----|:---------------|:----------------|
| MPI1 | `0x10000000` | `0x107FFFFF` | 8 × 1024 × 1024 bytes | EVB capacity 4 MB |
| MPI2 | `0x10800000` | `0x13FFFFFF` | 56 × 1024 × 1024 bytes | EVB capacity 16 MB |
| MPI3 | `0x14000000` | `0x17FFFFFF` | 128 × 1024 × 1024 bytes | EVB capacity 128 MB |
| MPI5 | `0x1C000000` | `0x1FFFFFFF` | 64 × 1024 × 1024 bytes | EVB capacity 1 MB |

**S-BUS address space**

<div align="center"><em>Table: SF32LB56x S-BUS address space</em></div>

| Controller | Start | End | Maximum window |
|:-----------|:------|:----|:---------------|
| MPI1 | `0x60000000` | `0x607FFFFF` | 8 × 1024 × 1024 bytes |
| MPI2 | `0x60800000` | `0x63FFFFFF` | 56 × 1024 × 1024 bytes |
| MPI3 | `0x64000000` | `0x9FFFFFFF` | 960 × 1024 × 1024 bytes |

```c
#define QSPI1_MEM_BASE   (0x10000000)
#define QSPI2_MEM_BASE   (0x10800000)
#define QSPI3_MEM_BASE   (0x14000000)
#define QSPI5_MEM_BASE   (0x1C000000)
```

## 4. Access Flash through RT-Thread

The RT-Thread Flash interface selects the controller from the absolute address. Call `rt_hw_flash_init` after the controller and device settings have been generated in `rtconfig.h`:

```c
/**
* @brief  Flash controller hardware initial.
* @retval 0 if success.

int rt_hw_flash_init(void)；

/**
 * @brief Read nor-flash memory
 * @param[in] addr: start address for flash memory.
 * @param[out] buf: output data buffer, should not be null.
 * @param[in] size: read memory size, in bytes.
 * @return read size, 0 if fail.
 */
int rt_flash_read(rt_uint32_t addr, rt_uint8_t *buf, size_t size);

/**
 * @brief Write nor-flash memory
 * @param[in] addr: start address for flash memory.
 * @param[in] buf: input data buffer, should not be null.
 * @param[in] size: write memory size, in bytes.
 * @return write size, 0 if fail.
 */
int rt_flash_write(rt_uint32_t addr, const rt_uint8_t *buf, size_t size);

/**
 * @brief erase flash.
 * @param[in] addr: start address for flash memory.
 * @param[in] size: erase memory size, in bytes.
 * @return RT_EOK if success.
 */
rt_err_t rt_flash_erase(rt_uint32_t addr, size_t size);
```

Use `rt_flash_read` for both NOR and NAND reads; NOR can alternatively be read through its memory window, while NAND must use the API and the caller must manage the buffer. Use `rt_flash_write` for both types. For erase operations, NOR normally requires sector-aligned address and length (typically 4 KB); NAND normally requires block-aligned address and length (typically 128 KB). Preserve and restore any unaligned data yourself.

When the Flash does not support XIP, code cannot erase or program the same Flash from which it is executing. Place the Flash driver code in SRAM. The source guide's Keil linker fragment reserves 64 KB at `0x200E1000`:

```text
LR_IROM1 0x10020000 0x100000  {    ; load region size_region
  ...
  ER_IROM1_EX 0x200E1000 0x10000  {  ; Flash code and RO need to put in SRAM
   drv_flash_z0.o (.text.*)
   drv_flash_z0.o (.rodata.*)
   bf0_hal_flash.o (.text.*)
   bf0_hal_flash_ext_z0.o (.text.*)
   ...
  }
  ...
}
```

The following source example erases, writes, reads, and compares a 4 KB block at an address one megabyte into `FLASH1`:

```c
unsigned long address = FLASH_BASE_ADDR + 0x100000;
char * buf = NULL;
char * buf2 = NULL;

// Erase flash
int res = rt_flash_erase(address, 4096);
if(res != 0)
    goto err;


// Write flash
// malloc buf and initial data before write
buf = malloc(4096);
if(buf == NULL)
    return ERROR;
int size = rt_flash_write(address, buf, 4096);
if(size != 4096)
    goto err;

// read flash
buf2 = malloc(4096);
if(buf2 == NULL)
    goto err;
size = rt_flash_read(address, buf2, 4096);
if(size != 4096)
    goto err;
	
// check data
for(int i=0; i<4096; i++)
    if(buf[i] != buf2[i])
	    goto err;

....
		
err:
    if(buf)
	    free(buf);
	if(buf2)
	    free(buf);
return ERROR;

...
```

## 5. Use Flash through RT-Thread MTD

RT-Thread provides MTD-NOR and MTD-NAND device drivers. When MTD and filesystem options are enabled in the configuration, the devices are registered during startup. Query a controller with `rt_device_find("flash1")`; the controller names are `flash1`, `flash2`, and `flash3` (and the corresponding device name for each enabled controller). A non-null result indicates successful registration.

MTD is used by filesystems and USB storage. Application code normally finds the device and binds it; the MTD NOR layer encapsulates the read/write operations. If you register a device yourself, implement the operation table shown below.

### MTD-NOR types

```c
struct rt_mtd_nor_device
{
	struct rt_device parent;

	rt_uint32_t block_size;			/* The Block size in the flash */
	rt_uint32_t block_start;		/* The start of available block*/
	rt_uint32_t block_end;			/* The end of available block */

	/* operations interface */
	const struct rt_mtd_nor_driver_ops* ops;
};

struct rt_mtd_nor_driver_ops
{
	rt_uint32_t (*read_id) (struct rt_mtd_nor_device* device);

	rt_size_t (*read)    (struct rt_mtd_nor_device* device, rt_off_t offset, rt_uint8_t* data, rt_uint32_t length);
	rt_size_t (*write)   (struct rt_mtd_nor_device* device, rt_off_t offset, const rt_uint8_t* data, rt_uint32_t length);

	rt_err_t (*erase_block)(struct rt_mtd_nor_device* device, rt_off_t offset, rt_uint32_t length);
};

rt_err_t rt_mtd_nor_register_device(const char* name, struct rt_mtd_nor_device* device);
```

### MTD-NAND types

```c
struct rt_mtd_nand_device
{
    struct rt_device parent;

    rt_uint16_t page_size;          /* The Page size in the flash */
    rt_uint16_t oob_size;           /* Out of bank size */
    rt_uint16_t oob_free;           /* the free area in oob that flash driver not use */
    rt_uint16_t plane_num;          /* the number of plane in the NAND Flash */

    rt_uint32_t pages_per_block;    /* The number of page a block */
    rt_uint16_t block_total;

    rt_uint32_t block_start;        /* The start of available block*/
    rt_uint32_t block_end;          /* The end of available block */

    /* operations interface */
    const struct rt_mtd_nand_driver_ops* ops;
};

struct rt_mtd_nand_driver_ops
{
    rt_uint32_t (*read_id) (struct rt_mtd_nand_device* device);

    rt_err_t (*read_page)(struct rt_mtd_nand_device* device,
                          rt_off_t page,
                          rt_uint8_t* data, rt_uint32_t data_len,
                          rt_uint8_t * spare, rt_uint32_t spare_len);

    rt_err_t (*write_page)(struct rt_mtd_nand_device * device,
                           rt_off_t page,
                           const rt_uint8_t * data, rt_uint32_t data_len,
                           const rt_uint8_t * spare, rt_uint32_t spare_len);
    rt_err_t (*move_page) (struct rt_mtd_nand_device *device, rt_off_t src_page, rt_off_t dst_page);

    rt_err_t (*erase_block)(struct rt_mtd_nand_device* device, rt_uint32_t block);
    rt_err_t (*check_block)(struct rt_mtd_nand_device* device, rt_uint32_t block);
    rt_err_t (*mark_badblock)(struct rt_mtd_nand_device* device, rt_uint32_t block);
};

rt_err_t rt_mtd_nand_register_device(const char* name, struct rt_mtd_nand_device* device);
```

The source's NOR filesystem example registers `flash1`, finds it, formats it with Elm, and mounts it. This is an SF32LB56x source-guide example; confirm controller names and filesystem regions for the target family:

```c
    // 注册MTD DEVICE
    struct rt_mtd_nor_device *nod = malloc(sizeof(struct rt_mtd_nor_device));

    nod->block_start = BSP_FLASH1_FS_START;
    nod->block_size = FLASH_SECT_SIZE;
    nod->block_end = nod->block_start + BSP_FLASH1_FS_SIZE;
    nod->ops = &flash_ops;
    nod->parent.user_data = &lflash_handle[0];
    lflash_handle[0].nod = nod;

    rt_mtd_nor_register_device("flash1", (struct rt_mtd_nor_device *)(lflash_handle[0].nod));
	
	// 查找MTD DEVICE:
	rt_device_t dev = rt_device_find("flash1");
    if (dev) // device find, it has beed registered to mtd
    {
        // MTD设备的使用，直接使用设备名，mkfs, mount都会去查找设备并调用设备的读写接口
        if (dfs_mkfs("elm", "flash1") == 0)
        {
          dfs_mount("flash1", "/", "elm", 0, 0);
		  ....
        }
    }
```

## 6. Reserve and review the current Flash layout

The source guide describes the default SF32LB55x layout from `mem_map.h`: the first 64 KB at `0x10000000` stores `flash_table`, the next 64 KB at `0x10010000` stores the boot patch, and the image begins at `0x10020000`. If `FLASH2` is NOR Flash, watch resources begin at `0x64000000`. FlashDB (or EasyFlash) also uses portions of `flash1` and `flash2` for variables and logs; reclaim and repartition those regions according to the system requirements.

```c
#define FLASH_TABLE_SIZE            (20*1024)
#define FLASH_CAL_TABLE_SIZE        (8*1024)
#define FLASH_BOOT_PATCH_SIZE       (64*1024)

#define FLASH_BASE_ADDR             (0x10000000)
#define FLASH_TABLE_START_ADDR      (FLASH_BASE_ADDR)
#define FLASH_TABLE_END_ADDR        (END_ADDR(FLASH_TABLE_START_ADDR, FLASH_TABLE_SIZE))
#define FLASH_CAL_TABLE_START_ADDR  (FLASH_TABLE_END_ADDR+1)
#define FLASH_BOOT_PATCH_START_ADDR (0x10010000)
#define FLASH_BOOT_PATCH_END_ADDR   (END_ADDR(FLASH_BOOT_PATCH_START_ADDR, FLASH_BOOT_PATCH_SIZE)) /* 0x1001FFFF */
#define FLASH_USER_CODE_START_ADDR   (FLASH_BOOT_PATCH_END_ADDR + 1)   /* 0x10020000 */
```

Treat these addresses as the source guide's default layout, not a universal partition map. Reconcile them with the target linker script, bootloader, OTA plan, filesystem ranges, and actual Flash capacity before allocating product data.

## 7. Port a NOR Flash part

Different boards may use different NOR Flash parts. Match the part against both its hardware specification and its operation commands.

### Hardware requirements

Check:

- supply voltage: 3.3 V or 1.8 V;
- whether the part supports single-, dual-, and four-line SPI;
- maximum frequency in each line mode; and
- any other details needed by the hardware design. The source notes that operating temperature and erase/program speed are not required for the software porting match at this stage.

### Operation commands

Read, write, and erase commands vary by vendor and part. Compare the part's data sheet with the command IDs in `bf0_hal_qspi.h` and add a command table in `flash_table.c` when the existing table does not match.

```c
/**
  * @brief  SPI_FLASH command index
  */
typedef enum
{
    SPI_FLASH_CMD_WREN = 0,  /*!<  write enable, nor+nand    */
    SPI_FLASH_CMD_WRDI,     /*!<  write disable, nor+nand    */
    SPI_FLASH_CMD_RDSR,     /*!<  read status register, nor+nand    */
    SPI_FLASH_CMD_WRSR,     /*!<  write status register, nor+nand    */
    SPI_FLASH_CMD_PREAD,    /*!<  page read, nand    */
    SPI_FLASH_CMD_READ,     /*!<  single line read, nor+nand    */
    SPI_FLASH_CMD_FREAD,    /*!<  fast read , nor + nand    */
    SPI_FLASH_CMD_DREAD,    /*!<  fast read dual output, nor+nand    */
    SPI_FLASH_CMD_QREAD,    /*!<  fast read quad output, nor+nand    */
    SPI_FLASH_CMD_2READ,    /*!<  2 line read, nor+nand    */
    SPI_FLASH_CMD_4READ,   /*!<  4 line read, nor+nand .   ==== 10    */
    SPI_FLASH_CMD_RDID,    /*!<  read id, nor+nand    */
    SPI_FLASH_CMD_PLD,     /*!<  load program data, nand    */
    SPI_FLASH_CMD_QPLD,    /*!<  qual program load, nand    */
    SPI_FLASH_CMD_PLDR,    /*!<  randome program load, nand    */
    SPI_FLASH_CMD_QPLDR,   /*!<  qual random program load, nand    */
    SPI_FLASH_CMD_PEXE,    /*!<  program execute, nand    */
    SPI_FLASH_CMD_BE,      /*!<  block erase, nand    */
    SPI_FLASH_CMD_RST,     /*!<  reset, nor+nand    */
    SPI_FLASH_CMD_RST_EN,     /*!<  reset en, nor    */
    SPI_FLASH_CMD_RDSR2,   /*!<  read status register 2, nor       ==== 20    */
    SPI_FLASH_CMD_WVSR,    /*!<  write volatile status register, nor    */
    SPI_FLASH_CMD_PP,      /*!<  PAGE PROGRAM, nor    */
    SPI_FLASH_CMD_QPP,     /*!<  QUAL PAGE PROGRAM, nor    */
    SPI_FLASH_CMD_RDEAR,     /*!<  read extended address register, nor    */
    SPI_FLASH_CMD_WREAR,     /*!<  write extended address register, nor    */
    SPI_FLASH_CMD_PE,        /*!<  page erase, nor    */
    SPI_FLASH_CMD_SE,        /*!<  SECTOR erase, nor    */
    SPI_FLASH_CMD_BE32,        /*!<  BLOCK erase 32KB, nor    */
    SPI_FLASH_CMD_BE64,        /*!<  BLOCK erase 64KB, nor    */
    SPI_FLASH_CMD_CE,        /*!<  CHIP ERASE, nor             ===== 30    */
    SPI_FLASH_CMD_RDSR3,   /*!<  read status register 3, nor    */
    SPI_FLASH_CMD_WRSR3,   /*!<  WRITE status register 3, nor    */
    SPI_FLASH_CMD_EN4BM,   /*!<  enter 4-byte address mode, nor    */
    SPI_FLASH_CMD_ET4BM,   /*!<  exit 4-byte address mode, nor    */
    SPI_FLASH_CMD_RD4BA,   /*!<  read with 4-byte address, nor    */
    SPI_FLASH_CMD_FR4BA, /*!<  fast read with 4-byte address, nor    */
    SPI_FLASH_CMD_FQR4BA, /*!<  fast read quad output with 4-byte address, nor    */
    SPI_FLASH_CMD_4RD4BA, /*!<  4 IO read with 4-byte address, nor    */
    SPI_FLASH_CMD_PP4BA, /*!<  page program with 4-byte address, nor    */
    SPI_FLASH_CMD_QPP4BA, /*!<  quad page program with 4-byte address, nor     ==== 40    */
    SPI_FLASH_CMD_SE4BA, /*!<  sector erase with 4-byte address, nor    */
    SPI_FLASH_CMD_BE4BA, /*!<  64KB block erase with 4-byte address, nor    */
    SPI_FLASH_CMD_WRSR2, /*!<  write status register command 2, nor    */
    SPI_FLASH_CMD_LEFPA, /*!< Last ECC Failue Page Address, NAND    */
    SPI_FLASH_CMD_BBM, /*!< Bad Block Management, NAND    */
    SPI_FLASH_CMD_RBLUT, /*!< Read BBM Look Up Table, NAND    */
    SPI_FLASH_CMD_COUNT /*!< current support flash command     */
} SPI_FLASH_CMD_E;
```

The SDK already contains `flash_cmd_table_list`. A part can use an existing table when its commands match completely; otherwise add a new table. The table configuration is:

```c
/**
  * @brief  SPI_FLASH manual command
  */
typedef struct
{
    uint8_t cmd;
    uint8_t func_mode;   /*!<   manual read 0 / write 1  */
    uint8_t data_mode;   /*!<   0 no data / 1 single line / 2 dual line / 3 qual line  */
    uint8_t dummy_cycle;     /*!<   dummy cycle between command and address/data  */
    uint8_t ab_size;          /*!<   alternate byte size, */
    uint8_t ab_mode;          /*!<   alternate byte mode, 0 no, 1, single line, 2, dual line, 3 fouline */
    uint8_t addr_size;   /*!<   address byte count - 1 */
    uint8_t addr_mode;   /*!<   0 no, 1 single line / 2 dual lin / 3 four line */
    uint8_t cmd_mode;    /*!<   0 no, 1 single lien / 2 dual line / 3 four line */
} FLASH_CMD_CFG_T;
```

Here `cmd` is the command ID (`0x06` for write enable and `0x05` for read status in the source examples). `func_mode` selects read or write; `data_mode` selects no data, single-, dual-, or four-line data; `dummy_cycle` describes clocks between command and address/data; `ab_size` and `ab_mode` describe alternate bytes; `addr_size` and `addr_mode` describe the address length and line mode; and `cmd_mode` indicates whether the command itself is sent on one, two, or four lines.

## 8. Port a NAND Flash part

NAND porting follows the NOR process, but the command set and timing differ by part. Derive the required sequence from the part's data sheet. Some parts use a different ID-read timing; if the default timing cannot read the correct ID, either change the ID-read implementation or configure the correct ID explicitly so the new command table can be selected.

## 9. Port PSRAM

The source guide documents APM PSRAM support in 4-line, 8-line, and 16-line modes, with supported densities from 4 MB to 32 MB:

- SF32LB55x supports 4-line PSRAM only.
- SF32LB58x supports 4-line, 8-line, and 16-line PSRAM.
- SF32LB56x supports 4-line and 8-line PSRAM.

Use the MPI/QSPI mode and memory-size settings that match the package, board wiring, and PSRAM part.

## 10. Use J-Link DSK and Open Flashloader

The SDK's `tools/flash/jlink_drv` directory is SiFli's static J-Link Device Support Kit (DSK). The root `JLinkDevices.xml` describes the device, Flash bank, and loader relationships; the ELF files in its subdirectories are the Open Flashloader algorithms.

Install J-Link V7.62 or later, then copy the entire `tools/flash/jlink_drv` directory into the current user's `JLinkDevices\SiFli` directory. On Windows, the default path is `C:\Users\<user>\AppData\Roaming\SEGGER\JLinkDevices\SiFli`.

Keep these rules in sync with the board project:

- Since J-Link V7.62, all `*.xml` files under `JLinkDevices` are scanned recursively, so you do not need to modify the J-Link installation's `JLinkDevices.xml`.
- Loader paths in the XML are resolved relative to `JLinkDevices.xml`; copy the complete directory, not only selected ELF files.
- The selected device must match `JLINK_DEVICE` in `rtconfig.py`, for example `SF32LB56X`, `SF32LB56X_NAND`, or `SF32LB52X_NOR`.
- A `FlashBankInfo` can contain multiple `LoaderInfo` entries. J-Link uses the first loader by default. Select another loader explicitly with `_device "<DeviceName>?BankAddr=<FlashBankBase>&Loader=<LoaderName>"_` or call `_JLINK_ExecCommand("DEVICE_SelectLoader BankAddr=<FlashBankBase> Loader=<LoaderName>");_` from a J-Link script.
- Unsuffixed device names such as `SF32LB52X`, `SF32LB55X`, `SF32LB56X`, and `SF32LB58X` now include complete bank and loader information and prefer the NOR loader. Suffixed names remain for compatibility with existing scripts.

## Integration checklist

Before using external Flash in a product, record:

1. the exact SF32 family, package, Flash part, voltage, and supported line modes;
2. the QSPI/MPI controller, mode, DMA, memory size, device ID, and MTD/filesystem settings;
3. the selected address window and reserved regions for table, calibration, boot patch, image, assets, variables, logs, and filesystem data;
4. the erase alignment and whether the driver executes from SRAM during program/erase;
5. the MTD device name and filesystem mount path, if used; and
6. the board's J-Link device name and loader selection.

## Related pages

- [Partition Tables](../../../firmware-topics/partition-tables.md) — reconcile Flash regions with image and OTA layout.
- [OTA and DFU](../../../firmware-topics/ota-dfu.md) — review update behavior before reserving product data regions.
- [SiFli-SDK application notes](../sdk-application-notes.md) — the complete application-note index.

## Official source

- [Flash使用指南 — SiFli SDK 编程指南](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/app_note/flash_usage.html)
- [SF32LB52x Flash usage](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/flash_usage.html)
- [SF32LB55x Flash usage](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/flash_usage.html)
- [SF32LB58x Flash usage](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/app_note/flash_usage.html)
