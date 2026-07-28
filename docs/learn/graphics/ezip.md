---
icon: lucide/file-archive
description: "How SiFli eZip and eZip-A reduce embedded UI asset storage, memory bandwidth, and CPU decode work on supported SF32 devices."
tags:
  - Graphics
---

# eZip Lossless Compression and Hardware Decoding

## Introduction

**eZip** is SiFli's proprietary lossless compression format and hardware-assisted decoding path on supported SF32 devices. It is primarily used for display assets—images, icons, fonts, and animations—but can also be used for general-purpose decompression, for example when handling a compressed OTA image. Rather than storing every display asset as an uncompressed bitmap in NOR Flash, PSRAM, or a file system, a product can store eZip output and decode it when the UI needs it.

**eZip-A** is the corresponding animated-asset format. Source assets are converted during the build or asset-preparation flow; eZip is not a general-purpose image decoder that accepts arbitrary files at runtime.

For non-graphics data such as an OTA image, the product must define and validate the complete update flow, including storage, integrity checking, compatibility, and the intended decompression path. The [graphics flow](overview.md#sf32-graphics-flow) applies to display assets, not to that application-level update workflow.

For a graphics product, the objective is to move fewer bytes from storage and avoid spending application-CPU time repeatedly decompressing resources. This can reduce storage use and external-memory traffic while leaving headroom for UI, Bluetooth, audio, and application work.

For the position of eZip relative to ePicasso, TurboPixel, and the display controller, see [Graphics Overview](overview.md#sf32-graphics-flow). This page focuses on eZip asset preparation, compression behavior, and decoding.

Read this page when UI assets are consuming too much Flash or external-memory bandwidth, or when you need a repeatable asset-conversion workflow. It distinguishes lossless source-asset compression from final-framebuffer compression, which is covered by [TurboPixel](turbopixel.md).

## Capabilities and Boundaries

eZip is intended for a production asset pipeline, rather than ad hoc file handling:

- **Lossless graphics compression.** The format preserves image data and supports transparency. SiFli describes its typical graphics compression ratio qualitatively as *slightly higher than PNG*; it does not publish one fixed numeric ratio.
- **Static and animated assets.** GraphicsTool can convert PNG, GIF, and APNG assets into eZip static assets or eZip-A animations.
- **Hardware-assisted decoding on supported devices.** This can reduce application-CPU decode work, subject to the selected chip, SDK, source format, and driver path.
- **Graphics-tool workflow.** SiFli's GraphicsTool handles common source formats, resizing, image conversion, batch processing, and eZip/eZip-A generation.
- **ePicasso integration on supported generations.** Some devices can pass decoded assets into the graphics engine without an intermediate framebuffer, reducing buffer and bandwidth pressure.

## Compression Ratio and General-Purpose Use

For graphics resources, use PNG as the practical baseline: SiFli describes eZip as achieving a compression ratio slightly higher than PNG while retaining lossless image data and transparency support. The actual file-size reduction still varies with image dimensions, pixel format, transparency, palette use, and image detail. Measure representative assets with the approved conversion profile; do not budget capacity from one percentage.

eZip can also compress general-purpose files. In that case, there is no typical graphics ratio to quote: the ratio varies with the source data. Repetitive or structured data may compress well, while files that are already compressed—such as JPEG images, MP4 video, ZIP archives, or encrypted data—may compress little or not at all. Validate both the resulting size and the target device's intended decode path before adopting eZip for non-graphics data.

## Representative Image Size Comparison (Placeholder)

Use this section to record like-for-like measurements for representative **opaque** and **alpha-bearing** UI images. Replace the placeholders after converting each source image with approved tool versions and settings. Record source dimensions, color format, alpha treatment, and JPEG quality with the results. eZip and PNG retain source transparency; JPEG does not carry alpha, so its transparent-image comparison must use a documented pre-composited background and must not be presented as equivalent alpha preservation.

<div align="center"><em>Representative Image File-Size Comparison — Placeholder</em></div>

<div align="center" markdown>

| Scenario | Format | Encoding | File size | Relative to BMP | Test settings / notes |
|:---|:---|:---|---:|---:|:---|
| Opaque UI image | BMP | Uncompressed reference | TBD | 100% | Source image: TBD; dimensions: TBD; pixel format: TBD |
| Opaque UI image | eZip | Lossless | TBD | TBD | GraphicsTool version and conversion profile: TBD |
| Opaque UI image | PNG | Lossless | TBD | TBD | Encoder and settings: TBD |
| Opaque UI image | JPEG | Lossy | TBD | TBD | Encoder and quality setting: TBD |
| UI image with per-pixel alpha | BMP | Uncompressed reference | TBD | 100% | State the exact BMP variant or alpha treatment: TBD |
| UI image with per-pixel alpha | eZip | Lossless with alpha | TBD | TBD | GraphicsTool version and conversion profile; verify transparent edges: TBD |
| UI image with per-pixel alpha | PNG | Lossless with alpha | TBD | TBD | Encoder and settings: TBD |
| UI image with per-pixel alpha | JPEG | Lossy, no alpha | TBD | TBD | Record the pre-composited background and quality setting; not an alpha-preserving comparison |

</div>

Calculate **Relative to BMP** as `file size ÷ BMP file size × 100%` within the same scenario. Do not compare the opaque and alpha-bearing rows directly, or use this table as a generic compression-ratio claim: it is intentionally a measurement template, and results change with the selected artwork, alpha coverage, and conversion settings.

## Why Use eZip

### Reduce Asset Storage

Compressed assets can occupy less NOR Flash, PSRAM, NAND, or removable-storage capacity than raw pixel buffers. This is especially valuable for watch faces, multilingual font packs, icon sets, UI themes, and animation-heavy interfaces.

### Reduce Memory-Bus Traffic

When assets reside in external NOR Flash or PSRAM, uncompressed bitmaps can consume substantial bus bandwidth before drawing begins. Moving a compressed asset and decoding it near the graphics path can reduce that traffic. The actual gain depends on compression ratio, source format, display-update pattern, and storage-interface speed.

### Preserve CPU Time

On a supported hardware decoding path, the application CPU need not decompress every asset in software. The released headroom can improve UI responsiveness or serve wireless, audio, sensors, and low-power scheduling.

### Make Asset Delivery Repeatable

Using a conversion tool and controlled asset format makes releases reproducible: source artwork, conversion settings, generated assets, and target-resolution profiles can be versioned together. This is more dependable than manual conversion or relying on UI developers to reproduce image settings.

## eZip Version Comparison

Version names identify a generation of asset-decompression capability, not a universal feature guarantee. Confirm the selected chip's datasheet, reference manual, SDK release, and board-memory configuration before committing to an asset pipeline.

<div align="center"><em>eZip Version Comparison</em></div>

<div align="center" markdown>

| Version | Representative SF32 Family | Documented Capability | Practical Implication |
|:---|:---|:---|:---|
| **eZip 1.0** | SF32LB55x | Lossless graphics decompression with ePicasso integration. | A fit for BLE wearable and compact-HMI assets; validate the selected package and SDK path. |
| **eZip 2.0** | SF32LB52x, SF32LB56x, SF32LB58x | Lossless graphics decompression; SF32LB56x documents native eZip-A animation support. SF32LB58x also documents JPEG/MJPEG capability, which is a device-level capability rather than an eZip-only guarantee. | A broad option for static UI assets; use device documentation when planning animations or JPEG/MJPEG media. |
| **eZip 3.0** | SF32LB57x | Lossless eZip/eZip-A image and animation assets, JPEG image and MJPEG animation decompression, and linked operation with ePicasso without an intermediate framebuffer. | The most integrated documented path for graphics-rich, camera-capable, and multimedia-oriented connected products. |

</div>

## Preparing Assets

Keep editable source assets under version control, then generate eZip output as a build artifact:

1. Define the target display resolution, pixel format, and animation requirements for the selected device.
2. Prepare source images or animations at the intended dimensions; avoid runtime scaling to compensate for poorly sized artwork.
3. Use SiFli GraphicsTool to convert, resize, and generate eZip or eZip-A output.
4. Record the tool version and conversion profile with the project, then validate generated assets on target hardware.
5. Place output in the intended storage location and test cold boot, repeated UI use, low-memory behavior, and display updates alongside Bluetooth or audio activity.

GraphicsTool supports common image formats such as PNG, JPEG, WebP, and AVIF, and can process GIF, PNG, and APNG into eZip/eZip-A resources. A converted asset is usable only when the target device and SDK support its configured decoding path.

## Integration Tools

SiFli provides more than the desktop GraphicsTool workflow:

- **Command-line development tools** support integrating eZip conversion into scripted, repeatable asset pipelines. Use them in local build scripts or continuous-integration jobs so the checked-in source artwork and generated eZip output remain traceable.
- **Android and iOS SDKs** support eZip integration in mobile applications. They are useful when a companion app needs to prepare, manage, transfer, or otherwise work with eZip resources as part of a device workflow.

Keep conversion profiles, tool or SDK versions, output checksums, and target-device compatibility requirements under version control. Mobile and command-line integrations should use the same approved asset profile as the embedded product; do not assume that a file generated for one chip or SDK configuration will work unchanged on every SF32 target.

## Design and Debugging Guidance

- **Use eZip for assets.** The eZip hardware decoder decompresses assets stored in NOR Flash, PSRAM, NAND, or file storage; it is not a final-framebuffer compression format.
- **Budget asset-transfer bandwidth.** eZip can reduce asset-transfer traffic, but decoded pixels still require the rendering and display path described in [Graphics Overview](overview.md#sf32-graphics-flow).
- **Keep CPU fallback paths.** Not every asset type, pixel format, or UI operation maps to a hardware decode or graphics path.
- **Validate memory placement.** Test assets and draw buffers in internal SRAM, NOR Flash, PSRAM, or removable storage; each choice changes latency and bus contention.
- **Test the real workload.** Measure cold-load time, animation cadence, UI latency, and power while Bluetooth, audio, sensors, and display refresh are active together.
- **Freeze conversion settings before release.** Tool-version or parameter changes can affect output compatibility, quality, storage use, and decode performance.

## Key Takeaways

- eZip is SiFli's lossless display-asset compression format and hardware-assisted decode path on supported SF32 devices.
- For graphics, SiFli describes eZip compression as slightly higher than PNG; for general-purpose data, compression ratio varies with the source and must be measured.
- eZip-A carries animated assets; GraphicsTool prepares eZip/eZip-A resources from common source artwork.
- SiFli also provides command-line tools and Android/iOS SDKs for integrating eZip into automated and mobile companion-app workflows.
- eZip can reduce asset storage, external-memory traffic, and application-CPU decode work, but it does not replace ePicasso or the display controller.
- Evaluate eZip 1.0, 2.0, and 3.0 against the exact chip and SDK. eZip 3.0 on SF32LB57x has the most extensive documented graphics/media integration.
- A successful eZip design is a controlled asset pipeline: source artwork, conversion settings, storage placement, graphics integration, and on-target testing all matter.

!!! note "Auto-generated content"
    This page was compiled/drafted without an existing source document. Verify technical claims against SiFli's official documentation before relying on them.
