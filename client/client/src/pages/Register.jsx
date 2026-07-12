import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/register", formData);

      alert(res.data.message || "Registration Successful");

      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="container mt-5">
      <div
        className="card p-4 shadow mx-auto"
        style={{ maxWidth: "400px" }}
      >
        <h2 className="text-center mb-4">Create Account</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            className="form-control mb-3"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            className="form-control mb-3"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            className="form-control mb-3"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />

          <button type="submit" className="btn btn-success w-100">
            Register
          </button>
        </form>

        <p className="text-center mt-3">
          Already have an account?{" "}
          <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;