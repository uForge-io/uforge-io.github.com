---
icon: lucide/battery
tags:
  - Guides
---

# Power Guide

## Overview

This guide covers practical low-power design on SF32 devices: power modes, what actually drains a battery, and how to structure firmware so the system spends as much time as possible in a low-power state. Power is treated here as a system-level property that cuts across every other guide — Bluetooth, graphics, audio, and AI decisions all have direct power consequences, and this guide is where those threads come together.

SF32's RT-Thread-based SDK includes a **PM (Power Management)** middleware component that coordinates sleep modes and wake sources across the system, alongside a dedicated low-power/Bluetooth processor (see [Bluetooth Processor Architecture](../architecture/bluetooth-processor.md)) that lets the main application CPU sleep while the wireless link stays alive. This guide assumes that architecture and focuses on how to use it well.

## Define the Product's Power Budget First

Before writing any power-management code, define what "good" looks like for the product:

- Target battery life (hours, days, or weeks) and battery capacity.
- Expected duty cycle — how much of the day is the device actively used vs. idle-but-connected vs. fully asleep?
- Which events must wake the system, and how quickly?
- Which subsystems must stay alive continuously (e.g., a connected Bluetooth link, an always-on display, a voice trigger) versus which can be fully event-driven?
- Charging behavior and expected charge cycles, if relevant to the product's power policy.

These targets should drive architecture decisions early — including chip selection, display type, and whether features like always-listening voice or always-on display are affordable within the power budget at all.

## Power Modes and the PM Framework

Most SF32 firmware power policy is expressed as a small set of operating modes, roughly:

<div align="center"><em>Table: Power Modes and the PM Framework</em></div>

<div align="center" markdown>

| Mode | Typical State | When Used |
|:-----|:---------------|:----------|
| **Active** | CPU running, peripherals as needed | UI interaction, active Bluetooth transfer, audio streaming, sensor processing. |
| **Idle** | CPU can sleep between events, peripherals mostly quiescent | Between UI frames, waiting on the next scheduled task or interrupt. |
| **Sleep / Low-power** | CPU deeply asleep, select peripherals or the low-power processor still active | Connected standby, waiting for a Bluetooth event, sensor interrupt, or timer. |
| **Deep sleep / Standby** | Most of the system powered down | Long idle periods where no near-term wake is expected. |

</div>

The PM middleware's job is to pick the deepest mode that's safe given every subsystem's current requirements — a peripheral or driver votes for the power state it needs, and the system sleeps as deeply as the most demanding active vote allows. Practically, this means: **the more subsystems you keep truly idle, the deeper the system can actually sleep.** A single misbehaving driver that never releases its "stay active" vote can silently keep the whole system out of deep sleep.

## What Drains Power on an SF32 Product

Every subsystem has a different power signature:

<div align="center"><em>Table: What Drains Power on an SF32 Product</em></div>

<div align="center" markdown>

| Subsystem | Main Power Driver | Guide |
|:----------|:--------------------|:------|
| **CPU** | Active execution time, not just clock speed | This guide |
| **Bluetooth radio** | Advertising interval, connection interval, slave latency, TX power | [Bluetooth Guide](bluetooth.md#advertising-and-connection-parameters) |
| **Display** | Refresh frequency, full-screen vs. partial updates, backlight | [Graphics Guide](graphics.md#partial-refresh-and-dirty-regions) |
| **Audio codec/DMA** | Active session time, sample rate, whether it's left powered between sessions | [Audio Guide](audio.md#power-considerations-for-audio) |
| **AI inference** | Inference frequency and window size, not model size alone | [AI Guide](ai.md#power-aware-inference-scheduling) |
| **Memory system** | Cache/PSRAM activity, how often code executes from slow external memory | [STAR-MC1](../architecture/star-mc1.md) |
| **Sensors** | Polling frequency vs. interrupt-driven sampling | This guide |

</div>

No single fix addresses all of these — power optimization on a real product is a matter of tuning each subsystem's contribution and then verifying the combined effect, since subsystems compete for the same "how deep can we sleep" decision.

## Sleep-Aware Firmware Design

The biggest power wins usually come from firmware structure, not clever low-level tricks:

- **Prefer interrupts and events over polling.** A polling loop keeps the CPU active even when there's nothing to do.
- **Batch work.** Where latency allows, accumulate sensor samples, Bluetooth events, or audio blocks and process them together instead of waking for each one individually.
- **Release PM votes promptly.** Any driver or task that requests an active/idle power state should release that request as soon as its work is done — holding a vote longer than necessary is one of the most common causes of "power leaks."
- **Design the UI and audio paths to be event-driven**, not timer-polled, wherever the framework allows it.
- **Audit timers.** Every periodic timer is a scheduled wakeup; each one has a cost, and it's easy to accumulate several "harmless" timers that add up to a meaningfully worse sleep profile.

## Bluetooth Power Tuning

Connection and advertising parameters are the primary levers for Bluetooth power (see the full table in the [Bluetooth Guide](bluetooth.md#advertising-and-connection-parameters)):

- Increase connection interval and slave latency for links that are mostly idle.
- Reduce TX power to the lowest level that still meets the range requirement.
- Advertise less aggressively once a product expects reconnection rather than first-time discovery.
- Remember that the dedicated Bluetooth/low-power processor is what allows the main CPU to sleep through connection events — application code that wakes the main CPU for every Bluetooth callback defeats much of that benefit.

## Display and Backlight Power

Displays and backlights are often the single largest power draw on a wearable or handheld product:

- Use partial refresh and dirty-region updates instead of full-screen redraws where the panel and UI allow it (see the [Graphics Guide](graphics.md#partial-refresh-and-dirty-regions)).
- Dim or turn off the backlight aggressively on inactivity, and stop animations when the screen is dimmed or covered.
- For always-on-display products, choose a panel type suited to it (EPD or JDI/memory-in-pixel) rather than forcing an AMOLED/TFT panel to stay lit continuously.
- Treat "always-on display" as a distinct power budget line item, since it fundamentally changes what "idle" means for the product.

## AI and Sensor Power Tuning

On-device inference and sensor sampling should be scheduled deliberately, not run continuously:

- Run inference only when new, useful data is available — not on a fixed timer regardless of input activity.
- Move lightweight always-on sensing to the low-power processor where the device and SDK support it, rather than waking the main application CPU for every sample.
- Measure **energy per inference or per sample**, not just latency — a faster operation only helps power if it lets the system return to sleep sooner.

See the [AI Guide](ai.md#power-aware-inference-scheduling) for the accuracy/latency/power tradeoff in more depth.

## Memory and Clock Considerations

Where code executes from matters for both performance and power. STAR-MC1's instruction and data caches reduce the time the system spends stalled on external Flash or PSRAM accesses — less time active generally means more time available to sleep. See [STAR-MC1](../architecture/star-mc1.md#architectural-enhancements) for how the cache and memory subsystem affects this.

Beyond the CPU itself:

- External PSRAM and Flash have their own active/standby power characteristics — check the datasheet for retention and access power, especially if large buffers must remain valid during sleep.
- Clock source selection (crystal vs. internal oscillator, and which PLL/clock domains stay active) affects both wake latency and sleep-state power draw.
- Reducing CPU frequency during less demanding phases can help, but confirm it doesn't just extend active time enough to erase the benefit — measure the actual energy, not just instantaneous current.

## Hardware and RF Power Considerations

Firmware policy can only work within what the hardware allows:

- PMIC/LDO efficiency at the actual load currents the product will draw matters more than headline efficiency numbers at unrelated load points.
- RF layout and antenna tuning affect the TX power actually required for reliable range — poor RF design forces firmware to compensate with higher TX power, which costs battery life. See [Bluetooth Guide: RF and Clock Considerations](../architecture/bluetooth-processor.md#rf-and-clock-considerations).
- Crystal accuracy affects both RF timing margins and how conservatively firmware must set supervision timeouts and wake margins.
- Leave production test/calibration access in the design — power and RF tuning often continue past the first hardware revision.

## Case Study: Raise-to-Wake

A common wearable pattern — waking the display when the user raises their wrist — illustrates most of the ideas in this guide at once: a low-power accelerometer interrupt (not polling) wakes the system only on a real gesture, the application processor stays asleep until that interrupt fires, and the display only lights up (often via partial refresh into an already-idle panel) for the duration of the glance. The SDK includes a reference example for this exact pattern — it's a useful template for any "wake briefly, do a little work, go back to sleep" feature, not just wrist-raise detection specifically.

## Power Budget Worksheet

Convert the product goal into numbers before tuning firmware. A simple worksheet is usually enough:

<div align="center"><em>Table: Power Budget Worksheet</em></div>

<div align="center" markdown>

| State | Example Question | Budget Item |
|:------|:-----------------|:------------|
| Shipping / storage | How long can the product sit before first use? | Deep-sleep current, RTC retention, leakage through external parts. |
| Connected idle | How many hours per day is it paired but unused? | BLE interval, slave latency, sensor interrupts, display-off current. |
| Active glance | How often does the display wake and for how long? | Backlight, partial refresh, CPU/UI burst, touch controller. |
| Audio session | How long is playback, recording, or calling active? | Codec, DMA, Bluetooth audio, memory bandwidth. |
| AI burst | How often does inference run? | Sensor capture, pre-processing, accelerator/CPU time, post-processing. |
| OTA / maintenance | How often are updates expected? | Short connection interval, Flash erase/write, rollback storage. |

</div>

For each row, estimate `average current = state current x duty cycle`, then sum the rows. This exposes design problems early: a 20 uA sleep target will not rescue a product that spends too much time with a bright backlight or fixed-interval inference loop active.

## PM Ownership and Wake-Source Review

A reliable low-power design needs a clear owner for every wake source and every PM vote. Track these items in the design review:

<div align="center"><em>Table: PM Ownership and Wake-Source Review</em></div>

<div align="center" markdown>

| Item | Review Question | Failure Mode |
|:-----|:----------------|:-------------|
| PM vote owner | Which driver or task requests the active state? | A forgotten vote keeps the whole system awake. |
| Release condition | What exact event releases the vote? | Error paths or timeouts leak power. |
| Wake source | Which interrupt, timer, BLE event, or sensor can wake the CPU? | Unexpected periodic wakeups dominate idle current. |
| Clock dependency | Which clock domain must remain alive? | A peripheral silently prevents deeper sleep. |
| Retention need | Which memory/state must survive sleep? | Over-retention wastes current; under-retention breaks wake behavior. |

</div>

During debugging, instrument both the requested PM state and the actual entered PM state. If they differ, the mismatch is usually more useful than the current number itself.

## Measuring Power in Practice

Don't guess — measure. A basic power validation setup includes:

- A current probe or inline power analyzer between the battery/supply and the board.
- Test scenarios that match real product usage: connected-idle, active UI interaction, audio playback, AI inference bursts, and worst-case combined load.
- Logging or marking firmware states (active/idle/sleep) alongside the power trace so current spikes can be attributed to specific code paths.

The SDK ships dedicated power-characterization example projects covering common scenarios — including AMOLED display power, GPIO power, JDI display power, BLE/Classic Bluetooth power, and CPU-bound (CoreMark-style) power — useful both as measurement templates and as a sanity check for what "expected" current draw looks like on real hardware.

## Power Validation Matrix

Use repeatable test scenes so improvements can be compared across firmware revisions. At minimum, measure:

<div align="center"><em>Table: Power Validation Matrix</em></div>

<div align="center" markdown>

| Test Scene | What to Enable | Pass Criterion |
|:-----------|:---------------|:---------------|
| Boot to idle | Normal boot, no pairing, display off | No periodic work except required timers. |
| Connected idle | Bonded BLE link, production connection parameters | Main CPU sleeps between link events. |
| UI glance | Display wake, one typical screen update, dim timeout | Backlight and animation stop after timeout. |
| Audio active | Playback or recording path active | No underrun; codec powers down after session. |
| AI active | Real sensor input and inference burst | Energy per inference matches budget. |
| Worst case | Bluetooth + display + audio/AI as applicable | No disconnects, glitches, or thermal/power limit issues. |

</div>

Record firmware version, board revision, battery/supply voltage, temperature, antenna/enclosure configuration, and test script. Without that metadata, power numbers become difficult to compare and easy to misread.

## Debugging High Power Consumption

<div align="center"><em>Table: Debugging High Power Consumption</em></div>

<div align="center" markdown>

| Symptom | Likely Area to Check |
|:--------|:----------------------|
| Device never reaches deep sleep | A driver or task holding a PM vote open; check for missing "release" calls. |
| High power despite an "idle" Bluetooth connection | Slave latency not configured, application waking on every connection event. |
| Power spikes correlate with display activity | Full-screen redraws instead of partial refresh, backlight left at full brightness. |
| Power drifts higher after a firmware update | New timer, polling loop, or always-on peripheral introduced without a power review. |
| Good bench power, worse in-product power | RF/antenna detuning forcing higher TX power, or thermal/enclosure effects not present on the bench. |
| Audio or AI features disproportionately drain battery | Codec/inference path left active between sessions — see [Audio](audio.md#power-considerations-for-audio) and [AI](ai.md#power-aware-inference-scheduling) guides. |

</div>

## Common Mistakes

- Treating power optimization as a final polish step instead of a design constraint from day one.
- Polling sensors, Bluetooth state, or timers instead of using interrupts and events.
- Leaving a PM vote active after the work that required it has finished.
- Full-screen display redraws for small UI changes.
- Ignoring RF layout quality and compensating with higher TX power in firmware.
- Measuring only instantaneous current instead of energy over a realistic usage scenario.
- Validating power only on the bench, never in the final enclosure with the real antenna and battery.

## Bring-Up Checklist

- [ ] Define target battery life, duty cycle, and required wake sources.
- [ ] Identify which subsystems must stay active continuously vs. can be fully event-driven.
- [ ] Confirm every driver/task releases its PM vote promptly after use.
- [ ] Tune Bluetooth advertising/connection parameters for the product's actual usage pattern.
- [ ] Confirm the display path uses partial refresh where supported, and backlight policy matches product behavior.
- [ ] Audit all periodic timers and remove or consolidate unnecessary ones.
- [ ] Set up current measurement and validate active, idle, and sleep states individually.
- [ ] Test combined worst-case load (Bluetooth + display + audio + AI, as applicable) and confirm it still meets the power budget.
- [ ] Re-validate power after every significant firmware change, not just at the end of the project.

## Key Takeaways

- Power is a system property: Bluetooth, display, audio, AI, and memory decisions all feed into how deeply — and how often — the device can sleep.
- The PM framework sleeps as deeply as the most demanding active subsystem allows; a single lingering vote can quietly keep the whole system awake.
- Event-driven, interrupt-based design beats polling almost everywhere power matters.
- Bluetooth connection parameters and display refresh strategy are usually the two biggest levers on a connected wearable product.
- Measure real energy under realistic combined workloads, on real hardware in the final enclosure — bench numbers and single-subsystem numbers both under-represent real product power.

!!! note "Auto-generated content"
    This page was compiled/drafted without an existing source document. Verify technical claims against SiFli's official documentation before relying on them.
