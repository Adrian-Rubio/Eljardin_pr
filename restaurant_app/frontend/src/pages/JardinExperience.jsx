import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Wind, Sparkles, Utensils } from 'lucide-react';
import './JardinExperience.css';

const JardinExperience = () => {
    return (
        <div className="jardin-experience-page">
            {/* Elegant Hero Section */}
            <section className="jardin-hero">
                <motion.div
                    className="jardin-hero-content"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <span className="jardin-subtitle">Un oasis en la ciudad</span>
                    <h1>Descubre el <span className="text-italic">Jardín</span></h1>
                    <p>
                        Ubicado en el corazón de Arturo Soria, nuestro jardín es mucho más que un restaurante.
                        Es un espacio diseñado para desconectar, donde la naturaleza y la alta gastronomía
                        se encuentran en perfecta armonía.
                    </p>
                    <motion.div
                        className="jardin-badges"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <div className="jardin-badge-item">
                            <Wind size={20} />
                            <span>Terraza Climatizada</span>
                        </div>
                        <div className="jardin-badge-item">
                            <Sparkles size={20} />
                            <span>Ambiente Exclusivo</span>
                        </div>
                        <div className="jardin-badge-item">
                            <Utensils size={20} />
                            <span>Cocina de Producto</span>
                        </div>
                    </motion.div>
                </motion.div>
                <div className="jardin-hero-image-grid">
                    <motion.div
                        className="jardin-img-large"
                        initial={{ scale: 1.1, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1.5 }}
                    >
                        <div className="img-overlay"></div>
                    </motion.div>
                </div>
            </section>

            <section className="jardin-details">
                <div className="details-grid">
                    <motion.div
                        className="details-card"
                        whileHover={{ y: -10 }}
                    >
                        <h3>El Escneario</h3>
                        <p>Rodeado de vegetación exuberante y una iluminación cuidadosamente diseñada, cada rincón de nuestro jardín cuenta una historia.</p>
                    </motion.div>
                    <motion.div
                        className="details-card"
                        whileHover={{ y: -10 }}
                    >
                        <h3>Momentos</h3>
                        <p>Desde almuerzos bañados por el sol hasta cenas mágicas bajo las estrellas. El Jardín se adapta a cada momento del día.</p>
                    </motion.div>
                </div>

                <div className="jardin-location-card">
                    <MapPin size={32} className="icon" />
                    <div>
                        <h2>Visítanos</h2>
                        <p>Calle de Arturo Soria 126, 28043 Madrid</p>
                        <a href="https://maps.google.com" target="_blank" className="btn-link">Ver en Google Maps</a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default JardinExperience;
