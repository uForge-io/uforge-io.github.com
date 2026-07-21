---
icon: lucide/microchip
description: "SF32LB57x: ultra-low-power multicore Bluetooth 6.3 AIoT MCU family for graphics-rich, audio-capable, camera-enabled connected products, with dual 240 MHz performance cores, a 24 MHz efficiency core, ePicasso 3.0 graphics, eZip 3.0 decompression, and compact QFN/BGA packages."
tags:
    - Hardware
    - Chip
---

# SF32LB57x

## Overview

The SF32LB57x series is an ultra-low-power, highly integrated AIoT MCU family for wearable, portable smart-device, smart-home, and compact display products. It is intended for designs that need richer graphics, Bluetooth audio, camera input, external storage, and always-on behavior than a basic Bluetooth MCU can comfortably support, without moving to an application-processor-class power, cost, or integration model.

SF32LB57x uses a multicore Arm Cortex-M33 STAR-MC1[^1] dual-system architecture. The high-performance system includes two Arm Cortex-M33 STAR-MC1 performance cores running up to 240 MHz, while the low-power system includes an Arm Cortex-M33 STAR-MC1 efficiency core running up to 24 MHz. The two performance cores are rated at 1968 CoreMark / 740 DMIPS. This split gives UI rendering, application code, and multimedia workloads sufficient headroom while allowing standby, Bluetooth, and sensor-hub tasks to remain on a lower-power path.

The platform integrates 592 KB of on-chip retention SRAM, ePicasso 3.0 2D/2.5D graphics acceleration, eZip 3.0 hardware decompression, a dedicated LCD controller, a DCMI camera controller, Bluetooth 6.3 dual-mode wireless, high-fidelity audio ADC/DAC resources, storage interfaces for SiP and external memory, security acceleration, and flexible GPIO assignment through FreeIO. A key 57x differentiator is PTM (Parallel Task Machine): a small parallel task processor that moves cycle-sensitive peripheral sequencing, custom IO protocols, sensor collection, PWM-like timing, and event-driven coordination away from the main CPUs.

For hardware planning, the most important early decision is the power/package baseline. SF32LB57x is available in QFN68, QFN80, and BGA112 packages, with battery-powered and externally regulated 3.3 V baselines differentiated by part family. That choice affects power-tree design, available GPIO count, package fanout, display/storage routing, debug access, and bring-up strategy, so the exact orderable part should be selected before schematic reuse or PCB layout starts.

[^1]: The STAR-MC1 processor is an enhanced implementation of the Arm Cortex-M33 architecture developed by Arm China. It is fully compatible with the Cortex-M33 instruction set and software ecosystem, allowing existing Cortex-M33 applications, middleware, RTOSes, and development tools to be used without modification.

## Applications

**SF32LB57x is a strong fit for** compact connected products that need graphics, Bluetooth audio, camera input, external storage, or always-on sensing in a low-power MCU platform, including:

- Wearable smartwatches and fitness bands
- Smart human-machine-interface devices
- E-paper smart devices
- Small and medium smart home appliances
- Portable recording and audio products
- Wearable medical devices and fitness equipment
- Industrial display, sensing, monitoring, and instrumentation products
- Camera-enabled wearable or handheld devices
- Display-centric compact terminals and control panels
- Automotive center-console controllers, wireless car keys, and wearable car remote controls
- Smart door locks
- Bluetooth walkie-talkie and intercom products
- Electronic photo frames
- Bluetooth mesh and low-power sensor-hub networks

It is especially suitable when the design needs one or more of these capabilities:

- Dual 240 MHz performance cores plus a 24 MHz efficiency core for UI/application work and low-power background tasks
- ePicasso 3.0 graphics acceleration with real-time rotation, scaling, projection, mirroring, and alpha blending
- eZip 3.0 decompression for eZip/eZip-A, JPEG, and MJPEG assets without forcing every asset through a CPU-heavy decode path
- LCD interfaces across 8080, SPI/Dual-SPI/Quad-SPI, DPI/RGB, JDI, and 8/16-bit EPD
- DCMI camera input over DVP or SPI/Dual-SPI/Quad-SPI
- Bluetooth 6.3 dual-mode connectivity, including BLE Audio and LE Long Range
- High-fidelity 24-bit audio ADC/DAC resources for playback, recording, and Bluetooth calling
- SiP OPI-PSRAM / QSPI-NOR plus external QSPI-NOR/NAND, QPI-PSRAM, SD, SDIO, or eMMC storage options
- PTM offload for custom peripheral tasks, deterministic IO timing, fast trigger response, and low-overhead sensor or interface automation

## Development Resources

[Product Brief]: https://downloads.sifli.com/silicon/PB0057-SF32LB57x-Product%20Brief.pdf
[Datasheet]: https://downloads.sifli.com/user%20manual/DS5701-SF32LB57x-Datasheet.pdf
[User Manual]: https://downloads.sifli.com/docs/user%20manual/SF32LB57x/UM5701-SF32LB57x-EN.pdf
[Original Design Guide (wiki.sifli.com)]: https://wiki.sifli.com/en/hardware/SF32LB57x-HW-Application.html
[Hardware Design Guide (μForge, dev)]: SF32LB57x_hardware_design_guide.md
[SiFli Approved Vendor List]: ../others/sifli-approved-vendor-list.md
[Buy Samples]: https://sifli.taobao.com/
[Buy Dev Kits]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[Product Brief]__
- :fontawesome-solid-file-pdf: __[Datasheet]__
- :fontawesome-solid-file-pdf: __[User Manual]__
- :fontawesome-solid-file-lines: __[Original Design Guide (wiki.sifli.com)]__
- :fontawesome-solid-file-lines: __[Hardware Design Guide (μForge, dev)]__
- :fontawesome-solid-file-excel: __[SiFli Approved Vendor List]__
- :fontawesome-solid-cart-shopping: __[Buy Samples]__
- :fontawesome-solid-cart-shopping: __[Buy Dev Kits]__

</div>

---

## Features and Specs

### Compute and Memory

- High-performance system with dual Arm Cortex-M33 STAR-MC1 cores up to 240 MHz
- Low-power system with one Arm Cortex-M33 STAR-MC1 efficiency core up to 24 MHz
- Dual-performance-core score of 1968 CoreMark / 740 DMIPS
- HCPU cache: 32 KB 2-way instruction cache and 16 KB 4-way data cache
- ACPU instruction/data cache resources for XIP and application acceleration
- 512 KB HPSYS retention SRAM plus 80 KB LPSYS retention SRAM, for 592 KB total on-chip SRAM
- 128 KB zero-wait-cycle D-TCM shared with the HPSYS SRAM address space
- Single-precision FPU and MPU support
- GPDMA with linked-list mode

### PTM Peripheral Task Machine

- 4-core Parallel Task Machine for custom peripheral tasks that benefit from hardware-timed execution instead of continuous CPU service
- Compact custom instruction set for bus reads/writes, data operations, conditional branches, IO reads/writes, event waits, and fixed delays
- Cycle-level timing control when executing from PTM TCM, suitable for deterministic IO sequencing
- Each PTM core can handle up to 16 IO channels, with FIFO/DMA support for custom communication interfaces
- PTM cores can access AHB bus memory and peripheral registers, generate interrupts to the CPU, and coordinate with each other through internal event notifications
- Practical fit for custom interface protocols, custom PWM, batched memory/data operations, multi-module scheduling, and automatic sensor collection

### Wireless Connectivity

- Bluetooth 6.3 dual-mode radio
- BLE Audio and LE Long Range support
- Receiver sensitivity: −100 dBm at BLE 1 Mbps, −108 dBm at BLE 125 kbps, −96.3 dBm at BR, and −95.5 dBm at EDR2
- Maximum transmit power: 13 dBm for EDR2/EDR3 and 18 dBm for BR/BLE
- BR receiver peak current as low as 2.0 mA at 3.8 V

### Graphics, Display, and Camera

- ePicasso 3.0 2D/2.5D graphics engine
- Hardware-accelerated rotation, scaling, projection, mirroring, alpha blending, and multi-layer composition
- Maximum graphics resolution of 2048 × 2048
- RGB formats including RGB888, RGB565, aRGB8888, and aRGB8565
- Additional formats including L8/L4, G8/G4/G2, A8/A4/A2, and YUV
- eZip 3.0 decompression engine for lossless eZip/eZip-A image and animation assets
- JPEG image and MJPEG animation decompression
- eZip and ePicasso linked operation without an intermediate frame buffer
- Dedicated LCD controller supporting 8080, SPI/Dual-SPI/Quad-SPI, DPI/RGB, JDI, and 8/16-bit EPD display interfaces
- Low-power always-on display use cases supported by the display subsystem
- DCMI camera controller supporting DVP and SPI/Dual-SPI/Quad-SPI camera interfaces

### Audio and Analog

- 1× high-fidelity 24-bit audio DAC with 109 dB SNR
- 2× high-fidelity 24-bit audio ADCs with 99 dB SNR
- Audio sample-rate coverage from 8 kHz to 96 kHz, including common telephony and music rates
- Micbias LDO with 1.4 V to 2.8 V output range and up to 2 mA output current
- Supports audio playback, recording, Bluetooth calling, and headset-connected MP3 playback designs
- 1× 12-bit general-purpose SAR ADC with 12 channels
- 1× on-chip temperature sensor

### Storage and Security

- SiP OPI-PSRAM support up to 144 MHz
- SiP NOR Flash support up to 96 MHz
- 1× MPI (QSPI) interface for external NOR, NAND, and QPI-PSRAM, with address-mapped XIP operation
- 2× SD/SDIO interfaces supporting SD 3.0, SDIO 3.0, and eMMC
- On-the-fly Flash decryption support
- AES, HASH, and CRC accelerators
- True random-number generator (TRNG)
- eShield security architecture
- PSA Certified Level 1

### Peripherals and I/Os

- Up to 64 GPIOs, depending on package
- FreeIO flexible GPIO assignment
- 3× UART
- 4× I2C
- 2× SPI
- 2× I2S
- 2× PDM
- 1× USB 2.0 Full-Speed
- 2× CAN
- PTM event integration for event-driven peripheral workflows and multicore coordination
- 2× 16-bit GPTIM
- 4× 32-bit BTIM
- 2× 32-bit ATIM
- 2× 24-bit LPTIM
- 1× PWM
- 1× RTC
- 2× 24-bit WDT and 1× independent WDT

### Power Management

- Integrated high-efficiency Buck converter and low-power LDOs
- Two external 3.3 V supply outputs, up to 150 mA each
- Hibernate current down to 2 µA
- Integrated configurable linear Li-ion battery charger on the battery-powered baseline
- Charger full-voltage range from 4.2 V to 4.45 V
- VBAT range: 3.2 V to 4.7 V
- VBUS range: 4.6 V to 5.5 V
- Operating temperature range: −40°C to +85°C

## Family Variants

SF32LB57x spans battery-powered and externally regulated 3.3 V package baselines. Select the exact part number before schematic capture, because package drawings, power pins, available GPIO count, bundled memory, and board constraints differ across the family.

<div align="center"><em>SF32LB57x Package and Power Overview</em></div>

<div align="center" markdown>

| Package / Part Pattern | Size | Power Baseline | GPIO Count | Design Meaning |
| :--- | :--- | :--- | ---: | :--- |
| QFN68 / `SF32LB57xU` | 7 × 7 mm | Li-ion battery powered | 46 | For compact battery products that use the integrated charger and battery power path |
| QFN68 / `SF32LB57XU` | 7 × 7 mm | External 3.3 V | 47 | Compact externally regulated design with moderate GPIO needs |
| QFN80 / `SF32LB57xY` | 8 × 8 mm | Battery or external 3.3 V baseline | 58 | More GPIO and routing space while staying in QFN assembly flow |
| BGA112 / `SF32LB57xV` | 5.4 × 4.4 mm | Battery or external 3.3 V baseline | 64 | Highest GPIO count and compact footprint, with BGA fanout and PCB-process implications |

</div>

For SF32LB57x, package selection is not just a PCB-cost question. It affects display-interface availability, external-storage routing, GPIO budget, debug/download pin retention, and fanout difficulty, so package choice should be locked together with the power architecture.

<div align="center"><em>SF32LB57x Orderable Examples</em></div>

<div align="center" markdown>

| Orderable Part | Package | Bundled Memory | Reel Quantity |
| :--- | :--- | :--- | ---: |
| SF32LB573UB7N6 | QFN68, 7 × 7 mm, T0.9, P0.35 | 32 Mb OPI-PSRAM + 128 Mb NOR Flash | 3000 |
| SF32LB575YBBN6 | QFN80, 8 × 8 mm, T0.9, P0.35 | 32 Mb × 2 OPI-PSRAM | 3000 |

</div>

Use the orderable part number, not only the package name, as the BOM and schematic baseline. The memory suffix changes the SiP storage configuration and can affect boot-media assumptions, power sequencing, and external-storage requirements.

## Related Products

### Hardware Design Baseline

Use the [Hardware Design Guide (μForge, dev)](SF32LB57x_hardware_design_guide.md), the official hardware application note, the datasheet, and the approved vendor list as the design baseline. Confirm the power architecture, package fanout, display, storage, audio, camera, RF, and debug/download plan before releasing the schematic or PCB.

### Development Kits

Use the official reference schematics, minimum-system guidance, and checklist material to plan power, clocks, RF, display, storage, audio, camera, and production access.

### Reference Products

Typical SF32LB57x end products include wearable watches and bands, smart HMI devices, e-paper products, small and medium smart appliances, portable recording/audio devices, smart-home panels, compact display terminals, and camera-enabled Bluetooth products.
