---
icon: lucide/list-checks
description: "Choose an SF32 chip, module, and development board by matching product needs to capability, integration risk, and software validation path."
tags:
    - Hardware
    - Selection
---

# Choose Hardware

Use this path to narrow an SF32 product concept to a chip, module, and development board before committing to a schematic. Start with the system constraints that are expensive to change later: wireless role, display and audio requirements, memory and storage, power target, package area, and intended software path.

## Start with the SF32 Family

The [SF32 Family Overview](chips/SF32_family.md) is the starting point for part selection. Compare the families against the peripherals, display interfaces, wireless features, memory options, package, and power profile your product actually needs. Use the individual chip introductions for family-specific details and the [naming rules](chips/SF32_namingrule.md) when decoding a complete orderable part number.

Do not select a part from one headline feature alone. Confirm that the required display, audio, storage, sensor, Bluetooth, and low-power features can coexist in the selected package and board design.

## Decide How Much Hardware You Will Design

<div align="center"><em>Table: Hardware Starting Point</em></div>

<div align="center" markdown>

| Starting point | Choose it when | Next step |
|:---------------|:---------------|:----------|
| Chip | You need the smallest BOM, a custom PCB, or full control over interfaces and power design. | Choose a family, then review its production design guide before schematic work. |
| Module | You want to reduce RF and module-integration work while retaining a custom carrier board. | Check the module introduction, interface definition, and module design guide. |
| Development board | You need to validate software, peripherals, or a product concept quickly. | Start with the closest board, run a verified example, then treat its schematic as a reference—not a production design. |

</div>

## Selection Sequence

1. **Choose the chip family.** Use the family comparison to make an initial shortlist, then inspect the selected chip introduction.
2. **Choose the integration level.** Select a chip for a fully custom design, a module for faster carrier-board development, or a development board for early software and peripheral validation.
3. **Prove the software path.** Use [Getting Started](../getting-started/getting-started-overview.md), [Tutorials](../tutorials/overview.md), and [Develop](../develop/overview.md) on the closest available board before finalizing hardware.
4. **Check production constraints.** Move to [Design for Production](design-for-production.md) before freezing the schematic, layout, BOM, or display and storage choices.

## Browse by Product Type

- **Chips** — family comparison, naming rules, and introductions for SF32LB52, SF32LB55, SF32LB56, SF32LB57, and SF32LB58.
- **Modules** — SF32LB52-MOD-1, SF32LB56-MOD, and SF32LB58-MOD introductions for carrier-board planning.
- **Development Boards** — reference boards for SF32LB52, SF32LB56, and SF32LB58 software validation and hardware exploration.

!!! note "Auto-generated content"
    This page was compiled/drafted without an existing source document. Verify technical claims against SiFli's official documentation before relying on them.
