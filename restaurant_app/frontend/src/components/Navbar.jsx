import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Instagram, Facebook } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    const links = [
        { name: 'EL JARDÍN DE ARTURO SORIA', path: '/' },
        { name: 'CARTAS', path: '/menu' },
        { name: 'EVENTOS', path: '/events' },
        { name: 'PRENSA', path: '/press' },
        { name: 'RESTAURANTES GRUPO', path: '/grupo' },
    ];

    return (
        <nav className="navbar">
            <div className="nav-logo">
                <Link to="/" onClick={() => setIsOpen(false)}>
                    <img
                        src="/images/logo_jardin.png"
                        alt="El Jardín de Arturo Soria"
                        className="navbar-logo-img"
                    />
                </Link>
            </div>

            {/* Desktop Center Links */}
            <ul className="nav-links desktop-only">
                {links.map(link => (
                    <li key={link.path}>
                        <Link to={link.path}>{link.name}</Link>
                    </li>
                ))}
            </ul>

            {/* Desktop Right: Reserve & Socials */}
            <div className="nav-right desktop-only">
                <Link to="/reservations" className="btn-reserve-solid">
                    RESERVAR
                </Link>
                <div className="nav-social-icons">
                    <a href="https://instagram.com" target="_blank" rel="noreferrer"><Instagram size={20} /></a>
                    <a href="https://facebook.com" target="_blank" rel="noreferrer"><Facebook size={20} /></a>
                </div>
            </div>

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
                            <li style={{ marginTop: '1rem' }}>
                                <Link to="/reservations" className="btn-reserve-solid" onClick={() => setIsOpen(false)}>
                                    RESERVAR
                                </Link>
                            </li>
                            <li className="mobile-socials">
                                <Instagram size={24} />
                                <Facebook size={24} />
                            </li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav >
    );
};

export default Navbar;

