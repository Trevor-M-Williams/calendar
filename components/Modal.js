import { useContext, useState, useEffect } from "react";
import { TaskContext } from "../contexts/TaskContext";
import { postTask, updateTask, deleteTask } from "../firebase";

import AssignedSelect from "./AssignedSelect";
import ClientSelect from "./ClientSelect";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Switch from "@mui/material/Switch";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function BasicModal() {
  const { taskData, setTaskData } = useContext(TaskContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => setTaskData({});
  const handleClose = () => setTaskData(null);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    function handleKeyDown(e) {
      if ((e.ctrlKey || e.metaKey) && e.altKey && e.key.toLowerCase() === "n") {
        handleOpen();
      }
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (taskData) setIsModalOpen(true);
    else setIsModalOpen(false);
  }, [taskData ?? null]);

  function handleCreate(e) {
    e.preventDefault();
    if (!taskData.dueDate) taskData.dueDate = "";
    else taskData.dueDate = taskData.dueDate.$d.toLocaleDateString();
    taskData.status = false;
    postTask(taskData);
    handleClose();
  }

  function handleUpdate(e) {
    e.preventDefault();
    if (!taskData.dueDate.$D) taskData.dueDate = "";
    else taskData.dueDate = taskData.dueDate.$d.toLocaleDateString();
    updateTask(taskData);
    handleClose();
  }

  function handleDelete() {
    deleteTask(taskData.id);
    handleClose();
  }

  function toggleStatus() {
    taskData.dueDate = taskData.dueDate.$d.toLocaleDateString();
    taskData.status = !taskData.status;
    updateTask(taskData);
    setTaskData(null);
  }

  const isNewTask = !taskData?.id;

  return (
    <div>
      {taskData && (
        <Modal
          open={isModalOpen}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-notes"
        >
          <Box className="absolute left-1/2 top-1/2 w-[90vw] max-w-3xl -translate-x-1/2 -translate-y-1/2 rounded bg-white p-4 shadow-lg focus:outline-none md:w-1/2">
            <div className="mb-4 text-2xl font-medium flex justify-between">
              {isNewTask ? "New Task" : "Edit Task"}
              {!isNewTask ? (
                <Switch checked={taskData.status} onChange={toggleStatus} />
              ) : null}
            </div>
            <form
              onSubmit={isNewTask ? handleCreate : handleUpdate}
              className="flex flex-col gap-4"
            >
              <TextField
                label="Name"
                variant="outlined"
                value={taskData.name || ""}
                onChange={(e) =>
                  setTaskData({ ...taskData, name: e.target.value })
                }
                required
              />
              <TextField
                label="Notes"
                variant="outlined"
                multiline
                value={taskData.notes || ""}
                onChange={(e) =>
                  setTaskData({ ...taskData, notes: e.target.value })
                }
              />
              <ClientSelect />
              <AssignedSelect />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={taskData.dueDate || null}
                  onChange={(newDate) =>
                    setTaskData({ ...taskData, dueDate: newDate })
                  }
                  required
                />
              </LocalizationProvider>

              <div className="mt-2 flex text-white">
                <button
                  type="submit"
                  className="self-start rounded bg-blue-500 p-2 hover:bg-blue-600"
                >
                  {isNewTask ? "Create Task" : "Update"}
                </button>

                {!isNewTask && (
                  <button
                    onClick={handleDelete}
                    className="ml-4 self-start rounded bg-red-500 p-2 hover:bg-red-600"
                  >
                    Delete
                  </button>
                )}
              </div>
            </form>
          </Box>
        </Modal>
      )}
    </div>
  );
}
