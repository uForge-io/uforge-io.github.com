---
icon: lucide/sliders-horizontal
description: "Interactive tool for shortlisting SF32 chips, modules, and development boards by integration level, power, display, audio, memory, GPIO, and connectivity requirements."
tags:
    - Hardware
    - Selection
hide:
  - toc
---

# SF32 Product Selector

Make a practical first shortlist of SF32 chips, modules, and development boards. Set the requirements your design cannot compromise on, then compare the parts that meet all of them.

!!! note "Terminology"
    For definitions of the abbreviations and interface names used in this tool, see the [Glossary](../about/glossary.md).

!!! info "Reading PDM counts"
    PDM counts interfaces, not microphones: each PDM interface can connect up to two digital microphones.

<div id="uf-product-selector"></div>

<noscript>
This tool needs JavaScript to filter and render the part table. With JavaScript disabled, use the [SF32 Family comparison table](chips/SF32_family.md) instead.
</noscript>

## Build a shortlist

1. Choose an integration level when you already know whether you need a chip, a ready-made module, or a development board.
2. Apply the hard constraints first: supply arrangement, package, display, memory, GPIO count, and required interfaces.
3. Open the product introduction for each promising row to review the package-specific details, reference hardware, and production guidance.

The filters describe minimum requirements. For example, an 8 MB PSRAM selection also keeps parts with more memory, and a minimum audio DAC/ADC/PDM/I2S selection keeps parts that meet or exceed it. For broader integration trade-offs, see [Choose Hardware](choose-hardware.md).

## Read the results correctly

The table only lists parts that meet every selected requirement — anything that misses even one filter is removed from the results rather than shown as a near fit. Loosen a filter to bring excluded parts back.

Feature flags and capacity values summarize the documented configuration for the listed tier. Confirm the target part number, package, electrical limits, and intended interface routing against its own SiFli documentation before freezing a design.

## Coverage

The selector covers the representative package and memory tiers documented on the corresponding product pages, rather than every orderable configuration. If your exact part number is not listed, [contact us](../about/contact.md) and we will help identify the closest documented tier.
