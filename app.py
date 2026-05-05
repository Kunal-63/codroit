import os
import json
import math
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from flask import Flask, render_template, send_from_directory, request, jsonify

app = Flask(__name__)

# Load projects once at startup
_PROJECTS_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'static', 'projects.json')
with open(_PROJECTS_PATH, 'r', encoding='utf-8') as _f:
    ALL_PROJECTS = json.load(_f)

# ─── Gmail SMTP Config ───────────────────────────────────────────────────────
# Set these environment variables before running the app:
#   set GMAIL_USER=contact.codroit@gmail.com
#   set GMAIL_APP_PASSWORD=your_gmail_app_password_here
#
# To generate an App Password:
#   1. Go to https://myaccount.google.com/apppasswords
#   2. Select "Mail" and your device, then click Generate
#   3. Use that 16-character password as GMAIL_APP_PASSWORD
# ─────────────────────────────────────────────────────────────────────────────
GMAIL_USER     = os.environ.get('GMAIL_USER', 'contact.codroit@gmail.com')
GMAIL_PASSWORD = os.environ.get('GMAIL_APP_PASSWORD', 'llpn aikm zxem ukcg')      # Set this via env var
NOTIFY_TO      = 'info@codroit.in'   # Where to receive contact form emails


@app.route('/')
def home():
    return render_template('index.html')

@app.route('/services')
def services():
    return render_template('services.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/portfolio')
def portfolio():
    return render_template('portfolio.html')

@app.route('/project/<int:project_id>')
def project(project_id):
    project = next((p for p in ALL_PROJECTS if p.get('id') == project_id), None)
    if not project:
        from flask import abort
        abort(404)

    def _clean_text(value, fallback):
        text = (value or '').strip() if isinstance(value, str) else ''
        return text if text else fallback

    normalized = dict(project)
    normalized['service'] = _clean_text(normalized.get('service'), 'Project Delivery')
    normalized['title'] = _clean_text(normalized.get('title'), 'Case Study')
    normalized['badgeName'] = _clean_text(normalized.get('badgeName'), 'Case Study')
    normalized['badgeColor'] = _clean_text(normalized.get('badgeColor'), 'primary')
    normalized['client'] = _clean_text(normalized.get('client'), 'Confidential Client')
    normalized['duration'] = _clean_text(normalized.get('duration'), 'Timeline available on request')
    normalized['team'] = _clean_text(normalized.get('team'), 'Cross-functional team')
    normalized['result'] = _clean_text(normalized.get('result'), 'Business impact delivered')
    normalized['challenge'] = _clean_text(normalized.get('challenge'), 'Project challenge details will be shared soon.')
    normalized['solution'] = _clean_text(normalized.get('solution'), 'Implementation details will be shared soon.')
    normalized['outcome'] = _clean_text(normalized.get('outcome'), 'Outcome summary will be shared soon.')
    normalized['cardIcon'] = _clean_text(normalized.get('cardIcon'), 'bi-briefcase')

    image_url = _clean_text(normalized.get('imageUrl'), '/static/images/projects/Marketing/national_seo_strategy.jpg')
    normalized['imageUrl'] = image_url

    raw_gallery = normalized.get('gallery')
    raw_gallery = raw_gallery if isinstance(raw_gallery, list) else []
    gallery = [img for img in raw_gallery if isinstance(img, str) and img.strip()]
    if image_url and image_url not in gallery:
        gallery.insert(0, image_url)
    normalized['gallery'] = list(dict.fromkeys(gallery))

    related = [
        p for p in ALL_PROJECTS
        if p.get('id') != project_id and p.get('categoryId', '').lower() == normalized.get('categoryId', '').lower()
    ][:3]

    return render_template('project.html', p=normalized, related_projects=related)

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'GET':
        return render_template('contact.html')

    # ── POST: handle contact form submission ──────────────────────────────────
    first_name = (request.form.get('first_name') or '').strip()
    last_name  = (request.form.get('last_name')  or '').strip()
    email      = (request.form.get('email')      or '').strip()
    phone      = (request.form.get('phone')      or '').strip()
    company    = (request.form.get('company')    or '').strip()
    service    = (request.form.get('service')    or '').strip()
    message    = (request.form.get('message')    or '').strip()

    if not first_name or not email:
        return jsonify({'status': 'error', 'message': 'Name and email are required.'}), 400

    full_name = f"{first_name} {last_name}".strip()

    # Build a nicely formatted email body for admin (plain text)
    body = f"""
New message from the Codroit website contact form.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   CONTACT DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name      : {full_name}
Email     : {email}
Phone     : {phone or 'Not provided'}
Company   : {company or 'Not provided'}
Service   : {service or 'Not specified'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   MESSAGE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
{message or '(No message provided)'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Sent via codroit.in contact form
"""

    # Build a nicely formatted email body for admin (HTML)
    body_html = f"""
    <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #0b5ed7;">New message from the Codroit website contact form.</h2>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
            <h3 style="border-bottom: 2px solid #ddd; padding-bottom: 5px; margin-top: 0;">Contact Details</h3>
            <table style="width: 100%; max-width: 600px;">
                <tr><td style="width: 100px; font-weight: bold; padding: 4px 0;">Name:</td><td>{full_name}</td></tr>
                <tr><td style="font-weight: bold; padding: 4px 0;">Email:</td><td>{email}</td></tr>
                <tr><td style="font-weight: bold; padding: 4px 0;">Phone:</td><td>{phone or 'Not provided'}</td></tr>
                <tr><td style="font-weight: bold; padding: 4px 0;">Company:</td><td>{company or 'Not provided'}</td></tr>
                <tr><td style="font-weight: bold; padding: 4px 0;">Service:</td><td>{service or 'Not specified'}</td></tr>
            </table>
            
            <h3 style="border-bottom: 2px solid #ddd; padding-bottom: 5px; margin-top: 20px;">Message</h3>
            <p style="white-space: pre-wrap; margin-bottom: 0;">{message or '(No message provided)'}</p>
        </div>
        
        <p style="margin-top: 30px; font-size: 0.9em; color: #666; border-top: 1px solid #eee; padding-top: 10px;">
            Sent via codroit.in contact form
        </p>
      </body>
    </html>
    """

    # Build plain text body for sender
    sender_body = f"""
Dear {first_name},

Thank you for reaching out to Codroit. We have successfully received your message and our team will get back to you within 24 hours.

For your records, here is a copy of what you submitted:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   CONTACT DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name      : {full_name}
Email     : {email}
Phone     : {phone or 'Not provided'}
Company   : {company or 'Not provided'}
Service   : {service or 'Not specified'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   MESSAGE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
{message or '(No message provided)'}

Best regards,
The Codroit Team
https://codroit.in
"""

    # Build HTML body for sender
    sender_body_html = f"""
    <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0b5ed7;">Thank you for contacting Codroit</h2>
        <p>Dear {first_name},</p>
        <p>Thank you for reaching out to us. We have successfully received your message and our team will get back to you within 24 hours.</p>
        <p>For your records, here is a copy of your submission:</p>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-top: 20px;">
            <h3 style="border-bottom: 1px solid #ddd; padding-bottom: 5px; margin-top: 0;">Contact Details</h3>
            <table style="width: 100%;">
                <tr><td style="width: 100px; font-weight: bold; padding: 4px 0;">Name:</td><td>{full_name}</td></tr>
                <tr><td style="font-weight: bold; padding: 4px 0;">Email:</td><td>{email}</td></tr>
                <tr><td style="font-weight: bold; padding: 4px 0;">Phone:</td><td>{phone or 'Not provided'}</td></tr>
                <tr><td style="font-weight: bold; padding: 4px 0;">Company:</td><td>{company or 'Not provided'}</td></tr>
                <tr><td style="font-weight: bold; padding: 4px 0;">Service:</td><td>{service or 'Not specified'}</td></tr>
            </table>
            
            <h3 style="border-bottom: 1px solid #ddd; padding-bottom: 5px; margin-top: 20px;">Message</h3>
            <p style="white-space: pre-wrap; margin-bottom: 0;">{message or '(No message provided)'}</p>
        </div>
        
        <p style="margin-top: 30px; font-size: 0.9em; color: #666; border-top: 1px solid #eee; padding-top: 15px;">
            Best regards,<br>
            <strong>The Codroit Team</strong><br>
            <a href="https://codroit.in" style="color: #0b5ed7; text-decoration: none;">codroit.in</a>
        </p>
      </body>
    </html>
    """

    # Send email only if GMAIL_APP_PASSWORD is configured
    if GMAIL_PASSWORD:
        try:
            with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
                server.login(GMAIL_USER, GMAIL_PASSWORD)
                
                # 1. Send Email to Admin Receiver
                admin_msg = MIMEMultipart('alternative')
                admin_msg['Subject'] = f"[Codroit] New enquiry from {full_name} – {service or 'General'}"
                admin_msg['From']    = GMAIL_USER
                admin_msg['To']      = NOTIFY_TO
                admin_msg['Reply-To'] = email
                admin_msg.attach(MIMEText(body, 'plain'))
                admin_msg.attach(MIMEText(body_html, 'html'))
                
                server.sendmail(GMAIL_USER, NOTIFY_TO, admin_msg.as_string())

                # 2. Send Auto-reply Email to Sender
                sender_msg = MIMEMultipart('alternative')
                sender_msg['Subject'] = "Thank you for contacting Codroit"
                sender_msg['From']    = GMAIL_USER
                sender_msg['To']      = email
                sender_msg['Reply-To'] = NOTIFY_TO
                sender_msg.attach(MIMEText(sender_body, 'plain'))
                sender_msg.attach(MIMEText(sender_body_html, 'html'))
                
                server.sendmail(GMAIL_USER, email, sender_msg.as_string())

        except Exception as e:
            # Log the error server-side but don't expose details to the client
            print(f"[SMTP ERROR] Failed to send email: {e}")
            return jsonify({
                'status': 'error',
                'message': 'Failed to send your message right now. Please email us directly at info@codroit.in'
            }), 500
    else:
        # SMTP not configured — log to console (dev/test mode)
        print("─── CONTACT FORM SUBMISSION (SMTP not configured) ───")
        print("To:", NOTIFY_TO)
        print(body)
        print("To:", email)
        print(sender_body)
        print("─────────────────────────────────────────────────────")

    return jsonify({'status': 'success', 'message': 'Message sent successfully!'}), 200


@app.route('/careers')
def careers():
    careers_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'static', 'careers.json')
    try:
        with open(careers_path, 'r', encoding='utf-8') as f:
            openings = json.load(f)
    except Exception:
        openings = []
    return render_template('careers.html', openings=openings)

@app.route('/subscribe', methods=['POST'])
def subscribe():
    email = request.form.get('email') or (request.json and request.json.get('email'))
    if not email:
        return jsonify({"status": "error", "message": "Email is required"}), 400
        
    subs_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'static', 'subscribers.json')
    try:
        if os.path.exists(subs_path):
            with open(subs_path, 'r', encoding='utf-8') as f:
                subs = json.load(f)
        else:
            subs = []
    except Exception:
        subs = []
        
    if email not in subs:
        subs.append(email)
        with open(subs_path, 'w', encoding='utf-8') as f:
            json.dump(subs, f, indent=4)
            
    return jsonify({"status": "success", "message": "Subscribed successfully"}), 200


@app.route('/Logo.svg')
def logo():
    return send_from_directory(os.path.dirname(os.path.abspath(__file__)), 'Logo.svg')

@app.route('/api/projects')
def api_projects():
    category  = request.args.get('category', 'all').strip().lower()
    page      = max(1, int(request.args.get('page', 1)))
    per_page  = max(1, int(request.args.get('per_page', 6)))

    # Filter
    if category == 'all':
        filtered = ALL_PROJECTS
    else:
        filtered = [p for p in ALL_PROJECTS if p.get('categoryId', '').lower() == category]

    total      = len(filtered)
    total_pages = max(1, math.ceil(total / per_page))
    page       = min(page, total_pages)   # clamp so stale page never exceeds total

    start = (page - 1) * per_page
    items = filtered[start: start + per_page]

    return jsonify({
        'items':       items,
        'total':       total,
        'page':        page,
        'per_page':    per_page,
        'total_pages': total_pages,
    })

@app.route('/api/projects/summary')
def api_projects_summary():
    """Returns total count and total_pages for every category + 'all'."""
    per_page = max(1, int(request.args.get('per_page', 6)))

    # Collect unique categories
    categories = {}
    for p in ALL_PROJECTS:
        cid = p.get('categoryId', '').lower()
        categories[cid] = categories.get(cid, 0) + 1

    result = {}
    # 'all' entry
    total_all = len(ALL_PROJECTS)
    result['all'] = {
        'count':       total_all,
        'total_pages': max(1, math.ceil(total_all / per_page)),
    }
    # per-category entries
    for cid, count in categories.items():
        result[cid] = {
            'count':       count,
            'total_pages': max(1, math.ceil(count / per_page)),
        }

    return jsonify(result)

@app.errorhandler(404)
def page_not_found(e):
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True, port=5000)
