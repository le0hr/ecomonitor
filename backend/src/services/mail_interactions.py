from aiosmtplib import send
from config import settings
from email.message import EmailMessage
async def send_mail_to_applicant(data ):
    msg = EmailMessage()
    msg["From"] = settings.email_from
    msg["To"] = data.email
    msg["Subject"] = "New Join Request"

    msg.set_content(f"""
    Hello. We appreciate your willing to join our fight for environment.
    We will contact you soon regarding your application. 
    """)

    try:
        await send(
            msg,
            hostname=settings.email_host,
            port= settings.email_port,
            username=settings.email_user,
            password=settings.email_password,
            start_tls=True,
        )
        return {"status": "ok"}
    except Exception as e:
        print(e)
        return {"status": "error"}

async def send_mail_to_host(data):
    msg = EmailMessage()
    msg["From"] = settings.email_from
    msg["To"] = settings.email_from
    msg["Subject"] = "New Join Request"

    msg.set_content(f"""
    New join request from {data.email}:

    Name: {data.name}
    Phone number: {data.phone_number}
    Message: \n {data.message} 
    """)
    try:
        await send(
            msg,
            hostname=settings.email_host,
            port= settings.email_port,
            username=settings.email_user,
            password=settings.email_password,
            start_tls=True,
        )
        return {"status": "ok"}
    except Exception as e:
        print(e)
        return {"status": "error"}
