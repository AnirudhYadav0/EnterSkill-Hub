import { useState, useEffect } from "react";
import API from "../services/api";

function Skills() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Programming");
  const [level, setLevel] = useState("Beginner");
  const [skills, setSkills] = useState([]);

  // Get Skills
  const getSkills = async () => {
    try {
      const res = await API.get("/skills");

      if (res.data.success) {
        setSkills(res.data.skills);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSkills();
  }, []);

  // Add Skill
  const addSkill = async (e) => {
    e.preventDefault();

    try {
      await API.post("/skills", {
        name,
        category,
        level,
      });

      setName("");
      setCategory("Programming");
      setLevel("Beginner");

      getSkills();

      alert("Skill Added Successfully");
    } catch (error) {
      console.log(error);
      alert("Error adding skill");
    }
  };

  // Delete Skill
  const deleteSkill = async (id) => {
    try {
      await API.delete(`/skills/${id}`);
      getSkills();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">My Skills</h2>

      <form onSubmit={addSkill}>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Skill Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <select
          className="form-control mb-3"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Programming</option>
          <option>Frontend</option>
          <option>Backend</option>
          <option>Database</option>
          <option>Cloud</option>
          <option>DevOps</option>
          <option>AI/ML</option>
          <option>Other</option>
        </select>

        <select
          className="form-control mb-3"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        >
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>

        <button className="btn btn-primary w-100">
          Add Skill
        </button>
      </form>

      <hr />

      {skills.length === 0 ? (
        <p>No Skills Added</p>
      ) : (
        skills.map((skill) => (
          <div key={skill._id} className="card p-3 mb-3 shadow">
            <h5>{skill.name}</h5>

            <p>
              <strong>Category:</strong> {skill.category}
            </p>

            <p>
              <strong>Level:</strong> {skill.level}
            </p>

            <button
              className="btn btn-danger"
              onClick={() => deleteSkill(skill._id)}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Skills;