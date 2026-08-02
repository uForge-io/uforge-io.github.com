---
icon: lucide/gauge
description: "A repeatable SF32 power-measurement and validation workflow for active, connected-idle, display-off, sleep, and wake scenarios."
tags:
    - Low Power
---

# Power Measurement and Validation

Use this page with the [Low-Power Overview](overview.md) when a battery-life target needs evidence. It defines a repeatable measurement workflow rather than a single “low-power current” number.

## Define Test Scenes First

<div align="center"><em>Table: Minimum Power Test Scenes</em></div>

<div align="center" markdown>

| Scene | Record | Why it matters |
|:------|:-------|:---------------|
| Boot and first render | Peak and duration | Exposes initialization, display, and storage cost. |
| Active product use | Average current and duty cycle | Represents the user-visible workload. |
| Connected idle | Connection settings and wake frequency | Often dominates connected wearable battery life. |
| Display-off idle | Active blockers and average current | Separates UI power from background-system power. |
| Deep sleep and wake | Sleep current, wake source, recovery time | Verifies the intended lowest-power state and its usability. |

</div>

## Make Results Comparable

For every capture, record board revision, selected device, firmware commit or SDK version, battery or bench supply voltage, enabled peripherals, radio/display/audio state, measurement range, and test duration. Change one variable at a time. A lower instantaneous current is not an improvement if it makes the active interval longer or breaks wake behavior.

## Review Before Release

Compare measured scenes with the product budget, then repeat the combined workload: user input, display updates, wireless traffic, audio or sensors, storage, and a complete sleep/wake cycle. Investigate every unexpected wake source and every subsystem that prevents the intended sleep state. The [Plan a Product](../../explore-sf32/family/product-planning.md) page shows where this evidence belongs in the product handoff.

!!! note "Auto-generated content"
    This page was compiled/drafted without an existing source document. Verify technical claims against SiFli's official documentation before relying on them.
