import sqlite3
import json

def show_table():
    conn = sqlite3.connect('restaurant.db')
    cursor = conn.cursor()
    
    # Select sample items from different categories (Food, Wine, Spirits)
    query = """
    SELECT name, category, base_price, variants, allergens, tags 
    FROM menu_items 
    WHERE category IN ('Bocados para empezar', 'Tintos DOCa Rioja', 'Gin')
    LIMIT 15
    """
    cursor.execute(query)
    rows = cursor.fetchall()
    
    print(f"{'Item Name':<40} | {'Category':<25} | {'Price':<6} | {'Variants':<25} | {'Allergens'}")
    print("-" * 120)
    
    for r in rows:
        name = r[0]
        cat = r[1]
        price = r[2]
        
        # Format variants
        vars_json = json.loads(r[3]) if r[3] else []
        vars_str = ", ".join([f"{v['name']}: {v['price']}e" for v in vars_json]) if vars_json else "-"
        
        # Format allergens
        allergens_json = json.loads(r[4]) if r[4] else []
        allergens_str = ", ".join(allergens_json) if allergens_json else "-"
        
        print(f"{name[:38]:<40} | {cat[:23]:<25} | {price:<6} | {vars_str[:23]:<25} | {allergens_str}")
        
    conn.close()

if __name__ == "__main__":
    show_table()
