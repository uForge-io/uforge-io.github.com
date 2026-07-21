---
icon: lucide/microchip
description: "SF32LB55x: mainstream ultra-low-power BLE MCU family for wearable and HMI products that need stronger graphics, more SRAM, and broader package choice than entry-level devices."
tags:
    - Hardware
    - Chip
---

# SF32LB55x

## Overview

The SF32LB55x series is a mainstream ultra-low-power AIoT microcontroller family for BLE-connected products that need more display capability, more memory headroom, and more package flexibility than entry-level Bluetooth MCUs.

It uses a big.LITTLE dual-core architecture built around two Arm Cortex-M33 STAR-MC1[^1] processors: a high-performance application core running at up to 240MHz and an ultra-low-power core running at up to 48MHz. In practice, that split makes SF32LB55x a strong fit for products that need richer UI workloads on the main core while leaving sensing, standby control, and always-on BLE work to the low-power side.

According to SiFli's official product brief and datasheet, the family combines BLE 5.2, the ePicasso 2.5D graphics engine, dual LCD controllers, a TinyML-oriented neural-network matrix accelerator, up to 1.4MB SRAM, and external-memory support for NOR, NAND, eMMC, and PSRAM. That combination makes SF32LB55x a practical starting point for wearable, sensor-rich, and compact HMI products that need more headroom than SF32LB52x without moving to the larger 56/58-class devices.

SiFli's own chip model guide also notes that SF32LB55x was defined earlier than the later 52/56/58 families, so its suffix naming does not fully follow the newer numbering convention. Treat exact orderable part numbers and package-specific capability tables as the design authority rather than trying to infer every capability from the suffix alone.

[^1]: The STAR-MC1 processor is an enhanced implementation of the Arm Cortex-M33 architecture developed by Arm China. It is fully compatible with the Cortex-M33 instruction set and software ecosystem, allowing existing Cortex-M33 applications, middleware, RTOSes, and development tools to be used without modification. Following SiFli documentation, it is generally referred to as **Arm Cortex-M33 STAR-MC1** or simply **Arm Cortex-M33** in this documentation.

## Applications

**SF32LB55x is recommended for** BLE-first products that need a stronger UI, larger working memory, or more flexible packaging than entry-level wearable MCUs, including:

- Smartwatches and fitness bands
- Health-monitoring wearables
- Smart locks and smart-home controllers
- Sensor-rich connected accessories
- Compact graphical HMI products
- Smart stylus and pen-computing accessories
- Portable terminals and handheld controllers

Choose SF32LB55x when the design needs one or more of these capabilities:

- BLE 5.2 connectivity with very low receive current
- MIPI DSI command-mode display support
- Larger SRAM for LVGL, graphics assets, sensing, or TinyML workloads
- A user-programmable low-power processor
- More GPIO or denser package options than SF32LB52x
- External NOR, NAND, eMMC, QSPI-PSRAM, or OPI-PSRAM flexibility

## Development Resources

[Product Brief]: https://downloads.sifli.com/silicon/PB0001-SF32LB55x-Product%20Brief%20V1p3.pdf
[Datasheet]: https://downloads.sifli.com/user%20manual/DS5501-SF32LB55x-Datasheet%20V1p7p2.pdf
[User Manual]: https://downloads.sifli.com/docs/user%20manual/SF32LB55x/UM5501%E2%80%90SF32LB55x%E2%80%90EN.pdf
[Original Design Guide (wiki.sifli.com)]: https://wiki.sifli.com/en/hardware/SF32LB55x-HW-Application.html
[Hardware Application Note (GitHub source)]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB55x-HW-Application.md
[Hardware Design Guide (μForge, dev)]: SF32LB55x_hardware_design_guide.md
[Hardware Design Checklist Source]: https://wiki.sifli.com/hardware/index.html
[SDK Documentation]: https://docs.sifli.com/projects/sdk/latest/sf32lb55x/index.html
[API Reference]: https://docs.sifli.com/projects/sdk/latest/sf32lb55x/api/index.html
[Buy Samples]: https://sifli.taobao.com/
[Buy Dev Kits]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[Product Brief]__
- :fontawesome-solid-file-pdf: __[Datasheet]__
- :fontawesome-solid-file-pdf: __[User Manual]__
- :fontawesome-solid-file-lines: __[Original Design Guide (wiki.sifli.com)]__
- :fontawesome-brands-github: __[Hardware Application Note (GitHub source)]__
- :fontawesome-solid-file-lines: __[Hardware Design Guide (μForge, dev)]__
- :fontawesome-solid-book: __[SDK Documentation]__
- :fontawesome-solid-book-open: __[API Reference]__
- :fontawesome-solid-list-check: __[Hardware Design Checklist Source]__
- :fontawesome-solid-cart-shopping: __[Buy Samples]__
- :fontawesome-solid-cart-shopping: __[Buy Dev Kits]__

</div>

---

## Features and Specs

### Compute and Memory

- High-performance Arm Cortex-M33 STAR-MC1 application processor, up to 240MHz
- Ultra-low-power Arm Cortex-M33 STAR-MC1 processor, up to 48MHz
- Up to 360 DMIPS / 965 EEMBC CoreMark on the application processor
- Up to 72 DMIPS / 193 EEMBC CoreMark on the low-power processor
- 1088KB application SRAM, including 64KB retention SRAM
- 224KB low-power SRAM, all retention SRAM
- External memory interfaces for NOR, NAND, eMMC, QSPI-PSRAM, and OPI-PSRAM

### Graphics, Display, and AI

- ePicasso 2.5D graphics engine with hardware rotation, scaling, mirroring, and alpha blending
- eZip lossless graphics decompression with ePicasso concatenation
- Display resolution up to 640 × 640
- LCD controller supporting 8080, SPI, Dual-SPI, Quad-SPI, and MIPI DSI interfaces
- TurboPixel framebuffer compression and decompression
- Dual LCD controllers for always-on-display use cases
- Neural-network matrix accelerator for TinyML workloads, up to 1.92GOPS and 5.73TOPS/W

### Wireless Connectivity

- Bluetooth Low Energy 5.2
- BLE 125Kbps, 500Kbps, 1Mbps, and 2Mbps modes
- Sensitivity down to -100dBm at 1Mbps mode
- Maximum transmit power: 10dBm
- Receive peak current: 2.0mA at 3.3V

### Security

- AES and CRC hardware accelerators
- True random number generator (TRNG)
- PSA Certified Level 1

### Peripherals and I/Os

- 5x UART
- 6x I2C
- 4x SPI
- 2x I2S
- 2x PDM
- 1x USB2.0 FS Host/Device
- 1x 10-bit general-purpose SAR ADC, 8 channels
- 1x 16-bit Sigma-Delta ADC, 5 channels
- Temperature sensor
- 2x low-power voltage comparators
- Peripheral Task Controller (PTC)
- Up to 119 GPIOs, depending on package

### Power Supply and Package

- Power supply range: 1.7V to 3.6V
- Operating temperature: -40 to 85°C
- Integrated power management with two high-efficiency buck regulators and low-power LDO
- Sleep current with RTC wake-up: 600nA
- Sleep current with pin wake-up: 280nA
- Package options: QFN68L, BGA145, and BGA169

## Family Variants

SF32LB55x devices are offered in QFN and BGA packages. Select the package early because GPIO count, memory routing, display-interface choice, and PCB process all vary materially by package.

Package choice is not just a layout decision here. SiFli's model guide explicitly notes that the 55x family supports all or only part of the display-interface set depending on package, so package selection should be locked before display, memory, and pin-budget planning are finalized.

<div align="center"><em>SF32LB55x Package Options</em></div>

<div align="center" markdown>

| Package | GPIO Count | Typical Design Fit |
| :--- | :--- | :--- |
| QFN68L | 49 | Compact wearable or BLE sensor product with lower PCB process cost |
| BGA145 | 95 | Display, memory, and sensor-rich design with more routing headroom |
| BGA169 | 119 | Highest-I/O SF32LB55x designs with richer display and memory options |

</div>

## Related Products

### Development Kits

Use the official hardware application note, reference schematics, and checklist as the starting point for package selection, power-tree definition, display-interface choice, memory planning, RF layout, and production-test planning.

### Reference Products

Typical SF32LB55x end products include smartwatches, fitness bands, health-monitoring wearables, smart locks, connected accessories, smart-home controllers, and compact graphical HMIs.
