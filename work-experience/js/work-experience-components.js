(function () {
  window.SR = window.SR || {};

  const {
    hasItems,
    highlight,
    escapeHtml,
    safeUrl,
    safeImageUrl,
    formatMonthYear,
    calculateDuration
  } = SR.utils;

  function componentLogo(item) {
    const logo = safeImageUrl(item.logo);
    const alt = escapeHtml(item.company || "Company logo");
    const companyUrl = item.companyUrl ? safeUrl(item.companyUrl) : "";

    return `
      <div class="sr-experience-logo">
        ${
          companyUrl
            ? `
              <a
                class="sr-company-link sr-logo-inner"
                href="${companyUrl}"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="${logo}" alt="${alt}">
              </a>
            `
            : `
              <div class="sr-logo-inner">
                <img src="${logo}" alt="${alt}">
              </div>
            `
        }
      </div>
    `;
  }

  function componentBadges(item) {
    return `
      <div class="sr-badges">
        ${item.employmentType ? `<span class="sr-type">${escapeHtml(item.employmentType)}</span>` : ""}
        ${item.workModel ? `<span class="sr-work-model">${escapeHtml(item.workModel)}</span>` : ""}
        ${
          item.priority === 1
            ? `<span class="sr-featured">Primary</span>`
            : item.priority === 2
              ? `<span class="sr-featured sr-featured-secondary">Secondary</span>`
              : ""
        }
      </div>
    `;
  }

  function componentRequiredList(className, items = [], fallbackText, searchTerm = "") {
    const safeItems = hasItems(items) ? items : [fallbackText];
    return `<div class="${className}"><ul>${safeItems.map(item => `<li>${highlight(item, searchTerm)}</li>`).join("")}</ul></div>`;
  }

  function componentRequiredDescription(description, searchTerm = "") {
    if (Array.isArray(description) && description.length) {
      return `<div class="sr-description"><ul>${description.map(item => `<li>${highlight(item, searchTerm)}</li>`).join("")}</ul></div>`;
    }

    if (typeof description === "string" && description.trim()) {
      return `<div class="sr-description"><p>${highlight(description, searchTerm)}</p></div>`;
    }

    return `<div class="sr-description sr-missing"><p>Description pending.</p></div>`;
  }

  function componentImpact(items = [], searchTerm = "") {
    if (!hasItems(items)) return "";
    return `<div class="sr-impact"><strong>Impact:</strong><ul>${items.map(item => `<li>${highlight(item, searchTerm)}</li>`).join("")}</ul></div>`;
  }

  function componentTags(className, title, items = [], searchTerm = "") {
    if (!hasItems(items)) return "";
    return `<div class="${className}"><strong>${escapeHtml(title)}:</strong>${items.map(item => `<span>${highlight(item, searchTerm)}</span>`).join("")}</div>`;
  }

  function componentRelatedPosts(posts = []) {
    if (!hasItems(posts)) return "";

    return `<div class="sr-related-posts"><strong>Related posts:</strong>${posts.map(post => {
      const label = escapeHtml(post.label || "Related post");
      const url = safeUrl(post.url || "#");
      return `<a href="${url}" target="_blank" rel="noopener noreferrer">${label}</a>`;
    }).join("")}</div>`;
  }

  function renderCard(item, searchTerm = "", allDetailsOpen = false, mode = "default") {
    const duration = item.duration === "auto" || !item.duration ? calculateDuration(item.start, item.end) : escapeHtml(item.duration);
    const startLabel = formatMonthYear(item.start);
    const endLabel = formatMonthYear(item.end);
    const isPdf = mode === "pdf";

    const showDetailsContent = !isPdf || item.priority === 1 || item.priority === 2;

    const shouldRenderDetails =
      showDetailsContent &&
      (
        hasItems(item.description) ||
        hasItems(item.impact) ||
        hasItems(item.skills) ||
        hasItems(item.tools) ||
        hasItems(item.tech)
      );

    const shouldRenderToggle = !isPdf && (
      hasItems(item.description) ||
      hasItems(item.impact) ||
      hasItems(item.skills) ||
      hasItems(item.tools) ||
      hasItems(item.tech)
    );

    const companyUrl = item.companyUrl ? safeUrl(item.companyUrl) : "";
    const role = highlight(item.role, searchTerm);
    const company = highlight(item.company, searchTerm);
    const location = escapeHtml(item.location || "");

    return `<article class="sr-experience-item">
      <div class="sr-desktop-logo">
        ${componentLogo(item)}
      </div>
      <div class="sr-experience-content">
        <div class="sr-mobile-logo">
          ${componentLogo(item)}
        </div>
        <div class="sr-experience-header">
          <div>
            <h2>${role}</h2>
            <h3>${companyUrl ? `<a class="sr-company-link" href="${companyUrl}" target="_blank" rel="noopener noreferrer">${company}</a>` : company}</h3>
            <div>
              <p class="sr-experience-meta">${startLabel} – ${endLabel} · ${duration}</p>
              <p class="sr-experience-location">${location}</p>
            </div>
          </div>
          ${componentBadges(item)}
        </div>
        ${componentRequiredList("sr-intro", item.intro, "Summary pending.", searchTerm)}
        ${
          shouldRenderDetails
            ? `
              <div class="sr-details ${allDetailsOpen ?"sr-open" : ""}">
                ${componentRequiredDescription(item.description, searchTerm)}
                ${componentImpact(item.impact, searchTerm)}
                ${!isPdf ? componentTags("sr-skills", "Skills", item.skills, searchTerm) : ""}
                ${!isPdf ? componentTags("sr-tools", "Tools", item.tools, searchTerm) : ""}
                ${!isPdf ? componentTags("sr-tech", "Tech", item.tech, searchTerm) : ""}
              </div>
              ${!isPdf ? componentRelatedPosts(item.relatedPosts) : ""}
            `
            : ""
        }
        ${
          shouldRenderToggle
            ? `
              <button class="sr-toggle" type="button" aria-expanded="${allDetailsOpen}">
                <span>${allDetailsOpen ? "Hide details" : "Show details"}</span>
              </button>
            `
            : ""
        }
      </div>
    </article>`;
  }

  SR.components = { renderCard };
})();
