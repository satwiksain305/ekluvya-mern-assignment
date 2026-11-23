
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:5000";

export default function Import() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const importUsers = async () => {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch(`${API}/api/users/import`, {
        method: "POST"
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Import failed");
      }

      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page">
      <section className="panel">
        <span className="eyebrow">EKLUVYA • ADMIN</span>
        <h1>Bulk User Import</h1>
        <p>Import users from JSONPlaceholder into MongoDB Atlas.</p>

        <button onClick={importUsers} disabled={loading}>
          {loading ? "Importing..." : "Import Users"}
        </button>

        {error && <p className="error">{error}</p>}

        {result && (
          <div className="result">
            <h3>Import Summary</h3>
            <p>Total fetched: {result.totalFetched}</p>
            <p>Imported: {result.imported}</p>
            <p>Skipped: {result.skipped}</p>

            {result.credentials?.length > 0 && (
              <>
                <h3>One-time Login Credentials</h3>
                <p>Save these passwords securely. They cannot be retrieved later.</p>

                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Password</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.credentials.map((item, index) => (
                        <tr key={index}>
                          <td>{item.name}</td>
                          <td>{item.password}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {result.credentials?.length === 0 && (
              <p>These users were already imported. No new passwords were generated.</p>
            )}
          </div>
        )}

        <button className="secondary" onClick={() => navigate("/login")}>
          Go to Login
        </button>
      </section>
    </main>
  );
}
