import { useState, useEffect } from 'react';
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useConfig } from '../context/ConfigContext';
import { motion, AnimatePresence } from 'framer-motion';
import EditableText from '../components/Editable/EditableText';

const Home = () => {
    const { siteConfig } = useConfig();
    const location = useLocation();
    const [activeFaq, setActiveFaq] = useState(null);

    const scrollToCoverManager = () => {
        document.getElementById('covermanager-section')?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (location.state?.scrollTo === 'covermanager-section') {
            setTimeout(() => {
                document.getElementById('covermanager-section')?.scrollIntoView({ behavior: 'smooth' });
            }, 300);
        }
    }, [location.state]);
    const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
    const [galleryIndex, setGalleryIndex] = useState(0);

    // Carruseles por espacio (índice activo de cada uno)
    const [espacioIndex, setEspacioIndex] = useState({ 0: 0, 1: 0, 2: 0, 3: 0 });

    const faqs = [
        {
            question: "¿Cuál es el horario de apertura del restaurante?",
            answer: ""
        },
        {
            question: "¿Dónde está ubicado?",
            answer: ""
        },
        {
            question: "¿Es necesario reservar antes de venir?",
            answer: ""
        },
        {
            question: "¿Ofrecéis menús especiales o para grupos?",
            answer: ""
        },
        {
            question: "¿Disponéis de espacios al aire libre y zonas chill-out?",
            answer: ""
        },
        {
            question: "¿Aceptáis eventos privados o celebraciones (bodas, cumpleaños, empresas)?",
            answer: ""
        },
        {
            question: "¿Disponéis de aparcamiento?",
            answer: ""
        },
        {
            question: "¿Tenéis opciones vegetarianas, veganas o sin gluten?",
            answer: ""
        },
        {
            question: "¿Disponéis de servicio Take Away o delivery?",
            answer: ""
        },
        {
            question: "¿Es El Jardín de Arturo Soria apto mascotas?",
            answer: ""
        }
    ];

    // Hero Carousel — mantener Alma-39.jpg + 4 nuevas imágenes
    // NOTA: colocar las imágenes del banner en /public/images/banner/
    const heroImages = [
        "/images/banner/Banner%20Home%201.jpg",
        "/images/banner/Banner%20home%202.jpg",
        "/images/banner/banner%20home%203.jpg",
        "/images/banner/banner%20home%204.jpg",
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

    // Espacios — PENDIENTE: añadir fotos reales cuando las proporcione marketing
    const espacios = [
        {
            titulo: "Chill Out",
            fotos: [
                "/images/espacios/chillout-1.jpg",
                "/images/espacios/chillout-2.jpg",
                "/images/espacios/chillout-3.jpg",
            ]
        },
        {
            titulo: "Salón Principal",
            fotos: [
                "/images/espacios/salon-1.jpg",
                "/images/espacios/salon-2.jpg",
                "/images/espacios/salon-3.jpg",
            ]
        },
        {
            titulo: "Terraza Techada",
            fotos: [
                "/images/espacios/terraza-1.jpg",
                "/images/espacios/terraza-2.jpg",
                "/images/espacios/terraza-3.jpg",
            ]
        },
        {
            titulo: "Jardín",
            fotos: [
                "/images/espacios/jardin-1.jpg",
                "/images/espacios/jardin-2.jpg",
                "/images/espacios/jardin-3.jpg",
            ]
        }
    ];

    const nextGallery = () => {
        setGalleryIndex((prev) => (prev + 1) % (dishes.length - 3));
    };

    const prevGallery = () => {
        setGalleryIndex((prev) => (prev === 0 ? dishes.length - 4 : prev - 1));
    };

    const visibleDishes = dishes.slice(galleryIndex, galleryIndex + 4);

    const nextHero = () => {
        setCurrentHeroIndex((prev) => (prev + 1) % heroImages.length);
    };

    const prevHero = () => {
        setCurrentHeroIndex((prev) => (prev === 0 ? heroImages.length - 1 : prev - 1));
    };

    const nextEspacio = (idx) => {
        setEspacioIndex(prev => ({
            ...prev,
            [idx]: (prev[idx] + 1) % espacios[idx].fotos.length
        }));
    };

    const prevEspacio = (idx) => {
        setEspacioIndex(prev => ({
            ...prev,
            [idx]: prev[idx] === 0 ? espacios[idx].fotos.length - 1 : prev[idx] - 1
        }));
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentHeroIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
        }, 8000);
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
            {/* 1. HERO FULL WIDTH (CAROUSEL) con flechas */}
            <section className="hero-full" style={{ position: 'relative' }}>
                <AnimatePresence initial={false}>
                    <motion.img
                        key={currentHeroIndex}
                        src={heroImages[currentHeroIndex]}
                        alt="El Jardín de Arturo Soria - Ambiente"
                        loading={currentHeroIndex === 0 ? 'eager' : 'lazy'}
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

                {/* Flecha izquierda */}
                <button
                    onClick={prevHero}
                    style={{
                        position: 'absolute',
                        left: '1.5rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        zIndex: 10,
                        background: 'rgba(0,0,0,0.35)',
                        border: 'none',
                        borderRadius: '50%',
                        width: '48px',
                        height: '48px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        color: '#fff',
                        transition: 'background 0.2s'
                    }}
                    aria-label="Imagen anterior"
                >
                    <ChevronLeft size={28} />
                </button>

                {/* Flecha derecha */}
                <button
                    onClick={nextHero}
                    style={{
                        position: 'absolute',
                        right: '1.5rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        zIndex: 10,
                        background: 'rgba(0,0,0,0.35)',
                        border: 'none',
                        borderRadius: '50%',
                        width: '48px',
                        height: '48px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        color: '#fff',
                        transition: 'background 0.2s'
                    }}
                    aria-label="Imagen siguiente"
                >
                    <ChevronRight size={28} />
                </button>

                {/* Puntos indicadores */}
                <div style={{
                    position: 'absolute',
                    bottom: '1.5rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    gap: '8px',
                    zIndex: 10
                }}>
                    {heroImages.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentHeroIndex(i)}
                            style={{
                                width: i === currentHeroIndex ? '24px' : '8px',
                                height: '8px',
                                borderRadius: '4px',
                                background: i === currentHeroIndex ? '#c5a04f' : 'rgba(255,255,255,0.6)',
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'all 0.3s',
                                padding: 0
                            }}
                            aria-label={`Ir a imagen ${i + 1}`}
                        />
                    ))}
                </div>
            </section>

            {/* 2. TÍTULO + DISH GALLERY WITH ARROWS */}
            <div style={{ textAlign: 'center', padding: '3rem 2rem 1rem' }}>
                <h2 style={{ fontSize: '1.8rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    Nuestra oferta gastronómica
                </h2>
            </div>
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
                                <img src={dish.img} alt={`Plato El Jardín ${dish.id}`} loading="lazy" />
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
                    <img src="/images/HotConcepts.png" alt="Premio Hot Concepts Ganador 2021" loading="lazy" />
                </div>
                <div className="identity-right">
                    <h2 className="section-title">El Jardín de Arturo Soria</h2>
                    <div className="benedetti-quote">
                        <p>"El alma no crece en los árboles;<br />
                            sin embargo, se nutre de nuestro entorno,<br />
                            como el cuerpo de la comida.<br />
                            El alma necesita ser alimentada<br />
                            con visiones hermosas,<br />
                            palabras que llenen…<br />
                            o por quién sabe besar el alma."</p>
                    </div>
                    <p className="benedetti-author">MARIO BENEDETTI</p>
                </div>
            </section>

            {/* 4. CONOCE NUESTROS ESPACIOS (reemplaza sección vídeo) */}
            <section style={{ padding: '4rem 2rem', background: '#faf9f7' }}>
                <h2 style={{ textAlign: 'center', fontSize: '1.8rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '3rem' }}>
                    Conoce nuestros espacios
                </h2>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                    gap: '2rem',
                    maxWidth: '1200px',
                    margin: '0 auto'
                }}>
                    {espacios.map((espacio, idx) => (
                        <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                            <h3 style={{ fontSize: '1rem', letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0 }}>
                                {espacio.titulo}
                            </h3>
                            <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', overflow: 'hidden', borderRadius: '4px' }}>
                                <AnimatePresence initial={false}>
                                    <motion.img
                                        key={espacioIndex[idx]}
                                        src={espacio.fotos[espacioIndex[idx]]}
                                        alt={`${espacio.titulo} - foto ${espacioIndex[idx] + 1}`}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.6 }}
                                        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                                        loading="lazy"
                                        onError={(e) => { e.target.style.background = '#e0ddd8'; e.target.src = ''; }}
                                    />
                                </AnimatePresence>
                                {espacio.fotos.length > 1 && (
                                    <>
                                        <button
                                            onClick={() => prevEspacio(idx)}
                                            style={{
                                                position: 'absolute', left: '0.5rem', top: '50%', transform: 'translateY(-50%)',
                                                zIndex: 5, background: 'rgba(0,0,0,0.3)', border: 'none', borderRadius: '50%',
                                                width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                cursor: 'pointer', color: '#fff'
                                            }}
                                        >
                                            <ChevronLeft size={18} />
                                        </button>
                                        <button
                                            onClick={() => nextEspacio(idx)}
                                            style={{
                                                position: 'absolute', right: '0.5rem', top: '50%', transform: 'translateY(-50%)',
                                                zIndex: 5, background: 'rgba(0,0,0,0.3)', border: 'none', borderRadius: '50%',
                                                width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                cursor: 'pointer', color: '#fff'
                                            }}
                                        >
                                            <ChevronRight size={18} />
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 5. SECCIÓN RESERVAS / EVENTOS (2 bloques) */}
            <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '420px' }}>
                {/* Bloque Reservas */}
                <div
                    onClick={scrollToCoverManager}
                    style={{ position: 'relative', display: 'block', overflow: 'hidden', textDecoration: 'none', cursor: 'pointer' }}
                >
                    <img
                        src="/images/imagenes%20genéricas/JAS-111.jpg"
                        alt="Reservas"
                        loading="lazy"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s' }}
                        onMouseOver={e => e.currentTarget.style.transform = 'scale(1.04)'}
                        onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                    />
                    <div style={{
                        position: 'absolute', inset: 0,
                        background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 100%)',
                        display: 'flex', alignItems: 'flex-end', justifyContent: 'center', padding: '2.5rem'
                    }}>
                        <h2 style={{ color: '#fff', fontSize: '2rem', letterSpacing: '0.15em', textTransform: 'uppercase', margin: 0 }}>
                            Reservas
                        </h2>
                    </div>
                </div>

                {/* Bloque Eventos */}
                <Link
                    to="/events"
                    style={{ position: 'relative', display: 'block', overflow: 'hidden', textDecoration: 'none' }}
                >
                    <img
                        src="/images/imagenes%20genéricas/Alma-41.jpg"
                        alt="Eventos"
                        loading="lazy"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s' }}
                        onMouseOver={e => e.currentTarget.style.transform = 'scale(1.04)'}
                        onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                    />
                    <div style={{
                        position: 'absolute', inset: 0,
                        background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 100%)',
                        display: 'flex', alignItems: 'flex-end', justifyContent: 'center', padding: '2.5rem'
                    }}>
                        <h2 style={{ color: '#fff', fontSize: '2rem', letterSpacing: '0.15em', textTransform: 'uppercase', margin: 0 }}>
                            Eventos
                        </h2>
                    </div>
                </Link>
            </section>

            {/* 6. TEXT BLOCK */}
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

            {/* 7. FAQ Section */}
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
                                            <p style={{ paddingBottom: '1rem', color: 'var(--text-muted)' }}>
                                                {faq.answer || "Próximamente."}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 8. COVERMANAGER — Formulario de reservas */}
            <section id="covermanager-section" style={{ padding: '4rem 2rem', background: '#faf9f7', textAlign: 'center' }}>
                <h2 style={{ fontSize: '1.8rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '2rem' }}>
                    Reserva tu mesa
                </h2>
                <div style={{ maxWidth: '900px', margin: '0 auto', borderRadius: '4px', overflow: 'hidden' }}>
                    <iframe
                        src="https://www.covermanager.com/reserve/module_restaurant/restaurante-el-jardin-de-alma/spanish"
                        width="100%"
                        height="600"
                        frameBorder="0"
                        title="Reservar mesa - El Jardín de Arturo Soria"
                        style={{ display: 'block' }}
                    />
                </div>
            </section>
        </motion.div>
    );
};

export default Home;
