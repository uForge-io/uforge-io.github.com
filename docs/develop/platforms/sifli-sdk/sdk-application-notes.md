---
icon: lucide/notebook-tabs
title: "SDK Application Notes"
description: "A task-oriented, source-linked reading path through the SiFli-SDK usage guides for SF32 development."
tags:
    - Develop
    - SiFli-SDK
    - Application Notes
---

# SDK Application Notes

This is the organized working layer for the SiFli-SDK usage guides. Rather than make you browse a long mixed catalogue, it directs you to one concrete engineering task and calls out the evidence you should keep with the product.

Each article is a practical reading and integration guide, not a replacement for the SDK manual. Select the target chip family and SDK release in the official [SiFli SDK Usage Guide](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/index.html) before applying a configuration, API, example, or test procedure.

## Read by Task

<div align="center"><em>Table: SDK application-note reading paths</em></div>

<div align="center" markdown>

| Task | Start here when you need to | Official usage-guide topic |
|:-----|:----------------------------|:--------------------------|
| [Sample with GPADC](application-notes/adc-sampling.md) | Establish a general-purpose ADC measurement path. | GPADC |
| [Integrate and Read Sensors](application-notes/sensor-integration.md) | Connect and validate an external sensor. | Sensor integration |
| [Use External Flash](application-notes/external-flash.md) | Store data, assets, or a filesystem in Flash. | Flash usage |
| [Configure the Watchdog](application-notes/watchdog.md) | Validate a watchdog recovery path. | Watchdog |
| [Compress Graphics Assets with EZIP](application-notes/ezip-image-assets.md) | Convert and integrate EZIP image resources. | EZIP tool usage |
| [Configure and Measure Low Power](application-notes/low-power-measurement.md) | Configure a power state and compare measurements. | Low-power development |
| [Capture Logs and Analyze Crashes](application-notes/crash-analysis.md) | Preserve matching logs, crash context, and symbols. | Debug logging, crash analysis |
| [Run SiFli SDK RF Tests](application-notes/rf-performance-tests.md) | Choose signaling, non-signaling, or single-item RF validation. | RF test guide |
| [Run Bluetooth Signaling Tests](application-notes/bluetooth-signalling-tests.md) | Perform protocol-based Bluetooth validation. | Bluetooth signalling test |
| [Run Bluetooth Single-Item RF Tests](application-notes/bluetooth-single-tone-tests.md) | Tune one Bluetooth RF operation at a time. | Bluetooth single-item test |

</div>

## How to Use These Articles

1. Start with the page whose title matches the immediate engineering task.
2. Establish the stated project, board, release, configuration, and hardware prerequisites before adapting an example or command.
3. Use the linked SDK source for exact paths, configuration symbols, commands, APIs, and tool revisions.
4. Record the validated board, SDK release, configuration files, test equipment, and observed result in your project evidence.

For cross-platform architectural decisions, use [Firmware Topics](../../firmware-topics/index.md). For supported example baselines across SDK and community paths, use [Examples](../../examples/index.md).

!!! note "Auto-generated content"
    This page was compiled/drafted without an existing source document. Verify technical claims against SiFli's official documentation before relying on them.
