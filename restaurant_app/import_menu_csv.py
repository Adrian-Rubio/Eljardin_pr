import csv
import json
import os
import sys

# Add the current directory to sys.path so we can import backend
sys.path.append(os.path.join(os.getcwd(), 'backend'))

# Force local database path for the import script
os.environ["DATABASE_URL"] = "sqlite:///restaurant.db"

from backend.database import engine, SessionLocal, Base
from backend.models import MenuItem

# Ensure tables exist
Base.metadata.create_all(bind=engine)

def clean_db(db):
    print("Cleaning existing menu items...")
    db.query(MenuItem).delete()
    db.commit()

def parse_price(val):
    if not val or val.strip() == "":
        return None
    try:
        # Replaces comma with dot for float conversion
        return float(val.replace(',', '.'))
    except ValueError:
        return None

def import_csv(file_path):
    db = SessionLocal()
    try:
        clean_db(db)
        
        with open(file_path, mode='r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            count = 0
            for row in reader:
                name = row['item']
                category = row['categoria']
                description = row['descripcion']
                allergen_str = row['alergenos']
                notes = row['notas']
                price1 = parse_price(row['precio_eur'])
                price2 = parse_price(row['precio_alt_eur'])
                carta = row['carta']
                
                # Combine description and notes if notes exist
                full_description = description
                if notes and notes.strip():
                    full_description += f" ({notes.strip()})"
                
                # Parse allergens
                allergens = [a.strip() for a in allergen_str.split('|')] if allergen_str and allergen_str.strip() else []
                
                # Pricing and variants logic
                base_price = price1 if price1 is not None else price2
                variants = []
                
                if price1 is not None and price2 is not None:
                    if carta == "CARTA DE VINOS":
                        variants = [
                            {"name": "Copa", "price": price1},
                            {"name": "Botella", "price": price2}
                        ]
                    elif carta == "CARTA ESPIRITUOSOS":
                        # Logic for shots/cocktails
                        # Usually the lower price is the shot
                        if price1 < price2:
                            variants = [
                                {"name": "Chupito", "price": price1},
                                {"name": "Copa", "price": price2}
                            ]
                        else:
                            variants = [
                                {"name": "Opción 1", "price": price1},
                                {"name": "Opción 2", "price": price2}
                            ]
                    else:
                        variants = [
                            {"name": "Precio 1", "price": price1},
                            {"name": "Precio 2", "price": price2}
                        ]
                    # For items with variants, we can use the main price as base_price
                    # or keep it consistent. Let's use the first one as base.
                    base_price = price1

                # Special case: if base_price is still None (e.g. price2 exists but price1 doesn't)
                if base_price is None:
                    base_price = 0.0

                # Map carta type to tags
                tags = [carta] if carta else []
                
                menu_item = MenuItem(
                    name=name,
                    description=full_description,
                    base_price=base_price,
                    category=category,
                    allergens=allergens,
                    variants=variants,
                    tags=tags,
                    is_active=True
                )
                
                db.add(menu_item)
                count += 1
            
            db.commit()
            print(f"Successfully imported {count} items.")
            
    except Exception as e:
        print(f"Error during import: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    csv_file = os.path.join(os.path.dirname(os.getcwd()), 'menu_jardin.csv')
    if not os.path.exists(csv_file):
        # Try local directory too just in case
        csv_file = 'menu_jardin.csv'
        
    if os.path.exists(csv_file):
        import_csv(csv_file)
    else:
        print(f"CSV file not found at {csv_file}")
