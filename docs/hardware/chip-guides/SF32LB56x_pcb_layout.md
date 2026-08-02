---
icon: lucide/layers
description: "PCB layout guidelines for the SF32LB56x MCU: footprint, stack-up, critical routing, and the item-by-item PCB layout checklist."
tags:
    - Hardware
    - Chip
---

# SF32LB56x Hardware Design Guide — PCB Layout Guidelines

!!! note "Part of the SF32LB56x Hardware Design Guide"
    This page covers Section 6, PCB Layout Guidelines. Return to [Schematic Design Guidelines](SF32LB56x_schematic_design.md), or continue to [Design Review Checklist and References](SF32LB56x_review_and_reference.md).

## 6. PCB Layout Guidelines

### 6.1. Footprint and Stack-Up

U designs must meet QFN68L footprint and fanout requirements. V designs must meet WBBGA175 footprint, solder-mask, blind-via, buried-via, and HDI process requirements. Confirm the PCB supplier can support the selected fanout strategy before layout release.

### 6.2. Critical Routing

- Keep DC-DC inductors and capacitors close to the chip and PMIC; keep switching loops compact.
- Route RF as a controlled 50 ohm path with continuous reference ground and dense ground stitching.
- Keep crystal traces short and isolated from switching, display, motor, USB, and RF noise.
- Keep display and storage buses grouped, length-controlled, and referenced to continuous ground.
- Route audio and GPADC signals away from PMIC, BUCK, RF, display, and motor currents.
- Place ESD devices close to connectors, and route signals through the protection device first.

### 6.3. PCB Layout Checklist

Each table below covers one PCB layout review area. When an Applies To column is not present, the row applies to all variants covered by the workbook.

#### 6.3.1. Package

<div align="center"><em>Table 6.3-1: Package Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | Footprint matches the package SPEC | Required |

</div>

#### 6.3.2. Power Supply

<div align="center"><em>Table 6.3-2: Power Supply Checklist</em></div>

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

#### 6.3.3. Power Supply Capacitor and Inductor Placement

<div align="center"><em>Table 6.3-3: Power Supply Capacitor and Inductor Placement Checklist</em></div>

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

#### 6.3.4. Clock

<div align="center"><em>Table 6.3-4: Clock Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | Crystal placed close to the chip | Required |
| 2 | GND shielding applied around the crystal | Required |
| 3 | Copper keep-out applied under the crystal (4-layer PTH board: top layer; 6-layer HDI board: top layer and layer 2) | Required |
| 4 | Ground-fill clearance along the crystal traces is greater than 1.5x the trace width | Required |
| 5 | 32 kHz crystal's parallel trace pair spacing is greater than 2x the trace spacing | Required |

</div>

#### 6.3.5. Buttons

<div align="center"><em>Table 6.3-5: Buttons Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | Button's ESD protection device placed close to the button | Required |

</div>

#### 6.3.6. RF

<div align="center"><em>Table 6.3-6: RF Checklist</em></div>

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

#### 6.3.7. Audio

<div align="center"><em>Table 6.3-7: Audio Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | AU_ADCP/AU_ADCN are routed as differential traces with ground guarding | Required |
| 2 | AU_DACP/AU_DACN are routed as differential traces with ground guarding | Required |
| 3 | AU_DACP/AU_DACN traces are short enough that parasitic capacitance is below 10 pF | Required |
| 4 | AVDD33_ANA, AVDD33_AUD power traces use ground guarding, stay away from high-current noisy signals, use star routing, and each trace is at least 5 mm long | Required |
| 5 | AVSS is connected through vias to main-ground plane | Required |

</div>

#### 6.3.8. ADC

<div align="center"><em>Table 6.3-8: ADC Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | No high-speed signal runs parallel to the GPADC signal without ground guarding | Required |
| 2 | Battery-voltage divider resistors are placed close to the chip input pin | Required |

</div>

#### 6.3.9. Test Points

<div align="center"><em>Table 6.3-9: Test Points Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | Test-point locations are suitable for probing or fixture soldering | Required |
| 2 | Program-download and crystal-calibration test points (VBAT, GND, SWDIO, SWCLK, VDDIO3 or VDDIO4, MODE, UART4_TXD, UART4_RXD, etc.) meet fixture size and location requirements | Required |

</div>

#### 6.3.10. Ground

<div align="center"><em>Table 6.3-10: Ground Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | Layers adjacent to the main chip are a complete main-ground plane, with sufficient grounding vias | Required |
| 2 | PVSS is connected through vias to main ground | Required |
| 3 | Area under the chip has enough grounding vias connected to the main ground plane | Required |
| 4 | A ring of grounding vias runs around the board edge | Required |

</div>
