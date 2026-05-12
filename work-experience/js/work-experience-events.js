(function () {
  window.SR = window.SR || {};

  function bind(context) {
    let searchTimeout;
    let lastSearch = "";

    function renderWithLoading() {
      context.list.classList.add("sr-is-loading");

      requestAnimationFrame(() => {
        SR.render.renderExperiences(context);

        setTimeout(() => {
          context.list.classList.remove("sr-is-loading");
        }, 180);
      });
    }

    context.searchInput.addEventListener("input", () => {
      clearTimeout(searchTimeout);

      searchTimeout = setTimeout(() => {
        const term = context.searchInput.value.trim().toLowerCase();

        SR.store.set({ searchTerm: term });
        renderWithLoading();

        const shortAllowedTerms = ["lg", "ux", "ui", "qa", "us"];

        if (
          (term.length >= 3 || shortAllowedTerms.includes(term)) &&
          term !== lastSearch
        ) {
          lastSearch = term;

          SR.tracking?.trackEvent("work_search", {
            term,
            results: SR.store.get("currentFilteredExperiences").length
          });
        }
      }, 200);
    });

    context.smartFilter.addEventListener("change", () => {
      const value = context.smartFilter.value;
      const [group, filter] = value.split(":");

      SR.store.set({ smartFilter: value });
      renderWithLoading();

      SR.tracking?.trackEvent("work_filter", {
        group: group || "all",
        filter: filter || "all",
        results: SR.store.get("currentFilteredExperiences").length
      });
    });

    context.sortFilter.addEventListener("change", () => {
      SR.store.set({ sortOrder: context.sortFilter.value });

      renderWithLoading();

      SR.tracking?.trackEvent("work_sort", {
        sort: context.sortFilter.value,
        results: SR.store.get("currentFilteredExperiences").length
      });
    });

    if (context.exportPdfButton) {
      context.exportPdfButton.addEventListener("click", (event) => {
        event.currentTarget.blur();

        SR.export.exportFilteredPdf(context);

        SR.tracking?.trackEvent("work_pdf", {
          results: SR.store.get("currentFilteredExperiences").length,
          filter: context.smartFilter.value || "all"
        });
      });
    }

    document.addEventListener("mouseover", function (e) {
      const logo = e.target.closest(".sr-experience-logo");

      if (!logo || logo.classList.contains("sr-animating")) return;

      logo.classList.add("sr-animating", "sr-active");

      setTimeout(() => logo.classList.remove("sr-active"), 600);
      setTimeout(() => logo.classList.remove("sr-animating"), 1200);
    });

    if (context.toggleAllButton) {
      context.toggleAllButton.addEventListener("click", function (event) {
        event.currentTarget.blur();

        const state = SR.store.state;

        SR.store.state.allDetailsOpen = !SR.store.state.allDetailsOpen;

        context.toggleAllButton.innerHTML =
          SR.store.state.allDetailsOpen
            ? SR.icons.hide
            : SR.icons.show;

        context.list.querySelectorAll(".sr-details").forEach((details) => {
          SR.store.state.allDetailsOpen
            ? SR.utils.openDetails(details)
            : SR.utils.closeDetails(details);
        });

        context.list.querySelectorAll(".sr-toggle").forEach((button) => {
          const label = button.querySelector("span") || button;

          label.textContent = SR.store.state.allDetailsOpen
            ? "Hide details"
            : "Show details";

          button.setAttribute(
            "aria-expanded",
            String(SR.store.state.allDetailsOpen)
          );
        });
      });

      context.toggleAllButton.innerHTML = SR.store.state.allDetailsOpen
        ? SR.icons.hide
        : SR.icons.show;

      context.toggleAllButton.setAttribute(
        "aria-label",
        SR.store.state.allDetailsOpen
          ? "Hide all details"
          : "Show all details"
      );

      context.toggleAllButton.setAttribute(
        "title",
        SR.store.state.allDetailsOpen
          ? "Hide all details"
          : "Show all details"
      );
    }

    context.list.addEventListener("click", function (e) {
      const toggleButton = e.target.closest(".sr-toggle");

      if (!toggleButton) return;

      const card = toggleButton.closest(".sr-experience-content");
      const details = card?.querySelector(".sr-details");

      if (!details) return;

      const willOpen = !details.classList.contains("sr-open");

      willOpen
        ? SR.utils.openDetails(details)
        : SR.utils.closeDetails(details);

      const label = toggleButton.querySelector("span") || toggleButton;

      label.textContent = willOpen
        ? "Hide details"
        : "Show details";

      toggleButton.setAttribute(
        "aria-expanded",
        String(willOpen)
      );

      toggleButton.blur();

SR.store.state.allDetailsOpen = false;

if (context.toggleAllButton) {
  context.toggleAllButton.innerHTML = SR.icons.show;
  context.toggleAllButton.setAttribute("aria-label", "Show all details");
  context.toggleAllButton.setAttribute("title", "Show all details");
}
    });

    if (context.clearFiltersButton) {
      context.clearFiltersButton.addEventListener("click", (event) => {
        event.currentTarget.blur();

        context.searchInput.value = "";
        context.smartFilter.value = "";
        context.sortFilter.value = "recent";
        context.toggleAllButton.innerHTML = SR.icons.show;

        context.toggleAllButton.setAttribute(
          "aria-label",
          "Show all details"
        );

        context.toggleAllButton.setAttribute(
          "title",
          "Show all details"
        );

        SR.store.set({
          searchTerm: "",
          smartFilter: "",
          sortOrder: "recent",
          allDetailsOpen: false
        });

        SR.render.renderExperiences(context);
      });
    }

  }

  SR.events = { bind };
})();