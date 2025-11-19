# Codroit - Local Flask Conversion

This repository contains the original static site and a small Flask app to serve it locally with simple contact form handling and added scroll animations (AOS).

Quick start (Windows PowerShell):

1. Create a virtual environment and activate it:

```powershell
python -m venv .venv; .\.venv\Scripts\Activate.ps1
```

2. Install dependencies:

```powershell
pip install -r requirements.txt
```

3. Run the Flask app:

```powershell
python app.py
```

4. Open http://127.0.0.1:5000 in your browser.

Notes:
- Static assets are served from the repo root so existing paths remain working.
- Contact form submissions are saved to `messages.csv` in the project root.
- To further modernize UI, consider migrating assets into `static/` and refining styles or integrating GSAP for advanced animations.
