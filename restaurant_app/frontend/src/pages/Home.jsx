import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useConfig } from '../context/ConfigContext';
import { motion, AnimatePresence } from 'framer-motion';

const Home = () => {
    const { siteConfig } = useConfig();
    const [activeFaq, setActiveFaq] = useState(null);

    const faqs = [
        {
            question: "¿Cómo puedo realizar una reserva?",
            answer: "Puede reservar su mesa a través de nuestra sección de reservas online o llamándonos directamente."
        },
        {
            question: "Nuestro compromiso con la calidad",
            answer: "En El Jardín de Arturo Soria, seleccionamos cada ingrediente con rigor."
        }
    ];

    const dishes = [
        { id: 1, img: "/images/dish1.png" },
        { id: 2, img: "/images/dish2.png" },
        { id: 3, img: "/images/dish3.png" },
        { id: 4, img: "/images/dish4.png" },
    ];

    const toggleFaq = (index) => {
        setActiveFaq(activeFaq === index ? null : index);
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.8, ease: [0.6, 0.05, 0.1, 0.9] }
        }
    };

    return (
        <motion.div
            className="home-page"
            initial="hidden"
            animate="visible"
            variants={{ visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
        >
            {/* 1. HERO FULL WIDTH */}
            <section className="hero-full">
                <img src="/images/jardin-hero.png" alt="El Jardín de Arturo Soria" />
            </section>

            {/* 2. DISH GALLERY */}
            <section className="dish-gallery">
                {dishes.map(dish => (
                    <div key={dish.id} className="gallery-item">
                        <img src={dish.img} alt={`Plato ${dish.id}`} />
                    </div>
                ))}
            </section>

            {/* 3. IDENTITY SECTION (BENEDETTI) */}
            <section className="identity-section">
                <div className="identity-left">
                    <img src="/images/award_prize.png" alt="Premio Hot Concepts" />
                </div>
                <div className="identity-right">
                    <h2 className="section-title">El Jardín de Arturo Soria</h2>
                    <div className="benedetti-quote">
                        <p>“El alma no crece en los árboles;<br />
                            sin embargo, se nutre de nuestro entorno,<br />
                            como el cuerpo de la comida.<br />
                            El alma necesita ser alimentada<br />
                            con visiones hermosas,<br />
                            palabras que llenen…<br />
                            o por quién sabe besar el alma.”</p>
                    </div>
                    <p className="benedetti-author">MARIO BENEDETTI</p>
                </div>
            </section>

            {/* 4. VIDEO SECTION */}
            <section className="video-section">
                <h2 className="section-title" style={{ fontSize: '2.5rem' }}>
                    Descubre un día en<br />
                    El Jardín de Arturo Soria
                </h2>
                <div className="video-container">
                    <div className="play-button">
                        <div className="play-icon"></div>
                    </div>
                </div>
            </section>

            {/* 5. TEXT BLOCK */}
            <section className="text-block-centered">
                <h2>Un Jardín oculto dentro de Madrid</h2>
                <p>
                    A través de una cocina tradicional y respetando nuestras raíces, trabajamos sobre un único objetivo: sorprender a tu paladar con los mejores productos y técnicas culinarias.
                    En El Jardín de Arturo Soria descubrirás un rincón dentro del corazón de Madrid que no te dejará indiferente. Salones privados, terrazas techadas, espacios Chill-out y nuestro increíble y mágico Jardín...
                </p>
            </section>

            {/* FAQ Section */}
            <section className="faq-section" style={{ padding: '4rem 2rem' }}>
                <div className="faq-grid">
                    <div className="faq-header">
                        <h2>FAQ'S</h2>
                        <p>Respuestas a tus dudas más comunes.</p>
                    </div>
                    <div className="faq-list">
                        {faqs.map((faq, index) => (
                            <div key={index} className={`faq-item ${activeFaq === index ? 'active' : ''}`}>
                                <button className="faq-question" onClick={() => toggleFaq(index)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', padding: '1rem 0', textAlign: 'left' }}>
                                    {faq.question}
                                    <Plus size={24} />
                                </button>
                                <AnimatePresence>
                                    {activeFaq === index && (
                                        <motion.div
                                            className="faq-answer"
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            style={{ overflow: 'hidden' }}
                                        >
                                            <p style={{ paddingBottom: '1rem', color: 'var(--text-muted)' }}>{faq.answer}</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </motion.div>
    );
};

export default Home;
