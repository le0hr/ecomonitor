from sqlalchemy import create_engine
from config import settings

engine = create_engine(
    f"postgresql+psycopg2://{settings.db_user}:{settings.db_password}@{settings.db_host}:{settings.db_port}/{settings.db_name}",
    future=True, echo = True
)
