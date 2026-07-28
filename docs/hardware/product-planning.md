---
icon: lucide/route
description: "End-to-end SF32 product-planning path: select a device and integration level, validate software on a board, then prepare the design for production."
tags:
    - Hardware
    - Product planning
---

# Plan an SF32 Product

This path connects the decisions that turn an SF32 concept into a buildable product. Follow it in order when the chip, module, development board, software stack, and production plan have not yet been fixed.

## Product Planning Path

<div align="center"><em>Table: SF32 Product Planning Path</em></div>

<div align="center" markdown>

| Stage | Key decision | Start here | Exit criterion |
|:------|:-------------|:-----------|:---------------|
| 1. Define requirements | Wireless role, display, audio, AI, storage, power, package area, and target lifecycle. | [SF32 Family](chips/SF32_family.md) | A ranked shortlist with explicit must-have interfaces and constraints. |
| 2. Select integration | Custom chip PCB, module plus carrier, or a development board for early validation. | [Choose Hardware](choose-hardware.md) | A selected device direction and the closest available board or module. |
| 3. Prove the software baseline | Toolchain, flash flow, serial output, and one known-good example on the selected or closest board. | [Getting Started](../getting-started/getting-started-overview.md) | A repeatable build, flash, and console log. |
| 4. Validate product risks | Display, Bluetooth, audio, AI, storage, and power behavior that is specific to the product. | [Tutorials](../tutorials/overview.md), [Learn](../learn/overview.md), and [Develop](../develop/overview.md) | Measured evidence for the subsystems that drive cost, power, or schedule risk. |
| 5. Freeze the implementation plan | Schematic, layout, memory/partition plan, BOM, test approach, update/recovery behavior, and manufacturing assumptions. | [Design for Production](design-for-production.md) | Reviewed design package and an explicit list of remaining validation items. |

</div>

## Do Not Skip the Board Validation Loop

A family comparison and a successful compile are not enough to select a production device. Validate the closest board before freezing hardware, then record the board name, SDK version, example base, measured behavior, and differences from the intended product. If the final product uses a new display, storage part, battery path, antenna, or module carrier, treat each as a separate validation item.

For a complete worked path, choose the closest [Reference Design](reference-designs.md) after the initial hardware and software baseline is established.

## Handoff Checklist

- [ ] The selected part or module meets the product's interface, memory, package, and power constraints.
- [ ] A supported board or deliberate custom-hardware validation plan exists.
- [ ] The software path and its maturity are accepted by the product team.
- [ ] Recovery, OTA/DFU, logging, and factory-programming needs are defined before partition and BOM decisions are frozen.
- [ ] The correct hardware design guide, checklist, AVL, and EDA library have been identified.

!!! note "Auto-generated content"
    This page was compiled/drafted without an existing source document. Verify technical claims against SiFli's official documentation before relying on them.
