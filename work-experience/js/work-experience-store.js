(function () {
  window.SR = window.SR || {};

  const state = {
    currentFilteredExperiences: [],
    allDetailsOpen: false,
    searchTerm: "",
    smartFilter: "",
    sortOrder: "recent"
  };

  function set(updates = {}) {
    Object.assign(state, updates);
  }

  function get(key) {
    return key ? state[key] : state;
  }

  SR.store = { state, set, get };
})();