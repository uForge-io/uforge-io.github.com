---
icon: lucide/cpu
title: "Hardware Overview"
description: "Start here to explore SF32 hardware, plan a product, choose a chip, module, or development board, reuse a reference design, and prepare a production design."
tags:
    - Hardware
    - Overview
---

# Hardware Overview

The Hardware section helps you move from a product idea to an implementable SF32 design. Use it to understand the SF32 family, make and verify a hardware choice, find a reusable baseline, and reach the design material needed for production.

## Choose Your Starting Point

<div align="center"><em>Hardware Reader Paths</em></div>

<div align="center" markdown>

| Your task | Start here | What you can expect |
|:----------|:-----------|:--------------------|
| Explore the SF32 family | [Understand SF32](chips/SF32_family.md) | A family-level comparison and the part-number rules needed to interpret an orderable device. |
| Turn a concept into a plan | [Plan a Product](product-planning.md) | A staged path from requirements and device direction through board validation and production preparation. |
| Select a chip, module, or board | [Choose Hardware](choose-hardware.md) | Selection factors, an interactive shortlist tool, and product introductions for the available hardware. |
| Reuse a technical baseline | [Reference Designs](reference-designs.md) | Reproducible hardware and software starting points, their validation focus, and their reuse boundaries. |
| Release a board design | [Design for Production](design-for-production.md) | Design guides, checklists, interface definitions, approved components, and official EDA libraries. |

</div>

## What This Section Covers

Start with the [SF32 Family Overview](chips/SF32_family.md) when you need to understand the available families and the broad capability differences between them. The [naming rules](chips/SF32_namingrule.md) help decode a complete part number once you have narrowed the family and package.

Use [Choose Hardware](choose-hardware.md) and the [SF32 Product Selector](product-selector.md) when requirements such as power architecture, package, display, audio, memory, GPIO, connectivity, or specialist hardware determine the choice. The selector establishes a shortlist; the exact part number, package, electrical limits, and board-level routing must still be confirmed against the relevant SiFli documentation.

Once a direction is selected, continue through the [reference designs](reference-designs.md) and [production path](design-for-production.md). This is where the site connects a device choice to reference hardware, design guidance, CAD libraries, BOM decisions, review checklists, and bring-up evidence.

## Browse Hardware Directly

Already know the kind of hardware you need? Go straight to the relevant catalogue:

- [Chips](chips/SF32_family.md) for device-family and part-selection information.
- [Modules](modules/SF32LB52-MOD-1.md) for carrier-board planning around ready-made RF and core hardware.
- [Development Boards](devkits/SF32LB52-DevKit-LCD.md) for supported hardware used to validate software and peripherals.

Hardware documentation defines the physical product path. For SDK setup, examples, toolchains, and software-platform support, continue to [Develop](../develop/overview.md).

!!! note "Auto-generated content"
    This page was compiled/drafted without an existing source document. Verify technical claims against SiFli's official documentation before relying on them.
