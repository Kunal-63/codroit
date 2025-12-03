import csv
import smtplib
import ssl
from email.message import EmailMessage
from pathlib import Path

# ============ CONFIG ============
SMTP_SERVER = "smtp.gmail.com"      # e.g. for Gmail
SMTP_PORT = 587                     # 587 for TLS
SENDER_EMAIL = "kunaladwani.work@gmail.com"
SENDER_PASSWORD = "syoz usjb ibbp enos"  # Use app password if using Gmail

CSV_PATH = "recipients.csv"         # CSV file with a column named 'email'
ATTACHMENT_PATH = "Kunal Adwani CV.pdf"  # PDF file to send to everyone
# ================================

SUBJECT = "Inquiry Regarding Suitable Opportunities"

BODY = """Greetings,

I hope you are doing well.

My name is Kunal Adwani, and I am a Full Stack Developer with experience in building scalable APIs, integrating Generative AI (LangChain & RAG), and deploying applications using AWS.

I am currently exploring new career opportunities and wanted to check if there are any suitable vacancies where my skills could add value to your team.

Thank you for considering my inquiry. I would greatly appreciate an opportunity to discuss potential openings that align with my expertise.

Regards,
Kunal Adwani
+91 7990187279 | kunaladwani.work@gmail.com
LinkedIn:  Kunal Adwani | https://www.linkedin.com/in/kunaladwani/
Portfolio: https://kunaladwani.vercel.app/
"""

def load_recipients(csv_path):
    emails = []
    with open(csv_path, newline='', encoding="utf-8") as f:
        reader = csv.DictReader(f)
        if "email" not in reader.fieldnames:
            raise ValueError("CSV must have a column named 'email'")
        for row in reader:
            email = row["email"].strip()
            if email:
                emails.append(email)
    return emails

def create_message(to_email, attachment_path: Path) -> EmailMessage:
    msg = EmailMessage()
    msg["From"] = SENDER_EMAIL
    msg["To"] = to_email
    msg["Subject"] = SUBJECT
    msg.set_content(BODY)

    # Attach PDF
    if attachment_path.exists():
        with attachment_path.open("rb") as f:
            file_data = f.read()
            file_name = attachment_path.name

        msg.add_attachment(
            file_data,
            maintype="application",
            subtype="pdf",
            filename=file_name
        )
    else:
        print(f"WARNING: Attachment not found: {attachment_path}")

    return msg

def main():
    attachment_path = Path(ATTACHMENT_PATH)
    recipients = load_recipients(CSV_PATH)

    # Remove duplicate emails
    recipients = list(set(recipients))

    if not recipients:
        print("No recipients found in CSV.")
        return

    context = ssl.create_default_context()

    with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
        server.starttls(context=context)
        server.login(SENDER_EMAIL, SENDER_PASSWORD)

        for email in recipients:
            try:
                msg = create_message(email, attachment_path)
                server.send_message(msg)
                print(f"Sent to: {email}")
            except Exception as e:
                print(f"Failed to send to {email}: {e}")

if __name__ == "__main__":
    main()
