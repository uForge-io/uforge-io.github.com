---
icon: lucide/terminal
description: "The daily SiFli-SDK developer loop: activate the environment, build with scons, flash via UART download or sftool, and monitor serial output."
tags:
    - Develop
    - SiFli-SDK
---

# Build, Flash, Monitor

This page summarizes the daily SiFli-SDK loop: activate the environment, build with `scons`, flash the board, and watch logs.

## Activate the SDK

Run the SDK export script in every new terminal before building:

=== "macOS / Linux"

    ```bash
    cd ~/OpenSiFli/SiFli-SDK
    . export.sh
    ```

=== "Windows"

    ```powershell
    cd C:\OpenSiFli\SiFli-SDK
    .\export.bat
    ```

The install script prepares compilers, Python packages, and debugger/download dependencies. The export script makes those tools visible in the current shell.

## Build

From an example project directory:

```bash
scons --board=<board_name> -j8
```

Use a lower or higher `-j` value depending on your host machine. Output goes into a board-specific build directory.

## Clean Rebuilds

Use a clean rebuild when switching boards, changing major configuration, or chasing a suspicious build artifact. Keep the exact clean command used by the SDK or project in your project notes. If no project-specific clean command is documented, rebuild from a fresh checkout before filing a toolchain issue.

## Flash

The first-run path uses the UART download script produced by the build:

=== "macOS / Linux"

    ```bash
    ./build_<board_name>_hcpu/uart_download.sh
    ```

=== "Windows"

    ```powershell
    build_<board_name>_hcpu\uart_download.bat
    ```

OpenSiFli also publishes [`sftool`](https://github.com/OpenSiFli/sftool), a standalone download tool used by Zephyr and ArduinoCore-zephyr flows. Add `sftool` to your toolbox when you need a consistent flashing path outside an SDK-generated script.

## Monitor

Use the serial terminal configured for the board and example. The serial log should show boot output, RT-Thread startup messages, application prints, or a shell prompt.

Keep a note of:

- Board name.
- Serial port.
- Baud rate.
- Build command.
- Flash command.
- SDK branch or release.

## Daily Developer Loop

<div align="center"><em>Table: Daily Developer Loop</em></div>

<div align="center" markdown>

| Step | Goal |
|:-----|:-----|
| Activate | Load the SDK environment into the current terminal. |
| Configure | Select board and feature options. |
| Build | Produce board-specific binaries. |
| Flash | Put the image on hardware. |
| Monitor | Confirm boot and application behavior. |
| Record | Save command/log details for repeatability. |

</div>

## Start from a Matching Example

Before creating or heavily modifying a project, choose the closest [SDK example](../../examples/index.md) that matches the board and critical subsystem. Build, flash, and monitor that unmodified baseline first; then keep its board name, SDK release, commands, and expected output with the adapted project.

If you use [CodeKit](../../tools/codekit.md), preserve the same evidence and confirm that its editor actions can be reproduced through the SDK command flow.

## Troubleshooting

<div align="center"><em>Table: Troubleshooting</em></div>

<div align="center" markdown>

| Symptom | Check |
|:--------|:------|
| Build tool not found | Re-run `export.sh` / `export.bat` in the current terminal. |
| Board name unknown | Check the SDK supported-boards documentation. |
| Download script cannot open port | Close serial terminals and verify the USB-to-UART cable/connector. |
| Flash does not start | Reset or power-cycle the board before starting the download. |
| Serial output is unreadable | Check baud rate and use the data UART, not a charge-only cable. |

</div>

## Handoff Checklist

Before handing a project to another developer, include:

- SDK branch or commit.
- Board name.
- Setup/install notes.
- Build command.
- Flash command.
- Monitor settings.
- Expected first log lines.
- Recovery command.

!!! note "Auto-generated content"
    This page was compiled/drafted without an existing source document. Verify technical claims against SiFli's official documentation before relying on them.
