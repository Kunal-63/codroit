from flask import Flask, render_template, request, redirect, url_for, flash
import csv
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime

app = Flask(__name__, static_folder='.', static_url_path='')
app.secret_key = os.environ.get('FLASK_SECRET', 'dev-secret-change-me')

# SMTP Configuration (using environment variables for security)
SMTP_SERVER = os.environ.get('SMTP_SERVER', 'smtp.gmail.com')
SMTP_PORT = int(os.environ.get('SMTP_PORT', '587'))
SMTP_USERNAME = os.environ.get('SMTP_USERNAME', 'kunaladwani.work@gmail.com')
SMTP_PASSWORD = os.environ.get('SMTP_PASSWORD', 'syoz usjb ibbp enos')
COMPANY_EMAIL = os.environ.get('COMPANY_EMAIL', 'info@codroit.in')
COMPANY_NAME = 'Codroit'


@app.route('/', methods=['GET'])
def home():
    return render_template('index.html')


@app.route('/about', methods=['GET'])
def about():
    return render_template('about.html')


@app.route('/services', methods=['GET'])
def services():
    return render_template('services.html')


@app.route('/portfolio', methods=['GET'])
def portfolio():
    return render_template('portfolio.html')


def send_email(to_email, subject, html_body, text_body=None):
    """Send email using SMTP"""
    if not SMTP_USERNAME or not SMTP_PASSWORD:
        print('SMTP credentials not configured. Email not sent.')
        return False
    
    try:
        # Create message
        msg = MIMEMultipart('alternative')
        msg['From'] = SMTP_USERNAME
        msg['To'] = to_email
        msg['Subject'] = subject
        
        # Add both plain text and HTML versions
        if text_body:
            part1 = MIMEText(text_body, 'plain')
            msg.attach(part1)
        
        part2 = MIMEText(html_body, 'html')
        msg.attach(part2)
        
        # Connect to SMTP server and send
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()
            server.login(SMTP_USERNAME, SMTP_PASSWORD)
            server.send_message(msg)
        
        return True
    except Exception as e:
        print(f'Error sending email: {e}')
        return False


@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        # Get form data
        first_name = request.form.get('first_name', '').strip()
        last_name = request.form.get('last_name', '').strip()
        email = request.form.get('email', '').strip()
        subject = request.form.get('subject', '').strip()
        message = request.form.get('message', '').strip()
        
        # Validate required fields
        if not first_name or not last_name or not email or not message:
            flash('Please fill in all required fields.', 'danger')
            return redirect(url_for('contact'))
        
        data = {
            'first_name': first_name,
            'last_name': last_name,
            'email': email,
            'subject': subject,
            'message': message,
        }
        
        csv_file = 'messages.csv'
        write_header = not os.path.exists(csv_file)
        try:
            with open(csv_file, 'a', newline='', encoding='utf-8') as f:
                writer = csv.DictWriter(f, fieldnames=list(data.keys()))
                if write_header:
                    writer.writeheader()
                writer.writerow(data)
        except Exception as e:
            print('Failed to write message:', e)
        
        # Send email to company
        full_name = f"{first_name} {last_name}"
        company_subject = f"New Contact Form Submission: {subject}" if subject else "New Contact Form Submission"
        
        company_html = f"""
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #1e3a5f; border-bottom: 3px solid #00bcd4; padding-bottom: 10px;">New Contact Form Submission</h2>
                <p><strong>Name:</strong> {full_name}</p>
                <p><strong>Email:</strong> {email}</p>
                {f'<p><strong>Subject:</strong> {subject}</p>' if subject else ''}
                <p><strong>Message:</strong></p>
                <div style="background: #f5f5f5; padding: 15px; border-left: 4px solid #00bcd4; margin: 15px 0;">
                    {message.replace(chr(10), '<br>')}
                </div>
                <p style="color: #666; font-size: 12px; margin-top: 30px;">
                    Received on {datetime.now().strftime('%B %d, %Y at %I:%M %p')}
                </p>
            </div>
        </body>
        </html>
        """
        
        company_text = f"""
New Contact Form Submission

Name: {full_name}
Email: {email}
{('Subject: ' + subject + chr(10)) if subject else ''}
Message:
{message}

Received on {datetime.now().strftime('%B %d, %Y at %I:%M %p')}
        """
        
        # Send confirmation email to sender
        confirmation_subject = "Thank you for contacting Codroit"
        confirmation_html = f"""
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #1e3a5f; border-bottom: 3px solid #00bcd4; padding-bottom: 10px;">Thank You, {first_name}!</h2>
                <p>We have received your message and will get back to you as soon as possible.</p>
                <div style="background: #f5f5f5; padding: 15px; border-left: 4px solid #00bcd4; margin: 20px 0;">
                    <p><strong>Your Message:</strong></p>
                    <p>{message.replace(chr(10), '<br>')}</p>
                </div>
                <p>Our team typically responds within 24-48 hours during business days.</p>
                <p>If you have any urgent inquiries, please feel free to call us at <strong>+91 95748 08771</strong>.</p>
                <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
                <p style="color: #666; font-size: 12px;">
                    Best regards,<br>
                    <strong>The Codroit Team</strong><br>
                    <a href="mailto:info@codroit.in" style="color: #00bcd4;">info@codroit.in</a> | 
                    <a href="tel:+919574808771" style="color: #00bcd4;">+91 95748 08771</a>
                </p>
            </div>
        </body>
        </html>
        """
        
        confirmation_text = f"""
Thank You, {first_name}!

We have received your message and will get back to you as soon as possible.

Your Message:
{message}

Our team typically responds within 24-48 hours during business days.
If you have any urgent inquiries, please feel free to call us at +91 98765 43210.

Best regards,
The Codroit Team
info@codroit.in | +91 98765 43210
        """
        
        # Send emails
        email_sent = False
        if SMTP_USERNAME and SMTP_PASSWORD:
            # Send to company
            send_email(COMPANY_EMAIL, company_subject, company_html, company_text)
            # Send confirmation to sender
            email_sent = send_email(email, confirmation_subject, confirmation_html, confirmation_text)
        
        if email_sent:
            flash('Thank you! Your message has been sent. We\'ve also sent you a confirmation email.', 'success')
        else:
            flash('Thank you! Your message has been received. (Note: Email service not configured)', 'success')
        
        return redirect(url_for('contact'))
    
    return render_template('contact.html')


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)
