<?php
/**
 * page-events.php — El Jardín de Arturo Soria
 * Página de eventos y blog. Equivale a Events.jsx.
 */
get_header();
$uri = get_template_directory_uri();

// Obtener posts de eventos (post type nativo)
$events_query = new WP_Query( [
    'post_type'      => 'post',
    'posts_per_page' => 12,
    'orderby'        => 'date',
    'order'          => 'DESC',
] );
?>

<div class="events-page page-enter">

    <!-- HERO -->
    <section style="position:relative;width:100vw;margin-left:calc(-50vw + 50%);height:50vh;min-height:350px;overflow:hidden;background:#1a3a16;">
        <img
            src="<?php echo esc_url( $uri ); ?>/images/imagenes%20gen%C3%A9ricas/Alma-41.jpg"
            alt="Eventos - El Jardín"
            style="width:100%;height:100%;object-fit:cover;opacity:.6;"
        />
        <div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:2rem;">
            <h1 style="color:#fff;font-size:2.5rem;letter-spacing:0.12em;text-transform:uppercase;margin-bottom:0.5rem;">Eventos</h1>
            <p style="color:rgba(255,255,255,.8);font-size:12px;letter-spacing:0.2em;text-transform:uppercase;">Noticias, actividades y celebraciones</p>
        </div>
    </section>

    <!-- LISTADO DE EVENTOS -->
    <section style="padding:4rem 2rem;max-width:var(--max-width);margin:0 auto;">
        <?php if ( $events_query->have_posts() ) : ?>
            <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:2rem;">
                <?php while ( $events_query->have_posts() ) : $events_query->the_post(); ?>
                    <article class="details-card" style="background:white;border:1px solid rgba(0,0,0,.06);overflow:hidden;">
                        <?php if ( has_post_thumbnail() ) : ?>
                            <a href="<?php the_permalink(); ?>">
                                <div style="aspect-ratio:16/9;overflow:hidden;">
                                    <?php the_post_thumbnail( 'large', [ 'style' => 'width:100%;height:100%;object-fit:cover;display:block;transition:transform .5s;' ] ); ?>
                                </div>
                            </a>
                        <?php endif; ?>
                        <div style="padding:1.5rem;">
                            <p style="font-size:10px;letter-spacing:0.2em;color:var(--gold-leaf);text-transform:uppercase;margin-bottom:0.5rem;">
                                <?php echo get_the_date( 'd M Y' ); ?>
                            </p>
                            <h2 style="font-size:1.1rem;letter-spacing:0.02em;margin-bottom:0.75rem;">
                                <a href="<?php the_permalink(); ?>" style="text-decoration:none;color:var(--text);"><?php the_title(); ?></a>
                            </h2>
                            <p style="font-size:13px;color:var(--text-muted);line-height:1.6;">
                                <?php echo wp_trim_words( get_the_excerpt(), 20, '…' ); ?>
                            </p>
                            <a href="<?php the_permalink(); ?>" style="display:inline-block;margin-top:1rem;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:var(--primary);text-decoration:none;border-bottom:1px solid var(--primary);padding-bottom:2px;">
                                Leer más
                            </a>
                        </div>
                    </article>
                <?php endwhile; wp_reset_postdata(); ?>
            </div>
        <?php else : ?>
            <p style="text-align:center;color:var(--text-muted);padding:4rem 0;">No hay eventos publicados aún.</p>
        <?php endif; ?>
    </section>

    <!-- FORMULARIO EVENTOS PRIVADOS -->
    <section style="padding:5rem 2rem;background:#faf9f7;text-align:center;">
        <h2 style="font-size:1.8rem;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:0.5rem;">¿Quieres celebrar tu evento aquí?</h2>
        <p style="color:var(--text-muted);margin-bottom:2.5rem;font-size:13px;letter-spacing:0.1em;">Cuéntanos tu evento y te contactamos</p>
        <div style="max-width:700px;margin:0 auto;text-align:left;">
            <?php
            if ( function_exists( 'wpcf7_contact_form' ) ) {
                echo do_shortcode( '[contact-form-7 id="eventos-privados" title="Eventos Privados"]' );
            } else {
                echo '<p style="text-align:center;color:var(--text-muted);">Instala Contact Form 7 para activar el formulario de contacto.</p>';
            }
            ?>
        </div>
    </section>

</div><!-- /.events-page -->

<?php get_footer(); ?>
