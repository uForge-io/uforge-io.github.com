---
icon: lucide/footprints
description: "Beginner SF32 tutorials after hello_world: blink an LED, read a button, use the FinSH shell, sample ADC, drive PWM, and use the RTC, ending in a mini project."
tags:
    - Tutorials
---

# Beginner Tutorials

These tutorials pick up right after [Get Started](../../getting-started/getting-started-overview.md). You should already have the SiFli-SDK toolchain installed, have flashed `hello_world` at least once, and know how to open the serial console. Each tutorial is intentionally small: one concept, one peripheral, one clear success condition.

The examples assume an SF32LB52-DevKit-LCD-class board such as `sf32lb52-lcd_n16r8`. If you are using another board, replace the board name in the build command and confirm the pin names, peripheral instances, and storage layout from that board's support files.

## Before You Start

Use the same basic loop for every tutorial:

```bash
scons --board=<board_name> -j8
# then flash with the download script or tool used in Get Started
```

Keep a serial terminal open. Most beginner mistakes are easier to solve when you can see `rt_kprintf()` output and the FinSH `msh>` prompt.

<div align="center"><em>Table: Before You Start</em></div>

<div align="center" markdown>

| Item | Check |
|:-----|:------|
| Board name | Matches one of the supported board configurations. |
| Serial port | Opens cleanly and shows boot output. |
| Flash tool | Can reprogram the board repeatedly without changing cables. |
| Schematic or board files | Available before choosing GPIO, ADC, PWM, or RTC resources. |
| One change at a time | Build, flash, and verify after each small edit. |

</div>

## Blink an LED with GPIO

**Goal:** control a GPIO pin from firmware, the embedded equivalent of a first successful build.

**Time:** 15 minutes

**Start from:** `example/hal/gpio` or `example/rt_device/gpio`

SF32's RT-Thread-based SDK exposes GPIO through the standard RT-Thread **PIN device** API. A minimal blink loop looks like this:

```c
#include <rtthread.h>
#include <rtdevice.h>

#define LED_PIN GET_PIN(A, 0)  /* replace with your board's LED pin */

int main(void)
{
    rt_pin_mode(LED_PIN, PIN_MODE_OUTPUT);

    while (1)
    {
        rt_pin_write(LED_PIN, PIN_HIGH);
        rt_thread_mdelay(500);
        rt_pin_write(LED_PIN, PIN_LOW);
        rt_thread_mdelay(500);
    }
}
```

1. Copy the closest GPIO example into your own project directory, or edit it in place while learning.
2. Find the LED pin in the schematic or board support files. Do not guess the port and pin numbering.
3. Build and flash with the same board name used for `hello_world`.
4. Confirm the LED blinks at the expected rate.
5. Change the delay to 100 ms, rebuild, and confirm the visible blink rate changes.

**Success criteria:** the LED toggles repeatedly, the serial console still shows normal boot output, and changing the delay changes the blink rate.

**If it does not work:** check the active polarity, whether the LED is connected through a transistor, whether the pin is already used by another function, and whether your board name matches the hardware on your desk.

**What you learned:** the PIN device abstraction, board-specific pin definitions, and the basic edit/build/flash loop.

## Read a Button with GPIO Input

**Goal:** read a digital input and react to a button press.

**Time:** 20 minutes

**Start from:** `example/rt_device/gpio`

Reading a button uses the same PIN API in input mode. Start with a simple read to confirm the wiring and logic level:

```c
rt_pin_mode(BUTTON_PIN, PIN_MODE_INPUT_PULLUP);

if (rt_pin_read(BUTTON_PIN) == PIN_LOW)
{
    /* button pressed, active-low */
}
```

For anything beyond a quick test, attach an interrupt instead of polling in a tight loop. It is more responsive and much better for power:

```c
rt_pin_attach_irq(BUTTON_PIN, PIN_IRQ_MODE_FALLING, button_isr, RT_NULL);
rt_pin_irq_enable(BUTTON_PIN, PIN_IRQ_ENABLE);
```

1. Identify an available button or input pin on your board.
2. Start with a polled read and print the raw value while pressing and releasing the button.
3. Confirm whether the button is active-high or active-low.
4. Switch to an interrupt handler once the basic read works.
5. Toggle the LED from Tutorial 1 each time the button is pressed.
6. Add a simple debounce strategy, either by ignoring events for a short interval or by validating the level after a short delay.

**Success criteria:** one physical press causes one intended firmware action, with no repeated triggers from bounce.

**If it does not work:** verify pull-up or pull-down configuration, button polarity, interrupt edge selection, and whether the pin is shared with boot mode, debug, or another peripheral.

**What you learned:** digital input configuration, active-high vs. active-low logic, interrupt-driven input, and why polling is a power smell. See [Power Guide](../guides/power.md#sleep-aware-firmware-design) for the system-level reason.

## Use the Shell and Print Debug Output

**Goal:** get comfortable with the FinSH console and `rt_kprintf()` before debugging gets harder.

**Time:** 15 minutes

**Start from:** `example/system/finsh`

RT-Thread's **FinSH** shell gives you an interactive `msh>` prompt over the same UART used for boot logs. Build these habits early:

- Use `rt_kprintf()` for lightweight debug logging instead of raw UART writes.
- Use built-in shell commands such as `list_thread`, `list_device`, and memory/status commands to inspect the running system.
- Keep logs short and meaningful; excessive logging can change timing and power behavior.

1. Flash any of the previous examples and reopen your serial terminal.
2. Press Enter to get the `msh>` prompt.
3. Run `list_thread` and `list_device`.
4. Add `rt_kprintf()` calls to the button handler from Tutorial 2.
5. Confirm the logs appear when you press the button.

**Success criteria:** you can inspect threads and devices from the shell and correlate your own log messages with physical events.

**If it does not work:** check serial baud rate, port selection, whether the shell component is enabled, and whether another tool is holding the serial port open.

**What you learned:** how to inspect a running system without a debugger attached, and how to use low-friction logging without turning every problem into a blind firmware guess.

## Read an Analog Sensor with ADC

**Goal:** sample an analog voltage from a potentiometer, simple sensor, or battery-sense input.

**Time:** 20 minutes

**Start from:** `example/hal/adc` or `example/rt_device/adc`

```c
rt_adc_device_t adc = (rt_adc_device_t)rt_device_find("adc1");
rt_adc_enable(adc, channel);
rt_uint32_t raw = rt_adc_read(adc, channel);
```

1. Identify an ADC-capable pin and channel on your board.
2. Confirm the input voltage range and whether there is a divider or analog front-end circuit.
3. Open the ADC device, enable the channel, and read a raw value.
4. Convert the raw reading to a voltage using the board's reference voltage and ADC resolution.
5. Print the result over the shell from Tutorial 3.
6. Move the input slowly and confirm the raw value changes smoothly.

**Success criteria:** raw ADC readings change in the expected direction and convert to a plausible voltage.

**If it does not work:** check pin muxing, channel number, reference voltage, input range, whether the input is floating, and whether the sensor needs power or settling time before sampling.

**What you learned:** the `rt_device_find()` pattern used across RT-Thread device drivers. You will reuse this pattern for I2C, SPI, PWM, storage, and custom drivers.

## Drive a PWM Output

**Goal:** generate a PWM signal to dim an LED or drive a simple buzzer.

**Time:** 20 minutes

**Start from:** `example/rt_device/pwm`

```c
struct rt_device_pwm *pwm = (struct rt_device_pwm *)rt_device_find("pwm1");
rt_pwm_set(pwm, channel, period_ns, pulse_ns);
rt_pwm_enable(pwm, channel);
```

1. Pick a PWM-capable channel and confirm the pin mux.
2. Choose a period that matches the peripheral: high enough to avoid visible LED flicker, or in the audible range for a buzzer.
3. Sweep the duty cycle to fade an LED up and down.
4. Try a few fixed tones on a buzzer by changing the period.
5. Disable the PWM and confirm the output returns to a safe idle state.

**Success criteria:** changing duty cycle changes brightness or changing period changes tone, and disabling PWM leaves the output in the expected state.

**If it does not work:** check whether the pin is routed to the PWM instance, whether the channel number is correct, whether period and pulse are in nanoseconds, and whether the external load needs a driver transistor.

**What you learned:** period/duty-cycle configuration and the same device-driver pattern from Tutorial 4 applied to a different peripheral class.

## Keep Time with the RTC

**Goal:** read and set wall-clock time using the on-chip RTC.

**Time:** 15 minutes

**Start from:** `example/rt_device/rtc`

```c
time_t now = time(RT_NULL);
struct tm *tm_now = localtime(&now);
rt_kprintf("%04d-%02d-%02d %02d:%02d:%02d
",
           tm_now->tm_year + 1900, tm_now->tm_mon + 1, tm_now->tm_mday,
           tm_now->tm_hour, tm_now->tm_min, tm_now->tm_sec);
```

1. Set the RTC time once at startup or through a shell command.
2. Print the current time periodically.
3. Power-cycle the board and confirm whether time is retained.
4. If time is not retained, check the board's backup power path before changing firmware.

**Success criteria:** time increments normally while powered, and retention behavior matches the board hardware.

**If it does not work:** check RTC component enablement, clock source, backup supply, and whether the board resets RTC state during boot.

**What you learned:** the standard C time API on top of RT-Thread's RTC device, plus an early example of how firmware behavior depends on hardware design.

## Mini Project: Button-Controlled Sensor Logger

After finishing the six short tutorials, combine them into one small project:

1. Blink the LED at boot.
2. Use the button to start or stop sampling.
3. Read one ADC value every second while sampling is active.
4. Print timestamped readings through FinSH.
5. Use PWM brightness or buzzer tone to indicate whether sampling is active.

**Pass criterion:** the project runs for several minutes without repeated button triggers, runaway logging, or unexpected resets.

## Beginner Bring-Up Checklist

- [ ] Board name, serial port, and flash flow are known-good.
- [ ] GPIO output works on a real LED or measured pin.
- [ ] GPIO input works with confirmed polarity and debounce.
- [ ] FinSH shell is usable, and `list_thread` / `list_device` work.
- [ ] ADC readings are plausible and converted to engineering units.
- [ ] PWM period/duty settings produce the expected physical output.
- [ ] RTC behavior is understood, including retention limitations.

## Where to Go Next

Once these feel comfortable, move on to [Intermediate Tutorials](intermediate.md). The next tier combines peripherals with middleware: I2C sensors, LVGL, BLE, audio playback, storage, and deliberate coexistence testing.

!!! note "Auto-generated content"
    This page was compiled/drafted without an existing source document. Verify technical claims against SiFli's official documentation before relying on them.
