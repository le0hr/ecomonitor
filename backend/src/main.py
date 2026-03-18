from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import logging
from services import init_mqtt
from api import readings_router

# App initialization
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

init_mqtt(app)
app.include_router(readings_router)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=2000)


# TODO:
# Refactor database logic to use SQLAlchemy ORM
# Add API endpoints for volunteers registration
# 