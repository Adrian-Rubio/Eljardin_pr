import { MapPin, Phone, Mail, User, Car, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import EditableText from './Editable/EditableText';

const Footer = () => {
    return (
        <footer className="site-footer">
            <div className="footer-container">
                {/* 1. BRAND LOGO */}
                <div className="footer-col brand">
                    <img src="/images/logo_jardin.png" alt="El Jardín Logo" className="footer-logo-main" style={{ border: '2px solid #c5a04f', padding: '10px' }} />
                </div>

                {/* 2. INFO STACK (CONTACTO, UBICACIÓN, HORARIOS) */}
                <div className="footer-col info-stack">
                    <div className="info-group">
                        <h4>CONTACTO</h4>
                        <ul>
                            <li>
                                <span className="icon-circle"><Phone size={14} /></span>
                                <EditableText configKey="phone" />
                            </li>
                            <li>
                                <span className="icon-circle"><Mail size={14} /></span>
                                <EditableText configKey="reservation_email" />
                            </li>
                        </ul>
                    </div>

                    <div className="info-group" style={{ marginTop: '20px' }}>
                        <h4>UBICACIÓN</h4>
                        <ul>
                            <li>
                                <span className="icon-circle"><MapPin size={14} /></span>
                                <EditableText configKey="address" />
                            </li>
                            <li style={{ marginTop: '5px' }}>
                                <a href="https://maps.google.com/?q=El+Jardin+de+Arturo+Soria" target="_blank" rel="noreferrer" style={{ color: 'var(--gold-leaf)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <Car size={14} />
                                    <span style={{ textTransform: 'uppercase', fontSize: '10px', letterSpacing: '0.1em' }}>Cómo llegar</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="info-group" style={{ marginTop: '20px' }}>
                        <h4>HORARIOS</h4>
                        <ul>
                            <li>
                                <span className="icon-circle"><Clock size={14} /></span>
                                <EditableText configKey="hours" />
                            </li>
                        </ul>
                    </div>
                </div>

                {/* 3. VALET (APARCACOCHES) */}
                <div className="footer-col" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="valet-box">
                        <User size={30} strokeWidth={1} />
                        <span>Aparcacoches</span>
                    </div>
                </div>

                {/* 4. RESERVAS BUTTON */}
                <div className="footer-col" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <button className="btn-reserve-footer" onClick={() => window.open('https://portal.covermanager.com/reservar/?restaurant=el-jardin-arturo-soria', '_blank')} style={{ border: '1px solid white' }}>
                        RESERVAS
                    </button>
                </div>

                {/* 5. GRUPO LOGO */}
                <div className="footer-col" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <div className="footer-group-logo">
                        <span className="group-text" style={{ fontSize: '20px' }}>Alma of Spain</span>
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
