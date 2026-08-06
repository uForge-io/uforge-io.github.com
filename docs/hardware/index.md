---
icon: lucide/cpu
title: Hardware
description: Reuse an SF32 reference baseline or implement a selected device, then prepare the design for production.
---

# Hardware

Use this section after selecting an SF32 device direction and establishing a known-good development-board baseline. The Hardware path moves from an optional reusable reference baseline through implementation guidance and release assets to the final production-readiness review.

## Choose a Starting Point

<div align="center"><em>Hardware Paths</em></div>

<div align="center" markdown>

| Your task | Start here | Outcome |
|:----------|:-----------|:--------|
| Reuse a validated hardware and software baseline | [Reference Designs](reference-designs/reference-designs.md) | A reproducible starting point, its validation focus, and its reuse boundaries. |
| Design a chip-down board or module carrier | [Find the matching guide](#find-a-guide) | The matching chip or module implementation guidance and available checklist. |
| Define an M2-compatible module interface | [M2 Modules](m2-modules/interface-standards-overview.md) | The M2 convention, naming rules, and interface-definition status. |
| Prepare CAD and BOM assets | [CAD & Components](cad-components/components-and-cad-libraries.md) | Official EDA libraries, AVL resources, and the checks needed for the selected part. |
| Release a design package | [Design for Production](design-for-production.md) | The production-readiness review, retained evidence, and manufacturing handoff. |

</div>

## Find a Guide { #find-a-guide }

Choose the chip or module at the center of your design, then open the matching implementation material. Use the product introduction first if you still need to confirm the package, power baseline, memory tier, or integration approach.

### Chip Guides and Checklists

<div align="center" markdown>

| Selected chip family | Hardware design guide | Checklist | Start here when |
|:---------------------|:----------------------|:----------|:----------------|
| SF32LB52x | [Guide](chip-guides/SF32LB52x_hardware_design_guide.md) | [Checklist](chip-guides/SF32LB52x_hardware_design_guide.md#using-the-checklists) | Designing an SF32LB52x chip-down board. |
| SF32LB55x | [Guide](chip-guides/SF32LB55x_hardware_design_guide.md) | [Checklist](chip-guides/SF32LB55x_hardware_design_guide.md#using-the-checklists) | Designing an SF32LB55x chip-down board. |
| SF32LB56x | [Guide](chip-guides/SF32LB56x_hardware_design_guide.md) | [Checklist](chip-guides/SF32LB56x_hardware_design_guide.md#using-the-checklists) | Designing an SF32LB56x chip-down board. |
| SF32LB57x | Guide | — | Designing an SF32LB57x chip-down board. |
| SF32LB58x | [Guide](chip-guides/SF32LB58x_hardware_design_guide.md) | [Checklist](chip-guides/SF32LB58x_hardware_design_guide.md#using-the-checklists) | Designing an SF32LB58x chip-down board. |

</div>

### Module Guides

<div align="center" markdown>

| Selected module | Module guide | Use it for |
|:----------------|:-------------|:-----------|
| SF32LB52-MOD-1 | [Module guide](chip-guides/SF32LB52-MOD-1_hardware_design_guide.md) | Carrier-board power, pin planning, antenna clearance, and production handling. |
| SF32LB56-MOD | [Module guide](chip-guides/SF32LB56-MOD_hardware_design_guide.md) | Carrier-board integration, power, RF placement, interfaces, and validation. |
| SF32LB58-MOD | [Module guide](chip-guides/SF32LB58-MOD_hardware_design_guide.md) | Carrier-board power, pin planning, antenna clearance, and production handling. |

</div>

## Follow the Hardware Path

1. **Reuse a reference baseline when it fits.** Reproduce its stated board and software baseline before adapting it; otherwise, begin directly with the selected device guide.
2. **Implement and review.** Use the matching guide before schematic capture, then apply its checklist during schematic and layout review. Validate the intended software and peripheral path on the closest [development board](../sf32-products/index.md) before freezing hardware.
3. **Use M2 Modules when the carrier interface is in scope.** Apply the [M2 naming rules](m2-modules/M2%20Interface%20Naming%20Rules.md) and confirm the [interface definition](m2-modules/M2-interface-definition.md) before committing to the module interface.
4. **Verify CAD and component choices.** Use [CAD & Components](cad-components/components-and-cad-libraries.md) to cross-check the symbol, footprint, package drawing, AVL, and critical component assumptions for the exact part.
5. **Close the release gate.** Move to [Design for Production](design-for-production.md) with the design evidence, approved deviations, remaining risks, and manufacturing-test assumptions.

## Stay Connected to the Platform Path

If the part, module, or board direction is still uncertain, return to [SF32 Products](../sf32-products/index.md). For a repeatable toolchain, flash, and serial-log baseline, use [Getting Started](../getting-started/index.md). Continue to [Develop](../develop/index.md) for software implementation guidance that must be validated alongside the hardware.

!!! note "Auto-generated content"
    This page was compiled/drafted without an existing source document. Verify technical claims against SiFli's official documentation before relying on them.
