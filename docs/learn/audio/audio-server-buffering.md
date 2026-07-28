---
icon: lucide/audio-lines
description: "Practical SF32 Audio Server and DMA-buffering guidance for glitch-free playback, recording, and coexistence with Bluetooth and graphics."
tags:
    - Audio
---

# Audio Server and Buffering

Use this page after choosing the audio interface and product session in the [Audio Overview](overview.md). Its focus is the runtime boundary between application code, Audio Server sessions, DMA buffers, and the hardware audio path.

## Session Ownership

Keep application policy separate from streaming mechanics. The application decides when playback or recording starts, stops, and changes state; Audio Server coordinates the session; DMA moves sample blocks; the driver owns hardware configuration. Avoid making UI, Bluetooth callbacks, or filesystem reads directly manipulate codec registers during an active stream.

<div align="center"><em>Table: Buffer Ownership</em></div>

<div align="center" markdown>

| Boundary | Owner | Review question |
|:---------|:------|:----------------|
| Source data | Application, decoder, or storage task | Can it deliver the next block before DMA consumes the current one? |
| Active transfer buffer | DMA/audio driver | Is the buffer stable and cache-coherent for the full transfer? |
| Completed buffer | Application or processing task | Is it refilled or consumed before the next deadline? |
| Session state | Audio Server plus application policy | Are start, stop, error, and teardown paths idempotent? |

</div>

## Choose a Buffer Strategy

Double buffering is the practical baseline: DMA transfers one buffer while software prepares the next. Add more queued buffers only when storage latency, decoding time, Bluetooth transport jitter, or scheduling variability requires it. More buffers improve tolerance but increase memory use and end-to-end latency.

For each stream, measure three values: block duration, worst-case time to prepare the next block, and total acceptable latency. A stable stream requires preparation to finish comfortably before the active block completes; treat occasional underruns as a design failure, not a tuning detail.

## Validate Under Product Load

Test the audio session with the workloads that will coexist in the product: display refresh, Bluetooth notifications or audio, storage reads/writes, logging, and low-power transitions. Capture glitches, underruns, reconnects, and wake/sleep transitions in the same test log. See [Low-Power Overview](../low-power/overview.md) for the system power side and [Bluetooth Overview](../bluetooth/overview.md) for wireless coexistence.

!!! note "Auto-generated content"
    This page was compiled/drafted without an existing source document. Verify technical claims against SiFli's official documentation before relying on them.
