---
icon: lucide/list-checks
description: "Schematic and PCB review checklist for SF32LB55x designs, covering power, clock, RF, storage, display, and manufacturing checks."
tags:
 - Hardware
 - Chip
 - Checklist
---

# SF32LB55x Hardware Design Checklist

## 1. Introduction

This checklist is the complete schematic and PCB review reference for products based on the SF32LB55x family. It is derived from SiFli's official *SF32LB55x Schematic & PCB Checklist* workbook (V1.0, 2026-01-21) and keeps the source workbook order, row numbering, applicability, Required/Optional status, and review highlighting.

Use it as the formal design-review gate: complete the schematic checklist before PCB layout starts, then complete the PCB layout checklist before Gerber release. For release review, keep a filled copy with both the initial-review and follow-up-review results.

The checklist spans multiple SF32LB55x package and silicon groupings, including the 551/555/557 devices and the SS6600A8 variant called out in SiFli's source materials. Confirm the exact target part number, package, and display/storage architecture before marking rows pass or fail; many items apply only to specific power rails, memory paths, or package-dependent interfaces.

Colored text and text with a <span class="flag-yellow">yellow background</span> preserve the review emphasis from the source spreadsheet. The workbook does not explain the reason for each highlight, so treat these marks as additional review flags.

For release work, it is best to treat this page as a sign-off record rather than a reading checklist:

1. Confirm the exact orderable part number and package first.
2. Mark every row as pass, fail, or not applicable during review.
3. Cross-check display, storage, wake-up, and low-power rows against the matching hardware design guide sections.
4. Record package-specific assumptions — especially BGA vs. QFN, DSI vs. SPI display, and QSPI2/QSPI3 storage usage — in the review notes.

## 2. Review Record

<div align="center"><em>Table 2-1: Review Record Template</em></div>

<div align="center" markdown>

| Field | Value |
|:---|:---|
| Customer name | |
| Customer design name | |
| Submission date for review | |
| Initial reviewer | |
| Initial review date | |
| Follow-up reviewer | |
| Follow-up review date | |

</div>

<div align="center"><em>Table 2-2: Document Version History</em></div>

<div align="center" markdown>

| No. | Version | Date | Release Notes |
|:---|:---|:---|:---|
| 1 | V1.0 | 2026-01-21 | Initial release of the Schematic & PCB Checklist document |

</div>

## 3. Schematic Checklist

Each table below covers one schematic functional block. Apply a row only to the variants listed in the Applies To column when that column is present.

### 3.1. Package

<div align="center"><em>Table 3.1-1: Package Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | The package of the selected part number is correct, including pin names and pin numbers | All variants | Required |

</div>

### 3.2. Power Supply

<div align="center"><em>Table 3.2-1: Power Supply Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | VDD1 supply voltage is 1.8 V-3.3 V | 551/555/557 only | Required |
| 2 | VDD1 supply voltage is 3.3 V | SS6600A8 only | Required |
| 3 | VDD2 supply voltage is 1.8 V-3.3 V | 555/557 only | Required |
| 4 | BUCK1_VSW and BUCK1_VOUT connections are correct | All variants | Required |
| 5 | BUCK2_VSW and BUCK2_VOUT connections are correct | 555/557 only | Required |
| 6 | LDOVCC2_VOUT connection is correct | 555/557 only | Required |
| 7 | AVDD_DSI supply voltage is 1.8 V | 555/557 only | Required |
| 8 | LDO_VOUT1 output has a test point, or a filter capacitor convenient for voltage measurement | All variants | Required |
| 9 | LDO_VOUT2 output has a test point, or a filter capacitor convenient for voltage measurement | All variants | Required |
| 10 | VDD_RET output has a test point, or a filter capacitor convenient for voltage measurement | All variants | Required |
| 11 | VDD_RTC output has a test point, or a filter capacitor convenient for voltage measurement | All variants | Required |
| 12 | VDD_SIP supply voltage is 1.8 V, and a load switch is provided so it can be shut off | 551/555/557 only | Required |
| 13 | VDD_SIP supply voltage is 3.3 V, and a load switch is provided so it can be shut off | SS6600A8 only | Required |
| 14 | AVDD33 supply voltage is 3.3 V | All variants | Required |
| 15 | AVDD_BRF supply voltage is 1.8 V-3.3 V and must match the VDD1 supply | 551/555/557 only | Required |
| 16 | AVDD_BRF supply voltage is 3.3 V | SS6600A8 only | Required |
| 17 | VDDIOA supply voltage is 1.8 V-3.3 V; reserve a 0 Ω series resistor in the first board revision | 551/555/557 only | Required |
| 18 | VDDIOB supply voltage is 1.8 V-3.3 V; reserve a 0 Ω series resistor in the first board revision | 551/555/557 only | Required |
| 19 | VDDIOA supply voltage is 3.3 V; reserve a 0 Ω series resistor in the first board revision | SS6600A8 only | Required |
| 20 | VDDIOA supply voltage is 3.3 V; reserve a 0 Ω series resistor in the first board revision | SS6600A8 only | Required |
| 21 | When SF30147C supplies power, the TWI control interface must use MCU PB pins, and those pins must be PD pins | 551/555/557 only | Required |
| 22 | When SF30147C supplies power, rails controlled by EN must use PVDD or AVDD as the EN power domain; do not control EN from an MCU GPIO. Alternatively, tie EN to ground and control the corresponding rail output through registers | 551/555/557 only | Required |
| 23 | When SF30147C supplies power, BUCK and LDO1 can only be controlled by their respective enable signals, EN_BUCK and EN_LDO1; internal register control is not provided | 551/555/557 only | Required |
| 24 | Charging circuit requires path management so the system can be powered from the charger 5 V input when battery voltage is too low | All variants | Required |

</div>

### 3.3. Power Supply Capacitors and Inductors

<div align="center"><em>Table 3.3-1: Power Supply Capacitors and Inductors Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | VDD1 bulk capacitor is at least 10 uF | All variants | Required |
| 2 | VDD2 capacitor is at least 10 uF | 555/557 only | Required |
| 3 | BUCK1_VOUT capacitor is 4.7 uF | All variants | Required |
| 4 | BUCK2_VOUT capacitor is 4.7 uF | 555/557 only | Required |
| 5 | AVDD_DSI capacitor is at least 10 uF | 555/557 only | Required |
| 6 | LDO_VOUT1 capacitor is 4.7 uF | All variants | Required |
| 7 | LDO_VOUT2 capacitor is 4.7 uF | All variants | Required |
| 8 | VDD_RET capacitor = 0.47 uF | All variants | Required |
| 9 | VDD_RTC capacitor = 1 uF | All variants | Required |
| 10 | VDD_SIP capacitor is at least 1 uF | All variants | Required |
| 11 | AVDD33 capacitor is at least 1 uF | All variants | Required |
| 12 | AVDD_BRF capacitor is at least 1 uF | All variants | Required |
| 13 | VDDIOA capacitor is at least 1 uF | All variants | Required |
| 14 | VDDIOB capacitor is at least 1 uF | All variants | Required |
| 15 | VDD1, VDD2 (555 only), AVDD_BRF, and the RESET pull-up supply must be the same | All variants | Required |
| 16 | BUCK1 inductor is a SiFli-recommended part number | 551/555/557 only | Required |
| 17 | BUCK2 inductor is a SiFli-recommended part number | 555/557 only | Required |
| 18 | If the BUCK inductor is not SiFli-recommended, it meets L = 4.7 uH, DCR &lt;= 0.4 ohm, and Isat &gt;= 450 mA | All variants | Required |
| 19 | If GPS or other interference-sensitive peripherals are present, reserve a shunt-to-ground capacitor footprint at BUCK_LX; the value depends on actual test results | All variants | Required |
| 20 | When converting VBAT to 1.8 V for VDD1 and VDD2 (555 only), use a DCDC converter; do not use an LDO | 551/555/557 only | Required |
| 21 | Quiescent current of the selected DCDC is recorded and meets project requirements | All variants | Required |
| 22 | Quiescent current of the selected LDO is recorded and meets project requirements | All variants | Required |

</div>

### 3.4. Clock

<div align="center"><em>Table 3.4-1: Clock Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | Main 48 MHz crystal is an AVL-listed part number | All variants | Required |
| 2 | If the 48 MHz crystal is not AVL-listed, it meets 7 pF ≤ CL ≤ 12 pF (8.8 pF recommended), frequency tolerance ≤±10 ppm, ESR ≤30 Ω (22 Ω recommended) | All variants | Required |
| 3 | RTC 32.768 kHz crystal is an AVL-listed part number | All variants | Required |
| 4 | If the 32.768 kHz crystal is not AVL-listed, it meets CL ≤12.5 pF (7 pF recommended), frequency tolerance ≤±20 ppm, ESR ≤80 kΩ (38 kΩ recommended) | All variants | Required |
| 5 | <span class="flag-yellow">If the 32.768 kHz crystal is omitted, the XI pad must be grounded</span> | All variants | Required |

</div>

### 3.5. Reset

<div align="center"><em>Table 3.5-1: Reset Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | RSTN is pulled up to the same supply as VDD1 | All variants | Required |
| 2 | RSTN reserves a 0.1 uF capacitor to ground | All variants | Required |
| 3 | RSTN has ESD protection | All variants | Required |

</div>

### 3.6. Ground Signals

<div align="center"><em>Table 3.6-1: Ground Signals Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | All AVSS signals are connected to GND | 555/557 only | Required |
| 2 | All VSS signals are connected to GND | 555/557 only | Required |
| 3 | EPAD signal is connected to GND | 551/SS6600A8 only | Required |

</div>

### 3.7. Boot Mode

<div align="center"><em>Table 3.7-1: Boot Mode Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | MODE defaults to a 10 kΩ pull-down to ground and is pulled up to VDDIOA during programming/download | All variants | Required |
| 2 | MODE signal has a reserved test point | All variants | Required |
| 3 | If PCB space allows, reserve a 3-pin header so pull-up or pull-down can be selected with a jumper cap | All variants | Required |

</div>

### 3.8. RF

<div align="center"><em>Table 3.8-1: RF Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | The ANT signal is annotated with the single-ended 50 Ω characteristic-impedance requirement | All variants | Required |
| 2 | A Pi-type matching network is reserved on the ANT signal: a parallel NC (do-not-populate) capacitor and a 15 pF series capacitor | All variants | Required |
| 3 | If spurious-emission filtering is required, reserve a Pi network with a 3.0 nH series inductor and a 1.5 pF shunt capacitor | All variants | Optional |
| 4 | If an external PA or LNA must be controlled, connect PB05 to RX_EN and PB25 to TX_EN | All variants | Optional |

</div>

### 3.9. I/O Resource Allocation

<div align="center"><em>Table 3.9-1: I/O Resource Allocation Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | A GPIO resource-allocation table matching the schematic is provided | All variants | Required |
| 2 | The GPIO allocation in the resource table matches the schematic | All variants | Required |
| 3 | The actual GPIO allocation follows SiFli recommendations; refer to the EVB I/O config file | All variants | Required |

</div>

### 3.10. Hardware Wake-up

<div align="center"><em>Table 3.10-1: Hardware Wake-up Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | HCPU wake-up interrupt sources are correct: PA77, PA78, PA79, and PA80; do not use them for power-key wake-up | All variants | Required |
| 2 | LCPU wake-up interrupt sources are correct: PB43, PB44, PB45, PB46, PB47, and PB48, six pins total, can be used for power-key wake-up | All variants | Required |
| 3 | Interrupt and control signals for LCPU-side peripherals such as G-sensor and heart-rate sensor must connect to PB GPIOs | All variants | Required |
| 4 | The LCPU interrupt source corresponding to UART3 is used correctly; it is recommended only for button wake-up | All variants | Required |

</div>

### 3.11. Storage

<div align="center"><em>Table 3.11-1: Storage Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | QSPI2 is designed using the priority PSRAM &gt; NOR flash &gt; NAND flash | All variants | Required |
| 2 | If code runs from the internal SiP NOR flash, VDD_SIP power-switch control is PA58 | All variants | Required |
| 3 | If code runs from external NOR flash on QSPI2, QSPI2 power-switch control is PA58 | All variants | Required |
| 4 | If external flash on QSPI2 must be programmed in production, its power switch must be controlled by PA58 | All variants | Required |
| 5 | The voltage switch controlled by PA58 is active-high on and active-low off | All variants | Required |
| 6 | 33 Ω series resistors are recommended on Flash CLK and data lines | All variants | Required |
| 7 | QSPI3 is connected to NAND flash or eMMC as intended | 555/557 only | Optional |
| 8 | QSPI3 power-switch control is PA41; QSPI3 power defaults off, and an active-high switch should use the default internal pull-down | 555/557 only | Optional |
| 9 | If QSPI3 power-switch control is not PA41, confirm the alternate IO with software | 555/557 only | Optional |
| 10 | If external flash on QSPI3 must be programmed in production, its power switch must be controlled by PA58 | 555/557 only | Required |
| 11 | OPI PSRAM power-switch control is PA70; PSRAM power defaults on, and an active-high switch should use the default internal pull-up | 555/557 only | Optional |
| 12 | The OPI PSRAM is a supported model and is qualified in the key-component selection guide | 555/557 only | Optional |
| 13 | OPI PSRAM signal connections are correct | 555/557 only | Optional |
| 14 | QSPI2 signal connection is correct | All variants | Optional |
| 15 | QSPI3 signal connection is correct | All variants | Optional |
| 16 | <span class="flag-yellow">When using SF32LB555 or SF32LB557, confirm heart-rate-sensor algorithm size; if LCPU space is insufficient, add external 1 MB flash on QSPI4</span> | 555/557 only | Required |
| 17 | The peripheral device's I/O logic level matches the main chip's | All variants | Required |
| 18 | NOR flash is qualified in the key-component selection guide | All variants | Required |
| 19 | NAND flash is qualified in the key-component selection guide | All variants | Required |

</div>

### 3.12. Display

<div align="center"><em>Table 3.12-1: Display Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | SF32LB555xxxx connects the display through DSI + LCDC2 as intended | 555/557 only | Required |
| 2 | SF32LB551xxxx connects the display through LCDC1 as intended | 551/SS6600A8 only | Required |
| 3 | LCDC1 QSPI signal connections are correct; 100 Ω series resistors are recommended on CLK and data lines | All variants | Required |
| 4 | LCDC1 MCU8080 signal connections are correct | All variants | Required |
| 5 | DSI signal connections are correct | 555/557 only | Required |
| 6 | LCDC2 QSPI signal connection is correct | 555/557 only | Required |
| 7 | DSI_REXT is connected to GND through a 10 kΩ resistor | 555/557 only | Required |
| 8 | The LCDC RSTB connection is correct | All variants | Required |
| 9 | LCDC TE connection is correct (connects to the panel's TE or Fmark signal) | All variants | Required |
| 10 | SPI LCD, 3-wire mode: CS connected to GPIO22 or PA31 or PB33, CLK connected to GPIO23 or PA20 or PB32, DATA connected to GPIO21 or PA34 or PB35; <br>4-wire mode: CS connected to GPIO22 or PA31 or PB33, CLK connected to GPIO23 or PA20 or PB32, DATA connected to GPIO21 or PA34 or PB35, DC connected to GPIO20 or PA36 or PB36 | All variants | Required |
| 11 | TP signals follow the recommended pin assignment (refer to the EVB I/O config file) | All variants | Required |
| 12 | The peripheral device's I/O logic level matches the main chip's | All variants | Required |
| 13 | For panel display, connect the LCD QSPI interface to MCU PA pins; LCD_EN, LCD_RST, and similar control signals are recommended on PB GPIOs | 551/SS6600A8 only | Required |
| 14 | For always-on display support, connect the LCD QSPI interface to MCU PA pins, or use the LCD MIPI interface to the MCU; control signals such as LCD_EN and LCD_RST are recommended on PB GPIOs | 555/557 only | Required |

</div>

### 3.13. GPADC

<div align="center"><em>Table 3.13-1: GPADC Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | GPADC input is connected to the corresponding pin | All variants | Optional |
| 2 | GPADC input range is correct; maximum input voltage must not exceed 1.0 V | All variants | Optional |
| 3 | Battery-voltage divider recommendation: 1 MΩ 1% resistor on the supply side, 220 kΩ 1% resistor to ground, and 100 nF filter capacitor | All variants | Required |
| 4 | For every resistor-divider signal measured by GPADC, use 1%-tolerance divider resistors; each GPADC channel must have a 100 nF filter capacitor placed close to the chip pin | All variants | Required |

</div>

### 3.14. SDMADC

<div align="center"><em>Table 3.14-1: SDMADC Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | SDMADC input is connected to the corresponding pin | 555/557 only | Optional |
| 2 | SDMADC input range is correct; maximum input voltage should not exceed 1.2 V | 555/557 only | Optional |
| 3 | SDMADC_VREF and SDMADC_VSS_VREF connections are correct | 555/557 only | Required |

</div>

### 3.15. Buttons

<div align="center"><em>Table 3.15-1: Buttons Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | Confirm with the customer whether the button requires wake-up capability | All variants | Required |
| 2 | Button connection is correct: pull-up present, correct resistor value, and correct pull-up voltage domain | All variants | Required |
| 3 | Power button must use PB43, PB44, PB45, PB46, PB47, or PB48 | All variants | Required |
| 4 | All button signals have ESD protection | All variants | Required |

</div>

### 3.16. EOS and ESD Protection

<div align="center"><em>Table 3.16-1: EOS and ESD Protection Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | Charging interface has EOS, ESD, and OVP design | All variants | Required |
| 2 | Charger-insertion detection signal has an ESD device | All variants | Required |
| 3 | Battery interface has an ESD device | All variants | Required |
| 4 | Antenna interface has an ESD device | All variants | Required |
| 5 | LCD and TP power interfaces have ESD devices | All variants | Required |
| 6 | TP I2C, RST, and INT lines have ESD devices | All variants | Required |
| 7 | Heart-rate sensor power interface and signal lines have ESD devices | All variants | Required |

</div>

### 3.17. I2C

<div align="center"><em>Table 3.17-1: I2C Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | I2C assignment accounts for HCPU/LCPU partitioning and whether the device must run in low-power mode | All variants | Required |
| 2 | I2C has pull-ups with the correct resistor value; if 400 kHz operation is required, 2.2 kΩ pull-ups are recommended. Use the peripheral-side voltage domain and shut the pull-up supply off with the peripheral at power-down | All variants | Required |
| 3 | I2C interrupt signal supports hardware wake-up where required | All variants | Required |
| 4 | If multiple devices share one I2C bus, their addresses are distinguished | All variants | Required |

</div>

### 3.18. I2S

<div align="center"><em>Table 3.18-1: I2S Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | I2S1 is input-only; the microphone is connected to I2S1 as intended | All variants | Optional |
| 2 | I2S2 supports input and output; the audio decoder or codec is connected to I2S2 as intended | All variants | Optional |
| 3 | I2S signal connections are correct | All variants | Optional |
| 4 | I2Sdual MIC connection is correct | All variants | Optional |
| 5 | Microphone part specification is confirmed and supported by the chip | All variants | Optional |
| 6 | If MCLK is required, its connection is confirmed correct | All variants | Optional |
| 7 | The peripheral device's I/O logic level matches the main chip's | All variants | Optional |

</div>

### 3.19. PDM

<div align="center"><em>Table 3.19-1: PDM Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | PDM connection is correct | 555/557 only | Optional |
| 2 | PDM dual-mic connection is correct | 555/557 only | Optional |
| 3 | Microphone part specification is confirmed and supported by the chip | 555/557 only | Optional |
| 4 | The peripheral device's I/O logic level matches the main chip's | 555/557 only | Optional |

</div>

### 3.20. SPI

<div align="center"><em>Table 3.20-1: SPI Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | SPI connection is correct: MCU SDO connects to peripheral SDI, and MCU SDI connects to peripheral SDO | All variants | Optional |
| 2 | SPI peripheral timing requirements are confirmed and supported | All variants | Optional |
| 3 | The peripheral device's I/O logic level matches the main chip's | All variants | Optional |

</div>

### 3.21. USART

<div align="center"><em>Table 3.21-1: USART Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | USART3 is designed as the download and log interface | All variants | Required |
| 2 | USART3 has test points and a pull-up resistor if required; a 100 Ω series resistor is recommended and may be adjusted for the actual design | All variants | Required |
| 3 | Devices that must run on HCPU are connected to USART1 or USART2 | All variants | Optional |
| 4 | Devices that must run on LCPU are connected to USART4 or USART5 | All variants | Optional |
| 5 | When connecting to a peripheral, MCU RXD connects to peripheral TXD and MCU TXD connects to peripheral RXD | All variants | Required |
| 6 | The peripheral device's I/O logic level matches the main chip's | All variants | Required |
| 7 | Unused USART test points are reserved for backup use | All variants | Optional |
| 8 | If UART1 connects to a device, test points are reserved | All variants | Required |
| 9 | If UART connects to a UART-to-USB chip, RX and TX must be disconnectable | All variants | Required |
| 10 | UART connected to peripherals is recommended to use the HCPU interface to avoid HCPU software using an LCPU UART interface | All variants | Required |

</div>

### 3.22. PWM

<div align="center"><em>Table 3.22-1: PWM Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | Backlight PWM pin allocation is correct; use a GPTIMx different from the motor, preferably on the PB interface, to avoid HCPU frequency reduction affecting the backlight | All variants | Optional |
| 2 | Motor PWM pin allocation is correct; use a GPTIMx different from the backlight, preferably on the PB interface, to avoid HCPU frequency reduction affecting vibration | All variants | Optional |
| 3 | Motor PWM control pin is recommended on the PB interface, preferably PB24 or PB25, to avoid abnormal behavior during programming when an SMT motor is used | All variants | Optional |
| 4 | Signals that need PWM output must use the PB interface; also check for cold-boot abnormal behavior | All variants | Optional |

</div>

### 3.23. Debug

<div align="center"><em>Table 3.23-1: Debug Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | SWD signal connections are correct | All variants | Optional |
| 2 | The J-Link connector or test points correctly reserve the I/O power supply reference | All variants | Optional |
| 3 | <span class="flag-yellow">For SF32LB555x XXXX production programming, in addition to PVDD, VDDIOA, VDDIOB, VDDSIP, AVDD33, and AVDD_BRF, AVDD_DSI must also be powered</span> | 555/557 only | Required |

</div>

### 3.24. USB

<div align="center"><em>Table 3.24-1: USB Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | USB interface connection is correct | All variants | Optional |
| 2 | USB interface has ESD protection | All variants | Optional |
| 3 | During normal non-sleep operation, as long as USB remains enabled, the PC/device side can sense insertion and removal; <br>If MCU sleeps, must sense insertion and removal, add a VBUS resistor-divider circuit, the divider outputs a high level matching the IO voltage, feed into an MCU wake-up pin, sharing the charger-insertion detection wake pin is recommended | All variants | Optional |

</div>

### 3.25. Power Consumption

<div align="center"><em>Table 3.25-1: Power Consumption Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | QFN GPIO27 and BGA PA01 are not recommended as inputs because an internal 20 kΩ pull-down can cause a low high-level voltage with a large pull-up resistor or excessive leakage with a small pull-up resistor | All variants | Required |
| 2 | If QFN GPIO27 or BGA PA01 is used as an output, confirm the controlled circuit defaults inactive when the I/O is not driven. Prefer using it for high-current operating scenarios because driving a 1.8 V high level introduces about 90 uA leakage | All variants | Required |
| 3 | If PA01 and PA03 are used as GPIOs, keep the two IO levels consistent during sleep, or place at least one pin in high-impedance state with no pull-up or pull-down | All variants | Required |
| 4 | PA77, PA78, PA79, PA80, and PB43-PB48 are ten wake-capable pins. In Hibernate power-off state they are high impedance and internal PU/PD is disabled; add external pull-up or pull-down if a fixed level cannot otherwise be guaranteed | All variants | Required |
| 5 | If a PB wake-up pin is used for waveform output, reserve external pull-up or pull-down even when Hibernate is not used | All variants | Required |
| 6 | For all MOSFET, LDO, and DCDC enable pins, ensure the required on/off state is maintained in Hibernate with default pull-up or pull-down resistors | All variants | Required |
| 7 | For GPIO signals that control a load by driving high, use a 1 MΩ pull-down when it does not affect function to reduce leakage | All variants | Required |
| 8 | When a PA GPIO output must remain high during sleep, select a PU pin | All variants | Required |
| 9 | When a PA GPIO output must remain low during sleep, select a PD pin | All variants | Required |
| 10 | Hibernate-mode base-current requirement is recorded | All variants | Required |
| 11 | The sum of selected peripheral base currents in Hibernate mode is recorded and meets project requirements | All variants | Required |
| 12 | Standby-mode base-current requirement is recorded | All variants | Required |
| 13 | The sum of selected peripheral base currents in Standby mode is recorded and meets project requirements | All variants | Required |
| 14 | For PB43-PB48 wake pins used as outputs, reserve external pull-up or pull-down because internal pulls are disabled in Standby | All variants | Required |

</div>

### 3.26. Offline Download and Crystal Calibration

<div align="center"><em>Table 3.26-1: Offline Download and Crystal Calibration Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | If an offline-download board is required to program firmware, reserve VBAT, GND, UART3_TXD, UART3_RXD, MODE, and RESET test points | All variants | Optional |
| 2 | If crystal calibration is required, reserve PB08; if PB08 connects to a peripheral as an output, do not add external capacitance | All variants | Optional |

</div>

## 4. PCB Layout Checklist

Each table below covers one PCB layout review area. When an Applies To column is not present, the row applies to all variants covered by the workbook.

### 4.1. Package

<div align="center"><em>Table 4.1-1: Package Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | Footprint matches the package SPEC | All variants | Required |

</div>

### 4.2. Power Supply

<div align="center"><em>Table 4.2-1: Power Supply Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | VDD1 supply trace is at least 8 mil | All variants | Required |
| 2 | VDD2 supply trace is at least 8 mil | 555 only | Required |
| 3 | BUCK1_VSW and BUCK1_VOUT trace is at least 8 mil | All variants | Required |
| 4 | BUCK2_VSW and BUCK2_VOUT trace is at least 8 mil | 555 only | Required |
| 5 | LDOVCC2_VOUT trace is at least 8 mil | 555 only | Optional |
| 6 | AVDD_DSI supply trace is at least 8 mil | 555 only | Required |
| 7 | VDD_SIP supply trace is at least 6 mil | All variants | Required |
| 8 | VDDIOA supply trace is at least 10 mil | All variants | Required |
| 9 | VDDIOB supply trace is at least 10 mil | All variants | Required |

</div>

### 4.3. Power Supply Capacitor and Inductor Placement

<div align="center"><em>Table 4.3-1: Power Supply Capacitor and Inductor Placement Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | VDD1 capacitor is placed close to the pin | All variants | Required |
| 2 | VDD2 capacitor is placed close to the pin | 555 only | Required |
| 3 | BUCK1 inductor is placed close to the chip | All variants | Required |
| 4 | BUCK1 capacitoras much as possibleclose to the chip pin | All variants | Required |
| 5 | BUCK2 inductor is placed close to the chip | 555 only | Required |
| 6 | The 0.1 uF capacitor on AVDD_DSI is placed close to the pin | 555 only | Required |
| 7 | LDO_VOUT1 capacitor is placed close to the pin | All variants | Required |
| 8 | LDO_VOUT2 capacitor is placed close to the pin | All variants | Required |
| 9 | VDD_RET capacitor is placed close to the pin | All variants | Required |
| 10 | VDD_RTC capacitor is placed close to the pin | All variants | Required |
| 11 | VDD_SIP capacitor is placed close to the pin | All variants | Required |
| 12 | AVDD33 capacitor is placed close to the pin | All variants | Required |
| 13 | AVDD_BRF capacitor placed close to the pin | All variants | Required |
| 14 | VDDIOA capacitor is placed close to the pin | All variants | Required |
| 15 | VDDIOB capacitor is placed close to the pin | All variants | Required |

</div>

### 4.4. Clock

<div align="center"><em>Table 4.4-1: Clock Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | Crystal placed close to the chip | All variants | Required |
| 2 | GND shielding applied around the crystal | All variants | Required |
| 3 | Copper keep-out is provided beneath the crystal: at least the top layer on a 4-layer board, and layers 2 and 3 where required | All variants | Required |
| 4 | Crystal-trace clearance to GND guard copper is greater than 3x the trace width | All variants | Required |
| 5 | The 32 kHz crystal signal does not run parallel to BUCK1; ground is placed between them | All variants | Required |

</div>

### 4.5. Buttons

<div align="center"><em>Table 4.5-1: Buttons Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | Button's ESD protection device placed close to the button | All variants | Required |

</div>

### 4.6. RF

<div align="center"><em>Table 4.6-1: RF Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | RF trace meets the single-ended 50 Ω characteristic-impedance requirement | All variants | Required |
| 2 | RF trace width ≥10 mil | All variants | Required |
| 3 | At least 60 mil of ground on each side of the RF trace, with sufficient stitching vias to the main ground | All variants | Required |
| 4 | Reserved Pi-type antenna matching network placed close to the chip side | All variants | Required |
| 5 | Continuous GND plane beneath the RF signal | All variants | Required |
| 6 | No high-speed digital signal traces cross beneath the RF signal | All variants | Required |
| 7 | No high-di/dt power traces cross beneath the RF signal | All variants | Required |

</div>

### 4.7. High-speed Signals

<div align="center"><em>Table 4.7-1: High-speed Signals Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | DSI differential signals meet the 100 Ω differential-impedance requirement | 555 only | Required |
| 2 | DSI data differential pairs are length-matched to the clock differential pair within 200 mil | 555 only | Required |
| 3 | DSI signals are routed on the same layer as much as possible | 555 only | Required |
| 4 | OPI PSRAM signal trace length matching is controlled within 200 mil | 555 only | Optional |

</div>

### 4.8. ADC

<div align="center"><em>Table 4.8-1: ADC Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | GPADC signal has no high-speed changing signal routed in parallel, or is properly guarded | All variants | Required |
| 2 | Battery-voltage divider resistors are placed close to the chip input pin | All variants | Required |
| 3 | Power-voltage sensing signal is routed from the power source and uses ground guarding | All variants | Required |
| 4 | SDMADC signal has no high-speed changing signal routed in parallel, or is properly guarded | 555 only | Optional |

</div>

### 4.9. Test Points

<div align="center"><em>Table 4.9-1: Test Points Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | Test-point locations are suitable for probing or fixture soldering | All variants | Required |
| 2 | Program-download and crystal-calibration test points (VBAT, GND, SWDCLK, SWDIO, MODE, RSTN, VDDIOA, UART3_TXD, UART3_RXD, etc.) are at least 0.8 mm, spaced 2 mm apart, and keep a 2 mm component-free area | All variants | Required |

</div>

### 4.10. Ground

<div align="center"><em>Table 4.10-1: Ground Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | Layers adjacent to the main chip are a complete main-ground plane, with sufficient grounding vias | All variants | Required |
| 2 | Exposed pad (EPAD) is connected to the main ground through vias | All variants | Required |
| 3 | Area under the chip has enough grounding vias connected to the main ground plane | All variants | Required |
| 4 | A ring of grounding vias runs around the board edge | All variants | Required |

</div>

## 5. Related Documents and References

[SiFli Chip Hardware Design Guide Index (Wiki)]: https://wiki.sifli.com/hardware/index.html

<div class="grid cards" markdown>

- :fontawesome-brands-wikipedia-w: __[SiFli Chip Hardware Design Guide Index (Wiki)]__

</div>

Primary source: *SF32LB55x Schematic & PCB Checklist*, V1.0, 2026-01-21, distributed by SiFli alongside the SF32LB55x hardware design materials on the [SiFli Chip Hardware Design Guide Index (Wiki)]. The direct workbook file is not linked separately here, so this reference points to the source index where the checklist is published and maintained.
