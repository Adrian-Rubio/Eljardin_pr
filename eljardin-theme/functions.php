<?php
/**
 * El Jardín de Arturo Soria — functions.php
 * Registra CPTs, taxonomías, menus, scripts y estilos.
 */

// ─────────────────────────────────────────────
// 1. SOPORTE DEL TEMA
// ─────────────────────────────────────────────
function eljardin_theme_setup() {
    add_theme_support( 'post-thumbnails' );
    add_theme_support( 'title-tag' );
    add_theme_support( 'html5', [ 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption' ] );

    register_nav_menus( [
        'primary' => __( 'Menú principal', 'eljardin' ),
    ] );
}
add_action( 'after_setup_theme', 'eljardin_theme_setup' );


// ─────────────────────────────────────────────
// 2. ENQUEUE SCRIPTS Y ESTILOS
// ─────────────────────────────────────────────
function eljardin_enqueue_assets() {
    $uri = get_template_directory_uri();
    $v   = '1.0.0';

    // CSS principal
    wp_enqueue_style( 'eljardin-main',       $uri . '/assets/css/main.css',       [], $v );
    wp_enqueue_style( 'eljardin-animations', $uri . '/assets/css/animations.css', [ 'eljardin-main' ], $v );

    // CSS por página
    if ( is_page( 'reservas' ) || is_page( 'reservations' ) ) {
        wp_enqueue_style( 'eljardin-reservations', $uri . '/assets/css/reservations.css', [ 'eljardin-main' ], $v );
    }
    if ( is_page( 'el-jardin' ) || is_page( 'jardin-experience' ) ) {
        wp_enqueue_style( 'eljardin-experience', $uri . '/assets/css/jardin-experience.css', [ 'eljardin-main' ], $v );
    }

    // JS — diferido para no bloquear render
    wp_enqueue_script( 'eljardin-mobile-menu',      $uri . '/assets/js/mobile-menu.js',      [], $v, true );
    wp_enqueue_script( 'eljardin-navbar-dropdown',  $uri . '/assets/js/navbar-dropdown.js',  [], $v, true );
    wp_enqueue_script( 'eljardin-faq-accordion',    $uri . '/assets/js/faq-accordion.js',    [], $v, true );

    if ( is_front_page() ) {
        wp_enqueue_script( 'eljardin-hero-carousel',   $uri . '/assets/js/hero-carousel.js',   [], $v, true );
        wp_enqueue_script( 'eljardin-dish-gallery',    $uri . '/assets/js/dish-gallery.js',    [], $v, true );
        wp_enqueue_script( 'eljardin-espacios',        $uri . '/assets/js/espacios-carousel.js', [], $v, true );
    }

    if ( is_page( 'carta' ) || is_page( 'vinos' ) ) {
        wp_enqueue_script( 'eljardin-menu-accordion', $uri . '/assets/js/menu-accordion.js', [], $v, true );
    }
}
add_action( 'wp_enqueue_scripts', 'eljardin_enqueue_assets' );

// Inyectar background-image del body con ruta dinámica
function eljardin_inline_body_bg() {
    $floral = get_template_directory_uri() . '/images/floral-bg.png';
    $css = "body {
        background-image: linear-gradient(rgba(255,255,255,0.92),rgba(255,255,255,0.92)), url('{$floral}');
    }";
    wp_add_inline_style( 'eljardin-main', $css );
}
add_action( 'wp_enqueue_scripts', 'eljardin_inline_body_bg' );


// ─────────────────────────────────────────────
// 3. CUSTOM POST TYPE: menu_item
// ─────────────────────────────────────────────
function eljardin_register_cpts() {
    register_post_type( 'menu_item', [
        'labels' => [
            'name'               => 'Platos',
            'singular_name'      => 'Plato',
            'add_new_item'       => 'Añadir plato',
            'edit_item'          => 'Editar plato',
            'new_item'           => 'Nuevo plato',
            'view_item'          => 'Ver plato',
            'search_items'       => 'Buscar platos',
            'not_found'          => 'No se encontraron platos',
            'not_found_in_trash' => 'No hay platos en la papelera',
        ],
        'public'       => true,
        'show_in_menu' => true,
        'menu_icon'    => 'dashicons-food',
        'has_archive'  => false,
        'supports'     => [ 'title', 'editor', 'thumbnail' ],
        'rewrite'      => [ 'slug' => 'plato' ],
    ] );
}
add_action( 'init', 'eljardin_register_cpts' );


// ─────────────────────────────────────────────
// 4. TAXONOMÍA: menu_type (carta / vinos)
// ─────────────────────────────────────────────
function eljardin_register_taxonomies() {
    register_taxonomy( 'menu_type', 'menu_item', [
        'labels' => [
            'name'          => 'Tipo de menú',
            'singular_name' => 'Tipo de menú',
            'all_items'     => 'Todos los tipos',
            'edit_item'     => 'Editar tipo',
            'add_new_item'  => 'Añadir tipo',
        ],
        'public'       => true,
        'hierarchical' => false,
        'rewrite'      => [ 'slug' => 'tipo-menu' ],
        'show_in_menu' => true,
    ] );
}
add_action( 'init', 'eljardin_register_taxonomies' );


// ─────────────────────────────────────────────
// 5. HELPER: obtener configuración del tema
//    Equivalente a SiteConfig / EditableText
// ─────────────────────────────────────────────
function eljardin_config( string $key, string $default = '' ): string {
    return esc_html( get_theme_mod( 'eljardin_' . $key, $default ) );
}


// ─────────────────────────────────────────────
// 6. CUSTOMIZER — opciones del sitio
// ─────────────────────────────────────────────
function eljardin_customizer( WP_Customize_Manager $wp_customize ) {
    $wp_customize->add_section( 'eljardin_info', [
        'title'    => 'El Jardín — Información del restaurante',
        'priority' => 30,
    ] );

    $fields = [
        'phone'             => [ 'Teléfono',           '+34 91 XXX XX XX' ],
        'reservation_email' => [ 'Email de reservas',  'reservas@eljardindearturosoria.com' ],
        'address'           => [ 'Dirección',           'C/ Arturo Soria 130, Madrid' ],
        'hours'             => [ 'Horario',             'L-D 13:00–00:00' ],
        'garden_text_title' => [ 'Título sección jardín', 'Un Jardín oculto dentro de Madrid' ],
        'garden_text_p'     => [ 'Texto sección jardín',  'A través de una cocina tradicional...' ],
        'faq_title'         => [ 'Título FAQ',          "FAQ'S" ],
        'faq_subtitle'      => [ 'Subtítulo FAQ',       'Respuestas a tus dudas más comunes.' ],
    ];

    foreach ( $fields as $key => [ $label, $default ] ) {
        $setting_id = 'eljardin_' . $key;
        $wp_customize->add_setting( $setting_id, [
            'default'           => $default,
            'sanitize_callback' => 'sanitize_text_field',
        ] );
        $wp_customize->add_control( $setting_id, [
            'label'   => $label,
            'section' => 'eljardin_info',
            'type'    => 'text',
        ] );
    }

    // FAQ respuestas
    for ( $i = 0; $i < 10; $i++ ) {
        $wp_customize->add_setting( "eljardin_faq_answer_{$i}", [
            'default'           => '',
            'sanitize_callback' => 'sanitize_textarea_field',
        ] );
        $wp_customize->add_control( "eljardin_faq_answer_{$i}", [
            'label'   => "Respuesta FAQ #" . ( $i + 1 ),
            'section' => 'eljardin_info',
            'type'    => 'textarea',
        ] );
    }
}
add_action( 'customize_register', 'eljardin_customizer' );
