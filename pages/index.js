import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";

export default function CalendarPage() {
  return (
    <div className="w-full max-w-7xl mx-auto h-[90vh] flex flex-col">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,listWeek",
        }}
        initialView="dayGridMonth"
        height="100%"
        nowIndicator={true}
        editable={true}
        selectable={true}
        selectMirror={true}
        initialEvents={[
          { title: "an event", start: new Date(), resourceId: "a" },
          {
            title: "another event",
            start: new Date("5-10-2023"),
            end: new Date("5-12-2023"),
            resourceId: "b",
          },
        ]}
      />
    </div>
  );
}
