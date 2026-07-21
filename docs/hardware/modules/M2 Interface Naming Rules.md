---
icon: lucide/plug
description: "Naming rules for μForge's M2 module interface and its M2xM/M2xA/M2xN/M2xH/M2xP extension specifications, including declaration examples and design principles."
tags:
  - Hardware
  - Module
  - Interface
---

# μForge M2 Interface Naming Rules

## Base specification

**M2** is the mandatory base interface implemented by every μForge module. It identifies the common module interface; the electrical and mechanical M2 pinout is still under development and is not defined by this naming-rules document.

The future official M2 Interface System Definition will specify the M.2 E-key mechanical interface, pinout, electrical limits, required and optional signals, carrier requirements, and conformance rules.

## Extension specifications

Optional capabilities are defined as **M2xY** extension specifications.

**Naming format:**

> **M2xY**

Where:

- **M2** = base interface specification
- **x** = extension separator
- **Y** = extension category

## Extension categories

<div align="center"><em>M2 Extension Categories</em></div>

<div align="center" markdown>

| Specification | Description |
| --- | --- |
| **M2xM** | Multimedia: future RGB display, DVP camera, digital-microphone, and advanced-audio capabilities. |
| **M2xA** | Analog: future precision analog I/O and data-acquisition capabilities. |
| **M2xN** | Networking: future Ethernet, CAN, and industrial-networking capabilities. |
| **M2xH** | High-speed: future high-bandwidth interfaces. |
| **M2xP** | Power: future power-management and high-current I/O capabilities. |

</div>

Additional extension categories may be defined in future revisions.

## Module declaration

Every module implements **M2** and may implement one or more extension specifications.

Examples:

- **M2**
- **M2 + M2xM**
- **M2 + M2xA**
- **M2 + M2xM + M2xN**

## Design principles

- **M2** remains stable and backward compatible.
- Each **M2xY** extension is function-specific and independent.
- Extensions complement the base interface without modifying or replacing it.
- Modules advertise supported capabilities by listing their implemented M2xY specifications.
