---
icon: lucide/terminal-square
tags:
    - Develop
    - MicroPython
---

# MicroPython Status

No official SF32 MicroPython port, firmware image, or board-specific flashing flow was found in the checked SiFli documentation and OpenSiFli repositories.

That does not prove no private or community experiment exists. It does mean this site should not present MicroPython as a verified SF32 development path until there is a public firmware image or source tree to link.

## Current Recommendation

Do not list MicroPython as a supported SF32 path for end users yet. Keep it as a roadmap/status page until there is a public artifact that a developer can flash and reproduce.

## What a Real Page Needs

Before this becomes a normal tutorial, SiFli should publish:

- Firmware images by board and memory configuration.
- Source repository and build instructions.
- Flash command and recovery command.
- REPL UART and baud rate.
- Expected MicroPython banner.
- Supported `machine` APIs.
- Filesystem behavior and safe-mode/recovery behavior.
- Known limitations for display, Bluetooth, storage, USB, and low power.

## Suggested First Smoke Test

Once firmware exists, the first test should be serial-only:

```python
import time

while True:
    print("Hello from SF32 MicroPython")
    time.sleep(1)
```

Then test GPIO only after pin names are documented.

## Minimum Acceptance Criteria

MicroPython can move from "status" to "getting started" when all of these exist:

- A public repository or release page.
- A board-specific binary for at least one SF32 dev kit.
- A documented flash command.
- A documented REPL port and baud rate.
- A recovery path back to SiFli-SDK firmware.
- A list of supported `machine` APIs.
- At least one GPIO example tested on real hardware.

## Why This Matters

A vague instruction to "download a MicroPython image" is not actionable. Users need an exact image, board match, flash tool, REPL setting, and recovery path. Without those, a MicroPython page creates support burden instead of helping.

## SiFli Team Should Add

- A public yes/no status statement for MicroPython on SF32.
- A roadmap if support is planned.
- A repository or release location if support exists privately.
- A warning if no support is currently planned.
- A decision on whether MicroPython belongs in Getting Started or only in Develop until stable.

!!! note "Auto-generated content"
    This page was compiled/drafted without an existing source document. Verify technical claims against SiFli's official documentation before relying on them.
