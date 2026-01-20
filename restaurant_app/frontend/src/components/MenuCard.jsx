import { motion } from 'framer-motion';

const MenuCard = ({ item, formatPrice, ALLERGEN_ICONS, hideImage }) => {
    const safeAllergens = Array.isArray(item.allergens)
        ? item.allergens
        : (typeof item.allergens === 'string'
            ? JSON.parse(item.allergens || '[]')
            : []);

    const safeVariants = Array.isArray(item.variants)
        ? item.variants
        : (typeof item.variants === 'string'
            ? JSON.parse(item.variants || '[]')
            : []);

    return (
        <motion.div
            className="menu-card-premium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
                padding: '24px 0',
                borderBottom: '1px solid #eee', // Cleaner thin line
                display: 'flex',
                flexDirection: 'column',
                gap: '4px'
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h3 style={{
                    fontSize: '1.25rem',
                    fontFamily: 'var(--font-primary)',
                    fontWeight: '600',
                    color: '#333',
                    margin: 0
                }}>
                    {item.name}
                </h3>
                <span className="price-tag" style={{ fontSize: '1.1rem', fontWeight: '500', color: '#333' }}>
                    {safeVariants.length > 0 ? formatPrice(safeVariants[0].price) : formatPrice(item.base_price)}
                </span>
            </div>

            {item.description && (
                <p style={{
                    fontSize: '14px',
                    color: '#888',
                    lineHeight: '1.5',
                    margin: '4px 0',
                    maxWidth: '85%'
                }}>
                    {item.description}
                </p>
            )}

            <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                {safeAllergens.map((alg, idx) => (
                    <img
                        key={idx}
                        src={ALLERGEN_ICONS[alg] || '/icons/default.png'}
                        alt={alg}
                        style={{ height: '22px', width: '22px', objectFit: 'contain' }}
                        title={alg}
                    />
                ))}
            </div>
        </motion.div>
    );
};

export default MenuCard;
