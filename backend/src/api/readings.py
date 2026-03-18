from fastapi import APIRouter
import logging
from db import fetch_sensor_readings, insert_applicants
from .schemas import JoinRequest
from services import send_mail_to_host, send_mail_to_applicant

router = APIRouter(prefix="", tags=["readings"])


# As test case temporary all in one router

@router.get("/data")
async def get_data_from_db():
    logging.info("GET /data")
    rows = fetch_sensor_readings(limit=100)
    for row in rows:
        for key, value in row.items():
            if hasattr(value, "isoformat"):
                row[key] = value.isoformat()
    return rows

@router.post("/join")
async def post_application(data: JoinRequest):
    logging.info("POST /join")
    insert_applicants(data)
    send_mail_to_applicant(data)
    send_mail_to_host(data)


