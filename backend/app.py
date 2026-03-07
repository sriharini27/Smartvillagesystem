from flask import Flask, request, jsonify
from flask_cors import CORS
from db import get_connection

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return "Smart Village Backend Running Successfully 🚀"


# GET complaints
@app.route('/complaints', methods=['GET'])
def get_complaints():

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM village_complaints")
    rows = cursor.fetchall()

    complaints = []

    for row in rows:
        complaints.append({
            "id": row[0],
            "name": row[1],
            "issue_type": row[2],
            "city": row[3],
            "village": row[4],
            "description": row[5],
            "status": row[6]
        })

    conn.close()

    return jsonify(complaints)


# ADD complaint
@app.route('/complaints', methods=['POST'])
def add_complaint():

    data = request.json

    conn = get_connection()
    cursor = conn.cursor()

    query = """
    INSERT INTO village_complaints
    (name, issue_type, city, village, description, status)
    VALUES (%s,%s,%s,%s,%s,%s)
    """

    values = (
        data['name'],
        data['issue_type'],
        data['city'],
        data['village'],
        data['description'],
        "Pending"
    )

    cursor.execute(query, values)

    conn.commit()
    conn.close()

    return jsonify({"message": "Complaint Added Successfully"})


# UPDATE status
@app.route('/complaints/<int:id>', methods=['PUT'])
def update_status(id):

    data = request.json

    conn = get_connection()
    cursor = conn.cursor()

    query = """
    UPDATE village_complaints
    SET status=%s
    WHERE id=%s
    """

    cursor.execute(query,(data['status'],id))

    conn.commit()
    conn.close()

    return jsonify({"message":"Status Updated"})


if __name__ == '__main__':
    app.run(debug=True)