/* eslint-disable react-hooks/rules-of-hooks */
import React, { useCallback } from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

import "./DropFile.css";

export const Calendar = () => {

  return (
    <div>
        <FullCalendar
          plugins={[dayGridPlugin]}
          headerToolbar={{
            right: 'prev,next',
            center: 'title',
            left: 'dayGridWeek',
          }}
          eventClick={(eventInfo) => {
            // Handle event click
            console.log(eventInfo);
          }}
        />

    </div>
  );
};

export default Calendar;
