---
icon: lucide/table-properties
description: "How SF32 flash partition tables define bootloader, application, filesystem, OTA, and factory-data regions, plus common partition-layout failure modes."
tags:
    - Develop
    - Partitions
---

# Partition Tables

Partition tables define where firmware, boot data, filesystems, OTA images, and product data live in flash. Treat the partition table as part of the product contract, not as an implementation detail hidden inside an example.

## Why They Matter

Partition layout affects:

- Bootloader behavior.
- Application image location.
- OTA slotting.
- Filesystem placement.
- Factory data and calibration storage.
- Flash erase/update safety.

## Practical Workflow

1. Start from the partition table used by the closest SDK example.
2. Identify the bootloader, app, filesystem, and OTA regions.
3. Change one region at a time.
4. Keep a recovery flashing command outside the normal OTA path.
5. Document the layout in the product repository.

## What to Document

For every product build, document:

- Flash device and capacity.
- Bootloader region.
- Application image region.
- Filesystem region.
- OTA staging or secondary slot region.
- Factory/calibration data region.
- Alignment and erase-block assumptions.
- Which tool writes each region.
- Which regions are preserved during update.

## Review Questions

- Can the bootloader find the application after an interrupted update?
- Can factory data survive a normal firmware upgrade?
- Can the filesystem be erased without erasing calibration?
- Does the update image fit with margin?
- Is there a full-chip recovery command for lab use?
- Are partition addresses duplicated in scripts, source code, or release notes?

## Common Failure Modes

<div align="center"><em>Table: Common Failure Modes</em></div>

<div align="center" markdown>

| Failure | Cause |
|:--------|:------|
| Board boots old firmware | New image written to the wrong slot or boot metadata not updated. |
| OTA image does not fit | Partition copied from a smaller example. |
| Calibration lost | Factory data placed in an erase region used by app updates. |
| Filesystem corruption | Layout changed without format/migration policy. |
| Recovery requires guesswork | No recorded full-flash command or image map. |

</div>

## SiFli Team Should Add

- A beginner partition-table guide.
- Examples for no-OTA, single-slot OTA, dual-slot OTA, filesystem, and factory-data layouts.
- Migration notes for partition table syntax versions.
- A validation tool or checklist for overlapping regions.
- A visual map generator for release documentation.

!!! note "Auto-generated content"
    This page was compiled/drafted without an existing source document. Verify technical claims against SiFli's official documentation before relying on them.
