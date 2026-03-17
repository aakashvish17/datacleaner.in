(function () {
  const data = window.SiteData;
  const mount = document.querySelector("[data-tool-app]");
  if (!mount || !data) return;

  const slug = mount.dataset.toolSlug;
  const tool = data.getToolBySlug(slug);
  if (!tool) return;

    const basePath = (() => {
    try {
      const script = document.currentScript;
      if (script && script.src) {
        const url = new URL(script.src, window.location.href);
        const idx = url.pathname.indexOf("/assets/");
        if (idx !== -1) return url.pathname.slice(0, idx);
      }
    } catch (_error) {
      // fall through
    }

    // Fallback heuristic: works for custom domains and for /<repo>/<section>/... paths.
    const roots = new Set([
      "tools",
      "articles",
      "tutorials",
      "about",
      "contact",
      "privacy-policy",
      "terms",
      "disclaimer",
      "dmca",
    ]);

    const path = window.location.pathname.replace(/\/+$/, "");
    const parts = path.split("/").filter(Boolean);

    if (parts.length === 0) return "";
    if (roots.has(parts[0])) return "";
    if (parts.length > 1 && roots.has(parts[1])) return `/${parts[0]}`;
    if (parts.length === 1 && window.location.hostname.endsWith("github.io")) return `/${parts[0]}`;
    return "";
  })();

  const options = {
    "json-formatter": '<label><span class="meta-note">Mode</span><select data-option="mode"><option value="pretty">Pretty</option><option value="minify">Minify</option><option value="validate">Validate</option></select></label>',
    "list-deduplicator": '<label><span class="meta-note">Keep order</span><select data-option="keepOrder"><option value="yes">Yes</option><option value="no">No, sort</option></select></label>',
    "text-cleaner": '<label><span class="meta-note">Line breaks</span><select data-option="whitespace"><option value="normalize">Normalize</option><option value="remove-lines">Remove</option></select></label><label><span class="meta-note">Strip HTML</span><select data-option="stripHtml"><option value="yes">Yes</option><option value="no">No</option></select></label><label><span class="meta-note">Special chars</span><select data-option="specialChars"><option value="no">Keep</option><option value="yes">Remove</option></select></label>',
    "case-converter": '<label><span class="meta-note">Case style</span><select data-option="mode"><option value="upper">UPPERCASE</option><option value="lower">lowercase</option><option value="title">Title Case</option><option value="sentence">Sentence Case</option></select></label>',
    "column-extractor": '<label><span class="meta-note">Column</span><input type="number" min="1" value="1" data-option="column" /></label><label><span class="meta-note">Delimiter</span><input type="text" value="," data-option="delimiter" /></label>',
    "email-list-cleaner": '<label><span class="meta-note">Sort output</span><select data-option="sort"><option value="yes">Yes</option><option value="no">No</option></select></label>',
    "url-cleaner": '<label><span class="meta-note">Extra params</span><input type="text" placeholder="gclid,mc_cid" data-option="params" /></label>',
    "large-text-processor": '<label><span class="meta-note">Remove duplicate lines</span><select data-option="dedupe"><option value="yes">Yes</option><option value="no">No</option></select></label><label><span class="meta-note">Remove blank lines</span><select data-option="blank"><option value="yes">Yes</option><option value="no">No</option></select></label>',
    "base64-encoder-decoder": '<label><span class="meta-note">Mode</span><select data-option="mode"><option value="encode">Encode</option><option value="decode">Decode</option></select></label>',
    "url-encoder-decoder": '<label><span class="meta-note">Mode</span><select data-option="mode"><option value="encode">Encode</option><option value="decode">Decode</option></select></label>',
    "regex-tester": '<label><span class="meta-note">Pattern</span><input type="text" value="\\w+" data-option="pattern" /></label><label><span class="meta-note">Flags</span><input type="text" value="g" data-option="flags" /></label>',
    "keyword-density-checker": '<label><span class="meta-note">Target keyword</span><input type="text" placeholder="data cleaning" data-option="keyword" /></label>',
    "text-diff-checker": '<label><span class="meta-note">Comparison mode</span><select data-option="mode"><option value="line">Line by line</option></select></label>',
    "code-beautifier": '<label><span class="meta-note">Format type</span><select data-option="mode"><option value="json">JSON</option><option value="html">HTML</option><option value="css">CSS</option><option value="js">JavaScript</option><option value="xml">XML</option></select></label>',
  };

  const examples = {
    "csv-to-json": 'name,email\nAakash,aakash@example.com\nNina,nina@example.com',
    "json-formatter": '{"site":"tool","tools":["json","csv"]}',
    "text-cleaner": "  Hello   world  \n\n <b>Extra</b> spaces! ",
    "regex-tester": "Order #123\nOrder #456\nTicket #789",
    "url-cleaner": "https://example.com/?utm_source=ads&ref=nav&id=42",
    "text-diff-checker": "first line\nsame line\nold value",
  };

  const sanitize = (value) => String(value ?? "").replace(/\u0000/g, "");
  const escapeHtml = (value) =>
    String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  const appPath = (path) => `${basePath}${path}`;

  const related = data.tools.filter((item) => item.slug !== slug).slice(0, 4);
  const resolvedOptionsMarkup = tool.optionsMarkup || options[slug] || "";
  const hasSecondaryInput = Boolean(tool.secondaryInput || slug === "text-diff-checker");
  const secondaryInputLabel = tool.secondaryInputLabel || "Second text block";
  const draftKey = `adcs-tool-draft:${slug}`;

  mount.innerHTML = `
    <section class="page-hero tool-hero">
      <div class="container">
        <div class="tool-topbar">
          <div class="page-hero-copy">
            <span class="eyebrow">${escapeHtml(tool.category)}</span>
            <h1>${escapeHtml(tool.name)}</h1>
            <p class="page-lead">${escapeHtml(tool.description)}</p>
            <div class="tool-chip-list">${tool.keywords
              .map((keyword) => `<a href="${appPath(`/tools/?q=${encodeURIComponent(keyword)}`)}">${escapeHtml(keyword)}</a>`)
              .join("")}</div>
          </div>
          <div class="tool-summary-card">
            <span class="card-tag">Quick start</span>
            <p>Paste content, tune options, and generate a clean result in the browser without extra setup.</p>
            <div class="result-stats">
              <span>No signup required</span>
              <span>Browser-side processing</span>
              <span>Instant export</span>
            </div>
          </div>
        </div>
        <div class="tool-layout tool-layout-top">
          <div class="tool-panel">
            <div class="tool-panel-head">
              <div>
                <span class="card-tag">Input</span>
                <h2>Start processing</h2>
              </div>
              <div class="tool-inline-actions">
                <button class="action-button" type="button" data-load-example>Load Example</button>
                <button class="action-button" type="button" data-clear-draft>Clear Draft</button>
              </div>
            </div>
            <p class="tool-description">Paste source data below, optionally import a file, and run the tool locally in your browser.</p>
            <div class="tool-form-grid">
              <div class="tool-meta-grid">${resolvedOptionsMarkup}</div>
              <label><span class="meta-note">Paste input</span><textarea data-input placeholder="Paste your content here"></textarea></label>
              ${hasSecondaryInput ? `<label><span class="meta-note">${escapeHtml(secondaryInputLabel)}</span><textarea data-secondary-input placeholder="Paste the second version here"></textarea></label>` : ""}
              <div class="drop-zone" data-drop-zone tabindex="0">
                <strong>Drop a text file here</strong>
                <p>Supports .txt, .csv, .json, .xml, .html, .css, and .js</p>
                <label for="tool-file-input">Choose file</label>
                <input id="tool-file-input" type="file" accept=".txt,.csv,.json,.xml,.html,.css,.js" data-file-input />
              </div>
              <div class="tool-actions">
                <button class="button button-primary" type="button" data-run>Run Tool</button>
                <button class="action-button" type="button" data-copy-input>Copy Input</button>
                <button class="action-button" type="button" data-reset>Reset</button>
              </div>
              <div class="tool-status" data-status>Ready for input.</div>
            </div>
          </div>
          <div class="tool-output-panel">
            <div class="tool-panel-head">
              <div>
                <span class="card-tag">Output</span>
                <h2>Processed result</h2>
              </div>
            </div>
            <textarea data-output placeholder="Your processed output will appear here"></textarea>
            <div class="tool-actions">
              <button class="button button-primary" type="button" data-copy-output>Copy Output</button>
              <button class="action-button" type="button" data-download>Download</button>
            </div>
            <div class="result-stats" data-stats></div>
          </div>
        </div>
        <aside class="tool-sidebar tool-sidebar-inline">
          <div class="sidebar-card">
            <span class="card-tag">Why it works</span>
            <p>Fast client-side processing, draft saving, copy-friendly output, and responsive layouts designed for quick workflows.</p>
          </div>
          <div class="sidebar-card">
            <span class="card-tag">Related tools</span>
            <div class="related-links">${related
              .map((item) => `<a href="${appPath(`/tools/${item.slug}/`)}">${escapeHtml(item.name)}</a>`)
              .join("")}</div>
          </div>
        </aside>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="section-heading"><span class="faq-label">FAQ</span><h2>Common questions about ${escapeHtml(tool.name)}</h2></div>
        <div class="faq-list">${tool.faqs
          .map((faq) => `<article class="faq-item"><h3>${escapeHtml(faq.q)}</h3><p>${escapeHtml(faq.a)}</p></article>`)
          .join("")}</div>
      </div>
    </section>
  `;

  const canonicalUrl = `${window.location.origin}${appPath(`/tools/${tool.slug}/`)}`;
  const schema = document.createElement("script");
  schema.type = "application/ld+json";
  schema.textContent = JSON.stringify([
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: tool.name,
      applicationCategory: tool.category,
      operatingSystem: "Web Browser",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description: tool.description,
      url: canonicalUrl,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: tool.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: { "@type": "Answer", text: faq.a },
      })),
    },
  ]);
  document.head.appendChild(schema);

  const input = mount.querySelector("[data-input]");
  const output = mount.querySelector("[data-output]");
  const stats = mount.querySelector("[data-stats]");
  const status = mount.querySelector("[data-status]");
  const secondaryInput = mount.querySelector("[data-secondary-input]");
  const fileInput = mount.querySelector("[data-file-input]");
  const dropZone = mount.querySelector("[data-drop-zone]");

  const setStatus = (message, type = "neutral") => {
    status.textContent = message;
    status.dataset.state = type;
  };

  const getOption = (name) => {
    const field = mount.querySelector(`[data-option="${name}"]`);
    return field ? field.value : "";
  };

  const saveDraft = () => {
    const optionValues = {};
    mount.querySelectorAll("[data-option]").forEach((field) => {
      optionValues[field.dataset.option] = field.value;
    });

    localStorage.setItem(
      draftKey,
      JSON.stringify({
        input: input.value,
        secondary: secondaryInput ? secondaryInput.value : "",
        options: optionValues,
      })
    );
  };

  const loadDraft = () => {
    try {
      const draft = JSON.parse(localStorage.getItem(draftKey) || "null");
      if (!draft) return;
      input.value = draft.input || "";
      if (secondaryInput) secondaryInput.value = draft.secondary || "";
      Object.entries(draft.options || {}).forEach(([name, value]) => {
        const field = mount.querySelector(`[data-option="${name}"]`);
        if (field) field.value = value;
      });
      if (draft.input || draft.secondary) {
        setStatus("Recovered your saved draft for this tool.", "success");
      }
    } catch (_error) {
      localStorage.removeItem(draftKey);
    }
  };

  const countStats = (text) => {
    const clean = sanitize(text);
    const words = clean.trim() ? clean.trim().split(/\s+/).length : 0;
    const lines = clean ? clean.split(/\r?\n/).length : 0;
    stats.innerHTML = `<span>Characters: ${clean.length}</span><span>Words: ${words}</span><span>Lines: ${lines}</span>`;
  };

  const parseCsv = (text) => {
    const rows = text
      .trim()
      .split(/\r?\n/)
      .filter(Boolean)
      .map((line) => line.split(",").map((cell) => cell.trim()));
    if (!rows.length) return [];
    const headers = rows.shift();
    return rows.map((row) =>
      headers.reduce((item, header, index) => {
        item[header || `column_${index + 1}`] = row[index] ?? "";
        return item;
      }, {})
    );
  };

  const toCsv = (items) => {
    if (!Array.isArray(items) || !items.length) return "";
    const headers = Array.from(new Set(items.flatMap((item) => Object.keys(item))));
    const escapeCell = (value) => {
      const cell = String(value ?? "");
      return /[",\n]/.test(cell) ? `"${cell.replace(/"/g, '""')}"` : cell;
    };
    return [headers.join(","), ...items.map((item) => headers.map((header) => escapeCell(item[header])).join(","))].join("\n");
  };

  const titleCase = (text) =>
    text
      .toLowerCase()
      .split(/\s+/)
      .map((word) => (word ? word[0].toUpperCase() + word.slice(1) : ""))
      .join(" ");

  const sentenceCase = (text) => text.toLowerCase().replace(/(^\s*\w|[.!?]\s+\w)/g, (match) => match.toUpperCase());

  const beautify = (text, mode) => {
    if (mode === "json") return JSON.stringify(JSON.parse(text), null, 2);
    if (mode === "xml" || mode === "html") {
      return text
        .replace(/>\s*</g, ">\n<")
        .split("\n")
        .map((line) => line.trim())
        .join("\n");
    }
    return text
      .replace(/;/g, ";\n")
      .replace(/{/g, "{\n")
      .replace(/}/g, "\n}\n")
      .replace(/\n{2,}/g, "\n")
      .trim();
  };

  const minify = (text) =>
    text
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/<!--[\s\S]*?-->/g, "")
      .replace(/\s+/g, " ")
      .replace(/\s*([{}:;,])\s*/g, "$1")
      .trim();

  const formatXml = (text) => {
    const pieces = text
      .replace(/>\s*</g, "><")
      .replace(/(>)(<)(\/*)/g, "$1\n$2$3")
      .split("\n");
    let depth = 0;
    return pieces
      .map((line) => {
        const trimmed = line.trim();
        if (/^<\//.test(trimmed)) depth = Math.max(depth - 1, 0);
        const result = `${"  ".repeat(depth)}${trimmed}`;
        if (/^<[^!?/][^>]*[^/]>/g.test(trimmed)) depth += 1;
        return result;
      })
      .join("\n");
  };

  const helpers = {
    sanitize,
    parseCsv,
    toCsv,
    titleCase,
    sentenceCase,
    beautify,
    minify,
    formatXml,
  };

  function safeUrl(rawUrl) {
    const candidate = rawUrl.trim();
    if (!candidate) return "";
    const normalized = /^https?:\/\//i.test(candidate) ? candidate : `https://${candidate}`;
    return new URL(normalized);
  }

  function runTool() {
    const raw = sanitize(input.value);
    const second = secondaryInput ? sanitize(secondaryInput.value) : "";
    let result = "";

    if (!raw && slug !== "text-diff-checker") {
      output.value = "";
      countStats("");
      setStatus("Add some input before running the tool.", "error");
      return;
    }

    try {
      if (tool.handlerCode) {
        const customRunner = new Function("input", "secondary", "options", "helpers", tool.handlerCode);
        const optionValues = {};
        mount.querySelectorAll("[data-option]").forEach((field) => {
          optionValues[field.dataset.option] = field.value;
        });
        result = customRunner(raw, second, optionValues, helpers);
        output.value = typeof result === "string" ? result : String(result ?? "");
        countStats(output.value);
        setStatus("Processed successfully with custom handler.", "success");
        return;
      }

      switch (slug) {
        case "csv-to-json":
          result = JSON.stringify(parseCsv(raw), null, 2);
          break;
        case "json-formatter": {
          const parsed = JSON.parse(raw);
          const mode = getOption("mode");
          result = mode === "minify" ? JSON.stringify(parsed) : JSON.stringify(parsed, null, 2);
          if (mode === "validate") result = `Valid JSON\n\n${result}`;
          break;
        }
        case "list-deduplicator": {
          const lines = raw.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
          const unique = [...new Set(lines)];
          result = getOption("keepOrder") === "yes" ? unique.join("\n") : unique.sort().join("\n");
          break;
        }
        case "text-cleaner":
          result = raw;
          if (getOption("stripHtml") === "yes") result = result.replace(/<[^>]*>/g, " ");
          result = getOption("whitespace") === "remove-lines" ? result.replace(/\r?\n+/g, " ") : result.replace(/\s+/g, " ");
          if (getOption("specialChars") === "yes") result = result.replace(/[^\w\s.-]/g, "");
          result = result.trim();
          break;
        case "case-converter":
          result =
            getOption("mode") === "upper"
              ? raw.toUpperCase()
              : getOption("mode") === "lower"
                ? raw.toLowerCase()
                : getOption("mode") === "title"
                  ? titleCase(raw)
                  : sentenceCase(raw);
          break;
        case "column-extractor": {
          const index = Math.max(Number(getOption("column")) - 1, 0);
          const delimiter = getOption("delimiter") || ",";
          result = raw
            .split(/\r?\n/)
            .filter(Boolean)
            .map((line) => line.split(delimiter)[index]?.trim() ?? "")
            .join("\n");
          break;
        }
        case "email-list-cleaner": {
          const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          let emails = [
            ...new Set(
              raw
                .split(/[\s,;]+/)
                .map((item) => item.trim().toLowerCase())
                .filter((item) => valid.test(item))
            ),
          ];
          if (getOption("sort") === "yes") emails = emails.sort();
          result = emails.join("\n");
          break;
        }
        case "url-cleaner": {
          const extras = getOption("params").split(",").map((item) => item.trim()).filter(Boolean);
          const blocked = new Set(["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "ref", "fbclid", ...extras]);
          result = raw
            .split(/\r?\n/)
            .filter(Boolean)
            .map((line) => {
              const url = safeUrl(line);
              [...url.searchParams.keys()].forEach((key) => blocked.has(key) && url.searchParams.delete(key));
              return url.toString();
            })
            .join("\n");
          break;
        }
        case "json-to-csv":
          result = toCsv(JSON.parse(raw));
          break;
        case "large-text-processor": {
          let lines = raw.split(/\r?\n/);
          if (getOption("blank") === "yes") lines = lines.filter((line) => line.trim() !== "");
          if (getOption("dedupe") === "yes") lines = [...new Set(lines)];
          result = lines.join("\n");
          break;
        }
        case "xml-formatter":
          result = formatXml(raw);
          break;
        case "base64-encoder-decoder":
          result =
            getOption("mode") === "decode"
              ? decodeURIComponent(escape(window.atob(raw)))
              : window.btoa(unescape(encodeURIComponent(raw)));
          break;
        case "url-encoder-decoder":
          result = getOption("mode") === "decode" ? decodeURIComponent(raw) : encodeURIComponent(raw);
          break;
        case "regex-tester": {
          const regex = new RegExp(getOption("pattern"), getOption("flags") || "g");
          const matches = raw.match(regex) || [];
          result = matches.length ? matches.join("\n") : "No matches found.";
          break;
        }
        case "slug-generator":
          result = raw.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-").replace(/-+/g, "-");
          break;
        case "keyword-density-checker": {
          const keyword = getOption("keyword").trim().toLowerCase();
          const words = raw.toLowerCase().match(/\b[\w'-]+\b/g) || [];
          const safeKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
          const count = keyword ? (raw.toLowerCase().match(new RegExp(safeKeyword, "g")) || []).length : 0;
          const density = words.length ? ((count / words.length) * 100).toFixed(2) : "0.00";
          const topTerms = Object.entries(words.reduce((acc, word) => ((acc[word] = (acc[word] || 0) + 1), acc), {}))
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10)
            .map(([word, countValue]) => `${word}: ${countValue}`)
            .join("\n");
          result = `Target keyword: ${keyword || "None"}\nOccurrences: ${count}\nDensity: ${density}%\n\nTop terms:\n${topTerms}`;
          break;
        }
        case "text-diff-checker": {
          const left = raw.split(/\r?\n/);
          const right = second.split(/\r?\n/);
          const max = Math.max(left.length, right.length);
          const diff = [];
          for (let i = 0; i < max; i += 1) {
            if ((left[i] || "") === (right[i] || "")) continue;
            if (left[i]) diff.push(`- ${left[i]}`);
            if (right[i]) diff.push(`+ ${right[i]}`);
          }
          result = diff.join("\n") || "No differences found.";
          break;
        }
        case "html-minifier":
        case "css-minifier":
        case "js-minifier":
          result = minify(raw);
          break;
        case "code-beautifier":
          result = beautify(raw, getOption("mode"));
          break;
        default:
          result = raw;
      }

      output.value = result;
      countStats(result);
      setStatus("Processed successfully.", "success");
    } catch (error) {
      output.value = `Error: ${error.message}`;
      countStats(output.value);
      setStatus(error.message, "error");
    }
  }

  const copyText = async (text, message) => {
    if (!text) {
      setStatus("Nothing to copy yet.", "error");
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      setStatus(message, "success");
    } catch (_error) {
      setStatus("Clipboard access failed in this browser.", "error");
    }
  };

  const loadFile = (file) => {
    if (!file) return;
    file.text().then((text) => {
      input.value = sanitize(text);
      saveDraft();
      setStatus(`Loaded ${file.name} into the input area.`, "success");
    });
  };

  mount.querySelector("[data-run]").addEventListener("click", runTool);
  mount.querySelector("[data-copy-input]").addEventListener("click", () => copyText(input.value, "Input copied to clipboard."));
  mount.querySelector("[data-copy-output]").addEventListener("click", () => copyText(output.value, "Output copied to clipboard."));
  mount.querySelector("[data-reset]").addEventListener("click", () => {
    input.value = "";
    output.value = "";
    if (secondaryInput) secondaryInput.value = "";
    countStats("");
    saveDraft();
    setStatus("Cleared the current tool state.", "neutral");
  });
  mount.querySelector("[data-download]").addEventListener("click", () => {
    if (!output.value) {
      setStatus("Run the tool before downloading a result.", "error");
      return;
    }
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([output.value], { type: "text/plain;charset=utf-8" }));
    link.download = `${slug}-output.txt`;
    link.click();
    URL.revokeObjectURL(link.href);
    setStatus("Downloaded your processed output.", "success");
  });
  mount.querySelector("[data-load-example]").addEventListener("click", () => {
    input.value = examples[slug] || `Sample input for ${tool.name}`;
    if (secondaryInput && slug === "text-diff-checker") {
      secondaryInput.value = "first line\nsame line\nnew value";
    }
    saveDraft();
    setStatus("Loaded a sample so you can test the tool quickly.", "neutral");
  });
  mount.querySelector("[data-clear-draft]").addEventListener("click", () => {
    localStorage.removeItem(draftKey);
    setStatus("Saved draft removed for this tool.", "neutral");
  });

  fileInput.addEventListener("change", (event) => {
    const [file] = event.target.files || [];
    loadFile(file);
  });

  dropZone.addEventListener("dragover", (event) => {
    event.preventDefault();
    dropZone.classList.add("is-dragging");
  });
  dropZone.addEventListener("dragleave", () => {
    dropZone.classList.remove("is-dragging");
  });
  dropZone.addEventListener("drop", (event) => {
    event.preventDefault();
    dropZone.classList.remove("is-dragging");
    const [file] = event.dataTransfer.files || [];
    loadFile(file);
  });
  dropZone.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      fileInput.click();
    }
  });

  [input, secondaryInput, ...mount.querySelectorAll("[data-option]")].filter(Boolean).forEach((field) => {
    field.addEventListener("input", saveDraft);
    field.addEventListener("change", saveDraft);
  });

  loadDraft();
  countStats("");
})();


