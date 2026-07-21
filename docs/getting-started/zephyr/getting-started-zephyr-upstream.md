---
icon: lucide/layers
description: "First run of OpenSiFli's downstream Zephyr workspace on the SF32LB52 DevKit LCD: set up west, build hello_world, flash with sftool, and try board samples."
tags:
    - Getting started
    - Zephyr
---

# Zephyr Downstream

OpenSiFli has active Zephyr work in [OpenSiFli/zephyr-downstream](https://github.com/OpenSiFli/zephyr-downstream) and a SiFli HAL module in [OpenSiFli/zephyr-hal_sifli-downstream](https://github.com/OpenSiFli/zephyr-hal_sifli-downstream). The downstream tree includes an `sf32lb52_devkit_lcd` board and SF32LB52-related drivers, devicetree bindings, tests, and sample overlays.

Use this path when you want Zephyr APIs, Zephyr devicetree, portable RTOS structure, or a bridge toward the ArduinoCore-zephyr flow. Use [SiFli-SDK](../sifli/getting-started-sifli-sdk.md) when you need the most complete official SF32 feature coverage today.

!!! note "Downstream first"
    This page describes the OpenSiFli downstream Zephyr work. Treat upstream Zephyr support as a follow-up milestone unless SiFli publishes an upstreamed board/support matrix.

## What You'll Need

**Hardware**

- SiFli SF32LB52 DevKit LCD, based on the SF32LB52x-MOD-N16R8 module with SF32LB525UC6, 8 MB OPI-PSRAM, and 128 Mb QSPI-NOR.
- A USB Type-C data cable connected to the board's USB-to-UART path.
- A computer running macOS or Linux for the most direct Zephyr workflow. Windows users should use WSL until native instructions are published.

**Software**

- Git.
- Python 3 with `venv` and `pip`.
- CMake, Ninja, and Zephyr build prerequisites.
- `west`.
- The OpenSiFli downstream Zephyr workspace.

## Prepare the Tooling

Install the normal Zephyr host tools for your platform. On Ubuntu-like systems:

```bash
sudo apt install python3-pip python3-setuptools python3-venv build-essential git cmake ninja-build zstd
```

On macOS with Homebrew:

```bash
xcode-select --install
brew install python cmake ninja zstd git
```

Create a Python environment for Zephyr:

```bash
python3 -m venv ~/zephyr-sifli/.venv
source ~/zephyr-sifli/.venv/bin/activate
pip install west
```

## Get the Downstream Workspace

Clone the OpenSiFli downstream tree:

```bash
mkdir -p ~/zephyr-sifli
cd ~/zephyr-sifli
git clone https://github.com/OpenSiFli/zephyr-downstream zephyr
cd zephyr
west update
west zephyr-export
pip install -r scripts/requirements.txt
```

If SiFli publishes a west manifest for a multi-repository workspace, use that manifest instead. The downstream tree currently references SiFli-specific board, SoC, driver, binding, HAL, and sample work directly.

## Confirm the Board

Check that Zephyr sees the SF32 board:

```bash
west boards | grep -i sf32
```

The expected board name is:

```text
sf32lb52_devkit_lcd
```

## Build Hello World

Build Zephyr's standard hello-world sample:

```bash
west build -b sf32lb52_devkit_lcd samples/hello_world --pristine
```

If the build succeeds, the board definition, toolchain, and downstream tree are wired together correctly.

## Flash the Board

Try the board's documented Zephyr flash path:

```bash
west flash
```

The downstream board configuration uses the `sftool` runner with `--chip=SF32LB52`. If `west flash` does not handle your local setup, confirm that `sftool` is installed and that the board is in the correct serial download mode.

## Open the Serial Console

Open the board's console UART. The downstream devicetree routes Zephyr console and shell to `usart1` at `1000000` baud.

Expected output should include:

```text
Hello World! sf32lb52_devkit_lcd
```

## Try Board-Level Samples

After `hello_world`, validate real board I/O. The downstream tree includes SF32LB52 board-specific overlays or configs for areas such as:

- ADC.
- UART async API.
- Memory controller / PSRAM.
- LVGL display sample.
- Filesystem sample.
- PWM tests.
- RTC tests.
- SPI loopback tests.
- Bluetooth BAP broadcast sink configuration.

Start with `samples/basic/blinky` and `samples/drivers/uart/async_api`, then move to display, storage, Bluetooth, and power-sensitive features.

## Troubleshooting

<div align="center"><em>Table: Troubleshooting</em></div>

<div align="center" markdown>

| Symptom | Check |
|:--------|:------|
| `west boards` does not show SF32 | Confirm you are using `OpenSiFli/zephyr-downstream`, not an upstream Zephyr checkout without SiFli board support. |
| Build fails before compiling | Confirm the Python environment is active and Zephyr requirements are installed. |
| Board builds but does not flash | Confirm the downstream `sftool` runner, `sftool` availability, and serial download mode. |
| No serial output | Confirm `usart1`, `1000000` baud, the USB-to-UART connector, and whether another terminal owns the port. |
| Peripheral sample fails | Check board-specific overlays and whether the driver is enabled in Kconfig. |

</div>

## What SiFli Team Should Finish

To make this Zephyr path public-docs quality, SiFli should complete the following work:

- **Status statement:** say whether `zephyr-downstream` is experimental, beta, or supported, and whether/when changes are intended for upstream Zephyr.
- **Workspace instructions:** publish the exact recommended clone/init flow, including whether users should clone `zephyr-downstream` directly or use a west manifest.
- **Toolchain version:** document the Zephyr SDK version, Python version range, CMake/Ninja minimums, and supported host OS versions.
- **Board page:** expand the `sf32lb52_devkit_lcd` board page with board photo, connectors, serial console pins, boot/download buttons, flash layout, PSRAM, display, and supported peripherals.
- **Flash runner:** document `west flash`, the `sftool` runner, `--chip=SF32LB52`, expected port selection behavior, and how this relates to SDK/Arduino flashing.
- **Download mode recovery:** give exact button/reset timing and recovery steps for failed flashes.
- **Feature matrix:** list driver status for GPIO, UART, I2C, SPI, ADC, PWM, RTC, watchdog, flash, PSRAM, display/LVGL, filesystem, Bluetooth HCI/BAP, audio, crypto, entropy, low power, and USB.
- **Sample matrix:** list every sample known to build and run on `sf32lb52_devkit_lcd`, with expected output and any required overlays.
- **Known limitations:** document missing upstream pieces, incomplete drivers, unsupported low-power states, display constraints, Bluetooth limitations, and memory caveats.
- **Console and logging:** state `usart1`, `1000000` baud, shell availability, logging configuration, and crash-log collection method.
- **Upstream plan:** identify which board, SoC, binding, driver, and HAL pieces are intended for upstream Zephyr and which remain downstream-only.
- **CI badge and artifacts:** expose CI status for board builds and publish logs/artifacts for `hello_world`, GPIO, UART, display, filesystem, and Bluetooth smoke tests.
- **Issue template:** request downstream commit, HAL commit, board revision, west manifest, toolchain version, exact build command, flash command, console log, and sample name.
- **Arduino relationship:** explain how `ArduinoCore-zephyr` consumes this downstream, including loader build, variant generation, exported symbols, and when Arduino users need to rebuild Zephyr.
