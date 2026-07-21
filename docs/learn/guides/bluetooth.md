---
icon: lucide/bluetooth
tags:
  - Guides
---

# Bluetooth Guide

## Overview

This guide explains how to plan and build Bluetooth connectivity for SF32 products. It focuses on the practical decisions that shape real designs: BLE vs. dual-mode Bluetooth, GATT service design, profile selection, connection-parameter tuning, pairing and security, LE Audio, and coexistence with graphics, audio, and sensor workloads.

SF32 devices handle Bluetooth with a heterogeneous split: the application processor runs product logic, GATT services, and UI, while a dedicated Bluetooth or low-power processor handles link-layer timing and radio scheduling. This guide assumes that split and focuses on how to use it well from firmware.

For a deeper explanation of the underlying subsystem, see [Bluetooth Processor Architecture](../architecture/bluetooth-processor.md).

## Define the Product's Connectivity Requirements

Before writing any GATT code, pin down what the product actually needs:

- BLE only, or dual-mode Bluetooth (BT Classic + BLE)?
- Bluetooth audio — Classic (A2DP/AVRCP/HFP) or LE Audio?
- Typical connection interval, latency, and throughput requirements.
- How often the application processor needs to wake versus stay asleep.
- Whether the product must interoperate with existing phone-side services (notifications, media control, calls) or only with a custom companion app.
- Expected range, antenna/enclosure constraints, and RF certification targets.
- Whether firmware updates will be delivered over Bluetooth.

These answers drive almost every decision below — which device in the family fits, which SDK examples to start from, and how aggressively you can sleep the main CPU.

## Choose BLE, Classic, or Dual-Mode

### Bluetooth Low Energy (BLE)

BLE is the right default for most connected wearables and sensors: intermittent, event-driven traffic; low average power; broad phone-OS support. Typical BLE-first products include fitness bands, health sensors, beacons, and configuration/control links to a companion app.

### Classic Bluetooth and Dual-Mode

Add Classic Bluetooth when the product needs audio streaming (A2DP/AVRCP), hands-free calling (HFP), serial-style data links (SPP), or compatibility with existing Classic profiles. Dual-mode designs are more demanding on radio scheduling and coexistence than BLE-only designs, which is exactly the workload the dedicated Bluetooth processor is built to isolate from the rest of the system.

Not every SF32 family member exposes dual-mode Bluetooth — check the [Bluetooth Processor Architecture](../architecture/bluetooth-processor.md#device-family-differences) device table before committing to a part number.

## Pick the Right SF32 Device

Choose the device based on the connectivity feature set the product needs, not just clock speed.

<div align="center"><em>Table: Pick the Right SF32 Device</em></div>

<div align="center" markdown>

| Requirement | Typical Device Direction |
|:------------|:-------------------------|
| BLE-only wearable or sensor | SF32LB55x |
| Cost-optimized dual-mode Bluetooth (audio accessory, module) | SF32LB52x |
| Dual-mode Bluetooth with richer display/UI | SF32LB56x |
| Flagship product needing Bluetooth + graphics + AI + large memory | SF32LB58x |
| Bluetooth-controller-only low-power core is sufficient | SF32LB52x |
| Need the low-power core for extra user-programmable always-on tasks | SF32LB55x / SF32LB56x / SF32LB58x |

</div>

Cross-check against display, memory, and AI requirements from the [Graphics Guide](graphics.md) and [AI Accelerator](../architecture/ai-accelerator.md) page if the product needs more than connectivity alone.

## GATT Services and the Sibles Framework

SiFli-SDK's BLE stack centers on **Sibles**, its GATT service framework, sitting on top of a standard GAP layer. In practice, most products should start from an existing example rather than building a GATT database from scratch.

The SDK ships example implementations of several standard and vendor profiles, including:

<div align="center"><em>Table: GATT Services and the Sibles Framework</em></div>

<div align="center" markdown>

| Profile / Service | Typical Use |
|:-------------------|:------------|
| **HRPC** (Heart Rate) | Fitness and health-monitoring wearables. |
| **DISS** (Device Information Service) | Exposing manufacturer, model, and firmware version to the phone. |
| **CTS** (Current Time Service) | Time sync from the phone to the device. |
| **BASC** / **CSCPC** / **CPPC** | Battery, cycling speed/cadence, and cycling power collector profiles for fitness use cases. |
| **HID over GATT** | Keyboards, remotes, and other input-device emulation. |
| **ANCS** (Apple Notification Center Service) client | Reading iOS notifications on the device. |
| **AMS** (Apple Media Service) client | Controlling iOS media playback from the device. |
| Serial transfer profile | Custom bidirectional data transport over BLE, similar in spirit to SPP but over GATT. |

</div>

Starting from the closest matching example and adapting characteristics/UUIDs is almost always faster and less error-prone than authoring a new service definition from scratch, and it keeps you aligned with how the host/controller split expects services to be registered and advertised.

## Classic Bluetooth Profiles

For dual-mode products, the SDK provides example profile implementations for:

- **SPP** — simple bidirectional serial data, useful for legacy or non-GATT companion apps.
- **A2DP** (sink and source) — Bluetooth audio streaming.
- **AVRCP** — playback control (play/pause/track/volume) alongside an A2DP link.
- **HFP** (HF and AG roles) — hands-free calling.
- **PAN** — network-over-Bluetooth, including a PAN-based OTA delivery example.

Audio and legacy profiles tend to have tighter timing and throughput requirements than plain BLE links — budget coexistence testing time accordingly (see [Coexistence](#coexistence-with-other-workloads) below).

## Bluetooth Audio and LE Audio

Two distinct paths exist depending on the audio approach:

- **Classic Bluetooth audio** — A2DP for streaming, AVRCP for transport control, HFP for calls. Mature, broadly compatible with existing phones and headsets.
- **LE Audio** — built on the Bluetooth LE Audio broadcast model (BAP). The SDK includes broadcast source and sink examples, including a mixed broadcast-source-with-Classic-BT example for products that need to bridge both worlds during a transition period.

Either path shares the same underlying constraint: audio needs stable timing, buffering, and DMA-backed sample movement, which is why audio-capable SF32 products generally lean on the higher-tier family members (SF32LB52x/56x/58x) rather than the BLE-only SF32LB55x. For the DMA/buffering side of this, see the [Audio Guide](audio.md) and the [Bluetooth Processor Architecture](../architecture/bluetooth-processor.md#bluetooth-audio-and-le-audio) page.

## Implementation Pattern for Sibles Services

A maintainable BLE service usually follows this pattern:

<div align="center"><em>Table: Implementation Pattern for Sibles Services</em></div>

<div align="center" markdown>

| Step | Firmware Responsibility | Review Point |
|:-----|:------------------------|:-------------|
| Define service contract | UUIDs, characteristics, permissions, notification behavior. | Match companion-app and security requirements. |
| Register service | Use the Sibles/GATT framework path used by the closest SDK example. | Avoid one-off service plumbing. |
| Advertise intentionally | Include only the data needed for discovery and reconnection. | Keep advertising payload small and stable. |
| Gate writes | Validate length, state, permissions, and command sequence. | Prevent malformed app traffic from destabilizing firmware. |
| Notify sparingly | Send changes or batched data, not redundant state spam. | Saves airtime and idle power. |
| Persist state | Store bonds, CCCD state where appropriate, and product settings safely. | Survive reboot and OTA. |

</div>

This keeps the service definition, phone-app contract, security policy, and power behavior aligned.

## Advertising and Connection Parameters

Connection and advertising parameters are the main levers for trading off latency, throughput, and power.

<div align="center"><em>Table: Advertising and Connection Parameters</em></div>

<div align="center" markdown>

| Parameter | Effect | Guidance |
|:----------|:-------|:---------|
| Advertising interval | Discovery speed vs. advertising power cost | Shorter for fast pairing UX, longer once connected products expect reconnection instead of discovery. |
| Connection interval | Latency vs. power | Longer intervals save power; shorter intervals reduce latency for interactive or audio use cases. |
| Slave latency | Lets the peripheral skip connection events | Increases battery life for mostly-idle links; set to 0 when low latency matters more than power. |
| Supervision timeout | How long a missed link survives before disconnecting | Too short causes drops on marginal RF links; too long delays reconnection after a real loss. |
| TX power | Range vs. power and coexistence | Use the lowest power that meets the range requirement — higher TX power increases coexistence risk with other radios and system noise. |

</div>

Beacon-style products (iBeacon-compatible advertising) and periodic-advertising use cases (including periodic-advertising sync, for large-scale or unidirectional broadcasts) are supported via dedicated SDK examples rather than requiring a full GATT connection.

## Parameter Presets by Product Phase

Use different Bluetooth parameters for different phases instead of one compromise setting:

<div align="center"><em>Table: Parameter Presets by Product Phase</em></div>

<div align="center" markdown>

| Phase | Typical Goal | Parameter Direction |
|:------|:-------------|:--------------------|
| First-time discovery | Fast UX | Short advertising interval, clear device identity, limited duration. |
| Reconnection | Lower average power | Longer advertising interval after timeout, directed/filtered behavior where appropriate. |
| Interactive control | Low latency | Shorter connection interval, low or zero slave latency. |
| Connected idle | Battery life | Longer connection interval, nonzero slave latency, minimal notifications. |
| OTA transfer | Throughput and reliability | Short interval, no slave latency, conservative supervision timeout. |
| Audio | Stable timing | Parameters chosen around codec frame timing and buffer depth. |

</div>

Document the transitions between phases. Many “random” Bluetooth power or latency bugs are really products staying in the wrong phase after a state change.

## Pairing, Bonding, and Security

Most non-trivial products need pairing and bonding, not just an open connection:

- Decide early whether the product needs Just Works, passkey entry, or numeric comparison pairing.
- Profiles like ANCS/AMS typically require an active bonded, encrypted link with the phone — plan the pairing UX around that.
- Store bonding information according to the SDK's recommended storage/partition approach so bonds survive reboots and OTA updates.
- Define a re-pairing and "forget device" flow for both the product UI and the phone side.
- Treat security policy (encryption requirements, I/O capability, key size) as a product decision, not a default to leave unexamined.

## Multi-Connection and Roles

SF32's BLE stack supports operating as **central and peripheral simultaneously**, and supports **multiple concurrent connections**, both backed by dedicated SDK examples. This matters for products that, for example, act as a BLE peripheral to a phone while also acting as a central to a sensor accessory, or that need to serve several companion connections at once.

If the product needs to push the link close to its throughput ceiling, use the SDK's throughput example as a starting baseline before assuming a limitation is in your application code.

## OTA Firmware Updates over Bluetooth

Two common delivery paths exist:

- **DFU-style updates over BLE**, integrated with a peripheral connection (see the `peripheral_with_ota` example for how OTA hooks into a normal peripheral GATT role).
- **PAN OTA**, delivering firmware over a Bluetooth PAN network link for dual-mode products already using PAN for data.

Either way, plan the partition layout, rollback behavior, and connection-parameter strategy for the OTA session (updates typically want a short connection interval and no slave latency) before firmware is in the field.

## Coexistence with Other Workloads

Bluetooth on SF32 rarely runs alone — it shares the system with graphics, audio, sensors, and sometimes external Wi-Fi. The dedicated Bluetooth processor absorbs most link-timing risk, but application-level coexistence still needs attention:

- Long critical sections or disabled interrupts on the application processor can delay host-side Bluetooth handling.
- Display and PSRAM traffic compete for memory bandwidth with Bluetooth audio buffers.
- Sensor interrupts that wake the application processor too often defeat the power benefit of the Bluetooth processor sleeping the rest of the system.

See [Coexistence with Other Workloads](../architecture/bluetooth-processor.md#coexistence-with-other-workloads) for the system-level view, and test under realistic worst-case combinations (e.g., active display + audio + a busy BLE link), not each subsystem in isolation.

## RF, Interoperability, and Certification Readiness

Bluetooth firmware should be validated with the same discipline as RF hardware:

- Test with multiple phone vendors, OS versions, and reconnection scenarios, not just one development phone.
- Check behavior after stale bonds, phone-side forget-device, device-side factory reset, and OTA.
- Validate range and packet stability in the final enclosure with battery, display, charger, and user-worn/held positions.
- Keep RF test modes, calibration access, and logs available for production and certification support.
- For profile-heavy products, reserve time for qualification/profile testing; passing a demo app is not the same as being interoperable.

## Debugging Bluetooth Issues

<div align="center"><em>Table: Debugging Bluetooth Issues</em></div>

<div align="center" markdown>

| Symptom | Likely Area to Check |
|:--------|:----------------------|
| Slow or unreliable discovery | Advertising interval/type, RF layout, antenna matching. |
| Frequent disconnects on otherwise good RF | Supervision timeout too short, connection interval mismatch, coexistence interference. |
| High power despite "idle" connection | Slave latency not set, application processor woken too often, unnecessary GATT traffic. |
| Audio glitches or dropouts | DMA/buffer underrun, coexistence with display/PSRAM traffic, connection interval too coarse for the audio path. |
| Pairing fails intermittently | Bonding storage issues, I/O capability mismatch, stale bond on one side. |
| Good bench range, poor in-enclosure range | Antenna detuning from enclosure/battery/PCB, TX power setting, RF matching network. |

</div>

## Common Mistakes

- Choosing BLE-only hardware after the product already needs Classic audio.
- Building a custom GATT database instead of adapting an existing SDK profile example.
- Leaving slave latency at 0 for links that spend most of their time idle.
- Ignoring coexistence testing until late integration, when display/audio/Bluetooth are combined for the first time.
- Treating pairing/bonding as an afterthought instead of a designed UX flow.
- Skipping RF bring-up validation (antenna, matching network, crystal accuracy) until final PCB revisions.
- Assuming firmware-only tuning can compensate for a poor RF layout.

## Bring-Up Checklist

- [ ] Confirm BLE-only vs. dual-mode requirement and select the matching SF32 device.
- [ ] Identify the closest SDK profile/service examples for the product's use case.
- [ ] Define advertising and connection-parameter targets for discovery, active use, and idle states.
- [ ] Design the pairing, bonding, and "forget device" UX.
- [ ] Validate RF layout, antenna matching, and crystal accuracy on real hardware.
- [ ] Bring up the chosen profiles (GATT services, A2DP/AVRCP/HFP, or LE Audio broadcast) against a real phone or reference host.
- [ ] Test coexistence with display, audio, and sensor workloads under realistic combined load.
- [ ] Plan and test the OTA delivery path if firmware updates will ship over Bluetooth.
- [ ] Profile connected-idle power and confirm the application processor sleeps as expected.

## Key Takeaways

- Decide BLE-only vs. dual-mode Bluetooth first — it drives device selection and most of the SDK path you'll follow.
- Start from the SDK's existing GATT services and Classic profile examples (HRPC, DISS, CTS, HID, ANCS/AMS, SPP, A2DP, AVRCP, HFP, PAN) rather than building from scratch.
- Connection interval, slave latency, supervision timeout, and TX power are the main levers for balancing latency, throughput, and power.
- LE Audio and Classic Bluetooth audio are both supported, but audio-capable products should plan for the higher-tier SF32 devices and careful buffering/coexistence design.
- Bluetooth is a system-level concern: RF layout, clocks, pairing UX, and coexistence with graphics/audio/sensors matter as much as the GATT code itself.

!!! note "Auto-generated content"
    This page was compiled/drafted without an existing source document. Verify technical claims against SiFli's official documentation before relying on them.
