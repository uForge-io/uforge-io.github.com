---
icon: lucide/braces
tags:
    - Getting started
    - MicroPython
---

# MicroPython

MicroPython would be valuable for SF32 hardware exploration, quick scripts, demos, and REPL-driven peripheral checks. This page should remain a readiness checklist until SiFli publishes official firmware images or build instructions for specific SF32 boards.

!!! warning "Official SiFli details needed"
    This article is a readiness checklist, not a verified MicroPython flashing guide. Replace it with a step-by-step guide only after SiFli publishes official firmware images, board names, flash commands, and REPL settings.

Use [SiFli-SDK](../sifli/getting-started-sifli-sdk.md) when you need production firmware structure, Bluetooth profiles, graphics acceleration, power tuning, or custom board support.

## What SiFli Should Publish

Before this page becomes a user-facing MicroPython tutorial, SiFli should provide:

<div align="center"><em>Table: What SiFli Should Publish</em></div>

<div align="center" markdown>

| Item | Why it matters |
|:-----|:---------------|
| Firmware images | Users need board-specific binaries, not generic images. |
| Source repository | Developers need to know whether the port is upstream MicroPython, OpenSiFli-hosted, or SiFli-maintained elsewhere. |
| Supported boards | The guide must name exact SF32 boards and memory configurations. |
| Flash command | Users need the exact tool, arguments, boot mode, and reset timing. |
| REPL settings | Serial port, baud rate, console routing, and expected banner should be documented. |
| Filesystem behavior | The guide should say whether the image creates, formats, or preserves the MicroPython filesystem. |
| Peripheral support | GPIO, I2C, SPI, UART, PWM, ADC, display, Bluetooth, and filesystem support should be listed honestly. |
| Recovery flow | Users need a known-good way to return to SiFli-SDK firmware. |

</div>

## Proposed First-Run Flow

Once SiFli publishes official MicroPython support, the getting-started guide should follow this sequence:

1. Confirm the board once with [SiFli-SDK](../sifli/getting-started-sifli-sdk.md).
2. Download the MicroPython image for the exact board and memory configuration.
3. Put the board into the documented download mode.
4. Flash the image with the official command.
5. Reset the board.
6. Open the REPL at the documented baud rate.
7. Run a serial print loop.
8. Copy a small `main.py` to the board.
9. Document how to erase or recover the filesystem if startup scripts hang.

## Suggested REPL Smoke Test

SiFli should make the first test independent of board LEDs and pin names:

```python
import time

while True:
    print("Hello from SF32 MicroPython")
    time.sleep(1)
```

Expected result:

- The serial console shows a MicroPython banner or prompt.
- Pressing ++ctrl+c++ returns to `>>>`.
- The loop prints once per second.

## Suggested GPIO Test

Only add this after SiFli documents the pin name:

```python
from machine import Pin
import time

led = Pin("LED", Pin.OUT)

while True:
    led.toggle()
    time.sleep_ms(500)
```

If the board has no user LED, the official guide should say so and use a documented GPIO header pin instead.

## Acceptance Checklist for SiFli

The MicroPython guide is ready to become a normal tutorial when SiFli can confirm:

- [ ] Firmware images are published for named SF32 boards.
- [ ] Each image lists chip variant, flash size, PSRAM size, and board revision.
- [ ] Flash commands are tested on Windows, macOS, and Linux.
- [ ] REPL baud rate and expected banner are documented.
- [ ] `mpremote` or an equivalent workflow is tested.
- [ ] `main.py` copy/reset behavior is documented.
- [ ] Filesystem formatting and recovery behavior are documented.
- [ ] Supported `machine` APIs are listed.
- [ ] A path back to SiFli-SDK firmware is documented.

## Troubleshooting to Document

When SiFli publishes the official MicroPython flow, include fixes for:

<div align="center"><em>Table: Troubleshooting to Document</em></div>

<div align="center" markdown>

| Symptom | Detail SiFli should provide |
|:--------|:----------------------------|
| Flash succeeds but no REPL appears | Baud rate, console UART, and image/board compatibility checks. |
| REPL appears but filesystem errors print | Filesystem format or erase procedure. |
| `mpremote` cannot open the port | Port naming, driver, and OS permission notes. |
| GPIO example fails | Valid pin names and board pin map. |
| Script locks up the board | Interrupt, safe mode, filesystem erase, or reflashing steps. |

</div>

## Where to Go Next

- Use [SiFli-SDK](../sifli/getting-started-sifli-sdk.md) today for the verified SF32 development path.
- Use this page as the checklist for turning MicroPython support into a reliable public getting-started article.
- Add links here once SiFli publishes official firmware images, source, board-support status, and release notes.
