<?php
/**
 * Plantilla fallback — El Jardín de Arturo Soria
 */
get_header(); ?>

<main style="padding: 4rem 2rem; text-align: center;">
    <h1><?php the_title(); ?></h1>
    <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
        <div class="entry-content">
            <?php the_content(); ?>
        </div>
    <?php endwhile; endif; ?>
</main>

<?php get_footer(); ?>
