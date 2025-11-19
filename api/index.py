# api/index.py
from vercel_wsgi import make_handler
from app import app  # import the Flask app object

handler = make_handler(app)
