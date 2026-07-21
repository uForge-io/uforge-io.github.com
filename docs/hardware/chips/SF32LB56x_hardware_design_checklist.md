---
icon: lucide/list-checks
description: "Schematic and PCB review checklist for SF32LB56x designs, covering power, clock, RF, display, audio, and manufacturing checks."
tags:
 - Hardware
 - Chip
 - Checklist
---

# SF32LB56x Hardware Design Checklist

## 1. Introduction

This checklist is the complete schematic and PCB review reference for products based on the SF32LB56x family. It is derived from SiFli's official *SF32LB56x Schematic & PCB Checklist* workbook (V1.0, 2026-01-21) and keeps the source workbook order, row numbering, applicability, Required/Optional status, and review highlighting.

Use it as the formal design-review gate: complete the schematic checklist before PCB layout starts, then complete the PCB layout checklist before Gerber release. For release review, keep a filled copy with both the initial-review and follow-up-review results.

The checklist spans multiple SF32LB56x silicon and package groupings, including the SF32LB56xU family, the SF32LB56xV family, and the SS6700A variant called out in SiFli's source materials. Confirm the exact target part number, package, display path, and storage topology before marking rows pass or fail; many items apply only to specific power rails, memory domains, or package-dependent interfaces.

Colored text and text with a <span class="flag-yellow">yellow background</span> preserve the review emphasis from the source spreadsheet. The workbook does not explain the reason for each highlight, so treat these marks as additional review flags.

For release work, use this page as a sign-off record rather than a reading checklist:

1. Confirm the exact orderable part number and package first.
2. Mark every row as pass, fail, or not applicable during review.
3. Cross-check display, storage, wake-up, and low-power rows against the matching hardware design guide sections.
4. Record package-specific assumptions — especially 56xU vs. 56xV, QFN vs. WBBGA, DSI vs. SPI display, and SD2/MPI3 storage usage — in the review notes.

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
| 1 | The package of the selected part number is correct, including pin names and pin numbers | All chips | Required |

</div>

### 3.2. Power Supply

<div align="center"><em>Table 3.2-1: Power Supply Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | PVDD supply voltage is 1.8 V-3.3 V; 1.8 V is recommended for SF32LB56xU/SF32LB56xV, and 3.3 V is recommended for SS6700A | All chips | Required |
| 2 | BUCK_LX and BUCK_FB connections are correct | All chips | Required |
| 3 | LDO_VOUT1 output has a test point, or a filter capacitor convenient for voltage measurement | All chips | Required |
| 4 | LDO_VOUT2 output has a test point, or a filter capacitor convenient for voltage measurement | All chips | Required |
| 5 | VDD_RET output has a test point, or a filter capacitor convenient for voltage measurement | All chips | Required |
| 6 | VDD_RTC output has a test point, or a filter capacitor convenient for voltage measurement | All chips | Required |
| 7 | VDDIO1 supply voltage is 1.8 V-3.3 V; SF32LB56xU uses 1.8 V and SS6700A uses 3.3 V. VDDIO1 may be switched together with external flash under PBR0 control. If VDDIO1 is not controlled by PBR0, ensure it is powered during program download. If controlled by GPIO, PB22 is recommended and the download tool must enable this rail | SF32LB560/561/563/56W and SS6700A | Required |
| 8 | When VDDIO1 is supplied by SF30147, LVSW1 is recommended; the download tool must enable this rail | SF32LB560/561/563/56W and SS6700A | Required |
| 9 | VDDIO2 supply voltage is 1.8 V-3.3 V; reserve a 0 Ω series resistor in the first board revision (SF32LB56xU recommended to use 1.8 V, SS6700A recommended to use 3.3 V) | SF32LB560/561/563/56W and SS6700A | Required |
| 10 | VDDIO3 supply voltage is 1.8 V-3.3 V; reserve a 0 Ω series resistor in the first board revision (SF32LB56xU recommended to use 1.8 V, SS6700A recommended to use 3.3 V) | SF32LB560/561/563/56W and SS6700A | Required |
| 11 | VDDIO4 supply voltage is 1.8 V-3.3 V; reserve a 0 Ω series resistor in the first board revision (SF32LB56xU recommended to use 1.8 V, SS6700A does not have this power rail) | SF32LB560/561/563/56W | Required |
| 12 | VDDIOA supply voltage is 1.8 V-3.3 V; reserve a 0 Ω series resistor in the first board revision | SF32LB565/567 | Required |
| 13 | VDDIOA2 supply voltage is 1.8 V-3.3 V; reserve a 0 Ω series resistor in the first board revision | SF32LB565/567 | Required |
| 14 | VDDIOB supply voltage is 1.8 V-3.3 V; reserve a 0 Ω series resistor in the first board revision | SF32LB565/567 | Required |
| 15 | VDDIOSA supply voltage is 1.8 V, and a load switch is provided for power control | SF32LB565/567 | Required |
| 16 | VDDIOSB supply voltage is 1.8 V, and a load switch is provided for power control | SF32LB565/567 | Required |
| 17 | VDDIOSC supply voltage is 1.8 V and VDDIOSC must always be powered | SF32LB565/567 | Required |
| 18 | AVDD33_ANA supply voltage is 3.3 V | All chips | Required |
| 19 | AVDD33_AUD supply voltage is 3.3 V | All chips | Required |
| 20 | The charging circuit is recommended to use a charger IC with path management so the system can power on from the charger input when battery voltage is below the power-on threshold | All chips | Required |
| 21 | If a charger IC without path management is used, trickle charge current must be at least 40 mA | All chips | Required |
| 22 | Power-supply design should be hardware-compatible between SF32LB56xU and SS6700 where applicable | SF32LB560/561/563/56W and SS6700A | Required |
| 23 | When SF30147 supplies power, use the SF32LB56x dedicated TWI interface for register control | All chips | Required |
| 24 | If SF30147 TWI shares the G-sensor I2C bus, the G-sensor I2C pull-up supply must always be powered so TWI can operate normally | All chips | Required |
| 25 | When SF30147 supplies power, EN-controlled load switches and LDOs may be used. The EN power domain must be PVDD or AVDD; do not control the switch from an MCU GPIO at a 1.8 V or 3.3 V level. Alternatively, tie EN to ground and control the corresponding rail output through registers | All chips | Required |
| 26 | When SF30147 supplies power, BUCK and LDO1 can only be controlled by their respective enable signals, EN_BUCK and EN_LDO1; internal register control is not provided | All chips | Required |
| 27 | 56x PVDD must match VDDIO3 on SF32LB56xU or VDDIOB on SF32LB56xV. If PVDD is lower, for example the IO rail is 3.3 V while PVDD is 1.8 V, the IO rail has about 15 uA leakage in Standby and Hibernate | All chips | Required |

</div>

### 3.3. Power Supply Capacitors and Inductors

<div align="center"><em>Table 3.3-1: Power Supply Capacitors and Inductors Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | PVDD bulk capacitor is at least 10 uF | All chips | Required |
| 2 | BUCK_FB capacitor = 4.7 uF | All chips | Required |
| 3 | LDO_VOUT1 capacitor is 4.7 uF | All chips | Required |
| 4 | LDO_VOUT2 capacitor is 4.7 uF | All chips | Required |
| 5 | VDD_RET capacitor = 0.47 uF | All chips | Required |
| 6 | VDD_RTC capacitor = 1 uF | All chips | Required |
| 7 | VDDIO1 capacitor is at least 1 uF | SF32LB560/561/563/56W and SS6700A | Required |
| 8 | VDDIO2 capacitor is at least 1 uF | SF32LB560/561/563/56W and SS6700A | Required |
| 9 | VDDIO3 capacitor is at least 1 uF | SF32LB560/561/563/56W and SS6700A | Required |
| 10 | VDDIO4 capacitor is at least 1 uF | SF32LB560/561/563/56W | Required |
| 11 | VDDIOA capacitor is at least 1 uF | SF32LB565/567 | Required |
| 12 | VDDIOA2 capacitor is at least 1 uF | SF32LB565/567 | Required |
| 13 | VDDIOB capacitor is at least 1 uF | SF32LB565/567 | Required |
| 14 | VDDIOSA capacitor is at least 0.1 uF | SF32LB565/567 | Required |
| 15 | VDDIOSB capacitor is at least 0.1 uF | SF32LB565/567 | Required |
| 16 | VDDIOSC capacitor is at least 0.1 uF | SF32LB565/567 | Required |
| 17 | MIC_BIAS capacitor is 1 uF | All chips | Required |
| 18 | AVDD33_ANA capacitor is at least 4.7 uF | All chips | Required |
| 19 | AVDD33_AUD capacitor is at least 4.7 uF | All chips | Required |
| 20 | AVDD33_BRF capacitor is at least 4.7 uF | SF32LB565/567 | Required |
| 21 | AUD_VREF capacitor = 1 uF | All chips | Required |
| 22 | GPADC VREFP capacitor = 4.7 uF | All chips | Required |
| 23 | BUCK inductor is a part number listed on the [SiFli Approved Vendor List] (AVL) | All chips | Required |
| 24 | If the BUCK inductor is not SiFli-recommended, it meets L = 4.7 uH, DCR &lt;= 0.4 ohm, and Isat &gt;= 450 mA | All chips | Required |
| 25 | PVDDsupply power supply is 1.8 V, recommended to use VBAT1.8 V DCDC | All chips | Required |
| 26 | If GPS or other interference-sensitive peripherals are present, reserve a shunt-to-ground capacitor footprint at BUCK_LX; the value depends on actual test results | All chips | Required |
| 27 | Quiescent current of the selected DCDC is recorded and meets project requirements | All chips | Required |
| 28 | Quiescent current of the selected LDO is recorded and meets project requirements | All chips | Required |

</div>

### 3.4. Clock

<div align="center"><em>Table 3.4-1: Clock Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | Main 48 MHz crystal is an AVL-listed part number | All chips | Required |
| 2 | If the 48 MHz crystal is not AVL-listed, it meets 7 pF ≤ CL ≤ 12 pF (8.8 pF recommended), frequency tolerance ≤±10 ppm, ESR ≤30 Ω (22 Ω recommended) | All chips | Required |
| 3 | RTC 32.768 kHz crystal is an AVL-listed part number | All chips | Required |
| 4 | If the 32.768 kHz crystal is not AVL-listed, it meets CL ≤12.5 pF (7 pF recommended), frequency tolerance ≤±20 ppm, ESR ≤80 kΩ (38 kΩ recommended) | All chips | Required |

</div>

### 3.5. Ground Signals

<div align="center"><em>Table 3.5-1: Ground Signals Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | All VSS signals are connected to GND | All chips | Required |

</div>

### 3.6. Boot Mode

<div align="center"><em>Table 3.6-1: Boot Mode Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | MODE has an internal pull-down; reserve a 10 kΩ pull-up to VDDIOA and drive MODE high during program download | All chips | Required |
| 2 | MODE signal has a reserved test point and must be brought out to the production programming fixture | All chips | Required |

</div>

### 3.7. RF

<div align="center"><em>Table 3.7-1: RF Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | The ANT signal is annotated with the single-ended 50 Ω characteristic-impedance requirement | All chips | Required |
| 2 | A Pi-type matching network is reserved on the ANT signal: a parallel NC (do-not-populate) capacitor and a 15 pF series capacitor | All chips | Required |

</div>

### 3.8. I/O Resource Allocation

<div align="center"><em>Table 3.8-1: I/O Resource Allocation Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | A GPIO resource-allocation table matching the schematic is provided | All chips | Required |
| 2 | The GPIO allocation in the resource table matches the schematic | All chips | Required |
| 3 | For GPIO output control, account for the default PU/PD state during cold boot and enable related peripherals in advance if required | All chips | Required |
| 4 | Actual GPIO allocation follows SiFli recommendations; refer to the I/O config file | All chips | Required |

</div>

### 3.9. Hardware Wake-up

<div align="center"><em>Table 3.9-1: Hardware Wake-up Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | Hibernate/Standby wake-up interrupt sources are correct: PA50, PA51, PB32, PB33, PB34, PBR0, PBR1, and PBR2, eight pins total | SF32LB560/561/563/56W and SS6700A | Required |
| 2 | Hibernate/Standby wake-up interrupt sources are correct: PA50-PA54, PB32-PB36, and PBR0-PBR3, fourteen pins total | SF32LB565/567 | Required |
| 3 | Wake-up pins can wake HCPU or LCPU according to software configuration | All chips | Required |
| 4 | Interrupt and control signals for LCPU-side peripherals such as G-sensor and heart-rate sensor must connect to PB GPIOs | All chips | Required |

</div>

### 3.10. Storage

<div align="center"><em>Table 3.10-1: Storage Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | MPI3 (SD2) connects to SPI NAND flash or SD NAND flash; on SF32LB56xU external flash, ensure the flash supply voltage matches VDDIO3 | SF32LB560/561/563/56W and SS6700A | Required |
| 2 | MPI3 (SD2) connects to SPI NAND flash or SD NAND flash, and the flash I/O level matches VDDIOA2 | SF32LB565/567 | Required |
| 3 | The SPI NAND flash HOLD# pin is pulled up to the SPI NAND flash supply through a 10 kΩ resistor | All chips | Required |
| 4 | MPI3 connects to NOR flash (SS6700A external memory must be NOR flash) | All chips | Required |
| 5 | If production must download MPI3 (SD2) FLASH, during program download, external flash power supply is enabled | All chips | Required |
| 6 | The power switch controlled by PBR0 or another GPIO is active-high on and active-low off | All chips | Required |
| 7 | If the SD2 interface connects to SD NAND, signal connections are correct | All chips | Required |
| 8 | 33 Ω series resistors are recommended on Flash CLK and data lines | All chips | Optional |
| 9 | SD NAND I/O level matches VDDIO2 | SF32LB560/561/563/56W and SS6700A | Required |
| 10 | Flash CLK and data lines have 33 Ω series resistors | All chips | Required |
| 11 | The peripheral device's I/O logic level matches the main chip's | All chips | Required |
| 12 | LCPU co-packaged NOR flash is always powered, and PBR0 controls external flash power by default.<br>(1) If GPIOs are limited, PBR0 may also control the 561/2/3/W co-packaged PSRAM supply (VDDIO1). If sleep data is stored in PSRAM, do not power off PSRAM or external flash.<br>(2) If GPIOs are available, use PB22 to control the PSRAM supply switch | SF32LB560/561/563/56W and SS6700A | Required |
| 13 | <span class="flag-yellow">VDDIOSA and VDDIOSB supplies are controlled by PBR0, VDDIOSC is always powered, and external flash supply is controlled by PA03</span> | SF32LB565/567 | Required |
| 14 | NOR flash is qualified in the key-component selection guide | All chips | Required |
| 15 | SPI/SD NAND flash is qualified in the key-component selection guide | All chips | Required |

</div>

### 3.11. Display

<div align="center"><em>Table 3.11-1: Display Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | SF32LB56xU or SS6700A connects to a QSPI panel | All chips | Required |
| 2 | SF32LB56xU or SS6700A connects to a serial JDI panel | All chips | Required |
| 3 | LCDC1 QSPI signal connections are correct; 100 Ω series resistors are recommended on CLK and data lines | All chips | Required |
| 4 | LCDC1 serial JDI signal connections are correct | All chips | Required |
| 5 | The LCDC RSTB connection is correct | All chips | Required |
| 6 | LCDC TE connection is correct (connects to the panel's TE or Fmark signal) | All chips | Required |
| 7 | TP signals follow the recommended pin assignment (refer to the EVB I/O config file) | All chips | Required |
| 8 | LCD interface supports 3/4-wire SPI, dual/quad-data SPI, serial JDI, and similar modes | All chips | Optional |
| 9 | SPI LCD, 3-wire mode: CS connected to PA36, CLK connected to PA37, DATA connected to PA38; 4-wire mode: CS connected to PA36, CLK connected to PA37, DATA connected to PA38, DC connected to PA39 | All chips | Optional |
| 10 | The peripheral device's I/O logic level matches the main chip's | All chips | Required |
| 11 | If LCD AOD is required, note LCD_RST (PA05) supply VDDIO3, must always be powered, VDDIO3 must not be tied to external flash power, otherwise disabling flash power during sleep may also turn off VDDIO3 and LCD_RST, causing AOD abnormalities | SF32LB560/561/563/56W and SS6700A | Required |
| 12 | For DSI LCDs, connect DSI data and clock signals. DSI video-mode panels behave like RGB panels and have no TE signal; DSI command-mode panels have a TE signal, and DSI17801 requires TE. TE and RST are both recommended; final usage depends on the selected LCD | SF32LB565/567 | Required |

</div>

### 3.12. GPADC

<div align="center"><em>Table 3.12-1: GPADC Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | GPADC input is connected to the corresponding pin | All chips | Optional |
| 2 | GPADC input range is correct; maximum input voltage must not exceed AVDD33_AVA (3.3 V) | All chips | Optional |
| 3 | Battery-voltage divider recommendation: 470 kΩ 1% resistor on the supply side, 1 MΩ 1% resistor to ground, and 100 nF filter capacitor | All chips | Required |
| 4 | For every resistor-divider signal measured by GPADC, use 1%-tolerance divider resistors; each GPADC channel must have a 100 nF filter capacitor placed close to the chip pin | All chips | Required |
| 5 | ADC can detect multiple buttons and save pins; for example, when PB32 is used as an ADC button, do not use the battery as the pull-up supply | All chips | Required |

</div>

### 3.13. Buttons

<div align="center"><em>Table 3.13-1: Buttons Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | Confirm with the customer whether the button requires wake-up capability | All chips | Required |
| 2 | Ordinary-button connection is correct (pull-up present, correct resistor value, correct pull-up voltage domain) | All chips | Required |
| 3 | Power button must use PB32, active-high, 10-second long-press reset, 10 kΩ pull-down resistor must be on the main board | All chips | Required |
| 4 | All button signals have ESD protection | All chips | Required |

</div>

### 3.14. EOS and ESD Protection

<div align="center"><em>Table 3.14-1: EOS and ESD Protection Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | Charging interface has EOS, ESD, and OVP design | All chips | Required |
| 2 | Charger-insertion detection signal has an ESD device | All chips | Required |
| 3 | Battery interface has an ESD device | All chips | Required |
| 4 | Antenna interface has an ESD device | All chips | Required |
| 5 | LCD and TP power interfaces have ESD devices | All chips | Required |
| 6 | TP I2C, RST, and INT lines have ESD devices | All chips | Required |
| 7 | Heart-rate sensor power interface and signal lines have ESD devices | All chips | Required |

</div>

### 3.15. I2C

<div align="center"><em>Table 3.15-1: I2C Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | I2C assignment accounts for HCPU/LCPU partitioning and whether the device must run in low-power mode | All chips | Required |
| 2 | I2C has pull-ups with the correct resistor value; if 400 kHz operation is required, 2.2 kΩ pull-ups are recommended. Use the peripheral-side voltage domain and shut the pull-up supply off with the peripheral at power-down | All chips | Required |
| 3 | I2C interrupt signal supports hardware wake-up where required | All chips | Required |
| 4 | If multiple devices share one I2C bus, their addresses are distinguished | All chips | Required |
| 5 | When use SF30147C PMIC, I2C SCL with TWI DAT use PB23, I2C SCL pull-up power supplyalways powered, TWI DATnormal SF30147C | SF32LB560/561/563/56W and SS6700A | Required |

</div>

### 3.16. Analog Audio

<div align="center"><em>Table 3.16-1: Analog Audio Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | MEMS mic connection is correct | All chips | Required |
| 2 | MEMS mic is powered from MIC_BIAS | All chips | Required |
| 3 | Analog ECM single-ended mic connection is correct | All chips | Required |
| 4 | Analog ECM single-ended mic is powered from MIC_BIAS | All chips | Required |
| 5 | Analog ECM differential MIC connection is correct | All chips | Required |
| 6 | Analog ECM differential microphone is powered from MIC_BIAS | All chips | Required |
| 7 | All audio ADC inputs have a DC-blocking capacitor of at least 2.2 uF | All chips | Required |
| 8 | Audio DAC outputs DACP and DACN each have a 1 kΩ series resistor near the chip, with a 1.5 nF capacitor in parallel between DACP and DACN | All chips | Required |
| 9 | AW8155 is the recommended audio amplifier; configure it in software for Mode 4 / Class AB mode when using the recommended part | All chips | Required |
| 10 | When feeding audio PA output back to the MCU ADC, add a divider and RC filter or additional digital filtering; the divided voltage must stay within the ADC input range, and RC filter cutoff should be 20 kHz | All chips | Required |
| 11 | If the chip integrated analog audio ADC path is unused, ADCP and ADCN are each recommended to have a 0 Ω series resistor to ground | All chips | Required |

</div>

### 3.17. SPI

<div align="center"><em>Table 3.17-1: SPI Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | SPI connection is correct; SDO and SDI are crossed correctly between MCU and peripheral | All chips | Optional |
| 2 | SPI peripheral timing requirements are confirmed and supported | All chips | Optional |
| 3 | The peripheral device's I/O logic level matches the main chip's | All chips | Optional |

</div>

### 3.18. USART

<div align="center"><em>Table 3.18-1: USART Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | USART4 is the program-download/debug interface; reserve test points and add a recommended 100 Ω series resistor, adjustable for the actual design | All chips | Required |
| 2 | <span class="flag-yellow">SF32LB56xU PA17/PA18 are muxed as USART1 for RF certification testing; reserve test points</span> | SF32LB560/561/563/56W and SS6700A | Required |
| 3 | <span class="flag-yellow">SF32LB56xV PA30/PA34 are muxed as USART1 for RF certification testing; reserve test points</span> | SF32LB565/567 | Required |
| 4 | When connecting to a peripheral, MCU-side RXD connects to peripheral TXD and MCU-side TXD connects to peripheral RXD | All chips | Required |
| 5 | When PA17/PA18 are muxed as UART to peripherals, ensure at MCU reset that the connected peripherals are powered down or software drives both pins low | All chips | Required |
| 6 | The peripheral device's I/O logic level matches the main chip's | All chips | Required |
| 7 | Unused USART test points are reserved for backup use | All chips | Optional |
| 8 | UART connected to peripherals is recommended to use the HCPU interface to avoid HCPU software using an LCPU UART interface | All variants | Required |

</div>

### 3.19. PWM

<div align="center"><em>Table 3.19-1: PWM Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | Backlight PWM pin allocation is correct; LCD backlight control must use PB GPIOs with PWM function | All chips | Optional |
| 2 | Motor PWM pin allocation is correct; motor vibration control must use PB GPIOs with PWM function | All chips | Optional |
| 3 | For motor PWM control, select a default-disabled GPIO to avoid abnormal behavior during firmware programming when an SMT motor is used | All chips | Optional |
| 4 | PWM outputs other than backlight and motor must also use the PB interface, and cold-boot behavior must be checked | All chips | Optional |

</div>

### 3.20. Debug

<div align="center"><em>Table 3.20-1: Debug Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | UART4_TXD/UART4_RXD are recommended for debug; reserve test points and add a recommended 100 Ω series resistor | All chips | Required |
| 2 | SWD signal connections are correct | All chips | Required |
| 3 | The J-Link connector or test points correctly reserve the I/O power supply reference | All chips | Required |
| 4 | During production download, ensure PVDD, VDDIO2 on SF32LB56xU or VDDIOA on SF32LB56xV, VDDIO3 on SF32LB56xU or VDDIOA2 on SF32LB56xV, and VDDIO4 on SF32LB56xU or VDDIOB on SF32LB56xV are powered. VDDIO1 on 561/563/56W or VDDIOSB on 565/567 must also be powered | All chips | Required |

</div>

### 3.21. USB

<div align="center"><em>Table 3.21-1: USB Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | USB interface connection is correct | All chips | Optional |
| 2 | USB interface has ESD protection | All chips | Optional |
| 3 | During normal non-sleep operation, as long as USB remains enabled, the PC/device side can sense insertion and removal; <br>If MCU sleeps, must sense insertion and removal, add a VBUS resistor-divider circuit, the divider outputs a high level matching the IO voltage, feed into an MCU wake-up pin, sharing the charger-insertion detection wake pin is recommended | All chips | Optional |

</div>

### 3.22. PBR

<div align="center"><em>Table 3.22-1: PBR Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | PBR0 changes from 0 to 1 during power-on and may be used for some external load-switch control; PBR1-PBR2 default to output low | All chips | Required |
| 2 | PBR0-PBRx can be used as outputs in both Standby and Hibernate | All chips | Optional |
| 3 | PBR0-PBRx can output LPTIM signals | All chips | Optional |
| 4 | For 567, LPTIM3 is recommended: LPTIM3_OUT and LPTIM3_OUT_BAR output 21-25 kHz signals from PBR pins with different duty cycles and opposite polarity | All chips | Optional |
| 5 | The 21-25 kHz opposite-polarity signals with different duty cycles may also be output from HCPU ATIM; select suitable ATIMx_CHx and ATIMx_CHxN signals together with Pin_Config and consider the impact of HCPU frequency reduction | All chips | Optional |
| 6 | PBR1-PBRx can output a 32 kHz clock signal | All chips | Optional |
| 7 | PBR0-PBRx can be configured as inputs for wake-up signals | All chips | Optional |
| 8 | When PBR is used as a wake-up pin, software must poll it after MCU wake-up. It supports slow-changing levels such as buttons and charger detection, but fast pulses such as heart-rate interrupts must use a normal wake-capable GPIO, not PBR | All chips | Optional |

</div>

### 3.23. Power Consumption

<div align="center"><em>Table 3.23-1: Power Consumption Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | For all MOSFET, LDO, and DCDC enable pins used for power switching, reserve a 1 MΩ pull-down to ground when the enable pin is active-high; adjust the value if needed for the actual project | All chips | Required |
| 2 | SF32LB56x PVDD supply is 1.8 V, useslowIq DCDC output is 1.8 V power supply, always powered | All chips | Required |
| 3 | For SF32LB56xU and SS6700, VDDIO1 requires load-switch control. Use PBR0 as the control signal; if GPIOs are available, PB22 may control the supply. The download tool must enable VDDIO1 power | SF32LB560/561/563/56W and SS6700A | Required |
| 4 | For SF32LB56xU and SS6700, external flash power requires a load switch controlled by PBR0 | SF32LB560/561/563/56W and SS6700A | Required |
| 5 | <span class="flag-yellow">In Hibernate-off or Standby-off mode, SF32LB56xV VDDIOSA and VDDIOSB require load-switch control through PBR0, while VDDIOSC must always be powered</span> | SF32LB565/567 | Required |
| 6 | <span class="flag-yellow">SF32LB56xV MPI3 flash supply requires a load switch controlled by PA03; enable MPI3 flash power during download</span> | SF32LB565/567 | Required |
| 7 | Deep Sleep base-current requirement is recorded. Deep Sleep current is higher than Standby and is suitable for frequent wake-up with intervals below 200 ms; all PB pins support wake-up, and base current is 90 uA | All chips | Required |
| 8 | Sum of base currents of all selected peripherals in Deep Sleep mode is recorded and meets project requirements | All chips | Required |
| 9 | Standby base-current requirement is recorded. Standby is suitable for less frequent wake-up with intervals above 200 ms; only PA50, PA51, PB33, and PB34 support wake-up, and base current is 4-5 uA | SF32LB560/561/563/56W and SS6700A | Required |
| 10 | Standby base-current requirement is recorded. Standby is suitable for less frequent wake-up with intervals above 200 ms; only PA50, PA51, PA52, PA53, PA54, PB33, PB34, PB35, and PB36 support wake-up, and base current is 4-5 uA | SF32LB565/567 | Required |
| 11 | Selected peripherals, in Standby mode is recorded and meets project requirements | All chips | Required |

</div>

### 3.24. Download

<div align="center"><em>Table 3.24-1: Download Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | SF32LB56xU: UART download test points, reserve VBAT, GND, UART4_TXD, UART4_RXD, MODE, VDDIO2, VDDIO3 or VDDIO4, PB32and similartest point | SF32LB560/561/563/56W and SS6700A | Required |
| 2 | SF32LB56xV: UART download test points, reserve VBAT, GND, UART4_TXD, UART4_RXD, MODE, VDDIOA, VDDIOB, PB32and similartest point | SF32LB565/567 | Required |

</div>

## 4. PCB Layout Checklist

Each table below covers one PCB layout review area. When an Applies To column is not present, the row applies to all variants covered by the workbook.

### 4.1. Package

<div align="center"><em>Table 4.1-1: Package Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | Footprint matches the package SPEC | Required |

</div>

### 4.2. Power Supply

<div align="center"><em>Table 4.2-1: Power Supply Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | PVDD supply trace is at least 8 mil | Required |
| 2 | BUCK_LX and BUCK_FB trace is at least 8 mil | Required |
| 3 | VDDIO1 supply trace is at least 5 mil | Required |
| 4 | VDDIO2 supply trace is at least 8 mil | Required |
| 5 | VDDIO3 supply trace is at least 5 mil | Required |
| 6 | VDDIO4 supply trace is at least 6 mil | Required |
| 7 | VDDIOSC supply trace is at least 6 mil | Required |
| 8 | AVDD33_ANA supply trace is at least 6 mil | Required |
| 9 | AVDD33_AUD supply trace is at least 5 mil | Required |

</div>

### 4.3. Power Supply Capacitor and Inductor Placement

<div align="center"><em>Table 4.3-1: Power Supply Capacitor and Inductor Placement Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | PVDD capacitor is placed close to the pin | Required |
| 2 | BUCK inductor placed close to the chip | Required |
| 3 | BUCK decoupling capacitor placed as close as possible to the chip pin | Required |
| 4 | LDO1_VOUT capacitor is placed close to the pin | Required |
| 5 | LDO2_VOUT capacitor is placed close to the pin | Required |
| 6 | VDD_RET capacitor placed close to the pin | Required |
| 7 | VDD_RTC capacitor placed close to the pin | Required |
| 8 | VDDIO1 capacitor is placed close to the pin | Required |
| 9 | VDDIO2 capacitor is placed close to the pin | Required |
| 10 | VDDIO3 capacitor is placed close to the pin | Required |
| 11 | VDDIO4 capacitor is placed close to the pin | Required |
| 12 | AVDD33_ANA capacitor is placed close to the pin | Required |
| 13 | AVDD33_AUD capacitor placed close to the pin | Required |

</div>

### 4.4. Clock

<div align="center"><em>Table 4.4-1: Clock Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | Crystal placed close to the chip | Required |
| 2 | GND shielding applied around the crystal | Required |
| 3 | Copper keep-out applied under the crystal (4-layer PTH board: top layer; 6-layer HDI board: top layer and layer 2) | Required |
| 4 | Ground-fill clearance along the crystal traces is greater than 1.5x the trace width | Required |
| 5 | 32 kHz crystal's parallel trace pair spacing is greater than 2x the trace spacing | Required |

</div>

### 4.5. Buttons

<div align="center"><em>Table 4.5-1: Buttons Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | Button's ESD protection device placed close to the button | Required |

</div>

### 4.6. RF

<div align="center"><em>Table 4.6-1: RF Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | RF trace meets the single-ended 50 Ω characteristic-impedance requirement | Required |
| 2 | RF trace width ≥10 mil | Required |
| 3 | At least 60 mil of ground on each side of the RF trace, with sufficient stitching vias to the main ground | Required |
| 4 | Reserved Pi-type antenna matching network placed close to the chip side | Required |
| 5 | Continuous GND plane beneath the RF signal | Required |
| 6 | No high-speed digital signal traces cross beneath the RF signal | Required |
| 7 | No high-di/dt power traces cross beneath the RF signal | Required |
| 8 | AVSS_RF1, AVSS_RF2, and AVSS_RF3 are strengthened with grounding and connected to the main-ground plane | Required |

</div>

### 4.7. Audio

<div align="center"><em>Table 4.7-1: Audio Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | AU_ADCP/AU_ADCN are routed as differential traces with ground guarding | Required |
| 2 | AU_DACP/AU_DACN are routed as differential traces with ground guarding | Required |
| 3 | AU_DACP/AU_DACN traces are short enough that parasitic capacitance is below 10 pF | Required |
| 4 | AVDD33_ANA, AVDD33_AUD power traces use ground guarding, stay away from high-current noisy signals, use star routing, and each trace is at least 5 mm long | Required |
| 5 | AVSS is connected through vias to main-ground plane | Required |

</div>

### 4.8. ADC

<div align="center"><em>Table 4.8-1: ADC Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | No high-speed signal runs parallel to the GPADC signal without ground guarding | Required |
| 2 | Battery-voltage divider resistors are placed close to the chip input pin | Required |

</div>

### 4.9. Test Points

<div align="center"><em>Table 4.9-1: Test Points Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | Test-point locations are suitable for probing or fixture soldering | Required |
| 2 | Program-download and crystal-calibration test points (VBAT, GND, SWDIO, SWCLK, VDDIO3 or VDDIO4, MODE, UART4_TXD, UART4_RXD, etc.) meet fixture size and location requirements | Required |

</div>

### 4.10. Ground

<div align="center"><em>Table 4.10-1: Ground Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | Layers adjacent to the main chip are a complete main-ground plane, with sufficient grounding vias | Required |
| 2 | PVSS is connected through vias to main ground | Required |
| 3 | Area under the chip has enough grounding vias connected to the main ground plane | Required |
| 4 | A ring of grounding vias runs around the board edge | Required |

</div>

## 5. Related Documents and References

[SiFli Hardware Design Resource Index]: https://wiki.sifli.com/hardware/index.html
[SiFli Chip Hardware Design Guide Index (Wiki)]: https://wiki.sifli.com/hardware/index.html

<div class="grid cards" markdown>

- :fontawesome-solid-file-excel: __[SiFli Hardware Design Resource Index]__
- :fontawesome-brands-wikipedia-w: __[SiFli Chip Hardware Design Guide Index (Wiki)]__

</div>
