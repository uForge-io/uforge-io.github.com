---
icon: lucide/layers
tags:
    - Develop
    - Zephyr
---

# Zephyr

OpenSiFli has active Zephyr work in [OpenSiFli/zephyr-downstream](https://github.com/OpenSiFli/zephyr-downstream) and [OpenSiFli/zephyr-hal_sifli-downstream](https://github.com/OpenSiFli/zephyr-hal_sifli-downstream). The downstream tree includes the `sf32lb52_devkit_lcd` board, SiFli HAL integration, SF32LB52 devicetree files, drivers, tests, and sample overlays.

Use Zephyr when you want Zephyr APIs, devicetree, Kconfig, portable RTOS structure, or a path that connects to ArduinoCore-zephyr. Use SiFli-SDK when you need the most complete vendor feature coverage today.

Primary references:

- [OpenSiFli/zephyr-downstream](https://github.com/OpenSiFli/zephyr-downstream)
- [OpenSiFli/zephyr-hal_sifli-downstream](https://github.com/OpenSiFli/zephyr-hal_sifli-downstream)
- [Zephyr project documentation](https://docs.zephyrproject.org/)

## Verified Downstream Board

<div align="center"><em>Table: Verified Downstream Board</em></div>

<div align="center" markdown>

| Item | Value |
|:-----|:------|
| Board | `sf32lb52_devkit_lcd` |
| Full name | SF32LB52-DevKit-LCD |
| SoC | `sf32lb525uc6` |
| Flash runner | `sftool` |
| Runner argument | `--chip=SF32LB52` |
| Console | `usart1` |
| Console speed | `1000000` baud |
| Display chosen node | `co5300` |

</div>

The downstream board documentation describes the SF32LB52x-MOD-N16R8 module with 8 MB OPI-PSRAM, 128 Mb QSPI-NOR, 48 MHz and 32.768 kHz crystals, display interfaces, audio, USB, and microSD hardware.

## Build Smoke Test

Use the downstream tree and build:

```bash
west build -b sf32lb52_devkit_lcd samples/hello_world --pristine
```

Then flash:

```bash
west flash
```

Open the console on `usart1` at `1000000` baud and look for `Hello World!`.

## Board Hardware Notes

The downstream board documentation lists:

- SF32LB52x-MOD-N16R8 module based on SF32LB525UC6.
- 8 MB OPI-PSRAM.
- 128 Mb QSPI-NOR.
- 48 MHz and 32.768 kHz crystals.
- SPI/DSPI/QSPI and MCU/8080 display interfaces.
- I2C touch support.
- Analog microphone input and analog audio output with onboard Class-D PA.
- USB Type-C ports for USB-to-serial and USB 2.0 FS.
- microSD over SPI.

## Driver Areas Present in the Downstream Tree

The downstream tree contains SF32LB-related drivers, bindings, or board-specific sample configuration for areas including:

- GPIO, pinctrl, UART, I2C, SPI, ADC, PWM, RTC, watchdog.
- Flash, memory controller, OPI PSRAM, QSPI NOR.
- Display/LCDC/MIPI DBI and LVGL sample configuration.
- Bluetooth HCI mailbox and BAP broadcast sink configuration.
- Audio codec, DMA, CRC, crypto, entropy, OTP/eFuse, regulators, reset, and temperature sensor.

Presence in the tree does not mean every product scenario is production-ready. Validate the exact sample and driver combination on the target board.

## Practical Next Steps

- Start with `samples/hello_world`.
- Validate `samples/basic/blinky`.
- Validate `samples/drivers/uart/async_api`.
- Try display with the LVGL sample configuration.
- Move to storage, Bluetooth, audio, and power only after basic board I/O is stable.

## Downstream Risk Checklist

- Are you using OpenSiFli downstream rather than upstream Zephyr?
- Is the HAL revision pinned?
- Does `west flash` use the expected `sftool` runner?
- Is the console configured for `1000000` baud?
- Are required overlays included for the sample?
- Is the driver marked supported by tests or only present in-tree?

## SiFli Team Should Add

- A public support statement for downstream vs. upstream Zephyr.
- Exact setup instructions for `west init` / `west update`.
- A sample status matrix for `sf32lb52_devkit_lcd`.
- Console wiring diagrams and download-mode photos.
- CI artifacts for hello world, blinky, UART, LVGL, filesystem, Bluetooth, and audio smoke tests.
- A clear upstreaming roadmap.

!!! note "Auto-generated content"
    This page was compiled/drafted without an existing source document. Verify technical claims against SiFli's official documentation before relying on them.
