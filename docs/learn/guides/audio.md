---
icon: lucide/volume-2
description: "Practical guide to SF32's local audio subsystem: codec and DMA path, interface selection, buffering strategy, Audio Server middleware, and power tradeoffs."
tags:
  - Guides
---

# Audio Guide

## Overview

This guide covers the **local audio subsystem** on SF32 devices — the codec, DMA, and middleware path used for microphone input, speaker/line output, and on-device playback or recording. It focuses on practical decisions: interface selection, buffering strategy, the Audio Server middleware, codec choice, and power.

Bluetooth audio (A2DP, LE Audio) is a related but separate topic covered in the [Bluetooth Guide](bluetooth.md#bluetooth-audio-and-le-audio) — that guide covers the wireless streaming side, while this one covers what happens once samples are on-chip: capture, mixing, decoding, and driving the physical audio path.

## Define the Product's Audio Requirements

Before choosing interfaces or buffer sizes, pin down what the product needs:

- Playback only, recording only, or both simultaneously (full duplex)?
- How many microphones, and analog (AMIC) or digital (DMIC)?
- Local playback formats — raw PCM, MP3, Opus, or another codec?
- Is Bluetooth audio (Classic or LE Audio) also required, in parallel with local audio?
- Voice-trigger or always-listening behavior, and its power budget?
- Speaker/line-out drive requirements, or is output routed to an external amplifier/codec?
- Latency tolerance — voice calls and real-time monitoring are far stricter than notification chimes.

These answers determine the interface (I2S vs. PDM vs. ADC/DAC), the codec configuration, and how much of the pipeline needs to stay awake.

## The SF32 Audio Signal Path

A typical SF32 local-audio pipeline looks like this:

```text
Microphone(s) (AMIC / DMIC)
        │
        ▼
AUDCODEC (analog front end, ADC/DAC)
        │
        ▼
AUDPRC (audio processing: mixing, gain, sample-rate handling)
        │
        ▼
Audio Server (middleware: stream routing, playback/record sessions)
        │
        ▼
Application (playback engine, voice pipeline, Bluetooth audio bridge)
        │
        ▼
Speaker / Line-out / DAC, or onward to Bluetooth audio
```

**AUDCODEC** is the analog front end — the ADC/DAC hardware that converts between analog audio and digital samples. **AUDPRC** sits above it and handles processing tasks such as mixing, gain, and format/sample-rate handling. The **Audio Server** middleware coordinates playback and recording sessions on top of both, so application code generally works with streams and sessions rather than programming the codec registers directly.

## Choosing Interfaces: AMIC, DMIC, and I2S

<div align="center"><em>Table: Choosing Interfaces: AMIC, DMIC, and I2S</em></div>

<div align="center" markdown>

| Interface | Typical Use | Notes |
|:----------|:------------|:------|
| **AMIC (analog mic input)** | General-purpose microphone capture | Goes through AUDCODEC's analog front end; simpler analog design, sensitive to board noise. |
| **DMIC (digital microphone)** | Voice capture, multi-mic arrays | Digital signal, generally more resistant to board-level noise; good for beamforming or multi-mic setups. |
| **I2S** | Streaming PCM to/from external codecs or amplifiers | Common when using an external audio codec/amp rather than the on-chip AUDCODEC path. |
| **PDM** | Digital microphone input | Native interface for many DMIC parts; paired with on-chip PDM-to-PCM conversion. |

</div>

Mixing AMIC and DMIC inputs is common in multi-microphone designs (for example, one AMIC for general capture and multiple DMICs for a voice-focused array) — confirm exactly how many of each the target device supports before finalizing the microphone layout.

## Pick the Right SF32 Device

Audio capability varies across the family — check the datasheet for the exact part, but as a starting point:

<div align="center"><em>Table: Pick the Right SF32 Device</em></div>

<div align="center" markdown>

| Device Family | Audio Codec I/O (typical) | Typical Positioning |
|:--------------|:---------------------------|:---------------------|
| **SF32LB52x** | 1× AMIC, 2× DMIC | Cost-optimized Bluetooth audio accessories, voice-enabled compact HMIs. |
| **SF32LB55x** | Check datasheet — BLE-focused variant | BLE wearables and sensor-rich products where audio is secondary. |
| **SF32LB56x** | 1× AMIC, 4× DMIC | Richer HMI/display products that also need multi-mic voice capture. |
| **SF32LB58x** | 2× AMIC, 4× DMIC | Flagship products combining audio, graphics, AI, and complex connectivity. |

</div>

See the [SF32 Family Overview](../../hardware/chips/SF32_family.md) for the full chip comparison, and confirm exact AMIC/DMIC counts against the datasheet before finalizing a design — this table reflects current front-page positioning, not a substitute for the datasheet.

## Audio Session Templates

Most products fall into a few repeatable session shapes. Choose the closest one and validate it explicitly:

<div align="center"><em>Table: Audio Session Templates</em></div>

<div align="center" markdown>

| Session | Typical Pipeline | Main Risk |
|:--------|:-----------------|:----------|
| Notification sound | Flash/PSRAM asset -> decoder if needed -> Audio Server -> DAC/amp | Pop/click during start and stop. |
| Voice recording | AMIC/DMIC -> AUDCODEC/AUDPRC -> DMA buffers -> app/storage/Bluetooth | Buffer overrun and clock drift. |
| Bluetooth speaker | Bluetooth audio -> decode/mix -> Audio Server -> DAC/amp | Coexistence with RF and memory bandwidth. |
| Voice call | Mic capture + playback at the same time | Full-duplex latency, echo path, buffer ownership. |
| Wake/listen feature | Low-rate capture -> feature extraction -> AI trigger | Idle power and false wakeups. |

</div>

Define start, steady-state, underrun/overrun recovery, and teardown behavior for each session. Audio bugs often hide in transitions rather than in the steady playback loop.

## Buffer and Latency Budget

Buffer size is a product decision, not just a driver default. Use the formula:

```text
latency per buffer = samples per buffer / sample rate
```

For example, a 480-sample buffer at 48 kHz represents 10 ms of audio before any decoding, scheduling, or transport delay. Double buffering improves safety but also adds pipeline depth. For voice interaction and calls, define the total latency budget first and then divide it across capture, processing, Bluetooth/transport, playback, and scheduling.

## Playback and Recording Basics

Whether driving a speaker or capturing a microphone, the same fundamentals apply:

- **Buffer sizing** — small buffers reduce latency but increase interrupt/DMA overhead; large buffers are more forgiving but add latency and use more memory.
- **DMA-driven transfer** — audio should move via DMA rather than CPU-copied sample loops, freeing the CPU for UI, Bluetooth, and application logic.
- **Sample-rate and format planning** — decide sample rate (e.g., 16 kHz for voice, 44.1/48 kHz for music) and bit depth up front; converting formats at runtime costs CPU and memory.
- **Double buffering** — use at least two buffers so one can be filled by the application while the other is being transferred by DMA, avoiding underruns and glitches.

Cache-coherency rules apply here just as with graphics and AI buffers: if AUDCODEC/DMA and the CPU share a buffer, follow the SDK's cache clean/invalidate rules before handing the buffer between them.

## Codec and Compression Choices

Raw PCM is simplest but uses the most memory and storage bandwidth. For playback from Flash/PSRAM or storage, compressed formats reduce footprint at the cost of decode complexity:

<div align="center"><em>Table: Codec and Compression Choices</em></div>

<div align="center" markdown>

| Format | Typical Use | Notes |
|:-------|:-------------|:------|
| **Raw PCM** | Short sounds, low-latency monitoring, voice pipelines | Simplest path; no decode step, but largest storage footprint. |
| **MP3** | Local music playback | Broad compatibility; decode cost is well understood and commonly used in SD-card music-player examples. |
| **Opus** | Voice and general-purpose compressed audio | Efficient at low bitrates; good fit for voice and Bluetooth-adjacent use cases. |

</div>

The SDK includes example projects for local music playback (including an SD-card MP3 player), Opus playback, dual ADC/DAC audio paths, and recording — start from the closest example rather than building the pipeline from scratch.

## Local Audio vs. Bluetooth Audio

Keep the two paths conceptually separate, even though they may run concurrently:

- **Local audio** (this guide) — AUDCODEC/AUDPRC, microphones, speaker/line-out, on-device playback and recording.
- **Bluetooth audio** ([Bluetooth Guide](bluetooth.md#bluetooth-audio-and-le-audio)) — A2DP/AVRCP/HFP for Classic, or LE Audio broadcast for BLE.

Many real products bridge the two — for example, capturing on a local microphone and streaming over Bluetooth, or receiving Bluetooth audio and mixing it with a local notification chime through the Audio Server. Plan buffer ownership and mixing behavior explicitly when both paths are active at once.

## Board-Level Audio Checklist

Firmware cannot fully hide poor analog design. Review these items during schematic and PCB work:

<div align="center"><em>Table: Board-Level Audio Checklist</em></div>

<div align="center" markdown>

| Area | Guidance |
|:-----|:---------|
| Microphone bias and routing | Keep analog mic traces short, quiet, and away from clocks/RF/high-current switching. |
| Grounding | Avoid noisy return paths through the microphone or speaker reference. |
| Power rails | Filter codec and microphone supplies according to the reference design and microphone datasheet. |
| Speaker/amp path | Check load, gain, thermal behavior, pop suppression, and shutdown pin behavior. |
| I2S/DMIC clocks | Confirm timing margin, trace length, and clock quality at the selected sample rates. |
| Test access | Leave a practical way to inject/capture audio during bring-up and production test. |

</div>

For products with both RF and analog audio, validate noise with Bluetooth active, display refreshing, charger connected, and the final enclosure assembled.

## Power Considerations for Audio

Audio is one of the more power-hungry always-on workloads on a battery-powered device:

- Keep the codec and DMA path active only while audio is actually flowing; return to a low-power state between playback/record sessions.
- For always-listening voice-trigger designs, prefer the lowest-power capture path the SDK and device support, and keep the trigger model as lightweight as possible — see the [AI Guide](ai.md#audio-and-voice) for the inference side of this.
- Batch or buffer aggressively enough to avoid waking the application CPU for every sample block; let DMA and interrupts do the routine work.
- Coordinate audio timing with Bluetooth and display activity — see [Power Guide](power.md) and [Bluetooth Guide: Coexistence](bluetooth.md#coexistence-with-other-workloads) for the system-level view.

## Audio Validation Matrix

Run the same audio tests after codec, Bluetooth, display, power, or clock changes:

<div align="center"><em>Table: Audio Validation Matrix</em></div>

<div align="center" markdown>

| Test | What to Check |
|:-----|:--------------|
| Silence capture/playback | Noise floor, hum, pop/click, DC offset. |
| Sine sweep or tone | Sample-rate correctness, distortion, clipping. |
| Long playback | Underrun, memory leak, thermal/power stability. |
| Record while displaying UI | DMA and memory-bandwidth coexistence. |
| Bluetooth audio plus local sound | Mixing, priority, and latency. |
| Sleep/wake around audio | Codec teardown/restart, pop suppression, PM votes. |

</div>

Keep a known-good reference WAV/PCM file and a known-good captured sample from the evaluation board. They make regressions much easier to identify than subjective listening alone.

## Debugging Audio Issues

<div align="center"><em>Table: Debugging Audio Issues</em></div>

<div align="center" markdown>

| Symptom | Likely Area to Check |
|:--------|:----------------------|
| Clicks, pops, or glitches | Buffer underrun, insufficient buffer count/size, DMA misconfiguration. |
| Persistent noise or hum | Analog front-end/board layout, AMIC grounding, power-rail noise. |
| Latency too high for the use case | Buffer sizes too large, unnecessary format conversion, scheduling delay before DMA starts. |
| Audio stutters when Bluetooth/display active | Coexistence and memory-bandwidth contention — see [Coexistence](bluetooth.md#coexistence-with-other-workloads). |
| Decoded audio sounds wrong (pitch/speed) | Sample-rate mismatch between source, decoder, and AUDCODEC configuration. |
| High power during idle playback state | Codec/DMA left active between sessions, unnecessary polling instead of event-driven session teardown. |

</div>

## Common Mistakes

- Programming the CPU to copy audio samples instead of using DMA.
- Choosing a single, undersized buffer instead of double buffering.
- Mixing AMIC and DMIC assumptions without checking the target device's actual microphone interface count.
- Treating Bluetooth audio and local audio as fully independent when they'll run concurrently in the real product.
- Ignoring cache-coherency rules for buffers shared between AUDCODEC/DMA and the CPU.
- Leaving the codec and DMA path powered between sessions instead of tearing it down.
- Committing to a compressed format before confirming decode cost fits the power and CPU budget.

## Bring-Up Checklist

- [ ] Confirm microphone type(s) (AMIC/DMIC) and count against the target device's datasheet.
- [ ] Decide sample rate, bit depth, and buffer sizes for playback and recording paths.
- [ ] Bring up AUDCODEC/AUDPRC and validate a basic playback and recording loop.
- [ ] Integrate with the Audio Server middleware rather than driving the codec directly from application code.
- [ ] Choose and validate the compression format (PCM/MP3/Opus) against decode-cost and memory budgets.
- [ ] Validate cache clean/invalidate behavior for buffers shared with DMA.
- [ ] Test local audio and Bluetooth audio running concurrently, if both are used.
- [ ] Profile power during active playback/recording and confirm the codec path powers down between sessions.

## Key Takeaways

- The local audio path runs through AUDCODEC (analog front end) and AUDPRC (processing), coordinated by the Audio Server middleware — build on top of that middleware rather than the raw codec registers.
- Choose AMIC, DMIC, or I2S based on the target device's actual interface count and the product's microphone layout, not assumptions carried over from another chip.
- DMA-driven, double-buffered transfer is the baseline for glitch-free playback and recording.
- Local audio and Bluetooth audio are separate subsystems that often need to run together — plan mixing and buffer ownership explicitly.
- Treat audio power the same way as Bluetooth and AI power: minimize active time, avoid unnecessary CPU wakeups, and measure real sessions, not just steady-state playback.

!!! note "Auto-generated content"
    This page was compiled/drafted without an existing source document. Verify technical claims against SiFli's official documentation before relying on them.
