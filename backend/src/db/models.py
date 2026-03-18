from sqlalchemy import MetaData, Table, Row, Column, Integer, String, TIMESTAMP, Float


metadata_obj = MetaData()

sensor_reading =  Table(
    "sensor_readings",
    metadata_obj,
    Column("id", Integer, primary_key=True),
    Column("time",TIMESTAMP ),
    Column("co",Integer ),
    Column("alcohol",Integer ),
    Column("co2",Integer ),
    Column("toluene",Integer ),
    Column("nh3",Integer ),
    Column("acetone",Integer ),
    Column("lat",Float ),
    Column("lng",Float ),
)

applicants = Table(
    "applicants",
    metadata_obj,
    Column("id", Integer, primary_key=True),
    Column("name", String),
    Column("mail", String),
    Column("phone_number", String),
    Column("message", String)
)