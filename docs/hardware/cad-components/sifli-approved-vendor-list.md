---
icon: lucide/component
description: "SiFli's Approved Vendor List for SF32 designs: qualified crystals, buck inductors, NOR/NAND and SD-NAND Flash, and LCD drivers, with selection requirements and a BOM review checklist."
tags:
    - Hardware
    - Vendor
    - AVL
---

# SF32 Approved Vendor List

## What This List Is For

The **Approved Vendor List (AVL)** is SiFli's qualification record for the passive components and second-source ICs most commonly designed around SF32 devices: crystal oscillators, buck inductors, NOR/NAND Flash, SD-NAND, LCD drivers, and touch-panel controllers. Starting a schematic from this list meaningfully reduces first-pass qualification risk compared to picking a part from a vendor's general catalog, but AVL inclusion is not a substitute for final validation on your own PCB, firmware image, enclosure, production flow, and supply chain.

This page is built directly from SiFli's official AVL spreadsheet, **`SIFLI-MCU-AVL-认证表`, version V0.3 (2026-01-21)**. Component qualification lists change as new parts pass validation, so treat this page as a snapshot rather than a live feed — always confirm against the current file before finalizing a BOM:

<div class="grid cards" markdown>

- :fontawesome-solid-file-excel: __[SiFli Approved Vendor List (AVL) — download current .xlsx](https://downloads.sifli.com/hardware/files/documentation/SIFLI-MCU-AVL-%E8%AE%A4%E8%AF%81%E8%A1%A8-V0.3-20260121.xlsx)__
- :fontawesome-solid-globe: __[SiFli Wiki — hardware design guides and downloads](https://wiki.sifli.com/en/hardware/index.html)__

</div>

!!! note "How to use this list"
    Every table below states the requirement the part must meet, not just the part number — use the requirement row to qualify additional second sources that aren't in this list yet, and use the part table to shortlist parts that are already proven. Where the source spreadsheet left a column entirely empty for every row (for example, download-tool support notes on Flash parts), that column is omitted here rather than shown blank.

Work through a BOM decision in three passes rather than picking a part number and moving on:

1. **Shortlist against the requirement.** Match capacity, voltage rail, package, and the class-level requirement (load capacitance for crystals, DCR/Isat for inductors, SDR/DTR clock for Flash) to your schematic and power budget.
2. **Check the constraints that do not show up in a datasheet headline number.** Confirm temperature range versus the product's operating and storage environment, exact Manufacturer/JEDEC ID expected by firmware, and whether OTA, filesystem, or download-tool support has been exercised on that exact part rather than only on a same-family part.
3. **Validate on real hardware before committing to volume.** Measure standby/active current on your own board, re-check crystal RF calibration on the final PCB and enclosure, and identify at least one second source for every single-vendor line item.

## Coverage at a Glance

<div align="center"><em>Table: Coverage at a Glance</em></div>

<div align="center" markdown>

| Category | Qualified Parts | Primary Selection Criteria |
|:---|---:|:---|
| 48 MHz crystals | 10 | Load capacitance, frequency tolerance, ESR, startup time, CBANK calibration, Bluetooth frequency offset |
| 32.768 kHz crystals | 5 | ESR, package, low-power startup behavior, duty-cycle stability across temperature |
| Buck inductors | 8 | 4.7 µH value, DCR, saturation current (Isat), rated current (Irms), SRF, 2016 package compatibility |
| NOR Flash | 44 | Capacity, voltage rail, SDR/DTR clock, manufacturer ID, standby/deep-power-down current |
| SPI-NAND Flash | 18 | Capacity, ECC mode, page/block geometry, golden block, standby/read/program currents |
| SD-NAND Flash | 5 | SD 2.0 compatibility, 50 MHz operation, standby current, operating temperature range |
| LCD drivers | 1 | Early-stage; confirm panel timing, driver support, and interface mode before product release |
| Touch-panel controllers | 0 | None qualified yet as of V0.3; validate touch controllers separately |

</div>

Use this summary as a scope check before reading the detailed tables. It also shows where the AVL is still thin: display and touch choices need extra confirmation with SiFli or product-level validation until later AVL revisions add more rows.

## Revision History

<div align="center"><em>Table: Revision History</em></div>

<div align="center" markdown>

| Version | Date | Author | Change |
|:--------|:-----|:-------|:-------|
| V0.1 | 2023-12-29 | yzli | Initial release. |
| V0.2 | 2025-07-16 | yzli | Added Huilun and JWT (晶威特) 48 MHz crystals. |
| V0.3 | 2026-01-21 | yzli | Added UCUN NOR Flash: UC25WQ80IB, UC25IQ32A, UC25IQ64A, UC25IQ128A. |

</div>

---

## Crystal Oscillators

SF32 devices need two crystals: a 48 MHz system crystal and a 32.768 kHz RTC crystal. Both are qualified separately below, and both carry real requirements on load capacitance and ESR — undersized or high-ESR crystals cost startup time and standby current, and out-of-tolerance frequency deviation shows up directly as Bluetooth channel offset (see the RF calibration columns in the 48 MHz table).

### 48 MHz System Crystal

!!! info "Requirement"
    Load capacitance CL ≤ 12 pF (7 pF recommended) · Frequency deviation ΔF/F0 ≤ ±10 ppm · ESR ≤ 30 Ω (22 Ω recommended)

<div align="center"><em>48 MHz System Crystal Qualified Parts</em></div>

<div align="center" markdown>

| Qualified P/N | Vendor | CL | ΔF/F0 | ESR | Operating Temp | Package | Startup Time | Power Adder | Optimal CBANK_SEL | TX Ch39 Freq Offset (−35°C / 25°C / 105°C) |
|:--------------|:-------|:---|:------|:----|:----------------|:--------|:--------------|:-------------|:-------------------|:---------------------------------------------|
| E1SB48E001G00E | Hosonic (鸿星) | 8.8 pF | −10 to +9 ppm | ≤22 Ω | −30°C to +85°C | 2016 metric | <700 µs | 0 µA | 0x1C9 | −32 to −1 kHz / ±20 kHz / +33 to +73 kHz |
| SX20Y048000B31T-8.8 | TKD (泰晶) | 8.8 pF | ±10 ppm | ≤40 Ω | −20°C to +75°C | 2016 metric | <800 µs | <30 µA | 0x1DC | −52 to −15 kHz / ±22 kHz / +50 to +100 kHz |
| SX20Y048000B31T001 | TKD (泰晶) | 8.8 pF | ±10 ppm | ≤40 Ω | −40°C to +85°C | 2016 metric | <800 µs | <30 µA | 0x1F7 | −53 to +13 kHz / ±30 kHz / +44 to +90 kHz |
| CN4048M00085C822000 | JWT (晶威特) | 8 pF | ±8 ppm | ≤22 Ω | −30°C to +85°C | 2016 metric | <700 µs | 0 µA | 0x195 | −40 to +1 kHz / −25 to +14 kHz / +12 to +45 kHz |
| HS48000013 | 汇隆电子 | 8.8 pF | ±10 ppm | ≤22 Ω | −30°C to +85°C | 2016 metric | <700 µs | <12 µA | 0x1F3 | −27 to +8 kHz / −25 to +10 kHz / −1.2 to +32 kHz |
| SX20Y048000B81T003 | TKD (泰晶) | 8 pF | ±10 ppm | ≤40 Ω | −30°C to +85°C | 2016 metric | <700 µs | <10 µA | 0x1F4 | −41 to +7 kHz / −30 to +20 kHz / +5 to +57 kHz |
| L214S480D11-S | Lucki (蓝晶) | 8 pF | ±10 ppm | ≤30 Ω | −30°C to +85°C | 2016 metric | <750 µs | <50 µA | 0x196 | −38 to 0 kHz / −28 to 0 kHz / −4 to +45 kHz |
| 8Y48090002 | TXC (晶技) | 8.8 pF | −6 to +8 ppm | ≤22 Ω | −30°C to +85°C | 2016 metric | <700 µs | <30 µA | 0x1D0 | −34 to −9.6 kHz / — / +27.9 to +46.1 kHz |
| 9S48000051 | 惠伦晶体 | 8.8 pF | −6 to +8 ppm | ≤20 Ω | −30°C to +85°C | 2016 metric | <700 µs | <15 µA | — | — |
| CN4048M000885C822000 | JWT (晶威特) | 8.8 pF | ±8 ppm | ≤22 Ω | −30°C to +85°C | 2016 metric | <700 µs | <10 µA | 0x1D0 | −34 to −9.6 kHz / −25 to +10 kHz / +27.9 to +46.1 kHz |

</div>

!!! tip "What the RF calibration columns mean"
    **CBANK_SEL** is the crystal's optimal load-capacitor bank trim setting; **TX Ch39 Freq Offset** is the measured Bluetooth transmit frequency offset on channel 39 (the mid-band test channel) at three temperatures. These come straight from SiFli's crystal qualification data — they exist so RF/production engineers can sanity-check a new crystal lot against a part that's already known to calibrate cleanly, not as values to hand-enter into firmware.

### 32.768 kHz RTC Crystal

!!! info "Requirement"
    Load capacitance CL ≤ 12.5 pF (7 pF recommended) · Frequency deviation ΔF/F0 ≤ ±20 ppm · ESR ≤ 80 kΩ (38 kΩ recommended)

<div align="center"><em>32.768 kHz RTC Crystal Qualified Parts</em></div>

<div align="center" markdown>

| Qualified P/N | Vendor | CL | ΔF/F0 | ESR | Operating Temp | Package | Duty Cycle (−35°C / 25°C / 105°C) |
|:--------------|:-------|:---|:------|:----|:----------------|:--------|:-------------------------------------|
| ETST00327000LE | Hosonic (鸿星) | 7 pF | ±20 ppm | ≤70 kΩ | −40°C to +85°C | 3215 metric | 32% to 55% / 43% to 54% / 38% to 45% |
| SF32K32768D71T01 | TKD (泰晶) | 7 pF | ±20 ppm | ≤70 kΩ | −40°C to +85°C | 3215 metric | 33% to 54% / 42% to 56% / 35% to 44% |
| X1A0001210008xx | Epson (爱普生) | 7 pF | ±20 ppm | ≤90 kΩ | −40°C to +85°C | 1610 metric | 35% to 61% / 42% to 58% / 36% to 48% |
| DH2032K76807T2719002 | JWT (晶威特) | 7 pF | ±20 ppm | ≤70 kΩ | −40°C to +85°C | 3215 metric | 43% to 60% / 45% to 59% / 37% to 48% |
| SF32WK32768D71T024 | TKD (泰晶) | 7 pF | ±20 ppm | ≤70 kΩ | −40°C to +85°C | 3215 metric | 34% to 55% / 41% to 54% / 36% to 46% |

</div>

All five parts measured 32.76 kHz across the full −35°C to 105°C qualification range — the differentiator between them is duty cycle stability, which matters for RTC-derived timekeeping and any low-power wake scheduling that free-runs off this clock.

---

## Buck Inductors

!!! info "Requirement"
    Inductance L = 4.7 µH ±20% · DC resistance (DCR) ≤ 0.4 Ω · Saturation current (Isat) ≥ 450 mA

<div align="center"><em>Buck Inductor Qualified Parts</em></div>

<div align="center" markdown>

| Qualified P/N | Vendor | Type | Tolerance | SRF | DCR | Isat | Irms | Package |
|:--------------|:-------|:-----|:----------|:----|:----|:-----|:-----|:--------|
| WPN201610U4R7MT | Sunlord | Wirewound | ±20% | 21 MHz | ≤288 mΩ | 1.3 A | 1.45 A | 0806 (2016 metric) |
| WPN201610H4R7MT | Sunlord | Wirewound | ±20% | 25 MHz | ≤425 mΩ | 1.2 A | 1.0 A | 0806 (2016 metric) |
| HTTX20161T-4R7MDR | Cyntec | Wirewound | ±20% | — | ≤250 mΩ | 1.7 A | 1.5 A | 0806 (2016 metric) |
| VLS201612CX-4R7M-1 | TDK | Wirewound | ±20% | 51 MHz | ≤252 mΩ | 0.88 A | 1.32 A | 0806 (2016 metric) |
| CIGW201610GL4R7MLE | Samsung | Wirewound | ±20% | — | ≤240 mΩ | 1.4 A | 1.4 A | 0806 (2016 metric) |
| DFE201612E-4R7M=P2 | Murata | Wirewound | ±20% | — | ≤252 mΩ | 1.8 A | 1.2 A | 0806 (2016 metric) |
| SWAI201610H4R7M | 三体微 | Wirewound | ±20% | — | ≤390 mΩ | 1.3 A | 1.05 A | 0806 (2016 metric) |
| FSHJ201610-4R7M | 方磁 | Wirewound | ±20% | — | ≤425 mΩ | 1.1 A | 0.9 A | 0806 (2016 metric) |

</div>

All eight parts are electrically interchangeable against the requirement — SRF, Isat, and Irms headroom are where they actually differ, so pick based on the current that your specific charging and RF-active load profile draws, not just the DCR number.

---

## NOR Flash

44 qualified parts spanning 4 Mb to 256 Mb, grouped by capacity. Every part meets SF32's SPI/QSPI Flash timing requirements; the Manufacturer ID is what your firmware's Flash-detection code should expect to read back, and the current figures are what to budget for active-read and standby power respectively.

### 4 Mb – 16 Mb

None of the six parts in this capacity tier support DTR mode, so only a single SDR clock column is shown.

<div align="center"><em>4 Mb to 16 Mb NOR Flash Qualified Parts</em></div>

<div align="center" markdown>

| Qualified P/N | Vendor | Capacity | Voltage | Temp Range | Max SDR Clock | Mfr ID | Standby | Deep Power-Down | Active Read Current |
|:--------------|:-------|:---------|:--------|:-----------|:---------------|:-------|:--------|:------------------|:----------------------|
| P25Q40SU | PUYA | 4 Mb | 1.65–3.6 V | −40°C to +85°C | 85 MHz @1.8 V / 104 MHz @3.3 V | 0x856013 | 10 µA | 0.1 µA @1.8 V / 0.6 µA @3.3 V | 3.5 mA @85 MHz (1.8 V) / 5 mA @85 MHz (3.3 V) |
| P25Q80LE | PUYA | 8 Mb | 1.65–2.0 V | −40°C to +85°C | 104 MHz | 0x856014 | 9 µA | 0.1 µA | 1.5 mA @85 MHz |
| GD25LE80E | GD (GigaDevice) | 8 Mb | 1.65–2.0 V | −40°C to +85°C | 133 MHz | 0xC86014 | 10 µA | 0.2 µA | 3 mA @80 MHz |
| UC25WQ80IB | UCUN | 8 Mb | 1.65–3.6 V | −40°C to +85°C | 104 MHz | 0xB36014 | 1.5 µA | 0.5 µA | 6 mA @85 MHz |
| P25Q16LE | PUYA | 16 Mb | 1.65–2.0 V | −40°C to +85°C | 104 MHz | 0x856015 | 18 µA | 0.1 µA | 3 mA @85 MHz |
| GD25LE16E | GD (GigaDevice) | 16 Mb | 1.65–2.0 V | −40°C to +85°C | 133 MHz | 0xC86015 | 10 µA | 0.2 µA | 3 mA @85 MHz |

</div>

### 32 Mb – 64 Mb

<div align="center"><em>32 Mb to 64 Mb NOR Flash Qualified Parts</em></div>

<div align="center" markdown>

| Qualified P/N | Vendor | Capacity | Voltage | Temp Range | Max Clock (SDR / DTR) | Mfr ID | Standby | Deep Power-Down | Active Read Current |
|:--------------|:-------|:---------|:--------|:-----------|:------------------------|:-------|:--------|:------------------|:----------------------|
| P25Q32L | PUYA | 32 Mb | 1.65–2.0 V | −40°C to +85°C | 120 MHz / — | 0x856016 | 9 µA | 0.2 µA | 2 mA @85 MHz |
| SK25LE032 | SK | 32 Mb | 1.65–2.0 V | −40°C to +85°C | 133 MHz / 80 MHz | 0x257016 | 10 µA | 0.1 µA | 2 mA @80 MHz (SDR) / 2.6 mA @80 MHz (DTR) |
| GD25LE32E | GD (GigaDevice) | 32 Mb | 1.65–2.0 V | −40°C to +85°C | 133 MHz / — | 0xC86016 | 10 µA | 0.2 µA | 3 mA @80 MHz |
| UC25IQ32A | UCUN | 32 Mb | 2.7–3.6 V | −40°C to +85°C | 133 MHz / 66 MHz | 0xB34014 | 15 µA | 1 µA | 8 mA @80 MHz |
| P25Q64LE | PUYA | 64 Mb | 1.65–2.0 V | −40°C to +85°C | 104 MHz / — | 0x856017 | 18 µA | 0.3 µA | 2 mA @85 MHz |
| P25Q64H | PUYA | 64 Mb | 2.3–3.6 V | −40°C to +85°C | 120 MHz / — | 0x856017 | 18 µA | 0.6 µA | 4 mA @85 MHz |
| P25Q64SH | PUYA | 64 Mb | 2.3–3.6 V | −40°C to +85°C | 120 MHz / 70 MHz | 0x856017 | 10 µA | 0.3 µA | 6.8 mA @85 MHz (SDR) / 9.45 mA @70 MHz (DTR) |
| GD25LE64E | GD (GigaDevice) | 64 Mb | 1.65–2.0 V | −40°C to +85°C | 133 MHz / — | 0xC86017 | 10 µA | 0.2 µA | 3 mA @80 MHz |
| ZB25LQ64A | ZBIT | 64 Mb | 1.65–2.0 V | −40°C to +85°C | 133 MHz / 66 MHz | 0x5E7017 | 10 µA | 1 µA | 4 mA @104 MHz |
| BY25Q64ES | BOYA | 64 Mb | 2.7–3.6 V | −40°C to +85°C | 120 MHz / — | 0x684017 | 9 µA | 0.4 µA | 6 mA @80 MHz |
| UC25IQ64A | UCUN | 64 Mb | 2.7–3.6 V | −40°C to +85°C | 133 MHz / 66 MHz | 0xB34017 | 10 µA | 1 µA | 15 mA @80 MHz |

</div>

### 128 Mb

<div align="center"><em>128 Mb NOR Flash Qualified Parts</em></div>

<div align="center" markdown>

| Qualified P/N | Vendor | Voltage | Temp Range | Max Clock (SDR / DTR) | Mfr ID | Standby | Deep Power-Down | Active Read Current |
|:--------------|:-------|:--------|:-----------|:------------------------|:-------|:--------|:------------------|:----------------------|
| P25Q128L | PUYA | 1.65–2.0 V | −40°C to +85°C | 70 MHz / 43 MHz | 0x856018 | 15 µA | 0.5 µA | 4.5 mA @85 MHz |
| PY25Q128HA | PUYA | 2.7–3.6 V | −40°C to +85°C | 104 MHz / 66 MHz | 0x852018 | 15 µA | 1 µA | 7 mA @85 MHz |
| SK25LP128 | SK | 1.65–2.0 V | −40°C to +85°C | 166 MHz / 104 MHz | 0x257018 | 8 µA | 0.1 µA | 2 mA @80 MHz (SDR) / 2.6 mA @80 MHz (DTR) |
| GD25LQ128E | GD (GigaDevice) | 1.65–2.0 V | −40°C to +85°C | 120 MHz / — | 0xC86018 | 35 µA | 1 µA | 13 mA @80 MHz |
| GD25Q128E | GD (GigaDevice) | 2.7–3.6 V | −40°C to +85°C | 133 MHz / — | 0xC84018 | 14 µA | 1 µA | 8 mA @80 MHz |
| GD25F128F | GD (GigaDevice) | 2.7–3.6 V | −40°C to +85°C | 166 MHz / 104 MHz | 0xC84318 | 16 µA | 1 µA | 12 mA @80 MHz |
| W25Q128JW | Winbond | 1.7–1.95 V | −40°C to +85°C | 133 MHz / — | 0xEF6018 | 10 µA | 1 µA | — |
| W25Q128JV | Winbond | 2.7–3.6 V | −40°C to +85°C | 133 MHz / — | 0xEF4018 | 10 µA | 1 µA | 12 mA @104 MHz |
| XT25F128F | XTX | 2.7–3.6 V | −40°C to +85°C | 133 MHz / 104 MHz | 0x0B4018 | 15 µA | 1 µA | 8 mA @80 MHz |
| XT25Q128DW | XTX | 1.7–2.0 V | −40°C to +85°C | 108 MHz / 76 MHz | 0x0B6018 | 12 µA | 0.4 µA | 9 mA @80 MHz |
| FM25W128 | FM | 1.65–3.6 V | −40°C to +85°C | 50 MHz @1.8 V / 100 MHz @3.3 V (SDR only, DTR not supported) | 0xA12818 | 5 µA | 1 µA @3.3 V | — |
| XM25QU128C | XMC | 1.65–1.95 V | −40°C to +85°C | 133 MHz / — | 0x204118 | 18 µA | 6 µA | 6 mA @66 MHz |
| ZB25VQ128D | ZBIT | 2.3–3.6 V | −40°C to +85°C | 104 MHz / — | 0x5E4018 | 10 µA | 1 µA | 4 mA @104 MHz |
| ZB25LQ128B | ZBIT | 1.65–2.0 V | −40°C to +85°C | 104 MHz / — | 0x5E5018 | 9 µA | 3 µA | 9 mA @104 MHz |
| BY25Q128ES | BOYA | 2.7–3.6 V | −40°C to +85°C | 108 MHz / — | 0x684018 | 14 µA | 0.2 µA | 6 mA @80 MHz |
| UC25IQ128A | UCUN | 2.7–3.6 V | −40°C to +85°C | 133 MHz / 66 MHz | 0xB34018 | 15 µA | 1 µA | 12 mA @80 MHz |

</div>

### 256 Mb

<div align="center"><em>256 Mb NOR Flash Qualified Parts</em></div>

<div align="center" markdown>

| Qualified P/N | Vendor | Voltage | Temp Range | Max Clock (SDR / DTR) | Mfr ID | Standby | Deep Power-Down | Active Read Current |
|:--------------|:-------|:--------|:-----------|:------------------------|:-------|:--------|:------------------|:----------------------|
| W25Q256JW | Winbond | 1.7–1.95 V | −40°C to +85°C | 133 MHz / — | 0xEF6019 | 10 µA | 1 µA | 8 mA @80 MHz |
| W25Q256JV | Winbond | 2.7–3.6 V | −40°C to +85°C | 133 MHz / — | 0xEF7019 | 10 µA | 1 µA | 12 mA @104 MHz |
| PY25Q256HB | PUYA | 2.7–3.6 V | −40°C to +85°C | 133 MHz / 100 MHz | 0x852019 | 20 µA | 1 µA | 7 mA @80 MHz (SDR) / 11.5 mA @80 MHz (DTR) |
| GD25LQ256D | GD (GigaDevice) | 1.65–2.0 V | −40°C to +85°C | 120 MHz / — | 0xC86019 | 70 µA | 2 µA | 10 mA @80 MHz |
| GD25Q256E | GD (GigaDevice) | 2.7–3.6 V | −40°C to +85°C | 133 MHz / — | 0xC84019 | 16 µA | 1 µA | 12 mA @80 MHz |
| XM25QU256C | XMC | 1.65–1.95 V | −40°C to +85°C | 133 MHz / — | 0x204119 | 15 µA | 7 µA | 11 mA @66 MHz |
| XM25QH256C | XMC | 2.3–3.6 V | −40°C to +85°C | 133 MHz / — | 0x204019 | 15 µA | 7 µA | 7 mA @66 MHz |
| XT25F256BW | XTX | 2.7–3.6 V | −40°C to +85°C | 104 MHz / 50 MHz | 0x0B4019 | 15 µA | 0.5 µA | 8 mA @80 MHz |
| DS25M4BA | Dosilicon | 1.65–1.95 V | −40°C to +85°C | 108 MHz / 80 MHz | 0xE54219 | 15 µA | 5 µA | 13 mA @108 MHz |
| BY25Q256FS | BOYA | 2.7–3.6 V | −40°C to +85°C | 100 MHz / 54 MHz | 0x684919 | 28 µA | 2 µA | 13 mA @80 MHz |
| MX25U25643G | MXIC (Macronix) | 1.65–2.0 V | −40°C to +85°C | 133 MHz / 54 MHz | 0xC22539 | 15 µA | 0.8 µA | 7 mA @84 MHz |

</div>

!!! warning "Current figures are datasheet-reported, not interchangeable across conditions"
    Standby, deep power-down, and active-read currents above are each measured at the clock/voltage stated in their own column — don't compare a 1.8 V figure against a 3.3 V figure across rows without checking the underlying datasheet. Where a cell reads "—", the source AVL did not report that figure for that part.

---

## SPI-NAND Flash

18 qualified parts at 512 Mb and 1 Gb densities, for products that need Flash-backed filesystems (FatFS, FlashDB, LittleFS) rather than raw XIP code storage. **Golden Block** indicates the manufacturing-guaranteed good block SiFli's bad-block-management routines assume as a starting point.

### 512 Mb

<div align="center"><em>512 Mb SPI-NAND Flash Qualified Parts</em></div>

<div align="center" markdown>

| Qualified P/N | Vendor | Voltage | Temp Range | Mfr ID | Page / Block Size | Max Rate | ECC | Golden Block | Standby | Page Read | Program/Erase |
|:--------------|:-------|:--------|:-----------|:-------|:---------------------|:---------|:----|:---------------|:--------|:-----------|:-----------------|
| F35SQA512M | FORESEE | 2.7–3.6 V | −40°C to +85°C | 0xCD7070 | 2048+64 B / 128K+4K | 133 MHz | HW 1-bit | Block 0 | 10 µA | 10 mA | 15 mA |
| F35UQA512M | FORESEE | 1.7–1.95 V | −40°C to +85°C | 0xCD6060 | 2048+64 B / 128K+4K | 104 MHz | HW 1-bit | Block 0 | 10 µA | 10 mA | 15 mA |
| DS35M12B | Dosilicon | 1.7–1.95 V | −40°C to +85°C | 0xE5A5E5 | 2048+128 B / 128K+8K | 83 MHz | HW 8-bit | Block 0 | 10 µA | 10 mA | 15 mA |
| DS35Q12B | Dosilicon | 2.7–3.6 V | −40°C to +85°C | 0xE5F5E5 | 2048+128 B / 128K+8K | 104 MHz | HW 8-bit | Block 0 | 10 µA | 10 mA | 15 mA |

</div>

### 1 Gb

<div align="center"><em>Table: Gb</em></div>

<div align="center" markdown>

| Qualified P/N | Vendor | Voltage | Temp Range | Mfr ID | Page / Block Size | Max Rate | ECC | Golden Block | Standby | Page Read | Program/Erase |
|:--------------|:-------|:--------|:-----------|:-------|:---------------------|:---------|:----|:---------------|:--------|:-----------|:-----------------|
| W25N01GW | Winbond | 1.7–1.95 V | −40°C to +85°C | 0xEFBA21 | 2048+64 B / 128K+4K | 104 MHz | HW 1-bit | Block 0 | 10 µA | 25 mA | 25 mA |
| W25N01GV | Winbond | 2.7–3.6 V | −40°C to +85°C | 0xEFAA21 | 2048+64 B / 128K+4K | 104 MHz | HW 1-bit | Block 0 | 10 µA | 25 mA | 25 mA |
| GD5F1GM7RE | GD (GigaDevice) | 1.7–2.0 V | −40°C to +85°C | 0xC881C8 | 2048+64 B / 128K+8K | 104 MHz SDR / 80 MHz DTR | HW 8-bit | Block 0 | 10 µA | 10 mA | 10 mA |
| GD5F1GM7UE | GD (GigaDevice) | 2.7–3.6 V | −40°C to +85°C | 0xC891C8 | 2048+64 B / 128K+8K | 133 MHz SDR / 104 MHz DTR | HW 8-bit | Block 0 | 10 µA | 15 mA | 15 mA |
| F35SQA001G | FORESEE | 2.7–3.6 V | −40°C to +85°C | 0xCD7171 | 2048+64 B / 128K+4K | 104 MHz | HW 1-bit | Block 0 | 10 µA | 10 mA | 15 mA |
| HYF1GQ4IDACAE | HeYangTek | 1.7–1.98 V | −40°C to +85°C | 0xC981C9 | 2048+64 B / 128K+4K | 80 MHz | HW 4-bit | Block 0 | 10 µA | 5 mA | — |
| HYF1GQ4UDACAE | HeYangTek | 2.7–3.6 V | −40°C to +85°C | 0xC921C9 | 2048+64 B / 128K+4K | 108 MHz | HW 4-bit | Block 0 | 10 µA | 15 mA | — |
| XT26Q01D | XTX | 1.7–1.95 V | −40°C to +85°C | 0x0B5100 | 2048+128 B / 128K+8K | 108 MHz | HW 8-bit | Block 0 | 15 µA | 26 mA | 28 mA / 18 mA |
| XT26G01C | XTX | 2.7–3.6 V | −40°C to +85°C | 0x0B3100 | 2048+128 B / 128K+8K | 104 MHz | HW 8-bit | Block 0 | 180 µA | 25 mA | 30 mA / 25 mA |
| DS35M1GB | Dosilicon | 1.7–1.95 V | −40°C to +85°C | 0xE5A1E5 | 2048+128 B / 128K+8K | 83 MHz | HW 8-bit | Block 0 | 10 µA | 10 mA | 15 mA |
| DS35Q1GB | Dosilicon | 2.7–3.6 V | −40°C to +85°C | 0xE5F1E5 | 2048+128 B / 128K+8K | 104 MHz | HW 8-bit | Block 0 | 10 µA | 10 mA | 15 mA |
| ZB35Q01A | ZBIT | 2.7–3.6 V | −40°C to +85°C | 0x5E415E | 2048+64 B / 128K+4K | 80 MHz | HW 8-bit | Block 0 | 10 µA | 10 mA | 10 mA |
| FM25SL01 | FM | 1.75–1.95 V | −40°C to +85°C | 0xA1A5A1 | 2048+128 B / 128K+8K | 80 MHz | HW 1-bit | Block 0 | 10 µA | 16 mA | 16 mA |
| TC58CYG0S3HRAIJ | KIOXIA | 1.7–1.95 V | −40°C to +85°C | 0x98D240 | 2048+64 B / 128K+4K | 133 MHz | HW 8-bit | Block 0 | 30 µA | 17 mA | 26 mA |

</div>

Read the JEDEC/manufacturer ID sequence from each datasheet before writing Flash-detection code — the number of ID bytes returned after the 0x9F opcode differs by vendor (some return a 2-byte device ID as `DID1`+`DID2`, others return a single ID byte), which is a common source of "unrecognized Flash" bring-up bugs on a new second source.

---

## SD-NAND Flash

5 qualified parts, all 1 Gb density over a legacy SD 2.0 interface — the right choice when a product wants removable-media-style storage semantics without a physical card slot.

<div align="center"><em>SD-NAND Flash Qualified Parts</em></div>

<div align="center" markdown>

| Qualified P/N | Vendor | Temp Range | Voltage | Interface | Max Clock | Standby | Operating Current |
|:--------------|:-------|:-----------|:--------|:----------|:----------|:--------|:---------------------|
| CSNP1GCR01-BOW | CS | −30°C to +85°C | 2.7–3.6 V | SD 2.0 | 50 MHz | 150 µA (typ) | 15 mA @50 MHz (typ) |
| XTSD01GLGEAG | XTX | −30°C to +85°C | 2.7–3.6 V | SD 2.0 | 50 MHz | 200 µA (max) | 30 mA @50 MHz (max) |
| XSSD01GGAI | XSS | 0°C to +70°C | 2.7–3.6 V | SD 2.0 | 50 MHz | 300 µA (max) | 45 mA @50 MHz (max) |
| MKDV1GCL-AB | MK | −25°C to +85°C | 2.7–3.6 V | SD 2.0 | 50 MHz | 50 µA (max) | 28 mA @50 MHz (max) |
| XS26D01GACW | Icthink | −25°C to +85°C | 2.7–3.6 V | SD 2.0 | 50 MHz | 250 µA (max) | 100 mA @50 MHz (max) |

</div>

XSSD01GGAI is the only part qualified only to 0°C–70°C rather than the extended industrial range the other four support — confirm operating temperature margin against your product's environment before defaulting to it.

---

## LCD Driver

!!! warning "Early-stage list — one part qualified so far"
    Only a single display driver has completed AVL qualification as of V0.3. This is not a reflection of what SF32 can drive (see the [Graphics Overview](../../learn/graphics/overview.md) and [ePicasso GPU Architecture](../../learn/graphics/epicasso-gpu.md) for the much longer list of interfaces and panel types SF32 supports) — it's simply how far formal AVL sign-off has reached. Check the [downloadable AVL spreadsheet](https://downloads.sifli.com/hardware/files/documentation/SIFLI-MCU-AVL-%E8%AE%A4%E8%AF%81%E8%A1%A8-V0.3-20260121.xlsx) directly for anything added after this page was written, and treat panels not yet listed here as "verify with SiFli before committing to volume," not "unsupported."

<div align="center"><em>LCD Driver Qualified Parts</em></div>

<div align="center" markdown>

| Qualified P/N | Vendor | Resolution | Type | IO Voltage | Interface | GRAM | Color Depth | Max Rate (SDR / DDR) |
|:--------------|:-------|:-----------|:-----|:-----------|:----------|:-----|:--------------|:--------------------------|
| RM69090 | Raydium | 368×448 | AMOLED | 1.65–3.3 V | MIPI, QSPI | Yes | 16.7M colors | Not yet characterized / not supported |

</div>

---

## Touch Panel Controller

No touch-panel controllers have completed AVL qualification yet. If your design needs a specific touch IC qualified, that's a concrete, well-scoped ask for SiFli FAE support rather than something to wait on this page for — reach out through the [contact form](../../about/index.md) or your SiFli sales contact with the part number in mind.

---

## Design Review Checklist

Before freezing a schematic or BOM, review each selected AVL part against the actual product design:

- [ ] The exact part number, package, temperature grade, and ordering suffix match the approved row or have an explicit engineering approval path.
- [ ] Voltage range matches the SF32 IO rail, Flash rail, display rail, or power-converter rail used on the board.
- [ ] Package, land pattern, height, and assembly constraints match the PCB library and manufacturing process.
- [ ] Firmware can identify the part correctly, using JEDEC/manufacturer ID or an equivalent runtime probe where applicable.
- [ ] Boot, download, OTA, filesystem, display, or touch-driver behavior has been verified on the exact component.
- [ ] Low-power current has been measured on real hardware, not copied directly from the AVL or component datasheet.
- [ ] Crystal frequency offset, CBANK_SEL behavior, and RF calibration are validated on the final PCB, antenna, and enclosure.
- [ ] Flash erase/program/read timing is tested under the product's expected voltage and temperature range.
- [ ] At least one second-source candidate is identified for high-risk BOM items such as crystals, inductors, Flash, and display panels.

This checklist is intentionally stricter than "the part appears in the AVL." The AVL narrows the search space; product release still depends on board-level evidence.

## Sourcing Checklist

- [ ] Cross-check the part number and revision suffix against the current downloadable AVL — spreadsheet snapshots (including this page) go stale as new lots are qualified.
- [ ] For Flash parts, confirm the Manufacturer/JEDEC ID your bring-up code expects matches the exact part ordered, not just the family — some families share a marketing name but return different ID bytes.
- [ ] For NAND, SD-NAND, and any part backing a filesystem, verify boot/download-tool support, OTA update flow, and filesystem behavior (FatFS/FlashDB/LittleFS) on real hardware — a part that reads back correctly during bring-up is not automatically validated for OTA.
- [ ] For crystals, confirm CBANK_SEL and TX Ch39 offset behavior on your own board — the AVL values were measured on SiFli's reference layout, not yours.
- [ ] Measure standby, deep-power-down, and active-read current on your own board rather than trusting the table figures directly — they are datasheet-reported at specific clock and voltage conditions.
- [ ] Confirm package and footprint match your PCB library and assembly capability, not just the electrical spec.
- [ ] For any part not yet on this list, qualify it against the requirement row for its component class before committing it to a BOM, and consider sharing the qualification data back with SiFli.
- [ ] Identify at least one second-source candidate for every single-vendor line item — this AVL currently has exactly one qualified LCD driver and zero qualified touch controllers, both worth flagging as BOM risk.
- [ ] Re-check this list before every major BOM freeze — it is a snapshot, not a live database.

## Related Pages

- [SF32LB52x Hardware Design Guide](../chip-guides/SF32LB52x_hardware_design_guide.md) — schematic and layout guidance that references several parts on this list directly.
- SF32LB57x Hardware Design Guide (English)
- [SF32 Family Overview](../../explore-sf32/family/SF32_family.md)
