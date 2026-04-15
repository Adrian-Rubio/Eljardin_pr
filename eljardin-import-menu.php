<?php
/**
 * eljardin-import-menu.php
 *
 * Script de importación de platos desde menu_jardin.csv.
 *
 * INSTRUCCIONES:
 * 1. Copia este archivo a la raíz de tu WordPress (junto a wp-config.php).
 * 2. Copia menu_jardin.csv también a la raíz de WordPress.
 * 3. Abre en el navegador: https://tu-dominio.com/eljardin-import-menu.php
 * 4. Cuando termine, BORRA este archivo del servidor.
 *
 * REQUISITO: El tema eljardin debe estar activo (para que existan el CPT y la taxonomía).
 */

// ── Seguridad básica: requiere clave en la URL ──────────────────────────────
// Cambia 'eljardin2024' por cualquier clave secreta tuya.
define( 'IMPORT_KEY', 'eljardin2024' );

if ( ( $_GET['key'] ?? '' ) !== IMPORT_KEY ) {
    http_response_code( 403 );
    die( '<h2>Acceso denegado.</h2><p>Añade <code>?key=eljardin2024</code> a la URL.</p>' );
}

// ── Cargar WordPress ────────────────────────────────────────────────────────
$wp_load = __DIR__ . '/wp-load.php';
if ( ! file_exists( $wp_load ) ) {
    die( 'Error: no se encontró wp-load.php. Asegúrate de que este script está en la raíz de WordPress.' );
}
require_once $wp_load;

// ── Cargar CSV ──────────────────────────────────────────────────────────────
$csv_file = __DIR__ . '/menu_jardin.csv';
if ( ! file_exists( $csv_file ) ) {
    die( 'Error: no se encontró menu_jardin.csv en la raíz de WordPress.' );
}

// ── Categorías de vinos (para asignar taxonomía automáticamente) ────────────
$vinos_keywords = [
    'TINTOS', 'BLANCOS', 'ROSADOS', 'CAVAS', 'CHAMPAGNES',
    'VINOS GENEROSOS', 'GENEROSOS', 'DULCES', 'VARIOS VINOS',
    'DOP RIBERA', 'DOCA', 'DO RUEDA', 'RÍAS BAIXAS',
];

function es_vino( string $categoria ): bool {
    global $vinos_keywords;
    $cat_upper = strtoupper( $categoria );
    foreach ( $vinos_keywords as $kw ) {
        if ( str_contains( $cat_upper, $kw ) ) return true;
    }
    // La columna "carta" también indica si es vino
    return false;
}

// ── Asegurar que existen los términos de taxonomía ──────────────────────────
$term_carta = term_exists( 'carta', 'menu_type' );
if ( ! $term_carta ) {
    $term_carta = wp_insert_term( 'carta', 'menu_type', [ 'slug' => 'carta' ] );
}
$term_carta_id = is_array( $term_carta ) ? $term_carta['term_id'] : $term_carta;

$term_vinos = term_exists( 'vinos', 'menu_type' );
if ( ! $term_vinos ) {
    $term_vinos = wp_insert_term( 'vinos', 'menu_type', [ 'slug' => 'vinos' ] );
}
$term_vinos_id = is_array( $term_vinos ) ? $term_vinos['term_id'] : $term_vinos;

// ── Procesar CSV ────────────────────────────────────────────────────────────
$handle = fopen( $csv_file, 'r' );
$header = fgetcsv( $handle ); // Saltar cabecera

// Índices de columnas:
// 0: carta, 1: categoria, 2: item, 3: descripcion, 4: alergenos, 5: notas, 6: precio_eur, 7: precio_alt_eur

$created = 0;
$skipped = 0;
$errors  = [];
$log     = [];

while ( ( $row = fgetcsv( $handle ) ) !== false ) {
    if ( count( $row ) < 3 ) continue;

    $carta       = trim( $row[0] ?? '' );
    $categoria   = trim( $row[1] ?? '' );
    $nombre      = trim( $row[2] ?? '' );
    $descripcion = trim( $row[3] ?? '' );
    $alergenos   = trim( $row[4] ?? '' );
    $notas       = trim( $row[5] ?? '' );
    $precio      = trim( $row[6] ?? '' );
    $precio_alt  = trim( $row[7] ?? '' );

    if ( empty( $nombre ) ) continue;

    // Comprobar si ya existe un plato con ese nombre
    $existing = get_posts( [
        'post_type'  => 'menu_item',
        'title'      => $nombre,
        'post_status'=> 'publish',
        'numberposts'=> 1,
    ] );

    if ( ! empty( $existing ) ) {
        $skipped++;
        $log[] = "⏭ OMITIDO (ya existe): $nombre";
        continue;
    }

    // Crear el post
    $post_id = wp_insert_post( [
        'post_type'   => 'menu_item',
        'post_title'  => $nombre,
        'post_status' => 'publish',
    ] );

    if ( is_wp_error( $post_id ) ) {
        $errors[] = "Error al crear '$nombre': " . $post_id->get_error_message();
        continue;
    }

    // Campos ACF / meta
    update_post_meta( $post_id, 'category',    strtoupper( $categoria ) );
    update_post_meta( $post_id, 'description', $descripcion );
    update_post_meta( $post_id, 'base_price',  (float) str_replace( ',', '.', $precio ) );
    update_post_meta( $post_id, 'is_active',   '1' );
    update_post_meta( $post_id, 'is_promoted', '0' );
    update_post_meta( $post_id, 'is_new',      '0' );

    if ( ! empty( $notas ) ) {
        update_post_meta( $post_id, 'notes', $notas );
    }

    if ( ! empty( $precio_alt ) ) {
        update_post_meta( $post_id, 'alt_price', (float) str_replace( ',', '.', $precio_alt ) );
    }

    // Alérgenos: separados por | en el CSV
    if ( ! empty( $alergenos ) ) {
        $alergenos_arr = array_map( 'trim', explode( '|', $alergenos ) );
        update_post_meta( $post_id, 'allergens', $alergenos_arr );
    }

    // Asignar taxonomía menu_type según columna "carta" o categoría
    $es_vino = ( stripos( $carta, 'vino' ) !== false ) || es_vino( $categoria );
    $term_id = $es_vino ? $term_vinos_id : $term_carta_id;
    wp_set_object_terms( $post_id, (int) $term_id, 'menu_type' );

    $created++;
    $tipo = $es_vino ? 'VINOS' : 'CARTA';
    $log[] = "✅ [$tipo] $nombre — $categoria — {$precio}€";
}

fclose( $handle );

// ── Salida HTML ─────────────────────────────────────────────────────────────
?>
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>Importación de menú — El Jardín</title>
<style>
    body { font-family: Arial, sans-serif; max-width: 900px; margin: 2rem auto; padding: 0 1rem; }
    h1   { color: #1a3a16; }
    .ok  { color: #1a3a16; }
    .skip{ color: #999; }
    .err { color: #c0392b; }
    .box { background: #f9f9f9; border: 1px solid #ddd; padding: 1rem; margin: 1rem 0; border-radius: 4px; font-size: 13px; line-height: 1.8; }
    .summary { background: #1a3a16; color: white; padding: 1.5rem; border-radius: 4px; margin-bottom: 1.5rem; }
    .warn { background: #fdf2f0; border: 1px solid #f0c0b0; padding: 1rem; border-radius: 4px; color: #c0392b; margin-top: 1.5rem; }
</style>
</head>
<body>
<h1>Importación de menú — El Jardín de Arturo Soria</h1>

<div class="summary">
    <strong>✅ Platos creados:</strong> <?php echo $created; ?><br>
    <strong>⏭ Omitidos (ya existían):</strong> <?php echo $skipped; ?><br>
    <?php if ( $errors ) : ?>
    <strong>❌ Errores:</strong> <?php echo count( $errors ); ?>
    <?php endif; ?>
</div>

<?php if ( $errors ) : ?>
<h3 class="err">Errores</h3>
<div class="box">
    <?php foreach ( $errors as $e ) echo '<div class="err">' . esc_html( $e ) . '</div>'; ?>
</div>
<?php endif; ?>

<h3>Registro detallado</h3>
<div class="box">
<?php foreach ( $log as $line ) : ?>
    <div><?php echo esc_html( $line ); ?></div>
<?php endforeach; ?>
</div>

<div class="warn">
    <strong>⚠️ IMPORTANTE:</strong> Ahora que la importación ha terminado, <strong>borra este archivo</strong>
    (<code>eljardin-import-menu.php</code>) del servidor para evitar accesos no deseados.
</div>

</body>
</html>
<?php
