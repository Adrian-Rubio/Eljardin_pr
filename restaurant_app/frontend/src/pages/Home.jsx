import { useState, useEffect } from 'react';
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useConfig } from '../context/ConfigContext';
import { motion, AnimatePresence } from 'framer-motion';
import EditableText from '../components/Editable/EditableText';

const Home = () => {
    const { siteConfig } = useConfig();
    const [activeFaq, setActiveFaq] = useState(null);
    const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
    const [galleryIndex, setGalleryIndex] = useState(0);

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

    // Carousel Images
    const heroImages = [
        "/images/imagenes%20genéricas/Alma-39.jpg",
        "/images/imagenes%20genéricas/Alma-4.jpg",
        "/images/imagenes%20genéricas/Alma-41.jpg",
        "/images/imagenes%20genéricas/JAS-111.jpg",
        "/images/imagenes%20genéricas/JAS-82-1.jpg"
    ];

    // Dish Gallery Images
    const dishes = [
        { id: 1, img: "/images/platos/Alma-34.jpg" },
        { id: 2, img: "/images/platos/Alma-52.jpg" },
        { id: 3, img: "/images/platos/Alma-7.jpg" },
        { id: 4, img: "/images/platos/JAS-2.jpg" },
        { id: 5, img: "/images/platos/JAS-59.jpg" },
        { id: 6, img: "/images/platos/JDAS-26.jpg" },
        { id: 7, img: "/images/platos/JDAS-15.jpg" },
        { id: 8, img: "/images/platos/JDAS-71.jpg" },
        { id: 9, img: "/images/platos/JAS-62.jpg" },
    ];

    const nextGallery = () => {
        setGalleryIndex((prev) => (prev + 1) % (dishes.length - 3));
    };

    const prevGallery = () => {
        setGalleryIndex((prev) => (prev === 0 ? dishes.length - 4 : prev - 1));
    };

    const visibleDishes = dishes.slice(galleryIndex, galleryIndex + 4);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentHeroIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
        }, 8000); // Slower: Change image every 8 seconds

        return () => clearInterval(interval);
    }, [heroImages.length]);

    const toggleFaq = (index) => {
        setActiveFaq(activeFaq === index ? null : index);
    };

    return (
        <motion.div
            className="home-page"
            initial="hidden"
            animate="visible"
            variants={{ visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
        >
            {/* 1. HERO FULL WIDTH (CAROUSEL) */}
            <section className="hero-full" style={{ position: 'relative' }}>
                <AnimatePresence initial={false}>
                    <motion.img
                        key={currentHeroIndex}
                        src={heroImages[currentHeroIndex]}
                        alt="El Jardín de Arturo Soria - Ambiente"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 2.5, ease: "linear" }}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                        }}
                    />
                </AnimatePresence>
            </section>

            {/* 2. DISH GALLERY WITH ARROWS */}
            <section className="dish-gallery-slider">
                <button className="slider-arrow left" onClick={prevGallery}>
                    <ChevronLeft size={32} />
                </button>
                <div className="dish-gallery">
                    <AnimatePresence mode="popLayout" initial={false}>
                        {visibleDishes.map(dish => (
                            <motion.div
                                key={dish.id}
                                className="gallery-item"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.5 }}
                            >
                                <img src={dish.img} alt={`Plato El Jardín ${dish.id}`} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
                <button className="slider-arrow right" onClick={nextGallery}>
                    <ChevronRight size={32} />
                </button>
            </section>

            {/* 3. IDENTITY SECTION (BENEDETTI) */}
            <section className="identity-section">
                <div className="identity-left">
                    <img src="/images/HotConcepts.png" alt="Premio Hot Concepts Ganador 2021" />
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
                <EditableText
                    configKey="video_title"
                    tag="h2"
                    className="section-title"
                    style={{ fontSize: '2.5rem' }}
                    renderValue={(val) => val || "Descubre un día en\nEl Jardín de Arturo Soria"}
                />
                <div className="video-container">
                    {/* Placeholder for real video, styled better */}
                    <div className="video-overlay" style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.1)', zIndex: 1 }}></div>
                    <img src="/images/imagenes%20genéricas/JAS-111.jpg" alt="Video Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div className="play-button" onClick={() => window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank')}>
                        <div className="play-icon"></div>
                    </div>
                </div>
            </section>

            {/* 5. TEXT BLOCK */}
            <section className="text-block-centered">
                <EditableText
                    configKey="garden_text_title"
                    tag="h2"
                    renderValue={(val) => val || "Un Jardín oculto dentro de Madrid"}
                />
                <EditableText
                    configKey="garden_text_p"
                    tag="p"
                    renderValue={(val) => val || "A través de una cocina tradicional y respetando nuestras raíces, trabajamos sobre un único objetivo: sorprender a tu paladar con los mejores productos y técnicas culinarias.\nEn El Jardín de Arturo Soria descubrirás un rincón dentro del corazón de Madrid que no te dejará indiferente. Salones privados, terrazas techadas, espacios Chill-out y nuestro increíble y mágico Jardín..."}
                />
            </section>

            {/* FAQ Section */}
            <section className="faq-section" style={{ padding: '4rem 2rem' }}>
                <div className="faq-grid">
                    <div className="faq-header">
                        <EditableText configKey="faq_title" tag="h2" renderValue={(val) => val || "FAQ'S"} />
                        <EditableText configKey="faq_subtitle" tag="p" renderValue={(val) => val || "Respuestas a tus dudas más comunes."} />
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
