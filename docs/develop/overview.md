---
icon: lucide/code-2
title: "Develop Overview"
description: "Develop section overview: choosing between SiFli-SDK, CodeKit, Zephyr, Arduino, MicroPython, and Rust for SF32 firmware, tools, and firmware-topic guidance."
tags:
    - Develop
    - Software
---

# Develop Overview { #develop }

This section is for firmware developers who have moved past the first `hello_world` run and need to build, flash, debug, update, and ship software on SF32 devices.

Use [Getting Started](../getting-started/overview.md) for the first successful board run. Use [Tutorials](../tutorials/beginner.md) for guided hands-on learning, the [SF32 Family](../hardware/chips/SF32_family.md) to choose chips, modules, and dev kits, and [Learn](../learn/overview.md) for conceptual guides. Use **Develop** when you need the working details: platform maturity, toolchains, board names, flash flows, examples, and firmware architecture.

For the current board-by-platform status, use the canonical [Software Support Matrix](software-support-matrix.md). It is the shared support reference for Getting Started and Develop; platform pages provide the detailed setup and limitations.

## Choose a Development Path

<div align="center"><em>Table: Choose a Development Path</em></div>

<div align="center" markdown>

| Path | Best for | Status |
|:-----|:---------|:-------|
| [SiFli-SDK](platforms/sifli-sdk/overview.md) | Reference SF32 firmware, RT-Thread, Bluetooth, graphics, audio, storage, power, and production board support. | Official SiFli path. |
| [CodeKit](tools/codekit.md) | SiFli-SDK development inside VS Code. | Official SiFli extension. |
| [Zephyr](platforms/zephyr/overview.md) | Zephyr APIs, devicetree, downstream board work, and portable RTOS experiments. | OpenSiFli downstream work exists for SF32LB52 DevKit LCD. |
| [Arduino](platforms/arduino/overview.md) | Sketches and quick tests through Arduino IDE or Arduino CLI. | OpenSiFli beta ArduinoCore-zephyr package exists for SF32LB52 DevKit LCD. |
| [MicroPython](platforms/micropython/status.md) | REPL-driven scripting and quick experiments. | No official SF32 MicroPython flow found yet. |
| [Rust](platforms/rust/overview.md) | Embedded Rust exploration with `sifli-hal` / `sifli-pac`. | Community / work-in-progress. |

</div>

## Recommended Default

Start with **SiFli-SDK** unless you have a clear reason not to. It is the vendor reference path and the best place to validate boards, flash flows, serial output, and hardware features before you evaluate another ecosystem.

Move to another platform when the tradeoff is worth it:

<div align="center"><em>Table: Recommended Default</em></div>

<div align="center" markdown>

| If you need | Consider |
|:-----------|:---------|
| Official SF32 feature coverage and production firmware | SiFli-SDK |
| SiFli-SDK with a guided editor workflow | CodeKit |
| Zephyr devicetree, Kconfig, and RTOS APIs | Zephyr downstream |
| Arduino IDE sketches on SF32LB52 DevKit LCD | ArduinoCore-zephyr beta |
| Interactive Python scripting | Wait for official MicroPython artifacts |
| Embedded Rust experimentation | `sifli-rs`, with production caution |

</div>

## Develop Section Map

<div align="center"><em>Table: Develop Section Map</em></div>

<div align="center" markdown>

| Area | Use it when |
|:-----|:------------|
| [Software Paths](platforms/sifli-sdk/overview.md) | You need framework-specific setup, build, flash, and limitations. |
| [Tools](tools/index.md) | You need flashing, logs, crash analysis, image tooling, RF/audio tools, or factory utilities. |
| [Firmware Topics](firmware-topics/index.md) | You need boot layout, partitions, OTA, USB, power, logging, or crash-analysis guidance. |
| [Examples](examples/index.md) | You need a known SDK or Zephyr sample to start from. |

</div>

## Recommended Progression

1. Validate the board with [SiFli-SDK](../getting-started/sifli/getting-started-sifli-sdk.md).
2. Decide whether the product should stay on SiFli-SDK, move to Zephyr, use Arduino for prototyping, or wait for a more mature path.
3. Learn the flash and monitor tools before changing application code.
4. Understand the partition table before touching OTA, filesystem, or bootloader behavior.
5. Start product features from a close example, not from a blank project.
6. Record the exact board name, SDK/package version, flash command, and serial port that worked.

## What Good Looks Like

Before a platform path is ready for a product decision, you should be able to answer:

- Which exact board name or FQBN is used?
- Which release, branch, package version, or commit was tested?
- Which command builds the firmware?
- Which command flashes the firmware?
- Which serial port and baud rate show logs?
- Which examples are known to run on the target board?
- Which peripherals are supported, experimental, or missing?
- How do you recover a board after a failed flash?

If any answer is missing, treat that platform as exploratory until the gap is closed.

## Source Policy

Concrete commands, package names, board names, baud rates, and runner details in this section come from public SiFli/OpenSiFli materials where available. If a page recommends work that SiFli still needs to finish, it says so in a **SiFli Team Should Add** section or in Documentation Assumptions and Open Items.

## Accuracy Notes

This section avoids presenting undocumented work as finished product support. Where a path is beta, downstream-only, or not found, the page says so directly. The companion page Documentation Assumptions and Open Items records items that need SiFli confirmation before they should be treated as official user guidance.

!!! note "Auto-generated content"
    This page was compiled/drafted without an existing source document. Verify technical claims against SiFli's official documentation before relying on them.
