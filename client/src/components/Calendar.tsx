/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import moment from "moment";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

import "./Calendar.css";

interface Appointment {
  bay: string;
  vehicle_type: string;
  appointment_date: string;
  appointment_end_date: string;
  revenue: number;
  status?: string;
  backgroundColor?: string;
}

interface Props {
  data: {
    serviced_vehicles_schedule: any;
    schedule: Appointment[];
  } | null;
}

export const Calendar: React.FC<Props> = ({ data }) => {
  if (!data) {
    // Render some loading state or return null if data is not available
    return null;
  }

  // Parse the schedule data to format suitable for FullCalendar
  const events = data.serviced_vehicles_schedule.map((appointment: Appointment) => ({
    title: appointment.vehicle_type,
    start: new Date(appointment.appointment_date),
    end: new Date(appointment.appointment_end_date),
    revenue: `Revenue: ${appointment.revenue}`,
    status: `Status: ${appointment.status || "Scheduled"}`,
    bay: appointment.bay,
  }));

  function renderEventContent(eventInfo: any) {
    const colorMapping = {
      any1: "#FFCCCB",
      any2: "#FFCBA7",
      any3: "#F3F7A6",
      any4: "#D1FFBD",
      any5: "#ADD8E6",
      "compact bay": "#E9D3FF",
      "medium bay": "#BCA89F",
      "full-size bay": "#8FD3CC",
      "class 1 truck bay": "#BEBEBE",
      "class 2 truck bay": "#469990",
    };

    const eventStyle = {
      backgroundColor: (colorMapping as any)[eventInfo.event.extendedProps.bay] || "#D1D1D1",
      borderRadius: "3px",
      color: "#00008B",
      width: "100%",
      height: "120%",
    };

    const descriptionStyle = {
      width: "100%",
      overflow: "hidden",
      whiteSpace: "normal",
    };

    const startTime = moment(eventInfo.event.start).format("h:mm A");
    const endTime = moment(eventInfo.event.end).format("h:mm A");

    return (
      <div style={eventStyle}>
        <p style={descriptionStyle}>
          <b>
            {startTime.toString()} until {endTime.toString()}
          </b>
        </p>
        <p style={{ width: "100%" }}>{eventInfo.event.title}</p>
        <br></br>
        <p style={descriptionStyle}>{eventInfo.event.extendedProps.revenue}</p>
        <p style={descriptionStyle}>{eventInfo.event.extendedProps.status}</p>
        <p style={descriptionStyle}>Bay: {eventInfo.event.extendedProps.bay}</p>
      </div>
    );
  }

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin]}
        weekends={true}
        initialDate={"2022-10-01"}
        initialView={"dayGridWeek"}
        headerToolbar={{
          right: "prev,next",
          center: "title",
          left: "dayGridWeek",
        }}
        eventContent={renderEventContent}
        events={events}
      />
    </div>
  );
};

export default Calendar;
