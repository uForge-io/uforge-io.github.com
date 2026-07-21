---
icon: lucide/library
description: "SiFli's official schematic-symbol and PCB-footprint libraries for SF32 chips and modules — JLCEDA/LCEDA Pro, PADS, OrCAD, and KiCad — with download links and a review checklist."
tags:
    - Hardware
    - EDA
    - Library
---

# SF32 EDA Tool Libraries

## Purpose

SiFli publishes schematic-symbol and PCB-footprint libraries for the SF32 chip and module family. Use these files as the starting point for schematic capture and PCB layout instead of redrawing symbols, pin maps, and land patterns from the datasheet by hand.

The libraries reduce bring-up risk, but they do not replace the datasheet, package drawing, or the device-specific hardware design guide. Before release, always cross-check the selected library part against the exact part number, package, pinout, land pattern, and layout guidance for your design.

<div class="grid cards" markdown>

- :fontawesome-solid-download: __[JLCEDA / LCEDA Pro Library - download `.epro2` project](https://downloads.sifli.com/hardware/files/documentation/ProPrj_sifli-iclib_2026-04-20.epro2)__
- :fontawesome-solid-download: __[PADS Library - download `.ZIP`](https://downloads.sifli.com/hardware/files/documentation/PADS-SIFLI-IC.ZIP)__
- :fontawesome-solid-download: __[OrCAD Library - download `.OLB`](https://downloads.sifli.com/hardware/files/documentation/OrCAD-SIFLI-IC.OLB)__
- :fontawesome-brands-github: __[KiCad Library - OpenSiFli/kicad-libraries](https://github.com/OpenSiFli/kicad-libraries)__

</div>

!!! note "Source"
    The direct-download links are mirrored from SiFli's official [EDA Tool Library Files](https://wiki.sifli.com/hardware/index.html#eda) section on the SiFli Wiki. If any direct file link changes, use the wiki page as the current download index.

## Library Format at a Glance

<div align="center"><em>Library format summary</em></div>

<div align="center" markdown>

| EDA Tool | File | Format | Contents | Distribution |
|:---|:---|:---|:---|:---|
| JLCEDA / LCEDA Pro | `ProPrj_sifli-iclib_2026-04-20.epro2` | LCEDA Pro project archive | Schematic symbols and PCB footprints | Direct download |
| PADS | `PADS-SIFLI-IC.ZIP` | Mentor/Siemens PADS library archive | Schematic symbols and PCB decals | Direct download |
| OrCAD | `OrCAD-SIFLI-IC.OLB` | Cadence OrCAD Capture library | Schematic symbols | Direct download |
| KiCad | Release ZIP or KiCad PCM package | KiCad symbol, footprint, and 3D-model library | Schematic symbols, PCB footprints, and 3D models | [GitHub repository](https://github.com/OpenSiFli/kicad-libraries), versioned releases |

</div>

The JLCEDA / LCEDA Pro, PADS, and OrCAD files are distributed as single downloadable archives. SiFli does not publish a per-part coverage table for those archives, so verify coverage after importing them into the target EDA tool.

The KiCad library is the only library in this set with public source, versioned releases, and a visible supported-device table.

## KiCad Library Detail

The [OpenSiFli/kicad-libraries](https://github.com/OpenSiFli/kicad-libraries) repository provides the official SiFli KiCad symbol, footprint, and 3D-model library. It is licensed under CC-BY-SA-4.0. The current published GitHub release is `1.0.0`.

<div align="center"><em>KiCad library coverage</em></div>

<div align="center" markdown>

| Part Number | Package | Symbol | Footprint | 3D Model |
|:---|:---|:---:|:---:|:---:|
| SF32LB52B/D/E/G/J | QFN68 | :fontawesome-solid-check: | :fontawesome-solid-check: | :fontawesome-solid-check: |
| SF32LB520/3/5/7 | QFN68 | :fontawesome-solid-check: | :fontawesome-solid-check: | :fontawesome-solid-check: |
| SF32LB52-MOD-1 module | - | :fontawesome-solid-check: | :fontawesome-solid-check: | :fontawesome-solid-xmark: |

</div>

!!! note "Interpreting the upstream part-number rows"
    The upstream KiCad README lists the chip rows as `SF32LB52XUx` and `SF32LB52xUx`. In SiFli naming, uppercase `X` is a wildcard for the alphabetic regular-powered variants, and lowercase `x` is a wildcard for the numeric battery-powered variants. This page expands those rows into the explicit SF32LB52B/D/E/G/J and SF32LB520/3/5/7 groups used elsewhere in the μForge documentation.

The KiCad README currently marks KiCad Package and Content Manager installation as "not yet supported." Until that changes, use the manual installation path: download the latest release ZIP, open **Tools > Package and Content Manager** in KiCad, and choose **Install from file...**. After installation, KiCad lists the library as `PCM_SiFli` in the symbol and footprint library selectors.

## Review Checklist

- [ ] Match the library part number and package suffix against the BOM before schematic release.
- [ ] Cross-check symbol pin names and pin numbers against the chip datasheet and the device-specific hardware design guide.
- [ ] Verify footprint pad size, pitch, courtyard, exposed-pad treatment, and assembly clearance against the official package drawing.
- [ ] Treat 3D models as placement and mechanical-fit aids only; do not use them as fabrication or assembly dimensions.
- [ ] For JLCEDA / LCEDA Pro, PADS, and OrCAD, confirm per-part coverage after import because the archives do not expose an online supported-device matrix.
- [ ] Re-download the libraries before starting a new design. The direct-download archives are point-in-time files, and SiFli may update them as new SF32 devices and modules are qualified.

## Related Pages

- [Hardware Overview](../hardware_overview.md)
- [SF32 Family Overview](../chips/SF32_family.md)
- [SF32 Naming Convention](../chips/SF32_namingrule.md)
- [SF32 Approved Vendor List](sifli-approved-vendor-list.md)
