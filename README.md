# TechCo Premium Website

A production-ready, premium company website built with FastAPI, Tailwind CSS, and GSAP.

## Tech Stack

**Backend:**
- Python 3.11+
- FastAPI
- Uvicorn
- Jinja2 Templates

**Frontend:**
- HTML5
- Tailwind CSS (via CDN)
- Vanilla JavaScript
- GSAP & ScrollTrigger

## Setup Instructions

1. **Create and activate a virtual environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate # On Windows: venv\Scripts\activate
   ```

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the development server:**
   ```bash
   python app/main.py
   # Or using uvicorn directly:
   # uvicorn app.main:app --reload
   ```

4. **View the website:**
   Open `http://localhost:8000` in your web browser.

## Project Structure

- `app/main.py`: Main FastAPI application entrypoint.
- `app/config.py`: Application environment configuration.
- `app/routes/`: FastAPI API and view routers.
- `app/templates/`: Jinja2 HTML templates.
- `app/static/`: Static CSS, JS, and image assets.
