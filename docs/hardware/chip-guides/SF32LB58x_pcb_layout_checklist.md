---
icon: lucide/list-checks
description: "Item-by-item PCB layout review checklist for the SF32LB58x MCU, covering package, power, clock, RF, audio, high-speed signals, and stack-up checks."
tags:
    - Hardware
    - Chip
    - Checklist
---

# SF32LB58x Hardware Design Guide — PCB Layout Checklist

!!! note "Part of the SF32LB58x Hardware Design Guide"
    This page covers Section 6.18, the item-by-item PCB layout checklist. Return to [PCB Layout Guidelines](SF32LB58x_pcb_layout.md).

## 6.18. PCB Layout Checklist

Each table below covers one PCB layout review area. When an Applies To column is not present, the row applies to all variants covered by the workbook.

### 6.18.1. Package

<div align="center"><em>Table 6.18-1: Package Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | Footprint matches the package SPEC | Required |

</div>

### 6.18.2. Power Supply

<div align="center"><em>Table 6.18-2: Power Supply Checklist</em></div>

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

### 6.18.3. Power Supply Capacitor and Inductor Placement

<div align="center"><em>Table 6.18-3: Power Supply Capacitor and Inductor Placement Checklist</em></div>

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

### 6.18.4. Clock

<div align="center"><em>Table 6.18-4: Clock Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | Crystal placed close to the chip | Required |
| 2 | GND shielding applied around the crystal | Required |
| 3 | Copper keep-out is provided beneath the crystal: at least the top layer on a 4-layer board, and layers 2 and 3 where required | Required |
| 4 | Crystal-trace clearance to GND guard copper is greater than 3x the trace width | Required |

</div>

### 6.18.5. Buttons

<div align="center"><em>Table 6.18-5: Buttons Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | Button's ESD protection device placed close to the button | Required |

</div>

### 6.18.6. RF

<div align="center"><em>Table 6.18-6: RF Checklist</em></div>

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

### 6.18.7. Audio

<div align="center"><em>Table 6.18-7: Audio Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | AU_ADC1P and AU_ADC1N parallel traces use ground guarding | Required |
| 2 | AU_ADC2P and AU_ADC2N parallel traces use ground guarding | Required |
| 3 | AU_DAC1P and AU_DAC1N parallel traces use ground guarding | Required |
| 4 | AU_DAC2P and AU_DAC2N parallel traces use ground guarding | Required |
| 5 | The AU_DAC1P, AU_DAC1N, AU_DAC2P, AU_DAC2N trace capacitance &lt; 10 pF, length &lt; 2cm | Required |

</div>

### 6.18.8. High-speed Signals

<div align="center"><em>Table 6.18-8: High-speed Signals Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | DSI differential signals meet the 100 Ω differential-impedance requirement | Required |
| 2 | DSI data differential pairs are length-matched to the clock differential pair within 200 mil | Required |
| 3 | DSI signals are routed on the same layer as much as possible | Required |

</div>

### 6.18.9. ADC

<div align="center"><em>Table 6.18-9: ADC Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | GPADC signal has no high-speed changing signal routed in parallel, or is properly guarded | Required |
| 2 | Battery-voltage divider resistors are placed close to the chip input pin | Required |
| 3 | SDMADC signal has no high-speed changing signal routed in parallel, or is properly guarded | Optional |

</div>

### 6.18.10. Test Points

<div align="center"><em>Table 6.18-10: Test Points Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | Test-point locations are suitable for probing or fixture soldering | Required |
| 2 | Program-download and crystal-calibration test points (VBAT, GND, SWDIO, SWCLK, VDDIOB, MODE, RESET, UART4_TXD, UART4_RXD, etc.) meet fixture size and location requirements | Required |

</div>

### 6.18.11. PCB Stack-up

<div align="center"><em>Table 6.18-11: PCB Stack-up Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | The layer adjacent to the main chip must be a continuous main-ground plane | Required |

</div>
