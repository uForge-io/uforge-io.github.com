---
icon: lucide/cpu
description: "SF32LB5xx family overview: heterogeneous Cortex-M33 cores, Bluetooth, ePicasso graphics, and edge AI, with a comparison table and quick chip-selection guide."
tags:
  - Hardware
  - Chip
---

# SF32 Family

## Introduction

The **SF32** family, particularly the **SF32LB5xx** series, is a portfolio of highly integrated, ultra-low-power 32-bit microcontrollers developed by SiFli Technologies for battery-powered AIoT and wearable applications.

Designed to bridge the gap between traditional microcontrollers and application processors, **SF32** devices combine low-power sensor operation, wireless connectivity, graphics acceleration, multimedia processing, and large-capacity integrated memory in a compact System-in-Package (SiP) architecture. The family is optimized for products such as smartwatches, fitness trackers, smart displays, portable medical devices, and intelligent edge-connected accessories.

The **LB** (Low-Power Bluetooth) series is the first member of the SF32 product family, with additional application-focused series planned in the future.

## Hardware Workflows

<div class="grid cards" markdown>

- :lucide-route:{ .uf-hw-icon .uf-hw-blue } **Plan an SF32 Product**

    Follow one path from product requirements and device selection through board validation and production readiness.

    [Plan the product :material-arrow-right:](../product-planning.md){ .uf-hw-link-blue }

- :lucide-list-checks:{ .uf-hw-icon .uf-hw-purple } **Choose Hardware**

    Compare SF32 families, select a chip or module, and identify the right development board for early validation.

    [Start selecting :material-arrow-right:](../choose-hardware.md){ .uf-hw-link-purple }

- :lucide-clipboard-check:{ .uf-hw-icon .uf-hw-green } **Design for Production**

    Move from a selected part to schematic, layout, BOM, CAD, checklist, and bring-up evidence.

    [Plan production work :material-arrow-right:](../design-for-production.md){ .uf-hw-link-green }

</div>

## Key Features

1. **Heterogeneous Multi-Core Architecture**

    SF32LB microcontrollers employ an Arm Cortex-M33 STAR-MC1 based heterogeneous multi-core architecture that balances high-performance application processing with ultra-low-power background operation. Depending on the device, the architecture may include one or more application processors alongside dedicated low-power processors responsible for Bluetooth connectivity, sensor processing, and always-on system functions.

    !!! info "STAR-MC1 Processor"
        STAR-MC1 is a configurable Armv8-M Mainline CPU IP from Arm China, used as the Cortex-M33-class application processor in compatible SF32 devices. Cortex-M33-oriented firmware, middleware, RTOS ports, and tools remain relevant, subject to normal device-specific integration work. Its CU, SP, and SE configurations differ chiefly in cache, TCM, XIPU, and TrustZone capability; Arm Custom Instructions/CDE and the coprocessor interface are optional capabilities. SiFli documentation may use ***Arm Cortex-M33 STAR-MC1*** or ***Arm Cortex-M33*** according to context.

        For device-specific guidance on configuration, TCM, caches, CDE, coprocessors, and representative performance measurement, see [STAR-MC1 Architecture Deep Dive](../../learn/architecture/star-mc1.md).


2. **Ultra-Low-Power Wireless Connectivity**

    The SF32LB series integrates Bluetooth Low Energy (BLE) or dual-mode Bluetooth (BT/BLE) connectivity directly on-chip.

    The wireless subsystem is optimized for wearable and battery-powered devices, delivering industry-leading power efficiency, maximum transmit power, and receiver sensitivity for applications requiring continuous connectivity, sensor synchronization, audio streaming, and smartphone integration.

3. **Hardware-Accelerated Graphics and Display Engine**

    All SF32LB microcontrollers integrate ePicasso, an in-house developed 2.5D graphics engine, and an independent display controller.

    Hardware acceleration significantly reduces CPU workload for common graphics tasks such as:

    * Alpha blending
    * Image scaling
    * Rotation and transformation
    * Layer composition
    * User interface rendering

    Supported display interfaces include:

    * SPI / DSPI / QSPI
    * 8080 MCU interface
    * RGB / DPI
    * MIPI DSI
    * EPD
    * JDI (for Memory-in-Pixel displays)

    When combined with graphics frameworks such as LVGL, the hardware acceleration engine enables smooth and responsive user interfaces on TFT, AMOLED, e-Paper (EPD), and Memory-in-Pixel (MiP) displays.

4. **Edge AI and Neural Acceleration**

    Selected SF32 devices integrate dedicated hardware accelerators for machine learning, multimedia processing, and sensor fusion workloads.

    Capabilities may include:

    * Neural network acceleration
    * Audio processing
    * Voice recognition
    * Camera interfaces (DVP and SPI)
    * Sensor fusion and biometric algorithms

    These features enable low-latency AI inference on-device while minimizing power consumption and cloud dependency.

5. **High-Density System-in-Package (SiP) Memory**

    To support graphics-intensive and AI-enabled applications, SF32 devices integrate instruction and data cache architectures optimized for high-performance execution from external memory.

    Available in-package memories may include:

    * Up to 256 Mb NOR Flash
    * Up to 512 Mb PSRAM

    By integrating memory directly within the package, SF32 devices reduce PCB complexity, minimize power consumption, and simplify hardware design while providing substantially larger memory capacities than conventional microcontrollers.

## SF32 Microcontroller Comparison

<div align="center"><em>SF32 Microcontroller Comparison</em></div>

<div align="center" markdown>

| Feature | SF32LB52x | SF32LB55x | SF32LB56x | SF32LB57x | SF32LB58x |
|----------|----------|----------|----------|----------|----------|
| Positioning | Entry-Level | Mainstream with BLE only | Advanced | Enhanced Computing | Flagship |
| Application CPU | Cortex-M33 @240MHz | Cortex-M33 @240MHz | Cortex-M33 @240MHz | 2× Cortex-M33 @240MHz | 2× Cortex-M33 @240MHz |
| Low-Power CPU | Cortex-M33 @24MHz, BT Controller Only | Cortex-M33 @48MHz, User Programmable | Cortex-M33 @48MHz, User Programmable | Cortex-M33 @24MHz, BT Controller Only | Cortex-M33 @96MHz, User Programmable |
| Internal SRAM | 576 KB | 1.4 MB | 960 KB | 592 KB | 3.7 MB |
| Bluetooth | BT Classic + BLE | BLE | BT Classic + BLE | BT Classic + BLE | BT Classic + BLE |
| Graphics Accelerator | 2.5D<br>ePicasso 2.0 Lite | 2.5D<br>ePicasso 1.0 | 2.5D<br>ePicasso 2.0 | 2.5D<br>ePicasso 3.0 + eZip 3.0 | 2.5D + Vector Graphics<br>ePicasso 2.0 + Vivante GCNanoUltraV |
| Display Interfaces | SPI / QSPI / 8080 / EPD / JDI | SPI / QSPI / 8080 / JDI / RGB / MIPI | SPI / QSPI / 8080 / EPD / JDI / RGB | SPI / QSPI / 8080 / EPD / JDI / RGB | SPI / QSPI / 8080 / EPD / JDI / RGB / MIPI |
| Audio ADC | 1x | n/a | 1x | 2x | 2x |
| Audio DAC | 1x | n/a | 1x | 1x | 2x |
| PDM Audio Interfaces | 2x | 2x | 2x | 2x | 4x |
| I²S Audio Interfaces | 1x | 2x | 1x | 2x | 3x |
| USB | 2.0 FS | 2.0 FS | 2.0 FS | 2.0 FS | 2.0 HS |
| CAN | n/a | n/a | 1x | 2x | 2x |
| In-Package PSRAM | Up to 16 MB | Up to 16+2 MB | Up to 16 MB | Up to 32MB | Up to 32+32 MB |
| In-Package NOR Flash | Up to 8 MB | Up to 8 MB | Up to 8 MB | Up to 32MB | Up to 8 MB |
| # of GPIOs | 44 / 45 | 49 / 95 / 119 | 44 / 120 | 46 / 47 / 58 / 64 | 154 |
| Package Options | QFN68 | QFN68 / BGA145 / BGA169 | QFN68 / BGA175 | QFN68 / QFN80 / BGA112 | BGA256 |
| Package Footprint (L × W) | 7 × 7 mm | 7 × 7 mm | QFN: 7 × 7 mm<br>BGA: 6.5 × 6.1 mm | QFN68: 7 × 7 mm<br> QFN80: 8 × 8 mm<br>BGA: 5.4 × 4.4 mm | 8.5 × 6.5 mm |
| Power Supply | 3.2~4.7V<br> 2.97~3.63V | 1.71~3.63V | 1.71~3.63V | 3.2~4.7V<br> 2.97~3.63V | 1.71~3.63V |

</div>

## Choosing the Right SF32

The SF32LB5xx family provides a scalable platform for battery-powered and connected devices, ranging from cost-optimized Bluetooth products to advanced graphical and AI-enabled systems. All devices share a common software architecture, allowing applications to scale across the family with minimal software changes.

When selecting a device, consider the following key requirements:

* Bluetooth connectivity (BLE or dual-mode BT/BLE)
* Display interface and resolution
* Audio and multimedia capabilities
* Memory capacity
* GPIO requirement
* Graphics performance
* AI and sensor-processing workloads
* Power consumption targets

<div align="center"><em>Quick Selection Guide</em></div>

<div align="center" markdown>

| Choose ... | If Your Application Requires ... | Typical Applications |
| : ---      | : ---  | : --- |
| SF32LB52x  | • Dual-mode Bluetooth (BT/BLE)<br> • Integrated audio ADC and DAC<br> • Integrated Li-ion battery charging<br> • Up to 45 GPIOs<br> • Display resolutions up to 512 × 512<br> • A compact and cost-effective solution<br> | • Entry-level smartwatches and fitness bands<br> • Bluetooth modules and wireless adapters<br> • Bluetooth audio accessories<br> • Smart sensors and wearable devices<br> • Electronic shelf labels and smart badges<br> • Portable label printers<br> • eBike and eScooter displays<br> • Basic LVGL-based HMI devices |
| SF32LB55x  | • Bluetooth Low Energy (BLE)<br> • MIPI DSI command-mode displays<br>• Large SRAM capacity for sensor processing algorithms<br> • More than 45 GPIOs<br> • Extended low-power processing capabilities | • Fitness bands and activity trackers<br> • Sports and cycling computers<br> • Sensor-rich wearable devices<br> • Health monitoring devices<br> • Battery-powered BLE peripherals |
| SF32LB56x  | • Dual-mode Bluetooth (BT/BLE)<br> • RGB/DPI display interfaces<br> • Integrated audio ADC and DAC<br> • Display resolutions up to 1024 × 600<br> • External Wi-Fi connectivity through SDIO<br> • Increased GPIO capacity | •     Smartwatches with advanced user interfaces<br> • Connected HMI systems<br> • Medical and healthcare devices<br> • Industrial handheld devices<br> • Portable instruments<br> • Advanced eBike and eScooter displays|
| SF32LB57x | • Dual-mode Bluetooth (BT/BLE) with Bluetooth 6.3, BLE Audio, and LE Long Range<br> • ePicasso 3.0/eZip 3.0 graphics with RGB display interfaces<br> • DCMI camera input and integrated high-fidelity audio ADC/DAC<br> • Display resolutions up to 1024 × 600<br> • PTM offload for deterministic I/O or custom peripheral timing<br> • Up to 64 GPIOs and SD/SDIO/eMMC storage interfaces | • Compact advanced smartwatches<br> • Display-rich HMI and e-paper devices<br> • Camera-enabled Bluetooth products<br> • Portable audio and recording devices<br> • Smart-home control panels |
| SF32LB58x  | • Dual-mode Bluetooth (BT/BLE)<br> • Advanced graphics rendering including vector graphics<br> • MIPI DSI command-mode or video-mode displays<br> • Display resolutions up to 1280 × 720<br> • Large memory configurations<br> • High GPIO density and count<br> • External Wi-Fi connectivity through SDIO<br> • Edge AI and machine-learning workloads | • Premium smartwatches<br> • Sports and outdoor wearable devices<br>• Advanced cycling computers<br> • Smart displays and connected dashboards<br> • AI-enabled wearable devices<br> • Edge AI and sensor-fusion systems|

</div>

## Software Compatibility Across the Family

One of the key advantages of the SF32 platform is its shared software architecture. Applications developed for one SF32LB5xx device can often be migrated to another family member with minimal changes, allowing developers to scale products from cost-optimized designs to flagship platforms while preserving software investments.

As a result, device selection can be driven primarily by performance, memory, display, and connectivity requirements rather than software compatibility constraints.

## Reference Links

SiFli's Website:                https://www.sifli.com/

SiFli's Wikipedia:              https://wiki.sifli.com/

SiFli's Software Documentation: https://docs.sifli.com/

SiFli's GitHub Repo:            https://github.com/OpenSiFli/

SiFli's Official Taobao Store:  https://sifli.taobao.com/
