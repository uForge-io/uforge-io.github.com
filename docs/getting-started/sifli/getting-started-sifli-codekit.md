---
icon: lucide/app-window
description: "First run of SiFli CodeKit in VS Code: install the extension, select an SF32 board, build and flash hello_world, and open the serial console."
tags:
    - Getting started
    - SiFli CodeKit
    - VS Code
---

# SiFli CodeKit

SiFli CodeKit is the VS Code extension for SiFli-SDK development. It provides guided actions for installing SDK tools, selecting a board, building an example, flashing firmware, and opening a serial console.

Use this path if you prefer an IDE workflow. If you want to understand the commands behind the buttons, use the [manual SiFli-SDK guide](getting-started-sifli-sdk.md).

## What You'll Need

**Hardware**

- An SF32 development board supported by SiFli-SDK.
- A USB Type-C data cable connected to the board's USB-to-UART port.
- A computer running Windows, macOS, or Linux.

**Software**

- [Visual Studio Code](https://code.visualstudio.com/)
- The SiFli CodeKit extension.
- Git, if CodeKit asks you to clone or import SiFli-SDK.

**Official reference**

- [SiFli CodeKit getting started](https://docs.sifli.com/projects/codekit/get-started/)

## Install CodeKit

1. Open VS Code.
2. Open **Extensions**.
3. Search for **SiFli-SDK-CodeKit**.
4. Install the extension.
5. Reload VS Code if prompted.

After installation, CodeKit adds SiFli-specific actions to VS Code. Depending on the extension version, they may appear in the Activity Bar, Command Palette, or status bar.

!!! tip
    If you cannot find the action you need, open the Command Palette and search for `SiFli`.

## Install or Select SiFli-SDK

Use CodeKit's setup flow to install SiFli-SDK, or point it at an SDK copy you already cloned.

If CodeKit asks for an SDK location, choose a short path without spaces, for example:

=== "macOS / Linux"

    ```text
    ~/OpenSiFli/SiFli-SDK
    ```

=== "Windows"

    ```text
    C:\OpenSiFli\SiFli-SDK
    ```

CodeKit uses the SDK's own installer and environment scripts. The result should match the manual setup: compiler, Python environment, build tools, and flash tools are prepared together.

## Open an Example

Start from the SDK's `hello_world` example:

```text
example/get-started/hello_world/rtt/project
```

Open that project folder in VS Code. If CodeKit offers a project import wizard, choose the `hello_world` project and let it detect the SDK root.

## Select the Board

Choose the board configuration that matches your hardware. For an SF32LB52-DevKit-LCD-class board, the common board name is:

```text
sf32lb52-lcd_n16r8
```

If you use a different board, select the matching board name from CodeKit's list or from the SDK's supported board documentation. The board name controls memory layout, pins, flash settings, and default peripherals.

## Build

Run CodeKit's **Build** action. A successful build creates a board-specific output folder such as:

```text
build_sf32lb52-lcd_n16r8_hcpu
```

If the build fails immediately, check that CodeKit knows where SiFli-SDK is installed and that the SDK environment has finished installing.

## Flash

Connect the board through the USB-to-UART port, then run CodeKit's **Flash** or **Download** action.

When prompted for a serial port:

- On Windows, choose the matching `COM` port.
- On macOS, choose the `/dev/cu.*` device rather than `/dev/tty.*`.
- On Linux, choose the matching `/dev/ttyUSB*` or `/dev/ttyACM*` device.

Reset the board right before flashing if the download tool has trouble entering boot mode.

## Open the Serial Console

Use CodeKit's serial monitor, VS Code's serial tooling, or another terminal program. After reset, the console should show readable boot output and the `hello_world` example output.

If you see readable boot logs, the board and serial settings are correct. If the output is garbled, close other serial tools and confirm the baud rate used by the example.

## Success Check

You are ready to move on when:

- CodeKit recognizes the SDK location.
- The selected board matches your hardware.
- Build and flash actions complete.
- The serial console shows `hello_world` output after reset.

## Troubleshooting

<div align="center"><em>Table: Troubleshooting</em></div>

<div align="center" markdown>

| Symptom | Check |
|:--------|:------|
| No serial port appears | Try a data cable, another USB port, or the board's USB-to-UART connector. |
| CodeKit cannot find the SDK | Re-run the CodeKit setup flow and select the SiFli-SDK root folder. |
| Build cannot find tools | Let CodeKit reinstall the toolchain, or run the SDK installer manually once. |
| Flash fails to start | Reset or power-cycle the board immediately before download. |
| Serial output is unreadable | Check baud rate and make sure only one serial monitor is open. |

</div>

## Where to Go Next

- Use [SiFli-SDK](getting-started-sifli-sdk.md) to understand the equivalent terminal commands.
- Continue with [Beginner Tutorials](../../learn/tutorials/beginner.md) after `hello_world` works.
- Review [Bluetooth](../../learn/guides/bluetooth.md), [Graphics](../../learn/guides/graphics.md), [Audio](../../learn/guides/audio.md), and [Power](../../learn/guides/power.md) when you start a real product feature.

## What SiFli Should Add

CodeKit documentation would be easier to follow if SiFli added:

- A stable list of CodeKit command names and where they appear in VS Code.
- Screenshots for SDK selection, board selection, build, flash, and monitor.
- A table mapping CodeKit board labels to SDK `scons --board` names.
- A list of supported operating systems and required VS Code versions.
- Recovery steps for failed setup, failed build, failed flash, and busy serial ports.
