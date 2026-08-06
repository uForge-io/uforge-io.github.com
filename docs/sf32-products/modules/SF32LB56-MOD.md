---
icon: lucide/card-sim
description: "SF32LB56-MOD: general-purpose Bluetooth 6.3 MCU module family based on SF32LB56xV for products that need richer graphics, audio, and storage with lower RF-integration risk."
tags:
  - Hardware
  - Module
---

# SF32LB56-MOD

## Overview

SF32LB56-MOD is SiFli's general-purpose low-power Bluetooth MCU module family based on the SF32LB56xV platform. It combines dual-core MCU processing, Bluetooth 6.3 with BLE Audio support, graphics acceleration, audio interfaces, external-memory options, and module-level RF integration in one production-ready form factor.

Compared with a chip-down SF32LB56xV design, the module reduces RF layout, antenna matching, crystal placement, and high-speed memory integration risk. It is a strong fit for products that need more display, audio, sensing, and local-processing headroom than a simple Bluetooth module can provide, while still keeping the hardware path compact and production-friendly.

According to the module technical specification, the family is offered in multiple memory configurations, all in an 18.0 × 32.9 × 3.1mm package rated for -40 to 85°C operation. Depending on the selected SKU, the RF path uses either an on-board PCB antenna or an external antenna through an IPEX-compatible connector.

!!! info
    For the underlying chip family, architecture, and peripheral set, see [SF32LB56x](../chips/SF32LB56x.md). This page focuses on module-specific integration, memory variants, power rails, and product fit.

## Applications

**SF32LB56-MOD is recommended for** products that need Bluetooth, display, audio, sensing, and local intelligence in a compact module form factor, including:

- Higher-end smartwatches, smart bands, and wearable medical devices
- Smart-home controllers and control panels
- Voice-command and audio-enabled products
- E-bike dashboards and vehicle accessories
- Smart locks, connected appliances, and graphical HMI panels
- Industrial sensor centers, monitoring terminals, and compact instruments

Choose SF32LB56-MOD when the project wants one or more of these advantages:

- Faster integration than a chip-down SF32LB56xV board
- Lower RF and antenna risk
- Easier memory-configuration selection by module SKU
- Better fit for products that need more UI, audio, and storage flexibility than entry-level modules

## Development Resources

[Module Datasheet]: https://downloads.sifli.com/user%20manual/DS5602-SF32LB56-MOD%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V0p3.pdf
[Chip Introduction]: ../chips/SF32LB56x.md
[Hardware Design Guide]: ../../hardware/chip-guides/SF32LB56-MOD_hardware_design_guide.md
[SF32LB56x Hardware Design Guide]: ../../hardware/chip-guides/SF32LB56x_hardware_design_guide.md
[Buy Samples]: https://sifli.taobao.com/
[Buy Dev Kits]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[Module Datasheet]__
- :fontawesome-solid-microchip: __[Chip Introduction]__
- :fontawesome-solid-file-lines: __[Hardware Design Guide]__
- :fontawesome-solid-file-lines: __[SF32LB56x Hardware Design Guide]__
- :fontawesome-solid-cart-shopping: __[Buy Samples]__
- :fontawesome-solid-cart-shopping: __[Buy Dev Kits]__

</div>

---

## Features and Specifications

### Compute and Memory

- HCPU: Arm Cortex-M33 STAR-MC1, up to 240MHz, up to 370 DMIPS / 984 EEMBC CoreMark
- LCPU: Arm Cortex-M33 STAR-MC1, up to 96MHz, up to 148 DMIPS / 394 EEMBC CoreMark
- HCPU memory system: 32KB + 16KB I/D-cache and 800KB SRAM, including 128KB retention SRAM
- LCPU memory system: 16KB + 8KB I/D-cache and 160KB retention SRAM
- Single-precision FPU and MPU on both cores
- Neural-network matrix accelerator and signal-processing accelerators for richer local workloads

### Wireless Connectivity

- Dual-mode Bluetooth 6.3 with BLE Audio support
- Sensitivity: -100dBm BLE 1Mbps, -96.3dBm BR, -95.5dBm EDR2, -88.5dBm EDR3
- Maximum transmit power: 19dBm for BR/BLE, 13dBm for EDR2/EDR3
- BR peak receive current: 2.2mA at 3.3V

### Graphics and Display

- ePicasso 2.0 2D/2.5D graphics engine
- Hardware rotation, scaling, mirroring, and alpha blending
- Graphics workloads up to 1024 × 1024
- eZip 2.0 lossless graphics decompression and eZip-A animation support
- LCD support for 8080, SPI, Dual-SPI, Quad-SPI, DPI/RGB, and JDI
- TurboPixel: extDMA fixed-ratio lossy final-framebuffer compression and display-controller decompression, reducing PSRAM bandwidth and capacity

### Audio

- 1x 24-bit audio DAC
- 1x 24-bit Sigma-Delta audio ADC
- 2x PDM digital microphone inputs
- 1x I2S interface
- Audio sample-rate conversion and EQ acceleration

### Memory and Module Variants

<div align="center"><em>SF32LB56-MOD Memory Configurations</em></div>

<div align="center" markdown>

| Module Code | Main Flash | PSRAM | Backup Flash | Temperature | Dimensions |
| :--- | :--- | :--- | :--- | :--- | :--- |
| SF32LB56-MOD-N16R12N1 | 16MB QSPI-NOR | 4+8MB OPI-PSRAM | 1MB QSPI-NOR | -40 to 85°C | 18.0 × 32.9 × 3.1mm |
| SF32LB56-MOD-A128R12N1 | 128MB QSPI-NAND | 4+8MB OPI-PSRAM | 1MB QSPI-NOR | -40 to 85°C | 18.0 × 32.9 × 3.1mm |
| SF32LB56-MOD-D128R12N1 | 128MB SD-NAND | 4+8MB OPI-PSRAM | 1MB QSPI-NOR | -40 to 85°C | 18.0 × 32.9 × 3.1mm |

</div>

### Power and I/O

- VDD_3V3 recommended operating range: 2.97–3.6V
- VDD_1V8 recommended operating range: 1.7–1.95V
- VDDIO recommended operating range: 1.7–3.6V
- VDD_3V3, VDD_1V8, and VDDIO must power up together
- PA00–PA11 interface level is fixed at 3.3V and does not follow VDDIO
- 89-pin module interface
- Operating temperature: -40 to 85°C

## Related Products

### Chip

Built on [SF32LB56x](../chips/SF32LB56x.md), specifically the SF32LB56xV platform family. Use the chip page for the broader architecture, display, audio, and package context behind the module.

### Development Kits

Use the selected SF32LB56x bring-up platform together with the module SKU and intended software image, because memory type and antenna configuration affect firmware layout, RF verification, and production test planning.

### Reference Products

Typical end products include higher-end smartwatches, connected HMI panels, smart-home controllers, voice-capable accessories, industrial monitoring terminals, and Bluetooth sensor hubs.
