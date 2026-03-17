import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Reservations = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/events', { replace: true });
    }, [navigate]);

    return null;
};

export default Reservations;
