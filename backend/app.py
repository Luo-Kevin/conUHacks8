import json
from flask_cors import CORS
from dotenv import dotenv_values
from flask import Flask

PORT = dotenv_values(".env")["FLASK_RUN_PORT"]

app = Flask(__name__)
CORS(app)  # enable CORS for all routes


@app.route("/", methods=["GET"])
def index():
    print("Hello")
    return "Hello"


if __name__ == '__main__':
    app.run(host="localhost", port=PORT, debug=True)
