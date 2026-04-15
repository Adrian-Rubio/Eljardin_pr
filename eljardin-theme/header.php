<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.cdnfonts.com">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<div class="app-container">

<header>
    <nav class="navbar">

        <!-- Logo -->
        <div class="nav-logo">
            <a href="<?php echo esc_url( home_url( '/' ) ); ?>" onclick="window.scrollTo({top:0,behavior:'smooth'})">
                <img
                    src="<?php echo esc_url( get_template_directory_uri() ); ?>/images/logo_jardin.png"
                    alt="El Jardín de Arturo Soria"
                    class="navbar-logo-img"
                />
            </a>
        </div>

        <!-- Links escritorio -->
        <ul class="nav-links desktop-only">
            <li>
                <a href="<?php echo esc_url( home_url( '/' ) ); ?>">EL JARDÍN DE ARTURO SORIA</a>
            </li>
            <li class="has-dropdown" id="nav-cartas">
                <a href="#" onclick="return false;">CARTAS</a>
                <ul class="dropdown-menu" id="dropdown-cartas">
                    <li><a href="<?php echo esc_url( home_url( '/carta/' ) ); ?>">Nuestra carta</a></li>
                    <li><a href="<?php echo esc_url( home_url( '/vinos/' ) ); ?>">Nuestros vinos</a></li>
                </ul>
            </li>
            <li>
                <a href="<?php echo esc_url( home_url( '/reservas/' ) ); ?>">EVENTOS</a>
            </li>
        </ul>

        <!-- Derecha escritorio: botón + redes -->
        <div class="nav-right desktop-only">
            <a href="<?php echo esc_url( home_url( '/reservas/' ) ); ?>" class="btn-reserve-solid">RESERVAR</a>
            <div class="nav-social-icons">
                <a href="https://www.instagram.com/eljardindearturosoria/?hl=es" target="_blank" rel="noreferrer" aria-label="Instagram">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </a>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
            </div>
        </div>

        <!-- Botón hamburguesa móvil -->
        <button class="mobile-toggle" id="mobile-toggle-btn" aria-label="Abrir menú" aria-expanded="false">
            <svg id="icon-menu" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
            <svg id="icon-close" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>

        <!-- Menú móvil -->
        <div class="mobile-menu" id="mobile-menu" aria-hidden="true">
            <ul class="mobile-nav-links">
                <li><a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="mobile-close">EL JARDÍN DE ARTURO SORIA</a></li>
                <li>
                    <a href="#" id="mobile-cartas-toggle">CARTAS</a>
                    <ul id="mobile-cartas-sub" style="display:none; padding-left:20px; margin-top:10px;">
                        <li style="margin-bottom:10px"><a href="<?php echo esc_url( home_url( '/carta/' ) ); ?>" class="mobile-close" style="font-size:1rem; color:#c5a04f">Nuestra carta</a></li>
                        <li style="margin-bottom:10px"><a href="<?php echo esc_url( home_url( '/vinos/' ) ); ?>" class="mobile-close" style="font-size:1rem; color:#c5a04f">Nuestros vinos</a></li>
                    </ul>
                </li>
                <li><a href="<?php echo esc_url( home_url( '/reservas/' ) ); ?>" class="mobile-close">EVENTOS</a></li>
                <li style="margin-top:1rem">
                    <a href="<?php echo esc_url( home_url( '/reservas/' ) ); ?>" class="btn-reserve-solid mobile-close">RESERVAR</a>
                </li>
                <li class="mobile-socials">
                    <a href="https://www.instagram.com/eljardindearturosoria/?hl=es" target="_blank" rel="noreferrer" style="color:var(--gold-leaf)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                    </a>
                    <a href="https://facebook.com" target="_blank" rel="noreferrer" style="color:var(--gold-leaf)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                    </a>
                </li>
            </ul>
        </div>

    </nav>
</header>
