---
icon: lucide/rss
description: "The first μForge.io blog post: our mission, what we've built over the past month, and what's coming next for SF32 documentation."
---

# The First Blog [2026-07-31]

This is the first post on this blog, so it's a good place to say plainly what μForge.io is for.

Engineers evaluating a new microcontroller shouldn't have to piece together the full picture from a datasheet here, a wiki page there, and a forum thread somewhere else. μForge.io exists to close that gap for SiFli's SF32 family of ultra-low-power microcontrollers — Bluetooth-connected, graphics-capable, AIoT-focused silicon for wearables, smart displays, and other battery-powered connected products. We take reference material that's normally scattered across datasheets, wikis, and PDFs, and organize it around how a product actually gets built: pick the part, prove it works, design it in, ship it. See [About](../../about/index.md) for the longer version.

### Why SF32, right now

Two things made SF32 worth building a whole documentation platform around.

The first is architectural creativity. SF32 doesn't just stack a faster CPU and more flash and call it a new generation — it combines a heterogeneous multi-core split (one core built for application logic, one built to sip power running Bluetooth and sensors), an in-house graphics engine, hardware compression, and a dedicated task machine for offloading deterministic peripheral work, all inside a power and cost envelope that stays MCU-class. That's a genuinely different way to assemble a microcontroller platform, not just a spec bump.

The second is how open it actually is. SDK source, hardware application notes, and design guides are published openly — through OpenSiFli's GitHub organization and SiFli's own wiki and docs — in a way a lot of microcontroller vendors don't match. But compared to ecosystems like ESP32 or STM32, SF32 is still not well known outside the teams already using it: genuinely open, but not yet fully exposed. That gap is exactly why documentation like this is useful now, rather than years from now once the ecosystem has caught up on its own.

### What's happened over the past month

We went from an initial concept to a working documentation site, built with [Zensical](https://zensical.org/) — thanks to the team for a static site generator that made this possible. Before writing individual pages, we iterated on the overall site structure many times over, with the goal of organizing it the way an engineer actually thinks through a project rather than the way an org chart or a vendor's own docs happen to be laid out. Once that structure held up, we built out full coverage for the SF32LB52x, SF32LB55x, SF32LB56x, SF32LB57x, and SF32LB58x chip families — introductions, comparison data, and hardware design guides — plus their modules and development boards. We shipped an interactive product selector so you can filter chips and modules by power, memory, display, and interface requirements instead of cross-referencing five datasheets by hand. We also built out the Getting Started and Tutorials path, the Learn section's architecture deep dives (STAR-MC1, PSRAM and memory types, PTM), and production-readiness guidance for taking a design from schematic to shipped hardware.

### What's next

The immediate focus is coverage and accuracy: expanding hardware design guides and checklists, and continuing to verify content against SiFli's own official documentation as it's updated. Past that, expect more reference designs, more worked examples in Develop and Tutorials, and continued refinement of the product selector as real-world sourcing questions come in.

If you spot something wrong or missing, [tell us](../../about/contact.md) — that feedback is exactly what keeps this useful.
