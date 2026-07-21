---
icon: lucide/terminal
description: "From an unboxed SF32 board to a running hello_world over UART with SiFli-SDK: install the toolchain, build with scons, and flash via UART download."
tags:
    - Getting started
    - SiFli SDK
---

# SiFli-SDK

This guide takes you from an unboxed SF32 development board to a running `hello_world` example over UART using **SiFli-SDK**, the official RT-Thread-based SDK for SF32 devices.

If you plan to use Arduino, Zephyr, or MicroPython, it is still worth running this guide once. It proves that the board, cable, serial port, flash flow, and baseline toolchain are working before you add another framework.

## What You'll Need

**Hardware**

- An SF32 development board, such as the [SF32LB52-DevKit-LCD](../../hardware/devkits/SF32LB52-DevKit-LCD.md), or another board from the [hardware overview](../../hardware/hardware_overview.md).
- A USB Type-C **data** cable connected to the board's USB-to-UART port, not a charge-only cable or a secondary USB-function port.
- A computer running Windows, macOS, or Linux.

**Software**

- [git](https://git-scm.com/)
- A C/C++ toolchain bootstrapped by [`uv`](https://docs.astral.sh/uv/getting-started/installation/) (SiFli-SDK's installer pulls the compiler, debugger, and Python environment for you)
- The [SiFli-SDK](https://github.com/OpenSiFli/SiFli-SDK) repository itself

**Official references**

- [SiFli-SDK install guide](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/quickstart/install/index.html)
- [SiFli-SDK supported boards](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/supported_boards/index.html)
- [OpenSiFli SiFli-SDK repository](https://github.com/OpenSiFli/SiFli-SDK)

!!! tip "Prefer an IDE?"
    SiFli also publishes a **SiFli-SDK-CodeKit** extension for VS Code that wraps the SDK setup, build, and flash flow into guided actions. See [SiFli CodeKit](getting-started-sifli-codekit.md) if you prefer that workflow.

## Install the Toolchain

=== "macOS / Linux"

    Install `uv`, the package/environment manager SiFli-SDK's scripts are built on:

    ```bash
    curl -LsSf https://astral.sh/uv/install.sh | sh
    ```

    Clone the SDK. Release branches are the safest starting point for initial bring-up:

    ```bash
    mkdir -p ~/OpenSiFli && cd ~/OpenSiFli
    git clone --recursive -b release/v2.4 https://github.com/OpenSiFli/SiFli-SDK
    ```

    Run the installer, then load the SDK environment into your shell:

    ```bash
    cd SiFli-SDK
    ./install.sh
    . export.sh
    ```

=== "Windows"

    Install `uv` (PowerShell):

    ```powershell
    powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
    ```

    Clone the SDK:

    ```powershell
    mkdir C:\OpenSiFli
    cd C:\OpenSiFli
    git clone --recursive -b release/v2.4 https://github.com/OpenSiFli/SiFli-SDK
    ```

    Run the installer, then load the SDK environment:

    ```powershell
    cd SiFli-SDK
    .\install.bat
    .\export.bat
    ```

!!! info "SiFli-SDK contains submodules"
    GitHub's "Download ZIP" option will not include the required submodules. Use `git clone --recursive`. If you already cloned without submodules, run `git submodule update --init --recursive` from the SDK root.

!!! note "Working from mainland China?"
    Set `export SIFLI_SDK_MIRROR_CHINA=1` before running `install.sh`, or clone from the [Gitee mirror](https://gitee.com/SiFli/sifli-sdk) instead of GitHub. See the [install guide](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/quickstart/install/index.html) for details.

`install.sh` / `install.bat` downloads the matching compiler, debugger, and Python dependencies. Re-run it when the SDK version changes. `export.sh` / `export.bat` activates that environment in your current terminal; run it each time you open a new terminal to build.

## Build the "Hello World" Example

With the environment loaded, build the RT-Thread `hello_world` example for your board:

```bash
cd example/get-started/hello_world/rtt/project
scons --board=sf32lb52-lcd_n16r8 -j8
```

Replace `sf32lb52-lcd_n16r8` with your board name. See the [supported boards list](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/supported_boards/index.html) for available names. `-j8` builds with 8 parallel jobs; adjust it for your machine. Output binaries land in `build_<board_name>_hcpu/`.

!!! tip "Need custom settings?"
    Run `scons --board=<board_name> --menuconfig` from the project directory to open an interactive configuration menu, then press ++esc++ twice to save and exit.

## Flash the Board

Keep the board connected via USB, then run the download script produced by the build:

=== "macOS / Linux"

    ```bash
    ./build_sf32lb52-lcd_n16r8_hcpu/uart_download.sh
    ```

    When prompted for the serial port, enter the device's port number. On macOS, use the `/dev/cu.*` device (for example `/dev/cu.usbserial-12345678`), not `/dev/tty.*`.

=== "Windows"

    ```powershell
    build_sf32lb52-lcd_n16r8_hcpu\uart_download.bat
    ```

    When prompted with `please input serial port number`, type just the number from your COM port (e.g. `19` for `COM19`) and press Enter.

!!! tip
    Reset the board right before pressing Enter to start the download. Power-cycling puts it in a reliable state for the UART bootloader to catch.

## See It Run

Once flashing completes, reset the board or let it reset automatically. Open a serial terminal at the board's default baud rate. You should see boot output and the `hello_world` example output over UART.

## Success Check

You are ready to move on when:

- The project builds without errors.
- The UART download script completes.
- The serial console shows readable boot output.
- The `hello_world` example prints after reset.

## Where to Go Next

- **Pick your chip:** compare the LB52, LB55, LB56, and LB58 series on the [SF32 Family Overview](../../hardware/chips/SF32_family.md).
- **Explore more examples:** beyond `hello_world`, the SDK ships examples for BLE, classic Bluetooth, LVGL graphics, audio, and low-power modes.
- **Prefer a different framework:** continue with [Arduino](../arduino/getting-started-arduino.md), [Zephyr](../zephyr/getting-started-zephyr-upstream.md), or [MicroPython](../micropython/getting-started-micropython.md).
- **Stuck:** check the [SiFli FAQ](https://wiki.sifli.com/en/faq/index.html) for common toolchain, J-Link, and debugging issues.

## What SiFli Should Add

This guide is usable today, but it would be stronger if SiFli added:

- A short table mapping each dev kit to its exact `scons --board` name.
- The default UART baud rate for each first-run board.
- Screenshots or sample logs for a successful `hello_world` boot.
- A recovery recipe for interrupted UART downloads.
- A release-selection note explaining when users should choose `release/v2.4`, a newer release branch, or `main`.
