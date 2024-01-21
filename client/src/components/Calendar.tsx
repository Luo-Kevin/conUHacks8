/* eslint-disable react-hooks/rules-of-hooks */
import React, { useCallback } from "react";
import moment from 'moment';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

import "./Calendar.css";

interface Appointment {
    vehicle_type: string;
    appointment_date: string;
    appointment_end_date: string;
    revenue: number;
    status?: string;
    backgroundColor?:string;
  }
  
  interface Props {
    data: {
      schedule: Appointment[];
    } | null; // Make data nullable
  }
  
 export const Calendar: React.FC<Props> = ({ data }) => {
    if (!data) {
      // Render some loading state or return null if data is not available
      return null;
    }

    const getBackgroundColor = (vehicleType: string): string => {
        switch (vehicleType) {
          case 'full-size':
            return '#D1FFBD';
          case 'medium':
            return '#FFFF9E';
          default:
            return '#D1D1D1';
        }
      };
  
    // Parse the schedule data to format suitable for FullCalendar
    const events = data.schedule.map((appointment: Appointment) => ({
      title: appointment.vehicle_type,
      start: new Date(appointment.appointment_date),
      end: new Date(appointment.appointment_end_date),
      backgroundColor: getBackgroundColor(appointment.vehicle_type),
      description: `Revenue: ${appointment.revenue} - Status: ${appointment.status || 'Scheduled'}`,
    }));
  
    // const events = [
    //     {
    //         title: 'compact car',
    //         description: 'service bay: any 5 - compact car',
    //         start: '2022-10-12T10:30:00',
    //         end: '2022-10-12T11:00:00'
    //     },
    //     {
    //         title: 'medium car',
    //         description: 'service bay: any 4 - medium car',
    //         start: '2022-10-12T10:30:00',
    //         end: '2022-10-12T11:00:00'
    //     },
    //     {
    //         title: 'c1 class truck',
    //         description: 'service bay: c1 class truck - c1 class truck',
    //         start: '2022-10-15T16:48:00',
    //         end: '2022-10-15T17:48:00'
    //     },
    //     {
    //         title: 'c2 class truck',
    //         description: 'service bay: c2 class truck - c2 class truck',
    //         start: '2022-10-13T10:30:00',
    //         end: '2022-10-13T12:30:00'
    //     }
    // ]

    function renderEventContent(eventInfo: any) {

        const colorMapping = {
            'compact car': '#D1FFBD',
            'medium car': '#D1FFBD',
            'c1 class truck': '#FFFF9E',
            'c2 class truck': '#FFCCCB',
          };

        const eventStyle = {
          backgroundColor: (colorMapping as any)[eventInfo.event.title] || '#D1D1D1', 
          borderRadius: '3px',
          color: '#00008B', 
          width:"100%",
          height:"120%"
        };

        const descriptionStyle = {
            width: '100%',
            overflow: 'hidden', 
            whiteSpace: 'normal',
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
