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
                padding: '20px 0',
                borderBottom: '1px solid rgba(0,0,0,0.05)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h3 style={{
                    fontSize: '1.2rem',
                    fontFamily: 'var(--font-secondary)',
                    fontWeight: '500',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    margin: 0
                }}>
                    {item.name}
                </h3>
                <span className="price-tag" style={{ fontSize: '1.1rem', fontWeight: '500', color: 'var(--primary)' }}>
                    {safeVariants.length > 0 ? formatPrice(safeVariants[0].price) : formatPrice(item.base_price)}
                </span>
            </div>

            <p style={{
                fontSize: '13px',
                color: 'var(--text-muted)',
                lineHeight: '1.6',
                margin: '5px 0',
                maxWidth: '90%'
            }}>
                {item.description}
            </p>

            <div style={{ display: 'flex', gap: '8px', marginTop: '5px' }}>
                {safeAllergens.map((alg, idx) => (
                    <img
                        key={idx}
                        src={ALLERGEN_ICONS[alg] || '/icons/default.png'}
                        alt={alg}
                        style={{ height: '18px', opacity: 0.6 }}
                        title={alg}
                    />
                ))}
            </div>
        </motion.div>
    );
};

export default MenuCard;
