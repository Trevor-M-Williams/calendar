import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, set, push } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDapqX_9gPJH8hsIpO0Pze42VoGCDAfn-0",
  authDomain: "project-management-78165.firebaseapp.com",
  databaseURL: "https://project-management-78165-default-rtdb.firebaseio.com",
  projectId: "project-management-78165",
  storageBucket: "project-management-78165.appspot.com",
  messagingSenderId: "318555920281",
  appId: "1:318555920281:web:91ddcd3180378956a72508",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export function getTasks(setTasks) {
  const reference = ref(db, "tasks/");
  onValue(
    reference,
    (snapshot) => {
      const tasks = snapshot.val();
      if (tasks) {
        const tasksList = Object.entries(tasks).map(([id, taskData]) => ({
          id,
          ...taskData,
        }));
        // updateTasks(tasksList);
        setTasks(tasksList);
      } else {
        setTasks([]);
      }
    },
    (error) => {
      console.log("The read failed: " + error.name);
    }
  );
}

export function postTask(data) {
  if (!data) return;
  const tasksRef = ref(db, "tasks");
  const newTaskRef = push(tasksRef);
  set(newTaskRef, data);
}

export function updateTask(data) {
  if (!data) return;
  const taskRef = ref(db, `tasks/${data.id}`);
  set(taskRef, data);
}

export function deleteTask(id) {
  if (!id) return;
  const taskRef = ref(db, `tasks/${id}`);
  set(taskRef, null);
}

function updateTasks(tasks) {
  tasks.forEach((task) => {
    if (task.client === "Luminate") task.client = "Luminate Denver";
    const taskRef = ref(db, `tasks/${task.id}`);
    set(taskRef, task);
  });
}

export const auth = getAuth(app);
export const storage = getStorage(app);
export default app;
