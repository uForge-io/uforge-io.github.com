---
icon: lucide/image
description: "How SiFli's ePicasso 2D/2.5D GPU accelerates image blending, scaling, and layer composition on SF32, and where it fits alongside LVGL and the display controller."
tags:
    - Architecture
---
# ePicasso 2D / 2.5D GPU

## Introduction

**ePicasso** is SiFli's in-house 2D/2.5D graphics acceleration engine for the SF32 microcontroller family. It is designed for embedded user interfaces that need smooth visual effects, responsive touch interaction, and efficient display updates without relying entirely on the application CPU.

In a typical SF32 system, the application processor runs the UI framework, such as LVGL, and application logic, while ePicasso accelerates pixel-processing work such as image copy, blending, scaling, rotation, and layer composition. A dedicated display controller then transfers the final framebuffer or rendered region to the panel.

This division of work is important for wearable and AIoT products with displays. Modern watch faces, dashboards, health screens, notifications, and compact HMIs often contain transparent images, icons, anti-aliased fonts, gradients, and animated transitions. Rendering all of those operations in software can consume CPU time, memory bandwidth, and power. ePicasso moves many of these operations into hardware so that the CPU can spend more time on application logic, connectivity, audio, sensors, and low-power scheduling.

## Where ePicasso Fits in the SF32 Graphics Stack

The SF32 graphics subsystem can be viewed as a pipeline with four major layers:

```text
Application / UI Framework
        │
        ▼
Graphics Library Integration
        │
        ▼
ePicasso 2D / 2.5D Graphics Accelerator
        │
        ▼
Display Controller and Panel Interface
```

The application usually does not program every ePicasso operation directly. Instead, a graphics framework such as **LVGL** or a vendor graphics library builds draw commands for common UI operations. The SF32 graphics driver can then route suitable operations to ePicasso and fall back to CPU rendering when hardware acceleration is not applicable.

The display controller is separate from ePicasso. ePicasso prepares or updates pixel data in memory; the display controller sends that data to the physical display through interfaces such as SPI, QSPI, 8080 MCU bus, RGB/DPI, MIPI DSI, EPD, or JDI, depending on the specific SF32 device.

## Why Hardware Graphics Acceleration Matters

Embedded UI performance is often limited by memory movement rather than raw CPU instruction throughput. Even simple-looking effects can require many pixel reads, writes, and format conversions. For example, drawing a semi-transparent icon may require reading the source image, reading the destination framebuffer, blending the two pixels, and writing the result back to memory for every affected pixel.

ePicasso improves this situation by accelerating the repetitive pixel operations that appear throughout a user interface:

- Copying image blocks and framebuffer regions.
- Filling rectangles and UI backgrounds.
- Alpha blending icons, text masks, shadows, and overlays.
- Scaling bitmaps for responsive layouts and animations.
- Rotating or transforming image regions.
- Compositing multiple layers into a final display buffer.
- Converting between common pixel formats when supported by the device and driver.

The practical result is not only higher frame rate. Hardware acceleration can also reduce CPU utilization, improve touch responsiveness, and make it easier to keep the system in lower-power states between display updates.

## Core Rendering Concepts

### Surfaces and Framebuffers

A **surface** is a rectangular area of pixel memory. It may represent a full screen framebuffer, a partial draw buffer, an image asset, a canvas, or an intermediate layer. ePicasso operations generally read pixels from one or more source surfaces and write pixels to a destination surface.

For best performance, surfaces should be placed in memory that matches the access pattern:

- Frequently updated draw buffers often benefit from fast internal SRAM when enough space is available.
- Large images, fonts, and UI assets may live in Flash or PSRAM.
- Full-screen framebuffers for higher-resolution displays may require PSRAM.
- DMA-visible buffers must follow the SDK's memory and cache-coherency rules.

### Blending

Blending combines source pixels with destination pixels. This is essential for modern UI elements such as translucent cards, soft shadows, anti-aliased glyphs, overlays, and fading animations.

Common blending cases include:

- Constant-alpha blending for fading an entire layer.
- Per-pixel alpha blending for PNG-like images and anti-aliased icons.
- Mask-based blending for text, shapes, or monochrome assets.

When ePicasso handles blending in hardware, the CPU avoids executing the same arithmetic for every pixel in the affected region.

### Scaling and Rotation

Scaling and rotation are common in animated interfaces and responsive layouts. Hardware scaling can be used for zoom effects, preview thumbnails, resized icons, or adapting assets to different screen densities. Rotation is useful for screen orientation changes, rotating gauges, watch-face elements, and certain transition effects.

These operations are bandwidth-sensitive. The benefit of hardware acceleration depends on source format, destination format, memory placement, and whether the operation can be expressed in a form supported by the graphics driver.

### Layer Composition

Many screens are built from multiple visual layers: a background, image assets, text, status indicators, popups, and animation overlays. Layer composition combines those elements into the final visible result.

ePicasso is designed to accelerate this style of 2D composition. Instead of redrawing the entire screen in software, a UI framework can update only the invalidated regions and use the accelerator to composite the changed pixels efficiently.

## 2D and 2.5D Graphics

The term **2D graphics** usually refers to operations performed on flat rectangular images: copy, fill, blend, scale, rotate, and compose.

The term **2.5D graphics** is used for effects that still render into a 2D framebuffer but add transformation or perspective-like behavior. In embedded UI design, this may include transformed image regions, richer transitions, or effects that give a visual sense of depth without requiring a full 3D rendering pipeline.

For SF32 documentation, ePicasso should be understood primarily as a **2D/2.5D UI accelerator**, not as a desktop-class programmable 3D GPU. Its purpose is to make embedded interfaces smoother and more power-efficient, especially on displays used by wearables, smart controls, handheld devices, and compact dashboards.

## ePicasso Across the SF32 Family

Different SF32 devices integrate different ePicasso configurations. The exact feature set should always be checked against the product datasheet and reference manual for the selected chip.

<div align="center"><em>Table: ePicasso Across the SF32 Family</em></div>

<div align="center" markdown>

| Device Family | Graphics Accelerator | Typical Positioning |
|:--------------|:---------------------|:--------------------|
| **SF32LB52x** | ePicasso 2.0 Lite 2D/2.5D accelerator | Cost-optimized wearable, Bluetooth, and compact HMI products. |
| **SF32LB55x** | ePicasso 1.0 2.5D accelerator | BLE wearables and sensor-rich devices with display needs. |
| **SF32LB56x** | ePicasso 2.0 2D/2.5D accelerator | Higher-resolution display products and richer LVGL-style interfaces. |
| **SF32LB58x** | ePicasso 2.0 plus vector graphics acceleration on selected variants | Flagship graphics, high-resolution UI, and advanced visual applications. |

</div>

This scaling lets developers use a common graphics software model across the SF32 family while choosing the device that matches the required display resolution, memory size, graphics complexity, GPIO count, and power budget.

## Integration with LVGL and UI Frameworks

**LVGL** is a common choice for embedded graphical interfaces on SF32 devices. In an LVGL-based design, the application builds screens using widgets, styles, images, fonts, and animations. LVGL determines which regions need to be redrawn, and the display driver is responsible for rendering and flushing those regions to the panel.

ePicasso can improve LVGL performance when the SF32 port routes supported draw operations to hardware. The most useful acceleration points are typically:

- Image blits.
- Color fills.
- Alpha blending.
- Image scaling.
- Rotation or transformation of supported image regions.
- Compositing into a draw buffer or framebuffer.

A good LVGL integration should still include CPU fallback paths. Not every LVGL feature, pixel format, style effect, or image layout maps perfectly to a hardware operation. The most robust approach is to accelerate common high-volume operations and let software handle uncommon or highly complex cases.

## Memory and Bandwidth Considerations

Graphics acceleration does not remove the need for careful memory design. In many embedded display systems, the memory bus is the limiting resource. ePicasso, the CPU, display controller, DMA engines, Flash, PSRAM, audio, and wireless subsystems may all need memory access.

Good graphics performance depends on several design choices:

- Use display resolutions and color depths that match the product requirement.
- Keep frequently used UI assets in memory locations that provide acceptable access latency.
- Use partial rendering or dirty-region updates when full-screen refresh is unnecessary.
- Avoid unnecessary format conversion in the hot path.
- Align draw buffers and framebuffers according to SDK recommendations.
- Keep DMA and cache coherency rules clear when buffers are shared between CPU, ePicasso, and display controller.

For devices with instruction and data caches, cache maintenance is especially important. If the CPU writes a draw buffer and ePicasso reads it, or ePicasso writes a framebuffer and the CPU later reads it, the software must follow the SDK's cache clean/invalidate rules for shared buffers.

## Display Controller Relationship

ePicasso and the display controller solve different problems:

<div align="center"><em>Table: Display Controller Relationship</em></div>

<div align="center" markdown>

| Block | Main Role |
|:------|:----------|
| **ePicasso** | Renders, transforms, blends, and composes pixels in memory. |
| **Display controller** | Transfers the prepared pixel data to the physical panel. |

</div>

This distinction matters when debugging UI performance. A slow screen update may be caused by rendering time, memory bandwidth, panel transfer speed, display interface configuration, or synchronization strategy. Accelerating drawing with ePicasso helps most when rendering is the bottleneck. If the panel interface is the bottleneck, partial refresh, lower color depth, different buffering, or a faster display interface may be more important.

## Typical Use Cases

ePicasso is most useful in products where the interface contains many visual elements but the system still needs to stay within a microcontroller-level power budget.

Typical use cases include:

- Smartwatch watch faces and app screens.
- Fitness trackers and wearable health displays.
- Bluetooth audio user interfaces.
- eBike, eScooter, and compact vehicle dashboards.
- Smart home controls and small touch panels.
- Portable medical or industrial instruments.
- Label printers, smart badges, and electronic shelf labels.
- LVGL-based HMIs with icons, transparency, and animations.

## Practical Design Guidance

When designing an SF32 graphical product, start from the display and user-experience requirements, then work backward to the graphics architecture.

Important questions include:

- What is the display resolution and color depth?
- Is the panel updated through SPI, QSPI, 8080, RGB/DPI, MIPI DSI, EPD, or JDI?
- Does the product need full-screen animation, or mostly partial updates?
- Are UI assets stored in internal SRAM, Flash, or PSRAM?
- How much memory is available for draw buffers or framebuffers?
- Which operations can the graphics driver accelerate through ePicasso?
- Are CPU, ePicasso, and display-controller buffers cache coherent?

For many products, the best result comes from combining several techniques: hardware-accelerated drawing, partial refresh, compressed or optimized assets, careful buffer placement, and a UI design that avoids unnecessary full-screen redraws.

## Key Takeaways

- ePicasso is SiFli's 2D/2.5D graphics accelerator for SF32 microcontrollers.
- It offloads common pixel operations such as fill, copy, blending, scaling, rotation, and layer composition.
- It works alongside the display controller; ePicasso prepares pixel data, while the display controller sends it to the panel.
- Its benefits are strongest in UI-heavy products where memory movement, blending, and repeated pixel processing would otherwise consume significant CPU time.
- LVGL and other UI frameworks can benefit from ePicasso when the SF32 graphics driver maps supported draw operations to hardware.
- Real performance depends on display resolution, memory placement, pixel formats, buffer strategy, cache handling, and panel interface bandwidth.

!!! note "Auto-generated content"
    This page was compiled/drafted without an existing source document. Verify technical claims against SiFli's official documentation before relying on them.
