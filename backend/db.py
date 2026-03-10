import mysql.connector
import os

def get_connection():
    connection = mysql.connector.connect(
        host=os.getenv("DB_HOST", "localhost"),
        user=os.getenv("DB_USER", "root"),
        password=os.getenv("DB_PASSWORD", "Root@123"),
        database=os.getenv("DB_NAME", "smart_village")
    )
    return connection