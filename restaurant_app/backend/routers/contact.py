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

print(f"DEBUG: Email Config Loaded. Server: {conf.MAIL_SERVER}, Port: {conf.MAIL_PORT}, User: {conf.MAIL_USERNAME}")


@router.post("/event")
async def send_event_email(contact_data: EventContactSchema, background_tasks: BackgroundTasks):
    """
    Sends an email with event inquiry details.
    """
    # Verify credentials explicitly
    # Credentials check removed to allow mock mode for testing

    client_type_label = "Empresa" if contact_data.client_type == "empresa" else "Particular"
    
    html = f"""
    <div style="font-family: 'Times New Roman', serif; padding: 30px; color: #1a1a1a; background-color: #fcfcfc;">
        <div style="border: 1px solid #c5a04f; padding: 20px; max_width: 600px; margin: 0 auto;">
            <h2 style="color: #c5a04f; text-align: center; border-bottom: 2px solid #c5a04f; padding-bottom: 10px; margin-top: 0;">Petición de Evento</h2>
            
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Tipo de Cliente:</strong></td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee; text-transform: capitalize;">{client_type_label}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Nombre:</strong></td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee;">{contact_data.name}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee;"><a href="mailto:{contact_data.email}" style="color: #c5a04f; text-decoration: none;">{contact_data.email}</a></td>
                </tr>
                <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Teléfono:</strong></td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee;">{contact_data.phone}</td>
                </tr>
                {f'<tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Empresa:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;">{contact_data.company}</td></tr>' if contact_data.client_type == 'empresa' and contact_data.company else ''}
            </table>

            <div style="background-color: #f9f9f9; padding: 15px; margin-top: 20px; border-left: 3px solid #c5a04f;">
                <p style="margin-top: 0; font-weight: bold; color: #555;">Mensaje / Detalles:</p>
                <p style="white-space: pre-wrap; font-style: italic;">{contact_data.message or 'Sin mensaje adicional'}</p>
            </div>
            
            <p style="font-size: 12px; color: #999; text-align: center; margin-top: 30px;">
                Solicitud recibida desde la web El Jardín de Arturo Soria
            </p>
        </div>
    </div>
    """

    message = MessageSchema(
        subject=f"Solicitud Evento ({client_type_label}): {contact_data.name}",
        recipients=[os.getenv("MAIL_RECIPIENT", "arubio@cenval.es")],
        body=html,
        subtype=MessageType.html
    )

    # --- DEBUG: LOG EMAIL TO CONSOLE ---
    # --- DEBUG: LOG EMAIL TO CONSOLE (Keep this for now if you want to see data) ---
    print(f"DEBUG: Email would be sent to {message.recipients} with subject: {message.subject}")
    # -----------------------------------
    # -----------------------------------

    # SKIP ACTUAL SENDING IF CREDENTIALS ARE PLACEHOLDERS
    # if "tu_email" in conf.MAIL_USERNAME or "tu_password" in conf.MAIL_PASSWORD:
    #     print("DEBUG MODE: Skipping actual SMTP send because credentials are placeholders.")
    #     return {"message": "Email sent successfully (MOCK MODE)"}

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
