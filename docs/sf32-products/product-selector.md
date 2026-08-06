---
icon: lucide/list-checks
description: "Build an SF32 chip, module, or development-board shortlist from product constraints, then verify the exact implementation path."
tags:
    - Hardware
    - Selection
hide:
    - toc
---

# SF32 Product Selector

Build a first shortlist of SF32 chips, modules, and development boards before committing to a schematic. Set the constraints that are expensive to change later—power architecture, package, display, audio, memory, GPIO, connectivity, and the software-validation path—then compare the candidates that remain.

Use the interactive selector for the first pass. It filters the documented options by integration level, power, package, display, audio, memory, GPIO, connectivity, and specialist hardware features, then links each result to its product introduction.

## Product Selector

!!! info "Reading audio and PDM counts"
    PDM counts interfaces, not microphones: each PDM interface can connect up to two digital microphones.

<div id="uf-product-selector"></div>

<noscript>
This tool needs JavaScript to filter and render the part table. With JavaScript disabled, use the [SF32 Family comparison table](family/SF32_family.md) instead.
</noscript>

## Selection Factors

Treat the selector as a way to apply hard gates, not as an automatic recommendation. Start with the first constraint that would force a board or schematic redesign if discovered late, then use the remaining factors to separate the viable candidates.

### Integration Level

Choose the integration level before comparing detailed specifications when your schedule, RF work, or board ownership is already fixed. A chip gives maximum control but makes you responsible for the complete power, RF, clock, layout, and production path. A module moves the module-level integration work into a qualified building block while leaving you to design the carrier board. A development board is the quickest way to prove firmware, peripheral behavior, and system assumptions; it is not automatically the right production hardware.

### Power Supply and Package

Select the supply arrangement and package early. The selector distinguishes a direct Li-ion rail, a 3.3V supply, and support down to 1.8V because these choices change the PMIC or regulator plan, battery operation, level compatibility, and bring-up conditions. Package choice is equally structural: it sets board area, escape-routing difficulty, thermal path, and the usable pin budget. A package with a larger published GPIO maximum is not necessarily enough after reserving pins for power, clocks, debug, display, memory, and mandatory peripherals.

### Memory and GPIO Headroom

Use PSRAM and GPIO filters as minimum thresholds, then inspect the selected tier's memory organization and pin allocation. PSRAM capacity affects graphics buffers, audio buffering, ML models, and application working space, but total capacity alone does not guarantee one contiguous memory pool. GPIO headroom should include production test, debug, interrupts, future sensors, and board-control signals, not just the interfaces in the first prototype.

### Display and Graphics

Filter by the display interface that your panel actually requires, then use the resolution value as a first capacity check. A listed resolution is a total-pixel ceiling, not a guarantee that every aspect ratio, panel timing, frame-buffer layout, or display-controller feature will work unchanged. Confirm the display interface, memory budget, pin routing, panel power sequencing, and software driver path together.

### Audio Interfaces

Use the audio filters to identify whether a part can support the required analog input/output path and digital-audio links, then review sharing with other peripherals and the board-level analog design. PDM counts interfaces rather than microphones: each PDM interface can connect up to two digital microphones.

### Connectivity and Specialist Hardware

Apply the Wi-Fi, camera, AI-accelerator, FreeIO, and PTM filters only when the corresponding capability is a product requirement. External Wi-Fi requires the documented SDIO path as well as board-level power, routing, and software support. Camera and AI requirements need an end-to-end review of interface, memory bandwidth, processing load, and the software stack. FreeIO and PTM are valuable when flexible signal assignment or deterministic peripheral task handling is central to the design; they should not outweigh more basic power, memory, and package constraints.

### Validation Evidence

Before committing, follow the result link to the product introduction and then verify the exact part number, package, electrical limits, reference design, and available design guide or checklist. Prove the intended firmware flow on the closest supported board where possible. The selector is a shortlist tool; the target part's SiFli documentation remains the design authority.

## Choose an Integration Level

<div align="center"><em>Hardware Starting Point</em></div>

<div align="center" markdown>

| Starting point | Choose it when | Next step |
|:---------------|:---------------|:----------|
| Chip | You need the smallest BOM, a custom PCB, or full control over interfaces and power design. | Choose a family, then review its production design guide before schematic work. |
| Module | You want to reduce RF and module-integration work while retaining a custom carrier board. | Check the module introduction, interface definition, and module design guide. |
| Development board | You need to validate software, peripherals, or a product concept quickly. | Start with the closest board, run a verified example, then treat its schematic as a reference—not a production design. |

</div>

## Confirm the Shortlist

1. **Inspect the exact part.** Use the [SF32 Family Overview](family/SF32_family.md), the result's product introduction, and the [naming rules](family/SF32_namingrule.md) to confirm the orderable part number, package, power topology, memory organization, interface assignment, and reference hardware. Do not choose a part from one headline feature alone: confirm that the required display, audio, storage, sensor, Bluetooth, and low-power features can coexist in the selected package and board design.
2. **Prove the software path.** Use [Getting Started](../getting-started/index.md), [Tutorials](../getting-started/tutorials/overview.md), and [Develop](../develop/index.md) on the closest available board before finalizing hardware.
3. **Check production constraints.** Move to [Design for Production](../hardware/design-for-production.md) before freezing the schematic, layout, BOM, or display and storage choices.
