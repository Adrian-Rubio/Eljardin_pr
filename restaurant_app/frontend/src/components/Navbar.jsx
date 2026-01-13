import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    const links = [
        { name: 'Inicio', path: '/' },
        { name: 'Nuestra Carta', path: '/menu' },
        { name: 'Reservaciones', path: '/reservations' },
        { name: 'Eventos Privados', path: '/events' },
        { name: 'El Jardín', path: '/jardin-experience' },
    ];

    return (
        <nav className="navbar">
            <div className="nav-logo">
                <Link to="/" onClick={() => setIsOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
                    <span style={{
                        fontFamily: 'var(--font-primary)',
                        fontSize: '1.5rem',
                        fontWeight: '700',
                        color: 'var(--primary)',
                        letterSpacing: '1px'
                    }}>
                        EL JARDÍN
                    </span>
                    <span style={{
                        fontSize: '0.7rem',
                        fontWeight: '400',
                        color: 'var(--text-muted)',
                        letterSpacing: '3px',
                        marginTop: '4px'
                    }}>
                        DE ARTURO SORIA
                    </span>
                </Link>
            </div>

            {/* Desktop Links */}
            <ul className="nav-links desktop-only">
                {links.map(link => (
                    <li key={link.path}>
                        <Link to={link.path}>{link.name}</Link>
                    </li>
                ))}
            </ul>

            {/* Mobile Toggle */}
            <button className="mobile-toggle" onClick={toggleMenu}>
                {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="mobile-menu"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ul className="mobile-nav-links">
                            {links.map(link => (
                                <li key={link.path}>
                                    <Link to={link.path} onClick={() => setIsOpen(false)}>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav >
    );
};

export default Navbar;

