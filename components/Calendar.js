import { useState } from "react";
import { useContext } from "react";
import { TaskContext } from "../contexts/TaskContext";
import Modal from "../components/Modal";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";

export default function Calendar() {
  const { taskData, setTaskData } = useContext(TaskContext);

  const handleNewTask = () => {
    setTaskData({});
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto h-screen p-8 flex flex-col">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "newTaskButton dayGridMonth,timeGridWeek,listWeek",
        }}
        customButtons={{
          newTaskButton: {
            text: "New Task",
            click: handleNewTask,
          },
        }}
        initialView="dayGridMonth"
        height="100%"
        nowIndicator={true}
        editable={true}
        selectable={true}
        selectMirror={true}
        initialEvents={taskData}
      />
      <Modal />
    </div>
  );
}
