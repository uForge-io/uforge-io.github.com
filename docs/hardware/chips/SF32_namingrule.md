---
icon: lucide/tags
tags:
  - Hardware
  - Chip
---

# SF32 Naming Convention

## Part Number: ***SF32LB5xyZxYx6***

!!! note "Syntax Note"
    * Lowercase ***x*** denotes a numeric digit.
    * Uppercase ***Y*** or ***Z*** denotes an alphabetic character.

### Prefix: *SF32LB5xy*

- **SF32** — SiFli 32-bit MCU Series
- **LB** — Product Line Identifier
    - **LB**: Low-power Bluetooth MCU series
- **5** — Processor Family
    - **5**: Devices based on a 32-bit Arm Cortex-M33 Star-MC1 processor, or a RISC-V processor with comparable performance
- **x** — Product Tier
    - **8**: Flagship (***dual*** application processors, ***single*** low-power processor)
    - **6 / 5**: Mid-range (***single*** application processor, ***single*** low-power processor)
    - **2**: Cost-optimized (***single*** application processor, ***dedicated*** low-power Bluetooth controller)
- **y** — Device Variant
    - Indicates integrated PSRAM capacity (specific numbering matrix varies by product sub-family)

### Suffix: *ZxYx6*
- **Z** — Package Type
    - **U**: QFN68
    - **V**: BGA
    - **Y**: QFN80
- **xYx** — Integrated Memory Configuration (QSPI-NOR Flash & PSRAM)
  *(Note: Exact encoding mapping depends on the specific package and device family)*
<!--    - **x** (numeric): Integrated QSPI-NOR Flash capacity
        - **1**: 2 Mb
        - **2**: 4 Mb
        - **3**: 8 Mb
        - **4**: 16 Mb
        - **5**: 32 Mb
        - **6**: 64 Mb
        - **7**: 128 Mb
        - **8**: 256 Mb
    - **Y** (alphabetic): Integrated PSRAM capacity
        - **A**: 16 Mb QPI-PSRAM
        - **B**: 32 Mb OPI-PSRAM
        - **C**: 64 Mb OPI-PSRAM
        - **D**: 128 Mb OPI/HPI-PSRAM
        - **E**: 256 Mb HPI-PSRAM
        - **F**: 512 Mb HPI-PSRAM
-->
<div align="center"><em>Part Number Suffix Field Definitions</em></div>

<div align="center" markdown>

| Field | Type | Options | Description |
| :--- | :--- | :--- | :--- |
| **x** | Numeric | **1** to **7**| Integrated QSPI-NOR Flash capacity:<br>• **1**: 2 Mb<br>• **2**: 4 Mb<br>• **3**: 8 Mb<br>• **4**: 16 Mb<br>• **5**: 32 Mb<br>• **6**: 64 Mb<br>• **7**: 128 Mb |
| **Y** | Alphabetic | **A** to **F** | Integrated PSRAM capacity & interface:<br>• **A**: 16 Mb QPI-PSRAM<br>• **B**: 32 Mb OPI-PSRAM<br>• **C**: 64 Mb OPI-PSRAM<br>• **D**: 128 Mb OPI/HPI-PSRAM<br>• **E**: 256 Mb HPI-PSRAM<br>• **F**: 512 Mb HPI-PSRAM |

</div>

- **6** — Operating Temperature Grade
    - **5**: −20°C to +70°C (Commercial)
    - **6**: −40°C to +85°C (Industrial)
    - **7**: −40°C to +105°C (Extended Industrial Grade)

## Part Number Examples

### Example 1: SF32LB527UD6
**SF32LB52 Series** Cost-Optimized MCU configuration features:

* **Core Architecture:** Single application processor and a dedicated low-power Bluetooth controller processor (Arm Cortex-M33 Star-MC1 based).
* **Package Type:** QFN68 package (**U**).
* **Memory Configuration:** Integrated 128 Mb OPI-PSRAM (**D**).
* **Operating Temperature:** −40°C to +85°C (**6**, Industrial Grade).

### Example 2: SF32LB587VEE56
**SF32LB58 Series** Flagship MCU configuration features:

* **Core Architecture:** Dual application processors and one low-power processor (Arm Cortex-M33 Star-MC1 based).
* **Package Type:** BGA256 package (**V**).
* **Memory Configuration:** Integrated dual (2x) 256 Mb HPI-PSRAM (**E**) and one 32 Mb QSPI-NOR Flash (**5**).
* **Operating Temperature:** −40°C to +85°C (**6**, Industrial Grade).
