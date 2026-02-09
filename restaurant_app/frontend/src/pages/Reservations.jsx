import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import EditableText from '../components/Editable/EditableText';
import './Reservations.css';

const Reservations = () => {
    // Refs for smooth scrolling
    const reservationsRef = useRef(null);
    const eventsRef = useRef(null);

    const COVER_MANAGER_URL = "https://www.covermanager.com/reserve/module_restaurant/restaurante-gulah/spanish";

    // Images for the hero buttons
    // Using varied images for visual distinction
    const imageReservas = "/images/Wings.jpeg";
    const imageEventos = "/images/higo & roll.jpeg";

    const scrollToSection = (ref) => {
        if (ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <motion.div
            className="reservations-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            {/* Header */}
            <div className="page-header">
                <EditableText configKey="reservationsTitle" tag="h2" className="bold-title" defaultText="RESERVAS Y EVENTOS" />
                <EditableText configKey="reservationsSubtitle" tag="p" className="subtitle" defaultText="Elige tu experiencia en Gulah" />
            </div>

            {/* Hero Options */}
            <div className="reservations-hero-split">

                {/* Option 1: Reservas */}
                <motion.div
                    className="hero-option-card"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => scrollToSection(reservationsRef)}
                >
                    <img src={imageReservas} alt="Reservas" className="hero-bg-image" />
                    <div className="hero-overlay"></div>
                    <span className="hero-text">RESERVAS</span>
                </motion.div>

                {/* Option 2: Eventos */}
                <motion.div
                    className="hero-option-card"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => scrollToSection(eventsRef)}
                >
                    <img src={imageEventos} alt="Eventos" className="hero-bg-image" />
                    <div className="hero-overlay"></div>
                    <span className="hero-text">EVENTOS</span>
                </motion.div>

            </div>

            {/* --- SECTION: RESERVAS --- */}
            <div ref={reservationsRef} className="section-container" id="reservas-section">
                <h3 className="section-title">Reserva tu Mesa</h3>
                <div className="cover-manager-wrapper">
                    <iframe
                        src={COVER_MANAGER_URL}
                        title="Reserva CoverManager"
                        width="100%"
                        height="600"
                        style={{ border: 'none', height: '800px' }} /* Increased height for better visibility */
                        allowFullScreen
                    />
                </div>
            </div>

            {/* --- SECTION: EVENTOS --- */}
            <div ref={eventsRef} className="section-container" id="eventos-section">
                <h3 className="section-title">Organiza tu Evento</h3>
                <p style={{ textAlign: 'center', marginBottom: '2rem', color: '#666' }}>
                    Rellena este formulario y nos pondremos en contacto contigo para hacerlo realidad.
                </p>

                <form className="events-form" onSubmit={(e) => e.preventDefault()}>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Nombre Completo</label>
                            <input type="text" placeholder="Tu nombre" />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" placeholder="tucorreo@ejemplo.com" />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Teléfono</label>
                            <input type="tel" placeholder="+34 000 000 000" />
                        </div>
                        <div className="form-group">
                            <label>Fecha del Evento</label>
                            <input type="date" />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Nº de Personas (Aprox)</label>
                            <input type="number" min="10" placeholder="Ej: 20" />
                        </div>
                        <div className="form-group">
                            <label>Tipo de Evento</label>
                            <select>
                                <option>Selecciona una opción...</option>
                                <option>Cumpleaños</option>
                                <option>Cena de Empresa</option>
                                <option>Fiesta Privada</option>
                                <option>Otro</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Comentarios / Necesidades Especiales</label>
                        <textarea rows="4" placeholder="Cuéntanos qué tienes en mente..."></textarea>
                    </div>

                    <button type="submit" className="submit-btn">Enviar Solicitud</button>
                    <p style={{ textAlign: 'center', fontSize: '0.8rem', color: '#999' }}>
                        *Esto es solo una solicitud, no una confirmación de reserva.
                    </p>
                </form>
            </div>

            <div style={{ textAlign: 'center', marginTop: '2rem', color: '#666' }}>
                <EditableText configKey="reservationsPhone" tag="p" />
            </div>
        </motion.div>
    );
};

export default Reservations;
