# Plan de Implementación: Footer Premium y Sistema de Cartas

Este plan detalla los pasos para replicar el diseño del Footer de la referencia y configurar el sistema de menús editables sin imágenes.

## 1. Rediseño del Footer (Fase Visual)
*   **Color de Fondo**: Cambiar a negro antracita/gris oscuro (`#333333` o similar).
*   **Estructura**: Implementar grid de 5-6 columnas:
    1.  Logo Principal (Grande, a la izquierda).
    2.  Columna "CONTACTO": Íconos + Texto editable.
    3.  Columna "UBICACIÓN": Dirección + Link "Cómo llegar".
    4.  Columna "VALET": Ícono de Aparcacoches + Texto.
    5.  Columna "RESERVAS": Botón blanco con texto negro central.
    6.  Columna "GRUPO": Logo "Alma of Spain GRUPO".
*   **Pie de Footer**: Enlaces legales (Privacidad, Cookies, Aviso) alineados a la derecha en tamaño pequeño.

## 2. Configuración de Base de Datos y "CARTAS"
*   **Verificación**: Comprobar esquema de `restaurant.db` para asegurar tablas de `categories` y `menu_items`.
*   **Lógica de Menú**: 
    *   Crear una página base `Menu.jsx` que filtre por categoría (ej. Carta Principal, Carta de Vinos, Carta de Postres).
    *   Actualizar `Navbar.jsx` para incluir un desplegable o links específicos en "CARTAS".
*   **Estilo de Carta**: Diseño elegante tipográfico (nombre, descripción, precio) sin placeholders de imágenes, manteniendo la estética minimalista.
*   **Editabilidad**: Asegurar que los títulos de sección y descripciones usen los componentes `EditableText`.

## 3. Verificación de Entorno (Gulah Consistency)
*   Verificar si `backend/app.py` o `main.py` tiene las mismas rutas que el proyecto Gulah.
*   Comprobar `package.json` para asegurar que dependencias como `lucide-react`, `framer-motion` y los contextos de configuración están presentes.

---
**¿Deseas que comience con la transformación del Footer ahora mismo?**
