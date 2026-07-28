---
icon: lucide/brain-circuit
title: "AI Overview"
description: "Overview of building on-device AI on SF32: choosing a device, using the NNACC HAL, budgeting memory, and scheduling inference within the power budget."
tags:
  - AI
---

# Overview { #ai-overview }

## Overview

This overview covers the practical side of building on-device AI features on SF32 — getting a model from a workstation onto the chip, choosing the right device, budgeting memory, and scheduling inference so it doesn't wreck the product's power budget. It assumes the hardware background from [AI Accelerator Architecture](accelerator.md) — read that first if you want the "why" behind the accelerator before the "how" of using it.

The accelerator hardware is exposed through the SDK's **NNACC** (neural network accelerator) HAL module, with example projects covering both the bare HAL interface and RT-Thread device-driver integration. As with graphics and Bluetooth, the fastest path to a working feature is almost always adapting one of these examples rather than writing an inference pipeline from scratch.

Use this page when you own the product decision and deployment path for an AI feature: what the device must decide locally, how much memory and energy it may consume, and how the feature should behave when it meets real sensor data. It complements the accelerator article, which explains the hardware boundary.

## Define What the Product Needs to Decide Locally

Start from the product decision, not the model:

- What must the device classify or detect on its own, without a phone or cloud round-trip?
- What sensor(s) feed that decision — motion, audio, biometric, camera, or a combination?
- How often must the decision run, and how quickly must it respond?
- What happens if the on-device model is wrong — is a false positive or false negative more costly?
- Will the model ever need to be updated in the field, and how?

These answers shape everything downstream: model size, memory budget, device selection, and how aggressively you can sleep between inferences.

## Pick the Right SF32 Device

Not every SF32 device targets AI workloads the same way:

<div align="center"><em>Table: Pick the Right SF32 Device</em></div>

<div align="center" markdown>

| Requirement | Typical Device Direction |
|:------------|:-------------------------|
| Lightweight, occasional classification on a cost-optimized product | SF32LB52x — keep models small and CPU-oriented. |
| BLE wearable with basic sensor-fusion needs | SF32LB55x |
| Richer sensor or multimedia pipeline alongside UI | SF32LB56x |
| Edge AI as a primary feature — larger models, camera input, or tight latency | SF32LB58x |

</div>

**SF32LB58x** is the current family's primary recommendation for edge AI, offering the most memory and overall performance headroom. If the product's core value proposition depends on on-device AI, start the device evaluation there rather than trying to squeeze a demanding model into a cost-optimized part. See [Device-Family Positioning](accelerator.md#device-family-positioning) for the full breakdown.

## The Model Development Workflow

At a practical level, getting a model onto SF32 hardware follows the same shape regardless of the specific use case:

1. **Train or select a model** on a workstation, using data that actually resembles what the sensor will see in the field — lab-clean data often behaves very differently from noisy real-world sensor input.
2. **Shrink it for embedded constraints** — through architecture choice, pruning, or quantization — before worrying about accelerator-specific conversion.
3. **Convert** the model into a format the SDK/NNACC runtime supports.
4. **Validate numerically** after conversion and quantization; don't assume desktop accuracy carries over unchanged.
5. **Integrate** pre-processing, inference, and post-processing into firmware — the model is one function call inside a larger pipeline.
6. **Profile** latency, memory, power, and accuracy on real hardware, not just in simulation.
7. **Test under realistic combined load** — Bluetooth, display, and sensors active at the same time as inference, not in isolation.

The most common failure mode is spending all the optimization effort on the model itself while treating pre-processing, buffering, and post-processing as an afterthought — in practice those stages are often just as expensive as the accelerated inference call.

## Define the Runtime Contract

Before converting a model, write down the exact runtime contract firmware must satisfy:

<div align="center"><em>Table: Define the Runtime Contract</em></div>

<div align="center" markdown>

| Contract Item | Decision to Lock Down |
|:--------------|:----------------------|
| Input shape | Sample window, image size, channel count, tensor layout. |
| Numeric format | Integer width, scale/zero-point handling, calibration dataset. |
| Operator set | Layers that must run on NNACC vs. allowed CPU fallback. |
| Latency target | End-to-end pipeline latency, not just accelerator time. |
| Memory ceiling | Weights, activations, input/output tensors, pre/post buffers. |
| Update policy | Whether the model can be changed through OTA and how it is validated. |

</div>

This contract should be reviewed by both the ML and firmware owners. If the model changes shape, format, or operator mix without updating firmware, failures often appear as bad accuracy or unstable latency rather than a clean build error.

## Operator and Fallback Review

Treat unsupported operators as a first-order design risk. A model can be small and still perform poorly if one frequent layer falls back to CPU or forces repeated memory conversion. During model selection, classify every operation:

<div align="center"><em>Table: Operator and Fallback Review</em></div>

<div align="center" markdown>

| Class | Meaning | Action |
|:------|:--------|:-------|
| Accelerated | Supported directly by the NNACC path for the target device. | Preferred for hot layers. |
| CPU fallback | Supported by firmware but not accelerated. | Accept only for infrequent or cheap operations. |
| Conversion needed | Requires layout, type, or format conversion. | Include conversion cost in latency and power budget. |
| Unsupported | Not available in the target runtime. | Replace the layer or change the model architecture. |

</div>

The pass criterion is not “the model runs.” The pass criterion is “the full pipeline meets accuracy, latency, memory, and energy targets with the same data distribution the product sees in the field.”

## Quantization and Memory Budgeting

Microcontroller-class AI depends on compact, quantized models — typically 8-bit integer rather than floating point. Before committing to a model architecture, budget memory for all of the following, not just the weights:

<div align="center"><em>Table: Quantization and Memory Budgeting</em></div>

<div align="center" markdown>

| Memory Consumer | Notes |
|:------------------|:------|
| Model weights | Reduced significantly by quantization, but still the baseline footprint. |
| Input tensors | Sized by sensor window, image resolution, or audio frame length. |
| Intermediate activations | Easy to underestimate; can exceed weight size for some architectures. |
| Output tensors | Usually small, but don't forget them in the budget. |
| Pre/post-processing buffers | Filtering, framing, feature extraction, and thresholding all need working memory. |
| Concurrent system memory | UI, Bluetooth, and audio buffers competing for the same SRAM/PSRAM at the same time. |

</div>

Quantization can meaningfully shrink memory and compute cost, but validate accuracy after conversion — a model that performs well on a workstation can degrade after quantization, especially if it wasn't trained or calibrated with quantization in mind. Also confirm every operator in the model is actually supported by the target runtime; an unsupported operator can force an expensive CPU fallback that erases the accelerator's benefit.

## Buffer Placement and the Memory Hierarchy

AI workloads are often bandwidth-bound rather than compute-bound. On SF32 devices with SRAM, Flash, PSRAM, and STAR-MC1's instruction/data caches, where a buffer lives matters:

- Place frequently accessed tensors and intermediate buffers where both the CPU and accelerator can reach them efficiently.
- Keep large model weights or infrequently accessed assets in external memory if SRAM can't hold everything, but account for the latency cost.
- Follow the SDK's cache-coherency rules for any buffer shared between the CPU, DMA, and the accelerator — clean before the accelerator reads CPU-written data, invalidate before the CPU reads accelerator-written data.

See [STAR-MC1](../architecture/star-mc1.md#memory-system-optimization) for cache and memory-system considerations in this kind of mixed access pattern.

## Memory Sizing Worksheet

Use a memory worksheet before firmware integration. Fill it out with worst-case numbers, not average-case estimates:

<div align="center"><em>Table: Memory Sizing Worksheet</em></div>

<div align="center" markdown>

| Buffer | Size Driver | Placement Preference |
|:-------|:------------|:---------------------|
| Raw input window | Sensor rate x channels x window length | DMA-capable memory if captured by peripheral. |
| Pre-processing workspace | Filters, FFT/MFCC, normalization, resize/crop | Fast SRAM when reused every inference. |
| Model weights | Quantized model size | Flash/PSRAM if supported; SRAM for hot sections only. |
| Activations | Largest intermediate tensors | Fast memory accessible to accelerator. |
| Output/post-processing | Classes, boxes, scores, smoothing state | SRAM; usually small but latency-sensitive. |
| Coexistence buffers | Audio, display, Bluetooth, logging | Budget concurrently, not after AI “fits.” |

</div>

Leave headroom for stack, heap, RTOS objects, logging, and OTA. A model that fits only when every other subsystem is disabled is not a product-ready model.

## Building the Full Pipeline

The accelerator is one stage in a larger sensor-to-decision pipeline. Two feeder pipelines come up constantly:

### Audio and Voice

Keyword spotting, wake-word-style triggers, and audio event classification all need microphone capture, framing, and feature extraction before inference even starts. See the [Audio Overview](../audio/overview.md) for the capture and buffering side of this pipeline — the accelerator only helps if the audio feeding it is captured and buffered efficiently in the first place.

### Motion and Sensor Fusion

Gesture recognition, activity classification, and biometric signal analysis typically consume accelerometer, gyroscope, or other sensor streams. The power-sensitive part here is sampling policy, not inference itself — batching samples and using interrupt-driven capture (rather than polling) usually matters more for battery life than model size does. See the [Low-Power Overview](../low-power/overview.md#ai-and-sensor-power-tuning) for scheduling guidance.

### Camera and Image Input

Camera-based inference is the most demanding case: larger frames, higher memory bandwidth, and correspondingly higher power. If camera input is required, plan for reduced frame size, region-of-interest processing, and a model architecture specifically designed for embedded inference rather than porting a desktop-scale vision model directly.

## Power-Aware Inference Scheduling

Inference should be scheduled deliberately, not run on a fixed timer regardless of whether there's meaningful input:

- Trigger inference from new, useful data (a sensor threshold, a buffered audio frame, an event) rather than a blind periodic timer.
- Batch samples where latency requirements allow, instead of running many small inferences.
- Where the device and SDK support it, move lightweight always-on sensing to the low-power processor rather than waking the main application CPU for every sample.
- Measure **energy per inference**, not just latency — a faster inference only helps the power budget if it lets the system return to sleep sooner afterward.

Full system-level power guidance lives in the [Low-Power Overview](../low-power/overview.md) — treat that as the companion document for any AI feature that needs to run continuously or near-continuously.

## The Accuracy / Latency / Power Tradeoff

Every embedded AI feature sits somewhere on a three-way tradeoff:

<div align="center"><em>Table: The Accuracy / Latency / Power Tradeoff</em></div>

<div align="center" markdown>

| Priority | Typical Design Pressure |
|:---------|:--------------------------|
| Higher accuracy | Larger model, more input features, longer window, more memory. |
| Lower latency | Smaller model, shorter window, more frequent wakeups. |
| Lower power | Less frequent inference, compact model, efficient memory placement, aggressive sleep between runs. |

</div>

Decide which corner of this tradeoff the product actually needs before tuning — a gesture detector can often trade a little latency for battery life, while a voice trigger usually can't tolerate much delay but must also avoid false wakeups that waste power.

## Model Update and Field Validation

If the AI feature may improve after launch, design model update support early:

- Version the model separately from firmware when possible, and record the expected input contract with the model package.
- Validate model integrity before activation, and keep a rollback path if an updated model fails startup checks.
- Store calibration, thresholds, and post-processing constants with the model version that requires them.
- Log enough field statistics to diagnose drift without storing private raw sensor data unnecessarily.
- Re-run power and coexistence tests after every model update; a model accuracy improvement can still be a product regression if it wakes the system more often.

## Debugging AI Performance and Accuracy

<div align="center"><em>Table: Debugging AI Performance and Accuracy</em></div>

<div align="center" markdown>

| Symptom | Likely Area to Check |
|:--------|:----------------------|
| Model runs but accuracy drops vs. workstation results | Quantization/calibration mismatch, or training data not representative of real sensor noise. |
| Inference is slower than expected | Unsupported operator falling back to CPU, or a memory bottleneck rather than a compute bottleneck. |
| System never reaches expected sleep depth | Inference scheduled on a fixed timer instead of event-driven triggers. |
| Feature works standalone but fails in the full product | Not tested under combined load (Bluetooth + display + sensors active together). |
| High power despite a "fast" model | Measuring latency instead of energy per inference; codec/sensor path left active between runs. |
| Intermittent garbage output on shared buffers | Missing cache clean/invalidate between CPU and accelerator access. |

</div>

## Common Mistakes

- Choosing a model architecture before checking which operators the target runtime actually accelerates.
- Porting a desktop-scale model instead of designing for embedded constraints from the start.
- Ignoring the memory cost of intermediate activations and only budgeting for model weights.
- Running inference on a fixed timer instead of triggering it from real events.
- Validating accuracy only on clean lab data, never on realistic field/sensor noise.
- Testing the AI feature in isolation and only discovering coexistence problems after full product integration.
- Optimizing model latency while ignoring the pre- and post-processing stages around it.

## Bring-Up Checklist

- [ ] Define the local decision the product needs to make and the acceptable latency/accuracy/power tradeoff.
- [ ] Select the SF32 device based on model size and memory needs, not just cost target.
- [ ] Build and validate the full pipeline (capture -> pre-processing -> inference -> post-processing) with a minimal test model first, then with the production model.
- [ ] Convert and quantize the real model, then validate accuracy against realistic sensor data.
- [ ] Budget memory for weights, input/output tensors, and intermediate activations together.
- [ ] Validate cache-coherency handling for any CPU/accelerator shared buffers.
- [ ] Switch from timer-driven to event-driven inference scheduling.
- [ ] Profile energy per inference under combined system load (Bluetooth, display, sensors active).
- [ ] Re-validate accuracy and power after any quantization, model, or scheduling change.

## Key Takeaways

- Start from the product decision and sensor data, not the model architecture — the model is one stage in a larger pipeline.
- SF32LB58x is the primary device for serious edge-AI workloads; smaller family members are better suited to lightweight, occasional inference.
- Budget memory for the whole pipeline (weights, tensors, activations, pre/post-processing buffers), not just the model file size.
- Schedule inference from real events, and measure energy per inference — this matters more for battery life than raw model speed.
- Test accuracy on realistic field data and test the full feature under combined system load, not in isolation.

!!! note "Auto-generated content"
    This page was compiled/drafted without an existing source document. Verify technical claims against SiFli's official documentation before relying on them.
