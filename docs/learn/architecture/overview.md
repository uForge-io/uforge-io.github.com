---
icon: lucide/network
title: "Architecture Overview"
description: "SF32 architecture overview: application processors, dedicated subsystem processors, and SF32LB57 PTM hardware offload—where each belongs in a product design."
tags:
    - Architecture
    - Learn
---

# Overview { #architecture-overview }

SF32 devices combine application processing with dedicated subsystem hardware so that a product does not have to make its main CPU handle every timing-sensitive or always-on task. Use this section to decide where work belongs before designing firmware around a single processor by default.

## Start with the Workload

<div align="center"><em>Table: Choose the Architectural Detail You Need</em></div>

<div align="center" markdown>

| If you need to understand… | Start here | Why |
|:----------------------------|:-----------|:----|
| Application firmware execution, memory behavior, and the relationship to the Arm Cortex-M family | [STAR-MC1](star-mc1.md) | It explains the Cortex-M33-compatible application-processor model used in relevant SF32 devices. |
| PSRAM, SRAM, DRAM, RRAM, MRAM, and where large or latency-sensitive buffers belong | [PSRAM and Embedded Memory Types](psram-and-memory-types.md) | It explains the memory trade-offs behind buffer placement, capacity, latency, persistence, and bandwidth. |
| Wireless controller responsibilities and the split from product firmware | [Bluetooth Processor](../bluetooth/processor.md) | It explains how Bluetooth timing and controller work are separated from the application side. |
| Deterministic custom IO or peripheral sequencing on SF32LB57 | [PTM Parallel Task Machine](ptm-parallel-task-machine.md) | PTM offloads compact timing-sensitive peripheral work that does not fit a fixed-function peripheral. |
| Which processor and hardware features a product needs | [SF32 Family](../../hardware/chips/SF32_family.md) | Part selection depends on the complete device, including memory, interfaces, wireless, and accelerator availability. |

</div>

## Practical Decision Rule

Keep product logic, user interface behavior, application policy, and ordinary drivers on the application firmware path. Use dedicated subsystem hardware when the task is explicitly supported there and the benefit is clear: lower wake frequency, deterministic timing, less CPU contention, or lower power.

For a custom peripheral problem, first check whether an existing timer, DMA path, UART, SPI, I2C, audio, display, or Bluetooth mechanism already fits. On SF32LB57, consider PTM only when the requirement is genuinely timing-sensitive or cannot be expressed cleanly through those standard blocks. For all other architecture choices, verify the selected device's documented capabilities before assuming a block is present or user-programmable.

!!! note "Auto-generated content"
    This page was compiled/drafted without an existing source document. Verify technical claims against SiFli's official documentation before relying on them.
