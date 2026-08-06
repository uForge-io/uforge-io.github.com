---
icon: lucide/clipboard-check
description: "Design review checklist, related documents and references, reference schematic/PCB/mechanical/power appendices, and revision history for the SF32LB52x hardware design guide."
tags:
    - Hardware
    - Chip
---

# SF32LB52x Hardware Design Guide — Design Review Checklist and References

!!! note "Part of the SF32LB52x Hardware Design Guide"
    This page covers Sections 7-10: Design Review Checklist, Related Documents and References, Appendices, and Revision History. Return to [PCB Layout Guidelines](SF32LB52x_pcb_layout.md).

## 7. Design Review Checklist

- [ ] Minimum-system review is complete: exact variant, package, power tree, boot medium, bootstrap pins, debug/download access, clocks, and wake strategy are all documented
- [ ] The exact chip model and power variant are confirmed, and power schematics from the two variants are not mixed
- [ ] Processor power pins (VBUS/VBAT/VCC, or PVDD/VDDIOA/VDD_SIP) are within the datasheet voltage range
- [ ] BUCK inductor meets 4.7 uH ±20%, DCR ≤0.4 Ω, Isat ≥450 mA
- [ ] Battery-powered variant: charging path, OVP device voltage range, and integrated-LDO output capacitance are verified
- [ ] 48 MHz and 32.768 kHz crystals meet the recommended specifications, with routing and keep-out zones satisfied
- [ ] RF trace is 50 Ω impedance, with the matching network placed close to the chip
- [ ] Storage boot configuration (including the regular-powered variant's eMMC option) matches the Bootstrap pin settings
- [ ] Storage power switches are uniformly controlled through PA21, active high (on) / low (off)
- [ ] USB and SDIO differential trace impedance and length matching meet requirements
- [ ] DBG_UART/SWD multiplexed pins and production test points are reserved
- [ ] Key component part numbers have been verified against the latest [SiFli Approved Vendor List][SiFli Approved Vendor List (AVL)]

## 8. Related Documents and References

[SF32LB52x Datasheet (Official PDF)]: https://downloads.sifli.com/silicon/DS0052-SF32LB52x-%E8%8A%AF%E7%89%87%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V2p4.pdf?
[SF32LB52x User Manual (Official PDF)]: https://downloads.sifli.com/silicon/UM0052-SF32LB52x-%E7%94%A8%E6%88%B7%E6%89%8B%E5%86%8C%20V0p3.pdf?
[SF32LB52 Hardware Reference Design Package]: https://downloads.sifli.com/hardware/files/documentation/SF32LB52-%E7%A1%AC%E4%BB%B6%E5%8F%82%E8%80%83%E8%AE%BE%E8%AE%A1-20250619.zip?
[SF32LB520/3/5/7 Hardware Application Note (Source)]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB520-3-5-7-HW-Application.md
[52B/D/E/G/J Hardware Application Note (Source)]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB52B-E-G-J-HW-Application.md
[Local SiFli Approved Vendor List]: ../cad-components/sifli-approved-vendor-list.md
[SiFli SF32LB52 Schematic & PCB Checklist (XLSX)]: https://downloads.sifli.com/hardware/files/documentation/SF32LB52%20Schematic%26PCB%20checklist_V1.0_20260121.xlsx
[SiFli Chip Hardware Design Guide Index (Wiki)]: https://wiki.sifli.com/en/hardware/index.html

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[SF32LB52x Datasheet (Official PDF)]__
- :fontawesome-solid-file-pdf: __[SF32LB52x User Manual (Official PDF)]__
- :fontawesome-solid-file-zipper: __[SF32LB52 Hardware Reference Design Package]__
- :fontawesome-brands-github: __[SF32LB520/3/5/7 Hardware Application Note (Source)]__
- :fontawesome-brands-github: __[52B/D/E/G/J Hardware Application Note (Source)]__
- :fontawesome-solid-file-excel: __[Local SiFli Approved Vendor List]__
- :fontawesome-solid-file-excel: __[SiFli SF32LB52 Schematic & PCB Checklist (XLSX)]__
- :fontawesome-brands-wikipedia-w: __[SiFli Chip Hardware Design Guide Index (Wiki)]__

</div>

Additional source references:

- [SF32LB52x Product Brief](https://downloads.sifli.com/user%20manual/PB5201-SF32LB52x-Product%20Brief.pdf)
- [SF32LB52x Datasheet](https://downloads.sifli.com/user%20manual/DS5201-SF32LB52x-Datasheet%20V2p5p3.pdf)
- [SF32LB52x Reference Manual](https://downloads.sifli.com/user%20manual/UM5201-SF32LB52x-User%20Manual%20V0p8p4.pdf)
- [SF32LB520/3/5/7 Hardware Application Note](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB520-3-5-7-HW-Application.md)
- [52B/D/E/G/J Hardware Application Note](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB52B-E-G-J-HW-Application.md)

The [Schematic Checklist](SF32LB52x_schematic_checklist.md) (Section 5.8) and [PCB Layout Checklist](SF32LB52x_pcb_layout_checklist.md) (Section 6.15) reproduce the same *SF32LB52 Schematic & PCB Checklist* (V1.0, 2026-01-21) item by item, alongside the schematic and PCB layout guidance they check against.

## 9. Appendices

The original SiFli application notes include the following schematic, PCB layout, mechanical, and power reference figures. These appendices preserve those source figures for review evidence, while Sections 5 and 6 remain the primary design guidance.

!!! note "How to use these figures"
    Treat these figures as reference circuits and layout examples from the source application notes. Use the rule text, tables, datasheet, reference manual, latest reference design package, and AVL to confirm the final implementation for the exact device and product.

<div align="center"><em>Table 9-1: Appendix Map</em></div>

<div align="center" markdown>

| Need | Start Here |
|:---|:---|
| Smart watch block-diagram examples for both SF32LB52x design groups | Appendix A: A Typical Smart Watch Application |
| Circuit-level schematic examples for RF, storage/boot, buttons, motor, audio, clock, USB, and DC/DC | Appendix B: Reference Schematics |
| PCB placement and routing examples for RF, storage, audio, stack-up, fanout, clock, USB, and DC/DC | Appendix C: Reference PCB Layouts |
| Package outline, shape, and land-pattern drawings | Appendix D: Mechanical |
| Charging, OVP, power-tree, and PMU reference circuits and layouts | Appendix E: Power |

</div>

### Appendix A. A Typical Smart Watch Application

A typical SF32LB52x smart watch design includes the MCU, display, touch controller, storage, sensors, vibration motor, audio input/output, Bluetooth antenna, clock sources, power management, debug access, and production-test access. The battery-powered design additionally includes charging management.

![Figure A-1: SF32LB520/3/5/7 Smart Watch Application Diagram](../../sf32-products/chips/assets/52xA/sf32lb52x-A-watch-app-diagram-52x.png){ loading="lazy" }

<div align="center"><em>Figure A-1: SF32LB520/3/5/7 Smart Watch Application Diagram</em></div>

![Figure A-2: 52B/D/E/G/J Smart Watch Application Diagram](../../sf32-products/chips/assets/52xB/sf32lb52X-B-watch-app-diagram-52X.png){ loading="lazy" }

<div align="center"><em>Figure A-2: 52B/D/E/G/J Smart Watch Application Diagram</em></div>

### Appendix B. Reference Schematics

**RF**

![Figure B-1: RF Front-End Block Diagram](../../sf32-products/chips/assets/52xB/sf32lb52X-B-rf-diagram.png){ loading="lazy" }

<div align="center"><em>Figure B-1: RF Front-End Block Diagram</em></div>

![Figure B-2: RF Schematic Reference](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-RF.png){ loading="lazy" }

<div align="center"><em>Figure B-2: RF Schematic Reference</em></div>

![Figure B-3: RF Schematic Routing Reference](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-RF-2.png){ loading="lazy" }

<div align="center"><em>Figure B-3: RF Schematic Routing Reference</em></div>

**Storage and Boot**

![Figure B-4: SF32LB520/3/5/7 Bootstrap Reference](../../sf32-products/chips/assets/52xA/SF32LB52x-A-Bootstrap.png){ loading="lazy" }

<div align="center"><em>Figure B-4: SF32LB520/3/5/7 Bootstrap Reference</em></div>

![Figure B-5: 52B/D/E/G/J Bootstrap Reference](../../sf32-products/chips/assets/52xB/sf32lb52X-B-Bootstrap.png){ loading="lazy" }

<div align="center"><em>Figure B-5: 52B/D/E/G/J Bootstrap Reference</em></div>

![Figure B-6: SDIO Schematic Reference](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-SDIO.png){ loading="lazy" }

<div align="center"><em>Figure B-6: SDIO Schematic Reference</em></div>

**Buttons, Motor, and Audio**

![Figure B-7: SF32LB520/3/5/7 Vibration Motor Reference](../../sf32-products/chips/assets/52xA/sf32lb52x-A-VIB.png){ loading="lazy" }

<div align="center"><em>Figure B-7: SF32LB520/3/5/7 Vibration Motor Reference</em></div>

![Figure B-8: 52B/D/E/G/J Vibration Motor Reference](../../sf32-products/chips/assets/52xB/sf32lb52X-B-VIB.png){ loading="lazy" }

<div align="center"><em>Figure B-8: 52B/D/E/G/J Vibration Motor Reference</em></div>

![Figure B-9: Power Key Reference](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PWKEY.png){ loading="lazy" }

<div align="center"><em>Figure B-9: Power Key Reference</em></div>

![Figure B-10: Rotary Encoder Key Reference](../../sf32-products/chips/assets/52xB/sf32lb52X-B-XNKEY.png){ loading="lazy" }

<div align="center"><em>Figure B-10: Rotary Encoder Key Reference</em></div>

![Figure B-11: Analog MEMS Microphone Reference](../../sf32-products/chips/assets/52xB/sf32lb52X-B-MEMS-MIC.png){ loading="lazy" }

<div align="center"><em>Figure B-11: Analog MEMS Microphone Reference</em></div>

![Figure B-12: Analog ECM Microphone Reference](../../sf32-products/chips/assets/52xB/sf32lb52X-B-ECM-MIC.png){ loading="lazy" }

<div align="center"><em>Figure B-12: Analog ECM Microphone Reference</em></div>

![Figure B-13: Analog DAC to PA Reference](../../sf32-products/chips/assets/52xB/sf32lb52X-B-DAC-PA.png){ loading="lazy" }

<div align="center"><em>Figure B-13: Analog DAC to PA Reference</em></div>

![Figure B-14: Audio Power Schematic Reference](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-AUDIO-PWR.png){ loading="lazy" }

<div align="center"><em>Figure B-14: Audio Power Schematic Reference</em></div>

![Figure B-15: Audio ADC Schematic Reference](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-AUDIO-ADC.png){ loading="lazy" }

<div align="center"><em>Figure B-15: Audio ADC Schematic Reference</em></div>

![Figure B-16: Audio DAC Schematic Reference](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-AUDIO-DAC.png){ loading="lazy" }

<div align="center"><em>Figure B-16: Audio DAC Schematic Reference</em></div>

**Clock**

![Figure B-17: 48 MHz Crystal Schematic](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-48M-SCH.png){ loading="lazy" }

<div align="center"><em>Figure B-17: 48 MHz Crystal Schematic</em></div>

![Figure B-18: 32.768 kHz Crystal Schematic](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-32K-SCH.png){ loading="lazy" }

<div align="center"><em>Figure B-18: 32.768 kHz Crystal Schematic</em></div>

**USB**

![Figure B-19: USB Schematic Reference](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-USB.png){ loading="lazy" }

<div align="center"><em>Figure B-19: USB Schematic Reference</em></div>

**DC/DC**

![Figure B-20: DC/DC Schematic Reference](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-DCDC.png){ loading="lazy" }

<div align="center"><em>Figure B-20: DC/DC Schematic Reference</em></div>

### Appendix C. Reference PCB Layouts

**RF**

![Figure C-1: RF PCB Matching Reference](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-RF.png){ loading="lazy" }

<div align="center"><em>Figure C-1: RF PCB Matching Reference</em></div>

![Figure C-2: RF PCB Routing Reference](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-RF-ROUTE.png){ loading="lazy" }

<div align="center"><em>Figure C-2: RF PCB Routing Reference</em></div>

**Storage**

![Figure C-3: SDIO PCB Reference](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-SDIO.png){ loading="lazy" }

<div align="center"><em>Figure C-3: SDIO PCB Reference</em></div>

**Audio**

![Figure C-4: Audio Power PCB Reference](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-AUDIO-PWR.png){ loading="lazy" }

<div align="center"><em>Figure C-4: Audio Power PCB Reference</em></div>

![Figure C-5: Audio ADC PCB Reference](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-AUDIO-ADC.png){ loading="lazy" }

<div align="center"><em>Figure C-5: Audio ADC PCB Reference</em></div>

![Figure C-6: Audio DAC PCB Reference](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-AUDIO-DAC.png){ loading="lazy" }

<div align="center"><em>Figure C-6: Audio DAC PCB Reference</em></div>

**PCB Foundation**

![Figure C-7: PCB Stack-Up Reference](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-STACK.png){ loading="lazy" }

<div align="center"><em>Figure C-7: PCB Stack-Up Reference</em></div>

![Figure C-8: PCB Design Rule Reference](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-RULE.png){ loading="lazy" }

<div align="center"><em>Figure C-8: PCB Design Rule Reference</em></div>

![Figure C-9: QFN Fanout Reference](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-FANOUT.png){ loading="lazy" }

<div align="center"><em>Figure C-9: QFN Fanout Reference</em></div>

![Figure C-10: Crystal Placement Reference](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-CRYSTAL.png){ loading="lazy" }

<div align="center"><em>Figure C-10: Crystal Placement Reference</em></div>

**Clock Routing**

![Figure C-11: 48 MHz Crystal Routing Model](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-48M-MOD.png){ loading="lazy" }

<div align="center"><em>Figure C-11: 48 MHz Crystal Routing Model</em></div>

![Figure C-12: 48 MHz Crystal Routing Reference](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-48M-ROUTE-REF.png){ loading="lazy" }

<div align="center"><em>Figure C-12: 48 MHz Crystal Routing Reference</em></div>

![Figure C-13: 32.768 kHz Crystal Routing Model](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-32K-MOD.png){ loading="lazy" }

<div align="center"><em>Figure C-13: 32.768 kHz Crystal Routing Model</em></div>

![Figure C-14: 32.768 kHz Crystal Routing Reference](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-32K-ROUTE-REF.png){ loading="lazy" }

<div align="center"><em>Figure C-14: 32.768 kHz Crystal Routing Reference</em></div>

**USB**

![Figure C-15: USB PCB Reference](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-USB.png){ loading="lazy" }

<div align="center"><em>Figure C-15: USB PCB Reference</em></div>

![Figure C-16: USB Layout Reference](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-USB-LAYOUT.png){ loading="lazy" }

<div align="center"><em>Figure C-16: USB Layout Reference</em></div>

![Figure C-17: USB Routing Reference](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-USB-ROUTE.png){ loading="lazy" }

<div align="center"><em>Figure C-17: USB Routing Reference</em></div>

**DC/DC**

![Figure C-18: DC/DC PCB Reference](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-DCDC.png){ loading="lazy" }

<div align="center"><em>Figure C-18: DC/DC PCB Reference</em></div>

### Appendix D. Mechanical

![Figure D-1: SF32LB520/3/5/7 Package Layout](../../sf32-products/chips/assets/52xA/sf32lb52x-A-package-layout.png){ loading="lazy" }

<div align="center"><em>Figure D-1: SF32LB520/3/5/7 Package Layout</em></div>

![Figure D-2: 52B/D/E/G/J Package Layout](../../sf32-products/chips/assets/52xB/sf32lb52X-B-package-layout.png){ loading="lazy" }

<div align="center"><em>Figure D-2: 52B/D/E/G/J Package Layout</em></div>

![Figure D-3: QFN68L Package Dimensions](../../sf32-products/chips/assets/52xB/sf32lb52X-B-QFN68L-POD.png){ loading="lazy" }

<div align="center"><em>Figure D-3: QFN68L Package Dimensions</em></div>

![Figure D-4: QFN68L Package Shape](../../sf32-products/chips/assets/52xB/sf32lb52X-B-QFN68L-SHAPE.png){ loading="lazy" }

<div align="center"><em>Figure D-4: QFN68L Package Shape</em></div>

![Figure D-5: QFN68L Recommended Footprint](../../sf32-products/chips/assets/52xB/sf32lb52X-B-QFN68L-REF.png){ loading="lazy" }

<div align="center"><em>Figure D-5: QFN68L Recommended Footprint</em></div>

### Appendix E. Power

**SF32LB520/3/5/7 (Battery-Powered)**

![Figure E-1: External Charger Without PPM](../../sf32-products/chips/assets/52xA/sf32lb52x-CHG-NPPM.png){ loading="lazy" }

<div align="center"><em>Figure E-1: External Charger Without PPM</em></div>

![Figure E-2: External Charger With PPM](../../sf32-products/chips/assets/52xA/sf32lb52x-CHG-PPM.png){ loading="lazy" }

<div align="center"><em>Figure E-2: External Charger With PPM</em></div>

![Figure E-3: Integrated Charger Circuit](../../sf32-products/chips/assets/52xA/sf32lb52x-CHG-INNER.png){ loading="lazy" }

<div align="center"><em>Figure E-3: Integrated Charger Circuit</em></div>

![Figure E-4: OVP Threshold Setting](../../sf32-products/chips/assets/52xA/sf32lb52x-OVP-SET.png){ loading="lazy" }

<div align="center"><em>Figure E-4: OVP Threshold Setting</em></div>

![Figure E-5: Adjustable OVLO OVP Application](../../sf32-products/chips/assets/52xA/sf32lb52x-OVP-OVLO.png){ loading="lazy" }

<div align="center"><em>Figure E-5: Adjustable OVLO OVP Application</em></div>

![Figure E-6: Regulated-Output OVP Application](../../sf32-products/chips/assets/52xA/sf32lb52x-OVP-REGU.png){ loading="lazy" }

<div align="center"><em>Figure E-6: Regulated-Output OVP Application</em></div>

![Figure E-7: SF32LB520/3/5/7 Power Structure](../../sf32-products/chips/assets/52xA/sf32lb52x-PWR-diagram.png){ loading="lazy" }

<div align="center"><em>Figure E-7: SF32LB520/3/5/7 Power Structure</em></div>

![Figure E-8: VCC Schematic Reference](../../sf32-products/chips/assets/52xA/sf32LB52x-A-SCH-VCC.png){ loading="lazy" }

<div align="center"><em>Figure E-8: VCC Schematic Reference</em></div>

![Figure E-9: VCC PCB Reference](../../sf32-products/chips/assets/52xA/sf32LB52x-A-PCB-VCC.png){ loading="lazy" }

<div align="center"><em>Figure E-9: VCC PCB Reference</em></div>

![Figure E-10: Charging Schematic Reference](../../sf32-products/chips/assets/52xA/sf32LB52x-A-SCH-CHG.png){ loading="lazy" }

<div align="center"><em>Figure E-10: Charging Schematic Reference</em></div>

![Figure E-11: Charging PCB Reference](../../sf32-products/chips/assets/52xA/sf32LB52x-A-PCB-CHG.png){ loading="lazy" }

<div align="center"><em>Figure E-11: Charging PCB Reference</em></div>

![Figure E-12: PMU TVS Reference](../../sf32-products/chips/assets/52xA/sf32LB52x-A-SCH-PMU-TVS.png){ loading="lazy" }

<div align="center"><em>Figure E-12: PMU TVS Reference</em></div>

![Figure E-13: PMU EOS Reference](../../sf32-products/chips/assets/52xA/sf32LB52x-A-SCH-PMU-EOS.png){ loading="lazy" }

<div align="center"><em>Figure E-13: PMU EOS Reference</em></div>

**52B/D/E/G/J (Regular-Powered)**

![Figure E-14: 52B/D/E/G/J PMU PCB Reference](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-PMU.png){ loading="lazy" }

<div align="center"><em>Figure E-14: 52B/D/E/G/J PMU PCB Reference</em></div>

## 10. Revision History

<div align="center"><em>Table 10-1: Revision History</em></div>

<div align="center" markdown>

| Version | Date | Note |
|:---|:---|:---|
| 1.1 | 2026-07 | Promoted Power System to a peer schematic section, split Clock Generation and RF into separate schematic sections, and renumbered the following schematic guidance sections. |
| 0.0.1 | 10/2024 | Original release of `SF32LB520-3-5-7-HW-Application` |
| 0.0.1 | 10/2024 | Original release of `SF32LB52B-E-G-J-HW-Application` |
| 1.0 | This document | Combined both official hardware application notes into a single guide, using tabs to separate battery-powered vs. regular-powered variant content |

</div>

### 10.1. Checklist Revision History

The item-by-item checklist in the [Schematic Checklist](SF32LB52x_schematic_checklist.md) and [PCB Layout Checklist](SF32LB52x_pcb_layout_checklist.md) is versioned separately from the guide, following SiFli's own *SF32LB52 Schematic & PCB Checklist* spreadsheet.

<div align="center"><em>Table 10.1-1: Checklist Revision History</em></div>

<div align="center" markdown>

| Version | Date | Note |
|:---|:---|:---|
| 1.0 | 2026-01-21 | Initial release, based on SiFli's *SF32LB52 Schematic & PCB Checklist* V1.0 |

</div>

[SiFli Approved Vendor List]: ../cad-components/sifli-approved-vendor-list.md
[SiFli Approved Vendor List (AVL)]: https://downloads.sifli.com/hardware/files/documentation/SIFLI-MCU-AVL-%E8%AE%A4%E8%AF%81%E8%A1%A8-V0.3-20260121.xlsx
