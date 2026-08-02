---
icon: lucide/list-checks
description: "Item-by-item PCB layout review checklist for the SF32LB52x MCU, covering package, routing, power, and grounding checks."
tags:
    - Hardware
    - Chip
    - Checklist
---

# SF32LB52x Hardware Design Guide — PCB Layout Checklist

!!! note "Part of the SF32LB52x Hardware Design Guide"
    This page covers Section 6.15, the item-by-item PCB layout checklist. Return to [PCB Layout Guidelines](SF32LB52x_pcb_layout.md).

## 6.15. PCB Layout Checklist

Unlike the schematic checklist, these layout rules don't vary by power variant, so there is no Applies To column — every check point applies to all SF32LB52x variants.

### 6.15.1. Package

<div align="center"><em>Table 6.15-1: Package Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | Footprint matches the package SPEC | Required |

</div>

### 6.15.2. Power Supply Routing

<div align="center"><em>Table 6.15-2: Power Supply Routing Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | <span class="flag-red">VBUS supply trace ≥16 mil</span> | Required |
| 2 | <span class="flag-red">VBAT supply trace ≥16 mil</span> | Required |
| 3 | <span class="flag-red">VCC supply trace ≥12 mil</span> | Required |
| 4 | LDO2_OUT supply trace ≥10 mil | Required |
| 5 | LDO3_OUT supply trace ≥8 mil | Required |
| 6 | <span class="flag-red">PMU_BUCK_VSW and PMU_BUCK_VOUT traces ≥10 mil</span> | Required |
| 7 | AVDD_BRF supply trace ≥8 mil | Required |
| 8 | <span class="flag-red">AVDD33_AUD supply trace ≥8 mil</span> | Required |

</div>

### 6.15.3. Power Supply Capacitor and Inductor Placement

<div align="center"><em>Table 6.15-3: Power Supply Capacitor and Inductor Placement Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | VBUS capacitor placed close to the pin | Required |
| 2 | VBAT capacitor placed close to the pin | <span class="flag-red">Optional</span> |
| 3 | VCC capacitor placed close to the pin | Required |
| 4 | LDO2_OUT capacitor placed close to the pin | <span class="flag-red">Optional</span> |
| 5 | LDO3_OUT capacitor placed close to the pin | <span class="flag-red">Optional</span> |
| 6 | VSYS capacitor placed close to the pin | Required |
| 7 | BUCK inductor placed close to the chip | <span class="flag-red">Optional</span> |
| 8 | BUCK decoupling capacitor placed as close as possible to the chip pin | Required |
| 9 | VDD_HPSYS capacitor placed close to the pin | Required |
| 10 | VDD_LPSYS capacitor placed close to the pin | Required |
| 11 | VDD_RET capacitor placed close to the pin | Required |
| 12 | VDD_RTC capacitor placed close to the pin | Required |
| 13 | AVDD_BRF capacitor placed close to the pin | Required |
| 14 | <span class="flag-red">AVDD33_AUD</span> capacitor placed close to the pin | Required |

</div>

### 6.15.4. Clock

<div align="center"><em>Table 6.15-4: Clock Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | Crystal placed close to the chip | Required |
| 2 | GND shielding applied around the crystal | Required |
| 3 | Copper keep-out applied under the crystal (4-layer PTH board: top layer; 6-layer HDI board: top layer and layer 2) | Required |
| 4 | Ground-fill clearance along the crystal traces is greater than 1.5x the trace width | Required |
| 5 | 32 kHz crystal's parallel trace pair spacing is greater than 2x the trace spacing | Required |

</div>

### 6.15.5. Buttons

<div align="center"><em>Table 6.15-5: Buttons Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | Button's ESD protection device placed close to the button | Required |

</div>

### 6.15.6. RF

<div align="center"><em>Table 6.15-6: RF Checklist</em></div>

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

</div>

### 6.15.7. Audio

<div align="center"><em>Table 6.15-7: Audio Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | ADCP is properly ground-guarded | Required |
| 2 | DACP/DACN follow differential routing with ground guarding | Required |
| 3 | DACP/DACN traces are short enough that parasitic capacitance stays below 10 pF | Required |
| 4 | AVDD_BRF/<span class="flag-red">AVDD33_AUD</span> power routing is ground-guarded and kept away from high-current, strongly interfering signals | Required |

</div>

### 6.15.8. ADC

<div align="center"><em>Table 6.15-8: ADC Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | No high-speed signal runs parallel to the GPADC signal without ground guarding | Required |

</div>

### 6.15.9. Test Points

<div align="center"><em>Table 6.15-9: Test Points Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | Test-point locations are suitable for probing or fixture soldering | Required |
| 2 | Program-download test points (VBAT, GND, PA18/DBG_UART_RXD, PA19/DBG_UART_TXD, LDO2_OUT, PA0, PA1, PA34, etc.) meet the size and location requirements of the test fixture | Required |

</div>

### 6.15.10. Ground

<div align="center"><em>Table 6.15-10: Ground Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | Layers adjacent to the main chip are a complete main-ground plane, with sufficient grounding vias | Required |
| 2 | Exposed pad (EPAD) is connected to the main ground through vias | Required |
| 3 | Area under the chip has enough grounding vias connected to the main ground plane | Required |
| 4 | <span class="flag-red">A ring of grounding vias runs around the board edge</span> | Required |

</div>
