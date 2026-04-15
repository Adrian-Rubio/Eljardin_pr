<?php
/**
 * menu-template.php — Lógica compartida de carta y vinos.
 * Incluido desde page-carta.php ($is_vinos = false)
 * o desde page-vinos.php  ($is_vinos = true).
 */

if ( ! defined( 'ABSPATH' ) ) exit;

$uri = get_template_directory_uri();

$preferred_order = array(
    'BOCADOS PARA EMPEZAR',
    'PAN Y APERITIVO',
    'NUESTROS ARROCES PARA COMPARTIR',
    'ALMA CARNÍVORA',
    'ALMA MARINERA',
    'GUARNICIONES',
    'ALMA PASTELERA',
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
);

$allergen_icons = array(
    'Gluten'                       => 'simbolo-alergeno-cereales.png',
    'Lácteos'                      => 'simbolo-alergeno-lacteos.png',
    'Huevos'                       => 'simbolo-alergeno-huevos.png',
    'Soja'                         => 'simbolo-alergeno-soja.png',
    'Mostaza'                      => 'simbolo-alergeno-mostaza.png',
    'Pescado'                      => 'simbolo-pescado-alergenos.png',
    'Crustáceos'                   => 'simbolo-alergeno-crustaceo.png',
    'Moluscos'                     => 'simbolo-alergeno-moluscos.png',
    'Apio'                         => 'simbolo-alergeno-apio.png',
    'Frutos de Cáscara'            => 'simbolo-alergeno-frutos-secos.png',
    'Dióxido de Azufre y Sulfitos' => 'simbolo-alergeno-sulfitos.png',
    'Altramuces'                   => 'simbolo-alergeno-altramuz.png',
    'Sésamo'                       => 'simbolo-alergeno-sesamopng.png',
    'Cacahuetes'                   => 'simbolo-alergeno-cacahuetes.png',
);

// Consulta de platos filtrada por taxonomía
$term_slug  = $is_vinos ? 'vinos' : 'carta';
$menu_query = new WP_Query( array(
    'post_type'      => 'menu_item',
    'posts_per_page' => -1,
    'tax_query'      => array( array(
        'taxonomy' => 'menu_type',
        'field'    => 'slug',
        'terms'    => $term_slug,
    ) ),
) );

// Agrupar por categoría — usa get_post_meta() para compatibilidad sin ACF
$grouped = array();
if ( $menu_query->have_posts() ) {
    while ( $menu_query->have_posts() ) {
        $menu_query->the_post();
        $pid = get_the_ID();

        $cat = strtoupper( trim( get_post_meta( $pid, 'category', true ) ) );
        if ( $cat === '' ) $cat = 'VARIOS';

        // Los alérgenos se guardaron como array serializado vía update_post_meta
        $allergens_raw = get_post_meta( $pid, 'allergens', true );
        if ( ! is_array( $allergens_raw ) ) {
            $allergens_raw = ( $allergens_raw !== '' )
                ? array_map( 'trim', explode( '|', $allergens_raw ) )
                : array();
        }

        $grouped[ $cat ][] = array(
            'name'      => get_the_title(),
            'desc'      => get_post_meta( $pid, 'description', true ),
            'price'     => get_post_meta( $pid, 'base_price',  true ),
            'allergens' => $allergens_raw,
            'is_new'    => get_post_meta( $pid, 'is_new',      true ),
        );
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

    <!-- Cabecera y tabs -->
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

    <!-- Listado de categorías y platos -->
    <div class="menu-categories">
        <?php if ( empty( $grouped ) ) : ?>
            <p style="text-align:center;padding:3rem;color:var(--text-muted);">
                No hay platos disponibles. Comprueba en
                <strong>WP Admin &rarr; Platos &rarr; Tipo de menú</strong>
                que los platos tienen el tipo <strong><?php echo esc_html( $term_slug ); ?></strong> asignado.
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
                                            <span style="font-size:9px;background:var(--gold-leaf);color:white;padding:2px 6px;margin-left:8px;letter-spacing:.1em;">NEW</span>
                                        <?php endif; ?>
                                    </div>
                                    <?php if ( $item['desc'] ) : ?>
                                        <div class="menu-card-desc"><?php echo esc_html( $item['desc'] ); ?></div>
                                    <?php endif; ?>
                                    <?php if ( ! empty( $item['allergens'] ) ) : ?>
                                        <div class="menu-card-allergens">
                                            <?php foreach ( $item['allergens'] as $allergen ) :
                                                $allergen = trim( $allergen );
                                                if ( isset( $allergen_icons[ $allergen ] ) ) : ?>
                                                    <img
                                                        src="<?php echo esc_url( $uri . '/icons/' . $allergen_icons[ $allergen ] ); ?>"
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
                                        <?php echo number_format( (float) $item['price'], 2, ',', '.' ); ?> &euro;
                                    </div>
                                <?php endif; ?>
                            </div>
                        <?php endforeach; ?>
                    </div>
                </div>
            <?php endforeach; ?>
        <?php endif; ?>
    </div>

</div>

<?php get_footer(); ?>
