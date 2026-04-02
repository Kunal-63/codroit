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
GMAIL_PASSWORD = os.environ.get('GMAIL_APP_PASSWORD', '')      # Set this via env var
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

    # Build a nicely formatted email body
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

    # Send email only if GMAIL_APP_PASSWORD is configured
    if GMAIL_PASSWORD:
        try:
            msg = MIMEMultipart('alternative')
            msg['Subject'] = f"[Codroit] New enquiry from {full_name} – {service or 'General'}"
            msg['From']    = GMAIL_USER
            msg['To']      = NOTIFY_TO
            msg['Reply-To'] = email

            msg.attach(MIMEText(body, 'plain'))

            with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
                server.login(GMAIL_USER, GMAIL_PASSWORD)
                server.sendmail(GMAIL_USER, NOTIFY_TO, msg.as_string())

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
        print(body)
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

if __name__ == '__main__':
    app.run(debug=True, port=5000)
