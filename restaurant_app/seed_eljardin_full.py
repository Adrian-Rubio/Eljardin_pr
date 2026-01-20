import sys
import os

# Add backend to sys.path
sys.path.append(os.path.join(os.getcwd(), 'backend'))

try:
    from database import SessionLocal, engine
    import models
    print("Database connection established.")
except ImportError as e:
    print(f"Import Error: {e}")
    sys.exit(1)

def seed_full_menu():
    models.Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    
    print("Cleaning old menu data...")
    db.query(models.MenuItem).delete()
    db.commit()

    def variants(v_list):
        """Helper to create variant list: [(name, price), ...]"""
        return [{"name": name, "price": price} for name, price in v_list]

    def split_allergens(s):
        """Intelligently splits the 'sticky' allergen string from the text files."""
        if not s: return []
        known = [
            "Dióxido de Azufre y Sulfitos", "Frutos de Cáscara", "Gluten", "Lácteos", 
            "Huevos", "Pescado", "Moluscos", "Crustáceos", "Apio", "Mostaza", 
            "Soja", "Sésamo", "Cacahuetes", "Altramuces"
        ]
        found = []
        remaining = s
        # Sort by length descending to catch longer names first (like 'Dióxido...')
        for alg in sorted(known, key=len, reverse=True):
            if alg in remaining:
                found.append(alg)
                remaining = remaining.replace(alg, "")
        return found

    items = []

    # --- NUESTRA CARTA ---
    def add_carta(name, price, category, description="", allergens_str=""):
        items.append({
            "name": name, 
            "base_price": price, 
            "category": category, 
            "description": description, 
            "allergens": split_allergens(allergens_str),
            "type": "carta"
        })

    # Bocados para empezar
    cat = "Bocados para empezar"
    add_carta("Croquetas de Jamón Ibérico", 15.50, cat, "Croquetas cremosas de jamón ibérico rebozadas en panko (7 ud).", "LácteosHuevos")
    add_carta("Burrata al pesto con fruta de temporada", 22.00, cat, "Ensalada de burrata con tomate rosa, higos y fresas, aliñada con salsa de pesto y vinagre balsámico.", "Dióxido de Azufre y SulfitosLácteosFrutos de Cáscara")
    add_carta("Revuelto de Boletus y Foie", 24.95, cat, "Revuelto de boletus guisado con cebolla caramelizada y escalope de foie.", "Huevos")
    add_carta("Ensaladilla rusa con ventresca y tostada de aceite de oliva", 16.00, cat, "Ensaladilla rusa casera con vinagreta de piparra, esferificación de aceituna negra y verde, piparra laminada, polvo de aceituna negra, ventresca de atún y tosta de pan cristal. (Opción sin gluten)", "HuevosPescado")
    add_carta("Jamón Ibérico", 33.00, cat, "Jamón ibérico Reserva de la Familia de Julián Martín, acompañado de picos de pan.")
    add_carta("Torreznos de Soria con patata revolcona", 14.00, cat, "Torreznos de Soria horneados, acompañados de patata revolcona, con pimentón dulce de La Vera ahumado, sal de chistorra asada, aceite de pimentón y pimientos de padrón fritos.")
    add_carta("Sobao con anchoa ahumada y crema de queso Cabrales", 12.95, cat, "Sobao Pasiego casero acompañado con crema de queso cabrales y coronado con una anchoa del Cantábrico ahumada (2 ud).", "LácteosPescado")
    add_carta("Pan y Aperitivo", 2.25, cat)

    # Arroces
    cat = "Nuestros arroces para compartir"
    add_carta("Arroz al horno con carrillera", 24.00, cat, "Para 2 personas. Precio por persona. Arroz “Molino Roca” cocinado en llauna con carrillera guisada, pimientos de padrón, trompeta de la muerte, alioli de ajo asado y salsa demiglace", "Dióxido de Azufre y SulfitosHuevosApio")
    add_carta("Arroz meloso con bogavante", 35.00, cat, "Para dos personas, Precio por persona. Arroz “Molino Roca” cocinado en salsa americana y con un bogavante por arroz.", "Dióxido de Azufre y SulfitosPescadoApioCrustáceosMoluscos")

    # Carnes
    cat = "Alma Carnívora"
    add_carta("Lagarto Ibérico al Pedro Ximénez", 25.00, cat, "Lagarto ibérico a la brasa glaseado con una reducción de Pedro Ximénez sobre una base de espuma de patata, milhojas de patata y brotes de temporada.", "Dióxido de Azufre y SulfitosLácteos")
    add_carta("Chuletón a la brasa", 95.00, cat, "Chuletón de alta maduración, 45 días, cocinado a la brasa de carbón leña y sal Maldon.")
    add_carta("Lomo de vaca a la pimienta", 27.00, cat, "Lomo bajo a la brasa de carbón leña napado con salsa pimienta y acompañado de patatas fritas.", "Lácteos")
    add_carta("Steak tartar con torta de pan de aceite", 28.00, cat, "Steak tartar de solomillo de ternera cortado a cuchillo, preparado en mesa, con picante al gusto. (opción sin gluten).", "Dióxido de Azufre y SulfitosHuevosPescadoSojaMostaza")

    # Marinera
    cat = "Alma Marinera"
    add_carta("Merluza en salsa verde", 26.00, cat, "Merluza a la brasa con salsa verde y acompañado de mini patatas asadas.", "Pescado")
    add_carta("Rape a la Mediterránea", 29.00, cat, "Rape a la brasa acompañado de tomate cherry, albahaca, piquillos, mini patatas y tomillo.", "LácteosPescado")
    add_carta("Chipirones encebollados", 29.00, cat, "Chipirones salteados y guisados con cebolla caramelizada y guindilla vasca.", "Moluscos")
    add_carta("Pulpo a la brasa con espuma de patata", 28.00, cat, "Pulpo a la brasa de carbón leña con espuma de puré de patata, pimentón dulce de la vera y AOVE.", "LácteosMoluscos")
    add_carta("Txangurro a la Donostiarra", 26.00, cat, "Centollo desmigado gratinado con crema de mariscos, cebolla caramelizada, Brandy y mantequilla. Acompañado de pan cristal.", "LácteosCrustáceosMoluscos")

    # Guarniciones
    cat = "Guarniciones"
    add_carta("Ensalada a la Donostiarra", 4.00, cat, "", "Dióxido de Azufre y Sulfitos")
    add_carta("Patatas fritas", 4.00, cat)
    add_carta("Piquillos confitados", 6.00, cat)
    add_carta("Pan cristal con tomate", 4.50, cat)

    # Postres
    cat = "Alma Pastelera"
    add_carta("Brownie de chocolate", 9.00, cat, "Brownie de chocolate negro y mantequilla tostada acompañado de helado de caramelo salado y sal Maldon.", "LácteosHuevosFrutos de Cáscara")
    add_carta("Coulant de avellana", 11.00, cat, "Coulant de avellana horneado al momento (8min), fundido por dentro, acompañado de helado de frutos rojos.", "Dióxido de Azufre y SulfitosLácteosHuevosFrutos de Cáscara")
    add_carta("Milhojas de maracuyá", 12.00, cat, "Milhojas con crema diplomática de maracuyá y helado de coco.", "Lácteos")
    add_carta("Torrija de toffee y jengibre", 9.00, cat, "Torrija en pan brioche macerada en toffee, jengibre y cítricos, acompañado de helado de café.", "Dióxido de Azufre y SulfitosLácteosHuevosFrutos de Cáscara")

    # --- VINOS ---
    def add_vino(name, price, category, description="", v_list=None):
        items.append({
            "name": name, 
            "base_price": price, 
            "category": category, 
            "description": description, 
            "variants": variants(v_list) if v_list else [],
            "type": "vinos"
        })

    # Tintos
    add_vino("El Hombre Bala", 41.00, "Tintos DOP Madrid y Sierra de Gredos", "98% Garnacha 2% Cariñena.")
    add_vino("Molaracha", 33.00, "Tintos DOP Madrid y Sierra de Gredos", "95% Garnacha y 5% Malvar. Bodega Tinta Castiza.")
    add_vino("Tolo do Xisto", 37.00, "Tintos DOP Ribera Sacra", "100% Mencía.")
    add_vino("Habla del Silencio", 28.00, "Tintos VT Extremadura", "50% Syrah 30% Tempranillo 20% Cabernet Sauvignon")
    add_vino("Forlong Terracota", 36.00, "Tintos DOVT Cádiz", "100% Tintilla de Rota. Bodegas Forlong.")
    add_vino("Pissarres", 30.00, "Tintos DOCa Priorat", "50% Garnacha 40% Cariñena 10% Cabernet Sauvignon.")
    add_vino("Samsara del Priorat", 37.00, "Tintos DOCa Priorat", "50% Garnacha 35% Cariñena 10% Syrah 5% Cabernet Sauvignon.")
    add_vino("Laderas Bideona Tempranillo", 27.00, "Tintos DOCa Rioja", "100% Tempranillo. Bodega Bideona.")
    add_vino("Heraclio Alfaro Crianza", 26.00, "Tintos DOCa Rioja", "85% Tempranillo, 10% Garnacha y 5% Graciano.")
    add_vino("200 Monges Reserva", 67.00, "Tintos DOCa Rioja", "85% tempranillo, 10% Graciano y 5% Garnacha tinta.")
    add_vino("Marqués de Riscal Reserva", 39.00, "Tintos DOCa Rioja", "100% Tempranillo. Bodega Marqués de Riscal.")
    add_vino("Martínez Lacuesta Selecto Crianza", 26.00, "Tintos DOCa Rioja", "100% Tempranillo.", [("Copa", 4.50), ("Botella", 26.00)])
    add_vino("CM de Matarromera", 36.00, "Tintos DOCa Rioja", "100% Tempranillo. Bodegas Matarromera.")
    add_vino("Azpilicueta Origen", 27.00, "Tintos DOCa Rioja", "100% Tempranillo. Bodega Azpilicueta.")
    add_vino("Beronia Reserva 198 Barricas", 37.00, "Tintos DOCa Rioja", "100% Tempranillo.")
    add_vino("Cristo de Samaniego", 65.00, "Tintos DOCa Rioja", "100% Tempranillo.")
    
    # Ribera
    cat = "DOP Ribera Del Duero"
    add_vino("Malleolus de Emilio Moro", 52.00, cat, "100% Tinto Fino.")
    add_vino("Matarromera Crianza", 41.00, cat, "100% Tempranillo.")
    add_vino("Arzuaga Crianza", 43.00, cat, "95% Tempranillo y 5% Cabernet Sauvignon.")
    add_vino("Aureo", 38.00, cat, "100% Tempranillo. Bodega Avelino Vegas.")
    add_vino("Carmelo Rodero 9 Meses", 33.00, cat, "100% Tempranillo. Bodega Carmelo Rodero.")
    add_vino("Carmelo Rodero Crianza", 44.00, cat, "100% Tempranillo. Bodega Carmelo Rodero.")
    add_vino("Emilio Moro Cosecha", 41.00, cat, "100% Tempranillo. Bodega Emilio Moro.")
    add_vino("Pago de Capellanes Reserva", 57.00, cat, "100% Tempranillo. Bodega Pago de Capellanes.")
    add_vino("Melior Roble", 26.00, cat, "100% Tempranillo.", [("Copa", 4.50), ("Botella", 26.00)])
    add_vino("Prestigio Matarromera", 71.00, cat, "100% Tempranillo.")
    add_vino("Marqués de Burgos 8000", 46.00, cat, "100% Tempranillo. Bodegas LAN.")

    # Otros Tintos
    add_vino("Abadia Retuerta Selección", 51.50, "Tintos VT Castilla y León", "77%Tempranillo, 12% Cabernet Sauvignon, 9% Syrah y 2% Merlot")
    add_vino("Hop-Hop Grillo", 42.00, "Tintos DO Somontano", "50% Syrah y 50% Garnacha. Bodega El Grillo y la Luna.")

    # Blancos
    add_vino("Circe", 27.00, "Blancos. DO Rueda", "100% Verdejo. Bodega Avelino Vegas.")
    add_vino("Melior Verdejo", 24.00, "Blancos. DO Rueda", "100% Verdejo. Bodega Matarromera.", [("Copa", 4.50), ("Botella", 24.00)])
    add_vino("Semidulce La Chalada", 26.00, "Blancos. DO Rueda", "100% Verdejo. Bodega Javier Sanz.", [("Copa", 4.50), ("Botella", 26.00)])
    add_vino("Sanz Sauvignon Blanco", 26.00, "Blancos. DO Rueda", "100% Sauvignon Blanco. Bodega Javier Sanz.")
    add_vino("Belondrade Quinta Apolonia", 39.00, "Blancos VT Tierra de Castilla-León", "100% Verdejo. Bodega Belondrade.")
    add_vino("Díscolo", 37.00, "Blancos VT Tierra de Castilla-León", "Malvasía y Verdejo.")
    add_vino("Terras Gauda", 34.00, "Blancos DO Rías Baixas", "70% Albariño 22% Caiño Blanco 8% Loureiro.")
    add_vino("Martin Codax", 27.00, "Blancos DO Rías Baixas", "100% Albariño.", [("Copa", 4.50), ("Botella", 27.00)])
    add_vino("Santiago Ruiz", 38.00, "Blancos DO Rías Baixas", "74% Albariño, 8% Loureiro, 8% Godello, 5% Treixadura, 5% Caiño Blanco. Bodega Santiago Ruiz.")
    add_vino("Viña Caeira Matarromera", 32.00, "Blancos DO Rías Baixas", "100% Albariño. Bodega Matarromera.")
    add_vino("La Revelia de Emilio Moro", 49.00, "Blancos DO Bierzo", "100% Godello.")
    add_vino("Sonrisa Dominio de Tares", 26.00, "Blancos DO Bierzo", "100% Godello.")
    add_vino("Mara Martín", 27.00, "Blancos D.O. Monterrei", "100% Godello.", [("Copa", 4.50), ("Botella", 27.00)])
    add_vino("Bideona Cabezadas", 27.00, "Blancos DO Rioja", "100% Viura. Bodegas Bideona.")
    add_vino("Nicte Rosa Pálido", 27.00, "Rosados VT Castilla-León", "100% Prieto picudo. Bodega Avelino Vegas.")

    # Cavas
    cat = "Cavas y Champagnes"
    add_vino("Champagne Telmont Reserve Rose", 98.00, cat, "87% Chardonnay y 13% Meunier. Bodega Champagne Telmont.")
    add_vino("Champagne G.H. Mumm", 85.00, cat, "30% Chardonnay, 25% Pinot Meunier, 45% Pinot Noir. Bodega G.H. Mumm.")
    add_vino("Cava Canals Nadal Brut Nature Reserva", 28.00, cat, "45% Macabeu, 40% Xarel·lo, 15% Parellada. Bodega Canals Nadal.", [("Copa", 6.50), ("Botella", 28.00)])
    add_vino("Cava Canals Nadal Brut Rosé", 32.00, cat, "100% Monovarietal de Trepat. Bodegas Canals Nadal.", [("Copa", 7.00), ("Botella", 32.00)])
    add_vino("Cava Canals Nadal BN Reserva Xarel-lo", 34.00, cat, "100 % Xarel-lo. Bodega Canals Nadal.")

    # Generosos
    cat = "Vinos generosos y dulces (Por copa)"
    add_vino("Amontillado Micaela", 4.50, cat, "Palomino Fino")
    add_vino("Manzanilla Micaela", 5.50, cat, "Palomino Fino")
    add_vino("Pedro Ximenez Micaela", 6.50, cat, "Pedro Ximenez")

    # --- ESPIRITUOSOS ---
    def add_spirit(name, price, category, description="", v_list=None):
        items.append({
            "name": name, 
            "base_price": price, 
            "category": category, 
            "description": description, 
            "variants": variants(v_list) if v_list else [],
            "type": "cocteles"
        })

    # Cocteles
    cat = "Cocteles"
    add_spirit("Petroni Spritz", 12.00, cat, "El aperitivo gallego , versión del Aperol spritz con Petroni aperitivo, cava y soda.")
    add_spirit("Rebujito Soho's", 9.00, cat, "Vino fino con limón, hierbabuena y bergamota en spritz.")
    add_spirit("Mojito", 12.00, cat, "Ron blanco, zumo de lima, azúcar de caña, menta , soda.")
    add_spirit("Margarita", 12.00, cat, "Tequila, zumo de lima, licor de naranja y sirope de azúcar.")
    add_spirit("Caipirinha", 12.00, cat, "Caipirinha clásica a base de Cachaza, zumo de lima y azúcar.")

    # Whisky
    cat = "Whisky"
    add_spirit("DYC 8", 11.00, cat, "", [("Copa", 11.00), ("Botella", 100.00)])
    add_spirit("Makers Mark", 12.00, cat, "", [("Copa", 12.00), ("Botella", 120.00)])
    add_spirit("Jameson", 11.00, cat, "", [("Copa", 11.00), ("Botella", 120.00)])
    add_spirit("Hibiki Suntory Harmony", 25.00, cat, "", [("Copa", 25.00), ("Botella", 200.00)])
    add_spirit("Toki Suntory", 14.00, cat, "", [("Copa", 14.00), ("Botella", 120.00)])
    add_spirit("Macallan 12", 18.00, cat)
    add_spirit("JW Black Label", 14.00, cat, "", [("Copa", 14.00), ("Botella", 140.00)])
    add_spirit("JW Red Label", 10.00, cat, "", [("Copa", 10.00), ("Botella", 120.00)])
    add_spirit("J&B", 10.00, cat)
    add_spirit("Dewar's White Label", 10.00, cat, "", [("Copa", 10.00), ("Botella", 100.00)])
    add_spirit("Flaming Pig", 14.00, cat, "", [("Copa", 14.00), ("Botella", 140.00)])
    add_spirit("Chivas 12", 16.00, cat)
    add_spirit("Jack Daniels", 12.00, cat)
    add_spirit("Ballantine's", 10.00, cat)

    # Ron
    cat = "Ron"
    add_spirit("Matusalén 10", 12.00, cat, "", [("Copa", 12.00), ("Botella", 140.00)])
    add_spirit("Zacapa 23", 18.00, cat, "", [("Copa", 18.00), ("Botella", 160.00)])
    add_spirit("Santa Teresa", 10.00, cat, "", [("Copa", 10.00), ("Botella", 100.00)])
    add_spirit("Barceló", 10.00, cat)
    add_spirit("Brugal", 10.00, cat)
    add_spirit("Havana Club Especial", 10.00, cat)

    # Vodka
    cat = "Vodka"
    add_spirit("Absolut", 10.00, cat)
    add_spirit("Grey Goose", 16.00, cat, "", [("Copa", 16.00), ("Botella", 140.00)])

    # Tequila
    cat = "Tequila"
    add_spirit("Olmeca blanco", 10.00, cat, "", [("Corto", 5.00), ("Largo", 10.00)])
    add_spirit("Olmeca Reposado", 10.00, cat, "", [("Corto", 5.00), ("Largo", 10.00)])

    # Gin
    cat = "Gin"
    add_spirit("Martin Miller's", 14.00, cat, "", [("Copa", 14.00), ("Botella", 120.00)])
    add_spirit("G'vine", 16.00, cat, "", [("Copa", 16.00), ("Botella", 140.00)])
    add_spirit("Gin Mare", 16.00, cat, "", [("Copa", 16.00), ("Botella", 140.00)])
    add_spirit("Canaima Gin", 12.00, cat, "", [("Copa", 12.00), ("Botella", 140.00)])
    add_spirit("Bombay Sapphire", 11.00, cat, "", [("Copa", 11.00), ("Botella", 120.00)])
    add_spirit("Roku Gin", 16.00, cat, "", [("Copa", 16.00), ("Botella", 120.00)])
    add_spirit("Larios 12", 11.00, cat, "", [("Copa", 11.00), ("Botella", 100.00)])
    add_spirit("Le Tribute", 16.00, cat, "Ginebra")
    add_spirit("Beefeater", 11.00, cat, "Ginebra")
    add_spirit("Hendrick's", 16.00, cat)
    add_spirit("Puerto de Indias", 11.00, cat)
    add_spirit("Seagram's", 11.00, cat)
    add_spirit("Seagram´s 0'0", 10.00, cat)
    add_spirit("Tanqueray", 11.00, cat)

    # Vermús
    cat = "Vermús"
    add_spirit("Petroni Rojo", 7.00, cat)
    add_spirit("Petroni Blanco", 7.00, cat)
    add_spirit("Martini Bianco", 6.00, cat)
    add_spirit("Martini Dry", 6.00, cat)

    # Licores
    cat = "Licores"
    add_spirit("Licor Baileys", 8.00, cat, "", [("Corto", 5.00), ("Largo", 8.00)])
    add_spirit("Licor Crema de orujo", 6.50, cat, "", [("Corto", 4.00), ("Largo", 6.50)])
    add_spirit("Licor de café", 6.50, cat, "", [("Corto", 4.00), ("Largo", 6.50)])
    add_spirit("Licor de hierbas", 6.50, cat, "", [("Corto", 4.00), ("Largo", 6.50)])
    add_spirit("Licor Limoncello", 6.50, cat, "", [("Corto", 4.00), ("Largo", 6.50)])
    add_spirit("Licor Manzana", 6.50, cat, "", [("Corto", 4.00), ("Largo", 6.50)])
    add_spirit("Licor Orujo", 6.50, cat, "", [("Corto", 4.00), ("Largo", 6.50)])
    add_spirit("Licor pacharán Berezco", 8.00, cat, "", [("Corto", 5.00), ("Largo", 8.00)])

    print(f"Inserting {len(items)} items...")
    for item_data in items:
        # Avoid 'type' for the model if not exists, but we can use it to filter if needed
        # In this DB model MenuItem doesn't have 'type', it uses categories to filter in frontend
        # But wait, let's check models.py
        db_item = models.MenuItem(
            name=item_data["name"],
            description=item_data.get("description", ""),
            base_price=item_data["base_price"],
            category=item_data["category"],
            allergens=item_data.get("allergens", []),
            variants=item_data.get("variants", [])
        )
        db.add(db_item)
    
    db.commit()
    db.close()
    print("'El Jardin' menu refactored successfully with 3 separate lists!")

if __name__ == "__main__":
    seed_full_menu()
