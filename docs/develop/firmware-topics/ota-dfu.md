---
icon: lucide/upload-cloud
description: "OTA and DFU design decisions for SF32 products: transport tradeoffs (BLE, PAN, CDC, UART), rollback and recovery, and a firmware update release checklist."
tags:
    - Develop
    - OTA
    - DFU
---

# OTA and DFU

OTA and DFU are product architecture decisions, not just examples to copy. They affect boot layout, partitions, transport, signing, rollback, and recovery.

Do not start OTA work by only choosing a transport. Start by deciding how the product recovers when an update is interrupted or rejected.

## Paths to Evaluate

<div align="center"><em>Table: Paths to Evaluate</em></div>

<div align="center" markdown>

| Path | Use |
|:-----|:----|
| SDK OTA examples | Start here for vendor-supported update flows. |
| `dfu_v2` examples | Use for structured loader/app update flows when available in your SDK branch. |
| BLE / PAN / CDC transports | Choose based on product connectivity and recovery needs. |

</div>

## Design Questions

- What happens if power is lost during update?
- Can the product roll back?
- How is the image authenticated?
- How does the user recover a failed update?
- Which partition table layout supports the chosen flow?
- Can factory firmware be restored?

## Transport Tradeoffs

<div align="center"><em>Table: Transport Tradeoffs</em></div>

<div align="center" markdown>

| Transport | Strength | Watch out for |
|:----------|:---------|:--------------|
| BLE | Phone-based updates and wearable products. | Throughput, connection reliability, user experience. |
| PAN / network | Higher-level network workflows. | Network provisioning, security, and failure recovery. |
| CDC / USB | Fast local updates and factory/lab workflows. | Driver behavior, cable quality, and descriptor stability. |
| UART download | Reliable recovery and lab flashing. | Less friendly for end users. |

</div>

## Release Checklist

- [ ] Update image is versioned.
- [ ] Image authenticity/integrity is checked.
- [ ] Power-loss behavior is tested.
- [ ] Rollback or recovery policy is documented.
- [ ] Partition layout has enough growth margin.
- [ ] Update logs are collectable from failed devices.
- [ ] Factory recovery does not depend on the application being healthy.

## SiFli Team Should Add

- A current OTA/DFU decision table.
- Recommended `dfu_v2` paths by transport.
- Example partition tables for each update model.
- Security and signing guidance.
- Recovery and factory-reset procedures.
- End-user UX guidance for interrupted updates.

!!! note "Auto-generated content"
    This page was compiled/drafted without an existing source document. Verify technical claims against SiFli's official documentation before relying on them.
