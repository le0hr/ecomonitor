from sqlalchemy import create_engine
from config import settings
from .models import metadata_obj

engine = create_engine(
    f"postgresql+psycopg2://{settings.db_user}:{settings.db_password}@{settings.db_host}:{settings.db_port}/{settings.db_name}",
    future=True, echo = True
)

def create_tables():
    engine.echo = False
    metadata_obj.create_all(engine)
    engine.echo = True

create_tables()    