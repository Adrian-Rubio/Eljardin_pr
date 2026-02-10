"""
Script de utilidad para verificar el contenido de la base de datos PostgreSQL.
Uso: python scripts/db_check.py [nombre_tabla]
"""
import sys
import os
from sqlalchemy import create_engine, text

# Añadir el directorio raíz al path para poder importar módulos del backend
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from backend.database import SQLALCHEMY_DATABASE_URL

def check_table(table_name="users"):
    try:
        engine = create_engine(SQLALCHEMY_DATABASE_URL)
        with engine.connect() as connection:
            result = connection.execute(text(f"SELECT * FROM {table_name} LIMIT 5"))
            print(f"\n--- Contenido de la tabla '{table_name}' (Primeras 5 filas) ---")
            for row in result:
                print(row)
    except Exception as e:
        print(f"Error al consultar la tabla {table_name}: {e}")

if __name__ == "__main__":
    table = sys.argv[1] if len(sys.argv) > 1 else "users"
    check_table(table)
