---
icon: lucide/microchip
description: "SF32LB56x: advanced ultra-low-power dual-mode Bluetooth MCU family for products that need richer displays, integrated audio, external memory, and stronger always-on processing."
tags:
    - Hardware
    - Chip
---

# SF32LB56x

## Overview

The SF32LB56x series is an advanced ultra-low-power AIoT microcontroller family for products that need dual-mode Bluetooth, richer graphics, integrated audio, external memory, and more display/storage flexibility than the lower-tier SF32LB devices.

It uses a big.LITTLE dual-core architecture with a high-performance Arm Cortex-M33 STAR-MC1[^1] application processor running at up to 240MHz and an ultra-low-power Arm Cortex-M33 STAR-MC1 processor running at up to 96MHz. That split lets the main core absorb UI, display, storage, and product logic workloads while the low-power core handles always-on sensing, standby behavior, and Bluetooth control with a lower energy budget.

SiFli's official product brief and datasheet position SF32LB56x as a higher-integration choice for display- and audio-rich connected devices. The family adds dual-mode Bluetooth 5.3 with BLE Audio support, ePicasso 2.0 graphics, integrated audio ADC/DAC paths, a TinyML-oriented accelerator, package-integrated Flash options, and broader external-memory and display-interface support. In practice, it is a strong fit when a design has outgrown SF32LB55x in wireless, display, or audio complexity but still wants MCU-class power and integration.

SiFli's chip model guide also matters here: the SF32LB56x family supports different display-interface combinations across its packages, so exact part number and package selection should be treated as a first-order architecture choice, not a late PCB detail.

[^1]: The STAR-MC1 processor is an enhanced implementation of the Arm Cortex-M33 architecture developed by Arm China. It is fully compatible with the Cortex-M33 instruction set and software ecosystem, allowing existing Cortex-M33 applications, middleware, RTOSes, and development tools to be used without modification. Following SiFli documentation, it is generally referred to as **Arm Cortex-M33 STAR-MC1** or simply **Arm Cortex-M33** in this documentation.

## Applications

**SF32LB56x is recommended for** dual-mode Bluetooth products that need better display, audio, storage, or local-processing capability, including:

- Smartwatches and smart bands
- Graphical wearable products
- Medical and healthcare devices
- Connected HMI products
- Industrial handheld terminals
- Smart locks and smart appliances
- Low-power sensor hubs
- Advanced eBike and eScooter displays

Choose SF32LB56x when the design needs one or more of these capabilities:

- Dual-mode Bluetooth 5.3 with BLE Audio support
- Integrated HiFi audio ADC and DAC
- Larger display and graphics workloads
- DPI/RGB display-interface support
- External Wi-Fi or storage through SDIO/eMMC-class interfaces
- Higher GPIO count through the WBBGA175 option
- Better headroom for TinyML, audio, and UI concurrency

## Development Resources

[Product Brief]: https://downloads.sifli.com/silicon/PB0056-SF32LB56x-Product%20Brief%20V1p1.pdf
[Datasheet]: https://downloads.sifli.com/user%20manual/DS5601-SF32LB56x-Datasheet%20V1p9p2.pdf
[User Manual]: https://downloads.sifli.com/docs/user%20manual/SF32LB56x/UM5601%E2%80%90SF32LB56x%E2%80%90EN.pdf
[Hardware Design Guide (U, wiki.sifli.com)]: https://wiki.sifli.com/en/hardware/SF32LB56xU-HW-Application.html
[Hardware Design Guide (V, wiki.sifli.com)]: https://wiki.sifli.com/en/hardware/SF32LB56xV-HW-Application.html
[Hardware Application Source (U)]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB56xU-HW-Application.md
[Hardware Application Source (V)]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB56xV-HW-Application.md
[Hardware Design Guide (μForge, dev)]: SF32LB56x_hardware_design_guide.md
[Hardware Design Checklist Source]: https://wiki.sifli.com/hardware/index.html
[SDK Documentation]: https://docs.sifli.com/projects/sdk/latest/sf32lb56x/index.html
[API Reference]: https://docs.sifli.com/projects/sdk/latest/sf32lb56x/api/index.html
[SF32LB56-MOD]: ../modules/SF32LB56-MOD.md
[Buy Samples]: https://sifli.taobao.com/
[Buy Dev Kits]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[Product Brief]__
- :fontawesome-solid-file-pdf: __[Datasheet]__
- :fontawesome-solid-file-pdf: __[User Manual]__
- :fontawesome-solid-file-lines: __[Hardware Design Guide (U, wiki.sifli.com)]__
- :fontawesome-solid-file-lines: __[Hardware Design Guide (V, wiki.sifli.com)]__
- :fontawesome-brands-github: __[Hardware Application Source (U)]__
- :fontawesome-brands-github: __[Hardware Application Source (V)]__
- :fontawesome-solid-file-lines: __[Hardware Design Guide (μForge, dev)]__
- :fontawesome-solid-book: __[SDK Documentation]__
- :fontawesome-solid-book-open: __[API Reference]__
- :fontawesome-solid-list-check: __[Hardware Design Checklist Source]__
- :fontawesome-solid-sim-card: __[SF32LB56-MOD]__
- :fontawesome-solid-cart-shopping: __[Buy Samples]__
- :fontawesome-solid-cart-shopping: __[Buy Dev Kits]__

</div>

---

## Features and Specs

### Compute and Memory

- High-performance Arm Cortex-M33 STAR-MC1 application processor (HCPU), up to 240MHz
- Ultra-low-power Arm Cortex-M33 STAR-MC1 processor (LCPU), up to 96MHz
- Up to 370 DMIPS / 984 EEMBC CoreMark on HCPU
- Up to 148 DMIPS / 394 EEMBC CoreMark on LCPU
- HCPU memory system: 32KB I-cache + 16KB D-cache, 800KB SRAM including 128KB retention SRAM
- LCPU memory system: 16KB I-cache + 8KB D-cache, 160KB retention SRAM
- 512KB or 1MB in-package QSPI-NOR options
- External memory interfaces for QSPI-NOR, SPI-NAND, QPI/OPI-PSRAM, SD/SDIO, and eMMC

### Graphics, Display, and AI

- ePicasso 2.0 2D/2.5D graphics acceleration
- 4-layer alpha blending plus one background layer
- Hardware rotation, scaling, mirroring, and common-format conversion
- Graphics-engine workload up to 1024 × 1024
- eZip 2.0 lossless graphics decompression with native eZip-A animation support
- LCD controller supporting 8080, SPI, Dual-SPI, Quad-SPI, DPI/RGB, and JDI interfaces
- TurboPixel: extDMA fixed-ratio lossy final-framebuffer compression and display-controller decompression, reducing PSRAM bandwidth and capacity
- Neural-network matrix accelerator for TinyML workloads, up to 1.92GOPS and above 10TOPS/W

### Audio and Wireless Connectivity

- Dual-mode Bluetooth 5.3 with BLE Audio support
- Sensitivity: -100dBm BLE 1Mbps, -96.3dBm BR, -95.5dBm EDR2, -88.5dBm EDR3
- Maximum transmit power: 19dBm for BR/BLE, 13dBm for EDR2/EDR3
- BR receive peak current: 2.2mA at 3.3V
- 1x HiFi 24-bit audio DAC, 108dB SNR
- 1x HiFi 24-bit audio ADC, 99dB SNR
- 2x PDM and 1x I2S

### Security

- AES, HASH, and CRC hardware accelerators
- True random number generator (TRNG)
- PSA Certified Level 1

### Peripherals and I/Os

- 6x UART
- 7x I2C
- 4x SPI
- 1x ISO7816
- 1x USB2.0 FS
- 4x MPI
- 2x SD/SDIO/eMMC, one 4-bit and one 8-bit
- 1x 12-bit general-purpose SAR ADC, 8 channels
- Temperature sensor
- 2x low-power voltage comparators
- Peripheral Task Controller (PTC)
- Up to 120 GPIOs, depending on package

### Power Supply and Package

- Power supply range: 1.7V to 3.6V
- Operating temperature: -40 to 85°C
- Integrated high-efficiency buck and low-power LDO
- Sleep current with RTC wake-up: 600nA
- Sleep current with pin wake-up: 300nA
- Package options: QFN68L and WBBGA175

## Family Variants

SF32LB56x spans compact QFN68L parts and higher-I/O WBBGA175 parts with different bundled memory options. Select the exact order code early, because display interface support, GPIO headroom, storage capacity, PCB process, and module migration options differ substantially across the family.

<div align="center"><em>Representative SF32LB56x Family Variants</em></div>

<div align="center" markdown>

| Example Part | Package | Integrated Memory | Display Interface | Typical Design Fit |
| :--- | :--- | :--- | :--- | :--- |
| SF32LB560UNN26 | QFN68L | 512KB QSPI-NOR Flash | QSPI | Entry 56-series wearable, e-paper, or compact HMI designs that need the lowest memory footprint and simplest PCB escape |
| SF32LB561UBN26 | QFN68L | 4MB OPI-PSRAM + 512KB QSPI-NOR Flash | QSPI | Compact graphics designs that need framebuffer headroom beyond the base 560 tier |
| SF32LB563UCN26 | QFN68L | 8MB OPI-PSRAM + 512KB QSPI-NOR Flash | QSPI | Higher-resolution compact UI designs that still want the lower-cost QFN route |
| SF32LB56WUND26 | QFN68L | 16MB OPI-PSRAM + 512KB QSPI-NOR Flash | QSPI | Memory-heavy compact products that need larger local assets without moving to BGA |
| SF32LB566VCB36 | WBBGA175 | 8MB + 4MB OPI-PSRAM + 1MB QSPI-NOR Flash | DPI / QSPI / 8080 / JDI | Full-featured wearable and HMI designs that need richer display options, higher I/O, and the exact silicon used by SF32LB56-MOD |
| SF32LB567VND36 | WBBGA175 | 16MB OPI-PSRAM + 1MB QSPI-NOR Flash | DPI / QSPI / 8080 / JDI | High-I/O designs that prioritize larger single-pool PSRAM and advanced display routing without using the module’s standard chip choice |

</div>

## Integration Path

Use this sequence to turn an SF32LB56x shortlist into a validated design:

1. **Prove the firmware path.** Start with the [SiFli SDK getting-started guide](../../getting-started/sifli/getting-started-sifli-sdk.md), then use the [SiFli SDK workflow](../../develop/platforms/sifli-sdk/overview.md) and [examples](../../develop/examples/index.md) to exercise the target display, audio, Bluetooth, and storage path.
2. **Choose the integration vehicle.** Evaluate [SF32LB56-MOD](../modules/SF32LB56-MOD.md) to reduce RF and high-speed-memory integration work, or use [SF32LB56-DevKit-LCD](../devkits/SF32LB56-DevKit-LCD.md) for board-level validation.
3. **Design and review the hardware.** Use the local [hardware design guide](SF32LB56x_hardware_design_guide.md) and [hardware design checklist](SF32LB56x_hardware_design_checklist.md) before releasing the schematic or layout. Keep the U/V package and display-interface choice aligned with the selected part.
4. **Verify the authoritative source.** Confirm the exact orderable part and package against the SiFli [datasheet], [user manual], applicable [U] or [V hardware design guide], and the corresponding [hardware application source].

## Related Products

### Module

[SF32LB56-MOD](../modules/SF32LB56-MOD.md) packages the SF32LB566VCB36 chip, memory, RF design, and antenna options into a ready-to-integrate module. It is a strong choice when the project wants SF32LB56x capability while reducing RF layout, antenna matching, crystal placement, and high-speed memory integration risk.

### Development Kits

[SF32LB56-DevKit-LCD](../devkits/SF32LB56-DevKit-LCD.md) is a practical starting point for firmware bring-up, display validation, audio and storage testing, RF checks, and power profiling before committing to a chip-down or module-based design.

### Reference Products

Typical SF32LB56x end products include advanced smartwatches, connected HMI panels, healthcare devices, industrial handhelds, portable instruments, and richer eBike or eScooter displays.
