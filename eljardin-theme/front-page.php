<?php
/**
 * front-page.php — El Jardín de Arturo Soria
 * Página de inicio. Equivale a Home.jsx.
 */
get_header();

$uri = get_template_directory_uri();

$hero_images = [
    $uri . '/images/imagenes%20gen%C3%A9ricas/Alma-39.jpg',
    $uri . '/images/banner/banner-home1.jpg',
    $uri . '/images/banner/banner-home2.jpg',
    $uri . '/images/banner/banner-home3.jpg',
    $uri . '/images/banner/banner-home4.jpg',
];

$dishes = [
    $uri . '/images/platos/Alma-34.jpg',
    $uri . '/images/platos/Alma-52.jpg',
    $uri . '/images/platos/Alma-7.jpg',
    $uri . '/images/platos/JAS-2.jpg',
    $uri . '/images/platos/JAS-59.jpg',
    $uri . '/images/platos/JDAS-26.jpg',
    $uri . '/images/platos/JDAS-15.jpg',
    $uri . '/images/platos/JDAS-71.jpg',
    $uri . '/images/platos/JAS-62.jpg',
];

$espacios = [
    ['titulo' => 'Chill Out',       'fotos' => ['chillout-1.jpg', 'chillout-2.jpg', 'chillout-3.jpg']],
    ['titulo' => 'Salón Principal', 'fotos' => ['salon-1.jpg',    'salon-2.jpg',    'salon-3.jpg']],
    ['titulo' => 'Terraza Techada', 'fotos' => ['terraza-1.jpg',  'terraza-2.jpg',  'terraza-3.jpg']],
    ['titulo' => 'Jardín',          'fotos' => ['jardin-1.jpg',   'jardin-2.jpg',   'jardin-3.jpg']],
];

$faqs = [
    '¿Cuál es el horario de apertura del restaurante?',
    '¿Dónde está ubicado?',
    '¿Es necesario reservar antes de venir?',
    '¿Ofrecéis menús especiales o para grupos?',
    '¿Disponéis de espacios al aire libre y zonas chill-out?',
    '¿Aceptáis eventos privados o celebraciones (bodas, cumpleaños, empresas)?',
    '¿Disponéis de aparcamiento?',
    '¿Tenéis opciones vegetarianas, veganas o sin gluten?',
    '¿Disponéis de servicio Take Away o delivery?',
    '¿Es El Jardín de Arturo Soria apto mascotas?',
];
?>

<div class="home-page page-enter">

    <!-- 1. HERO CAROUSEL -->
    <section class="hero-full" style="position:relative;">
        <?php foreach ( $hero_images as $i => $src ) : ?>
            <img
                class="hero-img<?php echo $i === 0 ? ' active' : ''; ?>"
                src="<?php echo esc_url( $src ); ?>"
                alt="El Jardín de Arturo Soria - Ambiente"
            />
        <?php endforeach; ?>

        <!-- Flecha izquierda -->
        <button id="hero-prev" class="hero-arrow-btn" aria-label="Imagen anterior" style="position:absolute;left:1.5rem;top:50%;transform:translateY(-50%);z-index:10;background:rgba(0,0,0,0.35);border:none;border-radius:50%;width:48px;height:48px;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#fff;">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>

        <!-- Flecha derecha -->
        <button id="hero-next" class="hero-arrow-btn" aria-label="Imagen siguiente" style="position:absolute;right:1.5rem;top:50%;transform:translateY(-50%);z-index:10;background:rgba(0,0,0,0.35);border:none;border-radius:50%;width:48px;height:48px;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#fff;">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </button>

        <!-- Puntos indicadores -->
        <div style="position:absolute;bottom:1.5rem;left:50%;transform:translateX(-50%);display:flex;gap:8px;z-index:10;">
            <?php foreach ( $hero_images as $i => $_ ) : ?>
                <button
                    class="hero-dot"
                    aria-label="<?php echo esc_attr( 'Ir a imagen ' . ( $i + 1 ) ); ?>"
                    style="width:<?php echo $i === 0 ? '24px' : '8px'; ?>;height:8px;border-radius:4px;background:<?php echo $i === 0 ? '#c5a04f' : 'rgba(255,255,255,0.6)'; ?>;border:none;cursor:pointer;transition:all 0.3s;padding:0;"
                ></button>
            <?php endforeach; ?>
        </div>
    </section>

    <!-- 2. GALERÍA DE PLATOS -->
    <div style="text-align:center;padding:3rem 2rem 1rem;">
        <h2 style="font-size:1.8rem;letter-spacing:0.08em;text-transform:uppercase;">Nuestra oferta gastronómica</h2>
    </div>
    <section class="dish-gallery-slider">
        <button class="slider-arrow left" aria-label="Anterior">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <div class="dish-gallery">
            <?php foreach ( $dishes as $src ) : ?>
                <div class="gallery-item gallery-item-all">
                    <img src="<?php echo esc_url( $src ); ?>" alt="Plato El Jardín" loading="lazy" />
                </div>
            <?php endforeach; ?>
        </div>
        <button class="slider-arrow right" aria-label="Siguiente">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </button>
    </section>

    <!-- 3. IDENTITY / BENEDETTI -->
    <section class="identity-section">
        <div class="identity-left">
            <img src="<?php echo esc_url( $uri ); ?>/images/HotConcepts.png" alt="Premio Hot Concepts Ganador 2021" />
        </div>
        <div class="identity-right">
            <h2 class="section-title">El Jardín de Arturo Soria</h2>
            <div class="benedetti-quote">
                <p>"El alma no crece en los árboles;<br>
                sin embargo, se nutre de nuestro entorno,<br>
                como el cuerpo de la comida.<br>
                El alma necesita ser alimentada<br>
                con visiones hermosas,<br>
                palabras que llenen…<br>
                o por quién sabe besar el alma."</p>
            </div>
            <p class="benedetti-author">MARIO BENEDETTI</p>
        </div>
    </section>

    <!-- 4. CONOCE NUESTROS ESPACIOS -->
    <section style="padding:4rem 2rem;background:#faf9f7;">
        <h2 style="text-align:center;font-size:1.8rem;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:3rem;">Conoce nuestros espacios</h2>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:2rem;max-width:1200px;margin:0 auto;">
            <?php foreach ( $espacios as $espacio ) : ?>
                <div class="espacio-card" style="display:flex;flex-direction:column;align-items:center;gap:1rem;">
                    <h3 style="font-size:1rem;letter-spacing:0.12em;text-transform:uppercase;margin:0;"><?php echo esc_html( $espacio['titulo'] ); ?></h3>
                    <div style="position:relative;width:100%;aspect-ratio:4/3;overflow:hidden;border-radius:4px;">
                        <?php foreach ( $espacio['fotos'] as $foto ) : ?>
                            <img
                                class="espacio-img"
                                src="<?php echo esc_url( $uri . '/images/espacios/' . $foto ); ?>"
                                alt="<?php echo esc_attr( $espacio['titulo'] ); ?>"
                                loading="lazy"
                                onerror="this.style.display='none'"
                            />
                        <?php endforeach; ?>
                        <?php if ( count( $espacio['fotos'] ) > 1 ) : ?>
                            <button class="espacio-prev hero-arrow-btn" aria-label="Anterior" style="position:absolute;left:0.5rem;top:50%;transform:translateY(-50%);z-index:5;background:rgba(0,0,0,0.3);border:none;border-radius:50%;width:32px;height:32px;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#fff;">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                            </button>
                            <button class="espacio-next hero-arrow-btn" aria-label="Siguiente" style="position:absolute;right:0.5rem;top:50%;transform:translateY(-50%);z-index:5;background:rgba(0,0,0,0.3);border:none;border-radius:50%;width:32px;height:32px;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#fff;">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                            </button>
                        <?php endif; ?>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    </section>

    <!-- 5. RESERVAS / EVENTOS (2 bloques) -->
    <section style="display:grid;grid-template-columns:1fr 1fr;min-height:420px;">
        <a href="<?php echo esc_url( home_url( '/reservas/' ) ); ?>" class="split-link" style="position:relative;display:block;overflow:hidden;text-decoration:none;">
            <img src="<?php echo esc_url( $uri ); ?>/images/imagenes%20gen%C3%A9ricas/JAS-111.jpg" alt="Reservas" style="width:100%;height:100%;object-fit:cover;display:block;" />
            <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.55) 0%,rgba(0,0,0,.15) 100%);display:flex;align-items:flex-end;justify-content:center;padding:2.5rem;">
                <h2 style="color:#fff;font-size:2rem;letter-spacing:0.15em;text-transform:uppercase;margin:0;">Reservas</h2>
            </div>
        </a>
        <a href="<?php echo esc_url( home_url( '/eventos/' ) ); ?>" class="split-link" style="position:relative;display:block;overflow:hidden;text-decoration:none;">
            <img src="<?php echo esc_url( $uri ); ?>/images/imagenes%20gen%C3%A9ricas/Alma-41.jpg" alt="Eventos" style="width:100%;height:100%;object-fit:cover;display:block;" />
            <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.55) 0%,rgba(0,0,0,.15) 100%);display:flex;align-items:flex-end;justify-content:center;padding:2.5rem;">
                <h2 style="color:#fff;font-size:2rem;letter-spacing:0.15em;text-transform:uppercase;margin:0;">Eventos</h2>
            </div>
        </a>
    </section>

    <!-- 6. TEXT BLOCK -->
    <section class="text-block-centered">
        <h2><?php echo eljardin_config( 'garden_text_title', 'Un Jardín oculto dentro de Madrid' ); ?></h2>
        <p><?php echo nl2br( eljardin_config( 'garden_text_p', "A través de una cocina tradicional y respetando nuestras raíces, trabajamos sobre un único objetivo: sorprender a tu paladar con los mejores productos y técnicas culinarias.\nEn El Jardín de Arturo Soria descubrirás un rincón dentro del corazón de Madrid que no te dejará indiferente. Salones privados, terrazas techadas, espacios Chill-out y nuestro increíble y mágico Jardín..." ) ); ?></p>
    </section>

    <!-- 7. FAQ -->
    <section class="faq-section">
        <div class="faq-grid">
            <div class="faq-header">
                <h2><?php echo eljardin_config( 'faq_title', "FAQ'S" ); ?></h2>
                <p><?php echo eljardin_config( 'faq_subtitle', 'Respuestas a tus dudas más comunes.' ); ?></p>
            </div>
            <div class="faq-list">
                <?php foreach ( $faqs as $i => $question ) :
                    $answer = get_theme_mod( 'eljardin_faq_answer_' . $i, 'Próximamente.' );
                ?>
                    <div class="faq-item">
                        <button class="faq-question">
                            <?php echo esc_html( $question ); ?>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                        </button>
                        <div class="faq-answer">
                            <p><?php echo esc_html( $answer ); ?></p>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
    </section>

    <!-- 8. COVERMANAGER -->
    <section style="padding:4rem 2rem;background:#faf9f7;text-align:center;">
        <h2 style="font-size:1.8rem;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:2rem;">Reserva tu mesa</h2>
        <div style="max-width:900px;margin:0 auto;border-radius:4px;overflow:hidden;">
            <iframe
                src="https://www.covermanager.com/reserve/module_restaurant/restaurante-el-jardin-de-alma/spanish"
                width="100%"
                height="600"
                frameborder="0"
                title="Reservar mesa - El Jardín de Arturo Soria"
                style="display:block;"
            ></iframe>
        </div>
    </section>

</div><!-- /.home-page -->

<?php get_footer(); ?>
