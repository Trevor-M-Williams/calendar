import { useEffect, useState } from "react";
import { useContext } from "react";
import { TaskContext } from "../contexts/TaskContext";
import Modal from "../components/Modal";
import { updateTask } from "../firebase";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";

import dayjs from "dayjs";

export default function Calendar() {
  const { tasks, setTaskData } = useContext(TaskContext);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (tasks) {
      let data = tasks.map((e) => {
        return {
          id: e.id,
          title: e.name,
          start: new Date(e.dueDate),
          allDay: true,
          assigned: e.assigned,
          client: e.client,
          notes: e.notes,
          status: e.status,
          color: getColor(e),
          textColor: getTextColor(e),
        };
      });
      setEvents(data);
    }
  }, [tasks]);

  const handleNewTask = () => {
    setTaskData({});
  };

  const handleTaskClick = (e) => {
    const task = tasks.find((task) => task.id === e.event.id);
    setTaskData({
      ...task,
      dueDate: dayjs(task.dueDate, "M/D/YYYY"),
    });
  };

  const handleTaskDrop = (e) => {
    const task = tasks.find((task) => task.id === e.event.id);
    const newDate = e.event.start.toLocaleDateString();
    updateTask({ ...task, dueDate: newDate });
  };

  const getColor = (e) => {
    if (e.status) return "#eee";
    const assigned = e.assigned;
    const colors = {
      CJ: "#0dd",
      Logan: "#0ad",
      Trevor: "#06d",
    };

    if (assigned.length === 1) {
      return colors[assigned[0]];
    }

    return "#3b82f6";
  };

  function getTextColor(e) {
    if (e.status) return "#bbb";
    return "#fff";
  }

  return (
    <div className="w-full max-w-[1400px] mx-auto h-screen p-8 flex flex-col">
      <FullCalendar
        plugins={[dayGridPlugin, listPlugin, interactionPlugin]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "newTaskButton dayGridMonth,dayGridWeek,listWeek",
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
        events={events}
        eventClick={(e) => handleTaskClick(e)}
        eventDrop={(e) => handleTaskDrop(e)}
      />
      <Modal />
    </div>
  );
}
