import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// API URL definition with fallback to local server IP for the restaurant app
// API URL definition with dynamic fallback
const API_URL = import.meta.env.VITE_API_URL || `http://${window.location.hostname}:8000`;

const ConfigContext = createContext();

export const ConfigProvider = ({ children }) => {
    const [siteConfig, setSiteConfig] = useState({
        welcomeTitle: 'EL PLACER ES NUESTRO',
        welcomeSubtitle: "Bienvenido a El Jardín de Arturo Soria. Un oasis gastronómico donde cada detalle cuenta.",
        address: 'c/ Arturo Soria, 207, 28043, Madrid.',
        phone: '91 896 59 25',
        email: 'info@eljardindearturosoria.com',
        reservation_email: 'reservas@eljardindearturosoria.com',
        hours: 'De 13:00h a 01:00h | D, L y M: 13:00h - 17:00h'
    });

    const fetchConfig = async () => {
        try {
            console.log("Fetching config from:", `${API_URL}/config`);
            const res = await axios.get(`${API_URL}/config`);
            if (Object.keys(res.data).length > 0) {
                // Flatten contact_info if it exists or use direct keys
                const newConfig = { ...siteConfig, ...res.data };
                if (res.data.contact_info) {
                    Object.assign(newConfig, res.data.contact_info);
                }
                setSiteConfig(newConfig);
            }
        } catch (err) {
            console.error("CRITICAL: Error fetching config from", `${API_URL}/config`);
            console.error("Please ensure the backend is running and listening on 0.0.0.0:8000");
            console.error(err);
        }
    };

    useEffect(() => {
        fetchConfig();
    }, []);

    const updateConfigByKey = async (key, value) => {
        try {
            await axios.post(`${API_URL}/admin/config`, { key, value });
            fetchConfig(); // Refresh after update
        } catch (err) {
            console.error("Error updating config", err);
        }
    };

    const [isEditMode, setIsEditMode] = useState(false);

    const toggleEditMode = () => setIsEditMode(prev => !prev);

    return (
        <ConfigContext.Provider value={{
            siteConfig,
            setSiteConfig,
            updateConfigByKey,
            fetchConfig,
            isEditMode,
            toggleEditMode
        }}>
            {children}
        </ConfigContext.Provider>
    );
};

export const useConfig = () => useContext(ConfigContext);
