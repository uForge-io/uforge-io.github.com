---
icon: lucide/code
tags:
    - Develop
    - Rust
---

# Rust

OpenSiFli has Rust work in [OpenSiFli/sifli-rs](https://github.com/OpenSiFli/sifli-rs), including HAL, PAC, flash-table crates, examples, and flash/debug notes.

The repository describes the project as work-in-progress and not ready for production use. Treat Rust on SF32 as an exploration path unless your team is ready to work close to the hardware and contribute fixes upstream.

## Crates Mentioned by OpenSiFli

<div align="center"><em>Table: Crates Mentioned by OpenSiFli</em></div>

<div align="center" markdown>

| Crate | Purpose |
|:------|:--------|
| `sifli-hal` | Hardware abstraction layer. |
| `sifli-pac` | Peripheral access crate. |
| `sifli-flash-table` | Flash table support. |

</div>

## When Rust Makes Sense

Use Rust if you want:

- Embedded Rust experiments.
- Strong typing around low-level firmware code.
- A future path toward `embedded-hal` style drivers.
- To contribute to the SF32 Rust ecosystem.

Use SiFli-SDK for production firmware today.

## Practical Evaluation Flow

1. Read the repository README and support-status tables.
2. Confirm the target chip and peripheral are listed.
3. Build an unmodified example.
4. Flash using the documented flash/debug guide.
5. Verify serial output or debugger connection.
6. Only then port product logic.

## Risk Checklist

- Does the crate support the exact chip?
- Does the HAL cover the needed peripheral?
- Is flash layout compatible with the board?
- Is the debugging flow documented for your probe/tool?
- Can the same board be recovered with SiFli-SDK or `sftool`?
- Is the team comfortable contributing fixes?

## Good Fit / Poor Fit

<div align="center"><em>Table: Good Fit / Poor Fit</em></div>

<div align="center" markdown>

| Good fit | Poor fit |
|:---------|:---------|
| Experiments and driver exploration. | Production schedule requiring vendor support. |
| Teams already using embedded Rust. | Products needing full Bluetooth/display/audio stacks today. |
| Contributing to HAL/PAC maturity. | One-off prototypes where Arduino or SDK examples are faster. |

</div>

## SiFli Team Should Add

- Supported chip/peripheral matrix.
- Known-good board and flashing workflow.
- Example status table.
- Debug probe and `sftool` guidance.
- Clear production-readiness statement.
- Migration notes between Rust examples and SiFli-SDK recovery images.

!!! note "Auto-generated content"
    This page was compiled/drafted without an existing source document. Verify technical claims against SiFli's official documentation before relying on them.
