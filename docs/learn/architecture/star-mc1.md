---
icon: lucide/cpu
tags:
    - Architecture
---
# STAR-MC1

## Introduction

**STAR-MC1** is an enhanced implementation of the **Arm Cortex-M33** architecture developed by Arm China. It keeps the Cortex-M33 instruction set, programming model, exception model, and software ecosystem, so Cortex-M33 firmware, RTOS ports, middleware, libraries, and development tools can be reused with little or no application-level migration work.

For SF32 devices, STAR-MC1 is important because it gives the platform a stronger application processor while preserving the low-power and software-friendly character of Cortex-M-class microcontrollers. In SiFli and SF32 documentation, the application CPU may therefore be described as **Arm Cortex-M33**, **Cortex-M33 STAR-MC1**, or simply **STAR-MC1**, depending on the level of detail being discussed.

## Positioning for Developers

The most useful mental model is **not** “a fixed processor between Cortex-M33 and Cortex-M7.” STAR-MC1 is a configurable, Cortex-M33-compatible **Armv8-M Mainline** CPU IP. Its value is the ability to pair that familiar MCU software model with optional memory-system and acceleration features—such as cache, tightly coupled memory (TCM), DSP instructions, a coprocessor interface, and TrustZone—when the final SoC implements them.

<div align="center"><em>Table: Where STAR-MC1 Fits in the Cortex-M Landscape</em></div>

<div align="center" markdown>

| If you know | What remains familiar with STAR-MC1 | The practical difference | Do not assume |
|:------------|:------------------------------------|:-------------------------|:--------------|
| Cortex-M4 | Bare-metal and RTOS development, interrupts, DMA, and peripheral-driver work. | STAR-MC1 uses the newer Armv8-M software model and can expose stronger memory and acceleration options. | Cortex-M4 binaries, Armv7E-M assumptions, or identical debug/security features apply unchanged. |
| Cortex-M33 | The Armv8-M programming, exception, and toolchain model. | The SoC can add memory-system headroom for Flash/PSRAM-heavy, UI, audio, or connected workloads. | Every STAR-MC1-based part has cache, TCM, DSP, FPU, CDE, or TrustZone enabled. |
| Cortex-M7 | The need to manage memory placement, cache behavior, DMA coherency, and real-time latency. | STAR-MC1 keeps an MCU-class Armv8-M foundation and targets flexible, power-conscious IoT designs. | It is a drop-in Cortex-M7 replacement or has the same throughput, memory system, and software ecosystem. |

</div>

For an SF32 project, select the device for its documented memory, peripherals, and SDK support—not for the STAR-MC1 label alone. The public STAR-MC1 material highlights Armv8-M, cache and TCM options, DSP and coprocessor interfaces, and TrustZone as IP capabilities; the exact implementation belongs to the SoC documentation.

## Why STAR-MC1 Matters

Traditional Cortex-M33 MCUs are excellent for secure, low-power embedded control, but modern connected products often need more than control logic. Wearables, smart displays, Bluetooth audio products, and edge-AI devices may also need responsive user interfaces, larger external memory, signal processing, and frequent movement of graphics or audio data.

STAR-MC1 addresses this gap by improving the execution efficiency of the Cortex-M33 class without forcing developers into a higher-power application processor architecture. The result is a core that can run familiar embedded software while giving the system more headroom for multimedia and AIoT workloads.

For developers, the practical benefit is simple: existing Cortex-M33-oriented software can usually be brought to STAR-MC1 with the same toolchain and programming model, while the hardware can reduce memory stalls through its cache and memory-system behavior.

## Cortex-M Family Comparison

The following table summarizes where STAR-MC1 fits among common Cortex-M processors. Exact capabilities depend on the final SoC implementation, but the positioning is useful when choosing an architecture for a product.

<div align="center"><em>Table: Cortex-M Family Comparison</em></div>

<div align="center" markdown>

| Feature | Cortex-M3 | Cortex-M4 | Cortex-M33 | STAR-MC1 | Cortex-M7 |
|:--------|:---------:|:---------:|:----------:|:--------:|:---------:|
| Arm architecture | Armv7-M | Armv7E-M | Armv8-M | Armv8-M | Armv7E-M |
| TrustZone support | No | No | Armv8-M feature | When implemented by the SoC | No |
| DSP instructions | Basic | Yes | Yes | Yes | Yes |
| Floating-point unit | Optional | Optional | Optional | Optional | Single / double precision |
| Instruction cache | No | No | Implementation dependent | Optional IP capability | Implementation dependent |
| Data cache | No | No | Implementation dependent | Optional IP capability | Implementation dependent |
| Custom Datapath Extension (CDE) | No | No | Armv8-M extension | When implemented by the SoC | No |
| Software compatibility | Baseline | M3-compatible | New Armv8-M model (M4-like C code, new toolchain) | Cortex-M33 compatible | M4-compatible (same Armv7E-M family) |
| Typical performance | Low | Medium | Medium | Configuration and SoC dependent | High, implementation dependent |
| Typical power profile | Very low | Low | Low | Configuration and SoC dependent | Implementation dependent |
| Typical use cases | General MCU control | DSP, motor control | Secure IoT, connected MCU | AIoT, graphics, audio, wearables | High-end embedded systems |

</div>

## Architectural Enhancements

STAR-MC1 builds on Cortex-M33 rather than replacing it. The most important additions are implementation-level improvements that help the core spend less time waiting on memory and more time executing useful work.

### Instruction and Data Caches

STAR-MC1 includes native instruction cache (**I-cache**) and data cache (**D-cache**) support. These caches are especially valuable in systems that execute from external Flash, access PSRAM, or run larger user-interface and middleware stacks.

The main benefits are:

- Faster instruction fetch from non-SRAM memory.
- Lower average data access latency.
- Better performance for graphics, audio, protocol stacks, and UI frameworks.
- Reduced pressure on the memory bus when the same code or data is reused.

Cache behavior also means firmware should follow normal cached-system rules. Drivers that share buffers with DMA, display controllers, audio interfaces, or other bus masters must use the cache maintenance APIs provided by the SDK or RTOS.

### Armv8-M Custom Datapath Extension

STAR-MC1 supports the **Armv8-M Custom Datapath Extension (CDE)**. CDE allows a processor implementation to expose custom instructions for selected acceleration tasks while remaining inside the Cortex-M software model.

This can be useful for workloads such as:

- Digital signal processing.
- Cryptography.
- Computer vision primitives.
- Machine-learning kernels.
- Sensor-fusion math.

CDE does not automatically accelerate every application. Software must use compiler support, libraries, or vendor-provided SDK components that emit the relevant custom instructions. When supported by the SoC and software stack, however, it provides a clean path for application-specific acceleration without moving the workload to a separate application processor.

### Memory-System Optimization

Many modern MCU workloads are limited not only by CPU frequency, but also by memory latency and bandwidth. STAR-MC1's cache and memory-system optimizations are therefore important for SF32-class devices, where applications may combine internal SRAM, in-package Flash, PSRAM, display buffers, and peripheral DMA.

The largest gains usually appear when:

- Code executes from Flash or external memory instead of tightly coupled SRAM.
- UI frameworks repeatedly access image, font, or layout data.
- Audio, Bluetooth, graphics, and application tasks run concurrently.
- The working set fits well in cache.

Purely CPU-bound loops that already run from fast SRAM may show a smaller improvement.

## Performance Characteristics

STAR-MC1 should not be described as automatically improving small synthetic CPU benchmark metrics such as **CoreMark/MHz** or **DMIPS/MHz**. Those benchmarks primarily measure compact integer workloads and are often small enough to run from fast local memory. In that situation, instruction and data caches may provide little or no visible improvement over a standard Cortex-M33-class implementation.

The more accurate way to describe STAR-MC1 is as a Cortex-M33-compatible core with a stronger memory subsystem and optional paths for workload-specific acceleration. Its benefits are most visible when the application is limited by memory access, external Flash or PSRAM latency, graphics assets, protocol stacks, or repeated access to larger code and data sets.

<div align="center"><em>Table: Performance Characteristics</em></div>

<div align="center" markdown>

| Workload Type | Expected STAR-MC1 Benefit | Why |
|:--------------|:--------------------------|:----|
| Small CoreMark/DMIPS-style loops | Usually limited | The working set is small and may already fit in fast memory. |
| Code executing from Flash or PSRAM | Often improved | I-cache can reduce instruction fetch stalls. |
| Data-heavy UI, graphics, and middleware | Often improved | D-cache can reduce repeated data access latency. |
| DMA-heavy peripheral workloads | Depends on software design | Cache maintenance is required for coherent shared buffers. |
| CDE-enabled kernels | Improved when used | Custom instructions can accelerate selected operations. |

</div>

!!! note
    Avoid quoting STAR-MC1 CoreMark/MHz or DMIPS/MHz uplift unless the number comes from a measured device under documented test conditions. For SF32 documentation, it is safer to emphasize memory-hierarchy behavior and real-world workload responsiveness rather than generic synthetic benchmark gains.

## What This Means for SF32 Developers

For most SF32 firmware development, STAR-MC1 should be treated as a Cortex-M33-compatible application processor with stronger memory-system behavior for larger real-world workloads.

In practice:

- Existing Cortex-M33 code can usually be recompiled without application redesign.
- RTOS, interrupt, privilege, TrustZone, and debug concepts remain familiar to Cortex-M developers.
- Performance-sensitive applications should place critical code and data carefully and use the SDK's cache and memory APIs.
- DMA buffers require explicit cache coherency handling when they are stored in cached memory.
- Graphics, audio, AI, and connectivity workloads benefit most when the software stack uses the SoC's hardware accelerators and memory hierarchy effectively.

The core is not intended to replace every Cortex-M7 use case. If an application requires maximum single-core throughput at higher power, Cortex-M7-class devices may still be appropriate. For battery-powered connected products, however, STAR-MC1 provides a useful balance of compatibility, performance, and energy efficiency.

## Good Application Fits

STAR-MC1 is well suited for products that need more application performance than a conventional Cortex-M33 while still operating within MCU-level power and integration constraints, particularly when memory latency matters more than raw CoreMark/DMIPS score.

Typical examples include:

- Smartwatches and fitness trackers.
- Bluetooth audio devices.
- Wearable medical and health-monitoring products.
- Smart displays and compact HMI systems.
- Edge-AI sensor devices.
- Products using LVGL or other embedded UI frameworks.
- Devices that execute from large Flash or PSRAM memories.

## Key Takeaways

- STAR-MC1 is Cortex-M33-compatible, so it preserves the familiar Armv8-M embedded software model.
- Integrated instruction and data caches improve real-world performance, especially when code and data live outside fast internal SRAM.
- CDE provides a path for custom instruction acceleration when supported by the SoC and software stack.
- STAR-MC1 bridges the space between Cortex-M33 efficiency and Cortex-M7-class application performance.
- For SF32 devices, it helps enable richer graphics, audio, AIoT, and wearable applications without moving away from the MCU development model.

---

See also: [SF32 Family Overview](../../hardware/chips/SF32_family.md) for how STAR-MC1 fits into the broader SF32LB5x chip lineup.

Primary reference: [Arm China STAR-MC1 Technical Reference Manual](https://www.armchina.com/webarm/arm/common/download/profile/resource/file/Documents/Application-Notes/Technical-Reference-Manual/Star_Technical_Reference_Manual_00903001_0100_00_en.pdf).
