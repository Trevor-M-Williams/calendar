import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";

import Modal from "../components/Modal";

export default function CalendarPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("/api/events")
      .then((response) => response.json())
      .then((data) => console.log(data));
  }, []);

  const handleNewEvent = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto h-screen p-8 flex flex-col">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "newEventButton dayGridMonth,timeGridWeek,listWeek",
        }}
        customButtons={{
          newEventButton: {
            text: "New Event",
            click: handleNewEvent,
          },
        }}
        initialView="dayGridMonth"
        height="100%"
        nowIndicator={true}
        editable={true}
        selectable={true}
        selectMirror={true}
        initialEvents={events}
      />
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}
