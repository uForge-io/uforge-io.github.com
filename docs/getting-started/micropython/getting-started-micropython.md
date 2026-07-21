---
icon: lucide/braces
description: "MicroPython is not yet a verified SF32 getting-started path; use SiFli-SDK for a reproducible first run and follow the MicroPython status page for readiness."
tags:
    - Getting started
    - MicroPython
---

# MicroPython

MicroPython is not yet a verified getting-started path for SF32. No official board-specific firmware image, flash procedure, or REPL configuration is currently documented in the checked SiFli and OpenSiFli sources.

Use [SiFli-SDK](../sifli/getting-started-sifli-sdk.md) to establish a reproducible board, cable, serial-port, and flash baseline. Do not follow generic MicroPython installation instructions or use an image intended for a different MCU or board.

The [MicroPython Status](../../develop/platforms/micropython/status.md) page tracks the exact public artifacts and acceptance criteria required before this page can become a tutorial.

!!! warning "No verified MicroPython tutorial yet"
    A usable SF32 MicroPython guide needs an exact board-and-memory image, flash and recovery commands, REPL port and baud rate, filesystem behavior, and an honest peripheral-support matrix. Until those artifacts exist, this page intentionally has no installation steps.

## What SiFli Should Publish

- Board-specific firmware images with chip, flash, PSRAM, and board-revision compatibility.
- Tested flash, erase, and recovery commands for Windows, macOS, and Linux.
- REPL port, baud rate, expected banner, and `mpremote` or equivalent workflow.
- A maintained `machine` API and peripheral-support matrix, including display, Bluetooth, storage, USB, and low-power limits.

!!! note "Auto-generated content"
    This page was compiled/drafted without an existing source document. Verify technical claims against SiFli's official documentation before relying on them.
