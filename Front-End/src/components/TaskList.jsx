import TaskItem from "./TaskItem";

const TaskList = ({ tasks, refreshTasks }) => {
 
  const safeTasks = Array.isArray(tasks) ? tasks : [];

  return (
    <div className="space-y-2">
      {safeTasks.length > 0 ? (
        safeTasks.map((task) => (
          <TaskItem key={task._id} task={task} refreshTasks={refreshTasks} />
        ))
      ) : (
        <p className="text-gray-500">No tasks available.</p>
      )}
    </div>
  );
};

export default TaskList;
