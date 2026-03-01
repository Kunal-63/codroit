from fastapi import APIRouter, Request
from fastapi.templating import Jinja2Templates

router = APIRouter()
templates = Jinja2Templates(directory="app/templates")

@router.get("/about")
async def read_about(request: Request):
    return templates.TemplateResponse("about.html", {"request": request, "active_page": "about"})

@router.get("/services")
async def read_services(request: Request):
    return templates.TemplateResponse("services.html", {"request": request, "active_page": "services"})

@router.get("/portfolio")
async def read_portfolio(request: Request):
    return templates.TemplateResponse("portfolio.html", {"request": request, "active_page": "portfolio"})
