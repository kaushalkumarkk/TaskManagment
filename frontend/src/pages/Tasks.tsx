import { useContext, useEffect, useState } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "../api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";

interface Task {
  _id: string;
  title: string;
  description: string;
  status: "Pending" | "Completed";
}

const Tasks = () => {
  const { token, logout } = useContext(AuthContext)!;
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({ title: "", description: "", status: "Pending" });
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("All");

  useEffect(() => {
    if (token) {
      getTasks(token).then((res) => setTasks(res.data));
    }
  }, [token]);

  const addTask = async () => {
    if (!newTask.title) {
      toast.error("Task title is required!");
      return;
    }
    try {
      const { data } = await createTask(token!, newTask);
      setTasks([...tasks, data]);
      setNewTask({ title: "", description: "", status: "Pending" });
      toast.success("Task added successfully!");
    } catch (error) {
      toast.error("Failed to add task!");
    }
  };

  const saveTaskUpdate = async () => {
    if (!editTask) return;
    try {
      const { data } = await updateTask(token!, editTask._id, {
        title: editTask.title,
        description: editTask.description,
        status: editTask.status,
      });
      setTasks(tasks.map((t) => (t._id === editTask._id ? data : t)));
      setEditTask(null);
      toast.success("Task updated successfully!");
    } catch (error) {
      toast.error("Failed to update task!");
    }
  };

  const removeTask = async (id: string) => {
    try {
      await deleteTask(token!, id);
      setTasks(tasks.filter((t) => t._id !== id));
      toast.success("Task deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete task!");
    }
  };

  const filteredTasks = filterStatus === "All" ? tasks : tasks.filter((task) => task.status === filterStatus);

  return (
    <div className="container mx-auto p-4">
      <Toaster position="top-right"/>
      <h1 className="text-2xl font-bold mb-4">Task List</h1>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => {
            logout();
            navigate("/");
            toast.success("Logged out successfully!");
          }}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <div className="flex my-4">
        <input
          className="border p-2 mr-2 w-1/4"
          placeholder="Task title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <input
          className="border p-2 mr-2 w-1/4"
          placeholder="Description"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        />
        <select
          className="border p-2 mr-2 w-1/4"
          value={newTask.status}
          onChange={(e) => setNewTask({ ...newTask, status: e.target.value as "Pending" | "Completed" })}
        >
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
        <button onClick={addTask} className="bg-green-500 text-white px-4 py-2 rounded">
          Add Task
        </button>
      </div>

      <div className="mb-4">
        <label className="mr-2 font-bold">Filter by Status:</label>
        <select className="border p-2" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Task Title</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task) => (
              <tr key={task._id} className="text-center">
                <td className="border p-2">
                  {editTask?._id === task._id ? (
                    <input
                      className="border p-1"
                      value={editTask.title}
                      onChange={(e) => setEditTask({ ...editTask, title: e.target.value })}
                    />
                  ) : (
                    task.title
                  )}
                </td>
                <td className="border p-2">
                  {editTask?._id === task._id ? (
                    <select
                      className="border p-1"
                      value={editTask.status}
                      onChange={(e) => setEditTask({ ...editTask, status: e.target.value as "Pending" | "Completed" })}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Completed">Completed</option>
                    </select>
                  ) : (
                    <span className={task.status === "Completed" ? "text-green-500" : "text-red-500"}>
                      {task.status}
                    </span>
                  )}
                </td>
                <td className="border p-2">
                  {editTask?._id === task._id ? (
                    <input
                      className="border p-1"
                      value={editTask.description}
                      onChange={(e) => setEditTask({ ...editTask, description: e.target.value })}
                    />
                  ) : (
                    task.description
                  )}
                </td>
                <td className="border p-2">
                  {editTask?._id === task._id ? (
                    <button onClick={saveTaskUpdate} className="bg-blue-500 text-white px-2 py-1 rounded mr-2">
                      Save
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => setEditTask(task)}
                        className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => removeTask(task._id)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
            {filteredTasks.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center p-4">
                  No tasks found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tasks;
