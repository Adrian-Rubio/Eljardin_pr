<?php
/**
 * Plugin Name: El Jardín — Importador de Menú
 * Description: Importa los platos desde menu_jardin.csv directamente desde WP Admin. Desactiva y borra el plugin una vez usado.
 * Version: 1.0
 * Author: El Jardín de Arturo Soria
 */

if ( ! defined( 'ABSPATH' ) ) exit;

// ── Añadir página en WP Admin → Herramientas ────────────────────────────────
add_action( 'admin_menu', function () {
    add_management_page(
        'Importar Menú El Jardín',
        '🍽 Importar Menú',
        'manage_options',
        'eljardin-importer',
        'eljardin_importer_page'
    );
} );

// ── Categorías de vinos ──────────────────────────────────────────────────────
function eljardin_es_vino( string $carta, string $categoria ): bool {
    $keywords = [ 'TINTOS', 'BLANCOS', 'ROSADOS', 'CAVAS', 'CHAMPAGNES',
                  'VINOS GENEROSOS', 'GENEROSOS', 'DOP RIBERA', 'DOCA',
                  'DO RUEDA', 'RÍAS BAIXAS', 'BIERZO', 'MONTERREI',
                  'SOMONTANO', 'PRIORAT', 'RIBERA DEL DUERO', 'RIBERA SACRA',
                  'EXTREMADURA', 'CASTILLA', 'DULCES', 'SULFITOS' ];
    $upper = strtoupper( $carta . ' ' . $categoria );
    foreach ( $keywords as $kw ) {
        if ( str_contains( $upper, $kw ) ) return true;
    }
    return stripos( $carta, 'vino' ) !== false;
}

// ── Lógica de importación ────────────────────────────────────────────────────
function eljardin_do_import( string $csv_path ): array {
    $created = 0;
    $skipped = 0;
    $errors  = [];
    $log     = [];

    // Asegurar términos de taxonomía
    $term_carta = term_exists( 'carta', 'menu_type' );
    if ( ! $term_carta ) $term_carta = wp_insert_term( 'carta', 'menu_type', [ 'slug' => 'carta' ] );
    $carta_id = is_array( $term_carta ) ? (int) $term_carta['term_id'] : (int) $term_carta;

    $term_vinos = term_exists( 'vinos', 'menu_type' );
    if ( ! $term_vinos ) $term_vinos = wp_insert_term( 'vinos', 'menu_type', [ 'slug' => 'vinos' ] );
    $vinos_id = is_array( $term_vinos ) ? (int) $term_vinos['term_id'] : (int) $term_vinos;

    $handle = fopen( $csv_path, 'r' );
    fgetcsv( $handle ); // saltar cabecera

    while ( ( $row = fgetcsv( $handle ) ) !== false ) {
        if ( count( $row ) < 3 ) continue;

        $carta       = trim( $row[0] ?? '' );
        $categoria   = trim( $row[1] ?? '' );
        $nombre      = trim( $row[2] ?? '' );
        $descripcion = trim( $row[3] ?? '' );
        $alergenos   = trim( $row[4] ?? '' );
        $notas       = trim( $row[5] ?? '' );
        $precio      = (float) str_replace( ',', '.', trim( $row[6] ?? '0' ) );
        $precio_alt  = trim( $row[7] ?? '' );

        if ( empty( $nombre ) ) continue;

        // Evitar duplicados
        $existing = get_posts( [
            'post_type'   => 'menu_item',
            'title'       => $nombre,
            'post_status' => 'publish',
            'numberposts' => 1,
            'fields'      => 'ids',
        ] );

        if ( ! empty( $existing ) ) {
            $skipped++;
            $log[] = [ 'type' => 'skip', 'msg' => "Omitido (ya existe): $nombre" ];
            continue;
        }

        $post_id = wp_insert_post( [
            'post_type'   => 'menu_item',
            'post_title'  => $nombre,
            'post_status' => 'publish',
        ] );

        if ( is_wp_error( $post_id ) ) {
            $errors[] = $post_id->get_error_message();
            $log[]    = [ 'type' => 'error', 'msg' => "Error: $nombre — " . $post_id->get_error_message() ];
            continue;
        }

        update_post_meta( $post_id, 'category',    strtoupper( $categoria ) );
        update_post_meta( $post_id, 'description', $descripcion );
        update_post_meta( $post_id, 'base_price',  $precio );
        update_post_meta( $post_id, 'is_active',   '1' );
        update_post_meta( $post_id, 'is_promoted', '0' );
        update_post_meta( $post_id, 'is_new',      '0' );

        if ( $notas )      update_post_meta( $post_id, 'notes',     $notas );
        if ( $precio_alt ) update_post_meta( $post_id, 'alt_price', (float) str_replace( ',', '.', $precio_alt ) );

        if ( $alergenos ) {
            $arr = array_map( 'trim', explode( '|', $alergenos ) );
            update_post_meta( $post_id, 'allergens', $arr );
        }

        $es_vino = eljardin_es_vino( $carta, $categoria );
        wp_set_object_terms( $post_id, $es_vino ? $vinos_id : $carta_id, 'menu_type' );

        $tipo  = $es_vino ? 'VINOS' : 'CARTA';
        $created++;
        $log[] = [ 'type' => 'ok', 'msg' => "[$tipo] $nombre — $categoria — {$precio}€" ];
    }

    fclose( $handle );

    return compact( 'created', 'skipped', 'errors', 'log' );
}

// ── Página de administración ─────────────────────────────────────────────────
function eljardin_importer_page() {
    if ( ! current_user_can( 'manage_options' ) ) return;

    $result   = null;
    $csv_path = null;

    // Procesar subida de CSV
    if ( isset( $_POST['eljardin_import_nonce'] )
         && wp_verify_nonce( $_POST['eljardin_import_nonce'], 'eljardin_import' ) ) {

        if ( ! empty( $_FILES['csv_file']['tmp_name'] ) ) {
            $csv_path = $_FILES['csv_file']['tmp_name'];
            $result   = eljardin_do_import( $csv_path );
        } else {
            $result = [ 'created' => 0, 'skipped' => 0, 'errors' => [ 'No se subió ningún archivo.' ], 'log' => [] ];
        }
    }
    ?>
    <div class="wrap">
        <h1>🍽 Importar Menú — El Jardín de Arturo Soria</h1>
        <p>Sube el archivo <code>menu_jardin.csv</code> para importar todos los platos a WordPress.</p>

        <?php if ( $result ) : ?>
            <div class="notice notice-<?php echo empty( $result['errors'] ) ? 'success' : 'warning'; ?>" style="padding:12px 16px;">
                <strong>✅ Platos creados:</strong> <?php echo (int) $result['created']; ?> &nbsp;|&nbsp;
                <strong>⏭ Omitidos:</strong> <?php echo (int) $result['skipped']; ?>
                <?php if ( $result['errors'] ) : ?>
                    &nbsp;|&nbsp; <strong style="color:#c0392b">❌ Errores: <?php echo count( $result['errors'] ); ?></strong>
                <?php endif; ?>
            </div>

            <details style="margin:16px 0;" <?php echo $result['created'] > 0 ? 'open' : ''; ?>>
                <summary style="cursor:pointer;font-weight:600;padding:8px 0;">Ver registro detallado</summary>
                <div style="background:#f9f9f9;border:1px solid #ddd;padding:12px;max-height:400px;overflow-y:auto;font-size:12px;line-height:1.8;font-family:monospace;margin-top:8px;">
                    <?php foreach ( $result['log'] as $entry ) :
                        $color = $entry['type'] === 'ok' ? '#1a3a16' : ( $entry['type'] === 'skip' ? '#999' : '#c0392b' );
                    ?>
                        <div style="color:<?php echo $color; ?>"><?php echo esc_html( $entry['msg'] ); ?></div>
                    <?php endforeach; ?>
                </div>
            </details>

            <?php if ( $result['created'] > 0 ) : ?>
                <p>
                    <a href="<?php echo admin_url( 'edit.php?post_type=menu_item' ); ?>" class="button button-primary">
                        Ver platos importados →
                    </a>
                </p>
            <?php endif; ?>
        <?php endif; ?>

        <hr>
        <form method="post" enctype="multipart/form-data" style="margin-top:20px;">
            <?php wp_nonce_field( 'eljardin_import', 'eljardin_import_nonce' ); ?>
            <table class="form-table">
                <tr>
                    <th><label for="csv_file">Archivo CSV</label></th>
                    <td>
                        <input type="file" name="csv_file" id="csv_file" accept=".csv" required>
                        <p class="description">Selecciona el archivo <code>menu_jardin.csv</code> desde tu ordenador.</p>
                    </td>
                </tr>
            </table>
            <?php submit_button( 'Importar platos', 'primary', 'submit', false ); ?>
        </form>

        <hr>
        <div style="background:#fdf2f0;border:1px solid #f5c6c6;padding:12px 16px;border-radius:4px;margin-top:16px;">
            <strong>⚠️ Cuando termines:</strong> desactiva y elimina este plugin desde
            <a href="<?php echo admin_url( 'plugins.php' ); ?>">WP Admin → Plugins</a> para mantener el sitio limpio.
        </div>
    </div>
    <?php
}
