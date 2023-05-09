import Calendar from "@/components/Calendar";
import TaskProvider from "@/contexts/TaskContext";

function Home() {
  return (
    <TaskProvider>
      <Calendar />
    </TaskProvider>
  );
}

export default Home;
