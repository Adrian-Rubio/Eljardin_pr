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
# Email Configuration
conf = ConnectionConfig(
    MAIL_USERNAME=os.getenv("MAIL_USERNAME", "reservaseljardin207@gmail.com"),
    MAIL_PASSWORD=os.getenv("MAIL_PASSWORD", "ecgn emos nbbi idqp"),
    MAIL_FROM=os.getenv("MAIL_FROM", "reservaseljardin207@gmail.com"),
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
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
    </head>
    <body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: 'Times New Roman', serif;">
        <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
            <!-- HEADER -->
            <div style="background-color: #ffffff; padding: 40px 20px; text-align: center; border-bottom: 1px solid #eaeaea;">
                <h1 style="margin: 0; color: #1a1a1a; font-size: 28px; letter-spacing: 4px; text-transform: uppercase; font-weight: 500;">El Jardín</h1>
                <p style="margin: 10px 0 0; color: #c5a04f; font-size: 14px; letter-spacing: 2px; text-transform: uppercase;">de Arturo Soria</p>
            </div>

            <!-- TITLE -->
            <div style="padding: 30px 40px 10px; text-align: center;">
                <h2 style="color: #1a1a1a; font-size: 22px; margin: 0; text-transform: uppercase; letter-spacing: 2px; font-weight: 400;">Nueva Petición de Evento</h2>
                <div style="width: 40px; height: 2px; background-color: #c5a04f; margin: 15px auto 0;"></div>
            </div>

            <!-- CONTENT -->
            <div style="padding: 20px 40px 40px;">
                <!-- SECTION 1: DATOS CLAVE -->
                <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
                    <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Tipo de Cliente</td>
                        <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #1a1a1a; font-size: 16px; text-align: right; font-weight: bold;">{client_type_label}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Nombre</td>
                        <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #1a1a1a; font-size: 16px; text-align: right;">{contact_data.name}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Email</td>
                        <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; text-align: right;">
                            <a href="mailto:{contact_data.email}" style="color: #c5a04f; text-decoration: none; font-size: 16px;">{contact_data.email}</a>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Teléfono</td>
                        <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #1a1a1a; font-size: 16px; text-align: right;">{contact_data.phone}</td>
                    </tr>
                    {f'<tr><td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Empresa</td><td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #1a1a1a; font-size: 16px; text-align: right;">{contact_data.company}</td></tr>' if contact_data.client_type == 'empresa' and contact_data.company else ''}
                </table>

                <!-- SECTION 2: MENSAJE -->
                <div style="background-color: #fcfcfc; padding: 25px; border: 1px solid #eee; border-left: 3px solid #c5a04f;">
                    <h3 style="margin-top: 0; color: #c5a04f; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px;">Detalles / Mensaje</h3>
                    <p style="margin: 0; color: #555; white-space: pre-wrap; line-height: 1.6; font-style: italic;">{contact_data.message or 'Sin mensaje adicional'}</p>
                </div>
            </div>

            <!-- FOOTER -->
            <div style="background-color: #1a1a1a; padding: 20px; text-align: center;">
                <p style="color: #666; font-size: 11px; margin: 0; letter-spacing: 1px; text-transform: uppercase;">El Jardín de Arturo Soria</p>
            </div>
        </div>
    </body>
    </html>
    """

    message = MessageSchema(
        subject=f"Solicitud Evento ({client_type_label}): {contact_data.name}",
        recipients=[os.getenv("MAIL_RECIPIENT", "reservas@eljardindearturosoria.com")],
        body=html,
        subtype=MessageType.html
    )

    # --- DEBUG: LOG EMAIL TO CONSOLE ---
    print(f"DEBUG: Email would be sent to {message.recipients} with subject: {message.subject}")
    # -----------------------------------

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
