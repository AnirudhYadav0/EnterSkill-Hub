import { useState, useEffect } from "react";
import API from "../services/api";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Medium",
    dueDate: "",
  });

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data.tasks);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/tasks", formData);

      alert("Task Added Successfully");

      setFormData({
        title: "",
        description: "",
        priority: "Medium",
        dueDate: "",
      });

      fetchTasks();
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    fetchTasks();
  };

  return (
    <div className="container mt-5">
      <h1>My Tasks</h1>

      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-3"
          placeholder="Task Title"
          value={formData.title}
          onChange={(e) =>
            setFormData({ ...formData, title: e.target.value })
          }
        />

        <textarea
          className="form-control mb-3"
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />

        <select
          className="form-control mb-3"
          value={formData.priority}
          onChange={(e) =>
            setFormData({ ...formData, priority: e.target.value })
          }
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <input
          type="date"
          className="form-control mb-3"
          value={formData.dueDate}
          onChange={(e) =>
            setFormData({ ...formData, dueDate: e.target.value })
          }
        />

        <button className="btn btn-warning w-100">
          Add Task
        </button>
      </form>

      <hr />

      {tasks.length === 0 ? (
        <p>No Tasks Added</p>
      ) : (
        tasks.map((task) => (
          <div key={task._id} className="card p-3 mb-3">
            <h4>{task.title}</h4>
            <p>{task.description}</p>

            <p>
              <strong>Priority:</strong> {task.priority}
            </p>

            <p>
              <strong>Status:</strong> {task.status}
            </p>

            <p>
              <strong>Due:</strong>{" "}
              {task.dueDate
                ? new Date(task.dueDate).toLocaleDateString()
                : "N/A"}
            </p>

            <button
              className="btn btn-danger"
              onClick={() => deleteTask(task._id)}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Tasks;