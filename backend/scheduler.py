import pandas as pd
import utils
from scheduler_utils import *


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

        # FIXME: Improve greedy selection of next appointment
        # if row['status'] == 'turned over':
        #     continue

        # if appointment_time > thirty_min_later:
        #     count = 0
        #     thirty_min_later = appointment_time + pd.Timedelta("30 minutes")
        #     next_appointments = df[(df['appointment_date'] >= appointment_time) & (
        #         df['appointment_date'] <= appointment_time + pd.Timedelta("30 minutes"))]

        # has_better_next_profit = sort_next_appointment_by_profitability(
        #     next_appointments, count)

        # count += 1

        available_bays = count_bays_available()

        # set the service bay to busy when category of the vehicle corresponds
        if vehicle_type in utils.service_bays_status and utils.service_bays_status[vehicle_type] == "":
            utils.service_bays_status[vehicle_type] = row["appointment_end_date"]
            df.at[index, 'reason'] = 'reserved bay'
            df.at[index, 'status'] = 'scheduled'
            bay_name = f"{vehicle_type} bay"
            df.at[index, 'bay'] = bay_name

        # check if it can take one of the any bays, if so take it
        elif utils.service_bays_status["any1"] == "":
            utils.service_bays_status["any1"] = row["appointment_end_date"]
            df.at[index, 'bay'] = 'any1'
            df.at[index, 'status'] = 'scheduled'
        elif utils.service_bays_status["any2"] == "":
            df.at[index, 'bay'] = 'any2'
            utils.service_bays_status["any2"] = row["appointment_end_date"]
            df.at[index, 'status'] = 'scheduled'
        elif utils.service_bays_status["any3"] == "":
            df.at[index, 'bay'] = 'any3'
            utils.service_bays_status["any3"] = row["appointment_end_date"]
            df.at[index, 'status'] = 'scheduled'
        elif utils.service_bays_status["any4"] == "":
            df.at[index, 'bay'] = 'any4'
            utils.service_bays_status["any4"] = row["appointment_end_date"]
            df.at[index, 'status'] = 'scheduled'
        elif utils.service_bays_status["any5"] == "":
            df.at[index, 'bay'] = 'any5'
            utils.service_bays_status["any5"] = row["appointment_end_date"]
            df.at[index, 'status'] = 'scheduled'
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
    optimized_df = discard_booking_over_7pm(optimized_df)

    optimized_df["reason"] = ""

    optimized_df["bay"] = ""

    # Schedule the bookings
    optimized_df = schedule_car_repairs(optimized_df)

    # count turned over data
    count_turned_over = optimized_df['status'].eq('turned over').sum()

    count_serviced = optimized_df['status'].eq('scheduled').sum()

    lost_revenue = get_total_lost_revenue(optimized_df)

    revenue = get_total_revenue(optimized_df)

    # stringify the date
    optimized_df['appointment_date'] = optimized_df['appointment_date'].astype(
        str)
    optimized_df['appointment_end_date'] = optimized_df['appointment_end_date'].astype(
        str)

    # number of turnover compact cars
    compact_serviced = optimized_df[(optimized_df['vehicle_type'] == 'compact') & (
        optimized_df['status'] == 'scheduled')].shape[0]

    # number of turnover medium cars
    medium_serviced = optimized_df[(optimized_df['vehicle_type'] == 'medium') & (
        optimized_df['status'] == 'scheduled')].shape[0]

    # number of turnover full-size cars
    full_size_serviced = optimized_df[(optimized_df['vehicle_type'] == 'full-size') & (
        optimized_df['status'] == 'scheduled')].shape[0]

    # number of turnover class 1 trucks
    class_1_serviced = optimized_df[(optimized_df['vehicle_type'] == 'class 1 truck') & (
        optimized_df['status'] == 'scheduled')].shape[0]

    # number of turnover class 2 trucks
    class_2_serviced = optimized_df[(optimized_df['vehicle_type'] == 'class 2 truck') & (
        optimized_df['status'] == 'scheduled')].shape[0]

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

    serviced_vehicles_schedule = optimized_df[optimized_df['status']
                                              != 'turned over']
    turnover_vehicles_schedule = optimized_df[optimized_df['status']
                                              == 'turned over']

    result = {
        "revenue": revenue,
        "lost_revenue": lost_revenue,
        "count_turnover": count_turned_over,
        "compact_turnover": compact_turnover,
        "medium_turnover": medium_turnover,
        "full_size_turnover": full_size_turnover,
        "class_1_turnover": class_1_turnover,
        "class_2_turnover": class_2_turnover,
        "count_serviced": count_serviced,
        "compact_serviced": compact_serviced,
        "medium_serviced": medium_serviced,
        "full_size_serviced": full_size_serviced,
        "class_1_serviced": class_1_serviced,
        "class_2_serviced": class_2_serviced,
        "serviced_vehicles_schedule": serviced_vehicles_schedule.to_dict('records'),
        "turnover_vehicles_schedule": turnover_vehicles_schedule.to_dict('records'),

    }

    return result


# df = pd.read_csv("./model/datafile.csv")
# schedueler(df)
