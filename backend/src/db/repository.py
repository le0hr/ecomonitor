from sqlalchemy import insert, select
from .connection import engine
from .models import sensor_reading, applicants

def insert_sensor_reading(data):
    # Temporary without max value
    stmt = insert(sensor_reading).values(data)
    with engine.begin() as conn:
        conn.execute(stmt)


def fetch_sensor_readings(limit=100):
    stmt = select(sensor_reading)
    with engine.begin() as conn:
        result = conn.execute(stmt)
        rows = [dict(row._mapping) for row in result.fetchall()]
    return rows


def insert_applicants(data):
    data = data.model_dump()
    stmt = insert(applicants).values(data)
    with engine.begin() as conn:
        conn.execute(stmt)