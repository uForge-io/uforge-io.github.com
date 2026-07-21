---
icon: lucide/list-tree
tags:
    - Develop
    - Examples
---

# Examples

Start from examples. SF32 firmware usually comes together faster when you adapt a working board-specific example instead of building every subsystem from scratch.

The best example is not always the smallest example. Choose the one that already includes the hardest part of your product: Bluetooth profile, display panel, audio route, filesystem, OTA, USB, power mode, or AI accelerator.

## Example Areas

<div align="center"><em>Table: Example Areas</em></div>

<div align="center" markdown>

| Area | Start with |
|:-----|:-----------|
| First run | `example/get-started/hello_world/rtt/project` |
| Blink / GPIO | `example/get-started/blink/rtt` or GPIO HAL/device examples. |
| Bluetooth | BLE, BT Classic, LE Audio, throughput, beacon, OTA, and profile examples. |
| Graphics | LVGL demos and display-specific examples. |
| Audio | Playback, record, codec, Opus, MP3, and USB audio where supported. |
| Power | SDK power-management examples and measurement templates. |
| Storage | Filesystem, flash, SD, and partition examples. |
| USB | CherryUSB device and host examples. |
| AI | NNACC HAL and RT-device examples. |

</div>

## How to Choose an Example

Use this order:

1. Match the board.
2. Match the framework.
3. Match the hardest peripheral.
4. Match the middleware.
5. Match the power or memory constraints.

For example, a Bluetooth audio product should start closer to an audio/Bluetooth example than to a clean `hello_world`, even if the latter is easier to understand.

## Adaptation Workflow

1. Build and flash the unmodified example.
2. Save the successful build command, board name, flash command, serial port, and log.
3. Make one product change.
4. Rebuild and retest.
5. Commit or record the change before adding another subsystem.

This workflow is slower for the first hour and much faster after the first hard failure.

## Evidence to Keep

For each example that becomes a product base, record:

- SDK branch or package version.
- Board name or FQBN.
- Required configuration options.
- Required pins and peripherals.
- Expected serial output.
- Known limitations.
- Memory footprint if available.
- Recovery command.

## Example Selection Rule

Choose the example that matches the most constrained part of the product:

- For Bluetooth products, start from the closest profile.
- For display products, start from the display and LVGL path.
- For battery products, start from a power example.
- For OTA products, start from the update flow and partition layout.

Then add the other subsystems one by one.

## SiFli Team Should Add

- A searchable example index.
- Example status by chip/board.
- Expected output for each example.
- Memory and peripheral requirements.
- Links from examples to relevant tools and firmware topics.
- A "recommended base example" table by product type.

!!! note "Auto-generated content"
    This page was compiled/drafted without an existing source document. Verify technical claims against SiFli's official documentation before relying on them.
