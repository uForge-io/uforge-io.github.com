---
icon: lucide/usb
description: "Using SF32 USB hardware with CherryUSB: CDC, HID, MSC, audio, and MTP use cases, descriptor checklist, and cross-OS enumeration testing."
tags:
    - Develop
    - USB
---

# USB and CherryUSB

SF32 devices expose USB hardware, and SiFli-SDK documentation and examples reference CherryUSB integration. Treat USB as a software stack, not only as a hardware feature.

USB work crosses firmware, descriptors, host operating systems, power behavior, and factory tooling. A device that enumerates once on a developer laptop is not finished.

## Use Cases

- USB CDC serial.
- HID devices.
- MSC storage.
- USB audio microphone/speaker.
- MTP.
- USB host modes such as CDC, HID, MSC, UVC, and UAC where supported by the SDK and board.

## Practical Workflow

1. Confirm the board exposes the required USB connector and power path.
2. Start from the closest SDK USB example.
3. Test enumeration on Windows, macOS, and Linux.
4. Verify suspend/resume and cable reconnect behavior.
5. Record VID/PID, descriptors, and driver expectations.

## What to Test

- Cold plug and hot plug.
- Reset while connected.
- Host sleep/wake.
- Cable disconnect during transfer.
- Windows, macOS, and Linux enumeration.
- Composite device behavior if multiple classes are enabled.
- Power-only cable failure messaging in user docs.

## Descriptor Checklist

- VID/PID ownership is clear.
- Product string is final or versioned.
- Serial number behavior is defined.
- Class/subclass/protocol values match the intended host driver.
- Composite interfaces are stable across firmware updates.

## SiFli Team Should Add

- A CherryUSB overview page.
- Device/host support matrix by chip and board.
- Example paths for CDC, HID, MSC, audio, MTP, UVC, and UAC.
- Descriptor customization guidance.
- Windows driver notes and USB PID allocation guidance.
- A composite-device example with expected host behavior.

!!! note "Auto-generated content"
    This page was compiled/drafted without an existing source document. Verify technical claims against SiFli's official documentation before relying on them.
