---
icon: lucide/cable
description: "Understand μForge M2 module-interface conventions: use the naming rules for stable terminology and treat the pin-level interface definition as a draft to validate before carrier-board commitment."
tags:
    - Hardware
    - Module
    - Interface
---

# Module Interface Standards

This group defines the conventions used to describe μForge module interfaces. Start here before committing a carrier-board connector, pin map, or compatibility claim. It contains two different kinds of documents: a naming convention that establishes common language, and a pin-level proposal that is useful for planning but must be validated for the selected module and product.

## Use the Documents in the Right Order

<div align="center"><em>Table: Module Interface Documents</em></div>

<div align="center" markdown>

| Document | Status and purpose | Use it when |
|:---------|:-------------------|:------------|
| [M2 Interface Naming Rules](M2%20Interface%20Naming%20Rules.md) | Naming convention for M2 interface families and profiles. | Naming a module, connector, carrier board, or interface profile in documentation and design files. |
| [M2 Interface Definition](M2-interface-definition.md) | Draft pin-level definition and signal-allocation proposal. | Exploring a proposed M2 carrier interface or reviewing signal sharing before committing to a connector. |

</div>

## What Is Stable and What Must Be Verified

The naming rules are the stable vocabulary for communicating interface intent. Apply them consistently in module descriptions, schematics, BOM notes, and product documentation.

The pin-level definition is not a promise that every μForge module or SF32 package supports every assigned signal, interface, or simultaneous-use combination. Before a design commitment, verify all of the following against the exact selected module, chip, package, and hardware design guide:

- connector mechanical drawing, keying, pin numbering, and assembly constraints;
- power rails, voltage domains, current capability, and sequencing;
- interface availability, pin multiplexing, and any mutually exclusive functions;
- signal integrity, impedance, length matching, ESD, and RF keep-out requirements;
- debug, boot, recovery, and production-test access; and
- the carrier board's display, camera, audio, storage, and wireless companion requirements.

## Carrier-Board Decision Path

1. Pick the module and read its introduction and hardware design guide.
2. Use the [M2 Interface Naming Rules](M2%20Interface%20Naming%20Rules.md) to make the intended profile unambiguous.
3. Use the [M2 Interface Definition](M2-interface-definition.md) to identify candidate signals and sharing conflicts.
4. Confirm every used contact in the module-specific documentation and the applicable SiFli source documentation.
5. Capture confirmed exceptions and unresolved items in the schematic review before layout starts.

For a complete carrier-board review, continue with [Design for Production](../design-for-production.md). For module-specific implementation requirements, use the matching module guide in the **Hardware Design Guides** group.

!!! note "Auto-generated content"
    This page was compiled/drafted without an existing source document. Verify technical claims against SiFli's official documentation before relying on them.
