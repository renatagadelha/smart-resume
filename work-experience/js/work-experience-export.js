(function () {
  window.SR = window.SR || {};

  function exportFilteredPdf(context) {
    const resultsSummary = context.resultsSummary;
    const state = SR.store.state;
    const { renderCard } = SR.components;
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    const content = state.currentFilteredExperiences
    .map(item => renderCard(item, "", true, "pdf"))
    .join("");
    printWindow.document.write(`
      <html>
        <head>
          <title>Interactive Work Experience - Filtered Export</title>
          <link rel="stylesheet" href="/wp-content/themes/astra-child/work-experience/css/work-experience.css">
          <link rel="stylesheet" href="/wp-content/themes/astra-child/work-experience/css/work-experience-export.css">
        </head>
        <body>
          <div class="sr-header">
            <h1>Your Name</h1>
            <h2>Your Professional Headline</h2>
            <p>Your Location · Work model · Focus area</p>
          </div>
          <div class="sr-filter">
            <h3>Filtered Work Experience</h3>
            <p>${resultsSummary ? resultsSummary.innerText : ""}</p>
          </div>
          <section class="sr-work-experience">
            <div class="sr-timeline">
              ${content}
            </div>
          </section>
        </body>
      </html>`);
      
    printWindow.document.close();

    printWindow.onload = function () {
      printWindow.focus();

      setTimeout(() => {
        printWindow.print();
      }, 300);
    };
  }

  SR.export = { exportFilteredPdf };
})();
