---
icon: lucide/clipboard-check
description: "Design review checklist, related documents and references, appendices, and revision history for the SF32LB55x hardware design guide."
tags:
    - Hardware
    - Chip
---

# SF32LB55x Hardware Design Guide — Design Review Checklist and References

!!! note "Part of the SF32LB55x Hardware Design Guide"
    This page covers Sections 7-10: Design Review Checklist, Related Documents and References, Appendices, and Revision History. Return to [PCB Layout Guidelines](SF32LB55x_pcb_layout.md).

## 7. Design Review Checklist

- [ ] Exact package, pinout, land pattern, and PCB process are confirmed.
- [ ] All PMU and auxiliary power rails match the datasheet voltage/current limits.
- [ ] Required decoupling capacitors are placed close to pins.
- [ ] POR/BOR/reset timing and boot mode are verified.
- [ ] 48 MHz and 32.768 kHz crystals meet CL, ppm, ESR, placement, and routing requirements.
- [ ] RF matching, antenna, and ground keep-out are reviewed.
- [ ] External memory and display pin groups match the selected package.
- [ ] Wake, GPADC, sensor, audio, touch, backlight, and motor circuits meet low-power requirements.
- [ ] Debug, download, production flashing, RF test, and crystal calibration access are reserved.

## 8. Related Documents and References

Use the latest official documents when checking electrical limits, package data, pin multiplexing, software configuration, component qualification, and manufacturing constraints.

<div class="grid cards" markdown>

- :fontawesome-solid-file-lines: __[SF32LB55x Hardware Application Note]__
- :fontawesome-solid-file-excel: __[SiFli Approved Vendor List (AVL)]__
- :fontawesome-brands-wikipedia-w: __[SiFli Chip Hardware Design Guide Index (Wiki)]__

</div>

The [Schematic Checklist](SF32LB55x_schematic_checklist.md) (Section 5.8) and Section 6.4 of the [PCB Layout Guidelines](SF32LB55x_pcb_layout.md) reproduce the same *SF32LB55x Schematic & PCB Checklist* (V1.0, 2026-01-21) item by item, alongside the schematic and PCB layout guidance they check against.

[SF32LB55x Hardware Application Note]: https://wiki.sifli.com/en/hardware/SF32LB55x-HW-Application.html
[SiFli Approved Vendor List (AVL)]: ../cad-components/sifli-approved-vendor-list.md
[SiFli Chip Hardware Design Guide Index (Wiki)]: https://wiki.sifli.com/hardware/index.html

## 9. Appendices

### Appendix A. A Typical SF32LB55x Product

A typical SF32LB55x product includes the MCU, power tree, crystals, RF matching and antenna, external memory, display and touch controller, sensors, GPADC inputs, vibration motor, optional Bluetooth audio, debug access, and production test access. Battery-powered designs should also include low-power leakage review and fixture-access planning.

## 10. Revision History

<div align="center"><em>Table 10-1: Revision History</em></div>

<div align="center" markdown>

| Version | Date | Notes |
|:---|:---|:---|
| 0.1 | 2026-07 | Initial SF32LB55x hardware design guide generated from the official SiFli wiki hardware application note. |

</div>

### 10.1. Checklist Revision History

The item-by-item checklist in the [Schematic Checklist](SF32LB55x_schematic_checklist.md) and Section 6.4 of the [PCB Layout Guidelines](SF32LB55x_pcb_layout.md) is versioned separately from the guide, following SiFli's own *SF32LB55x Schematic & PCB Checklist* workbook.

<div align="center"><em>Table 10.1-1: Checklist Revision History</em></div>

<div align="center" markdown>

| No. | Version | Date | Release Notes |
|:---|:---|:---|:---|
| 1 | V1.0 | 2026-01-21 | Initial release of the Schematic & PCB Checklist document |

</div>
