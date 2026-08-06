---
icon: lucide/rocket
title: "Getting Started Overview"
description: "Choosing your first SF32 software path — SiFli-SDK, CodeKit, Zephyr, Arduino, Rust, or MicroPython — with current status and what hardware you'll need."
tags:
    - Getting started
    - SF32
---

# Getting Started Overview { #getting-started }

SF32 devices support several software paths. SiFli-SDK and CodeKit are the official first-run paths today. OpenSiFli also has active downstream Zephyr, beta ArduinoCore-zephyr, and work-in-progress Rust support for SF32LB52. MicroPython still needs official firmware images and board-specific instructions before it can become a verified tutorial.

For the reference development workflow and the current scope of each development path, consult [Develop Overview](../develop/index.md). Use the table below only to choose where to begin; each platform page is the canonical reference for its supported boards and limits.

## Choose Your Path

<div align="center"><em>Table: Choose Your Path</em></div>

<div align="center" markdown>

| Path | Current status | Start here |
|:-----|:---------------|:-----------|
| **SiFli-SDK** | Official SiFli path for reference SF32 development, RT-Thread, Bluetooth, graphics, audio, low power, and board bring-up. | [SiFli-SDK](sifli/getting-started-sifli-sdk.md) |
| **SiFli CodeKit** | Official SiFli VS Code workflow for SDK setup, project creation, build, flash, and serial monitor. | [SiFli CodeKit](sifli/getting-started-sifli-codekit.md) |
| **Zephyr** | OpenSiFli downstream Zephyr support exists for `sf32lb52_devkit_lcd`, with SiFli HAL, board files, drivers, and sample overlays. | [Zephyr Downstream](zephyr/getting-started-zephyr-upstream.md) |
| **Arduino** | OpenSiFli beta ArduinoCore-zephyr package exists for the SF32LB52 DevKit LCD. | [Arduino](arduino/getting-started-arduino.md) |
| **Rust** | OpenSiFli `sifli-rs` provides a work-in-progress Rust evaluation path; not production-ready. | [Rust](rust/getting-started-rust.md) |
| **MicroPython** | Needs official firmware images, flash commands, REPL settings, and supported API details. | [MicroPython](micropython/getting-started-micropython.md) |

</div>

## What You Need

For any path, prepare the same basic hardware setup:

- An SF32 development board, such as an SF32LB52-DevKit-LCD-class board.
- A USB Type-C data cable connected to the board's USB-to-UART port.
- A computer running Windows, macOS, or Linux.
- A serial terminal so you can see boot logs and example output.

!!! tip "Use a data cable"
    Charge-only USB cables are a common cause of first-run failures. If the board powers up but no serial port appears, try a known-good data cable and a direct USB port.

## Recommended First Run

If this is your first SF32 board, start with [SiFli-SDK](sifli/getting-started-sifli-sdk.md). It is the reference software stack for SF32 and the most reliable baseline for confirming that your board, cable, serial port, flash flow, and toolchain all work.

After `hello_world` runs successfully, switch to another framework that supports your exact hardware. That gives you a known-good recovery path if later experiments fail.

## What Success Looks Like

By the end of a getting-started guide, you should have:

- Built or loaded a first example.
- Flashed it to the board.
- Opened the serial console.
- Seen predictable output, such as a boot log, `hello_world`, a shell prompt, or REPL banner.
- Recorded the board name, serial port, and flash command that worked.

Keep those details with your project notes. They are the fastest way back to a working setup when you start modifying examples.

## Continue with Tutorials

Once you can repeat the first-run success criteria, continue to the [Tutorials Overview](tutorials/overview.md). The tutorials are the next stage of this onboarding path: begin with one peripheral, then combine subsystems, and finally practice the validation work needed for a product.

## When to Move to Develop

Getting Started ends when you can reproduce a known-good first run. [Develop](../develop/index.md) is the ongoing engineering reference for platform maturity, tools, flash/debug workflows, firmware architecture, and product integration. In particular, use the [CodeKit tool reference](../develop/tools/codekit.md) after the first run for CodeKit's role in the daily development workflow; keep this page for the first-run path.

## SiFli Documentation Work to Add

To make the full getting-started section complete, SiFli should add:

- A public status matrix for SiFli-SDK, CodeKit, Zephyr, Arduino, and MicroPython by board.
- Exact board names for every supported software path.
- Flash/download commands for Windows, macOS, and Linux.
- Expected serial output for each first example.
- Recovery steps for failed flashes or bad firmware images.
- Known limitations for each framework, especially Bluetooth, display, storage, USB, and low-power behavior.
- Release notes that tie SDK, CodeKit, package, firmware-image, and board-support versions together.
