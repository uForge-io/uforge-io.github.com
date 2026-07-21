---
icon: lucide/bug
tags:
    - Develop
    - Debugging
---

# Debugging and Diagnostics

SF32 debugging starts with serial logs, but real product work needs crash dumps, trace capture, shell commands, and repeatable reproduction notes.

## First-Line Debugging

Use the serial console to collect:

- Boot logs.
- Application prints.
- RT-Thread shell output.
- Fault messages.
- Download and reset behavior.

Keep logs with board revision, SDK branch, build command, flash command, and serial settings.

## Debugging Order

1. Reproduce with the same firmware.
2. Reproduce after reset.
3. Reproduce after full reflash.
4. Reproduce from the closest SDK example.
5. Add product changes back one at a time.

This keeps hardware, board support, middleware, and application bugs from blending together.

## Tools to Know

<div align="center"><em>Table: Tools to Know</em></div>

<div align="center" markdown>

| Tool | Use |
|:-----|:----|
| `sftool` | Flashing and scripted download flows. |
| `AssertDump` | Crash dump analysis when available in the SDK toolchain. |
| `SiFli_Trace` / `UsartServer` | Trace and UART log capture workflows. |
| RT-Thread shell | Runtime inspection, device lists, thread lists, and quick checks. |

</div>

## What to Inspect First

<div align="center"><em>Table: What to Inspect First</em></div>

<div align="center" markdown>

| Symptom | First checks |
|:--------|:-------------|
| Hard fault or assert | Stack size, null pointers, DMA buffers, cache maintenance. |
| Peripheral silent | Pin mux, clock, power rail, board name, driver enable. |
| Bluetooth unstable | RF clock, antenna path, stack config, connection parameters. |
| Display artifacts | Panel timing, buffer format, cache/DMA synchronization. |
| Random reset | Watchdog, power rail, brownout, stack overflow. |

</div>

## Crash Report Checklist

When reporting a crash, include:

- Board and revision.
- Chip variant.
- SDK branch or commit.
- Exact example or project.
- Build command and board name.
- Flash command.
- Serial boot log from reset.
- Crash dump or assert output.
- Whether the issue reproduces on a clean SDK example.

## SiFli Team Should Add

- Links from SDK docs to each diagnostic tool.
- Minimal examples for `AssertDump`, `SiFli_Trace`, and `UsartServer`.
- A standard crash-report template.
- A guide showing how to map fault addresses back to symbols.
- Known limitations for debug probes, UART logs, and shell availability by board.
- A decision tree for "build failure, flash failure, boot failure, runtime failure."

!!! note "Auto-generated content"
    This page was compiled/drafted without an existing source document. Verify technical claims against SiFli's official documentation before relying on them.
