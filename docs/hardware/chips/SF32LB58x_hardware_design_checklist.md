---
icon: lucide/list-checks
description: "Schematic and PCB review checklist for SF32LB58x designs, covering power, clock, RF, display, storage, and manufacturing checks."
tags:
 - Hardware
 - Chip
 - Checklist
---

# SF32LB58x Hardware Design Checklist

## 1. Introduction

This checklist is the complete schematic and PCB review reference for products based on the SF32LB58x family. It is derived from SiFli's official *SF32LB58x Schematic & PCB Checklist* workbook (V1.0, 2026-01-21) and keeps the source workbook order, row numbering, applicability, Required/Optional status, and review highlighting.

Use it as the formal design-review gate: complete the schematic checklist before PCB layout starts, then complete the PCB layout checklist before Gerber release. For release review, keep a filled copy with both the initial-review and follow-up-review results.

Colored text and text with a <span class="flag-yellow">yellow background</span> preserve the review emphasis from the source spreadsheet. The workbook does not explain the reason for each highlight, so treat these marks as additional review flags.

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

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | The package of the selected part number is correct, including pin names and pin numbers | Required |

</div>

### 3.2. Power Supply

<div align="center"><em>Table 3.2-1: Power Supply Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | PVDD1 supply voltage is 1.8 V-3.3 V | Required |
| 2 | PVDD2 supply voltage is 1.8 V-3.3 V | Required |
| 3 | BUCK1_LX and BUCK1_FB connections are correct | Required |
| 4 | BUCK2_LX and BUCK2_FB connections are correct | Required |
| 5 | LDO_VOUT1 output has a test point, or a filter capacitor convenient for voltage measurement | Required |
| 6 | VDD_RET output has a test point, or a filter capacitor convenient for voltage measurement | Required |
| 7 | VDD_RTC output has a test point, or a filter capacitor convenient for voltage measurement | Required |
| 8 | VDDIOA supply voltage is 1.8 V-3.3 V; reserve a 0 Ω series resistor in the first board revision | Required |
| 9 | VDDIOA2 supply voltage is 1.8 V-3.3 V; reserve a 0 Ω series resistor in the first board revision | Required |
| 10 | VDDIOB supply voltage is 1.8 V-3.3 V; reserve a 0 Ω series resistor in the first board revision | Required |
| 11 | VDDIOSA supply voltage is 1.8 V, and a load switch is provided so it can be shut off | Required |
| 12 | VDDIOSB supply voltage is 1.8 V, and a load switch is provided so it can be shut off | Required |
| 13 | VDDIOSC supply voltage is 1.8 V and must always be powered | Required |
| 14 | AVDD33_USB supply voltage is 3.3 V | Required |
| 15 | AVDD33_ANA supply voltage is 3.3 V | Required |
| 16 | AVDD_BRF supply voltage is 1.8 V-3.3 V and must match the VDD1 supply | Required |
| 17 | AVDD33_AUD supply voltage is 3.3 V | Required |
| 18 | AVDD18_DSI supply voltage is 1.8 V | Required |
| 19 | When SF30147C supplies power, the TWI control interface must use MCU PB pins, and those pins must be PD pins | Required |
| 20 | Charging circuit requires path management so the system can be powered from the charger 5 V input when battery voltage is too low | Required |
| 21 | When SF30147C supplies power, use the chip-dedicated TWI control interface | Required |
| 22 | When SF30147C supplies power, rails controlled by EN must use PVDD or AVDD as the EN power domain; do not control EN from an MCU GPIO. Alternatively, tie EN to ground and control the corresponding rail output through registers | Required |
| 23 | When SF30147C supplies power, BUCK and LDO1 can only be controlled by their respective enable signals, EN_BUCK and EN_LDO1; internal register control is not provided | Required |
| 24 | 58x PVDD and VDDIOB supplies must match. If PVDD is lower than VDDIOB, for example VDDIOB = 3.3 V and PVDD = 1.8 V, VDDIOB has about 15 uA leakage in Standby and Hibernate | Required |
| 25 | On 58x, pin B4 is VDD_EXT1 and pin B5 is VDD_EXT2; they may be left unconnected in the design | Required |

</div>

### 3.3. Power Supply Capacitors and Inductors

<div align="center"><em>Table 3.3-1: Power Supply Capacitors and Inductors Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | PVDD1 bulk capacitor is at least 10 uF | Required |
| 2 | PVDD2 capacitor is at least 10 uF | Required |
| 3 | BUCK1_FB capacitor=4.7u | Required |
| 4 | BUCK2_FB capacitor=4.7u | Required |
| 5 | LDO_VOUT1 capacitor=4.7u | Required |
| 6 | VDD_RET capacitor=0.47u | Required |
| 7 | VDD_RTC capacitor=1u | Required |
| 8 | VDDIOA capacitor&gt;=1u | Required |
| 9 | VDDIOA2 capacitor&gt;=1u | Required |
| 10 | VDDIOB capacitor&gt;=1u | Required |
| 11 | VDDIOSA capacitor&gt;=1u | Required |
| 12 | VDDIOSB capacitor&gt;=1u | Required |
| 13 | VDDIOSC capacitor&gt;=1u | Required |
| 14 | AVDD33_USB capacitor&gt;=1u | Required |
| 15 | AVDD33_ANA capacitor&gt;=4.7u | Required |
| 16 | AVDD_BRF capacitor&gt;=4.7u | Required |
| 17 | AVDD33_AUD capacitor&gt;=4.7u | Required |
| 18 | AUD_VREF capacitor=1u | Required |
| 19 | AVDD18_DSI capacitor&gt;=4.7u | Required |
| 20 | MIC_BIAS capacitor=1u | Required |
| 21 | GPADC VREFP capacitor = 4.7 uF | Required |
| 22 | PVDD1, PVDD2, AVDD_BRF, and the RSTN pull-up supply must be the same | Required |
| 23 | BUCK1 and BUCK2 inductors are SiFli-recommended part numbers | Required |
| 24 | If the BUCK inductor is not SiFli-recommended, it meets L = 4.7 uH, DCR &lt;= 0.4 ohm, and Isat &gt;= 450 mA | Required |
| 25 | When PVDD1 and PVDD2 are powered at 1.8 V from VBAT, use a DCDC converter to generate 1.8 V; do not use an LDO | Required |
| 26 | Quiescent current of the selected DCDC is recorded and meets project requirements | Required |
| 27 | Quiescent current of the selected LDO is recorded and meets project requirements | Required |

</div>

### 3.4. Clock

<div align="center"><em>Table 3.4-1: Clock Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | Main 48 MHz crystal is an AVL-listed part number | Required |
| 2 | If the 48 MHz crystal is not AVL-listed, it meets 7 pF ≤ CL ≤ 12 pF (8.8 pF recommended), frequency tolerance ≤±10 ppm, ESR ≤30 Ω (22 Ω recommended) | Required |
| 3 | RTC 32.768 kHz crystal is an AVL-listed part number | Required |
| 4 | If the 32.768 kHz crystal is not AVL-listed, it meets CL ≤12.5 pF (7 pF recommended), frequency tolerance ≤±20 ppm, ESR ≤80 kΩ (38 kΩ recommended) | Required |

</div>

### 3.5. Reset

<div align="center"><em>Table 3.5-1: Reset Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | RSTN is pulled up to the same supply as PVDD1 | Required |
| 2 | RSTN reserves a 0.1 uF capacitor to ground | Required |
| 3 | RSTN has ESD protection | Required |

</div>

### 3.6. Ground Signals

<div align="center"><em>Table 3.6-1: Ground Signals Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | All AVSS_*** signals are connected to GND | Required |
| 2 | All VSS signals are connected to GND | Required |

</div>

### 3.7. Boot Mode

<div align="center"><em>Table 3.7-1: Boot Mode Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | MODE has an internal pull-down; reserve a 10 kΩ pull-up to VDDIOA and drive MODE high during program download | Required |
| 2 | MODE signal has a reserved test point and must be brought out to the production programming fixture | Required |

</div>

### 3.8. RF

<div align="center"><em>Table 3.8-1: RF Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | The ANT signal is annotated with the single-ended 50 Ω characteristic-impedance requirement | Required |
| 2 | A Pi-type matching network is reserved on the ANT signal: a parallel NC (do-not-populate) capacitor and a 15 pF series capacitor | Required |
| 3 | If spurious-emission filtering must be considered, a Pi-type matching network is reserved with a 2.7 nH series inductor and a 2 pF parallel capacitor | Optional |
| 4 | If an external RF PA requires MCU control of RXEN and TXEN, use only PB39 for PA RXEN and PB40 for PA TXEN | Optional |
| 5 | If Wi-Fi chip supports antenna coexistence arbitration: <br> (1) 3-wire mode is recommended: the Wi-Fi chip controls the Bluetooth/Wi-Fi antenna RF switch and performs arbitration. It uses BT_ACTIVE and BT_PRIORITY from Bluetooth to decide whether to grant antenna ownership to Bluetooth, and WLAN_ACTIVE can disable Bluetooth transmit/receive during Wi-Fi operation.<br> (2)BT_ACTIVE must use PB08 or PB45, WLAN_ACTIVE must use PB09 or PB41, and BT_PRIORITY may use any PB GPIO.<br> | Optional |
| 6 | If the Wi-Fi chip does not support antenna coexistence arbitration:<br>(1) 1-wire mode is recommended, Bluetooth controls the Bluetooth/Wi-Fi antenna RF switch, performs arbitration using BT_ACTIVE, and notifies the Wi-Fi chip.<br> (2) If Wi-Fi can output an operating-state signal, this scheme can be upgraded to 2-wire mode: connect the Wi-Fi output to WLAN_ACTIVE so Bluetooth can mask low-priority Bluetooth transmit/receive while Wi-Fi is active, without affecting Bluetooth when Wi-Fi is idle.<br> (3)BT_ACTIVE must use PB08 or PB45, WLAN_ACTIVE must use PB09 or PB41 | Optional |

</div>

### 3.9. I/O Resource Allocation

<div align="center"><em>Table 3.9-1: I/O Resource Allocation Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | A GPIO resource-allocation table matching the schematic is provided | Required |
| 2 | The GPIO allocation in the resource table matches the schematic | Required |
| 3 | The actual GPIO allocation follows SiFli recommendations; refer to the EVB I/O config file | Required |

</div>

### 3.10. Hardware Wake-up

<div align="center"><em>Table 3.10-1: Hardware Wake-up Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | HCPU wake-up interrupt sources are correct: PA64, PA65, PA66, PA67, PA68, and PA69, six pins total | Required |
| 2 | LCPU wake-up interrupt sources are correct: PB54, PB55, PB56, PB57, PB58, PB59, PBR0, PBR1, PBR2, and PBR3, ten pins total. After MCU wake-up, PBR0-PBR3 cannot receive interrupt signals | Required |
| 3 | Interrupt and control signals for LCPU-side peripherals such as G-sensor and heart-rate sensor must connect to PB GPIOs | Required |

</div>

### 3.11. Storage

<div align="center"><em>Table 3.11-1: Storage Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | MPI3 is connected to NOR flash or SPI NAND flash as intended | Required |
| 2 | VDDIOSC is always powered | Required |
| 3 | VDDIOSA and VDDIOSB supplies are enabled by PBR0 | Required |
| 4 | MPI3 or MPI4 may be used for external NOR flash or SPI NAND flash | Required |
| 5 | The SPI NAND flash HOLD# pin is pulled up to the SPI NAND flash supply through a 10 kΩ resistor | Required |
| 6 | If production needs to program external flash on MPI3 or MPI4, the download tool drives PA43 high to enable MPI3 power | Required |
| 7 | If production needs to program eMMC or SD NAND on SDIO1, the download tool enables the corresponding power supply | Required |
| 8 | PBR0/PA43-controlled voltage switches are active-high on and active-low off. In Hibernate, PBR0 controls VDDIOSA/VDDIOSB power switching, VDDIOSC remains always powered, and PA43 controls external flash power switching | Required |
| 9 | If the SD1 interface connects to eMMC or SD NAND, the signal connections are correct | Required |
| 10 | The eMMC or SD NAND I/O interface level matches VDDIOA2 | Required |
| 11 | MPI3 or MPI4 signal connections are correct | Required |
| 12 | The peripheral device's I/O logic level matches the main chip's | Required |
| 13 | NOR flash is qualified in the key-component selection guide | Required |
| 14 | SPI/SD NAND flash is qualified in the key-component selection guide | Required |
| 15 | eMMC is qualified in the key-component selection guide | Required |

</div>

### 3.12. Display

<div align="center"><em>Table 3.12-1: Display Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | SF32LB58x connects the display through DSI + LCDC2 as intended | Required |
| 2 | DSI signal connections are correct | Required |
| 3 | If only QSPI LCD is used, use the HCPU LCDC1 QSPI interface to avoid frame-rate and RAM issues | Required |
| 4 | DSI_REXT is connected to GND through a 10 kΩ resistor | Required |
| 5 | The LCDC RSTB connection is correct | Required |
| 6 | LCDC TE connection is correct (connects to the panel's TE or Fmark signal) | Required |
| 7 | TP signals follow the recommended pin assignment (refer to the EVB I/O config file) | Required |
| 8 | The LCD interface supports MIPI-DSI, 3-/4-wire SPI, dual/quad-data SPI, DBI 8080, DPI, and parallel/serial JDI interfaces | Required |
| 9 | SPI LCD, 3-wire mode: CS connected to PA44 or PB08, CLK connected to PA46 or PB10, DATA connected to PA50 or PB09; <br>4-wire mode: CS connected to PA44 or PB08, CLK connected to PA46 or PB10, DATA connected to PA50 or PB09, DC connected to PA48 or PB03 | Required |
| 10 | Confirm whether the LCD must support AOD; if so, a QSPI panel must connect to HCPU, while a JDI panel may connect to LCPU | Required |
| 11 | The peripheral device's I/O logic level matches the main chip's | Required |
| 12 | For DSI LCDs, connect DSI data and clock signals. DSI video-mode panels behave like RGB panels and have no TE signal; DSI command-mode panels have a TE signal, and DSI17801 requires TE. TE and RST are both recommended; final usage depends on the selected LCD | Required |

</div>

### 3.13. GPADC

<div align="center"><em>Table 3.13-1: GPADC Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | GPADC input is connected to the corresponding pin | Optional |
| 2 | GPADC input range is correct; maximum input voltage must not exceed AVDD33_AVA | Optional |
| 3 | Battery-voltage divider recommendation: 470 kΩ 1% resistor on the supply side, 1 MΩ 1% resistor to ground, and 100 nF filter capacitor | Required |
| 4 | For every resistor-divider signal measured by GPADC, use 1%-tolerance divider resistors; each GPADC channel must have a 100 nF filter capacitor placed close to the chip pin | Required |
| 5 | ADC can detect multiple buttons and save pins; for example, when PB32 is used as an ADC button, do not use the battery as the pull-up supply | Required |

</div>

### 3.14. SDMADC

<div align="center"><em>Table 3.14-1: SDMADC Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | SDMADC input is connected to the corresponding pin | Optional |
| 2 | SDMADC input range is correct; maximum input voltage should not exceed AVDD33_AVA | Optional |
| 3 | SDMADC_VREF and SDMADC_VSS_VREF connections are correct | Required |

</div>

### 3.15. Buttons

<div align="center"><em>Table 3.15-1: Buttons Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | Confirm with the customer whether the button requires wake-up capability | Required |
| 2 | Ordinary-button connection is correct (pull-up present, correct resistor value, correct pull-up voltage domain) | Required |
| 3 | Power button must use PB54, active-high, 10-second long-press reset, 10 kΩ pull-down resistor must be on the main board | Required |
| 4 | All button signals have ESD protection | Required |

</div>

### 3.16. EOS and ESD Protection

<div align="center"><em>Table 3.16-1: EOS and ESD Protection Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | Charging interface has EOS, ESD, and OVP design | Required |
| 2 | Charger-insertion detection signal has an ESD device | Required |
| 3 | Battery interface has an ESD device | Required |
| 4 | Antenna interface has an ESD device | Required |
| 5 | LCD and TP power interfaces have ESD devices | Required |
| 6 | TP I2C, RST, and INT lines have ESD devices | Required |
| 7 | Heart-rate sensor power interface and signal lines have ESD devices | Required |

</div>

### 3.17. I2C

<div align="center"><em>Table 3.17-1: I2C Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | I2C assignment accounts for HCPU/LCPU partitioning and whether the device must run in low-power mode | Required |
| 2 | I2C has pull-ups with the correct resistor value; if 400 kHz operation is required, 2.2 kΩ pull-ups are recommended. Use the peripheral-side voltage domain and shut the pull-up supply off with the peripheral at power-down | Required |
| 3 | I2C interrupt signal supports hardware wake-up where required | Required |
| 4 | If multiple devices share one I2C bus, their addresses are distinguished | Required |

</div>

### 3.18. I2S

<div align="center"><em>Table 3.18-1: I2S Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | I2S1 is input-only and operates only in master mode; the microphone is connected to I2S1 as intended | Optional |
| 2 | I2S2 supports input and output in master mode only, and may connect to external codec DAC/ADC devices | Optional |
| 3 | I2S3 supports input and output in master mode only; it is suitable for low-power use cases where HCPU sleeps and LCPU receives/processes audio through I2S3 | Optional |
| 4 | I2S signal connections are correct | Optional |
| 5 | I2S1 interface digital MIC connection is correct | Optional |
| 6 | The peripheral device's I/O logic level matches the main chip's | Optional |

</div>

### 3.19. PDM and Analog Audio

<div align="center"><em>Table 3.19-1: PDM and Analog Audio Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | PDM dual-mic connection is correct | Optional |
| 2 | PDM MIC is powered from a digital supply | Optional |
| 3 | The peripheral device's I/O logic level matches the main chip's | Optional |
| 4 | Analog dual-mic connection is correct | Optional |
| 5 | Analog MIC is powered by MIC_BIAS output | Optional |
| 6 | Both audio ADC inputs must each include at least 2.2 uF DC-blocking capacitor | Optional |
| 7 | DAC output paths P and N each have a 1 kΩ series resistor, with a 1.5 nF capacitor between them | Optional |
| 8 | AW8155 is the recommended audio amplifier; configure it in software for Mode 4 / Class AB mode when using the recommended part | Optional |
| 9 | When feeding audio PA output back to the MCU ADC, add a divider and RC filter or additional digital filtering; the divided voltage must stay within the ADC input range, and RC filter cutoff should be 20 kHz | Optional |
| 10 | If the chip integrated analog audio ADC path is unused, ADC1P/ADC1N and ADC2P/ADC2N are each recommended to have a 0 Ω series resistor to ground | Optional |

</div>

### 3.20. SPI

<div align="center"><em>Table 3.20-1: SPI Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | SPI connection is correct; SDO and SDI are crossed correctly between MCU and peripheral | Optional |
| 2 | SPI peripheral timing requirements are confirmed and supported | Optional |
| 3 | The peripheral device's I/O logic level matches the main chip's | Optional |

</div>

### 3.21. USART

<div align="center"><em>Table 3.21-1: USART Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | USART4 is designed as the download and log interface | Required |
| 2 | USART4 has test points; TXD and RXD are recommended with a series 100 Ω resistor | Required |
| 3 | USART1 has a test point | Required |
| 4 | Devices that must run on HCPU are connected to USART2 or USART3 | Optional |
| 5 | Devices that must run on LCPU are connected to USART5 or USART6 | Optional |
| 6 | When connecting to a peripheral, RXD and TXD are crossed correctly | Required |
| 7 | The peripheral device's I/O logic level matches the main chip's | Required |
| 8 | Unused USART test points are reserved for backup use | Optional |
| 9 | UART connected to peripherals is recommended to use the HCPU interface to avoid HCPU software using an LCPU UART interface | Required |

</div>

### 3.22. PWM

<div align="center"><em>Table 3.22-1: PWM Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | Backlight PWM pin allocation is correct; use a GPTIMx different from motor PWM, preferably on the PB interface, to avoid HCPU frequency reduction affecting the backlight | Required |
| 2 | Motor PWM pin allocation is correct; use a GPTIMx different from backlight PWM, preferably on the PB interface, to avoid HCPU frequency reduction affecting vibration | Required |
| 3 | For motor PWM control, select a default-disabled GPIO to avoid abnormal behavior during firmware programming when an SMT motor is used | Required |
| 4 | Signals that need PWM output must use the PB interface; also check for cold-boot abnormal behavior | Required |

</div>

### 3.23. Debug

<div align="center"><em>Table 3.23-1: Debug Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | SWD signal connections are correct | Required |
| 2 | The J-Link connector or test points correctly reserve the I/O power supply reference | Required |
| 3 | <span class="flag-yellow">During program download, PVDD, VDDIO, VDDSC, and similar rails must be powered, AVDD18_DSI (CAU2 power) must also be powered</span> | Required |

</div>

### 3.24. USB

<div align="center"><em>Table 3.24-1: USB Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | USB interface connection is correct | Optional |
| 2 | USB interface has ESD protection | Optional |
| 3 | During normal non-sleep operation, as long as USB remains enabled, the PC/device side can sense insertion and removal; <br>If MCU sleeps, must sense insertion and removal, add a VBUS resistor-divider circuit, the divider outputs a high level matching the IO voltage, feed into an MCU wake-up pin, sharing the charger-insertion detection wake pin is recommended | Optional |

</div>

### 3.25. PBR

<div align="center"><em>Table 3.25-1: PBR Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | PBR0 changes from 0 to 1 during power-on and may be used for some external load-switch control; PBR1-PBR5 default to output low | Required |
| 2 | PBR0-PBR5 can be used as outputs in both Standby and Hibernate | Optional |
| 3 | PBR0-PBR5 can output LPTIM signals | Optional |
| 4 | For 567, LPTIM3 is recommended: LPTIM3_OUT and LPTIM3_OUT_BAR output 21-25 kHz signals from PBR pins with different duty cycles and opposite polarity | Optional |
| 5 | The 21-25 kHz opposite-polarity signals with different duty cycles may also be output from HCPU ATIM; select suitable ATIMx_CHx and ATIMx_CHxN signals together with Pin_Config and consider the impact of HCPU frequency reduction | Optional |
| 6 | PBR0-PBR5 can output a 32 kHz clock signal | Optional |
| 7 | PBR0-PBR3 can be configured as wake-up inputs, but after MCU wake-up PBR0-PBRx cannot receive interrupt signals and can only detect 0/1 levels; use with caution | Optional |

</div>

### 3.26. Power Consumption

<div align="center"><em>Table 3.26-1: Power Consumption Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | For all MOSFET, LDO, and DCDC enable pins used for power switching, reserve a 1 MΩ pull-down to ground when the enable pin is active-high | Required |
| 2 | Hibernate-mode base-current requirement is recorded | Required |
| 3 | The sum of selected peripheral base currents in Hibernate mode is recorded and meets project requirements | Required |
| 4 | Standby-mode base-current requirement is recorded | Required |
| 5 | The sum of selected peripheral base currents in Standby mode is recorded and meets project requirements | Required |

</div>

### 3.27. Download and Crystal Calibration

<div align="center"><em>Table 3.27-1: Download and Crystal Calibration Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | SWD download test points, reserve VBAT, GND, SWDIO, SDCLK, MODE, RSTN, VDDIOA, VDDIOB test point | Required |
| 2 | If an offline-download board is required to program firmware, reserve VBAT, GND, UART4_TXD, UART4_RXD, MODE, RSTN, and VDDIOA test points | Optional |
| 3 | If crystal calibration is required, reserve a crystal-calibration test point; PB45 is recommended | Optional |

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
| 1 | VDD1 supply trace is at least 8 mil | Required |
| 2 | VDD2 supply trace is at least 8 mil | Required |
| 3 | BUCK1_VSW and BUCK1_VOUT trace is at least 8 mil | Required |
| 4 | BUCK2_VSW and BUCK2_VOUT trace is at least 8 mil | Required |
| 5 | VDDIOA supply trace is at least 10 mil | Required |
| 6 | VDDIOA2 supply trace is at least 10 mil | Required |
| 7 | VDDIOB supply trace is at least 10 mil | Required |
| 8 | VDDIOSA supply trace is at least 6 mil | Required |
| 9 | VDDIOSB supply trace is at least 6 mil | Required |
| 10 | VDDIOSC supply trace is at least 6 mil | Required |
| 11 | AVDD33_USB supply trace is at least 6 mil | Required |
| 12 | AVDD33_ANA supply trace is at least 6 mil | Required |
| 13 | AVDD_BRF supply trace ≥8 mil | Required |
| 14 | AVDD33_AUD supply trace is at least 6 mil | Required |
| 15 | AVDD33_DSI supply trace is at least 8 mil | Required |

</div>

### 4.3. Power Supply Capacitor and Inductor Placement

<div align="center"><em>Table 4.3-1: Power Supply Capacitor and Inductor Placement Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | VDD1 capacitor is placed close to the pin | Required |
| 2 | VDD2 capacitor is placed close to the pin | Required |
| 3 | BUCK1 inductor is placed close to the chip | Required |
| 4 | BUCK1 capacitoras much as possibleclose to the chip pin | Required |
| 5 | BUCK2 inductor is placed close to the chip | Required |
| 6 | BUCK2 capacitoras much as possibleclose to the chip pin | Required |
| 7 | HPSYS_LDO_VOUT capacitor is placed close to the pin | Required |
| 8 | LPMU_VDD07_RET capacitor is placed close to the pin | Required |
| 9 | LPMU_VDD11_RTC capacitor is placed close to the pin | Required |
| 10 | VDDIOA capacitor is placed close to the pin | Required |
| 11 | VDDIOA2 capacitor is placed close to the pin | Required |
| 12 | VDDIOB capacitor is placed close to the pin | Required |
| 13 | VDDIOSA capacitor is placed close to the pin | Required |
| 14 | VDDIOSB capacitor is placed close to the pin | Required |
| 15 | VDDIOSC capacitor is placed close to the pin | Required |
| 16 | AVDD33_USB capacitor is placed close to the pin | Required |
| 17 | AVDD33_ANA capacitor is placed close to the pin | Required |
| 18 | AVDD_BRF capacitor placed close to the pin | Required |
| 19 | AVDD33_AUD capacitor placed close to the pin | Required |
| 20 | AVDD33_DSI capacitor is placed close to the pin | Required |

</div>

### 4.4. Clock

<div align="center"><em>Table 4.4-1: Clock Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | Crystal placed close to the chip | Required |
| 2 | GND shielding applied around the crystal | Required |
| 3 | Copper keep-out is provided beneath the crystal: at least the top layer on a 4-layer board, and layers 2 and 3 where required | Required |
| 4 | Crystal-trace clearance to GND guard copper is greater than 3x the trace width | Required |

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
| 3 | Reserved Pi-type antenna matching network placed close to the chip side | Required |
| 4 | Continuous GND plane beneath the RF signal | Required |
| 5 | No high-speed digital signal traces cross beneath the RF signal | Required |
| 6 | No high-di/dt power traces cross beneath the RF signal | Required |

</div>

### 4.7. Audio

<div align="center"><em>Table 4.7-1: Audio Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | AU_ADC1P and AU_ADC1N parallel traces use ground guarding | Required |
| 2 | AU_ADC2P and AU_ADC2N parallel traces use ground guarding | Required |
| 3 | AU_DAC1P and AU_DAC1N parallel traces use ground guarding | Required |
| 4 | AU_DAC2P and AU_DAC2N parallel traces use ground guarding | Required |
| 5 | The AU_DAC1P, AU_DAC1N, AU_DAC2P, AU_DAC2N trace capacitance &lt; 10 pF, length &lt; 2cm | Required |

</div>

### 4.8. High-speed Signals

<div align="center"><em>Table 4.8-1: High-speed Signals Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | DSI differential signals meet the 100 Ω differential-impedance requirement | Required |
| 2 | DSI data differential pairs are length-matched to the clock differential pair within 200 mil | Required |
| 3 | DSI signals are routed on the same layer as much as possible | Required |

</div>

### 4.9. ADC

<div align="center"><em>Table 4.9-1: ADC Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | GPADC signal has no high-speed changing signal routed in parallel, or is properly guarded | Required |
| 2 | Battery-voltage divider resistors are placed close to the chip input pin | Required |
| 3 | SDMADC signal has no high-speed changing signal routed in parallel, or is properly guarded | Optional |

</div>

### 4.10. Test Points

<div align="center"><em>Table 4.10-1: Test Points Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | Test-point locations are suitable for probing or fixture soldering | Required |
| 2 | Program-download and crystal-calibration test points (VBAT, GND, SWDIO, SWCLK, VDDIOB, MODE, RESET, UART4_TXD, UART4_RXD, etc.) meet fixture size and location requirements | Required |

</div>

### 4.11. PCB Stack-up

<div align="center"><em>Table 4.11-1: PCB Stack-up Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | The layer adjacent to the main chip must be a continuous main-ground plane | Required |

</div>

## 5. Related Documents and References

[SiFli SF32LB58x Schematic & PCB Checklist (XLSX)]: https://wiki.sifli.com/hardware/index.html
[SiFli Chip Hardware Design Guide Index (Wiki)]: https://wiki.sifli.com/hardware/index.html

<div class="grid cards" markdown>

- :fontawesome-solid-file-excel: __[SiFli SF32LB58x Schematic & PCB Checklist (XLSX)]__
- :fontawesome-brands-wikipedia-w: __[SiFli Chip Hardware Design Guide Index (Wiki)]__

</div>
