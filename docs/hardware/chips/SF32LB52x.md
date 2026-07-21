---
icon: lucide/microchip
description: "SF32LB52x: cost-optimized dual-core Arm Cortex-M33 AIoT MCU family for wearables and compact AIoT products, spanning battery-powered SF32LB520/3/5/7 and external-supply SF32LB52B/D/E/G/J variants."
tags:
    - Hardware
    - Chip
---

# SF32LB52x

## Overview

SF32LB52x is SiFli's cost-optimized MCU family for entry-level smart wearables, compact graphical HMIs, Bluetooth peripherals, and other space-constrained AIoT products that still need integrated display, audio, storage, and wireless capability.

At the platform level, the family combines a 240MHz Arm Cortex-M33 STAR-MC1 application core with a dedicated 24MHz low-power Bluetooth controller core, enabling the chip to run a responsive UI and application stack while keeping Bluetooth connectivity and always-on workloads separate.

For product planning, the important distinction is that SF32LB52 is split into two supply-oriented subfamilies:

- **SF32LB520/3/5/7**: lithium-ion battery-powered variants with an integrated charger path
- **SF32LB52B/D/E/G/J**: external-supply variants, where 52B/E/G/J target standard 3.3V systems and **52D** targets a special 1.8V ultra-low-power rail

These groups are not interchangeable at the board level. The battery-powered and external-supply families are not pin compatible with each other, and the 1.8V 52D variant is also electrically distinct from the 3.3V 52B/E/G/J group even where package alignment looks similar.

[^1]: The STAR-MC1 processor is an enhanced implementation of the Arm Cortex-M33 architecture developed by Arm China. It is fully compatible with the Cortex-M33 instruction set and software ecosystem, allowing existing Cortex-M33 applications, middleware, RTOSes, and development tools to be used without modification. By integrating instruction and data caches, support for the Armv8-M Custom Datapath Extension (CDE), and additional microarchitectural optimizations, STAR-MC1 delivers significantly higher performance while preserving the low power consumption and security features of the Cortex-M33 architecture. Following SiFli's documentation, it is generally referred interchangeably as ***Arm Cortex-M33 STAR-MC1*** or simply ***Arm Cortex-M33*** throughout our context.

## Applications

**SF32LB52x is recommended for** Bluetooth-centric products where cost, integration, and battery life are the primary design considerations, including:

- Entry-level smartwatches and fitness bands
- Bluetooth modules and wireless adapters
- Bluetooth audio accessories
- Smart sensors and wearable devices
- Electronic shelf labels and smart badges
- Portable label printers
- eBike and eScooter displays
- Basic LVGL-based HMI devices

## Development Resources

[Product Brief (SF32LB520/3/5/7)]: https://downloads.sifli.com/user%20manual/PB5201-SF32LB52x-Product%20Brief.pdf
[Datasheet (SF32LB520/3/5/7)]: https://downloads.sifli.com/user%20manual/DS5201-SF32LB52x-Datasheet%20V2p5p3.pdf
[Product Brief (SF32LB52X external-supply family)]: https://downloads.sifli.com/user%20manual/PB5202-SF32LB52X-Product%20Brief%20V0p1.pdf
[Datasheet (SF32LB52X external-supply family)]: https://downloads.sifli.com/user%20manual/DS5202-SF32LB52X-Datasheet%20V0p2p5.pdf
[Reference Manual]: https://downloads.sifli.com/user%20manual/UM5201-SF32LB52x-User%20Manual%20V0p8p4.pdf
[Hardware Design Guide (520/3/5/7)]: https://wiki.sifli.com/en/hardware/SF32LB520-3-5-7-HW-Application.html
[Hardware Design Guide (52B/D/E/G/J)]: https://wiki.sifli.com/en/hardware/SF32LB52B-E-G-J-HW-Application.html

<!--
[KiCad Files]:
[Schematic]:
-->

[Buy Samples]: https://sifli.taobao.com/
[Buy Dev Kits]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[Product Brief (SF32LB520/3/5/7)]__
- :fontawesome-solid-file-pdf: __[Datasheet (SF32LB520/3/5/7)]__
- :fontawesome-solid-file-pdf: __[Product Brief (SF32LB52X external-supply family)]__
- :fontawesome-solid-file-pdf: __[Datasheet (SF32LB52X external-supply family)]__
- :fontawesome-solid-file-pdf: __[Reference Manual]__
- :fontawesome-solid-file-lines: __[Hardware Design Guide (520/3/5/7)]__
- :fontawesome-solid-file-lines: __[Hardware Design Guide (52B/D/E/G/J)]__
- :fontawesome-solid-cart-shopping: __[Buy Samples]__
- :fontawesome-solid-cart-shopping: __[Buy Dev Kits]__

</div>

---

## Features and Specs

### Compute and Memory

- Arm Cortex-M33 STAR-MC1 application core up to 240MHz, with DSP and MPU
- Dedicated Arm Cortex-M33 STAR-MC1 Bluetooth controller core at 24MHz
- 32 KB instruction cache + 16 KB data cache
- 512 KB application SRAM plus 64 KB Bluetooth-controller SRAM
- Variant-dependent co-packaged memory options ranging from 1MB QSPI-NOR to 16MB OPI-PSRAM

### Graphics and Audio

- ePicasso 2.0 Lite 2D/2.5D graphics accelerator
- eZip 2.0 hardware decoder for lossless graphics compression
- Dedicated LCD controller supporting SPI/DSPI/QSPI, including e-paper SPI, plus 8080-8bit
- 1x 24-bit Audio ADC with 109 dB SNR
- 1x 24-bit Audio DAC with 99 dB SNR

### Wireless Connectivity

- Dual-mode BT/BLE, BT5.3 certified
- Maximum transmit power:
    - 17 dBm for BLE and BT/BR
    - 13 dBm for BT/EDR2 and BT/EDR3
- Sensitivity: -100 dBm @ BLE/1Mbps
- Dedicated Arm Cortex-M33 STAR-MC1 Bluetooth-controller core with 64 KB SRAM @ 24MHz
- Ultra-low sleep current around 2 µA for always-on wearable designs

### Security

- AES/HASH/CRC hardware accelerators
- TRNG
- PSA Level 1 Certified

### Peripherals and I/Os

- 3x UART
- 4x I2C
- 2x SPI
- 1x USB2.0 FS
- 1x I2S
- 1x PDM
- 1x SD3.0/SDIO3.0/eMMC
- 1x 12-bit general-purpose ADC
- Temperature sensor
- RTC and watchdog timers
- 44 or 45 GPIOs depending on variant family

### Power Supply

- **Battery-powered group: SF32LB520/3/5/7** — powered directly from a single-cell Li-ion/Li-Po battery and intended for designs that use the integrated charging-oriented power architecture.

- **External-supply 3.3V group: SF32LB52B/E/G/J** — intended for regulated external-supply systems and pin compatible with one another.

- **External-supply 1.8V group: SF32LB52D** — intended for special ultra-low-power 1.8V designs and not electrically interchangeable with the 3.3V parts.

The battery-powered and external-supply groups are independent silicon configurations and are **not pin compatible** across those supply families.

## Family Variants

<div align="center"><em>SF32LB52x Family Variants</em></div>

The practical part-selection split is:

- **SF32LB520/3/5/7**: lithium-ion battery-powered group, pin compatible within the group
- **SF32LB52B/E/G/J**: standard 3.3V external-supply group, pin compatible within the group
- **SF32LB52D**: special 1.8V external-supply variant for ultra-low-power scenarios

If you are migrating between memory tiers, the nearest content-correspondence map is:

- 520 ↔ 52B
- 523 ↔ 52E, with 52D as the 1.8V counterpart
- 525 ↔ 52G
- 527 ↔ 52J

<div align="center" markdown>

| SF32LB | 520U36 | 523UB6 | 525UC6 | 527UD6 | 52BU36 | 52BU56 | 52DUB6 | 52EUB6 | 52GUC6 | 52JUD6 |
|:-|-:|-:|-:|-:|-:|-:|-:|-:|-:|-:|
| Package | QFN68L | QFN68L | QFN68L | QFN68L | QFN68L | QFN68L | QFN68L | QFN68L | QFN68L | QFN68L |
| Size | 7 × 7 × 0.85mm | 7 × 7 × 0.85mm | 7 × 7 × 0.85mm | 7 × 7 × 0.85mm | 7 × 7 × 0.85mm | 7 × 7 × 0.85mm | 7 × 7 × 0.85mm | 7 × 7 × 0.85mm | 7 × 7 × 0.85mm | 7 × 7 × 0.85mm |
| Pitch | 0.35mm | 0.35mm | 0.35mm | 0.35mm | 0.35mm | 0.35mm | 0.35mm | 0.35mm | 0.35mm | 0.35mm |
| GPIOs | 44 | 44 | 44 | 44 | 45 | 45 | 45 | 45 | 45 | 45 |
| Co-packaged memory | 1MB QSPI-NOR | 4MB OPI-PSRAM | 8MB OPI-PSRAM | 16MB OPI-PSRAM | 1MB QSPI-NOR | 4MB QSPI-NOR | 4MB OPI-PSRAM | 4MB OPI-PSRAM | 8MB OPI-PSRAM | 16MB OPI-PSRAM |
| Chip supply | 3.2–4.7V | 3.2–4.7V | 3.2–4.7V | 3.2–4.7V | **3.3V** | **3.3V** | **1.8V** | **3.3V** | **3.3V** | **3.3V** |
| I/O voltage | 3.3V | 3.3V | 3.3V | 3.3V | 3.3V / 1.8V | 3.3V / 1.8V | 3.3V / 1.8V | 3.3V / 1.8V | 3.3V / 1.8V | 3.3V / 1.8V |
| Temperature | -40 to 85°C | -40 to 85°C | -40 to 85°C | -40 to 85°C | -40 to 85°C | -40 to 85°C | -40 to 85°C | -40 to 85°C | -40 to 85°C | -40 to 85°C |

</div>

## Related Products

### Module

[SF32LB52-MOD-1](../modules/SF32LB52-MOD-1.md) packages the SF32LB525UC6 chip, its RF matching network, and 8MB in-package OPI-PSRAM in the standard configuration, creating a certified, ready-to-integrate 27.9 × 18.0 × 3.1mm module for projects that want SF32LB52-class capability without owning chip-level RF layout and certification.

### Development Kits

- [SF32LB52-DevKit-LCD](../devkits/SF32LB52-DevKit-LCD.md) is the main display-oriented bring-up board for the SF32LB52 module ecosystem, with QSPI and MCU/8080 LCD connectivity.
- [SF32LB52-DevKit-Core-3p3](../devkits/SF32LB52-DevKit-Core-3p3.md) is the compact external-supply core board for quick firmware, GPIO, and low-power bring-up on 52B/J-class parts.
- [SF32LB52-DevKit-Nano](../devkits/SF32LB52-DevKit-Nano.md) is the smallest 52-series dev board, useful when the target product is size constrained.
- [SF32LB52-DevKit-ULP](../devkits/SF32LB52-DevKit-ULP.md) is the low-power-oriented board path for battery-focused evaluation and compact product experiments.

### Reference Products

Typical SF32LB52 designs include entry-level smartwatches, fitness bands, Bluetooth accessories, compact graphical controls, electronic shelf labels, smart badges, portable label printers, and cost-sensitive eBike or eScooter displays.
