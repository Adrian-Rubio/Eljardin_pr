import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    const links = [
        { name: 'EL JARDÍN DE ARTURO SORIA', path: '/' },
        { name: 'CARTAS', path: '/menu' },
        { name: 'EVENTOS', path: '/events' },
        { name: 'PRENSA', path: '/press' },
    ];

    return (
        <nav className="navbar">
            <div className="nav-logo">
                <Link to="/" onClick={() => setIsOpen(false)}>
                    <img
                        src="/images/logo_jardin.png"
                        alt="El Jardín de Arturo Soria"
                        style={{ height: '70px', width: 'auto' }}
                    />
                </Link>
            </div>

            {/* Desktop Links & Reserve */}
            <div className="nav-right desktop-only">
                <ul className="nav-links">
                    {links.map(link => (
                        <li key={link.path}>
                            <Link to={link.path}>{link.name}</Link>
                        </li>
                    ))}
                </ul>
                <Link to="/reservations" className="btn-reserve">
                    RESERVAR
                </Link>
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
                            <li>
                                <Link
                                    to="/reservations"
                                    className="btn-reserve"
                                    onClick={() => setIsOpen(false)}
                                    style={{ textAlign: 'center', marginTop: '1rem' }}
                                >
                                    RESERVAR
                                </Link>
                            </li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav >
    );
};

export default Navbar;

