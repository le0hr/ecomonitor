from sqlalchemy import insert, select, func
from .connection import engine
from .models import sensor_reading, applicants

def insert_sensor_reading(data):
    # Temporary without max value
    stmt = insert(sensor_reading).values(data)
    with engine.begin() as conn:
        conn.execute(stmt)


def fetch_sensor_readings():
    stmt = select(sensor_reading)
    with engine.begin() as conn:
        result = conn.execute(stmt)
        rows = [dict(row._mapping) for row in result.fetchall()]
    return rows

def fetch_dots_number():
    stmt = select(func.count()).select_from(sensor_reading)
    with engine.begin() as conn:
        result = conn.execute(stmt)
        count = result.scalar()
    return count

def fetch_volunteers_number():
    stmt = select(func.count()).select_from(applicants)
    with engine.begin() as conn:
        result = conn.execute(stmt)
        count = result.scalar()
    return count

def insert_applicants(data):
    data = data.model_dump()
    stmt = insert(applicants).values(data)
    with engine.begin() as conn:
        conn.execute(stmt)