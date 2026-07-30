---
icon: lucide/microchip
description: "SF32LB58x: flagship AIoT MCU family for products that need the largest memory options, advanced graphics, rich display I/O, and high peripheral density in an MCU-class platform."
tags:
    - Hardware
    - Chip
---

# SF32LB58x

## Overview

The SF32LB58x series is the flagship member of the SF32LB family. It targets battery-powered AIoT products that need advanced graphics, large memory capacity, dual-mode Bluetooth, rich audio/display I/O, and high GPIO density without moving to a larger application-processor platform.

SF32LB58x uses a heterogeneous triple-core architecture built around two Arm Cortex-M33 STAR-MC1[^1] application cores running at up to 240MHz and one user-programmable low-power Arm Cortex-M33 STAR-MC1 core running at up to 96MHz. In practice, that gives the family enough headroom for UI rendering, storage management, connectivity, audio, and product logic while still keeping background control and standby work on a lower-power processing path.

SiFli's official product brief and datasheet position SF32LB58x as the strongest graphics- and memory-oriented option in the current SF32LB5xx lineup. The family adds up to 3.7MB on-chip SRAM, large in-package PSRAM options, advanced display support including MIPI DSI, vector graphics acceleration, USB2.0 High-Speed, and high-I/O BGA packaging. It is the right starting point when the design needs high-resolution UI, large assets, external Wi-Fi through SDIO, or broader edge-AI and sensor-fusion headroom.

[^1]: The STAR-MC1 processor is an enhanced implementation of the Arm Cortex-M33 architecture developed by Arm China. It is fully compatible with the Cortex-M33 instruction set and software ecosystem, allowing existing Cortex-M33 applications, middleware, RTOSes, and development tools to be used without modification. Following SiFli documentation, it is generally referred to as **Arm Cortex-M33 STAR-MC1** or simply **Arm Cortex-M33** in this documentation.

## Applications

**SF32LB58x is recommended for** premium connected products that need larger framebuffers, richer displays, more memory, and denser high-speed I/O, including:

- Premium smartwatches and sports watches
- High-resolution wearable HMIs
- Cycling computers and smart dashboards
- Portable medical and industrial terminals
- Bluetooth + external Wi-Fi accessories
- Edge-AI and sensor-fusion systems
- Display-centric connected controllers

Choose SF32LB58x when the design needs one or more of these capabilities:

- Display resolution at or above 1024 × 600
- MIPI DSI command-mode or video-mode display support
- Vector graphics, richer animation, or larger UI assets
- External Wi-Fi over SDIO
- Large framebuffer, audio, graphics, or AI-model memory
- High GPIO count or multiple high-speed external interfaces

## Development Resources

[Product Brief]: https://downloads.sifli.com/silicon/PB0058-SF32LB58x-Product%20Brief%20V0p7.pdf
[Datasheet]: https://downloads.sifli.com/user%20manual/DS5801-SF32LB58x-Datasheet%20V1p8p3.pdf
[User Manual]: https://downloads.sifli.com/docs/user%20manual/SF32LB58x/UM5801%E2%80%90SF32LB58x%E2%80%90EN.pdf
[Original Design Guide (wiki.sifli.com)]: https://wiki.sifli.com/en/hardware/SF32LB58x-HW-Application.html
[Hardware Application Note (GitHub source)]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB58x-HW-Application.md
[Hardware Design Guide (μForge, dev)]: SF32LB58x_hardware_design_guide.md
[Buy Samples]: https://sifli.taobao.com/
[Buy Dev Kits]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[Product Brief]__
- :fontawesome-solid-file-pdf: __[Datasheet]__
- :fontawesome-solid-file-pdf: __[User Manual]__
- :fontawesome-solid-file-lines: __[Original Design Guide (wiki.sifli.com)]__
- :fontawesome-brands-github: __[Hardware Application Note (GitHub source)]__
- :fontawesome-solid-file-lines: __[Hardware Design Guide (μForge, dev)]__
- :fontawesome-solid-cart-shopping: __[Buy Samples]__
- :fontawesome-solid-cart-shopping: __[Buy Dev Kits]__

</div>

---

## Features and Specs

### Compute and Memory

- 2x Arm Cortex-M33 STAR-MC1 application cores @ 240MHz
- 1x user-programmable Arm Cortex-M33 STAR-MC1 low-power core @ 96MHz
- 3.7MB internal SRAM
- Optional in-package QSPI-NOR Flash up to 8MB
- Optional in-package HPI-PSRAM up to 32MB + 32MB
- External NOR Flash, SPI NAND, SD NAND, eMMC, and SD card options through MPI and SDIO interfaces

### Graphics, Display, and AI

- ePicasso 2.0 2D/2.5D graphics accelerator
- Vivante GCNanoUltraV vector graphics engine
- Display resolutions up to 1280 × 720
- MIPI DSI command-mode and video-mode display support
- SPI, QSPI, MCU8080, EPD, JDI, RGB/DPI, and MIPI DSI display interfaces
- Suitable for local edge-AI, machine-learning, and sensor-fusion workloads

### Audio and Wireless Connectivity

- Dual-mode Bluetooth 6.3
- Support for Bluetooth Classic and Bluetooth LE
- External Wi-Fi connectivity through SDIO
- 2x integrated audio ADCs
- 2x integrated audio DACs
- 2x PDM microphone inputs
- I2S support for digital audio input/output
- USB2.0 High-Speed Host/Device

### Security and System Integration

- Rich power-management integration with on-chip PMU resources
- Practical fit for high-density MCU designs that combine display, storage, audio, and connectivity on one device
- Stronger memory and display headroom than the rest of the SF32LB5xx lineup

### Peripherals and I/Os

- Up to 154 GPIOs
- 2x CAN interfaces
- 2x SDIO interfaces
- SWD debug interface
- 6 selectable UART debug outputs
- RTC, watchdog, GPIO wake, PBR wake, PWM, I2C, SPI, and general-purpose analog interfaces
- BGA256 package for high-density designs

### Power Supply and Package

- Power supply range: 1.71V to 3.63V
- Integrated PMU with 2x BUCK outputs and 3x LDO outputs
- Optional SF30147C PMIC support for wearable power-tree designs
- BGA256 package, 8.5 × 6.5 × 0.94mm, 0.4mm pitch
- HDI PCB required; 6HDI-2 stack-up is recommended for production designs

## Family Variants

SF32LB58x devices are offered in BGA256 configurations with different in-package memory combinations. Select the exact order code from the official datasheet and AVL, because Flash and PSRAM combinations vary by part number and availability.

<div align="center"><em>Representative SF32LB58x Family Variants</em></div>

<div align="center" markdown>

| Example Part | Package | Integrated Memory | Typical Use |
| :--- | :--- | :--- | :--- |
| SF32LB583VCC36 | BGA256 | 2x 64Mb OPI-PSRAM + 8Mb QSPI-NOR Flash | Mid-tier high-resolution UI designs that need more local memory than entry 58-series parts without moving to the largest HPI-PSRAM tier |
| SF32LB586VDD36 | BGA256 | 2x 128Mb HPI-PSRAM + 8Mb QSPI-NOR Flash | High-end wearable, dashboard, and connected HMI products that balance large local memory with moderate boot Flash |
| SF32LB587VEE56 | BGA256 | 2x 256Mb HPI-PSRAM + 32Mb QSPI-NOR Flash | Premium wearable, HMI, and edge-AI designs with the largest local UI and asset memory headroom |

</div>

When selecting a variant, check these items first:

- Required framebuffer, asset, audio, and model-memory size
- Display interface and target resolution
- External storage and Wi-Fi interface requirements
- PCB manufacturing capability for BGA256, 0.4mm-pitch HDI layout

## Integration Path

Use this sequence to turn an SF32LB58x shortlist into a validated design:

1. **Prove the firmware path.** Start with the [SiFli SDK getting-started guide](../../getting-started/sifli/getting-started-sifli-sdk.md), then use the [SiFli SDK workflow](../../develop/platforms/sifli-sdk/overview.md) and [examples](../../develop/examples/index.md) to validate the display, graphics, audio, storage, and Bluetooth configuration.
2. **Choose the integration vehicle.** Evaluate [SF32LB58-MOD](../modules/SF32LB58-MOD.md) when reducing RF, BGA, and memory-layout risk is valuable, or use [SF32LB58-DevKit-LCD](../devkits/SF32LB58-DevKit-LCD.md) for early board-level validation.
3. **Design and review the hardware.** Use the local [hardware design guide](SF32LB58x_hardware_design_guide.md) and [hardware design checklist](SF32LB58x_hardware_design_checklist.md) before releasing the schematic or layout. Validate the BGA256 HDI and memory-routing assumptions early.
4. **Verify the authoritative source.** Confirm the exact orderable part and package against the SiFli [datasheet], [user manual], [original design guide], and [hardware application note source].

## Related Products

### Module

[SF32LB58-MOD](../modules/SF32LB58-MOD.md) packages the SF32LB586VDD36 chip, its RF matching network, and in-package HPI-PSRAM plus storage options into a ready-to-integrate module. Use it when the project needs 58-series capability but should reduce RF, BGA, and memory-layout risk early in hardware development.

### Development Kits

[SF32LB58-DevKit-LCD](../devkits/SF32LB58-DevKit-LCD.md) is the starting point for power-tree, display, storage, audio, RF, USB, and SDIO design decisions.

### Reference Products

Typical SF32LB58x end products include premium watch platforms, high-resolution wearable HMIs, smart dashboards, portable connected terminals, and devices that combine Bluetooth, display, audio, storage, and local AI workloads.
