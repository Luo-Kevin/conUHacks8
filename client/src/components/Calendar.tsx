/* eslint-disable react-hooks/rules-of-hooks */
import React, { useCallback } from "react";
import moment from 'moment';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

import "./Calendar.css";

export const Calendar = () => {

    const events = [
        {
            title: 'compact car',
            description: 'service bay: any 5 - compact car',
            start: '2022-10-12T10:30:00',
            end: '2022-10-12T11:00:00'
        },
        {
            title: 'medium car',
            description: 'service bay: any 4 - medium car',
            start: '2022-10-12T10:30:00',
            end: '2022-10-12T11:00:00'
        },
        {
            title: 'c1 class truck',
            description: 'service bay: c1 class truck - c1 class truck',
            start: '2022-10-15T16:48:00',
            end: '2022-10-15T17:48:00'
        },
        {
            title: 'c2 class truck',
            description: 'service bay: c2 class truck - c2 class truck',
            start: '2022-10-13T10:30:00',
            end: '2022-10-13T12:30:00'
        }
    ]

    function renderEventContent(eventInfo: any) {

        const colorMapping = {
            'compact car': '#D1FFBD',
            'medium car': '#D1FFBD',
            'c1 class truck': '#FFFF9E',
            'c2 class truck': '#FFCCCB',
            // Add more title-color mappings as needed
          };

        const eventStyle = {
          backgroundColor: (colorMapping as any)[eventInfo.event.title] || '#D1D1D1', // Use the backgroundColor from the event
          padding: '5px',
          borderRadius: '3px',
          color: '#00008B', // Set text color to white for better visibility
          width:"100%",
          height:"120%"
        };

        const descriptionStyle = {
            width: '100%',
            overflow: 'hidden', // Ensure overflow is set to 'hidden' to contain text within the width
            whiteSpace: 'normal', // Allow text to wrap within the container
          };

          const startTime = moment(eventInfo.event.start).format('h:mm A');
          const endTime = moment(eventInfo.event.end).format('h:mm A');
      
          
        return (
          <div style={eventStyle}>
            <p style={descriptionStyle}><b>{startTime.toString()} until {endTime.toString()}</b></p>
            <p style={{width:"100%"}}>{eventInfo.event.title}</p>
            <br></br>
            <p style={descriptionStyle}>{eventInfo.event.extendedProps.description}</p>
            <p style={descriptionStyle}>TIME</p>
          </div>
        );
      }

  return (
    <div>
        <FullCalendar
          plugins={[dayGridPlugin]}
          weekends={true}
          headerToolbar={{
            right: 'prev,next',
            center: 'title',
            left: 'dayGridWeek,dayGridMonth',
          }}
          eventContent={renderEventContent}
          events={events}
        />

    </div>
  );
};

export default Calendar;
