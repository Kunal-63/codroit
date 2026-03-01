from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    app_name: str = "Tech Company"
    app_env: str = "development"
    contact_email: str = "contact@example.com"

    class Config:
        env_file = ".env"

settings = Settings()
