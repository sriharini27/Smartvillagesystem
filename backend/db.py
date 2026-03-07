import mysql.connector

def get_connection():
    connection = mysql.connector.connect(
        host="localhost",
        user="root",
        password="Root@123",
        database="smart_village"
    )
    return connection