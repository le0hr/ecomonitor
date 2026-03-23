from fastapi import APIRouter
import logging
from db import fetch_sensor_readings, insert_applicants, fetch_dots_number,fetch_volunteers_number
from .schemas import JoinRequest
from services import send_mail_to_host, send_mail_to_applicant

router = APIRouter(prefix="", tags=["readings"])


# As test case temporary all in one router

@router.get("/data")
async def get_data_from_db():
    logging.info("GET /data")
    rows = fetch_sensor_readings()
    for row in rows:
        for key, value in row.items():
            if hasattr(value, "isoformat"):
                row[key] = value.isoformat()
    return rows
# TODO: rename endpoints
@router.post("/join")
async def post_application(data: JoinRequest):
    logging.info("POST /join")
    insert_applicants(data)
    logging.info(await send_mail_to_applicant(data))
    logging.info(await send_mail_to_host(data))

@router.get("/data/counts")
async def get_data_from_db():
    logging.info("GET /data/counts")
    dots_count = fetch_dots_number()
    logging.info("Dots count:{0}".format(dots_count))
    return dots_count

@router.get("/join/counts")
async def get_data_from_db():
    logging.info("GET /join/counts")
    volunteers_count = fetch_volunteers_number()
    logging.info("Volunteers count:{0}".format(volunteers_count))
    return volunteers_count
