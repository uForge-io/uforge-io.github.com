---
icon: lucide/minimize-2
description: "How TurboPixel uses fixed-ratio lossy framebuffer compression to reduce PSRAM capacity and bandwidth on supported SF32 devices."
tags:
  - Graphics
---

# TurboPixel Framebuffer Compression

## Overview

**TurboPixel** is a fixed-ratio, lossy compression format for a rendered final bitmap on supported SF32 devices. It is part of the display path: **extDMA** compresses the bitmap, and the display controller decompresses TurboPixel as it transfers pixels to the panel.

TurboPixel is not an asset-storage format and does not replace [eZip](ezip.md). eZip losslessly compresses source assets before they are read from storage; TurboPixel compresses the final rendered bitmap to reduce the PSRAM capacity and PSRAM bandwidth required by framebuffer traffic.

For the complete graphics flow and the position of TurboPixel relative to eZip, ePicasso, and the display controller, see [Graphics Overview](overview.md#sf32-graphics-flow). This page focuses on TurboPixel's compression behavior, integration trade-offs, and availability.

Read this page when framebuffer capacity or display-read traffic is the bottleneck on an SF32LB55x, SF32LB56x, or SF32LB58x design. It helps product and firmware engineers weigh predictable PSRAM savings against lossy image quality; it is not a substitute for eZip asset compression.

## Fixed-Ratio and Lossy by Design

TurboPixel has two defining properties:

- **Fixed compression ratio.** The compression factor is predetermined by the TurboPixel implementation rather than varying with image content. This makes framebuffer capacity and display-read bandwidth easier to budget than with a variable-ratio format. Use the selected chip's documentation and SDK configuration for the applicable ratio; do not infer a numeric value from a different device or format.
- **Lossy compression.** A TurboPixel-decompressed bitmap is not guaranteed to reproduce every original pixel value. The format trades some image fidelity for predictable reductions in PSRAM use and PSRAM traffic.

Lossy compression is often a sensible trade in a constrained embedded display system, but it is a product decision. Evaluate real screens at the target panel resolution, color depth, viewing distance, and refresh behavior rather than judging quality from a generic test image.

## Framebuffer Compression Comparison (Placeholder)

Use this section to record measured TurboPixel results for one representative display resolution and SDK configuration. Unlike the eZip file-size comparison, this is a **framebuffer allocation and PSRAM-traffic** comparison: TurboPixel operates after rendering, not on the source asset file.

Include both opaque and alpha-blended screens. Alpha blending normally happens before TurboPixel, when the renderer composites foreground and background pixels into the final framebuffer. A screen that contains translucent icons, text, shadows, or layers can still produce an opaque RGB565 final framebuffer; record that distinction rather than treating the presence of alpha in source assets as an alpha channel in the compressed framebuffer.

<div align="center"><em>Representative TurboPixel Framebuffer Comparison — Placeholder</em></div>

<div align="center" markdown>

| Scenario | Source / Layer Alpha | Final Framebuffer Format and Alpha State | Uncompressed Allocation / Traffic | TurboPixel Allocation / Traffic | Relative to Uncompressed | Test Settings / Visual Result |
|:---|:---|:---|---:|---:|---:|:---|
| Opaque UI | None | TBD, opaque | TBD | TBD | TBD | Resolution: TBD; refresh policy: TBD; TurboPixel ratio/configuration: TBD |
| Alpha-blended UI, composited before output | Per-pixel and/or global alpha in source layers | TBD, typically opaque after composition | TBD | TBD | TBD | Record blended content: TBD; check edge, shadow, gradient, and text artifacts |
| Alpha-preserving output path, if supported | Alpha retained to the final buffer | TBD | TBD | TBD | TBD | Confirm exact chip, SDK, format, and display path before testing |

</div>

For each valid TurboPixel path, calculate **Relative to Uncompressed** as `TurboPixel framebuffer bytes ÷ uncompressed framebuffer bytes × 100%`. The expected allocation follows the applicable fixed ratio, but the exact ratio, supported formats, alignment, refresh policy, and measured PSRAM traffic must come from the selected chip's documentation, SDK, and target-hardware test. Record visual acceptance separately: a fixed allocation ratio does not guarantee identical artifacts across opaque, text-heavy, gradient, and alpha-blended content.

## Why Use TurboPixel

### Reduce PSRAM Capacity

A full framebuffer can consume substantial PSRAM, especially with higher resolutions, multiple draw buffers, or double buffering. Fixed-ratio compression lowers the memory allocation needed for the compressed final bitmap, leaving more PSRAM for UI assets, audio buffers, application data, or additional graphics surfaces.

### Reduce PSRAM Bandwidth

The display path can read framebuffer data continuously or during frequent updates. A compressed TurboPixel framebuffer moves fewer bytes over the PSRAM interface before display-controller decompression, reducing bandwidth pressure and contention with the CPU, ePicasso, DMA, audio, and wireless subsystems.

### Make Budgeting Predictable

Unlike content-dependent image compression, a fixed ratio supports repeatable worst-case sizing. It does not remove the need to budget all reads, writes, composition work, and panel transfer, but it makes the framebuffer component more deterministic.

## Quality and Integration Trade-Offs

TurboPixel should be validated as part of the complete display design:

- Test text, thin lines, gradients, icons, photographs, animations, and high-contrast UI elements for visible artifacts.
- Confirm the color format, buffer alignment, extDMA path, and display-controller configuration supported by the chosen device and SDK.
- Measure frame time, PSRAM bandwidth, UI latency, and power under combined display, Bluetooth, audio, and AI workloads.
- Keep an uncompressed path available during bring-up so that image-quality and driver issues can be isolated.
- Do not present TurboPixel as lossless, even when artifacts are not visible in a particular UI.

## Availability in the SF32 Family

TurboPixel is documented for the following SF32 families:

<div align="center"><em>Documented TurboPixel Availability</em></div>

<div align="center" markdown>

| SF32 Family | TurboPixel Status | Integration Context |
|:---|:---|:---|
| **SF32LB52x** | Not available | Use an uncompressed framebuffer or another supported memory/bandwidth strategy. |
| **SF32LB55x** | Documented | extDMA fixed-ratio lossy final-framebuffer compression with display-controller decompression. |
| **SF32LB56x** | Documented | extDMA fixed-ratio lossy final-framebuffer compression with display-controller decompression. |
| **SF32LB57x** | Not available | Use an uncompressed framebuffer or another supported memory/bandwidth strategy. |
| **SF32LB58x** | Documented | extDMA fixed-ratio lossy final-framebuffer compression with display-controller decompression. |
| **Other SF32 families** | Confirm per device | Do not infer TurboPixel support from eZip, ePicasso, or the presence of PSRAM. Check the exact chip datasheet, reference manual, SDK release, and display driver. |

</div>

This table records documented family-level availability, not a promise for every package, panel interface, pixel format, SDK version, or board configuration. Confirm the exact target before making a memory or bandwidth commitment.

## Key Takeaways

- TurboPixel is a **fixed-ratio, lossy** final-framebuffer compression format.
- extDMA produces TurboPixel from the rendered bitmap; the display controller decompresses it on the panel path.
- Its main purpose is to reduce **PSRAM capacity** and **PSRAM bandwidth** pressure.
- TurboPixel is available on SF32LB55x, SF32LB56x, and SF32LB58x; it is not available on SF32LB52x or SF32LB57x. Confirm any other target individually.
- TurboPixel complements eZip: eZip is lossless asset compression, while TurboPixel is lossy compression for the final bitmap.

!!! note "Auto-generated content"
    This page was compiled/drafted without an existing source document. Verify technical claims against SiFli's official documentation before relying on them.
