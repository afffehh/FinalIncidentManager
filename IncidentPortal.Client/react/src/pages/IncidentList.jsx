import { useEffect, useState } from "react";
import { getIncidents } from "../api/incidentsApi";

export default function IncidentList() {
    const [incidents, setIncidents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function load() {
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
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div style={{ padding: 16 }}>
            <h1>Incidents</h1>

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
                            <tr key={i.id}>
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
    );
}
