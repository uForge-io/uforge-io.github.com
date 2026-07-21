---
icon: lucide/plug
description: "Draft pin-level definition of the μForge M2 connector: base, M2xM multimedia, M2xN networking, and M2xA motion-control contact maps and sharing rules."
tags:
  - Hardware
  - Module
  - Interface
---

# M2 Interface Definition

!!! warning "Draft interface definition"
    This page records the M2 proposal in the supplied interface-definition workbook. It is a working interface definition, not yet a released μForge.io interface standard. Validate the selected module, carrier, connector, electrical limits, and pin multiplexing before committing a design to production.

## Scope

M2 defines a 75-position, M.2 E-key-style connector form. Positions 24–31 form the key, leaving **67 electrical contacts per connector**. The workbook provides a base M2 allocation, a multimedia M2xM allocation, and M2xN/M2xA contact maps using the same 67-contact form.

- **M2** — connected display, audio, storage, debug, and general embedded I/O.
- **M2xM** — multimedia display, camera, PDM, and I2S/PCM signals.
- **M2xN** — networking, USB, CAN, and UART signals.
- **M2xA** — motor control, analog acquisition, encoder, and timer signals.

`M2xH` and `M2xP` remain naming reservations; the workbook does not assign their contacts.

!!! info "Connector-model interpretation"
    The workbook gives both the M2 and M2xM allocations 67 contacts. This page therefore treats M2 as the first connector allocation and M2xM as an optional second connector allocation, rather than as two functions sharing one connector. The mechanical connector count and placement for M2xN and M2xA are still to be frozen.

## Connector convention

The pin numbers below use the workbook convention: odd-numbered contacts are on the top side and even-numbered contacts are on the bottom side, viewed from the card edge. Pins 24–31 are absent because of the E-key notch.

<div align="center"><em>M2 Connector and Extension Summary</em></div>

<div align="center" markdown>

| Item | Definition |
| --- | --- |
| Connector format | 75-position, M.2 E-key-style card edge, 67 electrical contacts per connector |
| Keyed positions | 24–31 |
| Base allocation | M2 |
| Multimedia allocation | M2xM |
| Defined extension maps | M2xM, M2xN, and M2xA |
| Declaration example | `M2 + M2xM` |

</div>

## M2 base profile

M2 is the base profile for compact connected products. Its allocation is intended to cover a QSPI display and capacitive touch panel, Wi-Fi SDIO, 1-bit TF-card SDIO, analog audio, debug, USB, CAN, and general buses. Several contacts are intentionally multiplexed so that one module can select the function appropriate to its SoC and product configuration.

<div align="center"><em>M2 Functional Allocation</em></div>

<div align="center" markdown>

| Function | Allocated signals | Design intent |
| --- | --- | --- |
| Power | `USB_VIN` (listed as `VBUS` in the workbook summary), `VBAT/VBATS`, `3.3V`, `CHG_INT`, and GND | USB/battery input, regulated module supply, charge status, and return paths. |
| QSPI display | `LCDC1_SPI_CS`, `CLK`, `DIO0–DIO3`, `CS2`, `TE`, `RSTB`, `LCD_BL_PWM` | QSPI display panel, backlight, and optional secondary chip select. |
| Capacitive touch | `CTP_I2C1_SDA`, `CTP_I2C1_SCL`, `CTP_INT`, `CTP_REST` | Capacitive-touch control and interrupt. |
| Wi-Fi | `WiFi_SD2_CLK`, `CMD`, `D0–D3`, `PDN`, `INT`, `WAKE` | 4-bit SDIO Wi-Fi companion interface. |
| TF card | `TF_SD1_CMD`, `CLK`, `D0`, `TF_DET` | 1-bit TF-card interface and card detect. |
| Analog audio | `ADC_1P/N`, `ADC_2P/N`, `MIC_BIAS`, `DAC_1P/N`, `DAC_2P/N`, `AU_PA_EN` | Two analog-input pairs, microphone bias, two DAC pairs, and PA enable. |
| Debug and recovery | `DBG_UART1_TXD/RXD`, `SWDIO`, `SWCLK`, `SWD_SW`, `BOOT_MODE` | Debug UART, SWD, and boot/recovery selection. |
| General serial buses | SPI1/SPI2, I2C2–I2C4, UART2/UART3, and general GPIO/bus lines (`G0–G17`/`BUS0–BUS17`) | Product-specific buses selected through the module pin mux; I2C1 is allocated to the touch controller. Several SPI2/I2C3/I2C4/UART3 positions can alternatively carry `PDM1`/`PDM2` digital-microphone signals. |
| Other control | `CAN_TX/RX`, USB/USB host signals, `PWR_KEY` | Field bus, USB role control, and power-key input. |

</div>

## Color-coded M2 pinout guide

<div class="m2-visual-guide" role="img" aria-label="Color key for the M2 two-sided pinout table">
<div class="m2-category-band">
<div class="m2-category m2-audio">Audio</div>
<div class="m2-category m2-display">Display</div>
<div class="m2-category m2-touch">Touch</div>
<div class="m2-category m2-wireless">Wi-Fi / SDIO</div>
<div class="m2-category m2-bus">SPI / I²C / UART</div>
<div class="m2-category m2-power">USB / Power</div>
<div class="m2-category m2-debug">Dedicated</div>
</div>
</div>

The colored bar is the table key. The two-sided contact table below is the authoritative M2 pinout, including alternate functions and multiplexing.

### M2 contact assignment

This two-sided grid uses Bottom Pin / Top Pin / CN1 columns. The `Alt` columns record an additional multiplexed function when the workbook assigns one. Every function cell uses its category color from the legend above.

<div align="center"><em>M2 Base Contact Assignment</em></div>

<div align="center" markdown>
<table class="m2-grid" markdown="0">
<thead>
<tr><th>Alt</th><th>Function</th><th>Bot&nbsp;pin</th><th>CN1</th><th>Top&nbsp;pin</th><th>Function</th><th>Alt</th></tr>
</thead>
<tbody>
<tr><td class="m2-alt m2-wireless">SDIO2_D2 / GPADC</td><td class="m2-fn m2-wireless">WiFi_SD2_D2</td><td class="m2-pin">74</td><td class="m2-cn1"></td><td class="m2-pin">75</td><td class="m2-fn m2-wireless">TF_DET</td><td class="m2-alt m2-wireless">SDIO1_D1 / SPI1_MOSI / UART2_RXD</td></tr>
<tr><td class="m2-alt m2-wireless">SDIO2_D3 / GPADC</td><td class="m2-fn m2-wireless">WiFi_SD2_D3</td><td class="m2-pin">72</td><td class="m2-cn1"></td><td class="m2-pin">73</td><td class="m2-fn m2-wireless">TF_SD1_D0</td><td class="m2-alt m2-wireless">SDIO1_D0 / SPI1_MISO / UART2_TXD</td></tr>
<tr><td class="m2-alt m2-wireless">SDIO2_CMD / GPADC</td><td class="m2-fn m2-wireless">WiFi_SD2_CMD</td><td class="m2-pin">70</td><td class="m2-cn1"></td><td class="m2-pin">71</td><td class="m2-fn m2-wireless">TF_SD1_CLK</td><td class="m2-alt m2-wireless">SDIO1_CLK / SPI1_SCK / UART2_CTS</td></tr>
<tr><td class="m2-alt m2-wireless">SDIO2_CLK / GPADC</td><td class="m2-fn m2-wireless">WiFi_SD2_CLK</td><td class="m2-pin">68</td><td class="m2-cn1"></td><td class="m2-pin">69</td><td class="m2-fn m2-wireless">TF_SD1_CMD</td><td class="m2-alt m2-wireless">SDIO1_CMD / SPI1_CS# / UART2_RTS</td></tr>
<tr><td class="m2-alt m2-wireless">SDIO2_D0 / GPADC</td><td class="m2-fn m2-wireless">WiFi_SD2_D0</td><td class="m2-pin">66</td><td class="m2-cn1"></td><td class="m2-pin">67</td><td class="m2-fn m2-wireless">WiFi_WAKE</td><td class="m2-alt m2-wireless">SDIO1_D3 / CAN_RX</td></tr>
<tr><td class="m2-alt m2-wireless">SDIO2_D1 / GPADC</td><td class="m2-fn m2-wireless">WiFi_SD2_D1</td><td class="m2-pin">64</td><td class="m2-cn1"></td><td class="m2-pin">65</td><td class="m2-fn m2-wireless">WiFi_INT</td><td class="m2-alt m2-wireless">SDIO1_D2 / CAN_TX</td></tr>
<tr><td class="m2-blank"></td><td class="m2-fn m2-gnd">GND</td><td class="m2-pin">62</td><td class="m2-cn1"></td><td class="m2-pin">63</td><td class="m2-fn m2-gnd">GND</td><td class="m2-blank"></td></tr>
<tr><td class="m2-alt m2-bus">GPADC</td><td class="m2-fn m2-debug">PWR_KEY</td><td class="m2-pin">60</td><td class="m2-cn1"></td><td class="m2-pin">61</td><td class="m2-fn m2-power">USBHOST_D−</td><td class="m2-blank"></td></tr>
<tr><td class="m2-alt m2-bus">PDM1_DATA / I2C3_SDA / UART2_RXD / G0/BUS0</td><td class="m2-fn m2-bus">SPI2_MISO</td><td class="m2-pin">58</td><td class="m2-cn1"></td><td class="m2-pin">59</td><td class="m2-fn m2-power">USBHOST_D+</td><td class="m2-blank"></td></tr>
<tr><td class="m2-alt m2-bus">PDM1_CLK / I2C3_SCL / UART2_TXD / G1/BUS1</td><td class="m2-fn m2-bus">SPI2_MOSI</td><td class="m2-pin">56</td><td class="m2-cn1"></td><td class="m2-pin">57</td><td class="m2-fn m2-power">USB_OTG</td><td class="m2-blank"></td></tr>
<tr><td class="m2-alt m2-bus">PDM2_DATA / I2C4_SDA / UART3_RXD / UART2_CTS / G2/BUS2</td><td class="m2-fn m2-bus">SPI2_SCK</td><td class="m2-pin">54</td><td class="m2-cn1"></td><td class="m2-pin">55</td><td class="m2-fn m2-touch">CTP_I2C1_SDA</td><td class="m2-alt m2-bus">G5/BUS5</td></tr>
<tr><td class="m2-alt m2-bus">PDM2_CLK / I2C4_SCL / UART3_TXD / UART2_RTS / G3/BUS3</td><td class="m2-fn m2-bus">SPI2_CS#</td><td class="m2-pin">52</td><td class="m2-cn1"></td><td class="m2-pin">53</td><td class="m2-fn m2-touch">CTP_I2C1_SCL</td><td class="m2-alt m2-bus">G6/BUS6</td></tr>
<tr><td class="m2-alt m2-bus">G4/BUS4</td><td class="m2-fn m2-power">CHG_INT</td><td class="m2-pin">50</td><td class="m2-cn1"></td><td class="m2-pin">51</td><td class="m2-fn m2-touch">CTP_INT</td><td class="m2-alt m2-debug">G7/BUS7 / SWDIO</td></tr>
<tr><td class="m2-blank"></td><td class="m2-fn m2-power">USB_VIN</td><td class="m2-pin">48</td><td class="m2-cn1"></td><td class="m2-pin">49</td><td class="m2-fn m2-touch">CTP_REST</td><td class="m2-alt m2-debug">G8/BUS8 / SWCLK</td></tr>
<tr><td class="m2-blank"></td><td class="m2-fn m2-gnd">GND</td><td class="m2-pin">46</td><td class="m2-cn1"></td><td class="m2-pin">47</td><td class="m2-fn m2-gnd">GND</td><td class="m2-blank"></td></tr>
<tr><td class="m2-blank"></td><td class="m2-fn m2-power">3.3V</td><td class="m2-pin">44</td><td class="m2-cn1"></td><td class="m2-pin">45</td><td class="m2-fn m2-power">VBAT/VBATS</td><td class="m2-blank"></td></tr>
<tr><td class="m2-alt m2-bus">G9/BUS9</td><td class="m2-fn m2-power">USB_DET</td><td class="m2-pin">42</td><td class="m2-cn1"></td><td class="m2-pin">43</td><td class="m2-fn m2-debug">DBG_UART1_TXD</td><td class="m2-alt m2-debug">SWDIO</td></tr>
<tr><td class="m2-alt m2-bus">G10/BUS10</td><td class="m2-fn m2-wireless">WiFi_PDN</td><td class="m2-pin">40</td><td class="m2-cn1"></td><td class="m2-pin">41</td><td class="m2-fn m2-debug">DBG_UART1_RXD</td><td class="m2-alt m2-debug">SWCLK</td></tr>
<tr><td class="m2-alt m2-bus">UART3_RXD</td><td class="m2-fn m2-bus">G11/BUS11</td><td class="m2-pin">38</td><td class="m2-cn1"></td><td class="m2-pin">39</td><td class="m2-fn m2-bus">G14/BUS14</td><td class="m2-alt m2-bus">UART2_RXD</td></tr>
<tr><td class="m2-alt m2-bus">UART3_TXD</td><td class="m2-fn m2-bus">G12/BUS12</td><td class="m2-pin">36</td><td class="m2-cn1"></td><td class="m2-pin">37</td><td class="m2-fn m2-bus">G15/BUS15</td><td class="m2-alt m2-bus">UART2_TXD</td></tr>
<tr><td class="m2-alt m2-bus">I2C2_SCL</td><td class="m2-fn m2-bus">G13/BUS13</td><td class="m2-pin">34</td><td class="m2-cn1"></td><td class="m2-pin">35</td><td class="m2-fn m2-bus">G16/BUS16</td><td class="m2-alt m2-bus">I2C2_SDA</td></tr>
<tr><td class="m2-blank"></td><td class="m2-fn m2-gnd">GND</td><td class="m2-pin">32</td><td class="m2-cn1"></td><td class="m2-pin">33</td><td class="m2-fn m2-audio">AU_PA_EN</td><td class="m2-alt m2-bus">G17/BUS17</td></tr>
<tr><td class="m2-blank"></td><td class="m2-notch" colspan="2">E-key notch (24–31)</td><td class="m2-cn1"></td><td class="m2-notch" colspan="2">E-key notch (24–31)</td><td class="m2-blank"></td></tr>
<tr><td class="m2-blank"></td><td class="m2-fn m2-audio">DAC_1N</td><td class="m2-pin">22</td><td class="m2-cn1"></td><td class="m2-pin">23</td><td class="m2-fn m2-audio">DAC_2N</td><td class="m2-blank"></td></tr>
<tr><td class="m2-blank"></td><td class="m2-fn m2-audio">DAC_1P</td><td class="m2-pin">20</td><td class="m2-cn1"></td><td class="m2-pin">21</td><td class="m2-fn m2-audio">DAC_2P</td><td class="m2-blank"></td></tr>
<tr><td class="m2-blank"></td><td class="m2-fn m2-audio">ADC_2N</td><td class="m2-pin">18</td><td class="m2-cn1"></td><td class="m2-pin">19</td><td class="m2-fn m2-gnd">GND</td><td class="m2-blank"></td></tr>
<tr><td class="m2-blank"></td><td class="m2-fn m2-audio">MIC_BIAS</td><td class="m2-pin">16</td><td class="m2-cn1"></td><td class="m2-pin">17</td><td class="m2-fn m2-audio">ADC_2P</td><td class="m2-blank"></td></tr>
<tr><td class="m2-blank"></td><td class="m2-fn m2-audio">ADC_1N</td><td class="m2-pin">14</td><td class="m2-cn1"></td><td class="m2-pin">15</td><td class="m2-fn m2-audio">ADC_1P</td><td class="m2-blank"></td></tr>
<tr><td class="m2-blank"></td><td class="m2-fn m2-display">LCDC1_SPI_CS2</td><td class="m2-pin">12</td><td class="m2-cn1"></td><td class="m2-pin">13</td><td class="m2-fn m2-gnd">GND</td><td class="m2-blank"></td></tr>
<tr><td class="m2-blank"></td><td class="m2-fn m2-display">LCDC1_SPI_DIO2</td><td class="m2-pin">10</td><td class="m2-cn1"></td><td class="m2-pin">11</td><td class="m2-fn m2-display">LCDC1_SPI_DIO3</td><td class="m2-blank"></td></tr>
<tr><td class="m2-blank"></td><td class="m2-fn m2-display">LCDC1_SPI_DIO0</td><td class="m2-pin">8</td><td class="m2-cn1"></td><td class="m2-pin">9</td><td class="m2-fn m2-display">LCDC1_SPI_DIO1</td><td class="m2-blank"></td></tr>
<tr><td class="m2-blank"></td><td class="m2-fn m2-display">LCDC1_SPI_CS</td><td class="m2-pin">6</td><td class="m2-cn1"></td><td class="m2-pin">7</td><td class="m2-fn m2-display">LCDC1_SPI_CLK</td><td class="m2-blank"></td></tr>
<tr><td class="m2-blank"></td><td class="m2-fn m2-display">LCD_BL_PWM</td><td class="m2-pin">4</td><td class="m2-cn1"></td><td class="m2-pin">5</td><td class="m2-fn m2-display">LCDC1_SPI_TE</td><td class="m2-blank"></td></tr>
<tr><td class="m2-blank"></td><td class="m2-fn m2-debug">SWD_SW</td><td class="m2-pin">2</td><td class="m2-cn1"></td><td class="m2-pin">3</td><td class="m2-fn m2-display">LCDC1_SPI_RSTB</td><td class="m2-blank"></td></tr>
<tr><td class="m2-blank"></td><td class="m2-blank">—</td><td class="m2-pin">—</td><td class="m2-cn1"></td><td class="m2-pin">1</td><td class="m2-fn m2-debug">BOOT_MODE</td><td class="m2-blank"></td></tr>
</tbody>
</table>
</div>

### M2 pin descriptions

Grouped and colored consistently with the contact table above. The workbook does not define I/O directions; the direction column is therefore an integration aid that must be confirmed against the selected module and SoC documentation.

<div align="center" markdown>

| Signal group | Signal | I/O | Description |
| --- | --- | :---: | --- |
| <span class="m2-chip m2-power">Power</span> | `VBAT/VBATS` | I | Battery-input rail. |
| <span class="m2-chip m2-power">Power</span> | `3.3V` | I | 3.3 V supply rail. |
| <span class="m2-chip m2-power">Power</span> | `CHG_INT` | O | Charger interrupt / status output. |
| <span class="m2-chip m2-power">Power</span> | `USB_VIN` | I | USB input / charging-path rail. |
| <span class="m2-chip m2-power">Power</span> | `USB_DET` | I | USB detection signal. |
| <span class="m2-chip m2-power">Power</span> | `USBHOST_D+`, `USBHOST_D−` | I/O | USB host-mode data pair, separate from the primary USB port. |
| <span class="m2-chip m2-power">Power</span> | `USB_OTG` | I/O | USB OTG ID / role-detect signal. |
| <span class="m2-chip m2-display">Display</span> | `LCDC1_SPI_CS`, `LCDC1_SPI_CS2` | O | QSPI display primary and optional secondary chip select. |
| <span class="m2-chip m2-display">Display</span> | `LCDC1_SPI_CLK` | O | QSPI display clock. |
| <span class="m2-chip m2-display">Display</span> | `LCDC1_SPI_DIO0`–`DIO3` | I/O | QSPI display data lines. |
| <span class="m2-chip m2-display">Display</span> | `LCDC1_SPI_TE` | I | Tearing-effect sync input from the panel. |
| <span class="m2-chip m2-display">Display</span> | `LCDC1_SPI_RSTB` | O | Display panel reset, active low. |
| <span class="m2-chip m2-display">Display</span> | `LCD_BL_PWM` | O | Backlight PWM control. |
| <span class="m2-chip m2-touch">Touch</span> | `CTP_I2C1_SDA`, `CTP_I2C1_SCL` | I/O | Capacitive-touch controller I²C bus. |
| <span class="m2-chip m2-touch">Touch</span> | `CTP_INT` | I | Touch-controller interrupt. |
| <span class="m2-chip m2-touch">Touch</span> | `CTP_REST` | O | Touch-controller reset. The workbook spells this signal `CTP_REST`. |
| <span class="m2-chip m2-wireless">Wi-Fi / SDIO</span> | `WiFi_SD2_CLK`, `WiFi_SD2_CMD` | O, I/O | Wi-Fi companion SDIO clock and command. |
| <span class="m2-chip m2-wireless">Wi-Fi / SDIO</span> | `WiFi_SD2_D0`, `WiFi_SD2_D1`, `WiFi_SD2_D2`, `WiFi_SD2_D3` | I/O | Wi-Fi companion SDIO data lines (4-bit). |
| <span class="m2-chip m2-wireless">Wi-Fi / SDIO</span> | `WiFi_PDN` | O | Wi-Fi module power-down control. |
| <span class="m2-chip m2-wireless">Wi-Fi / SDIO</span> | `WiFi_INT` | I | Wi-Fi interrupt. Shares pin 65 with `SDIO1_D2`/`CAN_TX`. |
| <span class="m2-chip m2-wireless">Wi-Fi / SDIO</span> | `WiFi_WAKE` | I/O | Wi-Fi wake signal. Shares pin 67 with `SDIO1_D3`/`CAN_RX`. |
| <span class="m2-chip m2-wireless">Wi-Fi / SDIO</span> | `TF_SD1_CMD`, `TF_SD1_CLK`, `TF_SD1_D0` | I/O, O, I/O | 1-bit TF-card SDIO command, clock, and data. |
| <span class="m2-chip m2-wireless">Wi-Fi / SDIO</span> | `TF_DET` | I | TF-card presence detect. |
| <span class="m2-chip m2-wireless">Wi-Fi / SDIO</span> | `SDIO1_D0–D3`, `SDIO2_D0–D3` | I/O | Generic controller-level aliases for the same physical lines as the TF-card (SDIO1) and Wi-Fi companion (SDIO2) buses; use the role-specific names above unless the module needs full 4-bit SDIO on both sides. |
| <span class="m2-chip m2-wireless">Wi-Fi / SDIO</span> | `CAN_TX`, `CAN_RX` | O, I | Logic-level CAN transceiver interface, multiplexed onto pins 65 and 67 alongside `WiFi_INT`/`WiFi_WAKE`. The carrier still needs a CAN transceiver and protection appropriate to the product bus. |
| <span class="m2-chip m2-wireless">Wi-Fi / SDIO</span> | `GPADC` | I | Several Wi-Fi/TF-card and `PWR_KEY` contacts can alternatively be routed to the ADC for analog sensing. |
| <span class="m2-chip m2-audio">Audio</span> | `ADC_1P/N`, `ADC_2P/N` | I | Two differential analog-microphone input pairs. |
| <span class="m2-chip m2-audio">Audio</span> | `MIC_BIAS` | O | Microphone bias supply. |
| <span class="m2-chip m2-audio">Audio</span> | `DAC_1P/N`, `DAC_2P/N` | O | Two differential audio-output pairs. |
| <span class="m2-chip m2-audio">Audio</span> | `AU_PA_EN` | O | Audio power-amplifier enable. |
| <span class="m2-chip m2-bus">SPI / I²C / UART</span> | `SPI1_CS#`, `SPI1_SCK`, `SPI1_MOSI`, `SPI1_MISO` | O, O, O, I | SPI1, multiplexed with the TF-card path. |
| <span class="m2-chip m2-bus">SPI / I²C / UART</span> | `SPI2_CS#`, `SPI2_SCK`, `SPI2_MOSI`, `SPI2_MISO` | O, O, O, I | SPI2, multiplexed with I2C3 and UART2. |
| <span class="m2-chip m2-bus">SPI / I²C / UART</span> | `I2C2_SDA`, `I2C2_SCL` | I/O, O | I2C2, multiplexed with `MPI/SD`. |
| <span class="m2-chip m2-bus">SPI / I²C / UART</span> | `I2C3_SDA`, `I2C3_SCL` | I/O, O | I2C3, multiplexed with SPI2. |
| <span class="m2-chip m2-bus">SPI / I²C / UART</span> | `I2C4_SDA`, `I2C4_SCL` | I/O, O | I2C4, multiplexed with SPI2 and UART3. |
| <span class="m2-chip m2-bus">SPI / I²C / UART</span> | `UART2_TXD/RXD`, `UART2_CTS/RTS` | O/I, I/O | UART2, multiplexed with SPI2, I2C3, and `MPI/SD`. |
| <span class="m2-chip m2-bus">SPI / I²C / UART</span> | `UART3_TXD/RXD` | O/I | UART3, multiplexed with SPI2, I2C4, and `MPI/SD`. |
| <span class="m2-chip m2-bus">SPI / I²C / UART</span> | `G0–G17`/`BUS0–BUS17` | I/O | Generic GPIO/bus contacts, multiplexed with SPI2, I2C2–I2C4, UART2/UART3, `PDM1`/`PDM2`, or SWD depending on position. |
| <span class="m2-chip m2-audio">Audio</span> | `PDM1_CLK/DATA`, `PDM2_CLK/DATA` | I | Digital-microphone PDM pairs, multiplexed onto the SPI2/I2C3/I2C4/UART3 contacts (pins 58–52). |
| <span class="m2-chip m2-debug">Dedicated</span> | `DBG_UART1_TXD/RXD` | O/I | Debug UART, multiplexed with SWD. |
| <span class="m2-chip m2-debug">Dedicated</span> | `SWDIO`, `SWCLK` | I/O, I | SWD debug port. Two alternative sharing options: the debug-UART positions (pins 43/41) or the capacitive-touch I2C1 positions (pins 51/49). Only one should be populated per module. |
| <span class="m2-chip m2-debug">Dedicated</span> | `SWD_SW` | I | Selects SWD vs. debug-UART routing. |
| <span class="m2-chip m2-debug">Dedicated</span> | `BOOT_MODE` | I | Boot / recovery mode select. |
| <span class="m2-chip m2-debug">Dedicated</span> | `PWR_KEY` | I | Power-key signal. |
| <span class="m2-chip m2-gnd">Ground</span> | `GND` | — | Digital and analog return paths, distributed across the connector. |

</div>

!!! info "Wi-Fi SDIO data-label correction"
    Pin 64 is `WiFi_SD2_D1` (an earlier workbook revision mislabeled it as a duplicate of pin 72's `WiFi_SD2_D3`; this is now corrected). Both SDIO buses also carry generic controller-level aliases in the Alt column — `SDIO2_D0–D3`/`SDIO2_CMD`/`SDIO2_CLK` for the Wi-Fi companion bus, `SDIO1_D0–D3`/`SDIO1_CMD`/`SDIO1_CLK` for the TF-card bus — alongside their role-specific names.

### M2 sharing rules

- The workbook marks SWD as a multiplexed resource with two alternative routing options: the debug-UART positions (`SWDIO` on pin 43, `SWCLK` on pin 41) or the capacitive-touch I2C1 positions (`SWDIO` on pin 51, `SWCLK` on pin 49). Populate only one option per module and reserve a recovery strategy before reusing any of these contacts.
- SPI1 is shared with the 1-bit TF-card path; both are also exposed as the generic `SDIO1_D0–D3`/`CMD`/`CLK` controller bus, and pins 65/67 additionally carry `CAN_TX`/`CAN_RX`.
- The Wi-Fi SDIO2 data lines are also exposed as the generic `SDIO2_D0–D3`/`CMD`/`CLK` controller bus; several of the same contacts double as `GPADC` analog inputs.
- SPI2 and I2C3/I2C4 (pins 58–52) can alternatively carry `PDM1`/`PDM2` digital-microphone signals, plus generic `G0–G3`/`BUS0–BUS3` GPIO aliases.
- I2C2–UART3 share the same six positions (pins 38–34/39–35), which also carry generic `G11–G16`/`BUS11–BUS16` GPIO aliases when not used for a named bus function.
- The QSPI display and capacitive-touch groups are separate at the signal level, but their power, reset, and wake behavior must be reviewed as one display subsystem.
- `CAN_TX` and `CAN_RX` are logic-level signals multiplexed onto pins 65/67, not separately allocated contacts. The carrier still needs a CAN transceiver and protection appropriate to the product bus.

## M2xM multimedia profile

M2xM defines the multimedia connector allocation for display, camera, and digital-audio designs. It defines interface groups rather than asserting that every module can operate every group concurrently.

<div align="center"><em>M2xM Functional Allocation</em></div>

<div align="center" markdown>

| Function | Workbook allocation | Sharing rule |
| --- | --- | --- |
| RGB / 8080 / EPD display | RGB timing plus `R0–R7`, `G0–G7`, `B0–B7`; 8080 and EPD controls | 31 contacts; DBI/8080 and EPD share the display allocation. |
| MIPI DSI | D0–D3 differential lanes, clock pair, TE, reset, I2C, backlight PWM | Reuses the RGB allocation and adds six GND contacts. |
| Capacitive touch | I2C, interrupt, and reset | Shares the QSPI-display allocation. |
| 12-bit DVP camera | `D0–D11`, MCLK, PCLK, HSYNC, VSYNC, PWDN, reset, I2C4 | 20 contacts; includes the workbook's QSPI interface allocation. |
| MIPI CSI | D0/D1 differential lanes, clock pair, PWDN, reset, I2C | Reuses the DVP allocation and adds four GND contacts. |
| Digital microphones | `PDM1_CLK/DATA` and `PDM2_CLK/DATA` | Four PDM signals. |
| I2S / PCM | `I2S2_BCK`, `LRCK`, `SDI`, `SDO` | Shares the digital-audio contacts. |

</div>

The workbook labels MIPI DSI and MIPI CSI as alternative signal maps. Those labels do not, by themselves, establish support on a particular μForge module or SoC package; confirm device capability and routing requirements in the selected module documentation.

## M2xN networking profile

M2xN is the networking-oriented extension map. It assigns one 67-contact M2-form connector to Ethernet, dual USB, CAN, UART, reserved GPIO, and GND.

<div align="center"><em>M2xN Functional Allocation</em></div>

<div align="center" markdown>

| Function | Allocated signals |
| --- | --- |
| Ethernet | The workbook summary calls this Gigabit Ethernet / RGMII, while its contact map labels the signals `RMII_*`. Resolve this naming conflict before implementation. |
| USB | `USB1_D±`, `USB1_DET`, `USB1_OTG`, `USB2_D±`, `USB2_DET`, `USB2_OTG` |
| CAN | `CAN1_TX/RX` through `CAN4_TX/RX`, plus `CAN1/2_STB` and `CAN1/2_ERR_N` controls where assigned |
| UART | `UART1_TX/RX/CTS/RTS` and `UART2_TX/RX/CTS/RTS` |
| Reserved | 15 GPIO contacts and 12 GND contacts |

</div>

## M2xA analog and motion-control profile

M2xA is the motor-control and acquisition extension map. It assigns one 67-contact M2-form connector to complementary PWM outputs, analog inputs, motor-driver control, Hall/encoder inputs, timer channels, reserved GPIO, and dedicated grounds.

<div align="center"><em>M2xA Functional Allocation</em></div>

<div align="center" markdown>

| Function | Allocated signals |
| --- | --- |
| BLDC control | `PWM1_OUT/OUTN`, `PWM2_OUT/OUTN`, `PWM3_OUT/OUTN`, `BKIN1/2`, `DRV_EN`, and `DRV_NFAULT`; the summary labels five analog inputs as `ADC_IU/V/W`, `ADC_VBUS`, and `ADC_NTC`, while the contact map labels them `ADC_IN1–ADC_IN5`. |
| Position feedback | `H_A`, `H_B`, `H_C`, `ENC_A`, `ENC_B`, `ENC_Z` |
| General timing | `TIM_CH1–TIM_CH6` |
| Reserved | 27 GPIO contacts and 13 GND contacts |

</div>

## Module declaration and implementation checklist

A module declaration should identify its base allocation and each supported extension map, for example `M2`, `M2 + M2xM`, or `M2 + M2xN + M2xA`. It should state the number of M2-form connectors implemented, their category, the implemented optional functions, and any mutually exclusive modes.

Before adopting this draft, verify:

- The M.2 E-key connector footprint, card outline, retention hardware, and insertion orientation.
- The number, placement, and category of M2-form connectors on the module and carrier.
- All multiplexed functions selected by the module, including any shared SDIO1/SDIO2, PDM, SWD (debug-UART vs. CTP I2C1), or CAN routing.
- Module-specific I/O voltage, current, reset, boot, and power-sequencing requirements.
- Whether a claimed M2xM MIPI, RGB, DVP, PDM, or I2S function is supported simultaneously or only as an alternate mode.
- Carrier-side requirements for CAN transceivers, USB protection, TF-card power/detect, display power, audio amplification, and external PHYs.
