import { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import EditableText from '../components/Editable/EditableText';
import { motion, AnimatePresence } from 'framer-motion';
import MenuCard from '../components/MenuCard';

const API_URL = import.meta.env.VITE_API_URL || 'http://192.168.0.221:8000';

const ALLERGEN_ICONS = {
    "Gluten": "/icons/simbolo-alergeno-cereales.png",
    "Lácteos": "/icons/simbolo-alergeno-lacteos.png",
    "Huevos": "/icons/simbolo-alergeno-huevos.png",
    "Soja": "/icons/simbolo-alergeno-soja.png",
    "Mostaza": "/icons/simbolo-alergeno-mostaza.png",
    "Pescado": "/icons/simbolo-pescado-alergenos.png",
    "Crustáceos": "/icons/simbolo-alergeno-crustaceo.png",
    "Moluscos": "/icons/simbolo-alergeno-moluscos.png",
    "Apio": "/icons/simbolo-alergeno-apio.png",
    "Frutos de Cáscara": "/icons/simbolo-alergeno-frutos-secos.png",
    "Dióxido de Azufre y Sulfitos": "/icons/simbolo-alergeno-sulfitos.png",
    "Altramuces": "/icons/simbolo-alergeno-altramuz.png",
    "Sésamo": "/icons/simbolo-alergeno-sesamopng.png",
    "Cacahuetes": "/icons/simbolo-alergeno-cacahuetes.png"
};

const PREFERRED_ORDER = [
    'BOCADOS PARA EMPEZAR',
    'PAN Y APERITIVO',
    'NUESTROS ARROCES PARA COMPARTIR',
    'ALMA CARNÍVORA',
    'ALMA MARINERA',
    'GUARNICIONES',
    'ALMA PASTELERA',
    'TINTOS DOP MADRID Y SIERRA DE GREDOS',
    'TINTOS DOCA RIOJA',
    'DOP RIBERA DEL DUERO',
    'BLANCOS. DO RUEDA',
    'BLANCOS DO RÍAS BAIXAS',
    'COCTELES',
    'GIN'
];

const Menu = () => {
    const { type } = useParams();
    const [activeCategory, setActiveCategory] = useState('');
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const filteredItems = useMemo(() => {
        if (!type) return items;
        if (type === 'vinos') {
            return items.filter(item =>
                (item.category || '').toUpperCase().includes('TINTOS') ||
                (item.category || '').toUpperCase().includes('BLANCOS') ||
                (item.category || '').toUpperCase().includes('CAVAS')
            );
        }
        if (type === 'cocteles') {
            return items.filter(item =>
                (item.category || '').toUpperCase().includes('COCTELES') ||
                (item.category || '').toUpperCase().includes('GIN') ||
                (item.category || '').toUpperCase().includes('RON')
            );
        }
        if (type === 'carta') {
            return items.filter(item =>
                !(item.category || '').toUpperCase().includes('TINTOS') &&
                !(item.category || '').toUpperCase().includes('BLANCOS') &&
                !(item.category || '').toUpperCase().includes('COCTELES') &&
                !(item.category || '').toUpperCase().includes('GIN')
            );
        }
        return items;
    }, [items, type]);

    const categories = useMemo(() => {
        if (!Array.isArray(filteredItems) || !filteredItems.length) return [];
        const uniqueCats = [...new Set(filteredItems.map(item => (item.category || "VARIOS").trim().toUpperCase()))];
        return uniqueCats.sort((a, b) => {
            const indexA = PREFERRED_ORDER.indexOf(a);
            const indexB = PREFERRED_ORDER.indexOf(b);
            if (indexA !== -1 && indexB !== -1) return indexA - indexB;
            if (indexA !== -1) return -1;
            if (indexB !== -1) return 1;
            return a.localeCompare(b);
        });
    }, [filteredItems]);

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const res = await axios.get(`${API_URL}/menu`);
                setItems(Array.isArray(res.data) ? res.data : []);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching menu", err);
                setLoading(false);
            }
        };
        fetchMenu();
    }, []);

    useEffect(() => {
        if (categories.length > 0) {
            setActiveCategory(categories[0]);
        }
    }, [categories]);

    const formatPrice = (price) => {
        if (price === undefined || price === null || isNaN(price)) return '0,00 €';
        return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(price);
    };

    if (loading) return (
        <div className="loading-container">
            <div className="loader"></div>
            <p>Cargando sabores...</p>
        </div>
    );

    return (
        <div className="menu-page">
            <div className="page-header" style={{ textAlign: 'center', padding: '60px 0' }}>
                <span style={{ fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--primary)', marginBottom: '10px', display: 'block' }}>
                    {type ? type.replace('-', ' ') : 'Nuestra Proposición'}
                </span>
                <EditableText
                    configKey={`menu_title_${type || 'default'}`}
                    tag="h1"
                    className="menu-title-large"
                    style={{ fontSize: '3.5rem', fontFamily: 'var(--font-primary)', fontWeight: '400' }}
                    renderValue={(val) => val || (type === 'vinos' ? 'Bodega El Jardín' : type === 'cocteles' ? 'Mixología' : 'La Carta')}
                />
                <div style={{ maxWidth: '600px', margin: '0 auto', borderBottom: '1px solid rgba(0,0,0,0.1)', paddingBottom: '30px' }}>
                    <EditableText
                        configKey={`menu_subtitle_${type || 'default'}`}
                        tag="p"
                        style={{ color: 'var(--text-muted)', fontSize: '14px', fontStyle: 'italic' }}
                        renderValue={(val) => val || 'Selección cuidada de ingredientes de proximidad y técnica vanguardista.'}
                    />
                </div>
            </div>

            <div className="category-tabs" style={{ display: 'flex', justifyContent: 'center', gap: '30px', margin: '40px 0', borderBottom: '1px solid #eee', paddingBottom: '20px' }}>
                {categories.map(cat => (
                    <button
                        key={cat}
                        className={activeCategory === cat ? 'active' : ''}
                        onClick={() => setActiveCategory(cat)}
                        style={{
                            background: 'none',
                            border: 'none',
                            fontSize: '11px',
                            letterSpacing: '0.2em',
                            textTransform: 'uppercase',
                            cursor: 'pointer',
                            color: activeCategory === cat ? 'var(--primary)' : '#999',
                            fontWeight: activeCategory === cat ? '600' : '400',
                            transition: 'all 0.3s'
                        }}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={`${type}-${activeCategory}`}
                    className="menu-grid"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
                        gap: '40px',
                        maxWidth: '1200px',
                        margin: '0 auto'
                    }}
                >
                    {filteredItems
                        .filter(item => (item.category || "VARIOS").trim().toUpperCase() === activeCategory.toUpperCase())
                        .map(item => (
                            <MenuCard
                                key={item.id}
                                item={item}
                                formatPrice={formatPrice}
                                ALLERGEN_ICONS={ALLERGEN_ICONS}
                                hideImage={true} // Premium look without images
                            />
                        ))}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default Menu;
