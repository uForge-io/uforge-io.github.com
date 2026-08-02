---
icon: lucide/clipboard-check
description: "Design review checklist, related documents and references, appendices, and revision history for the SF32LB58x hardware design guide."
tags:
    - Hardware
    - Chip
---

# SF32LB58x Hardware Design Guide — Design Review Checklist and References

!!! note "Part of the SF32LB58x Hardware Design Guide"
    This page covers Sections 7-10: Design Review Checklist, Related Documents and References, Appendices, and Revision History. Return to [PCB Layout Checklist](SF32LB58x_pcb_layout_checklist.md).

## 7. Design Review Checklist

- [ ] Confirmed the co-packaged Flash/PSRAM combination of the selected model matches the product requirement
- [ ] PMU supply (PVDD1/PVDD2/BUCK/LDO) and all other power pins are within the Datasheet voltage ranges
- [ ] BUCK inductor meets 4.7 uH ± tolerance, DCR ≤ 0.4 Ω, Isat ≥ 500 mA
- [ ] 48 MHz and 32.768 kHz crystals meet the recommended specifications, with routing and keep-out zones satisfied
- [ ] RF trace is 50 Ω impedance, with the matching network placed close to the chip
- [ ] Storage boot configuration (MPI4/SD1/SD2) matches the Mode boot pin setting
- [ ] Display interface (MIPI-DSI/SPI-QSPI/MCU8080/DPI/JDI) trace impedance and length-matching requirements are satisfied (DSI 100 Ω differential, SDIO intra-group ≤6 mm)
- [ ] USB and SDIO differential trace impedance and length matching meet requirements
- [ ] SWD/6x UART debug pins and production test points are reserved
- [ ] BGA pad vias are centered, and the ground plane beneath the chip is fully connected
- [ ] Key component part numbers have been verified against the latest [SiFli Approved Vendor List][SiFli Approved Vendor List (AVL)]
- [ ] The review evidence pack includes stack-up/process capability, impedance, DRC, AVL, and focused layout screenshots
- [ ] Open schematic, layout, and manufacturing questions are closed or explicitly tracked before prototype release

## 8. Related Documents and References

Use the latest official documents when checking electrical limits, package data, pin multiplexing, software configuration, and component qualification.

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[SF32LB58x Product Brief]__
- :fontawesome-solid-file-pdf: __[SF32LB58x Datasheet]__
- :fontawesome-solid-file-pdf: __[SF32LB58x User Manual]__
- :fontawesome-solid-file-lines: __[SF32LB58x Hardware Application Note]__
- :fontawesome-solid-file-excel: __[SiFli Approved Vendor List (AVL)]__
- :fontawesome-brands-wikipedia-w: __[SiFli Chip Hardware Design Guide Index (Wiki)]__

</div>

The [Schematic Checklist](SF32LB58x_schematic_checklist.md) (Section 5.7) and [PCB Layout Checklist](SF32LB58x_pcb_layout_checklist.md) (Section 6.18) reproduce the same *SF32LB58x Schematic & PCB Checklist* (V1.0, 2026-01-21) item by item, alongside the schematic and PCB layout guidance they check against.

[SF32LB58x Product Brief]: https://downloads.sifli.com/silicon/PB0058-SF32LB58x-Product%20Brief%20V0p7.pdf
[SF32LB58x Datasheet]: https://downloads.sifli.com/user%20manual/DS5801-SF32LB58x-Datasheet%20V1p8p3.pdf
[SF32LB58x User Manual]: https://downloads.sifli.com/docs/user%20manual/SF32LB58x/UM5801%E2%80%90SF32LB58x%E2%80%90EN.pdf
[SF32LB58x Hardware Application Note]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB58x-HW-Application.md
[SiFli Approved Vendor List (AVL)]: ../cad-components/sifli-approved-vendor-list.md
[SiFli Chip Hardware Design Guide Index (Wiki)]: https://wiki.sifli.com/hardware/index.html

## 9. Appendices

The appendices collect application and reference-design context. Use them as review aids after the main schematic and PCB rules in Sections 5 and 6 have been applied.

<div align="center"><em>Table 9-1: Appendix Index</em></div>

<div align="center" markdown>

| Need | Start Here |
|:---|:---|
| Application context for a rich wearable or smart terminal | Appendix A: A Typical Smart Wearable or Smart Terminal |
| Schematic screenshots and circuit-level examples | Section 5 and the SF32LB58x hardware application note |
| PCB layout screenshots for BGA, HDI, RF, DSI, USB, SDIO, audio, and power | Section 6 and the SF32LB58x hardware application note |

</div>

### Appendix A. A Typical Smart Wearable or Smart Terminal

A typical SF32LB58x wearable or smart-terminal design includes the MCU, PMIC, high-resolution display, touch controller, boot storage, external memory or eMMC, sensors, vibration motor, audio input/output, Bluetooth antenna, crystals, USB, debug access, and production test access. The BGA256 package and high-speed display/storage interfaces make HDI process selection part of the system architecture, not just a PCB-layout detail.

## 10. Revision History

<div align="center"><em>Table 10-1: Revision History</em></div>

<div align="center" markdown>

| Version | Date | Note |
|:---|:---|:---|
| 0.0.1 | 1/2025 | Official Draft release of `SF32LB58x-HW-Application` |
| 1.0 | 2026-07 | Updated SF32LB58x hardware design guide with schematic, PCB, validation, and production-review guidance |

</div>

### 10.1. Checklist Revision History

The item-by-item checklist in the [Schematic Checklist](SF32LB58x_schematic_checklist.md) and [PCB Layout Checklist](SF32LB58x_pcb_layout_checklist.md) is versioned separately from the guide, following SiFli's own *SF32LB58x Schematic & PCB Checklist* workbook.

<div align="center"><em>Table 10.1-1: Checklist Revision History</em></div>

<div align="center" markdown>

| No. | Version | Date | Release Notes |
|:---|:---|:---|:---|
| 1 | V1.0 | 2026-01-21 | Initial release of the Schematic & PCB Checklist document |

</div>
