---
icon: lucide/file-warning
tags:
    - Develop
    - Logging
    - Crash Analysis
---

# Logging and Crash Analysis

Logs are part of the product, not a temporary debug convenience. Good logs shorten bring-up, field debugging, and factory investigation.

Design logging before the first field test. After a device fails in the field, you only get the data the firmware was already prepared to save or print.

## Minimum Logging Setup

For every firmware build, record:

- Firmware version.
- SDK branch or commit.
- Board name and revision.
- Boot reason.
- Partition layout version.
- Major subsystem initialization results.
- Crash/assert output if boot fails.

## Crash Analysis Flow

1. Reproduce on a known board.
2. Capture a full boot log from reset.
3. Save the exact binary and symbols.
4. Decode assert or dump output with SiFli tooling.
5. Check stack sizes, memory ownership, DMA buffers, and cache maintenance.
6. Reduce to the closest SDK example.

## Log Levels

<div align="center"><em>Table: Log Levels</em></div>

<div align="center" markdown>

| Phase | Suggested logging |
|:------|:------------------|
| Board bring-up | Verbose peripheral and boot logs. |
| Feature development | Module-level debug logs around the feature under test. |
| Power tuning | Minimal logs, because logging changes power behavior. |
| Release candidate | Warnings, errors, version, boot reason, and key health checks. |
| Field issue build | Targeted logs around the suspected subsystem. |

</div>

## What Makes a Good Crash Report

- It includes the full reset-to-crash log.
- It identifies the exact binary.
- It includes symbol files or a reproducible build.
- It states whether the crash happens on an unmodified SDK example.
- It lists connected peripherals and power source.
- It says whether the crash survives a full flash erase/reflash.

## SiFli Team Should Add

- A complete AssertDump walkthrough.
- A SiFli_Trace / UsartServer logging walkthrough.
- A crash report template.
- Examples of decoded faults.
- Guidance for log levels in production builds.
- A minimal field-log retention strategy for products without filesystems.

!!! note "Auto-generated content"
    This page was compiled/drafted without an existing source document. Verify technical claims against SiFli's official documentation before relying on them.
