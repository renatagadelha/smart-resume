(function () {
  window.SR = window.SR || {};

  function getParams() {
    return new URLSearchParams(window.location.search);
  }

  function getCompanyParam() {
    return getParams().get("company")?.toLowerCase() || "";
  }

  function shouldOpenFromUrl() {
    return getParams().get("sr-open") === "true";
  }

  SR.router = {
    getParams,
    getCompanyParam,
    shouldOpenFromUrl
  };
})();