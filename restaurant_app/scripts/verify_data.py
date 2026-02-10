import sqlite3
import json

conn = sqlite3.connect('restaurant.db')
cursor = conn.cursor()

# Check a wine with variants
cursor.execute("SELECT name, base_price, variants FROM menu_items WHERE name = 'Melior Verdejo'")
row = cursor.fetchone()
if row:
    print(f"Name: {row[0]}")
    print(f"Base Price: {row[1]}")
    print(f"Variants: {row[2]}")

# Check a food item
cursor.execute("SELECT name, description, allergens FROM menu_items WHERE name LIKE 'Croquetas%'")
row = cursor.fetchone()
if row:
    print(f"\nName: {row[0]}")
    print(f"Description: {row[1]}")
    print(f"Allergens: {row[2]}")

conn.close()
