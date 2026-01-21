import { useEffect, useState } from "react";
import { getIncidents } from "../api/incidentsApi";

export default function IncidentList({ onCreateClick, onSelectIncident, refreshKey }) {
    const [incidents, setIncidents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function load() {
            setLoading(true);
            setError("");

            try {
                const data = await getIncidents();
                setIncidents(data);
            } catch (e) {
                setError(e.message || "Something went wrong");
            } finally {
                setLoading(false);
            }
        }

        load();
    }, [refreshKey]);

    if (loading) return <p style={{ padding: 16 }}>Loading...</p>;
    if (error) return <p style={{ padding: 16, color: "red" }}>{error}</p>;

    return (
        <div style={{ padding: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <h1 style={{ margin: 0 }}>Incidents</h1>
                <button onClick={onCreateClick}>Create incident</button>
            </div>

            <div style={{ marginTop: 12 }}>
                {incidents.length === 0 ? (
                    <p>No incidents yet.</p>
                ) : (
                    <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%" }}>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Status</th>
                                <th>Priority</th>
                                <th>Created</th>
                            </tr>
                        </thead>
                        <tbody>
                            {incidents.map((i) => (
                                <tr
                                    key={i.id}
                                    onClick={() => onSelectIncident(i.id)}
                                    style={{ cursor: "pointer" }}
                                >
                                    <td>{i.title}</td>
                                    <td>{i.status}</td>
                                    <td>{i.priority}</td>
                                    <td>{new Date(i.createdAtUtc).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
