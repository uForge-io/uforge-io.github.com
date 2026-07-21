---
icon: lucide/book-a
tags:
    - About
---
# Glossary

Quick reference for acronyms and terms used across the μForge.io site — both general embedded/wireless terminology and SiFli-specific names for the SF32 platform. Entries link to the page where a term is explained in depth; this page is a lookup aid, not a replacement for that context.

## Architecture and Processing

* **MCU** — **Microcontroller Unit.** An integrated circuit combining a CPU core, memory, and programmable input/output peripherals, optimized to run dedicated, low-overhead firmware rather than a general-purpose operating system.
* **SoC** — **System on Chip.** An integrated circuit that consolidates all necessary electronic circuits and components of a computer system onto a single substrate. On this site, SF32 parts are categorized as MCUs since they target microcontroller-class firmware rather than a full application-processor OS envelope.
* **Arm Cortex-M33** — A 32-bit Armv8-M mainline processor architecture that SF32 application and Bluetooth cores are built on. Armv8-M mainline supports an optional TrustZone security extension (isolating trusted from non-trusted code/data at the hardware level) versus earlier Cortex-M3/M4 cores, but TrustZone is a configuration choice made per silicon implementation, not a guaranteed feature of every Cortex-M33 — it is not configured on the current SF32LB52x through SF32LB58x parts. See STAR-MC1, below, and the [SF32LB52x chip page](../hardware/chips/SF32LB52x.md) for more.
* **STAR-MC1** — Arm China's enhanced implementation of the Arm Cortex-M33 architecture. Fully instruction-set and ecosystem compatible with standard Cortex-M33, with added instruction/data caches, CDE (Custom Datapath Extension) support, and microarchitectural optimizations for higher performance at the same power envelope. SiFli's own documentation uses "Arm Cortex-M33 STAR-MC1" and "Arm Cortex-M33" interchangeably. [See the SF32LB52x chip page](../hardware/chips/SF32LB52x.md) for the full explanation.
* **CDE** — **Custom Datapath Extension.** An Armv8-M feature that lets a processor implementation add custom instructions; part of what makes STAR-MC1 an enhanced Cortex-M33 rather than a plain one.
* **DSP** — **Digital Signal Processor / digital signal processing.** Extensions built into the Cortex-M33 core, used for math-heavy workloads like audio and sensor fusion.
* **MPU** — **Memory Protection Unit.** Hardware that restricts which memory regions code can access, used for fault isolation and security.
* **HAL** — **Hardware Abstraction Layer.** The SDK layer that exposes peripherals through a consistent API independent of the exact chip variant.

## Wireless Connectivity

* **BLE** — **Bluetooth Low Energy.** The low-power Bluetooth radio mode most SF32 wearable and IoT products build on.
* **Dual-mode Bluetooth** — Support for both BLE and Classic Bluetooth (BR/EDR) on the same radio, used when a product needs both, e.g. audio streaming (Classic or LE Audio) alongside a low-power control channel. Supported on SF32LB52x/56x/57x/58x; SF32LB55x is BLE-only.
* **GAP** — **Generic Access Profile.** The Bluetooth layer governing device roles, advertising, and connection establishment — the foundation every BLE application sits on top of.
* **GATT** — **Generic Attribute Profile.** The Bluetooth layer defining how services and characteristics (the actual data a BLE device exposes) are structured and exchanged.
* **Sibles** — SiFli-SDK's GATT service framework, sitting on top of the standard GAP layer. Most SF32 Bluetooth products start from an existing Sibles-based example rather than building a GATT database from scratch. See the [Bluetooth guide](../learn/guides/bluetooth.md).
* **LE Audio** — The newer Bluetooth Low Energy audio standard, including the LC3 codec and Auracast broadcast-audio modes, as opposed to Classic Bluetooth audio profiles. Supported on SF32LB52x/56x/57x/58x; not supported on SF32LB55x. See [Bluetooth Audio and LE Audio](../learn/architecture/bluetooth-processor.md).
* **OTA** — **Over-The-Air** (firmware update). Updating device firmware via a wireless link (typically BLE) instead of a wired connection.
* **DFU** — **Device Firmware Update.** The general mechanism/protocol category that OTA updates over Bluetooth typically implement.

## Graphics and Display

* **ePicasso** — SiFli's in-house 2D/2.5D graphics acceleration engine for the SF32 family, offloading pixel operations like image copy, blending, scaling, rotation, and layer composition from the application CPU. See the [ePicasso architecture page](../learn/architecture/epicasso-gpu.md).
* **eZip** — SiFli's lossless graphics compression format and hardware decoder, used to shrink image/animation asset size and decompression cost on-device. Because compressed assets move over the bus before being decoded, eZip also effectively reduces the bandwidth required from external memory such as PSRAM and NOR flash.
* **TurboPixel** — Framebuffer compression/decompression used on some SF32 parts (e.g. SF32LB56x) to reduce the memory bandwidth needed to drive a display.
* **LVGL** — **Light and Versatile Graphics Library.** The open-source embedded UI framework most SF32 products use for their application-level UI, running on top of ePicasso-accelerated rendering.
* **HMI** — **Human-Machine Interface.** Shorthand for the on-device user interface (screen, touch, buttons) as a design category.

## Audio

* **ADC / DAC** — **Analog-to-Digital / Digital-to-Analog Converter.** The audio front-end and output paths on SF32 parts with integrated audio capability. Dedicated audio ADC/DAC is available on SF32LB52x/56x/57x/58x; SF32LB55x lacks a dedicated audio ADC/DAC.
* **PDM** — **Pulse-Density Modulation.** A common digital microphone interface format supported alongside I2S on SF32 audio-capable parts.
* **I2S** — **Inter-IC Sound.** A standard digital audio interface for connecting codecs, DACs, or other audio peripherals.

## Power and Reliability

* **PMU** — **Power Management Unit.** The integrated block handling voltage regulation (BUCK/LDO outputs) inside SF32 chips; some designs pair it with an external SiFli PMIC (e.g. SF30147C) for additional power rails.
* **PMIC** — **Power Management IC.** A dedicated external chip providing additional regulated power rails beyond what the MCU's internal PMU supplies.
* **LDO** — **Low-Dropout regulator.** A linear voltage regulator type, one of the internal PMU output stages on SF32 parts.
* **BUCK** — A switching (non-linear) voltage regulator topology, more efficient than an LDO at higher current, also integrated into the SF32 PMU.
* **TRNG** — **True Random Number Generator.** A hardware entropy source, drawing on physical thermal noise, used for cryptographic key generation and security features.
* **PSA** — **Platform Security Architecture.** An Arm security framework; SF32 parts carry a PSA certification level indicating verified security posture.

## Storage and Memory

* **SRAM** — **Static RAM.** The fast on-chip working memory used for running application code and data.
* **PSRAM** — **Pseudo-Static RAM.** Higher-capacity external memory (often System-in-Package on SF32 modules) used to extend beyond on-chip SRAM for graphics buffers and larger applications.
* **NOR / NAND Flash** — Two non-volatile flash memory types used for firmware and asset storage; NOR supports fast random reads and is common for direct code execution (XiP, Execute-in-Place), while NAND/SD-NAND trades random-access speed for much higher density, suited to bulk storage of images, fonts, and logs.
* **OPI / QPI / QSPI** — **Octal/Quad Peripheral (or Serial Peripheral) Interface.** The pin-count/bandwidth class of the flash or PSRAM interface (Quad = 4 data lines, Octal = 8), affecting achievable memory bandwidth.
* **eMMC** — **Embedded MultiMediaCard.** A managed NAND flash storage interface used on higher-storage SF32 designs.

## Peripherals and Interfaces

* **GPIO** — **General-Purpose Input/Output.** Configurable digital pins used for simple signaling, buttons, LEDs, and bit-banged interfaces.
* **UART** — **Universal Asynchronous Receiver/Transmitter.** The standard serial interface used for console/debug output and simple point-to-point communication.
* **SPI** — **Serial Peripheral Interface.** A synchronous serial bus used for displays, flash, sensors, and other high-speed peripherals.
* **I2C** — **Inter-Integrated Circuit.** A synchronous, multi-drop serial bus commonly used for sensors and low-speed peripheral configuration.
* **RTC** — **Real-Time Clock.** A timekeeping peripheral that can keep running (or wake the system) independent of the main application clock domains.

## Hardware and Manufacturing

* **QFN** — **Quad Flat No-lead package.** The chip package type SF32 parts ship in, described by pin count and body size (e.g. QFN68).
* **BOM** — **Bill of Materials.** A formal, itemized list of components, passives, and mechanical hardware required to manufacture a printed circuit board assembly (PCBA); a major reason to prefer SiFli-recommended parts and modules is BOM complexity reduction.
* **EDA** — **Electronic Design Automation.** Schematic-capture, SPICE-simulation, and PCB-layout software category. [See the EDA tool libraries page](../hardware/others/eda-tool-libraries.md) for SF32-specific footprints/symbols.
* **AVL** — **Approved Vendor List.** SiFli's qualified second-source component list (crystals, regulators, flash, etc.) verified against SF32 hardware designs' electrical tolerances. [See the approved vendor list page](../hardware/others/sifli-approved-vendor-list.md).
* **EVB** — **Evaluation Board.** A SiFli-issued SF32 reference/development board used to bring up and validate designs before custom hardware exists.
* **FAE** — **Field Application Engineer.** SiFli's technical support contact for hardware design questions beyond what public documentation covers.

## Software and Tools

* **SiFli-SDK** — SiFli's primary firmware development kit for SF32 parts; the reference/vendor SDK most production firmware is built on.
* **SiFli CodeKit** — A VS Code extension for SiFli-SDK development, guiding project creation, configuration, build, flash, and monitor workflows without requiring the raw command-line toolchain.
* **RTOS** — **Real-Time Operating System.** The class of OS (deterministic scheduling, low overhead) SF32 firmware typically runs, whether via SiFli-SDK's own RTOS integration or Zephyr.
* **sftool** — SiFli's command-line flashing/recovery utility for SF32 boards, including brick recovery for boards that fail to boot.

!!! note "Auto-generated content"
    This page was compiled/drafted without an existing source document. Verify technical claims against SiFli's official documentation before relying on them.
