---
icon: lucide/boxes
description: "Turning SiFli-SDK example code into reusable components and sf_pkg packages: quality bar, what to document, and common packaging traps to avoid."
tags:
    - Develop
    - SiFli-SDK
---

# Components and `sf_pkg`

SiFli projects often depend on reusable middleware, drivers, and components. The SiFli package/component ecosystem is the right place to document reusable firmware building blocks once a project grows beyond a copied example.

## How to Think About Components

Use components for code that should be shared across products or examples:

- Peripheral drivers.
- Display panel support.
- Bluetooth services.
- GUI widgets.
- Sensor adapters.
- Storage helpers.
- Product middleware.

Keep one-off application logic in the application project until it has a stable interface and multiple users.

## Practical Workflow

1. Start from a working SDK example.
2. Identify the part that should be reusable.
3. Move it behind a narrow API.
4. Add configuration through the SDK's normal build/config mechanism.
5. Document dependencies, memory use, and required peripherals.
6. Only then package it as a reusable component.

## Component Quality Bar

A component is ready to share when:

- It builds from a clean checkout.
- It has one minimal example.
- It documents required configuration.
- It avoids hidden board assumptions.
- It reports errors clearly.
- It does not own global resources silently.
- It states thread, callback, and memory ownership rules.

## What to Record

Every reusable component should document:

- Supported chips and boards.
- Required SDK version.
- Required peripherals and pins.
- Required RTOS/middleware configuration.
- Threading and callback behavior.
- RAM, flash, and stack expectations.
- Example project path.

## Avoid These Traps

<div align="center"><em>Table: Avoid These Traps</em></div>

<div align="center" markdown>

| Trap | Better approach |
|:-----|:----------------|
| Copying a whole example into every product. | Extract only the stable reusable layer. |
| Hiding pin names in component code. | Pass board resources through configuration. |
| Assuming one display/audio path. | Document supported hardware paths. |
| Ignoring memory use. | Record stack, heap, DMA, and buffer expectations. |
| Shipping without an example. | Include one minimal integration example. |

</div>

## SiFli Team Should Add

- Official `sf_pkg` quickstart documentation linked from the SDK getting-started flow.
- A component manifest example.
- Naming and versioning rules for reusable packages.
- A public component registry status page.
- Migration guidance for turning copied example code into a package.

!!! note "Auto-generated content"
    This page was compiled/drafted without an existing source document. Verify technical claims against SiFli's official documentation before relying on them.
