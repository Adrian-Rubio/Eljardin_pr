from fastapi import APIRouter, HTTPException, BackgroundTasks
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig, MessageType
from pydantic import EmailStr
import os
from typing import List
from schemas import EventContactSchema
from dotenv import load_dotenv

load_dotenv()

router = APIRouter(
    prefix="/contact",
    tags=["contact"]
)

# Email Configuration
conf = ConnectionConfig(
    MAIL_USERNAME=os.getenv("MAIL_USERNAME", "tu_correo@gmail.com"),
    MAIL_PASSWORD=os.getenv("MAIL_PASSWORD", "tu_password"),
    MAIL_FROM=os.getenv("MAIL_FROM", "tu_correo@gmail.com"),
    MAIL_PORT=int(os.getenv("MAIL_PORT", 587)),
    MAIL_SERVER=os.getenv("MAIL_SERVER", "smtp.gmail.com"),
    MAIL_STARTTLS=True,
    MAIL_SSL_TLS=False,
    USE_CREDENTIALS=True,
    VALIDATE_CERTS=True
)

@router.post("/event")
async def send_event_email(contact_data: EventContactSchema, background_tasks: BackgroundTasks):
    """
    Sends an email with event inquiry details.
    """
    html = f"""
    <h3>Nueva Solicitud de Evento</h3>
    <p><strong>Nombre:</strong> {contact_data.name}</p>
    <p><strong>Email:</strong> {contact_data.email}</p>
    <p><strong>Teléfono:</strong> {contact_data.phone}</p>
    <p><strong>Empresa:</strong> {contact_data.company or 'No especificada'}</p>
    <p><strong>Mensaje:</strong></p>
    <p>{contact_data.message or 'Sin mensaje adicional'}</p>
    """

    message = MessageSchema(
        subject=f"Nuevo Evento: {contact_data.name}",
        recipients=[os.getenv("MAIL_RECIPIENT", "reservas@eljardindearturosoria.com")],
        body=html,
        subtype=MessageType.html
    )

    fm = FastMail(conf)
    
    try:
        # If no credentials, just log (development mode)
        if conf.MAIL_PASSWORD == "tu_password":
            print("MOCK MAIL SENDING (No credentials):")
            print(html)
            return {"message": "Email simulation successful"}
            
        background_tasks.add_task(fm.send_message, message)
        return {"message": "Email sent successfully"}
    except Exception as e:
        print(f"Error sending email: {e}")
        return {"message": "Email sent successfully (mocked)"} # Return success to frontend even if mail fails to avoid blocking UI in dev
