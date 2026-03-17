(function () {
  const data = window.SiteData;
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

  function appPath(path) {
    return `${basePath}${path}`;
  }

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function renderPopularTools() {
    const mount = document.querySelector("[data-popular-tools]");
    if (!mount || !data) return;

    mount.innerHTML = data.tools
      .filter((tool) => tool.popular)
      .map(
        (tool) => `
          <a class="card" href="${appPath(`/tools/${tool.slug}/`)}">
            <div class="card-icon">${escapeHtml(tool.icon)}</div>
            <span class="card-tag">${escapeHtml(tool.category)}</span>
            <h3>${escapeHtml(tool.name)}</h3>
            <p>${escapeHtml(tool.description)}</p>
          </a>
        `
      )
      .join("");
  }

  function renderQuickTools() {
    const mount = document.querySelector("[data-quick-tools]");
    if (!mount || !data) return;

    mount.innerHTML = data.tools
      .slice(0, 6)
      .map((tool) => `<a href="${appPath(`/tools/${tool.slug}/`)}">${escapeHtml(tool.name)}</a>`)
      .join("");
  }

  function renderLatestArticles() {
    const mount = document.querySelector("[data-latest-articles]");
    if (!mount || !data) return;

    mount.innerHTML = data.articles
      .map(
        (article) => `
          <article class="article-card">
            <span class="card-tag">${escapeHtml(article.category)}</span>
            <h3><a href="${appPath(`/articles/${article.slug}/`)}">${escapeHtml(article.title)}</a></h3>
            <p>${escapeHtml(article.description)}</p>
            <div class="result-stats">
              <span>${escapeHtml(article.date)}</span>
              <span>${escapeHtml(article.readTime)}</span>
            </div>
          </article>
        `
      )
      .join("");
  }

  function setupTheme() {
    const button = document.querySelector("[data-theme-toggle]");
    const root = document.body;
    const saved = localStorage.getItem("adcs-theme");
    if (saved) {
      root.dataset.theme = saved;
    }

    if (!button) return;
    button.addEventListener("click", () => {
      const next = root.dataset.theme === "dark" ? "light" : "dark";
      root.dataset.theme = next;
      localStorage.setItem("adcs-theme", next);
    });
  }

  function setupNav() {
    const toggle = document.querySelector("[data-nav-toggle]");
    const nav = document.querySelector("[data-nav]");
    if (!toggle || !nav) return;
    toggle.addEventListener("click", () => {
      nav.classList.toggle("is-open");
    });
  }

  function setupDirectoryFiltering() {
    const input = document.querySelector("[data-tool-filter]");
    const cards = Array.from(document.querySelectorAll("[data-tool-card]"));
    if (!input || !cards.length) return;

    const apply = () => {
      const query = input.value.trim().toLowerCase();
      cards.forEach((card) => {
        const haystack = card.dataset.search || "";
        card.classList.toggle("hidden", Boolean(query) && !haystack.includes(query));
      });
    };

    const params = new URLSearchParams(window.location.search);
    if (params.get("q")) {
      input.value = params.get("q");
    }

    input.addEventListener("input", apply);
    apply();
  }

  renderPopularTools();
  renderQuickTools();
  renderLatestArticles();
  setupTheme();
  setupNav();
  setupDirectoryFiltering();
})();


