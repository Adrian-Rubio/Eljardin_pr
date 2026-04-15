<?php
/**
 * single.php — El Jardín de Arturo Soria
 * Detalle de evento/blog post. Equivale a EventDetail.jsx.
 */
get_header();
?>

<div class="page-enter" style="max-width:800px;margin:4rem auto;padding:0 2rem;">
    <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>

        <!-- Volver -->
        <a href="<?php echo esc_url( home_url( '/eventos/' ) ); ?>" style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:var(--primary);text-decoration:none;display:inline-flex;align-items:center;gap:6px;margin-bottom:2rem;">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            Volver a Eventos
        </a>

        <!-- Fecha -->
        <p style="font-size:10px;letter-spacing:0.2em;color:var(--gold-leaf);text-transform:uppercase;margin-bottom:0.75rem;">
            <?php echo get_the_date( 'd \d\e F \d\e Y' ); ?>
        </p>

        <!-- Título -->
        <h1 style="font-size:2rem;letter-spacing:0.05em;text-transform:uppercase;margin-bottom:2rem;line-height:1.2;">
            <?php the_title(); ?>
        </h1>

        <!-- Imagen destacada -->
        <?php if ( has_post_thumbnail() ) : ?>
            <div style="margin-bottom:2rem;overflow:hidden;border-radius:4px;">
                <?php the_post_thumbnail( 'large', [ 'style' => 'width:100%;height:auto;display:block;' ] ); ?>
            </div>
        <?php endif; ?>

        <!-- Contenido -->
        <div class="event-content" style="line-height:1.9;color:#444;">
            <?php the_content(); ?>
        </div>

    <?php endwhile; endif; ?>
</div>

<?php get_footer(); ?>
