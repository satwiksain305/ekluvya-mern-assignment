
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:5000";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    fetch(`${API}/api/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(async (response) => {
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Session expired");
        }

        setUser(data.user);
      })
      .catch((err) => {
        localStorage.removeItem("token");
        setError(err.message);
        navigate("/login", { replace: true });
      });
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  if (!user) {
    return <main className="page"><p>Loading dashboard...</p>{error}</main>;
  }

  return (
    <main className="page">
      <section className="panel dashboard-panel">
        <span className="eyebrow">EKLUVYA • DASHBOARD</span>

        <div className="dashboard-heading">
          <div>
            <h1>Hey, welcome {user.name}!</h1>
            <p>You have successfully logged in.</p>
          </div>

          <button className="secondary" onClick={logout}>
            Logout
          </button>
        </div>

        <h3>Your Profile Details</h3>

        <div className="details-grid">
          <div>
            <small>Full Name</small>
            <strong>{user.name}</strong>
          </div>

          <div>
            <small>Email</small>
            <strong>{user.email}</strong>
          </div>

          <div>
            <small>Phone</small>
            <strong>{user.phone}</strong>
          </div>

          <div>
            <small>Company</small>
            <strong>{user.company?.name || "Not available"}</strong>
          </div>
        </div>
      </section>
    </main>
  );
}
