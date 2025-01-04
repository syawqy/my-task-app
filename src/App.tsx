import { useEffect, useState } from "react";
import { Task } from "./types";

function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks')
    return savedTasks ? JSON.parse(savedTasks) : []
  })
  const [newTask, setNewTask] = useState('')

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const addTask = () => {
    if (!newTask.trim()) return;

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text: newTask,
        completed: false,
      },
    ]);
    setNewTask("");
  };

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Task Manager</h1>

        <div className="flex mb-4">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="flex-1 p-2 border rounded-l-lg focus:outline-none focus:border-blue-500"
            placeholder="Add a new task..."
            onKeyUp={(e) => {
              if (e.key === "Enter") addTask();
            }}
          />
          <button
            onClick={addTask}
            className="bg-blue-500 text-white px-4 rounded-r-lg hover:bg-blue-600"
          >
            Add
          </button>
        </div>

        <div className="space-y-2">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center p-3 bg-gray-50 rounded-lg"
            >
              <label className="flex items-center flex-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="mr-3 h-4 w-4 cursor-pointer accent-blue-500"
                />
                <span
                  className={`flex-1 ${
                    task.completed ? "line-through text-gray-500" : ""
                  }`}
                >
                  {task.text}
                </span>
              </label>
              <button
                onClick={() => deleteTask(task.id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
