import json
from flask_cors import CORS
from dotenv import dotenv_values
from flask import Flask, request
import pandas as pd
import utils
import scheduler


PORT = dotenv_values(".env")["FLASK_RUN_PORT"]

app = Flask(__name__)
CORS(app)  # enable CORS for all routes


@app.route("/", methods=["GET"])
def index():
    print("Hello")
    return "Hello"


@app.route("/upload", methods=["POST"])
def api():
    utils.service_bays_status = {
        "compact": "",
        "medium": "",
        "full-size": "",
        "class 1 truck": "",
        "class 2 truck": "",
        "any1": "",
        "any2": "",
        "any3": "",
        "any4": "",
        "any5": "",
    }

   # get body from request
    body = json.loads(request.data)

    # convert string to pandas dataframe
    df = utils.string_to_df(body['data'])

    results = scheduler.schedueler(df)

    result_json = json.dumps(results, default=lambda x: int(
        x) if isinstance(x, pd.Int64Dtype().type) else None, indent=2)

    return result_json


if __name__ == '__main__':
    app.run(host="localhost", port=PORT, debug=True)
