import sys
import os

# Add the current directory to sys.path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from database import SessionLocal, engine
import models
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["sha256_crypt"], deprecated="auto")

def seed_config():
    models.Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    
    # Real data for El Jardin
    contact_data = {
        "address": "Calle de Arturo Soria 126, 28043, Madrid.",
        "phone": "+34 912 345 678", # Placeholder
        "email": "info@eljardinarturosoria.com",
        "reservation_email": "reservas@eljardinarturosoria.com",
        "hours": "Lunes a Domingo: 13:00 - 01:00"
    }

    seeds = [
        ("contact_info", contact_data),
        ("welcomeTitle", "NATURALEZA Y GASTRONOMÍA"),
        ("welcomeSubtitle", "Bienvenido a El Jardín de Arturo Soria, un refugio exclusivo donde la elegancia y el sabor se encuentran en un entorno inolvidable."),
        ("heroBtn1", {"text": "Nuestra Carta", "link": "/menu", "style": "btn-primary"}),
        ("heroBtn2", {"text": "Reservar Mesa", "link": "/reservations", "style": "btn-secondary"}),
        ("eventsTitle", "EVENTOS EXCLUSIVOS"),
        ("eventsSubtitle", "Celebra tus momentos más especiales rodeado de la magia de nuestro jardín."),
        ("menuTitle", "NUESTRA CARTA"),
        ("menuSubtitle", "Gastronomía de producto, respetando la tradición con un toque contemporáneo."),
        ("menuEmptyState", "Estamos actualizando nuestra selección de platos de temporada."),
        ("reservationsTitle", "RESERVA TU EXPERIENCIA"),
        ("reservationsSubtitle", "Asegura tu lugar en nuestro oasis. Te esperamos con la mesa lista."),
        ("reservationsBtn", {"text": "RESERVAR MESA", "link": "/reservations", "style": "btn-primary"}),
        ("reservationsPhone", "También puedes llamarnos al +34 912 345 678")
    ]

    for k, v in seeds:
        db_config = db.query(models.SiteConfig).filter(models.SiteConfig.key == k).first()
        if not db_config:
            db_config = models.SiteConfig(key=k, value=v)
            db.add(db_config)

    # Super User
    admin_user = db.query(models.User).filter(models.User.username == "arubio").first()
    if not admin_user:
        hashed_pwd = pwd_context.hash("gulaAdmin2202")
        admin_user = models.User(
            username="arubio",
            hashed_password=hashed_pwd,
            is_admin=True,
            is_superuser=True
        )
        db.add(admin_user)
        print("Super usuario arubio creado correctamente.")

    # Initial Blog Posts
    if not db.query(models.BlogPost).first():
        db.add(models.BlogPost(
            title="Noche de Jazz & BBQ",
            content="Ven a disfrutar de una velada única con los mejores músicos de jazz locales mientras degustas nuestras icónicas alitas.",
            image_url="/images/Wings.jpeg"
        ))
        db.add(models.BlogPost(
            title="Secretos del Ahumado",
            content="Descubre cómo preparamos nuestro Pulled Pork en una sesión especial con nuestro Pitmaster.",
            image_url="/images/pulled pork.jpeg"
        ))

    db.commit()
    db.close()
    print("¡Datos del local cargados correctamente en la BBDD!")

if __name__ == "__main__":
    seed_config()
