import pandas as pd
import utils


# Function to check if the end time of the appointment is over 7pm, if it is, we set the attribute of status
# in the optimized dataframe to "turned over"
def discard_booking_over_7pm(df, optimized_df):
    # Create a mask based on the condition that 'appointment_date' and 'call_request' should match
    mask = (optimized_df['appointment_date'] == df['appointment_date']) & (
        optimized_df['call_request'] == df['call_request'])

    # Update the 'status' column in the DataFrame where the condition is met
    optimized_df.loc[mask & (
        df['appointment_end_date'].dt.hour > 19), 'status'] = 'turned over'

    return optimized_df


# Function to get the total lost revenue
def get_total_lost_revenue(df):
    turned_over_appointments = df[df['status'] == 'turned over']

    total_lost_revenue = turned_over_appointments['revenue'].sum()

    return total_lost_revenue

# Function to get the total revenue


def get_total_revenue(df):
    turned_over_appointments = df[df['status'] != 'turned over']

    total_lost_revenue = turned_over_appointments['revenue'].sum()

    return total_lost_revenue


def check_bay_status(current_time):
    for bay, end_time in utils.service_bays_status.items():
        if end_time != "" and end_time < current_time:
            utils.service_bays_status[bay] = ""
    return


# Function to get the total earned revenue
def sort_next_appointment_by_profitability(next_appointments, count=0):
    current_time_profit = next_appointments.iloc[count]['profit_ratio']
    next_biggest_count = count
    for index, row in next_appointments[count:].iterrows():
        if row['profit_ratio'] > current_time_profit:
            return next_biggest_count - count
        next_biggest_count += 1

    return False


def count_bays_available():
    count = 0
    for bay, end_time in utils.service_bays_status.items():
        if end_time == "":
            count += 1
    return count


# Algo
def schedule_car_repairs(df):
    appointment_time = df.iloc[0]['appointment_date']
    thirty_min_later = appointment_time + pd.Timedelta("10 minutes")
    next_appointments = df[(df['appointment_date'] >= appointment_time) & (
        df['appointment_date'] <= appointment_time + pd.Timedelta("30 minutes"))]
    count = 0

    for index, row in df.iterrows():
        vehicle_type = row["vehicle_type"]
        appointment_time = row["appointment_date"]
        check_bay_status(appointment_time)

        if appointment_time > thirty_min_later:
            count = 0
            thirty_min_later = appointment_time + pd.Timedelta("30 minutes")
            next_appointments = df[(df['appointment_date'] >= appointment_time) & (
                df['appointment_date'] <= appointment_time + pd.Timedelta("30 minutes"))]

        has_better_next_profit = sort_next_appointment_by_profitability(
            next_appointments, count)

        count += 1

        available_bays = count_bays_available()

        # set the service bay to busy when category of the vehicle corresponds
        if vehicle_type in utils.service_bays_status and utils.service_bays_status[vehicle_type] == "":
            utils.service_bays_status[vehicle_type] = row["appointment_end_date"]
            df.at[index, 'reason'] = 'reserved bay'
        # check if it can take one of the any bays, if so take it
        elif utils.service_bays_status["any1"] == "" and has_better_next_profit <= available_bays:
            utils.service_bays_status["any1"] = row["appointment_end_date"]
        elif utils.service_bays_status["any2"] == "" and has_better_next_profit <= available_bays:
            utils.service_bays_status["any2"] = row["appointment_end_date"]
        elif utils.service_bays_status["any3"] == "" and has_better_next_profit <= available_bays:

            utils.service_bays_status["any3"] = row["appointment_end_date"]
        elif utils.service_bays_status["any4"] == "" and has_better_next_profit <= available_bays:

            utils.service_bays_status["any4"] = row["appointment_end_date"]
        elif utils.service_bays_status["any5"] == "" and has_better_next_profit <= available_bays:

            utils.service_bays_status["any5"] = row["appointment_end_date"]
        else:
            df.at[index, 'status'] = 'turned over'
            df.at[index, 'reason'] = 'no bay available'

            # turned_over_appointments = df[df['status'] == 'turned over']
            #
    return df


def schedueler(df):
    df.columns = ['call_request', 'appointment_date', 'vehicle_type']
    df['profit_ratio'] = df['vehicle_type'].replace(
        utils.weight_mapping)
    df['appointment_date'] = pd.to_datetime(df['appointment_date'])

    df['appointment_end_date'] = df.apply(
        lambda row: row['appointment_date'] + utils.service_time_mapping.get(row['vehicle_type'], pd.Timedelta(0)), axis=1)

    df['revenue'] = df['vehicle_type'].replace(utils.revenue_mapping)

    # Sort the data according to the booking date, the appointment date and then the profit ratio
    df = df.sort_values(by=['appointment_date', 'call_request', 'profit_ratio'],
                        ascending=[True, True, False])

    optimized_df = df.copy()

    # Discard the booking after 7pm, they are lost anyways
    optimized_df = discard_booking_over_7pm(df, optimized_df)

    optimized_df["reason"] = ""

    # Schedule the bookings
    optimized_df = schedule_car_repairs(optimized_df)

    # count turned over data
    count_turned_over = optimized_df['status'].eq('turned over').sum()

    lost_revenue = get_total_lost_revenue(optimized_df)

    revenue = get_total_revenue(optimized_df)

    # stringify the date
    optimized_df['appointment_date'] = optimized_df['appointment_date'].astype(
        str)
    optimized_df['appointment_end_date'] = optimized_df['appointment_end_date'].astype(
        str)

    # number of turnover compact cars
    compact_turnover = optimized_df[(optimized_df['vehicle_type'] == 'compact') & (
        optimized_df['status'] == 'turned over')].shape[0]

    # number of turnover medium cars
    medium_turnover = optimized_df[(optimized_df['vehicle_type'] == 'medium') & (
        optimized_df['status'] == 'turned over')].shape[0]

    # number of turnover full-size cars
    full_size_turnover = optimized_df[(optimized_df['vehicle_type'] == 'full-size') & (
        optimized_df['status'] == 'turned over')].shape[0]

    # number of turnover class 1 trucks
    class_1_turnover = optimized_df[(optimized_df['vehicle_type'] == 'class 1 truck') & (
        optimized_df['status'] == 'turned over')].shape[0]

    # number of turnover class 2 trucks
    class_2_turnover = optimized_df[(optimized_df['vehicle_type'] == 'class 2 truck') & (
        optimized_df['status'] == 'turned over')].shape[0]

    # -----------------------------

    # number of turnover compact cars
    compact_serviced = optimized_df[(optimized_df['vehicle_type'] == 'compact') & (
        optimized_df['status'] != 'turned over')].shape[0]

    # number of turnover medium cars
    medium_serviced = optimized_df[(optimized_df['vehicle_type'] == 'medium') & (
        optimized_df['status'] != 'turned over')].shape[0]

    # number of turnover full-size cars
    full_size_serviced = optimized_df[(optimized_df['vehicle_type'] == 'full-size') & (
        optimized_df['status'] != 'turned over')].shape[0]

    # number of turnover class 1 trucks
    class_1_serviced = optimized_df[(optimized_df['vehicle_type'] == 'class 1 truck') & (
        optimized_df['status'] != 'turned over')].shape[0]

    # number of turnover class 2 trucks
    class_2_serviced = optimized_df[(optimized_df['vehicle_type'] == 'class 2 truck') & (
        optimized_df['status'] != 'turned over')].shape[0]

    result = {
        "revenue": revenue,
        "lost_revenue": lost_revenue,
        "count_turnover": count_turned_over,
        "compact_turnover": compact_turnover,
        "medium_turnover": medium_turnover,
        "full_size_turnover": full_size_turnover,
        "class_1_turnover": class_1_turnover,
        "class_2_turnover": class_2_turnover,
        "compact_serviced": compact_serviced,
        "medium_serviced": medium_serviced,
        "full_size_serviced": full_size_serviced,
        "class_1_serviced": class_1_serviced,
        "class_2_serviced": class_2_serviced,

        "schedule": optimized_df.to_dict(orient='records')
    }

    return result


# df = pd.read_csv("./model/datafile.csv")
# schedueler(df)
