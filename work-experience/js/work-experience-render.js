(function () {
  window.SR = window.SR || {};
  const {
    getEndDate,
    calculateUniqueMonths,
    formatTotalExperience,
    openDetails
  } = SR.utils;
  const { renderCard } = SR.components;

  function getExperiences() {
    return SR.data?.experiences || window.SRExperiences || [];
  }

  function updateResultsSummary(filtered, resultsSummary) {
    if (!resultsSummary) return;
    const totalMonths = calculateUniqueMonths(filtered);
    resultsSummary.innerHTML = `Showing <strong>${filtered.length}</strong> experience${filtered.length > 1 ? "s" : ""} · <strong>${formatTotalExperience(totalMonths)}</strong> total`;
  }

  function applyOpenState(context) {
    const { list, toggleAllButton, state } = context;
    if (!state.allDetailsOpen) return;
    requestAnimationFrame(() => {
      list.querySelectorAll(".sr-details").forEach(openDetails);
      list.querySelectorAll(".sr-toggle").forEach((button) => {
        const label = button.querySelector("span") || button;

        label.textContent = "Hide details";

        button.setAttribute("aria-expanded", "true");
      });
      if (toggleAllButton) {
        toggleAllButton.setAttribute("aria-label", "Hide all details");
        toggleAllButton.setAttribute("title", "Hide all details");
        toggleAllButton.innerHTML = SR.icons.hide;
      }
    });
  }

  function applyDeepLink(context, filtered) {
    const { list, params, state } = context;
    const openParam = SR.router.shouldOpenFromUrl();
    const companyParam = SR.router.getCompanyParam();
    if (!companyParam || !openParam || !filtered.length) return;
    requestAnimationFrame(() => {
      const target = list.querySelector(".sr-experience-item");
      const details = target?.querySelector(".sr-details");
      const button = target?.querySelector(".sr-toggle");
      if (details) SR.utils.openDetails(details);
      if (button) {
        const label = button.querySelector("span") || button;
        label.textContent = "Hide details";
      }
      state.allDetailsOpen = true;
      if (context.toggleAllButton) {
        context.toggleAllButton.innerHTML = SR.icons.hide;

        context.toggleAllButton.setAttribute(
          "aria-label",
          "Hide all details"
        );

        context.toggleAllButton.setAttribute(
          "title",
          "Hide all details"
        );
      }
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function renderExperiences(context) {
    const { list, searchInput, smartFilter, sortFilter, resultsSummary } = context;
  const state = SR.store.state;
  const searchTerm = SR.store.get("searchTerm");
  const sortOrder = SR.store.get("sortOrder");
  const companyParam = SR.router.getCompanyParam();
    const filtered = SR.filters.sortExperiences(
      SR.filters.filterExperiences(
        getExperiences(),
        {
          searchTerm,
          smartFilter: smartFilter.value,
          companyParam
        }
      ),
      sortOrder
    );
    state.currentFilteredExperiences = filtered;
    updateResultsSummary(filtered, resultsSummary);
    list.innerHTML = filtered.map(item => renderCard(item, searchTerm, state.allDetailsOpen)).join("");
    applyOpenState(context);
    applyDeepLink(context, filtered);
  }

  SR.render = { renderExperiences };
})();
