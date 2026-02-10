import sys
import os
import re

# Add backend to sys.path
sys.path.append(os.path.join(os.getcwd(), 'backend'))

try:
    from database import SessionLocal, engine
    import models
    print("Database connection established.")
except ImportError as e:
    print(f"Import Error: {e}")
    sys.exit(1)

def split_allergens(s):
    """Intelligently splits the 'sticky' allergen string."""
    if not s: return []
    known = [
        "Dióxido de Azufre y Sulfitos", "Frutos de Cáscara", "Gluten", "Lácteos",
        "Huevos", "Pescado", "Moluscos", "Crustáceos", "Apio", "Mostaza",
        "Soja", "Sésamo", "Cacahuetes", "Altramuces"
    ]
    found = []
    remaining = s
    for alg in sorted(known, key=len, reverse=True):
        if alg in remaining:
            found.append(alg)
            remaining = remaining.replace(alg, "")
    return found

def clean_price(price_str):
    """Converts string like '€ 15,50' or '15,50' to float 15.50"""
    if not price_str: return 0.0
    clean = price_str.replace('€', '').replace(' ', '').strip()
    clean = clean.replace(',', '.')
    try:
        return float(clean)
    except ValueError:
        return 0.0

def read_file_lines(filename):
    path = os.path.join(os.getcwd(), 'frontend', 'public', 'Textos cartas', filename)
    if not os.path.exists(path):
        print(f"Warning: File not found: {path}")
        return []
    with open(path, 'r', encoding='utf-8') as f:
        # Get all non-empty lines stripped
        return [line.strip() for line in f.readlines() if line.strip()]

def get_base_category_keywords():
    return [
        "Bocados", "Arroces", "Nuestros", "Alma", "Guarniciones", 
        "Tintos", "Blancos", "Cavas", "Vinos", "Cocteles", 
        "Whisky", "Ron", "Vodka", "Tequila", "Gin", "Vermús", "Licores",
        "DOP", "Rosados"
    ]

def is_category_line(line):
    # Check against keywords
    keywords = get_base_category_keywords()
    if any(line.startswith(k) for k in keywords):
        return True
    # Check for short headers ending in colon
    if line.endswith(":") and len(line) < 50:
        return True
    return False

def parse_with_price_anchor(lines, is_wine=False, is_spirit=False):
    items = []
    current_category = "General"
    buffer = []
    
    for line in lines:
        # Check if line is a Price Line
        # Must contain '€' and have a digit
        if '€' in line and any(c.isdigit() for c in line):
            price_line = line
            
            # --- START CATEGORY EXTRACTION ---
            # Check the top of the buffer for Category candidates
            while buffer and is_category_line(buffer[0]):
                current_category = buffer.pop(0).strip(" :")
                # print(f"  [Category]: {current_category}")
            
            if not buffer:
                # Ghost price line or just a price floating? Ignore or attach to prev?
                # Probably an error in file or parsing
                continue
            
            # --- ITEM EXTRACTION ---
            name = buffer[0]
            rest_lines = buffer[1:]
            
            description = ""
            allergens = []
            variants = []
            base_price = 0.0
            
            # Allergens detection (usually the last line before price in Food)
            if rest_lines and not is_wine and not is_spirit:
                possible_alg = rest_lines[-1]
                # Heuristic: if it has known allergens
                algs_found = split_allergens(possible_alg)
                if algs_found:
                    allergens = algs_found
                    rest_lines.pop() # Remove allergen line
            
            # Hidden Variants (Bottle price in description) logic for Spirits
            hidden_bottle_price = 0.0
            
            final_desc_lines = []
            for l in rest_lines:
                # Check for "Botella 100€" pattern
                if is_spirit and "Botella" in l and "€" in l:
                     try:
                         # Regex to find price next to Botella
                         match = re.search(r'Botella\s*(\d+)', l.replace('€',''))
                         if match:
                             hidden_bottle_price = float(match.group(1))
                     except: pass
                else:
                    final_desc_lines.append(l)
            
            description = " ".join(final_desc_lines)
            
            # --- PRICE PARSING ---
            parts = price_line.replace('€', '').split('/')
            clean_parts = [clean_price(p) for p in parts]
            
            if len(clean_parts) > 1:
                p1, p2 = clean_parts[0], clean_parts[1]
                if is_wine:
                     variants = [{"name": "Copa", "price": p1}, {"name": "Botella", "price": p2}]
                elif is_spirit:
                     # Spirits often Corto/Largo OR Copa/Botella
                     # If Tequila/Licor: Corto/Largo
                     if "Tequila" in current_category or "Licor" in current_category or "Vermús" in current_category:
                         variants = [{"name": "Corto", "price": p1}, {"name": "Largo", "price": p2}]
                     else:
                         variants = [{"name": "Copa", "price": p1}, {"name": "Botella", "price": p2}]
                base_price = p1
            else:
                base_price = clean_parts[0]
                if hidden_bottle_price > 0:
                     variants = [
                        {"name": "Copa", "price": base_price},
                        {"name": "Botella", "price": hidden_bottle_price}
                     ]
            
            # Save Item
            items.append({
                "name": name,
                "base_price": base_price,
                "category": current_category,
                "description": description,
                "allergens": allergens,
                "variants": variants
            })
            
            # Reset buffer
            buffer = []
        else:
            # Not a price, add to buffer
            buffer.append(line)
            
    return items

def seed_full_menu():
    print("Iniciando reconstrucción de la base de datos...")
    
    # 1. DB Reset
    models.Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    print("Borrando datos antiguos...")
    db.query(models.MenuItem).delete()
    db.commit()
    
    all_items = []
    
    # 2. Parse "Nuestra carta.txt"
    print("Procesando 'Nuestra carta.txt'...")
    food_lines = read_file_lines("Nuestra carta.txt")
    if food_lines:
        items = parse_with_price_anchor(food_lines, is_wine=False, is_spirit=False)
        print(f" -> Encontrados {len(items)} platos.")
        all_items.extend(items)
    
    # 3. Parse "Nuestros Vinos.txt"
    print("Procesando 'Nuestros Vinos.txt'...")
    wine_lines = read_file_lines("Nuestros Vinos.txt")
    if wine_lines:
        items = parse_with_price_anchor(wine_lines, is_wine=True, is_spirit=False)
        print(f" -> Encontrados {len(items)} vinos.")
        all_items.extend(items)
        
    # 4. Parse "Carta Espirituosos.txt"
    print("Procesando 'Carta Espirituosos.txt'...")
    spirit_lines = read_file_lines("Carta Espirituosos.txt")
    if spirit_lines:
        items = parse_with_price_anchor(spirit_lines, is_wine=False, is_spirit=True)
        print(f" -> Encontradas {len(items)} bebidas espirituosas.")
        all_items.extend(items)
    
    # 5. Insert
    print(f"Insertando un total de {len(all_items)} elementos en la BBDD...")
    for item in all_items:
        db_item = models.MenuItem(
            name=item["name"],
            description=item.get("description", ""),
            base_price=item["base_price"],
            category=item["category"],
            allergens=item.get("allergens", []),
            variants=item.get("variants", [])
        )
        db.add(db_item)
    
    db.commit()
    db.close()
    print("¡Base de datos reconstruida con éxito!")

if __name__ == "__main__":
    seed_full_menu()
