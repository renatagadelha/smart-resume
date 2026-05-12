(function() {
    window.SR = window.SR || {};

    function getSearchableText(item) {
        return `
      ${item.role || ""}
      ${item.company || ""}
      ${item.location || ""}
      ${item.companyNationality || ""}
      ${(item.countries || []).join(" ")}
      ${(item.intro || []).join(" ")}
      ${(item.description || []).join(" ")}
      ${(item.skills || []).join(" ")}
      ${(item.tools || []).join(" ")}
      ${(item.tech || []).join(" ")}
      ${(item.specialization || []).join(" ")}
      ${(item.industry || []).join(" ")}
      ${(item.context || []).join(" ")}
      ${(item.roleType || []).join(" ")}
      ${item.employmentType || ""}
      ${item.workModel || ""}
      ${(item.impact || []).join(" ")}
      ${item.priority === 1 ? "primary priority-1" : ""}
      ${item.priority === 2 ? "secondary priority-2" : ""}
      ${item.priority === 3 ? "standard priority-3" : ""}
      ${item.isCurrent ? "current present" : ""}
    `.toLowerCase();
    }

    function filterExperiences(experiences, {
        searchTerm = "",
        smartFilter = "",
        companyParam = ""
    }) {
        const [filterGroup, filterValue] = smartFilter.split(":");

        return experiences.filter((item) => {
            if (!item._searchableText) {
                item._searchableText = getSearchableText(item);
            }

            const searchableText = item._searchableText;

            const matchesSearch = searchableText.includes(searchTerm);

            const matchesPriority =
                filterGroup !== "priority" ||
                Number(item.priority || 3) === Number(filterValue);

            const matchesSmartFilter = !smartFilter ||
                filterGroup === "priority" ||
                (Array.isArray(item[filterGroup]) && item[filterGroup].includes(filterValue));

            const companyKey = (item.company || "")
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-");

            const matchesCompany = !companyParam || companyKey.includes(companyParam);

            return matchesSearch && matchesSmartFilter && matchesPriority && matchesCompany;
        });
    }

    function sortExperiences(experiences, sortOrder) {
        return experiences.sort((a, b) => {
            const dateA = SR.utils.getEndDate(a);
            const dateB = SR.utils.getEndDate(b);

            if (sortOrder === "recent") {
                return dateB - dateA;
            }

            return dateA - dateB;
        });
    }

    SR.filters = {
        filterExperiences,
        sortExperiences,
        getSearchableText
    };
})();