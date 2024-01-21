
from io import StringIO
import pandas as pd

CLASS_2_TRUCK_WEIGHT = 350
CLASS_1_TRUCK_WEIGHT = 250
COMPACT_CAR_WEIGHT = 300
MEDIUM_CAR_WEIGHT = 300
FULL_SIZE_CAR_WEIGHT = 300

service_bays_status = {
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

weight_mapping = {
    "compact": COMPACT_CAR_WEIGHT,
    "medium": MEDIUM_CAR_WEIGHT,
    "full-size": FULL_SIZE_CAR_WEIGHT,
    "class 1 truck": CLASS_1_TRUCK_WEIGHT,
    "class 2 truck":  CLASS_2_TRUCK_WEIGHT
}

service_time_mapping = {
    "compact": pd.Timedelta("30 minutes"),
    "medium": pd.Timedelta("30 minutes"),
    "full-size": pd.Timedelta("30 minutes"),
    "class 1 truck": pd.Timedelta("1 hour"),
    "class 2 truck": pd.Timedelta("2 hours")
}

revenue_mapping = {
    "compact": 150,
    "medium": 150,
    "full-size": 150,
    "class 1 truck": 250,
    "class 2 truck": 700
}


def string_to_df(data):
    """Converts a string to a pandas dataframe.

    Args:
        string (str): A string of data.

    Returns:
        pandas.DataFrame: A pandas dataframe.
    """
    data = data.strip('\n')
    return pd.read_csv(StringIO(data), sep=",")
