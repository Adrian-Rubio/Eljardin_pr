<?php
/**
 * page-press.php — El Jardín de Arturo Soria
 * Página de prensa. Equivale a Press.jsx.
 */
get_header();
?>

<div class="press-page page-enter" style="padding:4rem 2rem;text-align:center;">
    <h1 style="font-size:3rem;margin-bottom:2rem;color:var(--primary);font-family:var(--font-primary);text-transform:uppercase;letter-spacing:0.05em;">Prensa</h1>
    <p style="font-size:1.2rem;color:var(--text-muted);max-width:800px;margin:0 auto;">
        Próximamente encontrarás aquí todas las noticias y artículos sobre El Jardín de Arturo Soria.
    </p>
    <?php
    // Si el administrador añade contenido a la página WP, se muestra aquí
    if ( have_posts() ) : while ( have_posts() ) : the_post();
        if ( get_the_content() ) : ?>
            <div style="max-width:800px;margin:3rem auto;text-align:left;line-height:1.9;">
                <?php the_content(); ?>
            </div>
        <?php endif;
    endwhile; endif; ?>
</div>

<?php get_footer(); ?>
