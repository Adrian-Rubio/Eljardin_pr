import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Instagram, Facebook } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isCartasOpen, setIsCartasOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const toggleMenu = () => setIsOpen(!isOpen);

    const handleReservar = () => {
        setIsOpen(false);
        if (location.pathname === '/') {
            document.getElementById('covermanager-section')?.scrollIntoView({ behavior: 'smooth' });
        } else {
            navigate('/', { state: { scrollTo: 'covermanager-section' } });
        }
    };

    const links = [
        { name: 'EL JARDÍN DE ARTURO SORIA', path: '/' },
        {
            name: 'CARTAS',
            path: '/menu',
            dropdown: [
                { name: 'Nuestra carta', path: '/menu/carta' },
                { name: 'Nuestros vinos', path: '/menu/vinos' },
            ]
        },
        { name: 'EVENTOS', path: '/events' },
    ];

    return (
        <nav className="navbar">
            <div className="nav-logo">
                <Link
                    to="/"
                    onClick={() => {
                        setIsOpen(false);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                >
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
                    <li
                        key={link.name}
                        className={link.dropdown ? 'has-dropdown' : ''}
                        onMouseEnter={() => link.dropdown && setIsCartasOpen(true)}
                        onMouseLeave={() => link.dropdown && setIsCartasOpen(false)}
                    >
                        {link.dropdown ? (
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    // Optional: clicking can still toggle or navigate if needed
                                    // but hover handles main interaction now
                                }}
                            >
                                {link.name}
                            </a>
                        ) : (
                            <Link to={link.path}>{link.name}</Link>
                        )}
                        {link.dropdown && isCartasOpen && (
                            <ul className="dropdown-menu">
                                {link.dropdown.map(subItem => (
                                    <li key={subItem.path}>
                                        <Link to={subItem.path} onClick={() => setIsCartasOpen(false)}>{subItem.name}</Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>

            {/* Desktop Right: Reserve & Socials */}
            <div className="nav-right desktop-only">
                <button onClick={handleReservar} className="btn-reserve-solid">
                    RESERVAR
                </button>
                <div className="nav-social-icons">
                    <a href="https://www.instagram.com/eljardindearturosoria/?hl=es" target="_blank" rel="noreferrer"><Instagram size={20} /></a>
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
                                    {link.dropdown ? (
                                        <>
                                            <a
                                                href="#"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setIsCartasOpen(!isCartasOpen);
                                                }}
                                            >
                                                {link.name}
                                            </a>
                                            {isCartasOpen && (
                                                <ul style={{ paddingLeft: '20px', marginTop: '10px' }}>
                                                    {link.dropdown.map(subItem => (
                                                        <li key={subItem.path} style={{ marginBottom: '10px' }}>
                                                            <Link
                                                                to={subItem.path}
                                                                onClick={() => {
                                                                    setIsOpen(false);
                                                                    setIsCartasOpen(false);
                                                                }}
                                                                style={{ fontSize: '1rem', color: '#c5a04f' }}
                                                            >
                                                                {subItem.name}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </>
                                    ) : (
                                        <Link to={link.path} onClick={() => setIsOpen(false)}>
                                            {link.name}
                                        </Link>
                                    )}
                                </li>
                            ))}
                            <li style={{ marginTop: '1rem' }}>
                                <button className="btn-reserve-solid" onClick={handleReservar}>
                                    RESERVAR
                                </button>
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

