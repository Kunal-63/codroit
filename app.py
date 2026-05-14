import os
import io
import json
import math
import uuid
import smtplib
import re
from datetime import datetime
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from flask import Flask, render_template, send_from_directory, request, jsonify, session, redirect, url_for
from pymongo import MongoClient
from bson.objectid import ObjectId
from dotenv import load_dotenv
try:
    from PIL import Image as PilImage
    PIL_AVAILABLE = True
except ImportError:
    PIL_AVAILABLE = False

load_dotenv()

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY')

# Connect to MongoDB
MONGODB_URI = os.environ.get("MONGODB_URI")
MONGO_DB_NAME = os.environ.get("MONGO_DB_NAME", "codroit")
client = None
db = None

def init_db_connection():
    global client, db
    if not MONGODB_URI:
        print("[MongoDB] Warning: MONGODB_URI is not set. MongoDB access is disabled.")
        return

    try:
        client = MongoClient(
            MONGODB_URI,
            serverSelectionTimeoutMS=5000,
            connectTimeoutMS=5000,
            socketTimeoutMS=5000,
        )
        client.admin.command("ping")
        try:
            db = client.get_database()
        except Exception:
            db = client[MONGO_DB_NAME]
        print("[MongoDB] Connected successfully.")
    except Exception as exc:
        print(f"[MongoDB] Connection failed: {exc}")
        client = None
        db = None

init_db_connection()

def ensure_db():
    if db is None:
        from flask import abort
        abort(503, description="MongoDB is unavailable. Please start MongoDB or set MONGO_URI.")

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
    ensure_db()
    project = db.projects.find_one({'id': project_id})
    if not project:
        from flask import abort
        abort(404)

    def _clean_text(value, fallback):
        text = (value or '').strip() if isinstance(value, str) else ''
        return text if text else fallback

    normalized = dict(project) # type: ignore
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

    related = list(db.projects.find({
        'id': {'$ne': project_id},
        'categoryId': {'$regex': f"^{normalized.get('categoryId', '')}$", '$options': 'i'}
    }).limit(3))

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
    try:
        openings = list(db.careers.find({}))
    except Exception:
        openings = []
    return render_template('careers.html', openings=openings)

@app.route('/subscribe', methods=['POST'])
def subscribe():
    email = request.form.get('email') or (request.json and request.json.get('email'))
    if not email:
        return jsonify({"status": "error", "message": "Email is required"}), 400
        
    try:
        existing = db.subscribers.find_one({"email": email})
        if not existing:
            db.subscribers.insert_one({"email": email})
    except Exception:
        pass
            
    return jsonify({"status": "success", "message": "Subscribed successfully"}), 200


@app.route('/robots.txt')
def robots():
    return send_from_directory(os.path.dirname(os.path.abspath(__file__)), 'robots.txt')

@app.route('/sitemap.xml')
def sitemap():
    """Generate sitemap.xml for Google Search Console"""
    from datetime import datetime
    
    base_url = "https://codroit.in"  # Change this to your actual domain
    
    # Static URLs
    urls = [
        {"loc": f"{base_url}/", "priority": "1.0", "changefreq": "weekly"},
        {"loc": f"{base_url}/services", "priority": "0.9", "changefreq": "monthly"},
        {"loc": f"{base_url}/about", "priority": "0.8", "changefreq": "monthly"},
        {"loc": f"{base_url}/portfolio", "priority": "0.9", "changefreq": "weekly"},
        {"loc": f"{base_url}/contact", "priority": "0.7", "changefreq": "monthly"},
        {"loc": f"{base_url}/careers", "priority": "0.8", "changefreq": "weekly"},
        {"loc": f"{base_url}/blogs", "priority": "0.9", "changefreq": "daily"},
    ]
    
    # Dynamic project URLs
    try:
        if db is not None:
            projects = db.projects.find({}, {"id": 1})
            for project in projects:
                urls.append({
                    "loc": f"{base_url}/project/{project['id']}",
                    "priority": "0.7",
                    "changefreq": "monthly"
                })
    except Exception:
        pass  # Skip if database is not available
    
    # Dynamic blog URLs
    try:
        if db is not None:
            blogs = db.blogs.find({}, {"_id": 1, "slug": 1, "updated_at": 1, "date": 1})
            for blog in blogs:
                # Use slug if available, otherwise fallback to _id
                identifier = blog.get('slug') or str(blog['_id'])
                
                # Try to determine the last modification date
                lastmod_val = blog.get('updated_at') or blog.get('date')
                if lastmod_val and 'T' in lastmod_val:
                    lastmod_val = lastmod_val.split('T')[0]
                elif not lastmod_val:
                    lastmod_val = datetime.now().strftime("%Y-%m-%d")
                    
                urls.append({
                    "loc": f"{base_url}/blog/{identifier}",
                    "priority": "0.6",
                    "changefreq": "weekly",
                    "lastmod": lastmod_val
                })
    except Exception:
        pass  # Skip if database is not available
    
    # Generate XML
    xml_content = '<?xml version="1.0" encoding="UTF-8"?>\n'
    xml_content += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    
    for url in urls:
        xml_content += '  <url>\n'
        xml_content += f'    <loc>{url["loc"]}</loc>\n'
        xml_content += f'    <priority>{url["priority"]}</priority>\n'
        xml_content += f'    <changefreq>{url["changefreq"]}</changefreq>\n'
        last_mod = url.get("lastmod", datetime.now().strftime("%Y-%m-%d"))
        xml_content += f'    <lastmod>{last_mod}</lastmod>\n'
        xml_content += '  </url>\n'
    
    xml_content += '</urlset>'
    
    response = app.response_class(xml_content, mimetype='application/xml')
    return response

@app.route('/api/projects')
def api_projects():
    ensure_db()
    category  = request.args.get('category', 'all').strip().lower()
    page      = max(1, int(request.args.get('page', 1)))
    per_page  = max(1, int(request.args.get('per_page', 6)))

    query = {}
    if category != 'all':
        query['categoryId'] = {'$regex': f"^{category}$", '$options': 'i'}

    total = db.projects.count_documents(query)
    total_pages = max(1, math.ceil(total / per_page))
    page = min(page, total_pages)

    start = (page - 1) * per_page
    items = list(db.projects.find(query, {'_id': 0}).skip(start).limit(per_page))

    return jsonify({
        'items':       items,
        'total':       total,
        'page':        page,
        'per_page':    per_page,
        'total_pages': total_pages,
    })

@app.route('/api/projects/summary')
def api_projects_summary():
    ensure_db()
    per_page = max(1, int(request.args.get('per_page', 6)))

    pipeline = [
        {"$group": {"_id": {"$toLower": "$categoryId"}, "count": {"$sum": 1}}}
    ]
    categories = list(db.projects.aggregate(pipeline))

    result = {}
    total_all = db.projects.count_documents({})
    result['all'] = {
        'count':       total_all,
        'total_pages': max(1, math.ceil(total_all / per_page)),
    }
    
    for cat in categories:
        cid = cat['_id']
        count = cat['count']
        if cid:
            result[cid] = {
                'count':       count,
                'total_pages': max(1, math.ceil(count / per_page)),
            }

    return jsonify(result)

@app.route('/blogs')
def blogs():
    ensure_db()
    blogs_list = list(db.blogs.find({}).sort("date", -1))
    return render_template('blogs.html', blogs=blogs_list)

@app.route('/blog/<slug>')
def blog(slug):
    ensure_db()
    # Try to find by slug first, fallback to ObjectId if slug matches id pattern
    blog_data = db.blogs.find_one({"slug": slug})
    if not blog_data:
        try:
            blog_data = db.blogs.find_one({"_id": ObjectId(slug)})
        except:
            pass
            
    if not blog_data:
        from flask import abort
        abort(404)
    return render_template('blog.html', blog=blog_data)

@app.route('/admin/login', methods=['GET', 'POST'])
def admin_login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        admin_user = os.environ.get('ADMIN_USER', 'admin')
        admin_pass = os.environ.get('ADMIN_PASS', 'admin123')
        if username == admin_user and password == admin_pass:
            session['admin_logged_in'] = True
            return redirect(url_for('admin_blogs'))
        return render_template('admin_login.html', error="Invalid credentials")
    return render_template('admin_login.html')

@app.route('/admin/logout')
def admin_logout():
    session.pop('admin_logged_in', None)
    return redirect(url_for('home'))

import base64

# ── Image Upload with Pillow compression ──────────────────────────────────────

@app.route('/admin/upload-image', methods=['POST'])
def upload_image():
    if not session.get('admin_logged_in'):
        return jsonify({'error': 'unauthorized'}), 401
    file = request.files.get('image')
    if not file:
        return jsonify({'error': 'no file'}), 400

    original_bytes = len(file.read())
    file.seek(0)

    try:
        if PIL_AVAILABLE:
            img = PilImage.open(file)
            # Convert to RGB (handles PNG transparency etc.)
            if img.mode in ('RGBA', 'P', 'LA'):
                bg = PilImage.new('RGB', img.size, (255, 255, 255))
                if img.mode == 'P':
                    img = img.convert('RGBA')
                bg.paste(img, mask=img.split()[-1] if img.mode == 'RGBA' else None)
                img = bg
            elif img.mode != 'RGB':
                img = img.convert('RGB')
            # Resize: max 1200px on longest side
            max_px = 1200
            w, h = img.size
            if max(w, h) > max_px:
                ratio = max_px / max(w, h)
                img = img.resize((int(w * ratio), int(h * ratio)), PilImage.LANCZOS)
            
            # Save to BytesIO as WebP
            buffer = io.BytesIO()
            img.save(buffer, format="WEBP", quality=72, optimize=True)
            compressed_bytes = buffer.tell()
            b64_data = base64.b64encode(buffer.getvalue()).decode('utf-8')
            url = f"data:image/webp;base64,{b64_data}"
        else:
            # Fallback: encode original file
            file.seek(0)
            file_data = file.read()
            compressed_bytes = len(file_data)
            b64_data = base64.b64encode(file_data).decode('utf-8')
            mime_type = file.content_type or 'image/jpeg'
            url = f"data:{mime_type};base64,{b64_data}"

        savings = max(0, round((1 - compressed_bytes / max(original_bytes, 1)) * 100))
        size_kb = round(compressed_bytes / 1024, 1)

        return jsonify({'url': url, 'size_kb': size_kb, 'savings': savings})
    except Exception as exc:
        return jsonify({'error': f'Image processing failed: {exc}'}), 500


# ── Admin: Blogs List ──────────────────────────────────────────────────────────
@app.route('/admin/blogs')
def admin_blogs():
    if not session.get('admin_logged_in'):
        return redirect(url_for('admin_login'))
    ensure_db()
    blogs_list = list(db.blogs.find({}).sort('date', -1))
    return render_template('admin_blogs.html', blogs=blogs_list)


# ── Admin: New Blog (editor) ───────────────────────────────────────────────────
@app.route('/admin/blog/new')
def admin_blog_new():
    if not session.get('admin_logged_in'):
        return redirect(url_for('admin_login'))
    return render_template('admin_blog_editor.html', blog=None)


# ── Admin: Edit Blog ───────────────────────────────────────────────────────────
@app.route('/admin/blog/<blog_id>/edit')
def admin_blog_edit(blog_id):
    if not session.get('admin_logged_in'):
        return redirect(url_for('admin_login'))
    ensure_db()
    try:
        blog = db.blogs.find_one({'_id': ObjectId(blog_id)})
    except Exception:
        blog = None
    if not blog:
        return redirect(url_for('admin_blogs'))
    return render_template('admin_blog_editor.html', blog=blog)


# ── Admin: Create Blog (JSON POST from editor) ─────────────────────────────────
@app.route('/admin/blog/create', methods=['POST'])
def admin_blog_create():
    if not session.get('admin_logged_in'):
        return jsonify({'error': 'unauthorized'}), 401
    ensure_db()
    data = request.get_json()
    if not data:
        return jsonify({'error': 'no data'}), 400
        
    title = (data.get('title') or '').strip()
    base_slug = re.sub(r'[^a-z0-9]+', '-', title.lower()).strip('-')
    slug = base_slug
    counter = 1
    while db.blogs.find_one({'slug': slug}):
        slug = f"{base_slug}-{counter}"
        counter += 1
        
    doc = {
        'title':       title,
        'slug':        slug,
        'author':      (data.get('author') or '').strip(),
        'date':        (data.get('date') or '').strip(),
        'category':    (data.get('category') or '').strip(),
        'excerpt':     (data.get('excerpt') or '').strip(),
        'cover_image': (data.get('cover_image') or '').strip(),
        'sections':    data.get('sections', []),
        'created_at':  datetime.utcnow().isoformat(),
    }
    result = db.blogs.insert_one(doc)
    return jsonify({'status': 'ok', 'id': str(result.inserted_id)})


# ── Admin: Update Blog (JSON POST from editor) ─────────────────────────────────
@app.route('/admin/blog/<blog_id>/update', methods=['POST'])
def admin_blog_update(blog_id):
    if not session.get('admin_logged_in'):
        return jsonify({'error': 'unauthorized'}), 401
    ensure_db()
    data = request.get_json()
    if not data:
        return jsonify({'error': 'no data'}), 400
        
    title = (data.get('title') or '').strip()
    base_slug = re.sub(r'[^a-z0-9]+', '-', title.lower()).strip('-')
    slug = base_slug
    counter = 1
    while db.blogs.find_one({'slug': slug, '_id': {'$ne': ObjectId(blog_id)}}):
        slug = f"{base_slug}-{counter}"
        counter += 1
        
    update = {
        'title':       title,
        'slug':        slug,
        'author':      (data.get('author') or '').strip(),
        'date':        (data.get('date') or '').strip(),
        'category':    (data.get('category') or '').strip(),
        'excerpt':     (data.get('excerpt') or '').strip(),
        'cover_image': (data.get('cover_image') or '').strip(),
        'sections':    data.get('sections', []),
        'updated_at':  datetime.utcnow().isoformat(),
    }
    try:
        db.blogs.update_one({'_id': ObjectId(blog_id)}, {'$set': update})
    except Exception as exc:
        return jsonify({'error': str(exc)}), 500
    return jsonify({'status': 'ok'})


# ── Admin: Delete Blog ─────────────────────────────────────────────────────────
@app.route('/admin/blog/<blog_id>/delete', methods=['POST'])
def delete_blog(blog_id):
    if not session.get('admin_logged_in'):
        return redirect(url_for('admin_login'))
    ensure_db()
    db.blogs.delete_one({'_id': ObjectId(blog_id)})
    return redirect(url_for('admin_blogs'))

@app.route('/admin/careers', methods=['GET', 'POST'])
def admin_careers():
    if not session.get('admin_logged_in'):
        return redirect(url_for('admin_login'))
    ensure_db()
    
    if request.method == 'POST':
        title = request.form.get('title')
        department = request.form.get('department')
        location = request.form.get('location')
        job_type = request.form.get('type')
        description = request.form.get('description')
        db.careers.insert_one({
            "title": title,
            "department": department,
            "location": location,
            "type": job_type,
            "description": description
        })
        return redirect(url_for('admin_careers'))
        
    careers_list = list(db.careers.find({}))
    return render_template('admin_careers.html', careers=careers_list)

@app.route('/admin/career/<career_id>/delete', methods=['POST'])
def delete_career(career_id):
    if not session.get('admin_logged_in'):
        return redirect(url_for('admin_login'))
    ensure_db()
    db.careers.delete_one({"_id": ObjectId(career_id)})
    return redirect(url_for('admin_careers'))

@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

if __name__ == '__main__':
    app.run(debug=True, port=5000)
