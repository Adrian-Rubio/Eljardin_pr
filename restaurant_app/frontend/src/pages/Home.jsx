import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useConfig } from '../context/ConfigContext';
import MarqueeBanner from '../components/MarqueeBanner';
import { motion, AnimatePresence } from 'framer-motion';

const Home = () => {
    const { siteConfig } = useConfig();
    const [activeFaq, setActiveFaq] = useState(null);

    const faqs = [
        {
            question: "¿Cómo puedo realizar una reserva?",
            answer: "Puede reservar su mesa a través de nuestra sección de reservas online o llamándonos directamente. Para grupos grandes, recomendamos la reserva telefónica para asegurar la mejor ubicación."
        },
        {
            question: "Nuestro compromiso con la calidad",
            answer: "En El Jardín de Arturo Soria, seleccionamos cada ingrediente con rigor. Desde nuestros arroces 'Molino Roca' hasta nuestras carnes de alta maduración, la calidad es nuestra esencia."
        },
        {
            question: "Alérgenos e intolerancias",
            answer: "Su bienestar es nuestra prioridad. Disponemos de fichas técnicas de cada plato. Por favor, comunique cualquier alergia a nuestro personal para que podamos ofrecerle la mejor experiencia adaptada."
        },
        {
            question: "Ambiente y Experiencia",
            answer: "Ofrecemos un entorno sofisticado y natural, ideal para cenas íntimas, encuentros familiares o eventos corporativos en un oasis botánico en el corazón de Arturo Soria."
        },
        {
            question: "Celebraciones y Eventos Especiales",
            answer: "Contamos con espacios versátiles y menús personalizados para que sus eventos sean inolvidables. Contacte con nuestro equipo de eventos para más información."
        }
    ];

    const toggleFaq = (index) => {
        setActiveFaq(activeFaq === index ? null : index);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: [0.6, 0.05, 0.1, 0.9]
            }
        }
    };

    const carouselImages = [
        "/images/jardin-hero.png",
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        if (carouselImages.length <= 1) return;
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [carouselImages.length]);

    return (
        <motion.div
            className="home-page"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <MarqueeBanner />

            <section className="hero">
                <div className="hero-left">
                    <div className="hero-carousel" style={{ position: 'relative', height: '100%', width: '100%' }}>
                        {carouselImages.map((img, idx) => (
                            <motion.img
                                key={idx}
                                src={img}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: idx === currentSlide ? 1 : 0 }}
                                transition={{ duration: 1 }}
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover'
                                }}
                                alt="El Jardín"
                            />
                        ))}
                    </div>
                </div>

                <div className="hero-right">
                    <div className="hero-content-inner">
                        <motion.h1 className="hero-title-main" variants={itemVariants}>
                            El Jardín de Arturo Soria
                        </motion.h1>

                        <motion.div className="benedetti-quote" variants={itemVariants}>
                            <p>“El alma no crece en los árboles;<br />
                                sin embargo, se nutre de nuestro entorno,<br />
                                como el cuerpo de la comida.<br />
                                El alma necesita ser alimentada<br />
                                con visiones hermosas,<br />
                                palabras que llenen…<br />
                                o por quién sabe besar el alma.”</p>
                        </motion.div>

                        <motion.p className="benedetti-author" variants={itemVariants}>
                            MARIO BENEDETTI
                        </motion.p>

                        <motion.div className="hero-actions" variants={itemVariants} style={{ marginTop: '3rem', display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
                            <Link to="/menu" className="btn-primary">Ver la Carta</Link>
                            <Link to="/reservations" className="btn-secondary">Reservar Mesa</Link>
                        </motion.div>
                    </div>

                    <motion.div
                        className="hero-badge"
                        initial={{ rotate: 0, scale: 0 }}
                        animate={{ rotate: 15, scale: 1 }}
                        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                    >
                        <span>NEW</span>
                        <strong>OPEN!</strong>
                    </motion.div>
                </div>
            </section>

            <motion.section
                className="faq-section"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                style={{ padding: '4rem 2rem' }}
            >
                <div className="faq-grid">
                    <div className="faq-header">
                        <h2>FAQ'S</h2>
                        <p>Sabemos que tienes dudas, y como no nos gusta dejarte en visto, aquí van las respuestas. Léelas, asimílalas y si todavía te queda alguna, pregúntanos sin miedo.</p>
                    </div>
                    <div className="faq-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {faqs.map((faq, index) => (
                            <motion.div
                                key={index}
                                className={`faq-item ${activeFaq === index ? 'active' : ''}`}
                                variants={itemVariants}
                            >
                                <button className="faq-question" onClick={() => toggleFaq(index)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', padding: '1rem 0', textAlign: 'left' }}>
                                    {faq.question}
                                    <Plus className="faq-icon" size={24} />
                                </button>
                                <AnimatePresence>
                                    {activeFaq === index && (
                                        <motion.div
                                            className="faq-answer"
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            style={{ overflow: 'hidden' }}
                                        >
                                            <p style={{ paddingBottom: '1rem', color: 'var(--text-muted)' }}>{faq.answer}</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>
        </motion.div>
    );
};

export default Home;
