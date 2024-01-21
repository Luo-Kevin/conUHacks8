
import utils
# Function to check if the end time of the appointment is over 7pm, if it is, we set the attribute of status
# in the optimized dataframe to "turned over"


def discard_booking_over_7pm(optimized_df):
    # assign turnover status to end date over 7pm
    optimized_df.loc[optimized_df['appointment_end_date'].dt.hour >= 19,
                     'status'] = 'turned over'

    return optimized_df


# Function to get the total lost revenue
def get_total_lost_revenue(df):
    turned_over_appointments = df[df['status'] == 'turned over']

    total_lost_revenue = turned_over_appointments['revenue'].sum()

    return total_lost_revenue

# Function to get the total revenue


def get_total_revenue(df):
    schedueled = df[df['status'] == 'scheduled']
    get_total_revenue = schedueled['revenue'].sum()

    return get_total_revenue


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
