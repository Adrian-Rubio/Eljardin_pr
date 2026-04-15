<?php
/**
 * page-jardin-experience.php — El Jardín de Arturo Soria
 * Equivale a JardinExperience.jsx. Carga también jardin-experience.css.
 */
get_header();
$uri = get_template_directory_uri();
?>

<div class="jardin-experience-page page-enter">

    <!-- HERO -->
    <section class="jardin-hero">
        <div class="jardin-hero-content">
            <span class="jardin-subtitle">Un oasis en la ciudad</span>
            <h1>Descubre el <span class="text-italic">Jardín</span></h1>
            <p>
                Ubicado en el corazón de Arturo Soria, nuestro jardín es mucho más que un restaurante.
                Es un espacio diseñado para desconectar, donde la naturaleza y la alta gastronomía
                se encuentran en perfecta armonía.
            </p>
            <div class="jardin-badges">
                <div class="jardin-badge-item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.7 7.7a2.5 2.5 0 0 1 1.8 4.3V17a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2"/><path d="M9.6 4.6A2 2 0 1 1 11 8H5"/><path d="M17.4 4.6A2 2 0 1 0 16 8H5"/></svg>
                    <span>Terraza Climatizada</span>
                </div>
                <div class="jardin-badge-item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
                    <span>Ambiente Exclusivo</span>
                </div>
                <div class="jardin-badge-item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>
                    <span>Cocina de Producto</span>
                </div>
            </div>
        </div>
        <div class="jardin-hero-image-grid">
            <div class="jardin-img-large" style="background-image: url('<?php echo esc_url( $uri ); ?>/images/jardin-hero.png');">
                <div class="img-overlay"></div>
            </div>
        </div>
    </section>

    <!-- DETAILS -->
    <section class="jardin-details">
        <div class="details-grid">
            <div class="details-card">
                <h3>El Escenario</h3>
                <p>Rodeado de vegetación exuberante y una iluminación cuidadosamente diseñada, cada rincón de nuestro jardín cuenta una historia.</p>
            </div>
            <div class="details-card">
                <h3>Momentos</h3>
                <p>Desde almuerzos bañados por el sol hasta cenas mágicas bajo las estrellas. El Jardín se adapta a cada momento del día.</p>
            </div>
        </div>

        <div class="jardin-location-card">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            <div>
                <h2>Visítanos</h2>
                <p><?php echo eljardin_config( 'address', 'Calle de Arturo Soria 130, 28043 Madrid' ); ?></p>
                <a href="https://maps.google.com/?q=El+Jardin+de+Arturo+Soria" target="_blank" rel="noreferrer" class="btn-link">Ver en Google Maps</a>
            </div>
        </div>
    </section>

</div><!-- /.jardin-experience-page -->

<?php get_footer(); ?>
