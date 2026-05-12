document.addEventListener("DOMContentLoaded", function () {
  window.SR = window.SR || {};

const context = {
  list: document.getElementById("srExperienceList"),
  searchInput: document.getElementById("srSearchInput"),
  smartFilter: document.getElementById("srSmartFilter"),
  sortFilter: document.getElementById("srSortFilter"),
  toggleAllButton: document.getElementById("srToggleAll"),
  clearFiltersButton: document.getElementById("srClearFilters"),
  resultsSummary: document.getElementById("srResultsSummary"),
  exportPdfButton: document.getElementById("srExportPdf"),
  state: SR.store.state
};

  if (!context.list) {
    console.warn("srExperienceList not found");
    return;
  }

  SR.store.set({
    searchTerm: context.searchInput.value.trim().toLowerCase(),
    smartFilter: context.smartFilter.value,
    sortOrder: context.sortFilter.value
  });

  SR.store.state.allDetailsOpen = false;

  SR.events.bind(context);
  SR.render.renderExperiences(context);
});