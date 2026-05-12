(function () {
  window.SR = window.SR || {};

  const hasItems = (items) => Array.isArray(items) && items.length > 0;

  function escapeHtml(value = "") {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function escapeAttribute(value = "") {
    return escapeHtml(value).replace(/`/g, "&#96;");
  }

  function escapeRegExp(value = "") {
    return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function safeUrl(value = "", fallback = "#") {
    const raw = String(value || "").trim();
    if (!raw) return fallback;

    try {
      const url = new URL(raw, window.location.origin);
      const allowedProtocols = ["http:", "https:", "mailto:"];
      if (!allowedProtocols.includes(url.protocol)) return fallback;
      return escapeAttribute(url.href);
    } catch (error) {
      return fallback;
    }
  }

  function safeImageUrl(value = "", fallback = "/wp-content/themes/astra-child/work-experience/images/logo-placeholder.svg") {
    const raw = String(value || "").trim();
    if (!raw) return fallback;

    try {
      const url = new URL(raw, window.location.origin);
      const allowedProtocols = ["http:", "https:"];
      if (!allowedProtocols.includes(url.protocol)) return fallback;
      return escapeAttribute(url.href);
    } catch (error) {
      // Allow root-relative or relative theme paths, but block script/data URLs.
      if (/^(\/|\.\/|\.\.\/)?[a-z0-9_\-/]+\.(png|jpg|jpeg|gif|webp|svg)$/i.test(raw)) {
        return escapeAttribute(raw);
      }
      return fallback;
    }
  }

  function highlight(text = "", search = "") {
    const escapedText = escapeHtml(text);
    if (!search) return escapedText;

    const safeSearch = escapeRegExp(search.trim());
    if (!safeSearch) return escapedText;

    const regex = new RegExp(`(${safeSearch})`, "gi");
    return escapedText.replace(regex, "<mark>$1</mark>");
  }

  function formatMonthYear(dateString) {
    if (!dateString || dateString === "Present") return "Present";
    const [year, month] = String(dateString).split("-");
    const date = new Date(Number(year), Number(month) - 1);
    if (isNaN(date)) return escapeHtml(dateString);
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  }

  function calculateDuration(start, end) {
    const startDate = new Date(`${start}-01`);
    const endDate = !end || end === "Present" ? new Date() : new Date(`${end}-01`);
    if (isNaN(startDate) || isNaN(endDate)) return "";

    const months =
      (endDate.getFullYear() - startDate.getFullYear()) * 12 +
      (endDate.getMonth() - startDate.getMonth()) +
      1;

    if (months < 0) return "";
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    if (years > 0 && remainingMonths > 0) return `${years} year${years > 1 ? "s" : ""} ${remainingMonths} month${remainingMonths > 1 ? "s" : ""}`;
    if (years > 0) return `${years} year${years > 1 ? "s" : ""}`;
    return `${months} month${months > 1 ? "s" : ""}`;
  }

  function getEndDate(item) {
    if (!item.end || item.end === "Present") return new Date();
    return new Date(`${item.end}-01`);
  }

  function calculateUniqueMonths(experiences = []) {
    const monthsSet = new Set();

    experiences.forEach((item) => {
      const start = new Date(`${item.start}-01`);
      const end = !item.end || item.end === "Present" ? new Date() : new Date(`${item.end}-01`);
      if (isNaN(start) || isNaN(end)) return;

      let currentYear = start.getFullYear();
      let currentMonth = start.getMonth();
      const endYear = end.getFullYear();
      const endMonth = end.getMonth();

      while (currentYear < endYear || (currentYear === endYear && currentMonth <= endMonth)) {
        monthsSet.add(`${currentYear}-${currentMonth}`);
        currentMonth++;
        if (currentMonth > 11) {
          currentMonth = 0;
          currentYear++;
        }
      }
    });

    return monthsSet.size;
  }

  function formatTotalExperience(totalMonths) {
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;
    if (years && months) return `${years} yrs ${months} mos`;
    if (years) return `${years} yrs`;
    return `${months} mos`;
  }

  function openDetails(details) {
    if (!details) return;

    details.classList.add("sr-open");
    details.style.height = "0px";

    requestAnimationFrame(() => {
      details.style.height = `${details.scrollHeight}px`;
    });

    details.addEventListener(
      "transitionend",
      function handler(e) {
        if (e.propertyName !== "height") return;
        if (details.classList.contains("sr-open")) details.style.height = "auto";
        details.removeEventListener("transitionend", handler);
      }
    );
  }

  function closeDetails(details) {
    if (!details) return;

    if (!details.classList.contains("sr-open")) {
      details.style.height = "0px";
      return;
    }

    details.style.height = `${details.scrollHeight}px`;

    requestAnimationFrame(() => {
      details.classList.remove("sr-open");
      details.style.height = "0px";
    });
  }

  function toggleDetails(details) {
    if (!details) return;
    details.classList.contains("sr-open") ? closeDetails(details) : openDetails(details);
  }

  SR.utils = {
    hasItems,
    escapeHtml,
    escapeAttribute,
    safeUrl,
    safeImageUrl,
    highlight,
    formatMonthYear,
    calculateDuration,
    getEndDate,
    calculateUniqueMonths,
    formatTotalExperience,
    openDetails,
    closeDetails,
    toggleDetails
  };
})();
