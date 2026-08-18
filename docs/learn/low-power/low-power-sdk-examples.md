---
icon: lucide/battery-charging
title: "Low-Power SDK Examples"
description: "Choose the right SiFli-SDK power-management example for sleep, wake sources, GPIO, CPU, Bluetooth, displays, UI, and wearable power scenarios."
tags:
  - Low Power
  - Examples
---

# Low-Power SDK Examples { #low-power-sdk-examples }

SiFli-SDK power-management examples are measurement and integration baselines, not universal current specifications. Each one combines a particular chip family, board, power-supply path, enabled peripherals, firmware configuration, and workload. Use an example to make a named state or scenario repeatable on the target hardware, then measure the product’s own current and voltage under the same conditions.

This page organizes the projects in the [SiFli-SDK PM example index](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/pm/index.html) by the engineering question they answer. The official page for each example remains the authority for supported boards, supply connections, jumpers, SDK settings, commands, and expected behavior.

## Start with the Right Power Example

<div align="center"><em>Table: SiFli-SDK PM Examples by Engineering Task</em></div>

<div align="center" markdown>

| Engineering goal | Start with | What it helps establish | Re-check for the product |
|:-----------------|:-----------|:------------------------|:-------------------------|
| Prove basic PM state entry and wake behavior | [PM Example](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/classical/README.html) | The SDK’s baseline power-management configuration and sleep/wake flow | Actual wake sources, clock dependencies, retained state, and every driver’s PM vote |
| Characterize GPIO activity in low power | [GPIO Power Consumption Test](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/gpio/README.html) | Periodic timer wake, GPIO access, and the difference between wake, sleep, and I/O activity | External pulls, powered-off peripherals, pin mux, voltage rails, and unintended leakage paths |
| Separate compute work from shutdown behavior | [Processor Power Consumption Test](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/coremark/README.html) | CPU benchmark/loop workloads, shutdown, RTC wake, and pin wake | Core frequency, workload, wake-pin polarity, board-specific wake mapping, and supply voltage |
| Measure connected wireless scenarios | [BLE Broadcast and Connection Power Consumption Test](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/ble/README.html) or [BLE/BT Power Consumption Test](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/bt/README.html) | Advertising, connection, and Bluetooth activity as measured scenarios | RF conditions, TX power, intervals, peer behavior, antenna, and application callbacks |
| Compare screen-off and always-on AMOLED policies | [AMOLED Power Consumption Test](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/AMOLED/README.html) | Display refresh, screen-off sleep, and an always-on-screen comparison | Actual panel, brightness, refresh policy, display power rails, and user duty cycle |
| Measure a JDI display path | [JDI Power Consumption Test](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/jdi/README.html) | Display-specific low-power behavior for the documented JDI setup | Panel variant, update region, controller configuration, rails, and refresh frequency |
| Integrate a low-power graphical UI | [GUI_PM Low-Power Example Guide](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/gui_pm/README.html) | Interaction between UI behavior, display state, and PM policy | Product screen lifecycle, animations, touch/controller wake sources, and dirty-region policy |
| Characterize a screen-refresh workload | [Power Consumption Test Example — Screen Refresh Scenario](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/lcd_refresh/README.html) | The display refresh portion of a product workload | Resolution, pixel format, changed area, interface rate, buffer strategy, and content cadence |
| Build a sensor-triggered wearable interaction | [Raise Wrist to Light Up Screen](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/raise_wrist/README.html) | Sensor-driven wake, display-on work, and return to sleep | Sensor choice, gesture algorithm, sampling interval, screen timeout, battery model, and measured daily use |

</div>

## Measure at the Right Electrical Boundary

Do not compare a product trace with an SDK sample until both measurements use the same electrical boundary. The GPIO and raise-to-wake examples, for example, document board-specific power connections and jumper changes for low-power measurement. A USB-powered board, an attached debugger, a UART converter, a charging circuit, or a display module can materially change the result.

For each run, record:

1. Where the supply is applied and every rail that is powered.
2. Supply voltage and the current instrument’s sampling mode and range.
3. Which external devices, pull resistors, cables, and debug interfaces remain connected.
4. Firmware revision, board name, `menuconfig` configuration, and PM debug setting.
5. The exact state transition or workload represented by each region of the trace.

Measure voltage with current so the record can include power and energy, not only current. [Power Measurement and Validation](measurement-and-validation.md) describes the component, scenario, and daily-profile validation flow in detail.

## Baseline PM, GPIO, and Processor Tests

Use the [PM Example](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/classical/README.html) to establish that the expected sleep mode and intended wake sources work before adding a product workload. Instrument both the PM request and the state actually entered. A requested deep state that is never reached is a configuration or ownership problem, not a small tuning error.

The **GPIO Power Consumption Test** is the right starting point when an interface that appears inactive still raises idle current. Its documented scenario wakes periodically to read GPIO, making it useful for separating sleep current from wake and I/O activity. Product review must go further: check internal and external pulls, high-Z states, power-domain crossings, pins attached to powered-off peripherals, reset defaults, and any ESD/back-power path. A signal that is logically valid can still leak current.

The **Processor Power Consumption Test** separates several fundamentally different conditions: CPU work, a simple loop workload, shutdown, timer wake, and pin wake. It is useful for characterizing the cost of active compute and the mechanics of wake-up, but it does not predict application energy. Replace the benchmark or loop with a representative firmware workload before using the trace in a power budget.

## Bluetooth and Display Scenarios

Use the dedicated [BLE Broadcast and Connection](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/ble/README.html) and [BLE/BT](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/bt/README.html) projects to establish repeatable radio scenarios before optimizing their connection parameters in an application. The final product must still be measured with its own advertising or connection settings, peer device, RF environment, antenna, and callback behavior. An application that wakes the main CPU for every radio event can invalidate an otherwise good link-level result.

The display-oriented projects isolate a different set of decisions:

- **AMOLED Power Consumption Test** compares screen-off sleep with an always-on screen policy. The source example’s mode switching and battery-life figures apply to its documented board, panel, brightness, refresh timing, and use model, not to every AMOLED product.
- [JDI Power Consumption Test](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/jdi/README.html) provides the corresponding platform-specific baseline for a JDI display path.
- [GUI_PM Low-Power Example Guide](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/gui_pm/README.html) connects UI lifecycle decisions with PM behavior.
- [Screen Refresh Scenario](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/lcd_refresh/README.html) focuses on the display-update load itself.

Together, these samples should drive one product question: which events genuinely require pixels to change, and how much of the panel must update? Use [Graphics Overview](../graphics/overview.md) and [Display Controller](../graphics/display-controller.md) to turn that answer into a buffer and partial-refresh policy.

## Raise-to-Wake as a Complete Scenario

The **Raise Wrist to Light Up Screen** project is particularly useful because it combines sensor sampling, gesture recognition, display wake, a finite interaction window, and sleep re-entry. It demonstrates a product scenario rather than an isolated state.

The upstream example’s battery estimates are specific to its documented battery capacity, wake count, display-on duration, sensor, sampling interval, board, and measured currents. Preserve its structure when adapting it: measure the screen-on state, measure the screen-off state, state the number of daily events, and calculate the combined daily energy. Then update the model with your product’s own values instead of carrying its numbers forward.

For a worked model-and-measure loop, see [Smartwatch Power Profiling](smartwatch-power-profiling.md).

## Adapt a PM Example into Product Evidence

<div align="center"><em>Table: Product-Adaptation Checks for PM Examples</em></div>

<div align="center" markdown>

| Step | Evidence to keep | Why it matters |
|:-----|:-----------------|:---------------|
| Establish the original baseline | Board, supply connection, jumpers, SDK revision, configuration, and expected behavior | Separates source behavior from later product changes |
| Identify one scenario | Named PM state, active components, wake source, duration, and end condition | Prevents an average-current number with no engineering meaning |
| Measure current and voltage | Trace markers plus current, voltage, power, and energy | Allows results to be compared across rails and firmware revisions |
| Add product hardware | Updated external components, pin states, rails, and sensors | Exposes leakage and peripheral power absent from a development board |
| Reconcile the power model | Scenario frequency, duration, and measured energy | Makes the daily-use calculation converge with observed product behavior |

</div>

## Related Resources

- [Low-Power Overview](overview.md) for PM ownership, power modes, system-level design, and profiling concepts.
- [Power Measurement and Validation](measurement-and-validation.md) for component, scenario, and product-profile verification.
- [Smartwatch Power Profiling](smartwatch-power-profiling.md) for a worked daily-use model.
- [Examples](../../develop/examples/index.md) for the cross-domain SDK example catalogue.
- [SiFli-SDK PM Example Index](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/pm/index.html) for the current official projects and setup details.

!!! note "Auto-generated content"
    This page was compiled/drafted without an existing source document. Verify technical claims against SiFli's official documentation before relying on them.
