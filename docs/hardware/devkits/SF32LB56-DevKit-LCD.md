---
icon: lucide/circuit-board
description: "SF32LB56-DevKit-LCD development board: an SF32LB56xV module-based display, audio, storage, and peripheral-development platform."
tags:
    - Hardware
    - Development board
    - SF32LB56
---

# SF32LB56-DevKit-LCD

SF32LB56-DevKit-LCD is a display-oriented development board built around the SF32LB56-MOD-A128R12N1 module, which uses an SF32LB56xV-series device. Use it to evaluate display interfaces, audio, removable storage, and peripheral drivers before designing a custom SF32LB56x board.

## What It Is Best For

- Display applications using MIPI-DPI (RGB), SPI, DSPI, QSPI, or 8-bit MCU/8080 interfaces.
- Touchscreen integration through I2C.
- Audio experiments with analog microphone input and analog output through the onboard Class-D power amplifier.
- SDIO/TF-card storage and general peripheral-driver development.
- Evaluating an SF32LB56 module-based product architecture before committing to a carrier board.

## Board Resources

<div align="center"><em>Table: SF32LB56-DevKit-LCD Resources</em></div>

<div align="center" markdown>

| Resource | Board implementation | Practical use |
|:---------|:---------------------|:--------------|
| Core module | SF32LB56-MOD-A128R12N1 with an SF32LB56xV-series device | Module-based SF32LB56 evaluation and carrier-board planning. |
| Display | MIPI-DPI RGB FPC connector; SPI/DSPI/QSPI and 8-bit MCU/8080 signals on the 40-pin header | Panel bring-up and display-driver development. |
| Touch | I2C touchscreen support | Interactive-display prototypes. |
| Audio | Analog MIC input; analog output with onboard Class-D PA | Recording, prompts, and local playback experiments. |
| Storage | MicroSD slot through SDIO | Media, logging, filesystem, and asset tests. |
| USB and debug | Two USB Type-C connectors; USB-to-UART for flashing/debug plus USB 2.0 FS | Power, serial logs, download/debug, and USB evaluation. |
| RF | Onboard antenna by default; IPEX selection through a 0 Ω option | Antenna and enclosure evaluation with the module configuration. |

</div>

The official board guide describes the module configuration as an SF32LB566VCB36 with co-packaged PSRAM and QSPI-NAND Flash, but explicitly notes that some configuration details may change at official release. Confirm the fitted module and memory configuration on the board in hand before using it as a product baseline.

## First Validation Path

1. Connect a compatible display module and use the USB-to-UART port with a data-capable USB cable.
2. Follow [Getting Started](../../getting-started/index.md) to establish a known-good build, flash, and serial-log baseline.
3. Bring up solid display patterns before debugging a UI framework; see [Graphics Overview](../../learn/graphics/overview.md).
4. Add touch, storage, audio, or wireless one subsystem at a time, then test coexistence and power behavior.
5. Before a custom design, review [SF32LB56-MOD](../modules/SF32LB56-MOD.md) and [Design for Production](../design-for-production.md).

## Reference

SiFli maintains the detailed board guide, GPIO assignment, header/interface definitions, power notes, flash/debug procedure, and related design documents: [SF32LB56-DevKit-LCD Development Board User Guide](https://wiki.sifli.com/en/board/sf32lb56x/SF32LB56-DevKit-LCD.html).
