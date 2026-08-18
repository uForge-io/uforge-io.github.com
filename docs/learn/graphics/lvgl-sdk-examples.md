---
icon: lucide/layout-dashboard
title: "LVGL SDK Examples"
description: "Choose the right SiFli-SDK LVGL example for UI bring-up, widgets, design tools, compressed assets, animation, media, and wearable interfaces."
tags:
  - Graphics
  - LVGL
  - Examples
---

# LVGL SDK Examples { #lvgl-sdk-examples }

The SiFli-SDK LVGL examples are useful, working baselines for a display and UI path. They are not interchangeable product templates: a widget demo proves a different boundary from a video, compressed-asset, or wearable-interface example. Start with the example that exercises the hardest part of the product, make it work unchanged on the target board, and then replace one layer at a time.

This guide organizes the examples in the [SiFli-SDK LVGL index](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/index.html) by engineering outcome. Refer to the official source page for the current supported boards, SDK configuration, source path, assets, build command, and version-specific restrictions.

## Start with the Right LVGL Baseline

<div align="center"><em>Table: SiFli-SDK LVGL Examples by Engineering Task</em></div>

<div align="center" markdown>

| Engineering goal | Start with | What it helps you establish | Move on when |
|:-----------------|:-----------|:----------------------------|:-------------|
| Bring up a standard LVGL application | **LVGL v8 Demos**, **LVGL v8 Official Examples**, **LVGL v9 Demo**, or **LVGL v9 Official Examples** | The selected LVGL version, board display driver, rendering loop, and baseline widgets | The display flush path and input device are stable on the actual panel |
| Evaluate a UI-design workflow | **gui_guider**, **SquareLine**, or **EEZ Studio** examples | How generated UI code fits into an SDK project | Generated code builds cleanly and its LVGL version matches the project |
| Prototype focused UI behavior | **Basechart**, **Baselabel**, **Follow**, **Imgarray**, **Imgbar**, **Mulroller**, **Multanim**, **Multlist**, **Multroller**, **Multslider**, **Sector**, **Select**, or **Timeline** | A specific interaction, widget, arrangement, or animation pattern | The product needs a composed screen rather than an isolated visual element |
| Validate assets, animation, or media | **Dynamic eZip (LVGL v8/v9)**, **Lottie**, **Local Video File Playback**, or **streaming_media** | The storage, decode, rendering, and refresh path for richer content | Asset size, memory placement, update rate, and power budget are measured on target hardware |
| Build a recognizable end-to-end UI | **Electronic Compass**, **Games**, or **Watch Interface (v8/v9)** | Screen flow, interaction, and a multi-feature display workload | Product-specific data, lifecycle behavior, and performance limits are ready to replace the demo content |

</div>

## Confirm the Integration Boundary First

Before adapting any LVGL example, establish which layer the sample already proves and which layers remain product work:

<div align="center"><em>Table: LVGL Example Integration Boundaries</em></div>

<div align="center" markdown>

| Boundary | The example can establish | The product must still establish |
|:---------|:--------------------------|:--------------------------------|
| Board and panel | A known SDK board configuration and display route | Exact panel, touch controller, power sequence, pin mux, reset timing, and production test path |
| LVGL | Version-specific initialization and example UI behavior | The product's screen architecture, event ownership, memory limits, and update policy |
| Assets | A supported sample asset path | Asset format, storage size, loading time, cache policy, licensing, and failure handling |
| Rendering | A working draw and flush loop | Dirty-region strategy, buffer count, color format, DMA/cache handling, and UI responsiveness under load |
| Application | Visible demonstration behavior | Sensors, Bluetooth, storage, timekeeping, low-power transitions, recovery, and user data |

</div>

Start by verifying the physical display, its panel interface, and the basic flush path. See [Graphics Overview](overview.md) and [Display Controller](display-controller.md) before treating an LVGL demo as evidence that the final graphics architecture is ready.

## Choose the LVGL Version Deliberately

The official index includes both LVGL v8 and LVGL v9 examples. Keep a generated UI project, its example baseline, and the SDK configuration on the same LVGL major version. Do not take a generated screen or a custom widget from one major version and drop it into another without an explicit porting review.

For a first board bring-up, use the demo or official-example entry that matches the LVGL version already selected by the SDK board configuration. It provides the cleanest proof of the panel, buffers, input, and scheduling path before application-specific work begins.

## Generated UI: gui_guider, SquareLine, and EEZ Studio

Use a UI-design-tool example when the team needs a visual editor to produce a screen hierarchy, styles, and assets. The index includes examples for **gui_guider**, **SquareLine**, and **EEZ Studio**.

The gui_guider example documents a concrete version boundary: it is based on LVGL v8, so generated gui_guider code must also target LVGL v8. Treat that as the general rule for all code generators. Verify the generated-code version, screen resolution, color depth, asset path, and callback ownership before importing it into a product.

Generated code accelerates UI construction; it does not replace the display driver, buffer plan, input drivers, power policy, or integration tests. Keep generated files separate from hand-written application logic so that a re-export does not silently overwrite product changes.

## Widget and Interaction Patterns

The index’s focused LVGL samples are best treated as small, isolated experiments:

- **Basechart** and **Baselabel** for visualizing data and text presentation.
- **Follow**, **Select**, and **Sector** for interaction and state-driven visual behavior.
- **Imgarray** and **Imgbar** for image-based visual composition.
- **Mulroller**, **Multroller**, **Multlist**, and **Multslider** for multi-item selection or control patterns.
- **Multanim** and **Timeline** for animation and timed visual changes.

Use one of these when a particular control is the risk in your product. Keep the first port small: run the original control, substitute product data, then measure redraw cost and memory use before adding it to a larger screen. Combining several visually simple controls can still stress the framebuffer, asset bandwidth, or input scheduling.

## Asset, Animation, and Media Workloads

The Dynamic eZip examples are available for both LVGL v8 and LVGL v9. Use the version that matches the application to validate dynamic compressed-asset loading before adopting it broadly. The [eZip](ezip.md) article explains the asset-compression role in the graphics pipeline.

The **Lottie**, **Local Video File Playback**, and **streaming_media** examples represent progressively more demanding content paths. They should be evaluated as system workloads, not merely visual demos. Measure asset or stream storage, decode time, frame-update cadence, PSRAM/SRAM use, display bandwidth, and current consumption while Bluetooth, sensors, and the final display interface are active.

Avoid treating a smooth short demo as proof that the path can sustain a long-running animation. Use realistic content duration and the actual panel refresh policy when validating a product.

## Compass, Games, and Watch Interfaces

The **Electronic Compass**, **Games**, and **Watch Interface (v8/v9)** entries provide more complete UI behavior than a single widget sample. They are useful for studying screen organization, input and animation cadence, and the effects of a richer display workload.

The compass example must be connected to a real sensor and calibrated according to the sensor and product requirements; a visual compass alone does not establish direction accuracy. Game and watch-interface examples are strong screen-flow starting points, but a product must still define data ownership, low-power behavior, display wake policy, notifications, and fault recovery.

## Adapt an Example Without Losing Its Evidence

<div align="center"><em>Table: Product-Adaptation Checks for LVGL Examples</em></div>

<div align="center" markdown>

| Step | Evidence to keep | Why it matters |
|:-----|:-----------------|:---------------|
| Build the original | SDK revision, board name, configuration, and build log | Preserves a known-good baseline |
| Run on hardware | Photo/video, serial log, panel and touch behavior | Confirms the actual display and input route |
| Add one product element | Change record and measured frame/update behavior | Makes regressions attributable |
| Exercise product load | UI responsiveness with Bluetooth, sensors, storage, and low-power transitions | Finds integration limits absent from a standalone demo |
| Record final limits | Buffer use, memory placement, frame rate, power, and known failure behavior | Turns the example into maintainable engineering evidence |

</div>

## Related Resources

- [Graphics Overview](overview.md) for display selection, framebuffer planning, LVGL integration, and system trade-offs.
- [Display Controller](display-controller.md) for the controller, buffers, and flush path.
- [ePicasso](epicasso-gpu.md), [eZip](ezip.md), and [TurboPixel](turbopixel.md) for SF32 graphics acceleration and compression features.
- [Examples](../../develop/examples/index.md) for the cross-domain SDK example catalogue.
- [SiFli-SDK LVGL Example Index](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/index.html) for the current official list and setup details.

!!! note "Auto-generated content"
    This page was compiled/drafted without an existing source document. Verify technical claims against SiFli's official documentation before relying on them.
