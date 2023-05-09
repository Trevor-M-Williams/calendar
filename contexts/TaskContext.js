import { createContext, useEffect, useState } from "react";
import { getTasks } from "../firebase";

export const TaskContext = createContext();

function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [taskData, setTaskData] = useState(null);
  const [filteredTasks, setFilteredTasks] = useState(
    tasks.filter((e) => e.status === false)
  );
  const [filterStatus, setFilterStatus] = useState(false);

  useEffect(() => {
    getTasks(setTasks);
  }, []);

  useEffect(() => {
    if (filterStatus) {
      setFilteredTasks(tasks.filter((e) => e.status === true));
    } else {
      setFilteredTasks(tasks.filter((e) => e.status === false));
    }
  }, [tasks, filterStatus]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        taskData,
        setTaskData,
        filteredTasks,
        filterStatus,
        setFilterStatus,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export default TaskProvider;
