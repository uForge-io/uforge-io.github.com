---
icon: lucide/puzzle
description: "Step-by-step first run of OpenSiFli's beta ArduinoCore-zephyr on the SF32LB52 DevKit LCD: install the board package, upload a serial test, and Blink."
tags:
    - Getting started
    - Arduino
---

# Arduino

OpenSiFli has a beta Arduino core for SF32 based on Zephyr: [OpenSiFli/ArduinoCore-zephyr](https://github.com/OpenSiFli/ArduinoCore-zephyr). It publishes the `sifli:sf32lb52` Arduino package, appears in Boards Manager as **SiFli Serial Boards**, and currently targets the **SiFli SF32LB52 DevKit LCD** board.

This is a good path for sketches, quick peripheral checks, demos, and early prototypes. For production firmware, Bluetooth stack tuning, graphics-heavy applications, low-power optimization, or custom board bring-up, use [SiFli-SDK](../sifli/getting-started-sifli-sdk.md).

!!! warning "Beta core"
    OpenSiFli marks this Arduino core as **BETA**. Features, APIs, loader behavior, package contents, and release mechanics may change. Use it for evaluation and feedback until SiFli declares the Arduino path stable.

## What You'll Need

**Hardware**

- SiFli SF32LB52 DevKit LCD.
- A USB Type-C data cable connected to the board's USB-to-UART path.
- A computer running Windows, macOS, or Linux.

**Software**

- [Arduino IDE 2.x](https://www.arduino.cc/en/software) or [Arduino CLI](https://docs.arduino.cc/arduino-cli/).
- The OpenSiFli `sifli:sf32lb52` Arduino package.
- A serial monitor.

## Install the Board Package

Open **Arduino IDE > Settings** and add this URL to **Additional Boards Manager URLs**:

```text
https://github.com/OpenSiFli/ArduinoCore-zephyr/releases/latest/download/package_sifli_index.json
```

For users in mainland China, use the mirrored package index:

```text
https://downloads.sifli.com/github_assets/OpenSiFli/ArduinoCore-zephyr/releases/latest/download/package_sifli_index_cn.json
```

Then open **Boards Manager**, search for **SiFli Serial Boards**, and install the `sifli:sf32lb52` platform.

With Arduino CLI:

```bash
arduino-cli core install sifli:sf32lb52 \
  --additional-urls https://github.com/OpenSiFli/ArduinoCore-zephyr/releases/latest/download/package_sifli_index.json
```

For the China mirror:

```bash
arduino-cli core install sifli:sf32lb52 \
  --additional-urls https://downloads.sifli.com/github_assets/OpenSiFli/ArduinoCore-zephyr/releases/latest/download/package_sifli_index_cn.json
```

## Select the Board

In Arduino IDE, select:

```text
SiFli SF32LB52 DevKit LCD
```

The board FQBN is:

```text
sifli:sf32lb52:sf32lb52devkitlcd
```

The OpenSiFli board definition maps this Arduino board to the Zephyr target `sf32lb52_devkit_lcd` and the variant `sf32lb52_devkit_lcd_sf32lb525uc6`.

## Choose Build Options

The core exposes two important menus:

<div align="center"><em>Table: 3. Choose Build Options</em></div>

<div align="center" markdown>

| Menu | Option | Meaning |
|:-----|:-------|:--------|
| **Build mode** | `Standard` | Sketch starts automatically after loading. |
| **Build mode** | `Debug` | Zephyr shell waits for the `sketch` command. |
| **Link mode** | `Dynamic` | Sketch is packaged for the Zephyr loader. |
| **Link mode** | `Static` | Sketch is linked into a flashable binary. |

</div>

Start with **Standard** and **Dynamic** unless you are debugging loader behavior.

## Put the Board in Serial Download Mode

OpenSiFli documents that first use requires the board to be in serial download mode. Use the boot/reset sequence for the SF32LB52 DevKit LCD, then upload from Arduino IDE or CLI.

The upload tool is `sftool`.

## Upload a Serial Smoke Test

Start with serial output. It confirms upload, reset, runtime startup, and console routing without depending on LED polarity:

```cpp
void setup() {
  Serial.begin(115200);
}

void loop() {
  Serial.println("Hello from SF32 Arduino");
  delay(1000);
}
```

Upload from Arduino IDE, or use Arduino CLI:

```bash
arduino-cli compile \
  --fqbn sifli:sf32lb52:sf32lb52devkitlcd:link_mode=dynamic \
  /path/to/YourSketch

arduino-cli upload \
  -p /dev/cu.usbserial-XXXX \
  --fqbn sifli:sf32lb52:sf32lb52devkitlcd:link_mode=dynamic \
  /path/to/YourSketch
```

Replace `/dev/cu.usbserial-XXXX` with your board's serial port. On Windows, use the matching `COM` port. On Linux, use the matching `/dev/ttyUSB*` or `/dev/ttyACM*` port.

Open the Serial Monitor at `115200` baud. In **Standard** build mode, the sketch should print one line per second. In **Debug** build mode, open the Zephyr shell and run:

```text
sketch
```

## Upload Blink

The SF32LB52 DevKit LCD variant defines:

```cpp
#define LED_BUILTIN 13
```

Try Blink after the serial smoke test succeeds:

```cpp
void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
}

void loop() {
  digitalWrite(LED_BUILTIN, HIGH);
  delay(500);
  digitalWrite(LED_BUILTIN, LOW);
  delay(500);
}
```

## Troubleshooting

<div align="center"><em>Table: Troubleshooting</em></div>

<div align="center" markdown>

| Symptom | Check |
|:--------|:------|
| Package does not appear | Confirm the package index URL and use Arduino IDE 2.x. |
| Upload fails | Put the board in serial download mode and make sure no serial monitor is holding the port. |
| Sketch does not start | Confirm **Build mode**. In `Debug`, run `sketch` from the Zephyr shell. |
| Undefined Zephyr symbol | The core README says missing Zephyr functions may need to be exported in `loader/llext_exports.c` and the loader rebuilt. |
| Zephyr subsystem missing | Enable the required `CONFIG_` option in the board `.conf`, rebuild the loader, and upload it. |
| Out of memory | Zephyr shell and dynamic sketch loading consume RAM; reduce stack usage or switch build mode where appropriate. |

</div>

## What SiFli Team Should Finish

To make this Arduino path production-quality for public users, SiFli should complete the following work:

- **Stability statement:** define what “beta” means, what APIs are supported today, and what must be considered unstable.
- **Release matrix:** publish a table mapping Arduino package versions to Zephyr downstream commits, loader firmware versions, `sftool` versions, and supported board revisions.
- **Board list:** document every supported board, FQBN, Zephyr target, variant directory, chip variant, flash size, PSRAM size, and `LED_BUILTIN` value.
- **Board Manager screenshots:** show the exact package URL field, Boards Manager search result, board menu, build mode menu, link mode menu, and port selection.
- **Download mode instructions:** document the exact button/reset/power sequence for SF32LB52 DevKit LCD, with photos if possible.
- **Serial routing:** specify the default UART, baud rate, USB connector, driver expectations, and how this differs between Standard and Debug modes.
- **Loader lifecycle:** explain when users only upload sketches, when they must update the loader, and how to recover after a bad loader.
- **Dynamic vs. static guidance:** explain memory, startup, debugging, and compatibility tradeoffs for each link mode.
- **API support table:** list status for GPIO, analog read/write, PWM, UART, I2C, SPI, timers, interrupts, filesystem, display, BLE, Wi-Fi stubs, USB, and low power.
- **Known library compatibility:** state which Arduino libraries are tested, which are expected to work, and which are known not to work.
- **Example suite:** include verified `Serial`, `Blink`, GPIO input, PWM fade, I2C scan, SPI loopback or display, UART echo, and BLE examples.
- **Troubleshooting logs:** provide known-good upload logs, boot logs, shell output, and common error messages with fixes.
- **Issue template:** add a bug-report checklist that asks for board revision, package version, FQBN, build mode, link mode, OS, Arduino IDE/CLI version, serial log, and upload log.
- **Graduation criteria:** define what must be true before removing the beta warning from this page.
