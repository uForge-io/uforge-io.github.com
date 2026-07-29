/* Interactive SF32 product-selection table (docs/hardware/product-selector.md
   and its Chinese twin). Loads docs/assets/data/product-selector.json (shared
   between both languages via tools/link-shared-assets.sh) and renders a
   filterable table client-side -- there's no backend, so filtering,
   rendering, and link construction all happen here.

   This file is identical in docs/javascripts/ and docs_zh/javascripts/ on
   purpose (same convention as offline.js): it detects the page language from
   document.documentElement.lang at runtime instead of shipping two
   near-duplicate scripts. */
(function () {
  "use strict";

  var LANG = document.documentElement.lang === "zh" ? "zh" : "en";

  var STRINGS = {
    en: {
      loading: "Loading part data...",
      loadError: "Could not load product data. Try refreshing the page.",
      clearFilters: "Clear filters",
      filters: {
        tier: "Integration level",
        tierAny: "Any (chip, module, or board)",
        tierChip: "Chip",
        tierModule: "Module",
        tierDevkit: "Development board",
        wifi: "External Wi-Fi through SDIO",
        camera: "Camera interface (DCMI)",
        ai: "AI / ML accelerator",
        freeIo: "FreeIO flexible GPIO assignment",
        ptm: "PTM (Peripheral Task Machine)",
        psram: "Max PSRAM needed",
        psramAny: "Any",
        gpio: "Max GPIO count needed",
        gpioAny: "Any",
        package: "Package type",
        packageAny: "Any",
        packageQfn68: "QFN68 (7 x 7 mm, 44-48 GPIO)",
        packageQfn80: "QFN80 (8 x 8 mm, up to 58 GPIO)",
        packageBga: "BGA (smaller footprint, more GPIO)",
        power: "Power supply",
        powerAny: "Any",
        powerLiIon: "Li-ion battery powered (direct 3.2-4.7V rail)",
        power3v3: "3.3V supply",
        power1v8: "Down to 1.8V supply",
        display: "Display interface",
        displayAny: "Any",
        displayQspi: "QSPI",
        displayRgb: "RGB",
        displayMipi: "MIPI",
        displayEpd: "EPD",
        displayJdi: "JDI",
        resolution: "Target resolution",
        resolutionAny: "Any",
        audio: "Min. audio I/O",
        audioAny: "Any",
        audioA: "1 DAC / 1 ADC / 2 PDM / 1 I2S",
        audioB: "0 DAC / 0 ADC / 2 PDM / 2 I2S",
        audioC: "1 DAC / 2 ADC / 2 PDM / 2 I2S",
        audioD: "2 DAC / 2 ADC / 2 PDM / 3 I2S",
        audioE: "1 DAC / 1 ADC / 1 PDM / 1 I2S",
        audioF: "0 DAC / 0 ADC / 1 PDM / 1 I2S",
      },
      table: {
        name: "Part",
        wifi: "External Wi-Fi (SDIO)",
        camera: "Camera",
        ai: "AI accelerator",
        freeIo: "FreeIO",
        ptm: "PTM",
        psram: "PSRAM",
        gpio: "Max GPIO",
        package: "Package",
        power: "Power supply",
        display: "Display interfaces",
        resolution: "Max resolution",
        audio: "Audio I/O",
        links: "Resources",
      },
      linkLabels: {
        product: "Product introduction",
      },
      yes: "Yes",
      no: "—",
      noMatchReasonPrefix: "Doesn't match:",
      reasons: {
        tier: "integration level",
        wifi: "no external Wi-Fi",
        camera: "no camera interface",
        ai: "no AI accelerator",
        freeIo: "no FreeIO support",
        ptm: "no PTM support",
        psram: "PSRAM capacity too small",
        gpio: "GPIO count too low",
        packageQfn68: "not available in QFN68",
        packageQfn80: "not available in QFN80",
        packageBga: "not available in BGA",
        powerLiIon: "no direct Li-ion rail documented",
        power3v3: "no 3.3V supply documented",
        power1v8: "doesn't go down to 1.8V",
        display: "missing display interface",
        resolution: "resolution below target",
        audio: "below the minimum audio interface count",
      },
      noResults: "No parts match every filter. Try loosening one of them.",
    },
    zh: {
      loading: "正在加载器件数据...",
      loadError: "无法加载产品数据，请刷新页面重试。",
      clearFilters: "清除筛选条件",
      filters: {
        tier: "集成层级",
        tierAny: "任意（芯片、模组或开发板）",
        tierChip: "芯片",
        tierModule: "模组",
        tierDevkit: "开发板",
        wifi: "通过 SDIO 外接 Wi-Fi",
        camera: "摄像头接口（DCMI）",
        ai: "AI / 机器学习加速器",
        freeIo: "FreeIO 灵活 GPIO 分配",
        ptm: "PTM（外设任务机）",
        psram: "所需最大 PSRAM",
        psramAny: "任意",
        gpio: "所需最大 GPIO 数量",
        gpioAny: "任意",
        package: "封装类型",
        packageAny: "任意",
        packageQfn68: "QFN68（7 x 7 mm，44~48 GPIO）",
        packageQfn80: "QFN80（8 x 8 mm，最多 58 GPIO）",
        packageBga: "BGA（更小尺寸，更多 GPIO）",
        power: "供电电压",
        powerAny: "任意",
        powerLiIon: "锂电池供电（直连 3.2~4.7V 电源轨）",
        power3v3: "3.3V 供电",
        power1v8: "支持低至 1.8V 供电",
        display: "显示接口",
        displayAny: "任意",
        displayQspi: "QSPI",
        displayRgb: "RGB",
        displayMipi: "MIPI",
        displayEpd: "EPD",
        displayJdi: "JDI",
        resolution: "目标分辨率",
        resolutionAny: "任意",
        audio: "最少音频接口",
        audioAny: "任意",
        audioA: "1 DAC / 1 ADC / 2 PDM / 1 I2S",
        audioB: "0 DAC / 0 ADC / 2 PDM / 2 I2S",
        audioC: "1 DAC / 2 ADC / 2 PDM / 2 I2S",
        audioD: "2 DAC / 2 ADC / 2 PDM / 3 I2S",
        audioE: "1 DAC / 1 ADC / 1 PDM / 1 I2S",
        audioF: "0 DAC / 0 ADC / 1 PDM / 1 I2S",
      },
      table: {
        name: "器件",
        wifi: "外接 Wi-Fi（SDIO）",
        camera: "摄像头",
        ai: "AI 加速器",
        freeIo: "FreeIO",
        ptm: "PTM",
        psram: "PSRAM",
        gpio: "最大 GPIO",
        package: "封装",
        power: "供电电压",
        display: "显示接口",
        resolution: "最大分辨率",
        audio: "音频 I/O",
        links: "相关资源",
      },
      linkLabels: {
        product: "产品介绍",
      },
      yes: "是",
      no: "—",
      noMatchReasonPrefix: "不符合：",
      reasons: {
        tier: "集成层级",
        wifi: "无外接 Wi-Fi",
        camera: "无摄像头接口",
        ai: "无 AI 加速器",
        freeIo: "不支持 FreeIO",
        ptm: "不支持 PTM",
        psram: "PSRAM 容量不足",
        gpio: "GPIO 数量不足",
        packageQfn68: "无 QFN68 封装可选",
        packageQfn80: "无 QFN80 封装可选",
        packageBga: "无 BGA 封装可选",
        powerLiIon: "未记录直连锂电池电源轨",
        power3v3: "未记录 3.3V 供电",
        power1v8: "无法降至 1.8V 供电",
        display: "缺少所需显示接口",
        resolution: "分辨率低于目标值",
        audio: "未达到最低音频接口数量要求",
      },
      noResults: "没有器件满足全部筛选条件，请适当放宽某一项。",
    },
  };

  var t = STRINGS[LANG];

  function mdPathToUrl(relPath) {
    var parts = relPath.split("/");
    var filename = parts.pop();
    var dir = parts.join("/");
    var url;
    if (filename === "index.md") {
      url = "/" + dir;
    } else {
      var stem = filename.replace(/\.md$/, "");
      url = dir ? "/" + dir + "/" + stem : "/" + stem;
    }
    if (LANG === "zh") {
      url = "/zh" + url;
    }
    return url.replace(/\/+$/, "") + "/";
  }

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    attrs = attrs || {};
    Object.keys(attrs).forEach(function (k) {
      if (k === "class") node.className = attrs[k];
      else if (k === "text") node.textContent = attrs[k];
      else node.setAttribute(k, attrs[k]);
    });
    (children || []).forEach(function (c) {
      if (c) node.appendChild(c);
    });
    return node;
  }

  function evaluate(record, state) {
    var reasons = [];
    if (state.tier !== "any" && record.tier !== state.tier) reasons.push(t.reasons.tier);
    if (state.wifi && !record.wifi) reasons.push(t.reasons.wifi);
    if (state.camera && !record.camera) reasons.push(t.reasons.camera);
    if (state.ai && !record.ai_accelerator) reasons.push(t.reasons.ai);
    if (state.free_io && !record.free_io) reasons.push(t.reasons.freeIo);
    if (state.ptm && !record.ptm) reasons.push(t.reasons.ptm);
    if (state.psram !== "any" && record.psram_max_mb < parseInt(state.psram, 10)) reasons.push(t.reasons.psram);
    if (state.gpio !== "any" && record.gpio_max < parseInt(state.gpio, 10)) reasons.push(t.reasons.gpio);

    // Package, power, and display interface are each a single-select
    // dropdown (state holds one value, or "any"), not independent
    // checkboxes -- a part is checked against whichever one value was
    // picked rather than a combination of criteria.
    var packageTypes = record.package_types || [];
    if (state.package !== "any" && packageTypes.indexOf(state.package) === -1) {
      var packageReasonKey =
        state.package === "QFN68" ? "packageQfn68" : state.package === "QFN80" ? "packageQfn80" : "packageBga";
      reasons.push(t.reasons[packageReasonKey]);
    }

    if (state.power === "li_ion" && !record.power_li_ion) reasons.push(t.reasons.powerLiIon);
    if (state.power === "3v3" && !record.power_3v3) reasons.push(t.reasons.power3v3);
    if (state.power === "1v8" && !record.power_1v8) reasons.push(t.reasons.power1v8);

    var displayInterfaces = record.display_interfaces || [];
    if (state.display !== "any" && displayInterfaces.indexOf(state.display) === -1) {
      reasons.push(t.reasons.display + " (" + state.display + ")");
    }

    if (state.resolution !== "any") {
      var wantPx = parseInt(state.resolution, 10);
      if (record.max_resolution_px === null || record.max_resolution_px === undefined || record.max_resolution_px < wantPx) {
        reasons.push(t.reasons.resolution);
      }
    }

    // Audio is a per-dimension minimum threshold, same as PSRAM/GPIO -- the
    // selected preset's dac-adc-pdm-i2s counts are each a floor, and a part
    // qualifies if it meets or exceeds all four independently. A part with
    // more of everything than the selected preset still matches, even if
    // its exact combination isn't itself one of the catalogued presets.
    if (state.audio !== "any") {
      var wantAudio = state.audio.split("-").map(function (n) {
        return parseInt(n, 10);
      });
      if (
        record.audio_dac < wantAudio[0] ||
        record.audio_adc < wantAudio[1] ||
        record.audio_pdm < wantAudio[2] ||
        record.audio_i2s < wantAudio[3]
      ) {
        reasons.push(t.reasons.audio);
      }
    }

    return { matches: reasons.length === 0, reasons: reasons };
  }

  function renderLinks(record) {
    // The Resources column only surfaces the product introduction link --
    // family comparison, closest module/board, software support, and
    // design guide/checklist links are all still one click away from that
    // introduction page, so repeating them per row here was redundant.
    var wrap = el("div", { class: "uf-ps-links" });
    var path = record.links && record.links.product;
    if (path) {
      wrap.appendChild(
        el("a", { href: mdPathToUrl(path), class: "uf-ps-link" }, [
          document.createTextNode(t.linkLabels.product),
        ])
      );
    }
    return wrap;
  }

  function boolCell(value) {
    return el("td", { class: value ? "uf-ps-yes" : "uf-ps-no", text: value ? t.yes : t.no });
  }

  function renderTable(data, state, tbody) {
    tbody.innerHTML = "";
    var anyVisible = false;
    data.parts.forEach(function (record) {
      var result = evaluate(record, state);
      anyVisible = anyVisible || result.matches;
      var row = el("tr", { class: result.matches ? "uf-ps-row-match" : "uf-ps-row-excluded" });

      row.appendChild(el("td", { text: record.name }));

      // Table cells favor short, single-line labels over the fuller
      // free-text fields (record.package / record.power_supply) -- long
      // strings caused rows to wrap across several lines and made the
      // table feel cluttered. The full detail is still one hover away
      // via `title`.
      //
      // Column order: PSRAM, Max GPIO, Package, Power supply, Display
      // interfaces, Max resolution, Audio, external Wi-Fi, AI accelerator,
      // Camera, FreeIO, PTM, Resources.

      // Dual-channel PSRAM parts (e.g. 2x 16MB) show their per-channel
      // split via psram_label instead of just the summed total, since
      // "32 MB" alone hides that it's two independent 16MB pools rather
      // than one contiguous 32MB pool. Parts with no PSRAM at all
      // (psram_max_mb: null, e.g. SF32LB52BU) show "n/a" instead of the
      // literal string "null MB".
      var psramText =
        record.psram_label || (record.psram_max_mb === null || record.psram_max_mb === undefined
          ? "n/a"
          : record.psram_max_mb + " MB");
      row.appendChild(el("td", { text: psramText }));
      row.appendChild(el("td", { text: String(record.gpio_max) }));

      // The table cell shows the exact orderable package designator (e.g.
      // "BGA145", "WBBGA175") taken from record.package, not the generic
      // QFN68/QFN80/BGA category used by the Package type filter -- those
      // stay separate on purpose, since the filter is deliberately coarser
      // than the real per-part package variety. Full detail (with die
      // dimensions) is still one hover away via `title`.
      var packageShort = record.package ? record.package.split(" (")[0] : (record.package_types || []).join(" / ");
      row.appendChild(el("td", { text: packageShort, title: record.package }));

      var powerShort = [];
      if (record.power_li_ion) powerShort.push("Li-ion");
      if (record.power_3v3) powerShort.push("3.3V");
      if (record.power_1v8) powerShort.push("1.8V");
      row.appendChild(el("td", { text: powerShort.join(" / "), title: record.power_supply }));

      row.appendChild(el("td", { text: (record.display_interfaces || []).join(" / ") }));
      row.appendChild(el("td", { text: record.max_resolution_label || t.no }));

      var audioShort = record.audio_dac + "/" + record.audio_adc + "/" + record.audio_pdm + "/" + record.audio_i2s;
      var audioFull =
        LANG === "zh"
          ? "DAC " +
            record.audio_dac +
            " / ADC " +
            record.audio_adc +
            " / PDM 接口 " +
            record.audio_pdm +
            " / I2S " +
            record.audio_i2s
          : "DAC " +
            record.audio_dac +
            " / ADC " +
            record.audio_adc +
            " / PDM interfaces " +
            record.audio_pdm +
            " / I2S " +
            record.audio_i2s;
      row.appendChild(el("td", { text: audioShort, title: audioFull }));

      row.appendChild(boolCell(record.wifi));
      row.appendChild(boolCell(record.ai_accelerator));
      row.appendChild(boolCell(record.camera));
      row.appendChild(boolCell(record.free_io));
      row.appendChild(boolCell(record.ptm));

      var linksCell = el("td", {});
      linksCell.appendChild(renderLinks(record));
      if (!result.matches) {
        linksCell.appendChild(
          el("div", {
            class: "uf-ps-reason",
            text: t.noMatchReasonPrefix + " " + result.reasons.join(", "),
          })
        );
      }
      row.appendChild(linksCell);

      tbody.appendChild(row);
    });

    var noResultsRow = document.getElementById("uf-ps-no-results");
    if (noResultsRow) {
      noResultsRow.style.display = anyVisible ? "none" : "";
    }
  }

  function buildControls(container, data, tbody) {
    var state = {
      tier: "any",
      wifi: false,
      camera: false,
      ai: false,
      free_io: false,
      ptm: false,
      psram: "any",
      gpio: "any",
      package: "any",
      power: "any",
      display: "any",
      resolution: "any",
      audio: "any",
    };
    var selectInputs = [];
    var checkboxInputs = [];
    var controlId = 0;

    function update() {
      renderTable(data, state, tbody);
    }

    function selectRow(labelText, options, onChange) {
      var group = el("div", { class: "uf-ps-filter" });
      var id = "uf-ps-select-" + controlId++;
      group.appendChild(el("label", { for: id, text: labelText }));
      var select = el("select", { id: id });
      options.forEach(function (opt) {
        var option = el("option", { value: opt.value, text: opt.label });
        select.appendChild(option);
      });
      select.addEventListener("change", function (e) {
        onChange(e.target.value);
        update();
      });
      group.appendChild(select);
      selectInputs.push(select);
      return group;
    }

    function checkboxRow(labelText, onChange) {
      var group = el("div", { class: "uf-ps-filter uf-ps-filter-checkbox" });
      var id = "uf-ps-checkbox-" + controlId++;
      var label = el("label", { for: id });
      var checkbox = el("input", { id: id, type: "checkbox" });
      checkbox.addEventListener("change", function (e) {
        onChange(e.target.checked);
        update();
      });
      label.appendChild(checkbox);
      label.appendChild(document.createTextNode(" " + labelText));
      group.appendChild(label);
      checkboxInputs.push(checkbox);
      return group;
    }

    // All the boolean "requires X" checkboxes go in one row, and all the
    // select-style filters (8 of them) go together in a 2-row x 4-column
    // matrix -- keeps the two control types visually distinct instead of
    // interleaved, and gives the selects a tidy grid instead of whatever
    // happened to fit per line.
    var checkboxGroup = el("div", { class: "uf-ps-controls-checkboxes" });
    var selectGroup = el("div", { class: "uf-ps-controls-selects" });

    selectGroup.appendChild(
      selectRow(
        t.filters.tier,
        [
          { value: "any", label: t.filters.tierAny },
          { value: "chip", label: t.filters.tierChip },
          { value: "module", label: t.filters.tierModule },
          { value: "devkit", label: t.filters.tierDevkit },
        ],
        function (v) {
          state.tier = v;
        }
      )
    );

    selectGroup.appendChild(
      selectRow(
        t.filters.psram,
        [
          { value: "any", label: t.filters.psramAny },
          { value: "4", label: "≥ 4 MB" },
          { value: "8", label: "≥ 8 MB" },
          { value: "16", label: "≥ 16 MB" },
          { value: "32", label: "≥ 32 MB" },
          { value: "64", label: "≥ 64 MB" },
        ],
        function (v) {
          state.psram = v;
        }
      )
    );

    selectGroup.appendChild(
      selectRow(
        t.filters.gpio,
        [
          { value: "any", label: t.filters.gpioAny },
          { value: "40", label: "≥ 40" },
          { value: "60", label: "≥ 60" },
          { value: "100", label: "≥ 100" },
          { value: "150", label: "≥ 150" },
        ],
        function (v) {
          state.gpio = v;
        }
      )
    );

    checkboxGroup.appendChild(
      checkboxRow(t.filters.wifi, function (v) {
        state.wifi = v;
      })
    );
    checkboxGroup.appendChild(
      checkboxRow(t.filters.camera, function (v) {
        state.camera = v;
      })
    );
    checkboxGroup.appendChild(
      checkboxRow(t.filters.ai, function (v) {
        state.ai = v;
      })
    );
    checkboxGroup.appendChild(
      checkboxRow(t.filters.freeIo, function (v) {
        state.free_io = v;
      })
    );
    checkboxGroup.appendChild(
      checkboxRow(t.filters.ptm, function (v) {
        state.ptm = v;
      })
    );

    selectGroup.appendChild(
      selectRow(
        t.filters.package,
        [
          { value: "any", label: t.filters.packageAny },
          { value: "QFN68", label: t.filters.packageQfn68 },
          { value: "QFN80", label: t.filters.packageQfn80 },
          { value: "BGA", label: t.filters.packageBga },
        ],
        function (v) {
          state.package = v;
        }
      )
    );

    selectGroup.appendChild(
      selectRow(
        t.filters.power,
        [
          { value: "any", label: t.filters.powerAny },
          { value: "li_ion", label: t.filters.powerLiIon },
          { value: "3v3", label: t.filters.power3v3 },
          { value: "1v8", label: t.filters.power1v8 },
        ],
        function (v) {
          state.power = v;
        }
      )
    );

    selectGroup.appendChild(
      selectRow(
        t.filters.display,
        [
          { value: "any", label: t.filters.displayAny },
          { value: "QSPI", label: t.filters.displayQspi },
          { value: "RGB", label: t.filters.displayRgb },
          { value: "MIPI", label: t.filters.displayMipi },
          { value: "EPD", label: t.filters.displayEpd },
          { value: "JDI", label: t.filters.displayJdi },
        ],
        function (v) {
          state.display = v;
        }
      )
    );

    selectGroup.appendChild(
      selectRow(
        t.filters.resolution,
        [
          { value: "any", label: t.filters.resolutionAny },
          { value: "262144", label: "≥ 512 x 512" },
          { value: "384000", label: "≥ 800 x 480" },
          { value: "614400", label: "≥ 1024 x 600" },
          { value: "921600", label: "≥ 1280 x 720" },
        ],
        function (v) {
          state.resolution = v;
        }
      )
    );

    selectGroup.appendChild(
      selectRow(
        t.filters.audio,
        [
          { value: "any", label: t.filters.audioAny },
          { value: "0-0-1-1", label: t.filters.audioF },
          { value: "1-1-1-1", label: t.filters.audioE },
          { value: "0-0-2-2", label: t.filters.audioB },
          { value: "1-1-2-1", label: t.filters.audioA },
          { value: "1-2-2-2", label: t.filters.audioC },
          { value: "2-2-2-3", label: t.filters.audioD },
        ],
        function (v) {
          state.audio = v;
        }
      )
    );

    container.appendChild(selectGroup);
    container.appendChild(checkboxGroup);

    var actions = el("div", { class: "uf-ps-actions" });
    var resetButton = el("button", { class: "uf-ps-reset", type: "button", text: t.clearFilters });
    resetButton.addEventListener("click", function () {
      state.tier = "any";
      state.wifi = false;
      state.camera = false;
      state.ai = false;
      state.free_io = false;
      state.ptm = false;
      state.psram = "any";
      state.gpio = "any";
      state.package = "any";
      state.power = "any";
      state.display = "any";
      state.resolution = "any";
      state.audio = "any";
      selectInputs.forEach(function (select) {
        select.selectedIndex = 0;
      });
      checkboxInputs.forEach(function (checkbox) {
        checkbox.checked = false;
      });
      update();
    });
    actions.appendChild(resetButton);
    container.appendChild(actions);

    update();
  }

  function init() {
    var root = document.getElementById("uf-product-selector");
    if (!root) return;

    root.textContent = "";
    root.appendChild(el("p", { class: "uf-ps-status", text: t.loading }));

    var dataUrl = (LANG === "zh" ? "/zh" : "") + "/assets/data/product-selector.json";

    fetch(dataUrl)
      .then(function (resp) {
        if (!resp.ok) throw new Error("HTTP " + resp.status);
        return resp.json();
      })
      .then(function (data) {
        root.textContent = "";

        // last_verified/source_note are retained in the JSON as an internal
        // audit trail (dataset provenance, correction history) but are not
        // rendered on the page -- the full source_note has grown into a
        // long paragraph of engineering-detail prose that isn't meant for
        // site visitors.
        var controls = el("div", { class: "uf-ps-controls" });
        root.appendChild(controls);

        var tableWrap = el("div", { class: "uf-ps-table-wrap" });
        var table = el("table", { class: "uf-ps-table" });
        var thead = el("thead", {});
        var headRow = el("tr", {});
        [
          t.table.name,
          t.table.psram,
          t.table.gpio,
          t.table.package,
          t.table.power,
          t.table.display,
          t.table.resolution,
          t.table.audio,
          t.table.wifi,
          t.table.ai,
          t.table.camera,
          t.table.freeIo,
          t.table.ptm,
          t.table.links,
        ].forEach(function (label) {
          headRow.appendChild(el("th", { text: label }));
        });
        thead.appendChild(headRow);
        table.appendChild(thead);

        var tbody = el("tbody", {});
        table.appendChild(tbody);
        tableWrap.appendChild(table);
        root.appendChild(tableWrap);

        var noResults = el("p", { id: "uf-ps-no-results", class: "uf-ps-no-results", text: t.noResults });
        noResults.style.display = "none";
        root.appendChild(noResults);

        buildControls(controls, data, tbody);
      })
      .catch(function () {
        root.textContent = "";
        root.appendChild(el("p", { class: "uf-ps-status uf-ps-error", text: t.loadError }));
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
