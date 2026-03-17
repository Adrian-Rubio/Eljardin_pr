import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const API_URL = import.meta.env.VITE_API_URL || `http://${window.location.hostname}:8000`;

const Events = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: '',
        privacy: false
    });
    const [status, setStatus] = useState('idle'); // idle, loading, success, error

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.privacy) {
            alert("Por favor acepte la política de privacidad.");
            return;
        }

        setStatus('loading');
        try {
            await axios.post(`${API_URL}/contact/event`, formData);
            setStatus('success');
            setFormData({ name: '', email: '', phone: '', company: '', message: '', privacy: false });
        } catch (error) {
            console.error("Error sending message:", error);
            setStatus('error');
        }
    };

    return (
        <div className="events-page">
            {/* Contact Form */}
            <section className="events-form-section" id="contact-form">
                <div className="form-header">
                    <h3>Deja aquí tus datos:</h3>
                </div>

                <form className="events-form" onSubmit={handleSubmit}>
                    <div className="form-group-clean">
                        <label>Tu nombre</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="clean-input"
                        />
                    </div>

                    <div className="form-group-clean">
                        <label>Tu correo electrónico</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="clean-input"
                        />
                    </div>

                    <div className="form-group-clean">
                        <label>Tu teléfono de contacto</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="clean-input"
                        />
                    </div>

                    <div className="form-group-clean">
                        <label>Empresa</label>
                        <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            className="clean-input"
                        />
                    </div>

                    <div className="form-group-clean">
                        <label>Tu mensaje (opcional)</label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            className="clean-input"
                            rows="5"
                        ></textarea>
                    </div>

                    <div className="form-check-clean">
                        <input
                            type="checkbox"
                            name="privacy"
                            id="privacy-check"
                            checked={formData.privacy}
                            onChange={handleChange}
                        />
                        <label htmlFor="privacy-check">He leído y acepto la <span>Política de Privacidad</span></label>
                    </div>

                    <div className="form-submit-container">
                        <button type="submit" className="btn-solid-olive submit-btn" disabled={status === 'loading'}>
                            {status === 'loading' ? 'Enviando...' : 'Enviar'}
                        </button>
                    </div>

                    {status === 'success' && (
                        <p className="success-msg">¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.</p>
                    )}
                    {status === 'error' && (
                        <p className="error-msg">Hubo un error al enviar el mensaje. Por favor intenta de nuevo.</p>
                    )}
                </form>
                <div className="bg-decor-right"></div>
            </section>
        </div>
    );
};

export default Events;
