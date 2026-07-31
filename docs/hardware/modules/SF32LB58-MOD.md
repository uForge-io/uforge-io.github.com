---
icon: lucide/card-sim
description: "SF32LB58-MOD: flagship Bluetooth MCU module based on the SF32LB58x family for products that need stronger graphics, larger memory options, and lower BGA/RF integration risk."
tags:
  - Hardware
  - Module
---

# SF32LB58-MOD

## Overview

SF32LB58-MOD is a flagship Bluetooth MCU module built around SiFli's SF32LB58x family. It packages the SF32LB58x-class triple-core platform, RF path, crystal, and high-memory module options into a ready-to-integrate 24 × 24 × 3.1mm module for products that need stronger graphics, larger storage, and richer display/audio capability than lower-tier designs.

Compared with a chip-down SF32LB58x board, the module lowers BGA256 layout risk, RF certification risk, crystal-integration risk, and high-speed memory-routing complexity. It is a strong fit when a project wants SF32LB58x-class UI, storage, and connectivity without absorbing the full bring-up burden of a chip-level flagship design on the first board revision.

Depending on the selected module SKU, the platform can combine HPI-PSRAM with QSPI-NOR, QSPI-NAND, or eMMC storage. The exposed interface makes the module suitable for rich display, audio, storage, and connected-control products that still prefer MCU-style integration and power behavior.

!!! info
    For the underlying chip family, architecture, and peripheral set, see [SF32LB58x](../chips/SF32LB58x.md). This page focuses on module-specific integration, memory variants, power rails, and product-fit decisions.

## Applications

**SF32LB58-MOD is recommended for** products that need flagship SF32LB58x graphics, connectivity, and storage capability with reduced RF, BGA, and layout risk, including:

- Premium smartwatches and sports watches
- High-resolution graphical HMI panels and dashboards
- Industrial control centers and connected instruments
- Smart-home devices and connected appliances
- Vehicle accessory controllers and rich UI terminals
- Edge-AI or sensor-fusion products with larger local memory demands

Choose SF32LB58-MOD when the project wants one or more of these advantages:

- Faster integration than a chip-down BGA256 design
- Lower RF and antenna implementation risk
- Easier memory-capacity selection through module SKUs
- Better fit for products that need richer display, storage, and multimedia capability in an MCU-class platform

## Development Resources

[Module Datasheet]: https://downloads.sifli.com/user%20manual/DS5802-SF32LB58-MOD%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V0p1.pdf
[Chip Introduction]: ../chips/SF32LB58x.md
[Hardware Design Guide]: SF32LB58-MOD_hardware_design_guide.md
[Buy Samples]: https://sifli.taobao.com/
[Buy Dev Kits]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[Module Datasheet]__
- :fontawesome-solid-microchip: __[Chip Introduction]__
- :fontawesome-solid-file-lines: __[Hardware Design Guide]__
- :fontawesome-solid-cart-shopping: __[Buy Samples]__
- :fontawesome-solid-cart-shopping: __[Buy Dev Kits]__

</div>

---

## Features and Specifications

### Compute and Memory

- 2x Arm Cortex-M33 STAR-MC1 application cores, up to 240MHz
- 1x user-programmable Arm Cortex-M33 STAR-MC1 low-power core, up to 96MHz
- Up to 370 DMIPS / 984 EEMBC CoreMark per application core
- Up to 148 DMIPS / 394 EEMBC CoreMark on the low-power core
- 2176KB SRAM (HCPU) + 512KB SRAM (ACPU) + 1056KB retention SRAM (LCPU)
- Single-precision FPU and MPU on all cores

### Wireless Connectivity

- Dual-mode Bluetooth 6.3 with BLE Audio support
- Sensitivity down to -107.5dBm for BLE Long Range at 125kbps
- Maximum transmit power: 19dBm (BR/BLE), 13dBm (EDR2/EDR3)
- BR/EDR2/EDR3 peak receive current: 2.2mA @ 3.3V

### Graphics, Display, and Multimedia

- ePicasso 2.0 2D/2.5D graphics engine
- Vivante GCNanoUltraV vector graphics engine
- Hardware JPEG codec
- Dual LCD controllers supporting 8080, SPI, Dual-SPI, Quad-SPI, DPI/RGB, MIPI DSI, and JDI
- TurboPixel: extDMA fixed-ratio lossy final-framebuffer compression and display-controller decompression, reducing PSRAM bandwidth and capacity
- Always-on-display support on both LCD controllers

### Audio

- 2x 24-bit audio DACs
- 2x 24-bit Sigma-Delta ADCs
- Analog audio input/output support exposed through the module interface

### Storage Interfaces and Module Variants

<div align="center"><em>SF32LB58-MOD Module Variants</em></div>

<div align="center" markdown>

| Module Code | Flash | PSRAM | Backup Flash | Temperature | Dimensions |
| :--- | :--- | :--- | :--- | :--- | :--- |
| SF32LB58-MOD-N16R16N1 | 16MB QSPI-NOR | 8+8MB HPI-PSRAM | 1MB QSPI-NOR | -40 to 85°C | 24 × 24 × 3.1mm |
| SF32LB58-MOD-N16R32N1 | 16MB QSPI-NOR | 16+16MB HPI-PSRAM | 1MB QSPI-NOR | -40 to 85°C | 24 × 24 × 3.1mm |
| SF32LB58-MOD-N16R64N4 | 16MB QSPI-NOR | 32+32MB HPI-PSRAM | 4MB QSPI-NOR | -40 to 85°C | 24 × 24 × 3.1mm |
| SF32LB58-MOD-A128R32N1 | 128MB QSPI-NAND | 16+16MB HPI-PSRAM | 1MB QSPI-NOR | -40 to 85°C | 24 × 24 × 3.1mm |

</div>

Variant-selection guidance:

- Choose the NOR variant for smaller and simpler storage needs
- Choose the NAND variant when larger local asset/code storage is needed at similar density
- Choose the eMMC variant when the design needs the largest local-storage headroom

### Power, Package, and I/O

- Module package: 24 × 24 × 3.1mm
- Operating temperature: -40 to 85°C
- VDD_3V3: 2.97–3.6V
- VDD_1V8: 1.7–1.95V
- VDDIOA / VDDIOA2 / VDDIOB: 1.7–3.6V
- Up to 138 module pins for GPIO, SPI, LCD, MPI, UART, I2C, PWM, SDIO, USB2.0 HS, and analog audio functions

## Related Products

### Chip

Built on [SF32LB58x](../chips/SF32LB58x.md). Use the chip page for the broader graphics, memory, and display architecture behind the module.

### Development Kits

The [SF32LB58-DevKit-LCD](../devkits/SF32LB58-DevKit-LCD.md) board is a practical starting point for firmware validation, display bring-up, and audio/storage-path checks before moving to a custom carrier design around the module.

### Reference Products

Typical end products include premium wearables, high-resolution dashboards, connected industrial HMI panels, and edge-AI devices that need the strongest memory and display options in the SF32LB5xx range.
