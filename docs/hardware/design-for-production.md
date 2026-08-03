---
icon: lucide/clipboard-check
description: "Production-design entry point for SF32 hardware: chip and module design guides, checklists, interface definitions, approved components, and EDA libraries."
tags:
    - Hardware
    - Production
---

# Design for Production

Use this path after selecting a chip or module and before releasing a schematic, PCB layout, BOM, or manufacturing package. It collects the implementation references that reduce first-pass bring-up and qualification risk: device-specific hardware design guides, checklists, module interface definitions, approved components, and EDA libraries.

## Recommended Production Sequence

<div align="center"><em>Table: Production Design Sequence</em></div>

<div align="center" markdown>

| Stage | Use | Evidence to retain |
|:------|:----|:-------------------|
| Architecture | Product introduction and interface requirements | Chosen part, package, memory, display, audio, storage, and power assumptions. |
| Schematic and layout | Chip or module hardware design guide | Reviewed power, clock, reset, RF, storage, display, and interface implementation. |
| BOM | Approved Vendor List (AVL) and component datasheets | Qualified or deliberately validated alternates for each critical line item. |
| CAD release | Official EDA libraries plus package drawings | Verified symbol, footprint, pinout, land pattern, and manufacturing outputs. |
| Design review | Hardware design checklist | Recorded resolution for every applicable checklist item and exception. |
| Bring-up | Development board references, SDK examples, and measured tests | Repeatable boot, programming, peripheral, wireless, power, and recovery results. |

</div>

## Use the Right Reference for the Chosen Product

The sidebar groups the documents by implementation task:

- **Hardware Design Guides** provide device-specific schematic, layout, power, interface, and bring-up guidance for chips, plus carrier-board integration guidance for modules. Use the matching checklist where available, and consult the module introduction first to confirm a module fits the product architecture.
- **M2 Modules** contain the μForge M2 naming rules and the draft pin-level interface definition. The interface definition is a proposal; validate it before a production commitment.
- **CAD & Components** contains SiFli's AVL and official EDA libraries. Neither replaces final verification against the exact part, package drawing, and selected design guide.

## A Production Reference Is Not a Substitute for Validation

Design guides and qualified-component lists reduce risk, but they do not prove a finished product. Validate the final PCB revision, firmware image, enclosure, battery, display, storage device, RF behavior, operating environment, and manufacturing test flow. Record departures from a guide or checklist as explicit engineering decisions rather than undocumented exceptions.

!!! note "Auto-generated content"
    This page was compiled/drafted without an existing source document. Verify technical claims against SiFli's official documentation before relying on them.
