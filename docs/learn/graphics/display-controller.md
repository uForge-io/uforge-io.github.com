---
icon: lucide/monitor
description: "How the SF32 display controller transfers prepared pixels to a panel, including interface selection, flush paths, partial refresh, and panel bring-up."
tags:
  - Graphics
---

# Display Controller

## Overview

The **display controller** is the final-output block in the SF32 graphics flow. It transfers prepared pixels to the panel through the selected interface and, when TurboPixel is enabled, decompresses the TurboPixel framebuffer on that output path. It does not compose UI layers or decompress eZip assets; those jobs belong to the renderer/ePicasso and eZip decoder respectively.

See [Graphics Overview](overview.md#sf32-graphics-flow) for the complete resource-to-panel flow. This article focuses on the controller, panel connection, and driver integration.

Read this page when choosing a panel interface, defining an LVGL flush path, or bringing a new panel up on hardware. It separates controller-output work from asset decoding and pixel composition, so display problems can be isolated at the right layer.

## Select the Display Interface

The panel choice affects bandwidth, buffer strategy, pin use, power, initialization complexity, and PCB risk. Confirm the exact interface list for the selected device and package.

<div align="center"><em>Display Interface Options</em></div>

<div align="center" markdown>

| Interface | Typical Use | Design Notes |
|:---|:---|:---|
| **3-line / 4-line SPI** | Small TFT or AMOLED panels, simple HMIs | Low pin count and simple routing, but limited bandwidth for full-screen animation. |
| **Dual-SPI / Quad-SPI** | Wearable AMOLED and compact displays | Better bandwidth than basic SPI while keeping pin count moderate. |
| **8080 MCU interface** | Parallel display panels | Higher bandwidth than serial SPI, but uses more pins. |
| **RGB / DPI** | Larger or higher-refresh displays | Continuous pixel stream, higher bandwidth and pin use, and stricter timing. |
| **MIPI DSI** | High-density AMOLED or advanced panels | High bandwidth with few pins, but more complex initialization and signal integrity. |
| **EPD** | E-paper and ultra-low-refresh displays | Excellent static power behavior, but slow updates and special waveform/power handling. |
| **JDI / Memory-in-Pixel** | Low-power reflective displays | Suitable for always-on or sunlight-readable UI, with update patterns unlike TFT/AMOLED. |

</div>

For example, a small SPI/QSPI panel can favor partial updates, while an RGB/DPI panel needs a sustained scanout bandwidth budget. Do not select an interface from theoretical throughput alone: include pixel format, resolution, refresh behavior, panel GRAM, and other PSRAM users.

## Per-Device Interface Matrix

The matrix below is a family-selection aid, not a pin-assignment table. It reflects the documented display interfaces for the listed SF32 family or silicon variant. A dash means the interface is not documented for that row; it does not rule out a GPIO-driven external controller or a board-specific implementation. Always confirm the exact order code, package, pin mux, SDK release, and panel driver before committing a schematic.

<div align="center"><em>SF32 Display-Interface Matrix</em></div>

<div align="center" markdown>

| SF32 Family / Variant | Documented LCD / Panel Interfaces | Package or Variant Constraint | Practical Selection Direction |
|:---|:---|:---|:---|
| **SF32LB52x** | 3-/4-wire SPI, Dual-SPI, Quad-SPI, MCU/8080 (MIPI DBI), serial JDI | Verify the exact part/package and board pin exposure. | Compact SPI/QSPI and 8080 designs; suitable for serial JDI and EPD solutions using the appropriate panel/controller path. |
| **SF32LB55x** | 3-/4-wire SPI, Dual-SPI, Quad-SPI, MCU/8080, serial/parallel JDI, MIPI DSI command mode | The documented 2-lane MIPI DSI interface is available on BGA145/169 packages; command mode requires a panel controller with internal SRAM/GRAM. | Wearable and connected-display products using a compatible BGA package and a MIPI command-mode panel. |
| **SF32LB56xU** | 3-/4-wire SPI, Dual-SPI, Quad-SPI, serial JDI | The U variant has a narrower documented display set than 56xV. | Compact serial-panel designs where QSPI bandwidth and lower pin count are priorities. |
| **SF32LB56xV** | 3-/4-wire SPI, Dual-SPI, Quad-SPI, DBI 8080, DPI/RGB, serial/parallel JDI | Confirm the high-I/O package and board routing. | Higher-resolution or higher-refresh designs that need 8080, DPI/RGB, or parallel JDI. |
| **SF32LB57x** | 3-/4-wire SPI, Dual-SPI, Quad-SPI, 8080, DPI/RGB, JDI, 8-/16-bit EPD | Confirm package pin availability and the selected panel-driver path. | Graphics-rich designs with broad parallel, serial, JDI, or EPD display requirements. |
| **SF32LB58x** | 3-/4-wire SPI, Dual-SPI, Quad-SPI, MCU/8080, DPI/RGB, serial/parallel JDI, 2-lane MIPI DSI command and video modes | Command mode uses a panel controller with internal SRAM/GRAM; video mode also supports RAM-less panel controllers. Confirm LCD controller, package, and pin-mux allocation. | High-resolution and bandwidth-demanding UI designs, including MIPI DSI panels with or without controller RAM. |

</div>

For **SF32LB56x**, do not treat the U and V entries as interchangeable. For **SF32LB55x** and **SF32LB58x**, do not reserve MIPI DSI in a schematic until the exact package, its DSI pins, and the panel's lane/mode requirements are all confirmed. In particular, SF32LB55x is command-mode only, so a RAM-less video-mode panel is not a valid match. EPD designs also require panel-specific timing, waveform, and power planning; an interface label alone is not a complete EPD design.

## Controller, Buffers, and Flush Paths

The UI framework produces changed pixels; the display driver and controller deliver them to the panel. The appropriate path depends on the panel:

- A SPI/QSPI or 8080 driver usually sets a panel window and transfers only the changed region.
- A controller scanning a framebuffer consumes pixel data from memory according to the display timing.
- A TurboPixel-capable path reads the compressed final bitmap and decompresses it at the display-controller stage.

In an LVGL design, the display flush callback is the boundary between rendering and output. It should be region-aware, start the correct DMA or controller operation, and signal completion only when the framework can safely reuse the draw buffer. Keep cache clean/invalidate rules explicit whenever the CPU and hardware share buffers.

<div align="center"><em>Display-Path Decisions</em></div>

<div align="center" markdown>

| Decision | Direction to Validate |
|:---|:---|
| Flush region | Transfer only changed regions where the panel and driver support it. |
| Buffering | Choose partial, full-frame, single, or double buffering from latency and memory requirements. |
| Synchronization | Avoid reusing a buffer before the controller or DMA has completed its transfer. |
| Pixel format | Match the panel, driver, renderer, and any accelerator path to avoid hot-path conversion. |
| Cache | Clean CPU-written buffers before hardware reads; invalidate hardware-written buffers before CPU reads. |

</div>

## Partial Refresh and Dirty Regions

Most embedded UIs do not need to redraw the full screen every frame. LVGL tracks invalidated regions, and the driver can flush only the changed areas. This is particularly valuable for SPI/QSPI panels, battery-powered wearables, static pages with small changing values, EPD, and JDI displays.

Full-screen refresh is appropriate for animation-heavy screens, transitions, or panels that naturally scan from a full framebuffer. The choice depends on display-interface bandwidth, panel behavior, and the memory budget—not only on the UI framework setting.

## Panel Bring-Up Sequence

Bring up the panel in stages before debugging widgets or application behavior:

1. Verify power rails, reset timing, backlight/enable pins, and basic current draw.
2. Send the panel vendor's initialization sequence exactly as supplied.
3. Fill solid colors to expose byte order, pixel format, and interface-wiring errors.
4. Draw simple geometric patterns to check stride, window addressing, and coordinates.
5. Add image assets and text to check color conversion, fonts, and asset placement.
6. Enable partial refresh, DMA, TurboPixel, and graphics acceleration one at a time.
7. Test sleep, display-off, wake, and reinitialization paths.

Do not debug LVGL screens until the panel reliably renders simple fills and patterns through the same output path the finished UI will use.

## Isolate Display-Path Failures

Treat each stage as a separate boundary. This avoids changing panel commands, LVGL code, buffer placement, and DMA settings at once—an approach that makes a display failure harder to reproduce.

<div align="center"><em>Display-Path Diagnostic Matrix</em></div>

<div align="center" markdown>

| Symptom | First Boundary to Check | Focused Test | Likely Class of Cause |
|:---|:---|:---|:---|
| Panel stays blank | Power, reset, and panel initialization | Measure rails/reset; run the vendor initialization sequence; send a solid fill. | Power sequence, reset polarity, initialization commands, or physical interface connection. |
| Solid fills work but colors are wrong | Renderer-to-panel pixel format | Draw red, green, blue, black, and white test bars. | RGB/BGR order, byte order, color-depth setting, or format conversion. |
| Image is shifted, clipped, or torn | Addressing and synchronization | Draw a grid, then test one fixed update region repeatedly. | Window coordinates, stride, panel timing, buffer reuse, or incomplete DMA synchronization. |
| Static UI works but animation stutters | Render, transfer, and memory boundary | Measure render time and flush-complete time separately. | Excessive redraw area, PSRAM contention, slow interface, or an unsuitable buffer strategy. |
| Artifacts appear only after sleep/wake | Power-state transition | Re-run the fill/grid test after every supported display-off and wake path. | Lost panel state, reset/init omission, rail sequencing, or stale cache/buffer state. |
| A feature fails only when enabled | Specific optional path | Enable DMA, partial refresh, ePicasso, or TurboPixel one at a time. | Unsupported configuration, alignment/cache rule, or driver integration error. |

</div>

## Panel-Specific Guidance

### SPI and QSPI AMOLED/TFT

Prefer partial refresh, RGB565 where suitable, and modest animation regions. Avoid full-screen redraws for small changes; render and compose before flushing the changed region.

### RGB / DPI Panels

Budget sustained scanout bandwidth alongside CPU, ePicasso, DMA, and other memory traffic. Select a framebuffer strategy for the required refresh rate, consider double buffering when memory permits, and account for timing and signal integrity in the PCB design.

### MIPI DSI Panels

Choose the panel mode before committing the part. **SF32LB55x supports MIPI DSI command mode only**, so the panel controller must provide internal SRAM/GRAM to hold the updated image. **SF32LB58x supports both command and video modes**: command-mode panels need controller RAM, while video mode can drive a RAM-less panel controller from the continuous pixel stream. Validate initialization early, test low-power states and wake timing, and leave bandwidth margin beyond the interface's theoretical maximum.

### EPD Displays

Design for infrequent updates; use partial-update modes only when supported and visually acceptable. Avoid animation assumptions and plan display PMIC, VCOM, and waveform requirements.

### JDI / Memory-in-Pixel Displays

Use small update regions and UI patterns that benefit from persistent display memory. Follow the panel datasheet for COM inversion or maintenance requirements, then validate outdoor readability, refresh behavior, and power in product conditions.

## Production Handoff Checklist

Before treating the display path as complete, record the choices another engineer must reproduce:

- Exact SF32 device, package, SDK release, board revision, panel part number, and panel-controller revision.
- Interface mode, pin assignment, pixel format, byte/color order, target refresh behavior, and panel initialization source.
- Draw-buffer and framebuffer locations, sizes, alignment, cache-maintenance ownership, and DMA/controller completion signal.
- Partial-refresh policy, panel-window rules, and any regions that must be refreshed together to avoid artifacts.
- Measured render time, transfer time, peak/average PSRAM traffic where relevant, and current for representative UI states.
- Sleep, display-off, wake, and recovery test results, including the behavior after a failed or interrupted transfer.

This record turns display support from a one-off bring-up result into a repeatable product integration. Re-validate it whenever the panel, SDK, memory layout, pixel format, or display driver changes.

## Key Takeaways

- The display controller owns panel output; it is separate from ePicasso's pixel composition and eZip's asset decompression.
- Interface choice determines much of the bandwidth, buffer, power, pin, and PCB design.
- Treat the flush path, synchronization, cache maintenance, and panel initialization as first-class firmware work.
- Validate the panel with simple patterns before enabling higher-level UI, DMA, TurboPixel, or acceleration features.
- Diagnose failures one display-path boundary at a time, then preserve the verified configuration and measurements for production handoff.

!!! note "Auto-generated content"
    This page was compiled/drafted without an existing source document. Verify technical claims against SiFli's official documentation before relying on them.
