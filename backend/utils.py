
from io import StringIO
import pandas as pd


def string_to_df(data):
    """Converts a string to a pandas dataframe.

    Args:
        string (str): A string of data.

    Returns:
        pandas.DataFrame: A pandas dataframe.
    """
    data = data.strip('\n')
    return pd.read_csv(StringIO(data), sep=",")
