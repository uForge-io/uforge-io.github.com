---
icon: lucide/table-properties
description: "Canonical SF32 software-support matrix: compare board and SoC coverage for SiFli-SDK, CodeKit, Zephyr, Arduino, Rust, and MicroPython before choosing a development path."
tags:
    - Develop
    - Software
    - Support matrix
---

# Software Support Matrix

Use this as the single starting point for deciding which software path has public, documented support for a specific SF32 board or SoC. It summarizes the current documentation rather than promising compatibility. The linked platform pages remain the authority for setup, limitations, and version-specific details.

**Default recommendation:** begin with SiFli-SDK on the selected or closest supported board. Treat every other path as an explicit trade-off that must be validated for the exact board, package, SDK or package release, and required feature set.

## Platform Status

<div align="center"><em>Table: Software Platform Status</em></div>

<div align="center" markdown>

| Platform | Maturity in μForge documentation | Recommended use | Detail page |
|:---------|:---------------------------------|:----------------|:------------|
| SiFli-SDK | Official SiFli reference path. | Default baseline for feature validation and production-oriented firmware work. | [SiFli-SDK](platforms/sifli-sdk/overview.md) |
| SiFli CodeKit | Official SiFli VS Code workflow over SiFli-SDK. | Guided editor workflow; keep the underlying SDK command path reproducible. | [CodeKit](tools/codekit.md) |
| Zephyr downstream | OpenSiFli downstream support documented for SF32LB52-DevKit-LCD. | Zephyr APIs, devicetree, Kconfig, and portable-RTOS experiments. | [Zephyr](platforms/zephyr/overview.md) |
| ArduinoCore-zephyr | OpenSiFli beta package documented for SF32LB52-DevKit-LCD. | Sketch-based experiments, demonstrations, and early prototypes. | [Arduino](platforms/arduino/overview.md) |
| Rust / `sifli-rs` | Community work in progress. | Evaluation and experimentation only until an exact target configuration is validated. | [Rust](platforms/rust/overview.md) |
| MicroPython | No verified official SF32 workflow documented. | Do not select as a product baseline yet. | [MicroPython status](platforms/micropython/status.md) |

</div>

## Board and SoC Coverage

<div align="center"><em>Table: Publicly Documented Coverage</em></div>

<div align="center" markdown>

| Board or SoC | SiFli-SDK / CodeKit | Zephyr downstream | ArduinoCore-zephyr | Rust | MicroPython | Recommended first example |
|:-------------|:--------------------|:------------------|:-------------------|:-----|:------------|:--------------------------|
| SF32LB52-DevKit-LCD (`sf32lb52_devkit_lcd`, SF32LB525UC6) | Use as the official reference baseline; confirm the SDK board name and release for the chosen project. | Public downstream board target documented. | Public beta FQBN documented. | Evaluate only against the exact `sifli-rs` target and revision. | No verified flow. | SiFli-SDK `hello_world`; then the platform's board-specific first-run example. |
| Other SF32LB52 boards and modules | Verify exact SDK board support before use; CodeKit follows the SDK board configuration. | No public μForge-verified target recorded. | No public μForge-verified target recorded. | No public μForge-verified target recorded. | No verified flow. | SiFli-SDK example that matches the board or closest verified hardware. |
| SF32LB55x / SF32LB56x / SF32LB57x / SF32LB58x | Use SiFli-SDK as the evaluation baseline and confirm the exact board or custom-hardware configuration. | No public μForge-verified target recorded. | No public μForge-verified target recorded. | No public μForge-verified target recorded. | No verified flow. | SiFli-SDK example for the exact board, or a documented closest-board baseline. |

</div>

“No public μForge-verified target recorded” is not proof that no upstream work exists. It means that this documentation does not yet have a reproducible board target, tested version, first example, and stated limits for that combination.

## Before You Rely on a Cell

Record the following evidence for the exact combination you intend to ship or evaluate:

1. Board or custom-hardware configuration, including the selected SF32 part and module where applicable.
2. SDK branch, extension/package version, downstream commit, or Rust revision.
3. A known-good build, flash, and serial-monitor command.
4. The first example that passes, plus the features that have actually been tested.
5. Recovery procedure and the known limits for display, Bluetooth, storage, audio, USB, and low-power behavior.

Start with [Getting Started](../getting-started/index.md) for the first successful run, then use [Develop](index.md) and the platform detail page to progress toward product work.

!!! note "Auto-generated content"
    This page was compiled/drafted without an existing source document. Verify technical claims against SiFli's official documentation before relying on them.
