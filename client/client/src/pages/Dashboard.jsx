import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">EnterSkill Hub Dashboard</h2>

      <div className="row g-4">

        <div className="col-md-4">
          <div className="card shadow p-3">
            <h4>Skills</h4>
            <p>Manage your technical skills.</p>
            <Link to="/skills" className="btn btn-primary">
              Open Skills
            </Link>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow p-3">
            <h4>Business Ideas</h4>
            <p>Store startup ideas.</p>
            <Link to="/ideas" className="btn btn-success">
              Open Ideas
            </Link>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow p-3">
            <h4>Tasks</h4>
            <p>Manage your daily tasks.</p>
            <Link to="/tasks" className="btn btn-warning">
              Open Tasks
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;