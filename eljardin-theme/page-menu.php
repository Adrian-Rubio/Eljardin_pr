<?php
/**
 * Template Name: Menú (Carta / Vinos)
 *
 * page-menu.php — El Jardín de Arturo Soria
 * Página de menú (carta y vinos). Detecta el slug de la página actual.
 * Equivale a Menu.jsx.
 *
 * Uso: crear páginas WP con slug "carta" y "vinos", asignar esta plantilla.
 */

$uri      = get_template_directory_uri();
$slug     = get_queried_object()->post_name ?? 'carta';
$is_vinos = ( $slug === 'vinos' );

// Categorías de vinos para filtrar
$vinos_keywords = [ 'TINTOS', 'DOP RIBERA', 'BLANCOS', 'ROSADOS', 'CAVAS', 'VINOS GENEROSOS', 'VARIOS' ];

$preferred_order = [
    // Carta
    'BOCADOS PARA EMPEZAR',
    'PAN Y APERITIVO',
    'NUESTROS ARROCES PARA COMPARTIR',
    'ALMA CARNÍVORA',
    'ALMA MARINERA',
    'GUARNICIONES',
    'ALMA PASTELERA',
    // Vinos
    'TINTOS DOP MADRID Y SIERRA DE GREDOS',
    'TINTOS DOP RIBERA SACRA',
    'TINTOS VT EXTREMADURA',
    'TINTOS DOVT CÁDIZ',
    'TINTOS DOCA PRIORAT',
    'TINTOS DOCA RIOJA',
    'DOP RIBERA DEL DUERO',
    'TINTOS VT CASTILLA Y LEÓN',
    'TINTOS DO SOMONTANO',
    'BLANCOS. DO RUEDA',
    'BLANCOS VT TIERRA DE CASTILLA-LEÓN',
    'BLANCOS DO RÍAS BAIXAS',
    'BLANCOS DO BIERZO',
    'BLANCOS D.O. MONTERREI',
    'BLANCOS DO RIOJA',
    'ROSADOS VT CASTILLA-LEÓN',
    'CAVAS Y CHAMPAGNES',
    'VINOS GENEROSOS Y DULCES (POR COPA)',
    'VARIOS',
];

$allergen_icons = [
    'Gluten'                          => 'simbolo-alergeno-cereales.png',
    'Lácteos'                         => 'simbolo-alergeno-lacteos.png',
    'Huevos'                          => 'simbolo-alergeno-huevos.png',
    'Soja'                            => 'simbolo-alergeno-soja.png',
    'Mostaza'                         => 'simbolo-alergeno-mostaza.png',
    'Pescado'                         => 'simbolo-pescado-alergenos.png',
    'Crustáceos'                      => 'simbolo-alergeno-crustaceo.png',
    'Moluscos'                        => 'simbolo-alergeno-moluscos.png',
    'Apio'                            => 'simbolo-alergeno-apio.png',
    'Frutos de Cáscara'               => 'simbolo-alergeno-frutos-secos.png',
    'Dióxido de Azufre y Sulfitos'    => 'simbolo-alergeno-sulfitos.png',
    'Altramuces'                      => 'simbolo-alergeno-altramuz.png',
    'Sésamo'                          => 'simbolo-alergeno-sesamopng.png',
    'Cacahuetes'                      => 'simbolo-alergeno-cacahuetes.png',
];

// ── Obtener todos los menu_item del tipo correcto ──
$tax_query = [];
if ( $is_vinos ) {
    $tax_query = [ [
        'taxonomy' => 'menu_type',
        'field'    => 'slug',
        'terms'    => 'vinos',
    ] ];
} else {
    $tax_query = [ [
        'taxonomy' => 'menu_type',
        'field'    => 'slug',
        'terms'    => 'carta',
    ] ];
}

$menu_query = new WP_Query( [
    'post_type'      => 'menu_item',
    'posts_per_page' => -1,
    'tax_query'      => $tax_query,
] );

// Agrupar por categoría
$grouped = [];
if ( $menu_query->have_posts() ) {
    while ( $menu_query->have_posts() ) {
        $menu_query->the_post();
        $cat = strtoupper( trim( get_field( 'category' ) ?: 'VARIOS' ) );
        $grouped[ $cat ][] = [
            'name'       => get_the_title(),
            'desc'       => get_field( 'description' ),
            'price'      => get_field( 'base_price' ),
            'allergens'  => get_field( 'allergens' ) ?: [],
            'is_new'     => get_field( 'is_new' ),
        ];
    }
    wp_reset_postdata();
}

// Ordenar categorías según PREFERRED_ORDER
uksort( $grouped, function( $a, $b ) use ( $preferred_order ) {
    $ia = array_search( $a, $preferred_order );
    $ib = array_search( $b, $preferred_order );
    if ( $ia !== false && $ib !== false ) return $ia - $ib;
    if ( $ia !== false ) return -1;
    if ( $ib !== false ) return 1;
    return strcmp( $a, $b );
} );

get_header();
?>

<div class="menu-page page-enter">

    <!-- Cabecera -->
    <div class="menu-page-hero">
        <h1 style="font-size:2rem;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:0.5rem;">
            <?php echo $is_vinos ? 'Nuestros Vinos' : 'Nuestra Carta'; ?>
        </h1>
        <p style="color:var(--text-muted);font-size:12px;letter-spacing:0.2em;text-transform:uppercase;">
            El Jardín de Arturo Soria
        </p>
        <div class="menu-type-tabs">
            <a href="<?php echo esc_url( home_url( '/carta/' ) ); ?>"<?php echo ! $is_vinos ? ' class="active"' : ''; ?>>
                Nuestra carta
            </a>
            <a href="<?php echo esc_url( home_url( '/vinos/' ) ); ?>"<?php echo $is_vinos ? ' class="active"' : ''; ?>>
                Nuestros vinos
            </a>
        </div>
    </div>

    <!-- Categorías -->
    <div class="menu-categories">
        <?php if ( empty( $grouped ) ) : ?>
            <p style="text-align:center;padding:3rem;color:var(--text-muted);">
                No hay platos disponibles en este momento.
                <br><small>Asegúrate de añadir platos en WP Admin &gt; Platos con el tipo de menú correcto y marcados como activos.</small>
            </p>
        <?php else : ?>
            <?php foreach ( $grouped as $category => $items ) : ?>
                <div class="category-section">
                    <button class="category-header">
                        <?php echo esc_html( $category ); ?>
                        <svg class="category-chevron" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                    </button>
                    <div class="category-items">
                        <?php foreach ( $items as $item ) : ?>
                            <div class="menu-card">
                                <div class="menu-card-info">
                                    <div class="menu-card-name">
                                        <?php echo esc_html( $item['name'] ); ?>
                                        <?php if ( $item['is_new'] ) : ?>
                                            <span style="font-size:9px;background:var(--gold-leaf);color:white;padding:2px 6px;margin-left:8px;letter-spacing:0.1em;">NEW</span>
                                        <?php endif; ?>
                                    </div>
                                    <?php if ( $item['desc'] ) : ?>
                                        <div class="menu-card-desc"><?php echo esc_html( $item['desc'] ); ?></div>
                                    <?php endif; ?>
                                    <?php if ( ! empty( $item['allergens'] ) ) : ?>
                                        <div class="menu-card-allergens">
                                            <?php foreach ( $item['allergens'] as $allergen ) :
                                                $icon = $allergen_icons[ $allergen ] ?? null;
                                                if ( $icon ) : ?>
                                                    <img
                                                        src="<?php echo esc_url( $uri . '/icons/' . $icon ); ?>"
                                                        alt="<?php echo esc_attr( $allergen ); ?>"
                                                        title="<?php echo esc_attr( $allergen ); ?>"
                                                        width="20" height="20"
                                                    />
                                                <?php endif;
                                            endforeach; ?>
                                        </div>
                                    <?php endif; ?>
                                </div>
                                <?php if ( $item['price'] ) : ?>
                                    <div class="menu-card-price">
                                        <?php echo number_format( (float) $item['price'], 2, ',', '.' ); ?> €
                                    </div>
                                <?php endif; ?>
                            </div>
                        <?php endforeach; ?>
                    </div>
                </div>
            <?php endforeach; ?>
        <?php endif; ?>
    </div>

</div><!-- /.menu-page -->

<?php get_footer(); ?>
