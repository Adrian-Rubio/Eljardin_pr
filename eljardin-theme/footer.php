
<footer class="site-footer">
    <div class="footer-container">

        <!-- 1. Logo -->
        <div class="footer-col brand">
            <img
                src="<?php echo esc_url( get_template_directory_uri() ); ?>/images/logo_jardin.png"
                alt="El Jardín Logo"
                class="footer-logo-main"
                style="border: 2px solid #c5a04f; padding: 10px;"
            />
        </div>

        <!-- 2. Info (Contacto, Ubicación, Horarios) -->
        <div class="footer-col info-stack">
            <div class="info-group">
                <h4>CONTACTO</h4>
                <ul>
                    <li>
                        <span class="icon-circle">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l1.87-1.87a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                        </span>
                        <?php echo eljardin_config( 'phone', '+34 91 XXX XX XX' ); ?>
                    </li>
                    <li>
                        <span class="icon-circle">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                        </span>
                        <?php echo eljardin_config( 'reservation_email', 'reservas@eljardindearturosoria.com' ); ?>
                    </li>
                </ul>
            </div>

            <div class="info-group" style="margin-top:20px">
                <h4>UBICACIÓN</h4>
                <ul>
                    <li>
                        <span class="icon-circle">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                        </span>
                        <?php echo eljardin_config( 'address', 'C/ Arturo Soria 130, Madrid' ); ?>
                    </li>
                    <li style="margin-top:5px">
                        <a href="https://maps.google.com/?q=El+Jardin+de+Arturo+Soria" target="_blank" rel="noreferrer" style="color:var(--gold-leaf);text-decoration:none;display:flex;align-items:center;gap:8px;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 17H5a2 2 0 0 0-2 2v0"/><path d="M5 17v0a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v0"/><rect width="12" height="6" x="6" y="11" rx="2"/><path d="M8 11V8a4 4 0 1 1 8 0v3"/></svg>
                            <span style="text-transform:uppercase;font-size:10px;letter-spacing:.1em">Cómo llegar</span>
                        </a>
                    </li>
                </ul>
            </div>

            <div class="info-group" style="margin-top:20px">
                <h4>HORARIOS</h4>
                <ul>
                    <li>
                        <span class="icon-circle">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        </span>
                        <?php echo eljardin_config( 'hours', 'L-D 13:00–00:00' ); ?>
                    </li>
                </ul>
            </div>
        </div>

        <!-- 3. Vacío (ex Valet) -->
        <div class="footer-col"></div>

        <!-- 4. Botón reservas -->
        <div class="footer-col" style="display:flex;align-items:center;justify-content:center">
            <button
                class="btn-reserve-footer"
                style="border:1px solid white;cursor:pointer"
                onclick="window.open('https://portal.covermanager.com/reservar/?restaurant=el-jardin-arturo-soria','_blank')"
            >RESERVAS</button>
        </div>

        <!-- 5. Grupo logo -->
        <div class="footer-col" style="display:flex;align-items:center;justify-content:flex-end">
            <div class="footer-group-logo">
                <span class="group-text" style="font-size:20px">Alma of Spain</span>
                <span class="group-subtext">GRUPO</span>
            </div>
        </div>

    </div>

    <!-- Links legales -->
    <div class="footer-bottom">
        <a href="<?php echo esc_url( home_url( '/privacidad/' ) ); ?>">Políticas de privacidad</a>
        <a href="<?php echo esc_url( home_url( '/cookies/' ) ); ?>">Políticas de cookies</a>
        <a href="<?php echo esc_url( home_url( '/legal/' ) ); ?>">Aviso Legal</a>
    </div>
</footer>

</div><!-- /.app-container -->

<?php wp_footer(); ?>
</body>
</html>
