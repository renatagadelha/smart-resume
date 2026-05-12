(function () {
  window.SR = window.SR || {};

  function trackEvent(eventName, params = {}) {
    if (typeof window.gtag !== "function") return;

    window.gtag("event", eventName, {
      page_section: "work_experience",
      ...params
    });
  }

  SR.tracking = { trackEvent };
})();