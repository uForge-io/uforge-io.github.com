---
icon: lucide/circuit-board
tags:
    - Develop
    - SiFli-SDK
---

# Board Configuration

Board configuration ties firmware to real hardware: flash layout, PSRAM, pins, display interface, audio path, clocking, power rails, and default peripherals.

In SiFli-SDK, the `--board=<board_name>` value is the most important build input. It selects the board support package used by the example.

## What the Board Name Controls

The selected board can affect:

- Chip and package variant.
- Flash and PSRAM layout.
- HCPU/LCPU build targets.
- Pin mux and peripheral availability.
- UART download settings.
- Display and touch configuration.
- Audio codec routing.
- Bluetooth configuration.
- Partition table and boot assumptions.

## Practical Rules

- Do not guess the board name from the marketing name.
- Do not copy a board name from Zephyr or Arduino into SiFli-SDK.
- Keep the board schematic or dev kit page open when choosing GPIO, ADC, PWM, I2C, SPI, or display resources.
- Start from the closest SDK example for the same board.
- Rebuild cleanly after switching boards.

## Board Bring-Up Checklist

- [ ] Confirm the chip variant and package.
- [ ] Confirm external flash and PSRAM size.
- [ ] Confirm power source and charger behavior.
- [ ] Confirm 48 MHz and 32.768 kHz clock sources.
- [ ] Confirm download UART and log UART.
- [ ] Confirm display and touch interface.
- [ ] Confirm audio path if used.
- [ ] Confirm boot pins and reset behavior.
- [ ] Confirm partition layout.

Do not begin application debugging until the board configuration matches the hardware in front of you.

## Cross-Framework Name Examples

<div align="center"><em>Table: Cross-Framework Name Examples</em></div>

<div align="center" markdown>

| Context | Example name |
|:--------|:-------------|
| SiFli-SDK | `sf32lb52-lcd_n16r8` |
| Zephyr downstream | `sf32lb52_devkit_lcd` |
| ArduinoCore-zephyr FQBN | `sifli:sf32lb52:sf32lb52devkitlcd` |

</div>

These names refer to closely related SF32LB52 DevKit LCD work, but they are not interchangeable.

## When Porting to a Custom Board

Start from the closest dev kit or module configuration, then change:

1. Flash and PSRAM configuration.
2. Pin mux.
3. Console/download UART.
4. Display/touch/audio resources.
5. Power and charger assumptions.
6. Partition layout.
7. Product-specific peripherals.

Validate each change with the smallest example that exercises it.

## SiFli Team Should Add

- A canonical board identity table across SDK, CodeKit, Zephyr, Arduino, hardware pages, and purchase names.
- Board revision notes.
- Exact flash and PSRAM variants.
- Default serial console routing and baud rate.
- A quick way to find the board support files in the SDK tree.

!!! note "Auto-generated content"
    This page was compiled/drafted without an existing source document. Verify technical claims against SiFli's official documentation before relying on them.
