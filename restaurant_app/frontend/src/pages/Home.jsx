import { useState } from 'react';
import { ArrowRight, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useConfig } from '../context/ConfigContext';
import MarqueeBanner from '../components/MarqueeBanner';
import EditableText from '../components/Editable/EditableText';
import EditableImage from '../components/Editable/EditableImage';
import EditableButton from '../components/Editable/EditableButton';
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

    return (
        <motion.div
            className="home-page"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <MarqueeBanner />

            <section className="hero">
                <motion.div className="hero-content" variants={itemVariants}>
                    <EditableText
                        configKey="welcomeTitle"
                        tag="h2"
                        className="fade-in"
                        renderValue={(val) => {
                            const words = (val || "").split(' ');
                            if (words.length > 1) {
                                return (
                                    <>
                                        <span>{words[0]}</span> {words.slice(1).join(' ')}
                                    </>
                                );
                            }
                            return val;
                        }}
                    />
                    <EditableText
                        configKey="welcomeSubtitle"
                        tag="p"
                        className="fade-in-delay"
                    />
                    <motion.div className="hero-actions" variants={itemVariants}>
                        <EditableButton
                            configKey="heroBtn1"
                            defaultText="Ver la Carta"
                            defaultLink="/menu"
                            className="btn-primary"
                        />
                        <EditableButton
                            configKey="heroBtn2"
                            defaultText="Reservar Mesa"
                            defaultLink="/reservations"
                            className="btn-secondary"
                        />
                    </motion.div>
                </motion.div>

                <motion.div
                    className="hero-image-container"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <EditableImage
                        configKey="heroImage"
                        defaultSrc="/images/jardin-hero.png"
                        alt="El Jardín de Arturo Soria Interior"
                        className="hero-image"
                    />
                    <motion.div
                        className="hero-badge"
                        initial={{ rotate: 0, scale: 0 }}
                        animate={{ rotate: 15, scale: 1 }}
                        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                    >
                        <span>NEW</span>
                        <strong>OPEN!</strong>
                    </motion.div>
                </motion.div>
            </section>

            <motion.section
                className="faq-section"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <div className="faq-grid">
                    <div className="faq-header">
                        <h2>FAQ'S</h2>
                        <p>Sabemos que tienes dudas, y como no nos gusta dejarte en visto, aquí van las respuestas. Léelas, asimílalas y si todavía te queda alguna, pregúntanos sin miedo.</p>
                    </div>
                    <div className="faq-list">
                        {faqs.map((faq, index) => (
                            <motion.div
                                key={index}
                                className={`faq-item ${activeFaq === index ? 'active' : ''}`}
                                variants={itemVariants}
                            >
                                <button className="faq-question" onClick={() => toggleFaq(index)}>
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
                                        >
                                            <p>{faq.answer}</p>
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

