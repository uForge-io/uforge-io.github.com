---
icon: lucide/audio-lines
title: "Audio SDK Examples"
description: "Choose the right SiFli-SDK audio example for PDM microphone capture, recording, playback, codecs, storage, and mixing."
tags:
  - Audio
  - Examples
---

# Audio SDK Examples { #audio-sdk-examples }

The SiFli-SDK audio examples are practical starting points for a complete signal path, not drop-in product firmware. Choose the one that already proves the hardest part of your design: microphone capture, a speaker path, storage, a codec, or multiple concurrent streams. Then make the unmodified example work on your target board before changing one subsystem at a time.

This page organizes the audio examples listed in the [SiFli-SDK audio index](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/example/multimedia/audio/index.html) by engineering task. The upstream pages remain authoritative for the current SDK release, supported boards, `menuconfig` settings, pin assignments, build commands, and known limitations.

## Start with the Right Example

<div align="center"><em>Table: SiFli-SDK Audio Examples by Engineering Task</em></div>

<div align="center" markdown>

| Engineering goal | Start with | What it proves | Scope to confirm before use |
|:-----------------|:-----------|:---------------|:----------------------------|
| Capture from two or four digital microphones | [PDM Example](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/audio/4pdm/README.html) | PDM capture, WAV recording, and playback of the recorded data | PDM-capable board, microphone wiring, pin mux, and the upstream supported-board list |
| Capture from two analog microphones | [Dual ADC/DAC Example](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/audio/dual_adc_dac/README.html) | Two-channel analog capture, selected-microphone recording, and speaker playback | A custom SF32LB58x board with two analog microphones and a speaker |
| Prove basic microphone-to-speaker behavior | [Record Example](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/audio/record/README.html) | Microphone capture into a PCM memory buffer, then automatic playback | Current supported board list and board audio path |
| Play a file stored in the image | [Local Music Example](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/audio/local_music/README.html) | WAV playback from the mounted root filesystem; the example can also use a preset MP3 file | FAT filesystem, audio path, and current supported board list |
| Play music from an SD card | [MP3 Local Music Player](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/audio/mp3_sd_player/README.html) | MP3 or WAV playback from an SD-card `music` directory and shell-controlled volume | SD card over SPI, FAT/MSD configuration, speaker, and the specific supported board |
| Record, compress, decode, and play lossless audio | [FLAC Example](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/audio/flac/README.html) | PCM recording plus FLAC encoding, decoding, and playback | FAT filesystem, `libFLAC`, audio services, and current board support |
| Record, compress, decode, and play voice-oriented audio | [Opus Example](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/audio/opus/README.html) | 16 kHz microphone capture, Opus encode/decode, and speaker playback | FAT filesystem, audio services, the current supported board, and the required Opus stack size |
| Mix multiple local tracks | [Three-Channel Audio Mixer Player](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/example/multimedia/audio/mixer/README.html) | Independent decode of three local files, resampling where needed, and mixed output | Filesystem image, sample files, audio configuration, and current supported boards |

</div>

## Shared Starting Point

Most examples rely on the same baseline: the board audio hardware must be present and routed correctly, the board configuration must enable the required audio blocks, and the selected example must support the board you are building for. Examples that read or write files also require a mounted filesystem. Do not copy a board name, pin assignment, or `menuconfig` setting from a different example without checking the upstream page and the target board files.

For all examples, keep the first validation deliberately narrow:

1. Build and flash the unmodified project for a supported board.
2. Confirm the expected capture or playback behavior using known-good audio hardware and files.
3. Record the SDK revision, board name, configuration, pin assignment, and serial log.
4. Change one product-specific element, then repeat the same test.

The [Audio Overview](overview.md) explains the interface and system choices behind these samples. For buffer ownership, session teardown, and coexistence with display or Bluetooth workloads, continue with [Audio Server and Buffering](audio-server-buffering.md).

## Digital Microphone Capture: PDM

Use the PDM example when a product needs digital microphone capture rather than an analog microphone input. The official example records from two or four PDM microphones, saves the result as a WAV file, and plays the recording back. Its documented topology uses the left and right channels of `PDM1` for two microphones, then adds `PDM2` to reach four microphones. That is a microphone-count example, not a claim that one PDM interface always equals one microphone.

Before adapting it, confirm all four boundaries:

- The selected chip and board expose the required PDM signals.
- The microphone clocks, data lines, supply, and grounding match the microphone data sheet.
- The board pin-mux configuration assigns the PDM functions before the driver starts.
- The product needs the recording/playback services enabled by the example; they are not required merely to capture PDM data.

The upstream PDM page currently documents its own supported-board configuration and example pin mapping. Treat those as a verified baseline, then replace them with the target board’s actual wiring rather than assuming they transfer unchanged. See the [PDM Example](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/audio/4pdm/README.html).

## Analog Capture and Basic Record/Playback

The **Record Example** is the shortest path to prove a conventional local audio loop: record microphone data into a PCM memory buffer, then play the buffer through the speaker. It is useful before adding a filesystem, compression, Bluetooth transport, or multiple microphones.

The **Dual ADC/DAC Example** is the more specialized baseline for an SF32LB58x custom board with two analog microphones and a speaker. It records the two microphones simultaneously and lets you select which microphone to record or route to the speaker. Use it when channel selection and the analog front end are already part of the product requirement; otherwise begin with the simpler Record Example.

For either path, verify the quiet-state noise floor, gain, clipping, and start/stop behavior before investigating software features. A stable PCM capture/playback path is the foundation for codec, file, and Bluetooth work.

## Local Playback and Storage

The **Local Music Example** is the smallest file-backed playback baseline. It mounts the root filesystem, plays a preset WAV file, and supports a preset MP3 file when the file and configuration fit the image. Use it for notification sounds, bundled prompts, and early validation of the local speaker path.

The **MP3 Local Music Player** adds removable-storage behavior. It plays MP3 or WAV files from an SD-card `music` directory and exposes shell volume control. It therefore brings filesystem, SPI-connected SD-card, and media-management assumptions that the Local Music Example intentionally avoids. Start here only when SD-card media is part of the product.

Both examples prove playback, not a general media-player architecture. Plan file indexing, corrupt-media handling, interruption, power-state recovery, and UI behavior separately before turning either into a user-facing player.

## FLAC and Opus Codec Pipelines

The **FLAC Example** covers the full lossless flow: record PCM from the microphone, encode it as FLAC, decode it, and play it. It is appropriate when testing a file-backed capture pipeline or comparing storage cost with uncompressed PCM.

The **Opus Example** covers a voice-oriented compressed path. The current upstream example captures at 16 kHz, processes 10 ms frames at approximately 16 kbps, then decodes and plays the resulting stream. Its documentation also calls out a stack-size requirement that changes according to the selected encoder mode. Preserve that constraint when using the example as a baseline; do not assume its default task stack is adequate after adding application work.

Neither sample establishes an end-to-end Bluetooth call or streaming product. Use them to verify local encoding and decoding first, then integrate transport, buffering, and session policy with measured latency and memory margins.

## Three-Channel Mixing

The **Three-Channel Audio Mixer Player** reads three local audio files, decodes each stream, resamples non-48 kHz input where needed, combines the mono PCM streams, and plays the result. The documented sample set contains two MP3 files and one WAV file.

This is the right baseline for simultaneous prompts, effects, and music, where the product must decide which sounds can overlap. It is not a ready-made audio policy: define stream priority, volume control, clipping behavior, memory budget, and what happens when an input file or decoder misses its deadline. Use [Audio Server and Buffering](audio-server-buffering.md) to make those runtime boundaries explicit.

## Adapt an Example Without Losing Its Evidence

<div align="center"><em>Table: Product-Adaptation Checks for Audio Examples</em></div>

<div align="center" markdown>

| Boundary | Keep from the example | Re-validate for the product |
|:---------|:----------------------|:----------------------------|
| Hardware | Known-good board routing and supported peripheral path | Microphone or speaker part, gain, rails, pin mux, layout, and production test access |
| Configuration | Minimum enabled SDK components | Memory, filesystem, codecs, Audio Manager, and feature flags actually required by the product |
| Audio data | Sample format and known-good files | Sample rate, channel count, buffer sizes, latency target, and error handling |
| Runtime behavior | Basic capture or playback sequence | Concurrent UI, Bluetooth, storage, low-power transitions, recovery, and teardown |
| Evidence | Upstream expected behavior | Serial log, capture/playback artifacts, measured current, and repeatable regression test |

</div>

## Related Resources

- [Audio Overview](overview.md) for interfaces, session shapes, power considerations, and validation.
- [Audio Server and Buffering](audio-server-buffering.md) for stream ownership, DMA buffers, and product-load testing.
- [Examples](../../develop/examples/index.md) for the cross-domain SDK example catalogue.
- [SiFli-SDK Audio Example Index](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/example/multimedia/audio/index.html) for the current official list and individual setup instructions.

!!! note "Auto-generated content"
    This page was compiled/drafted without an existing source document. Verify technical claims against SiFli's official documentation before relying on them.
