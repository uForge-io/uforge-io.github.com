---
icon: lucide/waypoints
description: "Reference-design journeys for μForge: compare reproducible hardware and software validation paths, then follow the one closest to your product."
tags:
    - Hardware
    - Reference design
---

# Reference Designs

Reference designs turn the μForge product-planning path into a repeatable, evidence-based implementation journey. Each one is a reusable hardware and software baseline: it identifies the starting hardware, software baseline, available design material, bring-up evidence, and reuse limits. It is not interchangeable with a released schematic, BOM, or production qualification package.

Use [Plan an SF32 Product](product-planning.md) to form the initial shortlist, then choose the closest journey below to organize board validation and product-risk reduction.

## Reference Designs and Projects

Use a reference design to answer, **“What reusable technical baseline can I start from?”** Use a [Project](../projects/index.md) to answer, **“How do I carry a specific product from that baseline through integration and release decisions?”**

<div align="center"><em>Table: Reference Design and Project Boundary</em></div>

<div align="center" markdown>

| Item | Reference design | Project |
|:-----|:-----------------|:--------|
| Primary role | A reusable technical baseline. | A complete product-grade delivery path. |
| Core evidence | Hardware/software baseline, design files or their availability, bring-up results, and reuse limits. | Product decisions, dependencies, adaptation stages, validation gates, and release evidence. |
| Reuse expectation | A reader may adopt and adapt the baseline for multiple products. | A reader follows one product outcome, then makes controlled product-specific changes. |
| Relationship | Links to projects that adopt it. | Links back to the reference design it starts from, when applicable. |

</div>

## Available Journeys

<div align="center"><em>Table: Reference-Design Journeys</em></div>

<div align="center" markdown>

| Journey | Product focus | Hardware baseline | Software baseline | Validation emphasis |
|:--------|:--------------|:------------------|:------------------|:--------------------|
| [Connected Wearable](reference-design-journey.md) | Compact battery-powered product with a display, BLE, and sensor input. | SF32LB52-DevKit-LCD or the closest suitable board, followed by a custom chip or module design. | SiFli-SDK `hello_world` and product-relevant examples. | Display, Bluetooth, sensor behavior, sleep/wake, recovery, and production-design evidence. |

</div>

## How to Use a Journey

1. Confirm that the journey's product focus and selected hardware fit your design constraints.
2. Reproduce its software baseline on the stated board before adapting it.
3. Keep the exact board, SDK version, example, build/flash command, and serial log with the project record.
4. Add product-specific validation for every changed display, memory device, battery path, RF design, enclosure, or interface.
5. Hand the results into [Design for Production](design-for-production.md), including the selected guide, checklist, AVL decisions, recovery approach, and remaining risks.

## Adding a New Journey

Add a journey only when it can provide a complete, reproducible path rather than a collection of aspirational links. Every journey should state its intended product, reader, supported hardware and software versions, prerequisites, source repository, milestones, validation criteria, measurements, and product-adaptation handoff.

For project-focused, end-to-end builds that go beyond a reusable reference path, use [Projects](../projects/index.md). A project should cross-link back to the relevant reference design rather than duplicate its hardware baseline, design files, or production material.

!!! note "Auto-generated content"
    This page was compiled/drafted without an existing source document. Verify technical claims against SiFli's official documentation before relying on them.
