import { MapPin, Phone, Mail, User, Car } from 'lucide-react';
import { Link } from 'react-router-dom';
import EditableText from './Editable/EditableText';

const Footer = () => {
    return (
        <footer className="site-footer">
            <div className="footer-container">
                {/* 1. BRAND LOGO */}
                <div className="footer-col brand">
                    <img src="/images/logo_jardin.png" alt="El Jardín Logo" className="footer-logo-main" />
                </div>

                {/* 2. CONTACTO */}
                <div className="footer-col">
                    <h4>CONTACTO</h4>
                    <ul>
                        <li>
                            <span className="icon-circle"><Phone size={14} /></span>
                            <EditableText configKey="phone" />
                        </li>
                        <li>
                            <span className="icon-circle"><Mail size={14} /></span>
                            <EditableText configKey="email" />
                        </li>
                    </ul>
                </div>

                {/* 3. UBICACIÓN */}
                <div className="footer-col">
                    <h4>UBICACIÓN</h4>
                    <ul>
                        <li>
                            <span className="icon-circle"><MapPin size={14} /></span>
                            <EditableText configKey="address" />
                        </li>
                        <li style={{ marginTop: '5px' }}>
                            <a href="https://maps.google.com" target="_blank" rel="noreferrer" style={{ color: 'var(--text-muted)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Car size={14} />
                                <span style={{ textTransform: 'uppercase', fontSize: '11px', letterSpacing: '0.1em' }}>Cómo llegar</span>
                            </a>
                        </li>
                    </ul>
                </div>

                {/* 4. VALET (APARCACOCHES) */}
                <div className="footer-col">
                    <div className="valet-box">
                        <User size={40} strokeWidth={1} />
                        <span>Aparcacoches</span>
                    </div>
                </div>

                {/* 5. RESERVAS BUTTON */}
                <div className="footer-col" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <button className="btn-reserve-footer" onClick={() => window.open('https://portal.covermanager.com/reservar/?restaurant=el-jardin-arturo-soria', '_blank')}>
                        RESERVAS
                    </button>
                </div>

                {/* 6. GRUPO LOGO */}
                <div className="footer-col">
                    <div className="footer-group-logo">
                        <span className="group-text">Alma of Spain</span>
                        <span className="group-subtext">GRUPO</span>
                    </div>
                </div>
            </div>

            {/* LOWER LINKS */}
            <div className="footer-bottom">
                <Link to="/privacidad">Políticas de privacidad</Link>
                <Link to="/cookies">Políticas de cookies</Link>
                <Link to="/legal">Aviso Legal</Link>
            </div>
        </footer>
    );
};

export default Footer;
