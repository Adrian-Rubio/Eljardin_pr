import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import EditableText from '../components/Editable/EditableText';
import './Reservations.css';

const Reservations = () => {
    // Refs for smooth scrolling
    const reservationsRef = useRef(null);
    const eventsRef = useRef(null);

    const COVER_MANAGER_URL = "https://www.covermanager.com/reserve/module_restaurant/restaurante-el-jardin-de-alma/spanish";
    const API_URL = import.meta.env.VITE_API_URL || `http://${window.location.hostname}:8000`;

    // Images for the hero buttons
    const platosImages = [
        "/images/platos/Alma-34.jpg",
        "/images/platos/Alma-52.jpg",
        "/images/platos/Alma-7.jpg",
        "/images/platos/JAS-2.jpg",
        "/images/platos/JAS-59.jpg",
        "/images/platos/JAS-62.jpg",
        "/images/platos/JDAS-15.jpg",
        "/images/platos/JDAS-26.jpg",
        "/images/platos/JDAS-71.jpg"
    ];

    const eventosImages = [
        "/images/imagenes%20genéricas/Alma-39.jpg",
        "/images/imagenes%20genéricas/Alma-4.jpg",
        "/images/imagenes%20genéricas/Alma-41.jpg",
        "/images/imagenes%20genéricas/JAS-111.jpg",
        "/images/imagenes%20genéricas/JAS-82-1.jpg"
    ];

    const [currentPlatoIndex, setCurrentPlatoIndex] = React.useState(0);
    const [currentEventoIndex, setCurrentEventoIndex] = React.useState(0);

    // FORM STATE
    const [clientType, setClientType] = React.useState('particular'); // 'particular' | 'empresa'
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        date: '',
        people: '',
        eventType: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setCurrentPlatoIndex((prev) => (prev + 1) % platosImages.length);
            setCurrentEventoIndex((prev) => (prev + 1) % eventosImages.length);
        }, 4000); // Change every 4 seconds
        return () => clearInterval(interval);
    }, []);

    const scrollToSection = (ref) => {
        if (ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const payload = {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                company: clientType === 'empresa' ? formData.company : null,
                client_type: clientType,
                message: `Fecha: ${formData.date}\nPersonas: ${formData.people}\nTipo: ${formData.eventType}\n\n${formData.message}`
            };

            const response = await fetch(`${API_URL}/contact/event`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                alert('Solicitud enviada correctamente. Nos pondremos en contacto contigo pronto.');
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    company: '',
                    date: '',
                    people: '',
                    eventType: '',
                    message: ''
                });
            } else {
                alert('Hubo un error al enviar la solicitud. Por favor, inténtalo de nuevo.');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Error de conexión. Por favor, verifica tu conexión a internet.');
        } finally {
            setIsSubmitting(false);
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
                <EditableText configKey="reservationsSubtitle" tag="p" className="subtitle" defaultText="Elige tu experiencia en El Jardín" />
            </div>

            {/* Hero Options */}
            <div className="reservations-hero-split">

                {/* Option 1: Reservas */}
                <motion.div
                    className="hero-option-card"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => scrollToSection(reservationsRef)}
                    style={{ overflow: 'hidden', position: 'relative' }}
                >
                    <div className="slideshow-container" style={{ position: 'absolute', inset: 0 }}>
                        {platosImages.map((img, index) => (
                            <motion.img
                                key={img}
                                src={img}
                                alt="Reservas"
                                className="hero-bg-image"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: index === currentPlatoIndex ? 1 : 0 }}
                                transition={{ duration: 1 }}
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover'
                                }}
                            />
                        ))}
                    </div>
                    <div className="hero-overlay"></div>
                    <span className="hero-text">RESERVAS</span>
                </motion.div>

                {/* Option 2: Eventos */}
                <motion.div
                    className="hero-option-card"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => scrollToSection(eventsRef)}
                    style={{ overflow: 'hidden', position: 'relative' }}
                >
                    <div className="slideshow-container" style={{ position: 'absolute', inset: 0 }}>
                        {eventosImages.map((img, index) => (
                            <motion.img
                                key={img}
                                src={img}
                                alt="Eventos"
                                className="hero-bg-image"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: index === currentEventoIndex ? 1 : 0 }}
                                transition={{ duration: 1 }}
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover'
                                }}
                            />
                        ))}
                    </div>
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
                        style={{ border: 'none', height: '800px' }}
                        allowFullScreen
                    />
                </div>
            </div>

            {/* --- SECTION: EVENTOS --- */}
            <div ref={eventsRef} className="section-container" id="eventos-section">
                <h3 className="section-title">Organiza tu Evento</h3>
                <p style={{ textAlign: 'center', marginBottom: '2rem', color: '#666', fontFamily: 'Times New Roman, serif', fontStyle: 'italic', fontSize: '1.1rem' }}>
                    Diseñamos experiencias a medida para cada ocasión. Cuéntanos qué sueñas y lo haremos realidad.
                </p>

                {/* TIPO DE CLIENTE SELECTOR */}
                <div className="client-type-selector">
                    <div
                        className={`type-option ${clientType === 'particular' ? 'active' : ''}`}
                        onClick={() => setClientType('particular')}
                    >
                        Particular
                    </div>
                    <div
                        className={`type-option ${clientType === 'empresa' ? 'active' : ''}`}
                        onClick={() => setClientType('empresa')}
                    >
                        Empresa
                    </div>
                </div>

                <form className="events-form" onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Nombre Completo</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Teléfono</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Fecha Estimada</label>
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    {/* CONDITIONAL COMPANY FIELD */}
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: clientType === 'empresa' ? 1 : 0, height: clientType === 'empresa' ? 'auto' : 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ overflow: 'hidden' }}
                    >
                        <div className="form-row" style={{ marginTop: '1rem' }}>
                            <div className="form-group">
                                <label>Nombre de la Empresa</label>
                                <input
                                    type="text"
                                    name="company"
                                    value={formData.company}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    </motion.div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Nº de Personas (Aprox)</label>
                            <input
                                type="number"
                                min="10"
                                name="people"
                                value={formData.people}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Tipo de Evento</label>
                            <select
                                name="eventType"
                                value={formData.eventType}
                                onChange={handleInputChange}
                            >
                                <option value="">Selecciona una opción...</option>
                                <option value="Cumpleaños">Cumpleaños</option>
                                <option value="Cena de Empresa">Cena de Empresa</option>
                                <option value="Boda / Comunión">Boda / Comunión</option>
                                <option value="Presentación de Producto">Presentación de Producto</option>
                                <option value="Fiesta Privada">Fiesta Privada</option>
                                <option value="Otro">Otro</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Comentarios / Necesidades Especiales</label>
                        <textarea
                            rows="4"
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            placeholder="Cuéntanos qué tienes en mente..."
                        ></textarea>
                    </div>

                    <button type="submit" className="submit-btn" disabled={isSubmitting}>
                        {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
                    </button>
                    <p style={{ textAlign: 'center', fontSize: '0.75rem', color: '#999', marginTop: '1rem' }}>
                        *Esto es solo una solicitud, nuestro equipo de eventos te contactará para confirmar detalles.
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
