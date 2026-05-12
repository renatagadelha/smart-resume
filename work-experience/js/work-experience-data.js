window.SR = window.SR || {};

const Experiences = [
  {
    role: "Senior Frontend Developer",
    company: "Example Health Agency",
    companyUrl: "https://example.com/",
    logo: "/wp-content/themes/astra-child/work-experience/images/logo-placeholder.svg",
    specialization: ["frontend", "email-crm", "project-leadership"],
    industry: ["pharma", "marketing"],
    context: ["international", "remote"],
    roleType: ["technical", "leadership"],
    start: "2024-01",
    end: null,
    duration: "auto",
    location: "Remote",
    companyNationality: "International",
    countries: ["usa", "brazil", "canada"],
    employmentType: "Full-time",
    workModel: "Remote",
    isCurrent: true,
    priority: 1,
    impact: [
      "Led a small frontend team and supported cross-functional delivery.",
      "Improved reusable components for email, web, and campaign production.",
      "Created documentation to standardize development and QA processes."
    ],
    intro: [
      "Led frontend and CRM production initiatives in a regulated digital environment."
    ],
    description: [
      "Developed responsive digital assets using HTML, CSS, and JavaScript.",
      "Supported stakeholders across design, development, QA, and delivery workflows.",
      "Created technical documentation and reusable patterns to improve consistency."
    ],
    tools: ["Figma", "Litmus", "BrowserStack", "Project Management Tool"],
    tech: ["HTML", "CSS", "JavaScript"],
    skills: ["Frontend Development", "HTML Email", "Leadership", "Technical Documentation"],
    relatedPosts: [
      { label: "Case study placeholder", url: "https://example.com/case-study" }
    ]
  },
  {
    role: "UX/UI and Frontend Consultant",
    company: "Independent Studio",
    companyUrl: "https://example.org/",
    logo: "/wp-content/themes/astra-child/work-experience/images/logo-placeholder.svg",
    specialization: ["frontend", "ux-ui", "visual-design"],
    industry: ["technology", "marketing"],
    context: ["remote", "international"],
    roleType: ["technical", "creative"],
    start: "2020-03",
    end: null,
    duration: "auto",
    location: "Remote",
    companyNationality: "International",
    countries: ["brazil", "usa"],
    employmentType: "Freelance",
    workModel: "Remote",
    isCurrent: true,
    priority: 1,
    impact: [
      "Delivered digital interfaces for multiple clients and industries.",
      "Combined UX thinking, visual design, and frontend implementation."
    ],
    intro: [
      "Provided end-to-end frontend and UX/UI support for digital products and campaigns."
    ],
    description: [
      "Designed and developed responsive pages, landing pages, and email templates.",
      "Worked with clients to translate business goals into usable digital experiences.",
      "Applied accessibility, responsive design, and performance best practices."
    ],
    tools: ["Figma", "Adobe Photoshop", "WordPress"],
    tech: ["HTML", "CSS", "JavaScript", "WordPress"],
    skills: ["UX/UI Design", "Responsive Design", "Frontend Development"],
    relatedPosts: []
  },
  {
    role: "Digital Communications Analyst",
    company: "Example Consumer Brand",
    companyUrl: "https://example.net/",
    logo: "/wp-content/themes/astra-child/work-experience/images/logo-placeholder.svg",
    specialization: ["email-crm", "digital-strategy"],
    industry: ["marketing", "ecommerce"],
    context: ["latam", "remote"],
    roleType: ["technical"],
    start: "2018-08",
    end: "2020-12",
    duration: "auto",
    location: "Hybrid / Remote",
    companyNationality: "Regional",
    countries: ["brazil", "argentina", "mexico"],
    employmentType: "Full-time",
    workModel: "Hybrid",
    isCurrent: false,
    priority: 2,
    impact: [
      "Supported CRM campaigns across multiple markets.",
      "Helped align digital execution with business priorities."
    ],
    intro: [
      "Worked on CRM and digital communication initiatives for regional campaigns."
    ],
    description: [
      "Built and maintained HTML email assets and campaign pages.",
      "Collaborated with marketing and technology teams to support campaign delivery.",
      "Analyzed campaign requirements and translated them into digital deliverables."
    ],
    tools: ["CRM Platform", "Analytics Tool", "Project Management Tool"],
    tech: ["HTML", "CSS", "JavaScript"],
    skills: ["CRM", "Email Marketing", "Digital Strategy"],
    relatedPosts: []
  },
  {
    role: "Volunteer Event Support",
    company: "Example Arts Festival",
    companyUrl: "https://example.edu/",
    logo: "/wp-content/themes/astra-child/work-experience/images/logo-placeholder.svg",
    specialization: ["communication", "event-support"],
    industry: ["events", "education"],
    context: ["volunteering", "international"],
    roleType: ["support", "communication"],
    start: "2017-05",
    end: "2017-05",
    duration: "auto",
    location: "On-site",
    companyNationality: "International",
    countries: ["canada"],
    employmentType: "Volunteer",
    workModel: "On-site",
    isCurrent: false,
    priority: 3,
    impact: [
      "Supported event operations and attendee communication."
    ],
    intro: [
      "Supported an international cultural event with organization and public-facing communication."
    ],
    description: [
      "Assisted visitors, supported event flow, and helped maintain a positive attendee experience."
    ],
    tools: [],
    tech: [],
    skills: ["Communication", "Teamwork", "Event Operations"],
    relatedPosts: []
  }
];

Experiences.forEach(item => {
  ["tools", "tech", "skills", "industry", "specialization", "context", "roleType"].forEach(field => {
    if (Array.isArray(item[field])) item[field].sort((a, b) => a.localeCompare(b));
  });

  item.context = item.context || [];
  item.roleType = item.roleType || [];
  item.specialization = item.specialization || [];
  item.industry = item.industry || [];
  item.workModel = item.workModel || "";
  item.priority = Number(item.priority || 3);
  item.impact = item.impact || [];
  item.tools = item.tools || [];
  item.tech = item.tech || [];
  item.skills = item.skills || [];
  item.relatedPosts = item.relatedPosts || [];
});

SR.data = SR.data || {};
SR.data.experiences = Experiences;
