import { useState } from "react";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const TaskDetails = () => {
  const [taskId, setTaskId] = useState("");
  const [task, setTask] = useState(null);

  const fetchTask = async () => {
    try {
        const res = await axios.get(`${API_BASE_URL}/api/tasks/${taskId}`);
      setTask(res.data);
    } catch (error) {
      setTask(null);
      alert("Task not found!");
    }
  };

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <input
        type="text"
        placeholder="Enter Task ID"
        className="border p-2 w-full mb-2"
        value={taskId}
        onChange={(e) => setTaskId(e.target.value)}
      />
      <button onClick={fetchTask} className="bg-blue-500 text-white px-4 py-2 rounded">
        Get Task
      </button>
      {task && (
        <div className="mt-4 p-2 border">
          <h3 className="font-bold">{task.title}</h3>
          <p>{task.description}</p>
          <p className={task.completed ? "text-green-500" : "text-red-500"}>
            {task.completed ? "Completed" : "Pending"}
          </p>
        </div>
      )}
    </div>
  );
};

export default TaskDetails;
