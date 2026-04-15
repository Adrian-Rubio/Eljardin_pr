<?php
/**
 * page-reservations.php — El Jardín de Arturo Soria
 * Página de reservas y eventos privados. Equivale a Reservations.jsx.
 *
 * Requiere: Contact Form 7 instalado.
 * Crear un formulario CF7 llamado "Eventos Privados" y pegar su shortcode abajo.
 */
get_header();
$uri = get_template_directory_uri();

$hero_images = [
    $uri . '/images/imagenes%20gen%C3%A9ricas/JAS-111.jpg',
    $uri . '/images/imagenes%20gen%C3%A9ricas/Alma-39.jpg',
    $uri . '/images/imagenes%20gen%C3%A9ricas/Alma-41.jpg',
];
?>

<div class="reservations-page page-enter">

    <!-- HERO con imágenes ciclantes -->
    <section class="reservations-hero">
        <?php foreach ( $hero_images as $i => $src ) : ?>
            <img
                class="reservations-hero-img<?php echo $i === 0 ? ' active' : ''; ?>"
                src="<?php echo esc_url( $src ); ?>"
                alt="El Jardín - Reservas y Eventos"
            />
        <?php endforeach; ?>

        <div style="position:absolute;inset:0;background:rgba(0,0,0,.35);display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:2rem;">
            <h1 style="color:#fff;font-size:2.5rem;letter-spacing:0.12em;text-transform:uppercase;margin-bottom:1rem;">Reservas &amp; Eventos</h1>
            <p style="color:rgba(255,255,255,.85);font-size:13px;letter-spacing:0.15em;text-transform:uppercase;max-width:500px;">El espacio perfecto para tus celebraciones más especiales</p>
        </div>
    </section>

    <!-- BOTONES DE NAVEGACIÓN -->
    <nav class="reservations-nav">
        <a href="#reservar-mesa">RESERVAR MESA</a>
        <a href="#eventos-privados">EVENTOS PRIVADOS</a>
    </nav>

    <!-- SECTION: RESERVAR MESA (CoverManager) -->
    <section id="reservar-mesa" style="padding:5rem 2rem;background:#faf9f7;text-align:center;">
        <h2 style="font-size:1.8rem;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:0.5rem;">Reservar mesa</h2>
        <p style="color:var(--text-muted);margin-bottom:2rem;font-size:13px;letter-spacing:0.1em;">Selecciona fecha, hora y número de comensales</p>
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

    <!-- SECTION: EVENTOS PRIVADOS (CF7) -->
    <section id="eventos-privados" style="padding:5rem 2rem;max-width:800px;margin:0 auto;">
        <h2 style="font-size:1.8rem;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:0.5rem;text-align:center;">Eventos Privados</h2>
        <p style="color:var(--text-muted);text-align:center;margin-bottom:3rem;font-size:13px;letter-spacing:0.1em;">Bodas, cumpleaños, celebraciones de empresa y más. Cuéntanos tu evento.</p>

        <?php
        // Shortcode de Contact Form 7
        // Una vez instalado CF7, crea el formulario y reemplaza el ID:
        if ( function_exists( 'wpcf7_contact_form' ) ) {
            echo do_shortcode( '[contact-form-7 id="eventos-privados" title="Eventos Privados"]' );
        } else {
            ?>
            <div style="background:#fdf2f0;border:1px solid #f0c0b0;padding:2rem;border-radius:4px;text-align:center;">
                <p style="color:#c0392b;margin-bottom:1rem;"><strong>Formulario no disponible</strong></p>
                <p style="font-size:13px;color:#666;">Instala el plugin <strong>Contact Form 7</strong> y crea un formulario con slug <code>eventos-privados</code>.</p>
                <p style="font-size:13px;color:#666;margin-top:1rem;">Mientras tanto, puedes contactarnos directamente:</p>
                <p style="margin-top:0.5rem;">
                    <a href="tel:<?php echo esc_attr( get_theme_mod( 'eljardin_phone', '' ) ); ?>" style="color:var(--primary);font-weight:600;">
                        <?php echo eljardin_config( 'phone', '+34 91 XXX XX XX' ); ?>
                    </a>
                </p>
                <p>
                    <a href="mailto:<?php echo esc_attr( get_theme_mod( 'eljardin_reservation_email', '' ) ); ?>" style="color:var(--primary);">
                        <?php echo eljardin_config( 'reservation_email', 'reservas@eljardindearturosoria.com' ); ?>
                    </a>
                </p>
            </div>
            <?php
        }
        ?>
    </section>

</div><!-- /.reservations-page -->

<style>
.reservations-hero-img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    transition: opacity 1.5s ease;
}
.reservations-hero-img.active { opacity: 1; }
</style>

<script>
(function () {
    var imgs = document.querySelectorAll('.reservations-hero-img');
    if (!imgs.length) return;
    var current = 0;
    function cycle() {
        imgs[current].classList.remove('active');
        current = (current + 1) % imgs.length;
        imgs[current].classList.add('active');
    }
    setInterval(cycle, 5000);
}());
</script>

<?php get_footer(); ?>
