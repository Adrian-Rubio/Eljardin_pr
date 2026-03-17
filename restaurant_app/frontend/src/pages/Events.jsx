import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Reservations.css';

const API_URL = import.meta.env.VITE_API_URL || `http://${window.location.hostname}:8000`;

const Events = () => {
    const [clientType, setClientType] = useState('particular');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        date: '',
        people: '',
        eventType: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState('idle');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus('loading');

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
                setStatus('success');
                setFormData({ name: '', email: '', phone: '', company: '', date: '', people: '', eventType: '', message: '' });
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setStatus('error');
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
            <div className="section-container" style={{ marginTop: '4rem' }}>
                <h3 className="section-title">Organiza tu Evento</h3>
                <p style={{ textAlign: 'center', marginBottom: '2rem', color: '#666', fontFamily: 'Times New Roman, serif', fontStyle: 'italic', fontSize: '1.1rem' }}>
                    Diseñamos experiencias a medida para cada ocasión. Cuéntanos qué sueñas y lo haremos realidad.
                </p>

                {/* TIPO DE CLIENTE */}
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
                            <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Teléfono</label>
                            <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required />
                        </div>
                        <div className="form-group">
                            <label>Fecha Estimada</label>
                            <input type="date" name="date" value={formData.date} onChange={handleInputChange} />
                        </div>
                    </div>

                    {clientType === 'empresa' && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            style={{ overflow: 'hidden' }}
                        >
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Nombre de la Empresa</label>
                                    <input type="text" name="company" value={formData.company} onChange={handleInputChange} />
                                </div>
                            </div>
                        </motion.div>
                    )}

                    <div className="form-row">
                        <div className="form-group">
                            <label>Nº de Personas (Aprox)</label>
                            <input type="number" min="10" name="people" value={formData.people} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label>Tipo de Evento</label>
                            <select name="eventType" value={formData.eventType} onChange={handleInputChange}>
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
                        <textarea rows="4" name="message" value={formData.message} onChange={handleInputChange} placeholder="Cuéntanos qué tienes en mente..." />
                    </div>

                    <button type="submit" className="submit-btn" disabled={isSubmitting}>
                        {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
                    </button>

                    {status === 'success' && (
                        <p style={{ textAlign: 'center', color: '#4caf50', marginTop: '1rem' }}>
                            ¡Solicitud enviada con éxito! Nos pondremos en contacto pronto.
                        </p>
                    )}
                    {status === 'error' && (
                        <p style={{ textAlign: 'center', color: '#e53935', marginTop: '1rem' }}>
                            Hubo un error al enviar. Por favor, inténtalo de nuevo.
                        </p>
                    )}

                    <p style={{ textAlign: 'center', fontSize: '0.75rem', color: '#999', marginTop: '0.5rem' }}>
                        *Esto es solo una solicitud, nuestro equipo de eventos te contactará para confirmar detalles.
                    </p>
                </form>
            </div>
        </motion.div>
    );
};

export default Events;
