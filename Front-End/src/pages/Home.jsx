import { useState, useEffect } from "react";
import axios from "axios";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import TaskDetails from "../components/TaskDetails";

const Home = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await axios.get("http://localhost:5000/api/tasks");

    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Task Management</h1>
      <TaskForm refreshTasks={fetchTasks} />
      <TaskDetails />
      <TaskList tasks={tasks} refreshTasks={fetchTasks} />
    </div>
  );
};

export default Home;
