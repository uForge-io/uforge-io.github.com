---
icon: lucide/network
title: "Architecture Overview"
description: "SF32 architecture overview: application processors, dedicated subsystem processors, and SF32LB57 PTM hardware offload—where each belongs in a product design."
tags:
    - Architecture
    - Learn
---

# Overview { #architecture-overview }

SF32 devices combine application processing, memory resources, and dedicated subsystem hardware so that a product does not have to make its main CPU handle every timing-sensitive or always-on task—or work that dedicated hardware can perform more efficiently, such as graphics processing and bit-level operations. This section organizes the architecture material around four engineering decisions: where application code runs, where code and buffers reside, which work belongs to a wireless controller, and when a dedicated task engine is appropriate.

## Start with the Workload

<div align="center"><em>Table: Choose the Architectural Detail You Need</em></div>

<div align="center" markdown>

| If you need to decide… | Start here | What it clarifies |
|:----------------------|:-----------|:-----------------|
| How application firmware executes and interacts with the memory system | [STAR-MC1](star-mc1.md) | The Cortex-M33-compatible application-processor model, cache behavior, and workload characteristics on relevant SF32 devices. |
| Where code, assets, and large or latency-sensitive buffers should reside | [PSRAM vs. Other Embedded Memory Types](psram-and-memory-types.md) | The trade-offs between PSRAM, SRAM, DRAM, RRAM, and MRAM, including capacity, latency, persistence, bandwidth, and power. |
| Which Bluetooth work stays in the controller and which belongs to product firmware | [Bluetooth Processor](../bluetooth/processor.md) | The boundary between controller timing, host/application responsibilities, RF considerations, and low-power operation. |
| Whether a custom peripheral workflow needs a programmable task engine | [PTM Parallel Task Machine](ptm-parallel-task-machine.md) | PTM, introduced with the SF32LB57x family, offloads compact timing-sensitive peripheral work that does not fit a fixed-function peripheral. |
| Whether the selected device actually provides the required architecture and interfaces | [SF32 Family](../../sf32-products/family/SF32_family.md) | Part selection depends on the complete device, including memory, interfaces, wireless, and accelerator availability. |

</div>

## Practical Decision Rule

Work through the architecture in this order:

1. Keep product logic, user-interface behavior, application policy, and ordinary drivers on the application firmware path. Use the STAR-MC1 material to assess processor and cache behavior in the context of the selected device and workload, rather than relying on a generic benchmark expectation.
2. Make memory placement an early design decision. Put latency-critical code and data where the selected memory hierarchy supports them, and budget external-memory capacity, interface bandwidth, and power before committing to a UI, audio, AI, or connectivity workload.
3. Keep Bluetooth controller timing and product-level policy separate. The Bluetooth processor material helps identify the controller, host, application, RF, and low-power boundaries that must be designed together.
4. For custom peripheral work, first check whether an existing timer, DMA path, UART, SPI, I2C, audio, display, or Bluetooth mechanism already fits. On SF32LB57x, consider PTM only when the requirement is genuinely timing-sensitive or cannot be expressed cleanly through those standard blocks.

For every decision, verify the selected device's documented capabilities before assuming that an architectural block is present or user-programmable. This is especially important for PTM: it was introduced with SF32LB57x, so a design based on it must not be carried to another SF32 family without checking that device's documentation.

!!! note "Auto-generated content"
    This page was compiled/drafted without an existing source document. Verify technical claims against SiFli's official documentation before relying on them.
