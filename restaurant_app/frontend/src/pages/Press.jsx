import { motion } from 'framer-motion';

const Press = () => {
    return (
        <motion.div
            className="press-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ padding: '4rem 2rem', textAlign: 'center' }}
        >
            <h1 className="font-elegant" style={{ fontSize: '3rem', marginBottom: '2rem', color: 'var(--primary)' }}>Prensa</h1>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '800px', margin: '0 auto' }}>
                Próximamente encontrarás aquí todas las noticias y artículos sobre El Jardín de Arturo Soria.
            </p>
        </motion.div>
    );
};

export default Press;
