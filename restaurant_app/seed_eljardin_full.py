import sys
import os
import json

# Add backend to sys.path (Dynamic path for Windows/Linux compatibility)
sys.path.append(os.path.join(os.getcwd(), 'backend'))

try:
    from database import SessionLocal, engine
    import models
    print("Database connection established.")
except ImportError as e:
    print(f"Import Error: {e}")
    sys.exit(1)

def seed_full_menu():
    # Helper to clean text
    def clean_str(s):
        if not s: return ""
        return s.strip()

    # Create tables if they don't exist
    models.Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    
    print("Cleaning old menu data...")
    db.query(models.MenuItem).delete()
    db.commit()

    # Helper for price variants (Glass vs Bottle)
    def variants(copa=None, botella=None):
        v = []
        if copa: v.append({"name": "Copa", "price": copa})
        if botella: v.append({"name": "Botella", "price": botella})
        return json.dumps(v)

    menu_items = []

    # --- CARTA PRINCIPAL ---
    # Bocados para empezar
    menu_items.append({"name": "Croquetas de Jamón Ibérico", "description": "Croquetas cremosas de jamón ibérico rebozadas en panko (7 ud).", "base_price": 15.50, "category": "Bocados para empezar", "allergens": json.dumps(["Lácteos", "Huevos"]), "type": "carta"})
    menu_items.append({"name": "Burrata al pesto con fruta de temporada", "description": "Ensalada de burrata con tomate rosa, higos y fresas, aliñada con salsa de pesto y vinagre balsámico.", "base_price": 22.00, "category": "Bocados para empezar", "allergens": json.dumps(["Dióxido de Azufre y Sulfitos", "Lácteos", "Frutos de Cáscara"]), "type": "carta"})
    menu_items.append({"name": "Revuelto de Boletus y Foie", "description": "Revuelto de boletus guisado con cebolla caramelizada y escalope de foie.", "base_price": 24.95, "category": "Bocados para empezar", "allergens": json.dumps(["Huevos"]), "type": "carta"})
    menu_items.append({"name": "Ensaladilla rusa con ventresca", "description": "Ensaladilla rusa casera con vinagreta de piparra, esferificación de aceituna negra y verde, piparra laminada, polvo de aceituna negra, ventresca de atún y tosta de pan cristal. (Opción sin gluten)", "base_price": 16.00, "category": "Bocados para empezar", "allergens": json.dumps(["Huevos", "Pescado"]), "type": "carta"})
    menu_items.append({"name": "Jamón Ibérico", "description": "Jamón ibérico Reserva de la Familia de Julián Martín, acompañado de picos de pan.", "base_price": 33.00, "category": "Bocados para empezar", "allergens": json.dumps([]), "type": "carta"})
    menu_items.append({"name": "Torreznos de Soria con patata revolcona", "description": "Torreznos de Soria horneados, acompañados de patata revolcona, con pimentón dulce de La Vera ahumado, sal de chistorra asada, aceite de pimentón y pimientos de padrón fritos.", "base_price": 14.00, "category": "Bocados para empezar", "allergens": json.dumps([]), "type": "carta"})
    menu_items.append({"name": "Sobao con anchoa ahumada", "description": "Sobao Pasiego casero acompañado con crema de queso cabrales y coronado con una anchoa del Cantábrico ahumada (2 ud).", "base_price": 12.95, "category": "Bocados para empezar", "allergens": json.dumps(["Lácteos", "Pescado"]), "type": "carta"})
    menu_items.append({"name": "Pan y Aperitivo", "description": "", "base_price": 2.25, "category": "Bocados para empezar", "allergens": json.dumps([]), "type": "carta"})

    # Arroces
    menu_items.append({"name": "Arroz al horno con carrillera", "description": "Para 2 personas. Precio por persona. Arroz “Molino Roca” cocinado en llauna con carrillera guisada, pimientos de padrón, trompeta de la muerte, alioli de ajo asado y salsa demiglace.", "base_price": 24.00, "category": "Nuestros arroces para compartir", "allergens": json.dumps(["Dióxido de Azufre y Sulfitos", "Huevos", "Apio"]), "type": "carta"})
    menu_items.append({"name": "Arroz meloso con bogavante", "description": "Para dos personas, Precio por persona. Arroz “Molino Roca” cocinado en salsa americana y con un bogavante por arroz.", "base_price": 35.00, "category": "Nuestros arroces para compartir", "allergens": json.dumps(["Dióxido de Azufre y Sulfitos", "Pescado", "Apio", "Crustáceos", "Moluscos"]), "type": "carta"})

    # Carnes
    menu_items.append({"name": "Lagarto Ibérico al Pedro Ximénez", "description": "Lagarto ibérico a la brasa glaseado con una reducción de Pedro Ximénez sobre una base de espuma de patata, milhojas de patata y brotes de temporada.", "base_price": 25.00, "category": "Alma Carnívora", "allergens": json.dumps(["Dióxido de Azufre y Sulfitos", "Lácteos"]), "type": "carta"})
    menu_items.append({"name": "Chuletón a la brasa", "description": "Chuletón de alta maduración, 45 días, cocinado a la brasa de carbón leña y sal Maldon.", "base_price": 95.00, "category": "Alma Carnívora", "allergens": json.dumps([]), "type": "carta"})
    menu_items.append({"name": "Lomo de vaca a la pimienta", "description": "Lomo bajo a la brasa de carbón leña napado con salsa pimienta y acompañado de patatas fritas.", "base_price": 27.00, "category": "Alma Carnívora", "allergens": json.dumps(["Lácteos"]), "type": "carta"})
    menu_items.append({"name": "Steak tartar", "description": "Steak tartar de solomillo de ternera cortado a cuchillo, preparado en mesa, con picante al gusto. (opción sin gluten).", "base_price": 28.00, "category": "Alma Carnívora", "allergens": json.dumps(["Dióxido de Azufre y Sulfitos", "Huevos", "Pescado", "Soja", "Mostaza"]), "type": "carta"})

    # Marinera
    menu_items.append({"name": "Merluza en salsa verde", "description": "Merluza a la brasa con salsa verde y acompañado de mini patatas asadas.", "base_price": 26.00, "category": "Alma Marinera", "allergens": json.dumps(["Pescado"]), "type": "carta"})
    menu_items.append({"name": "Rape a la Mediterránea", "description": "Rape a la brasa acompañado de tomate cherry, albahaca, piquillos, mini patatas y tomillo.", "base_price": 29.00, "category": "Alma Marinera", "allergens": json.dumps(["Lácteos", "Pescado"]), "type": "carta"})
    menu_items.append({"name": "Chipirones encebollados", "description": "Chipirones salteados y guisados con cebolla caramelizada y guindilla vasca.", "base_price": 29.00, "category": "Alma Marinera", "allergens": json.dumps(["Moluscos"]), "type": "carta"})
    menu_items.append({"name": "Pulpo a la brasa", "description": "Pulpo a la brasa de carbón leña con espuma de puré de patata, pimentón dulce de la vera y AOVE.", "base_price": 28.00, "category": "Alma Marinera", "allergens": json.dumps(["Lácteos", "Moluscos"]), "type": "carta"})
    menu_items.append({"name": "Txangurro a la Donostiarra", "description": "Centollo desmigado gratinado con crema de mariscos, cebolla caramelizada, Brandy y mantequilla. Acompañado de pan cristal.", "base_price": 26.00, "category": "Alma Marinera", "allergens": json.dumps(["Lácteos", "Crustáceos", "Moluscos"]), "type": "carta"})

    # Guarniciones
    menu_items.append({"name": "Ensalada a la Donostiarra", "base_price": 4.00, "category": "Guarniciones", "allergens": json.dumps(["Dióxido de Azufre y Sulfitos"]), "type": "carta"})
    menu_items.append({"name": "Patatas fritas", "base_price": 4.00, "category": "Guarniciones", "type": "carta"})
    menu_items.append({"name": "Piquillos confitados", "base_price": 6.00, "category": "Guarniciones", "type": "carta"})
    menu_items.append({"name": "Pan cristal con tomate", "base_price": 4.50, "category": "Guarniciones", "type": "carta"})

    # Postres
    menu_items.append({"name": "Brownie de chocolate", "description": "Brownie de chocolate negro y mantequilla tostada acompañado de helado de caramelo salado y sal Maldon.", "base_price": 9.00, "category": "Alma Pastelera", "allergens": json.dumps(["Lácteos", "Huevos", "Frutos de Cáscara"]), "type": "carta"})
    menu_items.append({"name": "Coulant de avellana", "description": "Coulant de avellana horneado al momento (8min), fundido por dentro, acompañado de helado de frutos rojos.", "base_price": 11.00, "category": "Alma Pastelera", "allergens": json.dumps(["Dióxido de Azufre y Sulfitos", "Lácteos", "Huevos", "Frutos de Cáscara"]), "type": "carta"})
    menu_items.append({"name": "Milhojas de maracuyá", "description": "Milhojas con crema diplomática de maracuyá y helado de coco.", "base_price": 12.00, "category": "Alma Pastelera", "allergens": json.dumps(["Lácteos"]), "type": "carta"})
    menu_items.append({"name": "Torrija de toffee y jengibre", "description": "Torrija en pan brioche macerada en toffee, jengibre y cítricos, acompañado de helado de café.", "base_price": 9.00, "category": "Alma Pastelera", "allergens": json.dumps(["Dióxido de Azufre y Sulfitos", "Lácteos", "Huevos", "Frutos de Cáscara"]), "type": "carta"})

    # --- VINOS ---
    # Tintos Madrid
    menu_items.append({"name": "El Hombre Bala", "description": "98% Garnacha 2% Cariñena.", "base_price": 41.00, "category": "Tintos DOP Madrid y Sierra de Gredos", "type": "vinos"})
    menu_items.append({"name": "Molaracha", "description": "95% Garnacha y 5% Malvar. Bodega Tinta Castiza.", "base_price": 33.00, "category": "Tintos DOP Madrid y Sierra de Gredos", "type": "vinos"})
    
    # Ribera Sacra
    menu_items.append({"name": "Tolo do Xisto", "description": "100% Mencía.", "base_price": 37.00, "category": "Tintos DOP Ribera Sacra", "type": "vinos"})
    
    # Extremadura / Cadiz / Priorat
    menu_items.append({"name": "Habla del Silencio", "description": "50% Syrah 30% Tempranillo 20% Cabernet Sauvignon", "base_price": 28.00, "category": "Tintos VT Extremadura", "type": "vinos"})
    menu_items.append({"name": "Forlong Terracota", "description": "100% Tintilla de Rota. Bodegas Forlong.", "base_price": 36.00, "category": "Tintos DOVT Cádiz", "type": "vinos"})
    menu_items.append({"name": "Pissarres", "description": "Priorat. 50% Garnacha 40% Cariñena 10% Cabernet Sauvignon.", "base_price": 30.00, "category": "Tintos DOCa Priorat", "type": "vinos"})
    menu_items.append({"name": "Samsara del Priorat", "description": "Priorat. 50% Garnacha 35% Cariñena 10% Syrah 5% Cabernet Sauvignon.", "base_price": 37.00, "category": "Tintos DOCa Priorat", "type": "vinos"})

    # Rioja
    menu_items.append({"name": "Laderas Bideona Tempranillo", "description": "100% Tempranillo. Bodega Bideona.", "base_price": 27.00, "category": "Tintos DOCa Rioja", "type": "vinos"})
    menu_items.append({"name": "Heraclio Alfaro Crianza", "description": "85% Tempranillo, 10% Garnacha y 5% Graciano.", "base_price": 26.00, "category": "Tintos DOCa Rioja", "type": "vinos"})
    menu_items.append({"name": "200 Monges Reserva", "description": "85% tempranillo, 10% Graciano y 5% Garnacha tinta.", "base_price": 67.00, "category": "Tintos DOCa Rioja", "type": "vinos"})
    menu_items.append({"name": "Marqués de Riscal Reserva", "description": "100% Tempranillo.", "base_price": 39.00, "category": "Tintos DOCa Rioja", "type": "vinos"})
    menu_items.append({"name": "Martínez Lacuesta Selecto Crianza", "description": "100% Tempranillo.", "base_price": 26.00, "variants": variants(4.50, 26.00), "category": "Tintos DOCa Rioja", "type": "vinos"})
    menu_items.append({"name": "CM de Matarromera", "description": "100% Tempranillo.", "base_price": 36.00, "category": "Tintos DOCa Rioja", "type": "vinos"})
    menu_items.append({"name": "Azpilicueta Origen", "description": "100% Tempranillo.", "base_price": 27.00, "category": "Tintos DOCa Rioja", "type": "vinos"})
    menu_items.append({"name": "Beronia Reserva 198 Barricas", "description": "100% Tempranillo.", "base_price": 37.00, "category": "Tintos DOCa Rioja", "type": "vinos"})
    
    # Ribera del Duero
    menu_items.append({"name": "Malleolus de Emilio Moro", "base_price": 52.00, "category": "DOP Ribera Del Duero", "type": "vinos"})
    menu_items.append({"name": "Matarromera Crianza", "base_price": 41.00, "category": "DOP Ribera Del Duero", "type": "vinos"})
    menu_items.append({"name": "Arzuaga Crianza", "base_price": 43.00, "category": "DOP Ribera Del Duero", "type": "vinos"})
    menu_items.append({"name": "Aureo", "base_price": 38.00, "category": "DOP Ribera Del Duero", "type": "vinos"})
    menu_items.append({"name": "Carmelo Rodero 9 Meses", "base_price": 33.00, "category": "DOP Ribera Del Duero", "type": "vinos"})
    menu_items.append({"name": "Carmelo Rodero Crianza", "base_price": 44.00, "category": "DOP Ribera Del Duero", "type": "vinos"})
    menu_items.append({"name": "Emilio Moro Cosecha", "base_price": 41.00, "category": "DOP Ribera Del Duero", "type": "vinos"})
    menu_items.append({"name": "Pago de Capellanes Reserva", "base_price": 57.00, "category": "DOP Ribera Del Duero", "type": "vinos"})
    menu_items.append({"name": "Melior Roble", "base_price": 26.00, "variants": variants(4.50, 26.00), "category": "DOP Ribera Del Duero", "type": "vinos"})
    menu_items.append({"name": "Prestigio Matarromera", "base_price": 71.00, "category": "DOP Ribera Del Duero", "type": "vinos"})
    menu_items.append({"name": "Marqués de Burgos 8000", "base_price": 46.00, "category": "DOP Ribera Del Duero", "type": "vinos"})

    # Otros Vinos
    menu_items.append({"name": "Abadia Retuerta Selección", "base_price": 51.50, "category": "Tintos VT Castilla y León", "type": "vinos"})
    menu_items.append({"name": "Hop-Hop Grillo", "base_price": 42.00, "category": "Tintos DO Somontano", "type": "vinos"})

    # Blancos
    menu_items.append({"name": "Circe", "base_price": 27.00, "category": "Blancos. DO Rueda", "type": "vinos"})
    menu_items.append({"name": "Melior Verdejo", "base_price": 24.00, "variants": variants(4.50, 24.00), "category": "Blancos. DO Rueda", "type": "vinos"})
    menu_items.append({"name": "Semidulce La Chalada", "base_price": 26.00, "variants": variants(4.50, 26.00), "category": "Blancos. DO Rueda", "type": "vinos"})
    menu_items.append({"name": "Sanz Sauvignon Blanco", "base_price": 26.00, "category": "Blancos. DO Rueda", "type": "vinos"})
    menu_items.append({"name": "Belondrade Quinta Apolonia", "base_price": 39.00, "category": "Blancos VT Tierra de Castilla-León", "type": "vinos"})
    menu_items.append({"name": "Díscolo", "base_price": 37.00, "category": "Blancos VT Tierra de Castilla-León", "type": "vinos"})
    menu_items.append({"name": "Terras Gauda", "base_price": 34.00, "category": "Blancos DO Rías Baixas", "type": "vinos"})
    menu_items.append({"name": "Martin Codax", "base_price": 27.00, "variants": variants(4.50, 27.00), "category": "Blancos DO Rías Baixas", "type": "vinos"})
    menu_items.append({"name": "Santiago Ruiz", "base_price": 38.00, "category": "Blancos DO Rías Baixas", "type": "vinos"})
    menu_items.append({"name": "Viña Caeira Matarromera", "base_price": 32.00, "category": "Blancos DO Rías Baixas", "type": "vinos"})
    menu_items.append({"name": "La Revelia de Emilio Moro", "base_price": 49.00, "category": "Blancos DO Bierzo", "type": "vinos"})
    menu_items.append({"name": "Sonrisa Dominio de Tares", "base_price": 26.00, "category": "Blancos DO Bierzo", "type": "vinos"})
    menu_items.append({"name": "Mara Martín", "base_price": 27.00, "variants": variants(4.50, 27.00), "category": "Blancos D.O. Monterrei", "type": "vinos"})
    menu_items.append({"name": "Bideona Cabezadas", "base_price": 27.00, "category": "Blancos DO Rioja", "type": "vinos"})

    # Rosados y Cavas
    menu_items.append({"name": "Nicte Rosa Pálido", "base_price": 27.00, "category": "Rosados VT Castilla-León", "type": "vinos"})
    menu_items.append({"name": "Champagne Telmont Reserve Rose", "base_price": 98.00, "category": "Cavas y Champagnes", "type": "vinos"})
    menu_items.append({"name": "Champagne G.H. Mumm", "base_price": 85.00, "category": "Cavas y Champagnes", "type": "vinos"})
    menu_items.append({"name": "Cava Canals Nadal Brut Nature Reserva", "base_price": 28.00, "variants": variants(6.50, 28.00), "category": "Cavas y Champagnes", "type": "vinos"})
    menu_items.append({"name": "Cava Canals Nadal Brut Rosé", "base_price": 32.00, "variants": variants(7.00, 32.00), "category": "Cavas y Champagnes", "type": "vinos"})

    # Vinos generosos
    menu_items.append({"name": "Amontillado Micaela", "base_price": 4.50, "category": "Vinos generosos y dulces (Por copa)", "type": "vinos"})
    menu_items.append({"name": "Manzanilla Micaela", "base_price": 5.50, "category": "Vinos generosos y dulces (Por copa)", "type": "vinos"})
    menu_items.append({"name": "Pedro Ximenez Micaela", "base_price": 6.50, "category": "Vinos generosos y dulces (Por copa)", "type": "vinos"})

    # --- ESPIRITUOSOS ---
    # Cocteles
    menu_items.append({"name": "Petroni Spritz", "description": "El aperitivo gallego, versión del Aperol spritz.", "base_price": 12.00, "category": "Cocteles", "type": "cocteles"})
    menu_items.append({"name": "Rebujito Soho's", "description": "Vino fino con limón, hierbabuena y bergamota.", "base_price": 9.00, "category": "Cocteles", "type": "cocteles"})
    menu_items.append({"name": "Mojito", "description": "Ron blanco, lima, menta.", "base_price": 12.00, "category": "Cocteles", "type": "cocteles"})
    menu_items.append({"name": "Margarita", "description": "Tequila, lima, licor de naranja.", "base_price": 12.00, "category": "Cocteles", "type": "cocteles"})
    menu_items.append({"name": "Caipirinha", "description": "Cachaza, lima, azúcar.", "base_price": 12.00, "category": "Cocteles", "type": "cocteles"})
    
    # Whisky
    menu_items.append({"name": "DYC 8", "base_price": 11.00, "category": "Whisky", "type": "cocteles"})
    menu_items.append({"name": "Makers Mark", "base_price": 12.00, "category": "Whisky", "type": "cocteles"})
    menu_items.append({"name": "Jameson", "base_price": 11.00, "category": "Whisky", "type": "cocteles"})
    menu_items.append({"name": "Hibiki Suntory Harmony", "base_price": 25.00, "category": "Whisky", "type": "cocteles"})
    menu_items.append({"name": "Toki Suntory", "base_price": 14.00, "category": "Whisky", "type": "cocteles"})
    menu_items.append({"name": "Macallan 12", "base_price": 18.00, "category": "Whisky", "type": "cocteles"})
    menu_items.append({"name": "JW Black Label", "base_price": 14.00, "category": "Whisky", "type": "cocteles"})
    menu_items.append({"name": "Jack Daniels", "base_price": 12.00, "category": "Whisky", "type": "cocteles"})

    # Ron
    menu_items.append({"name": "Matusalén 10", "base_price": 12.00, "category": "Ron", "type": "cocteles"})
    menu_items.append({"name": "Zacapa 23", "base_price": 18.00, "category": "Ron", "type": "cocteles"})
    menu_items.append({"name": "Santa Teresa", "base_price": 10.00, "category": "Ron", "type": "cocteles"})
    menu_items.append({"name": "Havana Club Especial", "base_price": 10.00, "category": "Ron", "type": "cocteles"})

    # Gin
    menu_items.append({"name": "Martin Miller's", "base_price": 14.00, "category": "Gin", "type": "cocteles"})
    menu_items.append({"name": "G'vine", "base_price": 16.00, "category": "Gin", "type": "cocteles"})
    menu_items.append({"name": "Gin Mare", "base_price": 16.00, "category": "Gin", "type": "cocteles"})
    menu_items.append({"name": "Canaima Gin", "base_price": 12.00, "category": "Gin", "type": "cocteles"})
    menu_items.append({"name": "Bombay Sapphire", "base_price": 11.00, "category": "Gin", "type": "cocteles"})
    menu_items.append({"name": "Roku Gin", "base_price": 16.00, "category": "Gin", "type": "cocteles"})
    menu_items.append({"name": "Larios 12", "base_price": 11.00, "category": "Gin", "type": "cocteles"})
    menu_items.append({"name": "Le Tribute", "base_price": 16.00, "category": "Gin", "type": "cocteles"})
    menu_items.append({"name": "Beefeater", "base_price": 11.00, "category": "Gin", "type": "cocteles"})
    menu_items.append({"name": "Hendrick's", "base_price": 16.00, "category": "Gin", "type": "cocteles"})
    menu_items.append({"name": "Puerto de Indias", "base_price": 11.00, "category": "Gin", "type": "cocteles"})
    menu_items.append({"name": "Seagram's", "base_price": 11.00, "category": "Gin", "type": "cocteles"})
    menu_items.append({"name": "Tanqueray", "base_price": 11.00, "category": "Gin", "type": "cocteles"})

    # Otros
    menu_items.append({"name": "Grey Goose", "base_price": 16.00, "category": "Vodka", "type": "cocteles"})
    menu_items.append({"name": "Absolut", "base_price": 10.00, "category": "Vodka", "type": "cocteles"})
    menu_items.append({"name": "Olmeca blanco", "base_price": 10.00, "variants": variants(5.00, 10.00), "category": "Tequila", "type": "cocteles"})
    menu_items.append({"name": "Petroni Rojo", "base_price": 7.00, "category": "Vermús", "type": "cocteles"})
    menu_items.append({"name": "Licor Baileys", "base_price": 8.00, "variants": variants(5.00, 8.00), "category": "Licores", "type": "cocteles"})

    # --- INSERT INTO DB ---
    print(f"Inserting {len(menu_items)} items...")
    for item in menu_items:
        # Remove 'type' key as it's not in the model
        if 'type' in item:
            del item['type']
        db_item = models.MenuItem(**item)
        db.add(db_item)
    
    db.commit()
    db.close()
    print("'El Jardin' menu loaded successfully!")

if __name__ == "__main__":
    seed_full_menu()
