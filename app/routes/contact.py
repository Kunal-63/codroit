from fastapi import APIRouter, Request, Form
from fastapi.templating import Jinja2Templates
from pydantic import EmailStr

router = APIRouter()
templates = Jinja2Templates(directory="app/templates")

@router.get("/contact")
async def read_contact(request: Request):
    return templates.TemplateResponse("contact.html", {"request": request, "active_page": "contact"})

@router.post("/api/contact")
async def submit_contact(
    request: Request,
    name: str = Form(...),
    email: str = Form(...),
    message: str = Form(...),
    phone: str = Form(None),
    subject: str = Form(None)
):
    return {
        "status": "success",
        "message": f"Thank you {name}! Your message has been received. We'll get back to you at {email} within 24 hours."
    }
