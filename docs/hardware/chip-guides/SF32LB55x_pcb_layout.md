---
icon: lucide/layers
description: "PCB layout guidelines for the SF32LB55x MCU: footprint, stack-up, general PCB rules, interface routing, and the item-by-item PCB layout checklist."
tags:
    - Hardware
    - Chip
---

# SF32LB55x Hardware Design Guide — PCB Layout Guidelines

!!! note "Part of the SF32LB55x Hardware Design Guide"
    This page covers Section 6, PCB Layout Guidelines. Return to [Schematic Design Guidelines](SF32LB55x_schematic_design.md), or continue to [Design Review Checklist and References](SF32LB55x_review_and_reference.md).

## 6. PCB Layout Guidelines

### 6.1. Footprint and Stack-Up

Use the package drawing, land-pattern requirements, and assembly capability of the selected QFN or BGA package. BGA packages require early confirmation of ball escape, via strategy, solder-mask rules, and fabrication limits.

### 6.2. General PCB Rules

- Keep BUCK loops short and wide, with return current close to the switching loop.
- Keep RF, crystal, GPADC, and audio regions away from switching supplies, display clocks, motors, and chargers.
- Route high-speed memory and display interfaces over continuous reference ground.
- Place ESD protection close to connectors and route signals through the protection device first.
- Provide enough test points for power, boot, debug, RF, and production calibration.

### 6.3. Interface Routing

Clock traces should be short, shielded, and isolated from fast digital signals. RF should be controlled as a 50 ohm path with a compact matching network. Storage and display traces should be length-controlled according to their speed and routed as grouped buses. Audio and GPADC signals should be shielded and kept away from switching currents.

### 6.4. PCB Layout Checklist

Each table below covers one PCB layout review area. When an Applies To column is not present, the row applies to all variants covered by the workbook.

#### 6.4.1. Package

<div align="center"><em>Table 6.4-1: Package Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | Footprint matches the package SPEC | All variants | Required |

</div>

#### 6.4.2. Power Supply

<div align="center"><em>Table 6.4-2: Power Supply Checklist</em></div>

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

#### 6.4.3. Power Supply Capacitor and Inductor Placement

<div align="center"><em>Table 6.4-3: Power Supply Capacitor and Inductor Placement Checklist</em></div>

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

#### 6.4.4. Clock

<div align="center"><em>Table 6.4-4: Clock Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | Crystal placed close to the chip | All variants | Required |
| 2 | GND shielding applied around the crystal | All variants | Required |
| 3 | Copper keep-out is provided beneath the crystal: at least the top layer on a 4-layer board, and layers 2 and 3 where required | All variants | Required |
| 4 | Crystal-trace clearance to GND guard copper is greater than 3x the trace width | All variants | Required |
| 5 | The 32 kHz crystal signal does not run parallel to BUCK1; ground is placed between them | All variants | Required |

</div>

#### 6.4.5. Buttons

<div align="center"><em>Table 6.4-5: Buttons Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | Button's ESD protection device placed close to the button | All variants | Required |

</div>

#### 6.4.6. RF

<div align="center"><em>Table 6.4-6: RF Checklist</em></div>

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

#### 6.4.7. High-speed Signals

<div align="center"><em>Table 6.4-7: High-speed Signals Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | DSI differential signals meet the 100 Ω differential-impedance requirement | 555 only | Required |
| 2 | DSI data differential pairs are length-matched to the clock differential pair within 200 mil | 555 only | Required |
| 3 | DSI signals are routed on the same layer as much as possible | 555 only | Required |
| 4 | OPI PSRAM signal trace length matching is controlled within 200 mil | 555 only | Optional |

</div>

#### 6.4.8. ADC

<div align="center"><em>Table 6.4-8: ADC Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | GPADC signal has no high-speed changing signal routed in parallel, or is properly guarded | All variants | Required |
| 2 | Battery-voltage divider resistors are placed close to the chip input pin | All variants | Required |
| 3 | Power-voltage sensing signal is routed from the power source and uses ground guarding | All variants | Required |
| 4 | SDMADC signal has no high-speed changing signal routed in parallel, or is properly guarded | 555 only | Optional |

</div>

#### 6.4.9. Test Points

<div align="center"><em>Table 6.4-9: Test Points Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | Test-point locations are suitable for probing or fixture soldering | All variants | Required |
| 2 | Program-download and crystal-calibration test points (VBAT, GND, SWDCLK, SWDIO, MODE, RSTN, VDDIOA, UART3_TXD, UART3_RXD, etc.) are at least 0.8 mm, spaced 2 mm apart, and keep a 2 mm component-free area | All variants | Required |

</div>

#### 6.4.10. Ground

<div align="center"><em>Table 6.4-10: Ground Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | Layers adjacent to the main chip are a complete main-ground plane, with sufficient grounding vias | All variants | Required |
| 2 | Exposed pad (EPAD) is connected to the main ground through vias | All variants | Required |
| 3 | Area under the chip has enough grounding vias connected to the main ground plane | All variants | Required |
| 4 | A ring of grounding vias runs around the board edge | All variants | Required |

</div>
