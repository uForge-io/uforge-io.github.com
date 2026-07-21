---
icon: lucide/blocks
tags:
    - Develop
    - Firmware
---

# Firmware Topics

These topics apply across platforms. They are the mechanics that turn examples into products: boot layout, partitions, OTA, USB, power, logging, and crash analysis.

Read these pages before changing firmware layout, update behavior, or low-power policy. The code may still compile when these pieces are wrong, but the product can become hard to recover, debug, or ship.

## Topics

<div align="center"><em>Table: Topics</em></div>

<div align="center" markdown>

| Topic | Why it matters |
|:------|:---------------|
| [Partition Tables](partition-tables.md) | Defines firmware, filesystem, OTA, and storage layout. |
| [OTA and DFU](ota-dfu.md) | Required for field updates and recovery plans. |
| [USB and CherryUSB](usb-cherryusb.md) | Covers USB device/host capabilities beyond a spec-sheet checkbox. |
| [Power Management](power-management.md) | Turns a working demo into a battery-ready product. |
| [Logging and Crash Analysis](logging-crash-analysis.md) | Makes failures diagnosable. |

</div>

## Practical Rule

Before changing boot, OTA, filesystem, or storage behavior, understand the partition table and recovery path. A broken app is inconvenient; a broken boot/update layout can make boards painful to recover.

## Product Readiness Checklist

- [ ] A known-good full flash command exists outside the normal OTA path.
- [ ] Partition layout is documented in the product repository.
- [ ] OTA/DFU failure behavior has been tested.
- [ ] USB descriptors and VID/PID ownership are documented if USB is used.
- [ ] Power modes are measured on real hardware.
- [ ] Crash logs can be decoded from the released binary.
- [ ] Factory and developer flashing flows are separated.

!!! note "Auto-generated content"
    This page was compiled/drafted without an existing source document. Verify technical claims against SiFli's official documentation before relying on them.
