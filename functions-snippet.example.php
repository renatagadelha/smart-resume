<?php
/**
 * Example WordPress snippet for the Smart Resume interactive timeline module.
 *
 * Security notes:
 * - This snippet only registers frontend assets and a shortcode.
 * - It does not expose AJAX endpoints, secrets, admin hooks, or private paths.
 * - Keep real credentials, wp-config.php, .env files, paid plugins, and private uploads out of Git.
 */

add_action('wp_enqueue_scripts', function () {
    wp_enqueue_style('astra-parent-style', get_template_directory_uri() . '/style.css');
});

function smart_resume_shortcode() {
    ob_start();
    ?>
    <section class="sr-work-experience">
        <div class="sr-experience-filters">
            <div class="sr-filter-search">
                <input type="text" id="srSearchInput" placeholder="Search by keyword, company, tool...">
            </div>

            <div class="sr-filter-selects">
                <select id="srSmartFilter">
                    <option value="">All experiences</option>

                    <optgroup label="Priority">
                        <option value="priority:1">Primary highlights</option>
                        <option value="priority:2">Secondary highlights</option>
                        <option value="priority:3">All other experience</option>
                    </optgroup>

                    <optgroup label="Specialization">
                        <option value="specialization:frontend">Frontend Development</option>
                        <option value="specialization:email-crm">Email Marketing / CRM</option>
                        <option value="specialization:ux-ui">UX/UI Design</option>
                        <option value="specialization:visual-design">Visual / Graphic Design</option>
                        <option value="specialization:project-leadership">Project / Leadership</option>
                        <option value="specialization:communication">Communication</option>
                    </optgroup>

                    <optgroup label="Industry">
                        <option value="industry:pharma">Pharma</option>
                        <option value="industry:marketing">Marketing</option>
                        <option value="industry:technology">Technology</option>
                        <option value="industry:ecommerce">E-commerce</option>
                        <option value="industry:education">Education</option>
                        <option value="industry:events">Events</option>
                    </optgroup>

                    <optgroup label="Context">
                        <option value="context:international">International</option>
                        <option value="context:remote">Remote</option>
                        <option value="context:latam">LATAM</option>
                        <option value="context:volunteering">Volunteering</option>
                        <option value="context:production">Production</option>
                        <option value="context:academic">Academic</option>
                    </optgroup>
                </select>

                <select id="srSortFilter">
                    <option value="recent">Most recent</option>
                    <option value="oldest">Oldest first</option>
                </select>
            </div>

            <div class="sr-filter-buttons">
                <button type="button" id="srToggleAll" class="sr-toggle-all-button" aria-label="Show all details" title="Show all details"></button>
                <button type="button" id="srExportPdf" class="sr-icon-button" aria-label="Download PDF" title="Download PDF">PDF</button>
                <button type="button" id="srClearFilters" class="sr-icon-button" aria-label="Clear filters" title="Clear filters">Clear</button>
            </div>
        </div>

        <div id="srResultsSummary" class="sr-results-summary"></div>
        <div class="sr-timeline" id="srExperienceList"></div>
    </section>
    <?php
    return ob_get_clean();
}
add_shortcode('smart_resume', 'smart_resume_shortcode');

function smart_resume_assets() {
    if (!is_page('work-experience')) {
        return;
    }

    $theme_uri  = get_stylesheet_directory_uri();
    $theme_path = get_stylesheet_directory();

    $css_file = '/work-experience/css/work-experience.css';

    wp_enqueue_style(
        'smart-resume-css',
        $theme_uri . $css_file,
        array(),
        file_exists($theme_path . $css_file) ? filemtime($theme_path . $css_file) : '1.0'
    );

    $js_uri  = $theme_uri . '/work-experience/js/';
    $js_path = $theme_path . '/work-experience/js/';

    $scripts = array(
        'data' => array(),
        'utils' => array('smart-resume-data'),
        'store' => array('smart-resume-utils'),
        'filters' => array('smart-resume-store'),
        'router' => array('smart-resume-filters'),
        'icons' => array('smart-resume-router'),
        'components' => array('smart-resume-utils'),
        'render' => array(
            'smart-resume-components',
            'smart-resume-store',
            'smart-resume-filters',
            'smart-resume-router'
        ),
        'export' => array('smart-resume-render'),
        'tracking' => array('smart-resume-export'),
        'events' => array(
            'smart-resume-render',
            'smart-resume-store',
            'smart-resume-tracking',
            'smart-resume-export',
            'smart-resume-icons'
        ),
        'main' => array(
            'smart-resume-icons',
            'smart-resume-data',
            'smart-resume-utils',
            'smart-resume-store',
            'smart-resume-filters',
            'smart-resume-router',
            'smart-resume-components',
            'smart-resume-render',
            'smart-resume-export',
            'smart-resume-tracking',
            'smart-resume-events'
        ),
    );

    foreach ($scripts as $name => $deps) {
        $handle = 'smart-resume-' . $name;
        $file   = 'work-experience-' . $name . '.js';
        $path   = $js_path . $file;

        wp_enqueue_script(
            $handle,
            $js_uri . $file,
            $deps,
            file_exists($path) ? filemtime($path) : '1.0',
            true
        );
    }
}
add_action('wp_enqueue_scripts', 'smart_resume_assets');
