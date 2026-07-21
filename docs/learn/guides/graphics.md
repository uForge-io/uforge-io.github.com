---
icon: lucide/image
tags:
  - Guides
---

# Graphics Guide

## Overview

This guide explains how to build responsive graphical user interfaces on SF32 devices. It focuses on the practical decisions that affect real products: display selection, framebuffer strategy, LVGL integration, ePicasso hardware acceleration, memory placement, and display refresh behavior.

SF32 devices are designed for compact AIoT and wearable products where the UI must feel smooth while the system still meets strict power, memory, and PCB-area targets. The graphics subsystem combines three main pieces:

- An application processor that runs the UI framework and product logic.
- The **ePicasso** 2D/2.5D graphics accelerator, which speeds up common pixel operations.
- A display controller that sends rendered pixels to the panel through the selected display interface.

For a deeper architecture explanation, see [ePicasso GPU Architecture Overview](../architecture/epicasso-gpu.md).

## Typical SF32 Graphics Pipeline

A practical SF32 UI pipeline looks like this:

```text
Application screens and widgets
        │
        ▼
LVGL or another UI framework
        │
        ▼
SF32 graphics/display driver
        │
        ├── CPU fallback rendering
        │
        └── ePicasso acceleration
        │
        ▼
Draw buffer or framebuffer in memory
        │
        ▼
Display controller
        │
        ▼
SPI / QSPI / 8080 / RGB / MIPI DSI / EPD / JDI panel
```

The best designs keep these layers cleanly separated. Application code should describe UI state and behavior. The UI framework should manage widgets, invalidation, and drawing. The display driver should decide which operations can be accelerated and how pixels are flushed to the panel.

## Choose the Display First

The display choice affects nearly every graphics decision. Before optimizing code, define the panel requirements clearly:

- Resolution.
- Color depth.
- Refresh rate.
- Interface type.
- Touch controller requirements.
- Backlight or display power rails.
- Whether partial refresh is supported.
- Whether the panel has internal GRAM.
- Whether low-power always-on display behavior is required.

A small SPI or QSPI AMOLED behaves very differently from an RGB panel, MIPI DSI panel, JDI memory display, or EPD panel. The same UI framework can target many display types, but the best buffer strategy and refresh policy will change.

## Display Interface Options

SF32 family members support different display interfaces. Always confirm the exact interface list for the selected device and package.

<div align="center"><em>Table: Display Interface Options</em></div>

<div align="center" markdown>

| Interface | Typical Use | Design Notes |
|:----------|:------------|:-------------|
| **3-line / 4-line SPI** | Small TFT or AMOLED panels, simple HMIs | Low pin count, simple routing, but limited bandwidth for full-screen animation. |
| **Dual-SPI / Quad-SPI** | Wearable AMOLED and compact displays | Better bandwidth than basic SPI while keeping pin count moderate. |
| **8080 MCU interface** | Parallel display panels | Higher bandwidth than serial SPI, but uses more pins. |
| **RGB / DPI** | Larger or higher-refresh displays | Continuous pixel stream, higher bandwidth, more pins, stricter timing. |
| **MIPI DSI** | High-density AMOLED or advanced panels | High bandwidth and low pin count, but more complex initialization and signal integrity. |
| **EPD** | E-paper and ultra-low-refresh displays | Excellent static power behavior, but slow updates and special waveform/power handling. |
| **JDI / Memory-in-Pixel** | Low-power reflective displays | Good for always-on or sunlight-readable UI, with different update patterns from TFT/AMOLED. |

</div>

For example, SF32LB52x is well suited to compact displays up to 512 x 512 using SPI/QSPI, JDI, or EPD-style interfaces depending on variant. Higher-end family members add options for richer RGB, MIPI, or higher-resolution display designs.

## Pick the Right SF32 Device

Choose the chip based on the display and UI workload, not just CPU frequency.

<div align="center"><em>Table: Pick the Right SF32 Device</em></div>

<div align="center" markdown>

| Requirement | Typical Device Direction |
|:------------|:-------------------------|
| Basic Bluetooth product with small UI | SF32LB52x |
| Entry smartwatch, badge, label, simple HMI | SF32LB52x |
| BLE wearable with sensor-rich UI | SF32LB55x |
| RGB display or richer LVGL interface | SF32LB56x |
| High-resolution display or advanced graphics | SF32LB56x or SF32LB58x |
| MIPI DSI display | SF32LB55x or SF32LB58x, depending on panel and product class |
| Flagship UI with graphics, audio, AI, and large memory | SF32LB58x |

</div>

The most important constraints are display interface, resolution, memory capacity, graphics accelerator generation, available pins, and power budget.

## Framebuffer and Bandwidth Calculator

Estimate memory and transfer cost before choosing a panel or animation style:

```text
framebuffer bytes = width x height x bytes_per_pixel
raw full-frame bandwidth = framebuffer bytes x frames_per_second
```

Examples:

<div align="center"><em>Table: Framebuffer and Bandwidth Calculator</em></div>

<div align="center" markdown>

| Panel | Format | One Full Buffer | 30 fps Full-Frame Traffic |
|:------|:-------|----------------:|--------------------------:|
| 240 x 240 | RGB565 | ~113 KB | ~3.4 MB/s |
| 390 x 390 | RGB565 | ~297 KB | ~8.9 MB/s |
| 454 x 454 | RGB565 | ~403 KB | ~12.1 MB/s |
| 480 x 480 | RGB888 | ~675 KB | ~20.3 MB/s |

</div>

These are raw pixel numbers before command overhead, alignment, cache maintenance, asset reads, blending, or other system traffic. If the product also runs Bluetooth audio, AI, or external PSRAM traffic, leave margin.

## Understand Your Buffers

A UI is ultimately pixels in memory. The main buffer types are:

<div align="center"><em>Table: Understand Your Buffers</em></div>

<div align="center" markdown>

| Buffer Type | Purpose |
|:------------|:--------|
| **Draw buffer** | Temporary area used by LVGL or the graphics driver to render changed regions. |
| **Framebuffer** | Full-screen pixel memory used as the display source. |
| **Partial framebuffer** | Smaller region buffer used when full-screen buffering is too expensive. |
| **Asset buffer** | Image, font, icon, or decoded resource data. |
| **Intermediate layer** | Temporary surface used for blending, animation, or composition. |

</div>

A full-screen framebuffer can be convenient, but it may consume too much SRAM on larger panels. For a 454 x 454 RGB565 display, a single full-screen buffer is about 412 KB. Two buffers double that. Higher color depths and larger displays grow quickly.

When memory is tight, use partial draw buffers and dirty-region updates. When animation is important and memory is available, full-screen or double-buffered strategies may make the UI smoother.

## Choose Color Depth Carefully

Color depth affects visual quality, memory use, and bus bandwidth.

<div align="center"><em>Table: Choose Color Depth Carefully</em></div>

<div align="center" markdown>

| Format | Bytes per Pixel | Notes |
|:-------|----------------:|:------|
| **RGB565** | 2 | Common balance for embedded UI; good memory and bandwidth efficiency. |
| **RGB666** | 3 or packed | Better color precision, more bandwidth. |
| **RGB888** | 3 | Higher quality, larger memory and transfer cost. |
| **RGB111 / monochrome-style formats** | Device dependent | Useful for simple or ultra-low-power displays such as EPD/JDI-style applications. |

</div>

For most wearable and compact HMI products, RGB565 is a strong default unless the panel, UI quality target, or product requirements demand more.

## Integrating LVGL

LVGL is a practical UI framework for SF32 devices because it provides widgets, styles, input handling, animation, invalidation, and display-driver hooks.

A typical LVGL integration needs:

- A display driver flush callback.
- One or more draw buffers.
- A tick source for LVGL timing.
- Input device drivers for touch, buttons, encoders, or gestures.
- Asset handling for images and fonts.
- Optional hardware acceleration hooks for ePicasso.

The display flush callback is where rendered pixels are transferred to the panel. Depending on the display type, the callback may send a partial region over SPI/QSPI, update a panel GRAM window, start a DMA transfer, or coordinate with a framebuffer scanned by the display controller.

## LVGL Porting Decisions

Lock down these LVGL integration details before polishing screens:

<div align="center"><em>Table: LVGL Porting Decisions</em></div>

<div align="center" markdown>

| Decision | Preferred Direction |
|:---------|:--------------------|
| Tick source | Stable system tick that continues correctly across sleep/wake. |
| Flush callback | Region-aware transfer path, with completion signaling from DMA/display driver. |
| Draw buffer count | One or two buffers depending on latency and memory budget. |
| Invalidated area policy | Merge small regions only when it reduces total transfer cost. |
| Input devices | Touch/buttons/encoder integrated through LVGL input drivers, not app polling loops. |
| Hardware acceleration | Enable only operations supported by the SDK/driver and keep CPU fallback. |
| Cache handling | Clean/invalidate shared buffers at the framework-driver boundary. |

</div>

A good LVGL port should let screen code stay declarative while the driver owns transfer, synchronization, acceleration, and cache behavior.

## Using ePicasso Acceleration

ePicasso is useful when the UI contains operations that would otherwise require many repeated pixel calculations. Common candidates include:

- Rectangle fills.
- Image copy and blit operations.
- Alpha blending.
- Image scaling.
- Rotation or transformation of supported image regions.
- Layer composition.
- Pixel format conversion where supported by the driver.

A good port should accelerate common high-volume operations while keeping CPU fallback paths for unsupported cases. Do not assume every LVGL style effect or widget maps to hardware. Measure the actual screens that matter for the product.

### When Acceleration Helps Most

ePicasso usually helps most when:

- Large regions are filled, copied, blended, scaled, or transformed.
- The UI uses transparent icons, text masks, shadows, overlays, or animated transitions.
- The CPU would otherwise spend a large part of each frame doing pixel loops.
- Memory placement and pixel formats match what the accelerator can handle efficiently.

### When Acceleration May Not Help Much

Hardware acceleration may provide limited benefit when:

- The updated region is very small.
- The bottleneck is panel transfer bandwidth, not rendering.
- Assets require unsupported formats or expensive conversion.
- Buffers are placed in slow memory without enough bandwidth.
- Cache maintenance overhead dominates the operation.

## Memory Placement Strategy

Graphics performance is often limited by memory movement. Place buffers intentionally:

- Put hot draw buffers in fast SRAM when possible.
- Keep large framebuffers in PSRAM only when SRAM is insufficient.
- Store large images and fonts in Flash or PSRAM, but consider access latency.
- Avoid repeatedly converting assets at runtime.
- Keep DMA-accessed buffers aligned according to SDK guidance.
- Use compressed or indexed assets when they reduce total bandwidth and decode cost.

If the CPU, ePicasso, DMA, display controller, or other peripherals share buffers, follow the SDK cache maintenance rules. Clean CPU-written buffers before hardware reads them. Invalidate buffers after hardware writes them and before the CPU reads them.

## Partial Refresh and Dirty Regions

Most embedded UIs do not need to redraw the full screen every frame. LVGL tracks invalidated regions, and the driver can flush only the changed areas.

Partial refresh is especially valuable for:

- SPI and QSPI panels.
- Battery-powered wearables.
- Static screens with small changing values.
- EPD and JDI displays.
- UIs with small indicators, time updates, or notifications.

Full-screen refresh is useful for animation-heavy screens, transitions, or panels that naturally scan from a full framebuffer. The right choice depends on display interface bandwidth and memory budget.

## Panel Bring-Up Sequence

Most display failures come from initialization order, power sequencing, or timing assumptions. Bring up the panel in stages:

1. Verify power rails, reset timing, backlight/enable pins, and basic current draw.
2. Send the vendor initialization sequence exactly as provided, then simplify only after the panel is stable.
3. Fill solid colors first; this catches byte order, pixel format, and interface wiring issues.
4. Draw simple geometric patterns; this catches stride, window, and coordinate problems.
5. Add image assets and text; this catches color conversion and font/asset placement issues.
6. Enable partial refresh, DMA, and acceleration one at a time.
7. Test sleep, display-off, wake, and reinitialization paths.

Do not debug LVGL widgets until the panel can reliably display simple fills and patterns through the same flush path the final UI will use.

## Display-Type Guidance

### SPI and QSPI AMOLED/TFT

SPI and QSPI displays are common in compact wearables because they use relatively few pins. Their main limitation is bandwidth.

Recommendations:

- Prefer partial refresh when possible.
- Use RGB565 unless higher color depth is required.
- Keep animations modest or use smaller animated regions.
- Use ePicasso for blending and image operations before flushing.
- Avoid full-screen redraws for small UI changes.

### RGB / DPI Panels

RGB panels consume pixels continuously from memory or a display pipeline. They can support richer interfaces, but they require more pins and more sustained bandwidth.

Recommendations:

- Use a framebuffer strategy that matches the required refresh rate.
- Budget memory bandwidth for display scanout plus CPU, ePicasso, DMA, and other workloads.
- Consider double buffering for tear-free animation when memory allows.
- Keep timing and signal integrity in mind during PCB design.

### MIPI DSI Panels

MIPI DSI is useful for higher-density AMOLED and advanced displays. It can provide high bandwidth with relatively few pins, but panel initialization and signal integrity are more complex.

Recommendations:

- Confirm command-mode or video-mode behavior for the target panel.
- Verify panel initialization sequence early.
- Test low-power display states and wake timing.
- Leave margin for UI bandwidth, not just theoretical interface bandwidth.

### EPD Displays

EPD panels are very different from TFT or AMOLED. They are excellent for static information and low refresh rates, but updates are slow and often require special waveform and power sequencing.

Recommendations:

- Design UI around infrequent updates.
- Use partial update modes if supported and visually acceptable.
- Avoid animations and rapid redraw assumptions.
- Plan display PMIC, VCOM, and waveform requirements carefully.

### JDI / Memory-in-Pixel Displays

JDI-style memory displays can be attractive for always-on, sunlight-readable, low-power products.

Recommendations:

- Use UI patterns that benefit from persistent display memory.
- Keep update regions small.
- Handle COM inversion or display-specific maintenance requirements according to the panel datasheet.
- Validate outdoor readability, refresh behavior, and power in real product conditions.

## Asset Preparation

Good asset preparation can make a UI faster before any code optimization begins.

Use these rules of thumb:

- Match image dimensions to actual on-screen size.
- Avoid scaling large images every frame.
- Pre-render complex shadows, gradients, or backgrounds when possible.
- Use alpha only where transparency is needed.
- Prefer shared icon sets and font subsets.
- Remove unused glyphs from fonts.
- Keep frequently used assets in formats supported efficiently by the graphics path.

For multilingual products, font memory can dominate the UI budget. Plan font fallback, glyph subsets, and text layout early.

## Animation Strategy

Smooth animation depends on frame budget, panel bandwidth, rendering cost, and power.

A practical approach:

- Animate only what users notice.
- Keep animated regions small.
- Prefer transforms or opacity changes that map well to acceleration.
- Avoid expensive full-screen blur, shadow, or transparency effects on every frame.
- Reduce frame rate for non-critical effects.
- Stop animations when the screen is dimmed, covered, or inactive.

A wearable UI does not need desktop-style animation everywhere. A few fast, clear transitions usually feel better than many effects that drain power or drop frames.

## Graphics Validation Matrix

Use repeatable screens instead of subjective “smooth enough” checks:

<div align="center"><em>Table: Graphics Validation Matrix</em></div>

<div align="center" markdown>

| Test Screen | What It Stresses |
|:------------|:-----------------|
| Solid fill and color bars | Pixel format, byte order, flush path. |
| Text-heavy screen | Font memory, glyph cache, partial refresh. |
| Icon grid with alpha | Blending, asset bandwidth, ePicasso path. |
| Scrolling list | Invalidated regions, transfer bandwidth, input latency. |
| Full-screen transition | Frame budget, double buffering, panel bandwidth. |
| Dim/idle screen | Animation stop policy, backlight, PM votes. |
| Worst-case coexistence | Bluetooth/audio/AI active while UI updates. |

</div>

Track render time, flush time, CPU load, and power for each screen. If only total frame time is measured, it is hard to know whether the bottleneck is LVGL, ePicasso, memory, or the panel interface.

## Debugging Graphics Performance

When the UI is slow, identify the bottleneck before changing the design.

<div align="center"><em>Table: Debugging Graphics Performance</em></div>

<div align="center" markdown>

| Symptom | Likely Area to Check |
|:--------|:---------------------|
| High CPU usage while drawing | Missing hardware acceleration, too many software pixel operations, complex widgets. |
| Rendering completes but display updates slowly | Panel interface bandwidth, flush size, display-driver transfer path. |
| Tearing or flicker | Buffering strategy, synchronization, partial update timing. |
| Random artifacts | Cache coherency, buffer lifetime, stride/pixel-format mismatch. |
| Good simple screens, poor animation | Full-screen redraws, large alpha blends, asset scaling, panel bandwidth. |
| High power during idle UI | Unnecessary redraws, timers, animations, display/backlight policy. |

</div>

Measure these separately:

- LVGL render time.
- ePicasso operation time.
- Display flush time.
- CPU load.
- Memory bandwidth pressure.
- Power consumption during active, idle, and sleep states.

## Common Mistakes

Avoid these early; they are expensive to fix late:

- Choosing a panel interface before estimating bandwidth.
- Using full-screen redraws for small UI changes.
- Storing all UI assets in slow memory without profiling.
- Using RGB888 when RGB565 is sufficient.
- Scaling large images every frame.
- Forgetting cache maintenance for hardware-shared buffers.
- Assuming ePicasso accelerates every UI operation automatically.
- Using too many timers or animations that keep the CPU awake.
- Ignoring touch latency while optimizing only frame rate.
- Waiting until PCB bring-up to validate panel initialization.

## Bring-Up Checklist

Use this checklist when starting a new SF32 graphics project:

- [ ] Confirm display resolution, color depth, interface, and panel driver IC.
- [ ] Confirm the selected SF32 device supports the required display interface.
- [ ] Estimate framebuffer and draw-buffer memory requirements.
- [ ] Decide full-frame, partial, single-buffer, or double-buffer strategy.
- [ ] Bring up panel reset, power rails, backlight, and initialization sequence.
- [ ] Implement the LVGL tick, display flush, and input drivers.
- [ ] Verify basic fill, image, text, and touch behavior.
- [ ] Enable ePicasso acceleration where supported by the SDK and driver.
- [ ] Validate cache clean/invalidate behavior for shared buffers.
- [ ] Profile render time, flush time, CPU load, and power.
- [ ] Test worst-case screens, animations, Bluetooth activity, and sleep/wake paths.

## Key Takeaways

- Start graphics design from the display interface, resolution, color depth, and refresh requirements.
- Use LVGL or a similar framework to manage widgets, invalidation, drawing, and input.
- Use ePicasso to accelerate common pixel operations, but keep CPU fallback paths.
- Optimize memory placement and buffer strategy as carefully as rendering code.
- Prefer partial refresh for bandwidth-limited panels and static wearable screens.
- Treat UI performance as a system problem involving CPU, ePicasso, memory, display controller, panel interface, touch, and power policy.

!!! note "Auto-generated content"
    This page was compiled/drafted without an existing source document. Verify technical claims against SiFli's official documentation before relying on them.
