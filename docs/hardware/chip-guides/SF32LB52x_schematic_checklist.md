---
icon: lucide/list-checks
description: "Item-by-item schematic review checklist for the SF32LB52x MCU, covering package, power, clock, RF, storage, display, and manufacturing checks."
tags:
    - Hardware
    - Chip
    - Checklist
---

# SF32LB52x Hardware Design Guide — Schematic Checklist

!!! note "Part of the SF32LB52x Hardware Design Guide"
    This page covers Section 5.8, the item-by-item schematic checklist. Return to [Minimum System, Power & Clock](SF32LB52x_schematic_design.md), the first of the three Schematic Design Guidelines pages.

## 5.8. Schematic Checklist

Each table below covers one functional block of the schematic. The Applies To column narrows a check point to a specific SF32LB52x power variant or silicon revision where the general "All variants" scope doesn't hold.

### 5.8.1. Package

<div align="center"><em>Table 5.8-1: Package Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | The package of the selected part number is correct, including pin names and pin numbers | All variants | Required |

</div>

### 5.8.2. Power Supply

<div align="center"><em>Table 5.8-2: Power Supply Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | VBUS supply voltage is <span class="flag-red">4.6 V–5.5 V</span> | 520/3/5/7 only | Required |
| 2 | If the "charge and light the screen immediately" requirement applies, do not use the internal charger — use an external charger IC with path management instead | 520/3/5/7 only | Required |
| 3 | The internal charger may be used only if it is acceptable to require charging to 3.6 V before software powers on the screen | 520/3/5/7 only | Required |
| 4 | An OVP device with an integrated LDO output (e.g. LP5305AQVF) is recommended: LDO output 4.7–5.4 V, load capability ≥0.5 A, over-current-protection trip ≥0.7 A | 520/3/5/7 only | Required |
| 5 | If an OVP device with adjustable OVLO is used, use 1%-tolerance divider resistors; OVLO threshold (V_OVLO_TH) error must be under 3%; set V_OVP min/max to 5.15 V (charger's max input voltage) – 5.55 V (the 52x charger's input upper limit) | 520/3/5/7 only | Required |
| 6 | If the on-chip charger is unused, VBUS may be left unconnected and its capacitor omitted — but VBAT then loses its output capability; use a 1 uF external capacitor on VBAT in this case | 520/3/5/7 only | Required |
| 7 | Battery-voltage sensing: the chip already routes an internal GPADC channel to VBAT (or VBATS) — do not additionally route VBAT to a GPADC pin | All variants | Required |
| 8 | <span class="flag-red">VCC and VBAT pin supply voltage is 3.2 V–4.7 V</span> | 520/3/5/7 only | Required |
| 9 | BUCK_LX and BUCK_FB connections are correct | All variants | Required |
| 10 | VDD_VOUT1 output has a test point, or a filter capacitor convenient for voltage measurement | All variants | Required |
| 11 | VDD_VOUT2 output has a test point, or a filter capacitor convenient for voltage measurement | All variants | Required |
| 12 | VDD_RET output has a test point, or a filter capacitor convenient for voltage measurement | All variants | Required |
| 13 | VDD_RTC output has a test point, or a filter capacitor convenient for voltage measurement | All variants | Required |
| 14 | AVDD_BRF is powered through VSYS | 520/3/5/7 only | Required |
| 15 | AVDD33_AUD is powered through LDO2 | 520/3/5/7 only | Required |
| 16 | VSYS is an MCU-internal-use supply — do not use it to power other peripherals | 520/3/5/7 only | Required |
| 17 | LDO2_OUT is recommended for memory, sensors, and similar peripherals; a load switch may be inserted for supply control | 520/3/5/7 only | Required |
| 18 | <span class="flag-red">Sum of peak current for all peripherals powered from LDO2 is at most 150 mA</span> | 520/3/5/7 only | Required |
| 19 | LDO3_OUT is recommended to power the vibration motor | 520/3/5/7 only | Required |
| 20 | <span class="flag-red">Sum of peak current for all peripherals powered from LDO3 is at most 150 mA</span> | 520/3/5/7 only | Required |
| 21 | LCD requires a dedicated low-Iq LDO supply | All variants | Required |
| 22 | Heart-rate sensor LED is recommended to be powered from VBAT | All variants | Required |
| 23 | Charging input requires an OVP circuit | All variants | Required |
| 24 | When the charging path needs path management — i.e. when battery voltage is too low and 5 V is supplied from the charger input — use a charger IC with path management; <span class="flag-red">the voltage into VCC must not exceed 4.7 V</span> | 520/3/5/7 only | Required |
| 25 | <span class="flag-red">SF32LB52DUB6: PVDD = 1.8 V</span> | 52D only | Required |
| 26 | <span class="flag-red">SF32LB52B/E/G/JUX6: PVDD = 3.3 V</span> | 52B/E/G/J | Required |
| 27 | <span class="flag-red">SF32LB52BU36 and SF32LB52BU56: VDD_SIP requires an external 3.3 V supply</span> | 52B only | Required |
| 28 | <span class="flag-red">SF32LB52DUB6: VDD_SIP requires an external 1.8 V supply</span> | 52D only | Required |
| 29 | <span class="flag-red">SF32LB52E/G/JUX6: VDD_SIP needs no external supply — an external capacitor is sufficient</span> | 52E/G/J | Required |
| 30 | VBATS is the battery-voltage-sense signal; battery-voltage sensing range is 0–4.5 V | 52B/D/E/G/J | Required |

</div>

### 5.8.3. Power Supply Capacitors and Inductors

<div align="center"><em>Table 5.8-3: Power Supply Capacitors and Inductors Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | VBUS capacitor ≥10 uF | 520/3/5/7 only | Required |
| 2 | VBAT capacitor ≥4.7 uF | 520/3/5/7 only | Required |
| 3 | On SF32LB523/5/7, pin 24 is VCC — external capacitor ≥10 uF | 523/5/7 | Required |
| 4 | On 523/5/7/B/D/E/G/J variants, <span class="flag-red">pin 23 is VDD_SIP — external capacitor ≥2.2 uF</span> | 523/5/7/B/D/E/G/J | Required |
| 5 | On SF32LB520, pin 24 is a GPIO, PA21 | 520/SS6500 | Required |
| 6 | On SF32LB520, pin 23 is VCC — external capacitor ≥10 uF | 520/SS6500 | Required |
| 7 | BUCK_FB capacitor = 4.7 uF | All variants | Required |
| 8 | VDD_VOUT1 capacitor = 4.7 uF | All variants | Required |
| 9 | VDD_VOUT2 capacitor = 4.7 uF | All variants | Required |
| 10 | VDD_RET capacitor = 0.47 uF | All variants | Required |
| 11 | VDD_RTC capacitor = 1 uF | All variants | Required |
| 12 | <span class="flag-red">VDD33_VOUT1 total capacitance ≤9.6 uF</span> | <span class="flag-red">520/3/5/7 only</span> | Required |
| 13 | <span class="flag-red">VDD33_VOUT2 total capacitance ≤9.6 uF</span> | <span class="flag-red">520/3/5/7 only</span> | Required |
| 14 | <span class="flag-red">VSYS total capacitance ≤9.6 uF</span> | <span class="flag-red">520/3/5/7 only</span> | Required |
| 15 | MIC_BIAS capacitor = 1 uF | All variants | Required |
| 16 | <span class="flag-red">AVDD_BRF capacitor = 4.7 uF</span> | <span class="flag-red">All variants</span> | Required |
| 17 | <span class="flag-red">AVDD33_AUD capacitor = 2.2 uF</span> | <span class="flag-red">All variants</span> | Required |
| 18 | AUD_VREF capacitor = 1 uF | All variants | Required |
| 19 | <span class="flag-red flag-yellow">VSYS capacitor = 4.7 uF</span> | <span class="flag-red flag-yellow">520/3/5/7 only</span> | Required |
| 20 | GPADC VREFP capacitor = 4.7 uF | All variants | Required |
| 21 | BUCK inductor is a part number listed on the [SiFli Approved Vendor List] (AVL) | All variants | Required |
| 22 | If the BUCK inductor is not AVL-listed, it meets L = 4.7 uH, DCR ≤0.4 Ω, Isat ≥450 mA | All variants | Required |
| 23 | <span class="flag-red">If GPS or other interference-sensitive peripherals are present, reserve a shunt-to-ground capacitor footprint at BUCK_LX; the value depends on actual test results</span> | <span class="flag-red">All variants</span> | Required |
| 24 | <span class="flag-red">Quiescent current of the selected DCDC is recorded and meets project requirements</span> | <span class="flag-red">All variants</span> | Required |
| 25 | <span class="flag-red">Quiescent current of the selected LDO is recorded and meets project requirements</span> | <span class="flag-red">All variants</span> | Required |

</div>

### 5.8.4. Clock

<div align="center"><em>Table 5.8-4: Clock Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | Main 48 MHz crystal is an AVL-listed part number | All variants | Required |
| 2 | If the 48 MHz crystal is not AVL-listed, it meets 7 pF ≤ CL ≤ 12 pF (8.8 pF recommended), frequency tolerance ≤±10 ppm, ESR ≤30 Ω (22 Ω recommended) | All variants | Required |
| 3 | RTC 32.768 kHz crystal is an AVL-listed part number | All variants | Required |
| 4 | If the 32.768 kHz crystal is not AVL-listed, it meets CL ≤12.5 pF (7 pF recommended), frequency tolerance ≤±20 ppm, ESR ≤80 kΩ (38 kΩ recommended) | All variants | Required |
| 5 | On the 52x, PA24/25/26/27 are all capable of outputting the xtal32k clock | All variants | Required |

</div>

### 5.8.5. Bootstrap Configuration

<div align="center"><em>Table 5.8-5: Bootstrap Configuration Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | If external <span class="flag-purple">SPI NOR flash is used, PA13 and PA17 need no pull-up</span> | All variants | Required |
| 2 | If external <span class="flag-red">SPI NAND flash</span> is used, PA13 needs no pull-up; <span class="flag-red">PA17 needs a 7.5 kΩ pull-up</span> to the flash's VDD | All variants | Required |
| 3 | If external <span class="flag-blue">SD NAND flash</span> is used, PA17 needs no pull-up; <span class="flag-blue">PA13 needs a 7.5 kΩ pull-up</span> to the flash's VDD | All variants | Required |
| 4 | If external <span class="flag-green">eMMC is used, both PA13 and PA17 need 7.5 kΩ pull-ups</span> to the eMMC's VCCQ | <span class="flag-red">52D/E/G/J</span> | Required |

</div>

### 5.8.6. RF

<div align="center"><em>Table 5.8-6: RF Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | The ANT signal is annotated with the single-ended 50 Ω characteristic-impedance requirement | All variants | Required |
| 2 | A Pi-type matching network is reserved on the ANT signal: a parallel NC (do-not-populate) capacitor and a 15 pF series capacitor | All variants | Required |
| 3 | If spurious-emission filtering must be considered, a Pi-type matching network is reserved with a 2.7 nH series inductor and a 2 pF parallel capacitor | All variants | Optional |
| 4 | <span class="flag-red">If external PA/LNA control is required, PA00 connects to RX_EN and PA01 connects to TX_EN</span> | All variants | Optional |

</div>

### 5.8.7. I/O Resource Allocation

<div align="center"><em>Table 5.8-7: I/O Resource Allocation Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | A GPIO resource-allocation table matching the schematic is provided | All variants | Required |
| 2 | The GPIO allocation in the resource table matches the schematic | All variants | Required |
| 3 | The actual GPIO allocation follows SiFli's recommendation (refer to the HDK I/O config file) | All variants | Required |

</div>

### 5.8.8. Hardware Wake-up

<div align="center"><em>Table 5.8-8: Hardware Wake-up Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | <span class="flag-red">Wake-up interrupt sources are correct (available wake-up interrupt sources: PA24–PA27 and PA34–PA44, 15 pins total)</span> | <span class="flag-red">All variants</span> | Required |

</div>

### 5.8.9. Storage

<div align="center"><em>Table 5.8-9: Storage Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | If MPI2 (SD1) connects to SPI NOR flash: <span class="flag-red">PA13 (MPI D1) and PA17 (MPI D3) both need no pull-up</span> | All variants | Required |
| 2 | If MPI2 (SD1) connects to SPI NAND flash: <span class="flag-red">PA13 (MPI D1) needs no pull-up; PA17 (MPI D3) must have a 7.5 kΩ pull-up</span> | All variants | Required |
| 3 | If MPI2 (SD1) connects to SD NAND flash: <span class="flag-red">PA13 (SD D3) must have a 7.5 kΩ pull-up, PA17 (SD D1) needs no pull-up, PA15 (SD CMD) must have a 7.5 kΩ pull-up</span> | All variants | Required |
| 4 | If MPI2 (SD1) connects to eMMC: <span class="flag-red">PA13 (SD D3) and PA17 (SD D1) both must have 7.5 kΩ pull-ups, PA15 (SD CMD) must have a 7.5 kΩ pull-up</span> | <span class="flag-red">52D/E/G/J</span> | Required |
| 5 | SF32LB520 and SF32LB52B external storage must be SPI NOR flash | 520/B | Required |
| 6 | When shutdown power consumption matters, <span class="flag-red">external flash power must be switched by PA11</span>, active-high (on) / active-low (off) | 520/3/5/7 only | Required |
| 7 | When shutdown power consumption matters, <span class="flag-red">external flash power must be switched by PA21</span>, active-high (on) / active-low (off) | <span class="flag-red">52B/D/E/G/J</span> | Required |
| 8 | When shutdown power consumption matters, <span class="flag-red">VDD_SIP supply must be switched by PA21</span>, active-high (on) / active-low (off) | <span class="flag-red">52B/D/E/G/J</span> | Required |
| 9 | <span class="flag-red">When MPI drives a NOR flash of 32 MB or larger, the flash supply must be switchable via PA21 so it can be powered off</span> | <span class="flag-red">52B/D/E/G/J</span> | Required |
| 10 | If SD1 connects to an SD NAND device, signal connections are correct | All variants | Required |
| 11 | <span class="flag-red">Flash CLK and data lines have 33 Ω series resistors</span> | <span class="flag-red">All variants</span> | Required |
| 12 | <span class="flag-red">When two external NOR flash devices are used, CLK/D0–D3 are shared; flash 1's CS uses PA12, flash 2's CS uses PA26, an internally pulled-up pin — well suited to an active-low CS signal since it defaults high (deselected) at reset</span> | <span class="flag-red">All variants</span> | Required |
| 13 | <span class="flag-red">When two external NOR flash devices are used, the first must be 16 MB; the second may be 8 MB or 16 MB</span> | <span class="flag-red">All variants</span> | Required |
| 14 | The peripheral device's I/O logic level matches the main chip's | All variants | Required |
| 15 | <span class="flag-red">The NOR flash part is qualified in the key-component selection guide (an unqualified part risks ROM failing to recognize it and the system failing to boot)</span> | <span class="flag-red">All variants</span> | Required |
| 16 | <span class="flag-red">The SPI/SD NAND flash part is qualified in the key-component selection guide (an unqualified part risks ROM failing to recognize it and the system failing to boot)</span> | <span class="flag-red">All variants</span> | Required |

</div>

### 5.8.10. Display

<div align="center"><em>Table 5.8-10: Display Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | If connected to a QSPI display, signal connections are correct | All variants | Required |
| 2 | If connected to an 8080-interface display, signal connections are correct | All variants | Required |
| 3 | If connected to a JDI display, signal connections are correct | All variants | Required |
| 4 | LCD QSPI signal connections are correct; <span class="flag-red">CLK and data lines have 100 Ω series resistors</span> | All variants | Required |
| 5 | LCD RSTB connection is correct (PA0 recommended) | All variants | Required |
| 6 | LCDC TE connection is correct (connects to the panel's TE or Fmark signal) | All variants | Required |
| 7 | TP signals follow the recommended pin assignment (refer to the EVB I/O config file) | All variants | Required |
| 8 | Always-on-display support requirement is confirmed | All variants | Required |
| 9 | A low-Iq LDO powers the display; <span class="flag-red">PA30 is recommended to control the LDO enable</span> | All variants | Required |
| 10 | TP and LCD power-supply independence requirement (shared or separate control) is confirmed | All variants | Required |
| 11 | If the LCD integrates a light sensor, the light sensor's power is also provided | All variants | Required |
| 12 | TFT LCD backlight control: if the backlight turns on with a high signal and off with a low signal (active-high), use a pull-down (PD) GPIO; if it turns on with a low signal and off with a high signal (active-low), use a pull-up (PU) GPIO | All variants | Required |
| 13 | <span class="flag-red">SPI LCD: 3-wire mode — CS to PA03, CLK to PA04, DATA to PA05; 4-wire mode — CS to PA03, CLK to PA04, DATA to PA05, DC to PA06</span> | All variants | Required |
| 14 | Sharp Memory/JDI display on the MCU's JDI interface: VCOM and VB connect to MCU PA24, VA connects to MCU PA25, R0/G0/B0 connect to MCU R1/G1/B1, R1/G1/B1 connect to MCU R2/G2/B2, GSP connects to MCU VST, BSP connects to MCU HST, GCK connects to MCU VCK, BCK connects to MCU HCK, GEN connects to MCU ENB, INTB connects to MCU XRST | All variants | Required |
| 15 | The peripheral device's I/O logic level matches the main chip's | All variants | Required |

</div>

### 5.8.11. GPADC

<div align="center"><em>Table 5.8-11: GPADC Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | GPADC input is connected to the corresponding pin <span class="flag-red">(PA28–PA34, 7 GPIOs support GPADC muxing)</span> | All variants | Optional |
| 2 | Voltage into GPADC stays within 0–3.3 V | All variants | Optional |
| 3 | For any resistor-divider input measured by GPADC, use 1%-tolerance divider resistors; <span class="flag-red">each GPADC channel has a 100 nF filter capacitor placed close to the chip pin</span> | All variants | Required |

</div>

### 5.8.12. Buttons

<div align="center"><em>Table 5.8-12: Buttons Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | Button wake-up requirement (needed or not) is confirmed | All variants | Required |
| 2 | Ordinary-button connection is correct (pull-up present, correct resistor value, correct pull-up voltage domain) | All variants | Required |
| 3 | Power button uses PA34, active-high, 10-second long-press reset; <span class="flag-red">the 10 kΩ pull-down resistor must be on the main board</span> | All variants | Required |
| 4 | All button signals have ESD protection | All variants | Required |

</div>

### 5.8.13. EOS and ESD Protection

<div align="center"><em>Table 5.8-13: EOS and ESD Protection Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | Charging interface has EOS, ESD, and OVP design | All variants | Required |
| 2 | Battery interface has an ESD device | All variants | Required |
| 3 | Antenna interface has an ESD device | All variants | Required |
| 4 | LCD and TP power interfaces have ESD devices | All variants | Required |
| 5 | TP I2C, RST, and INT lines have ESD devices | All variants | Required |
| 6 | Heart-rate sensor power interface and signal lines have ESD devices | All variants | Required |

</div>

### 5.8.14. I2C

<div align="center"><em>Table 5.8-14: I2C Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | I2C has pull-ups with the correct resistor value; if 400 kHz operation is required, 2.2 kΩ pull-ups are recommended; use the peripheral-side voltage domain, and shut the pull-up supply off together with the peripheral at power-down | All variants | Required |
| 2 | I2C interrupt signal supports hardware wake-up where required | All variants | Required |
| 3 | I2C peripherals such as G-sensor, heart-rate, and geomagnetic sensors support reading all data in a single burst | All variants | Required |
| 4 | If multiple devices share one I2C bus, their addresses are distinguished | All variants | Required |

</div>

### 5.8.15. Analog Audio

<div align="center"><em>Table 5.8-15: Analog Audio Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | MEMS mic connection is correct | All variants | Optional |
| 2 | MEMS mic is powered from MIC_BIAS | All variants | Optional |
| 3 | Analog ECM single-ended mic connection is correct | All variants | Optional |
| 4 | Analog ECM single-ended mic is powered from MIC_BIAS | All variants | Optional |
| 5 | All audio ADC inputs have a DC-blocking capacitor of at least 2.2 uF | All variants | Optional |
| 6 | Audio DAC outputs DACP and DACN each have a 1 kΩ series resistor near the chip, with a 1.5 nF capacitor in parallel between DACP and DACN | All variants | Optional |
| 7 | <span class="flag-red">AW8155B is recommended for the audio power amplifier, configured in software for Class A/B mode; other amplifier parts require test verification</span> | All variants | Optional |
| 8 | <span class="flag-red">If the chip's integrated analog audio ADC path is unused, ADCP has a 0 Ω series resistor to ground</span> | All variants | Optional |

</div>

### 5.8.16. SPI

<div align="center"><em>Table 5.8-16: SPI Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | SPI connection is correct: MCU-side SDO connects to the peripheral's SDI, MCU-side SDI connects to the peripheral's SDO | All variants | Optional |
| 2 | SPI peripheral's timing requirements are met | All variants | Optional |
| 3 | The peripheral device's I/O logic level matches the main chip's | All variants | Optional |

</div>

### 5.8.17. USART and Debug Interface

<div align="center"><em>Table 5.8-17: USART and Debug Interface Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | PA18/PA19 (muxed as DBG_UART) form the program-download and debug interface — test points are reserved, <span class="flag-red">with a 100 Ω series resistor</span> | All variants | Required |
| 2 | When connecting to a device, MCU RXD connects to the peripheral's TXD, and MCU TXD connects to the peripheral's RXD | All variants | Required |
| 3 | When PA35/PA36 are muxed as UART to a peripheral, ensure that at MCU reset the connected peripheral is powered down, or software drives these pins low | All variants | Required |
| 4 | The peripheral device's I/O logic level matches the main chip's | All variants | Required |

</div>

### 5.8.18. PWM

<div align="center"><em>Table 5.8-18: PWM Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | LCD backlight control uses PA1 (recommended) | All variants | Optional |
| 2 | Vibration motor PWM pin uses PA20 | All variants | Required |

</div>

### 5.8.19. USB

<div align="center"><em>Table 5.8-19: USB Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | USB interface connection is correct | All variants | Optional |
| 2 | USB interface has ESD protection | All variants | Optional |
| 3 | With USB left enabled during normal (non-sleep) operation, the host can detect insertion/removal. If detection is needed while the MCU sleeps, a VBUS divider circuit is added that outputs a level matching the IO voltage into the MCU's wake pin — sharing this pin with charger-insertion detection is recommended | All variants | Optional |

</div>

### 5.8.20. Power Consumption

<div align="center"><em>Table 5.8-20: Power Consumption Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | LDO/DCDC parts have active-high enable; if the output defaults to off, a 1 M–5.1 MΩ pull-down from EN to ground is added, sized to the project's power-consumption requirements | All variants | Required |
| 2 | MOSFET-based power switching uses a PMOS+NMOS combination, control pin active-high (on) / active-low (off), with a 1 MΩ pull-down on the control pin to ground | All variants | Required |
| 3 | External flash power switch is controlled by PA11 | 520/3/5/7 only | Required |
| 4 | <span class="flag-red">External flash and VDD_SIP power switch is controlled by PA21</span> | <span class="flag-red">52A/D</span>[^52a-note] | Required[^52a-category-note] |
| 5 | VSYS, when used as a GPIO pull-up supply, is always on; this is confirmed to meet power-consumption requirements | 520/3/5/7 only | Required |
| 6 | When LDO2 or LDO3 is used as a GPIO pull-up supply, the LDO2/LDO3 power-off scenario is confirmed to still meet design requirements | 520/3/5/7 only | Required |
| 7 | I2C pull-up supply switches together with the peripheral's IO supply, to avoid leakage | All variants | Required |
| 8 | PA09 usage note: drives high to enable at screen-on, driven low at sleep | Silicon rev. A2 and earlier | Required |
| 9 | Deep Sleep mode base-current requirement is defined and recorded | All variants | Required |
| 10 | <span class="flag-red">Sum of base currents of all selected peripherals in Deep Sleep mode is recorded and meets project requirements</span> | <span class="flag-red">All variants</span> | Required |
| 11 | Standby mode base-current requirement is defined and recorded | All variants | Required |
| 12 | <span class="flag-red">Sum of base currents of all selected peripherals in Standby mode is recorded and meets project requirements</span> | <span class="flag-red">All variants</span> | Required |

[^52a-note]: The source spreadsheet lists this as "52A/52D." SiFli's own naming elsewhere (including a similar inconsistency noted in the [SF32LB52x Hardware Design Guide][SF32LB52x Hardware Design Guide - Dev], Section 5.4.1.2) uses SF32LB52B/D/E/G/J, with no "52A" part number — verify this check point against the exact chip model and datasheet before relying on it.
[^52a-category-note]: Treated as Required because the underlying design intent matches the surrounding storage-power-control requirements, even though the source variant label itself is inconsistent.

</div>

### 5.8.21. Download and Debug Test Points

<div align="center"><em>Table 5.8-21: Download and Debug Test Points Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | Program-download/debug test points reserve VBAT, GND, PA18 (DBG_UART_RXD), PA19 (DBG_UART_TXD), VSYS, PA34, and similar test points | All variants | Required |

</div>

[SF32LB52x Hardware Design Guide - Dev]: SF32LB52x_hardware_design_guide.md
[SiFli Approved Vendor List]: ../cad-components/sifli-approved-vendor-list.md
