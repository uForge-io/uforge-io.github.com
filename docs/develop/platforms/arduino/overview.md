---
icon: lucide/infinity
tags:
    - Develop
    - Arduino
---

# Arduino

OpenSiFli publishes a beta Arduino core for SF32 based on Zephyr: [OpenSiFli/ArduinoCore-zephyr](https://github.com/OpenSiFli/ArduinoCore-zephyr). It is useful for sketches, quick tests, and early prototypes on the SF32LB52 DevKit LCD.

!!! warning "Beta"
    The OpenSiFli README marks this core as beta. Features, APIs, loader behavior, package contents, and release mechanics may change.

Primary references:

- [OpenSiFli/ArduinoCore-zephyr](https://github.com/OpenSiFli/ArduinoCore-zephyr)
- [Arduino IDE](https://docs.arduino.cc/software/ide/)
- [Arduino CLI](https://docs.arduino.cc/arduino-cli/)

## Package Details

<div align="center"><em>Table: Package Details</em></div>

<div align="center" markdown>

| Item | Value |
|:-----|:------|
| Boards Manager title | SiFli Serial Boards |
| Arduino package | `sifli:sf32lb52` |
| Board | SiFli SF32LB52 DevKit LCD |
| FQBN | `sifli:sf32lb52:sf32lb52devkitlcd` |
| Zephyr target | `sf32lb52_devkit_lcd` |
| Variant | `sf32lb52_devkit_lcd_sf32lb525uc6` |
| Upload tool | `sftool` |
| `LED_BUILTIN` | `13` |

</div>

## Install

Add the package index in Arduino IDE 2.x:

```text
https://github.com/OpenSiFli/ArduinoCore-zephyr/releases/latest/download/package_sifli_index.json
```

China mirror:

```text
https://downloads.sifli.com/github_assets/OpenSiFli/ArduinoCore-zephyr/releases/latest/download/package_sifli_index_cn.json
```

Then install **SiFli Serial Boards** from Boards Manager.

With Arduino CLI:

```bash
arduino-cli core install sifli:sf32lb52 \
  --additional-urls https://github.com/OpenSiFli/ArduinoCore-zephyr/releases/latest/download/package_sifli_index.json
```

## Build and Upload

Use the FQBN and serial port:

```bash
arduino-cli compile \
  --fqbn sifli:sf32lb52:sf32lb52devkitlcd:link_mode=dynamic \
  /path/to/YourSketch

arduino-cli upload \
  -p /dev/cu.usbserial-XXXX \
  --fqbn sifli:sf32lb52:sf32lb52devkitlcd:link_mode=dynamic \
  /path/to/YourSketch
```

The core exposes **Standard** and **Debug** build modes, plus **Dynamic** and **Static** link modes. Start with Standard + Dynamic.

## Mode Selection

<div align="center"><em>Table: Mode Selection</em></div>

<div align="center" markdown>

| Mode | Use when |
|:-----|:---------|
| Standard | You want the sketch to start automatically after upload. |
| Debug | You want the Zephyr shell to wait until you run `sketch`. |
| Dynamic | You want the normal loader-based ArduinoCore-zephyr flow. |
| Static | You are testing a statically linked image or loader-related behavior. |

</div>

## First Sketch

Use serial output before relying on LED behavior:

```cpp
void setup() {
  Serial.begin(115200);
}

void loop() {
  Serial.println("Hello from SF32 Arduino");
  delay(1000);
}
```

Then try Blink:

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
| Package not found | Confirm the package index URL and Arduino IDE 2.x. |
| Upload fails | Put the board in serial download mode and close any serial monitor. |
| Sketch does not start | Confirm Standard vs. Debug mode; in Debug, run `sketch`. |
| Undefined Zephyr symbol | The loader may not export the Zephyr function the sketch needs. |
| Out of memory | Dynamic loading and Zephyr shell consume RAM; reduce usage or test Static mode. |

</div>

## SiFli Team Should Add

- A beta/stable policy for the Arduino core.
- A compatibility table by package version, loader version, Zephyr downstream commit, and board revision.
- A tested Arduino library matrix.
- Clear loader update and recovery instructions.
- Screenshots for IDE install, board selection, mode selection, upload, and serial monitor.
- A documented path from Arduino sketch failure to Zephyr loader logs.
- A "known working sketches" table for each package release.

!!! note "Auto-generated content"
    This page was compiled/drafted without an existing source document. Verify technical claims against SiFli's official documentation before relying on them.
