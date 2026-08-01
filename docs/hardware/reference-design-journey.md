---
icon: lucide/waypoints
description: "A practical SF32 reference-design journey from SF32LB52 development-board validation to a custom connected wearable hardware and firmware release plan."
tags:
    - Hardware
    - Reference design
---

# Connected Wearable Reference-Design Journey

This reference journey provides a repeatable path for a compact connected product with a display, BLE, a sensor input, and battery power. It is not a released schematic; use it to organize validation before designing custom hardware.

1. **Select and baseline.** Use [SF32 Family](chips/SF32_family.md) and [Choose Hardware](choose-hardware.md), then run SiFli-SDK `hello_world` on an [SF32LB52-DevKit-LCD](devkits/SF32LB52-DevKit-LCD.md) or the closest available board.
2. **Prove product functions.** Follow [Tutorials](../getting-started/tutorials/overview.md) to validate input/sensor handling, BLE, a simple UI, storage if needed, and the serial recovery path.
3. **Validate system interactions.** Use [Graphics](../learn/graphics/overview.md), [Bluetooth](../learn/bluetooth/overview.md), and [Low Power](../learn/low-power/overview.md) to test display refresh, wireless activity, and sleep/wake together.
4. **Prepare custom hardware.** Use the selected chip's design guide and checklist through [Design for Production](design-for-production.md); confirm display, storage, battery, antenna/RF, and programming/test assumptions.
5. **Release with evidence.** Preserve the board name, SDK version, known-good image, logs, power scenes, recovery/OTA behavior, BOM choices, and checklist decisions.

The exit criterion is not a successful demo. It is a repeatable build/flash/recovery path plus measured evidence that the product's defining subsystems coexist on representative hardware.

!!! note "Auto-generated content"
    This page was compiled/drafted without an existing source document. Verify technical claims against SiFli's official documentation before relying on them.
