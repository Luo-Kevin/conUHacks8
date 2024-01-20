import json
from flask_cors import CORS
from dotenv import dotenv_values
from flask import Flask
from flask import request
import utils


PORT = dotenv_values(".env")["FLASK_RUN_PORT"]

app = Flask(__name__)
CORS(app)  # enable CORS for all routes


@app.route("/", methods=["GET"])
def index():
    print("Hello")
    return "Hello"


@app.route("/upload", methods=["POST"])
def api():
    print("Hello")
   # get body from request
    body = json.loads(request.data)

    # convert string to pandas dataframe
    df = utils.string_to_df(body['data'])
    print(df)

    return "Hello"


if __name__ == '__main__':
    app.run(host="localhost", port=PORT, debug=True)
