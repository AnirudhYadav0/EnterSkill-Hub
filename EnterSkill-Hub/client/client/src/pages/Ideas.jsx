import { useState, useEffect } from "react";
import API from "../services/api";

function Ideas() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("Draft");
  const [ideas, setIdeas] = useState([]);

  const getIdeas = async () => {
    try {
      const res = await API.get("/ideas");
      setIdeas(res.data.ideas);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getIdeas();
  }, []);

  const addIdea = async (e) => {
    e.preventDefault();

    try {
      await API.post("/ideas", {
        title,
        description,
        category,
        status,
      });

      setTitle("");
      setDescription("");
      setCategory("");
      setStatus("Draft");

      getIdeas();
      alert("Idea Added Successfully");
    } catch (err) {
      console.log(err);
      alert("Error adding idea");
    }
  };

  const deleteIdea = async (id) => {
    try {
      await API.delete(`/ideas/${id}`);
      getIdeas();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Business Ideas</h2>

      <form onSubmit={addIdea}>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Idea Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="form-control mb-3"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <select
          className="form-control mb-3"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>Draft</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>

        <button className="btn btn-success w-100">
          Add Idea
        </button>
      </form>

      <div className="mt-4">
        {ideas.length === 0 ? (
          <p>No Ideas Added</p>
        ) : (
          ideas.map((idea) => (
            <div key={idea._id} className="card p-3 mb-3">
              <h4>{idea.title}</h4>
              <p>{idea.description}</p>
              <p><strong>Category:</strong> {idea.category}</p>
              <p><strong>Status:</strong> {idea.status}</p>

              <button
                className="btn btn-danger"
                onClick={() => deleteIdea(idea._id)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Ideas;