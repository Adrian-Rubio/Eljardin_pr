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
    # Verify credentials explicitly
    if not conf.MAIL_PASSWORD or conf.MAIL_PASSWORD == "tu_password":
        print("ERROR: Mail credentials not configured.")
        raise HTTPException(status_code=500, detail="Configuration error: Email credentials missing.")

    html = f"""
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2 style="color: #858b64;">Nueva Solicitud de Evento</h2>
        <hr style="border: 0; border-top: 1px solid #ddd;" />
        <p><strong>Nombre:</strong> {contact_data.name}</p>
        <p><strong>Email:</strong> <a href="mailto:{contact_data.email}">{contact_data.email}</a></p>
        <p><strong>Teléfono:</strong> {contact_data.phone}</p>
        <p><strong>Empresa:</strong> {contact_data.company or 'No especificada'}</p>
        <br/>
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px;">
            <p style="margin-top: 0;"><strong>Mensaje:</strong></p>
            <p style="white-space: pre-wrap;">{contact_data.message or 'Sin mensaje adicional'}</p>
        </div>
    </div>
    """

    message = MessageSchema(
        subject=f"Nuevo Evento: {contact_data.name}",
        recipients=[os.getenv("MAIL_RECIPIENT", "arubio@cenval.es")],
        body=html,
        subtype=MessageType.html
    )

    fm = FastMail(conf)
    
    try:
        # Using await to catch errors immediately during the request
        await fm.send_message(message)
        print(f"Email sent successfully to {message.recipients}")
        return {"message": "Email sent successfully"}
    except Exception as e:
        print(f"CRITICAL ERROR SENDING EMAIL: {str(e)}")
        # Raise HTTP exception so frontend catches it
        raise HTTPException(status_code=500, detail=f"Failed to send email: {str(e)}")
