---
icon: lucide/lightbulb
title: "Learn Overview"
description: "Find the SF32 architecture and subsystem guidance you need: graphics, Bluetooth, AI, audio, low power, and the underlying processor architecture."
tags:
    - Learn
---

# Overview { #learn-overview }

Use **Learn** to make subsystem and architecture decisions before they become hard to reverse in firmware or hardware. These pages explain how SF32 building blocks fit together and what to validate when graphics, wireless, audio, AI, memory, and power must coexist in one product.

Use [Getting Started](../getting-started/getting-started-overview.md) for the first successful board run, [Tutorials](../tutorials/overview.md) for guided exercises, [Develop](../develop/overview.md) for software workflows and examples, and the [SF32 Family](../hardware/chips/SF32_family.md) for part selection and production design.

## Start with Your Design Question

<div align="center"><em>Table: Find the Right Learning Path</em></div>

<div align="center" markdown>

| If you need to… | Start here | Then explore |
|:----------------|:-----------|:-------------|
| Build a display UI or choose an asset/framebuffer strategy | [Graphics Overview](graphics/overview.md) | ePicasso, eZip, TurboPixel, and Display Controller guidance. |
| Connect a phone, accessory, or audio device | [Bluetooth Overview](bluetooth/overview.md) | Bluetooth Processor Architecture for the controller/application split. |
| Add on-device inference | [AI Overview](ai/overview.md) | AI Accelerator details, then power and memory validation. |
| Capture, play, or process sound | [Audio Overview](audio/overview.md) | Bluetooth guidance if the product also streams or carries calls wirelessly. |
| Meet a battery-life target | [Low-Power Overview](low-power/overview.md) | The Bluetooth, graphics, audio, and AI pages for each subsystem's power behavior. |
| Understand the processor and hardware-offload model | [Architecture Overview](architecture/overview.md) | STAR-MC1 and PTM detail when they are relevant to the selected device. |

</div>

## Use the Pages Together

Most real products cross several groups. A wearable with a display, BLE, microphone, and battery budget should not treat those as isolated features: display refresh affects memory traffic and active time; Bluetooth scheduling affects wake frequency; audio and AI affect buffers and latency; each decision changes the power budget.

Start with the page that matches the dominant product requirement, then follow its cross-links to the subsystems that share memory, processor time, interfaces, or energy. Validate the chosen combination on the intended hardware with the workflows in Develop and the measurements called out in the relevant Learn pages.

!!! note "Auto-generated content"
    This page was compiled/drafted without an existing source document. Verify technical claims against SiFli's official documentation before relying on them.
