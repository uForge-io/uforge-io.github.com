---
icon: lucide/package
description: "SiFli-SDK as the reference SF32 development path: core scons/menuconfig workflow, board naming, project structure, and production-readiness questions."
tags:
    - Develop
    - SiFli-SDK
---

# SiFli-SDK

SiFli-SDK is the reference development path for SF32 firmware. It is the best-supported route for RT-Thread-based applications, Bluetooth, graphics, audio, power management, storage, board bring-up, and production firmware work.

Use the [SiFli-SDK Getting Started](../../../getting-started/sifli/getting-started-sifli-sdk.md) page for first installation and `hello_world`. This page explains how to think about the SDK once the toolchain already works.

Primary references:

- [SiFli-SDK install guide](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/quickstart/install/index.html)
- [SiFli-SDK supported boards](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/supported_boards/index.html)
- [OpenSiFli/SiFli-SDK](https://github.com/OpenSiFli/SiFli-SDK)

## When to Use SiFli-SDK

Choose SiFli-SDK when you need:

- The broadest SF32 feature coverage.
- Vendor examples for Bluetooth, display, audio, power, storage, USB, and OTA.
- RT-Thread integration and shell tooling.
- Board-level configuration through SDK board names such as `sf32lb52-lcd_n16r8`.
- Access to SiFli-specific middleware, tools, partition layouts, and production flows.

## Development Model

The [SiFli-SDK Getting Started](../../../getting-started/sifli/getting-started-sifli-sdk.md) page establishes the toolchain and a `hello_world` baseline. After that, treat the SDK environment, selected board, example/project directory, configuration, generated output, and download artifact as one versioned unit. A build creates a board-specific output directory, typically `build_<board_name>_hcpu/`; use the generated download artifact for that exact build rather than reusing one from a different board or configuration.

For repeatable development, pin an SDK branch, record the board name, keep local board changes separate from vendor files, and make configuration changes in small, reviewable steps. The detailed build, download, and monitoring workflow is in [Build, Flash, Monitor](build-flash-monitor.md).

## Board Names

SiFli-SDK board names are SDK-specific and may not match Zephyr board names, Arduino FQBNs, or marketing board names. Always copy the board name from the SDK supported-boards list or from the example documentation.

For the SF32LB52 DevKit LCD class, the common SDK board name used in first-run examples is:

```text
sf32lb52-lcd_n16r8
```

## Project Structure

Most SDK examples follow the pattern:

```text
example/<domain>/<example_name>/<rtos_or_mode>/project
```

For example:

```text
example/get-started/hello_world/rtt/project
```

When building product firmware, start from the closest working SDK example and change one subsystem at a time. That keeps board configuration, middleware dependencies, partition assumptions, and driver setup intact.

## Configuration

Use `menuconfig` when an example or board needs feature changes:

```bash
scons --board=<board_name> --menuconfig
```

Common reasons to enter configuration:

- Enable or disable middleware.
- Change Bluetooth roles or profiles.
- Adjust display, filesystem, or audio support.
- Tune power management.
- Select logging or shell options.

## Production Readiness Questions

Before committing to SiFli-SDK for a product branch, answer:

- Which SDK release branch is frozen for the product?
- Which board support files are product-owned vs. vendor-owned?
- Which examples prove the critical features?
- Which partition table is used for manufacturing and OTA?
- Which tools are approved for factory flashing?
- Which logs are enabled in release builds?
- Which recovery image is kept for lab use?

## Practical Next Pages

- [Build, Flash, Monitor](build-flash-monitor.md)
- [Board Configuration](board-configuration.md)
- [Components and `sf_pkg`](components.md)
- [Partition Tables](../../firmware-topics/partition-tables.md)
- [Debugging and Diagnostics](debugging-diagnostics.md)

## SiFli Team Should Add

- A short table mapping every public dev kit to its SDK board name.
- A release-selection rule for `release/vX.Y` branches instead of hardcoding old branch names.
- A first-run log sample for each supported board.
- A side-by-side comparison of SDK board name, Zephyr board name, and Arduino FQBN.
- A release-selection note explaining when users should choose a `release/vX.Y` branch, a newer release branch, or `main`.

!!! note "Auto-generated content"
    This page was compiled/drafted without an existing source document. Verify technical claims against SiFli's official documentation before relying on them.
