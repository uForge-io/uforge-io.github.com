---
icon: lucide/card-sim
description: "SF32LB52-MOD-1: Bluetooth 5.3 MCU module based on SF32LB525UC6 for wearable and compact HMI products that want lower RF and antenna-integration risk."
tags:
  - Hardware
  - Module
---

# SF32LB52-MOD-1

## Overview

SF32LB52-MOD-1 is a low-power Bluetooth MCU module built around SiFli's SF32LB525UC6. It packages the SF32LB52x-class dual-core Arm Cortex-M33 STAR-MC1 platform, RF path, 48MHz crystal, and module-level antenna implementation into a ready-to-integrate 27.9 × 18.0 × 3.1mm form factor.

Compared with a chip-down SF32LB52x design, the module reduces RF layout, antenna matching, crystal placement, and certification risk. It is a practical choice for products that want SF32LB52x-class Bluetooth, graphics, and audio capability without taking on chip-level RF work at the first hardware spin.

Depending on the selected order code, the module can also include in-package OPI-PSRAM. The exposed module interface gives access to the same broad product-building blocks as the underlying chip family, including GPIO, SPI, LCD, MPI, UART, I2C, PWM, SDIO, USB2.0 FS, and analog audio paths.

!!! info
    For the underlying chip family, architecture, and peripheral set, see [SF32LB52x](../chips/SF32LB52x.md). This page focuses on module-level integration, power, package, and variant selection.

## Applications

**SF32LB52-MOD-1 is recommended for** products that need Bluetooth, graphics, and audio capability with lower RF and layout risk, including:

- Smartwatches, fitness bands, and wearable medical products
- Bluetooth sensor hubs and connected accessories
- Smart locks, smart-home devices, and compact appliances
- Small graphical HMI products
- Vehicle key fobs and wearable remote products
- Cost-sensitive connected display devices

Choose SF32LB52-MOD-1 when the project wants one or more of these advantages:

- Faster hardware bring-up than a chip-down RF design
- Lower antenna-matching and certification risk
- Reuse of SF32LB52x software and peripheral capability
- Compact module integration for space-constrained wearable or HMI products

## Development Resources

[Module Datasheet]: https://downloads.sifli.com/user%20manual/DS5203-SF32LB52-MOD-1%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V0p3.pdf
[Chip Introduction]: ../chips/SF32LB52x.md
[Hardware Design Guide]: SF32LB52-MOD-1_hardware_design_guide.md
[Original Design Guide (wiki.sifli.com, EPD variant)]: https://wiki.sifli.com/en/hardware/SF32LB52-MOD-1-EPD-HW-Application.html
[Buy Samples]: https://sifli.taobao.com/
[Buy Dev Kits]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[Module Datasheet]__
- :fontawesome-solid-microchip: __[Chip Introduction]__
- :fontawesome-solid-file-lines: __[Hardware Design Guide]__
- :fontawesome-solid-file-lines: __[Original Design Guide (wiki.sifli.com, EPD variant)]__
- :fontawesome-solid-cart-shopping: __[Buy Samples]__
- :fontawesome-solid-cart-shopping: __[Buy Dev Kits]__

</div>

---

## Features and Specifications

### Compute and Memory

- Arm Cortex-M33 STAR-MC1 application core (HCPU), up to 240MHz, up to 370 DMIPS / 984 EEMBC CoreMark
- 32KB + 16KB I/D-cache
- 512KB SRAM
- Dedicated ultra-low-power Arm Cortex-M33 STAR-MC1 core (LCPU), up to 24MHz, with 64KB SRAM
- Single-precision FPU and MPU on both cores
- Optional in-package OPI-PSRAM depending on module SKU

### Wireless Connectivity

- Dual-mode Bluetooth 5.3 with BLE Audio support
- Sensitivity: -100dBm (BLE/1Mbps), -96.3dBm (BR), -95.5dBm (EDR2)
- Maximum transmit power: 19dBm (BR/BLE), 13dBm (EDR2/EDR3)
- BR peak receive current: 2.4mA @ 3.8V

### Graphics and Display

- ePicasso 2.0 2D/2.5D graphics engine
- eZip 2.0 lossless graphics decompression accelerator
- LCD controller supporting 8080, SPI, Dual-SPI, and Quad-SPI interfaces
- Practical fit for compact watch-style or small-HMI display products

### Audio

- 1x 24-bit audio DAC
- 1x 24-bit Sigma-Delta audio ADC
- Analog audio input/output support exposed through the module interface

### Storage Interfaces

- Optional in-package OPI-PSRAM, depending on module SKU
- 1x MPI (QSPI) for external NOR, NAND, or OPI-PSRAM
- 1x SD/SDIO supporting SD3.0, SDIO3.0, and eMMC

### Security

- AES, HASH, and CRC hardware accelerators
- True random number generator (TRNG)
- PSA Certified Level 1

### Power, Package, and I/O

- Module package: 27.9 × 18.0 × 3.1mm
- Operating temperature: -40 to 85°C
- VSYS: 3.2–4.7V from Li-ion/Li-Po battery, or 3.7–4.7V from regulated supply
- IO voltage: 3.3V
- VBATS input for battery-voltage sensing
- VDD33_VOUT2 on-module 3.3V output for external peripheral supply
- Up to 68 module pins for GPIO, SPI, LCD, MPI, UART, I2C, PWM, SDIO, USB2.0 FS, and analog audio functions

## Module Variants

<div align="center"><em>SF32LB52-MOD-1 Module Variants</em></div>

<div align="center" markdown>

| Module Code | Flash | PSRAM | Temperature | Dimensions |
| :--- | :--- | :--- | :--- | :--- |
| SF32LB52-MOD-1-N16R8 | 16MB QSPI-NOR | 8MB OPI-PSRAM | -40 to 85°C | 27.9 × 18.0 × 3.1mm |

</div>

## Related Products

### Chip

Built on [SF32LB52x](../chips/SF32LB52x.md), specifically the SF32LB525UC6 platform. Use the chip page when you need the full architecture, peripheral, and family-variant picture behind the module.

### Development Kits

The [SF32LB52-DevKit-LCD](../devkits/SF32LB52-DevKit-LCD.md), [SF32LB52-DevKit-Core-3p3](../devkits/SF32LB52-DevKit-Core-3p3.md), [SF32LB52-DevKit-Nano](../devkits/SF32LB52-DevKit-Nano.md), and [SF32LB52-DevKit-ULP](../devkits/SF32LB52-DevKit-ULP.md) are practical starting points for firmware validation before moving to a custom module carrier design.

### Reference Products

Typical end products include entry-to-mid-tier smartwatches, fitness bands, Bluetooth sensor hubs, smart locks, and compact graphical HMI devices.
