# Smart Resume Interactive Timeline

![Interactive Work Experience Timeline](./preview.png)

A modular, portfolio-friendly example of an interactive, filterable, and trackable work experience timeline built with vanilla JavaScript.

This public version includes additional escaping and sanitization helpers designed to reduce HTML injection risks when rendering dynamic data with `innerHTML`.

- Demo: [Renata Gadelha Work Experience](https://renatagadelha.com/resume/work-experience/)

## Why this project exists
Traditional resumes are static and difficult to explore, especially for multidisciplinary professionals.

This project was built to experiment with better ways to navigate professional experience through filtering, semantic grouping, analytics, and customizable exports.

## What is included

- Smart semantic filters
- Search by keyword
- Responsive timeline UI
- Expandable experience details
- PDF export based on active filters
- Deep-link support
- GA4-compatible event wrapper
- Modular vanilla JavaScript architecture
- Generic placeholder data
- Safer HTML rendering helpers

## Architecture

The project follows a modular frontend architecture with separated concerns:

- Data layer
- Render layer
- Event system
- Store/state management
- Routing/deep-link handling
- Analytics wrapper
- PDF export layer
- Utility helpers

The goal was to keep the project framework-agnostic and highly portable.

## Files

```txt
functions-snippet.example.php
work-experience/
  css/
    work-experience.css
    work-experience-export.css
  images/
    logo-placeholder.svg
  js/
    work-experience-data.js
    work-experience-utils.js
    work-experience-store.js
    work-experience-filters.js
    work-experience-router.js
    work-experience-icons.js
    work-experience-components.js
    work-experience-render.js
    work-experience-export.js
    work-experience-tracking.js
    work-experience-events.js
    work-experience-main.js
```

## Features

- Semantic filtering system
- Expandable timeline cards
- Deep-link support
- PDF export
- Responsive-first layout
- Analytics-ready event tracking
- Vanilla JavaScript modular architecture
- Public-safe example dataset
- Safer HTML rendering helpers

## Security notes

The UI renderer uses `innerHTML` for performance and simplicity, so all user-controlled values should be escaped before DOM insertion.

This public version adds:

- `escapeHtml()` for text nodes
- `escapeAttribute()` for attribute values
- `safeUrl()` for links
- `safeImageUrl()` for images
- safer `highlight()` that escapes text before inserting `<mark>`

Avoid publishing:

- `wp-config.php`
- `.env` files
- SQL dumps
- paid plugins/themes
- private uploads
- API keys
- service account files
- admin-only snippets
- staging/private URLs
- real client-sensitive content

## WordPress installation

1. Copy the `work-experience` folder into your child theme.
2. Copy the contents of `functions-snippet.example.php` into your child theme `functions.php` or a snippets plugin.
3. Create a WordPress page with the slug `work-experience`.
4. Add this shortcode to the page:

```txt
[smart_resume]
```

5. Update `work-experience-data.js` with your own public-safe data.
6. Keep all fields plain text unless you intentionally support sanitized HTML.

## Data model example

```js
{
  role: "Senior Frontend Developer",
  company: "Example Health Agency",
  companyUrl: "https://example.com/",
  logo: "/wp-content/themes/astra-child/work-experience/images/logo-placeholder.svg",
  specialization: ["frontend", "email-crm"],
  industry: ["pharma", "marketing"],
  context: ["international", "remote"],
  roleType: ["technical", "leadership"],
  start: "2024-01",
  end: null,
  duration: "auto",
  location: "Remote",
  employmentType: "Full-time",
  workModel: "Remote",
  priority: 1,
  intro: ["Short public-safe summary."],
  description: ["Detailed public-safe responsibility."],
  impact: ["Public-safe impact statement."],
  tools: ["Figma"],
  tech: ["HTML", "CSS", "JavaScript"],
  skills: ["Frontend Development"],
  relatedPosts: []
}
```

## Recommended GitHub setup

```bash
git init
git add .
git commit -m "Add generic interactive work experience timeline"
git branch -M main
git remote add origin https://github.com/YOUR-USER/smart-resume-timeline.git
git push -u origin main
```

## Before publishing

Run a quick search for sensitive terms:

```bash
grep -RniE "name|client|password|secret|token|api_key|apikey|private|staging|wp-config|\.sql|\.env" .
```

Also check that there are no image source files or metadata folders:

```bash
find . -name "*.psd" -o -name ".DS_Store" -o -name "__MACOSX"
```

![Vanilla JS](https://img.shields.io/badge/Vanilla-JavaScript-yellow)
![Responsive](https://img.shields.io/badge/Responsive-Yes-pink)
![GA4 Ready](https://img.shields.io/badge/Analytics-GA4-purple)
![License](https://img.shields.io/badge/License-MIT-green)