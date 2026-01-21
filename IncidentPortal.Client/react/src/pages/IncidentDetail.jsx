import { useEffect, useState } from "react";
import {
    getIncidentById,
    updateIncidentPriority,
    updateIncidentStatus
} from "../api/incidentsApi";

const StatusOptions = [
    { value: 0, label: "Open" },
    { value: 1, label: "InProgress" },
    { value: 2, label: "Resolved" },
    { value: 3, label: "Closed" }
];

const PriorityOptions = [
    { value: 0, label: "Low" },
    { value: 1, label: "Medium" },
    { value: 2, label: "High" },
    { value: 3, label: "Critical" }
];

export default function IncidentDetail({ id, onBack }) {
    const [incident, setIncident] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    async function load() {
        setLoading(true);
        setError("");

        try {
            const data = await getIncidentById(id);
            setIncident(data);
        } catch (e) {
            setError(e.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        load();
    }, [id]);

    async function changeStatus(newStatus) {
        if (!incident) return;

        setSaving(true);
        setError("");

        try {
            const updated = await updateIncidentStatus(incident.id, Number(newStatus));
            setIncident(updated);
        } catch (e) {
            setError(e.message || "Failed to update status");
        } finally {
            setSaving(false);
        }
    }

    async function changePriority(newPriority) {
        if (!incident) return;

        setSaving(true);
        setError("");

        try {
            const updated = await updateIncidentPriority(incident.id, Number(newPriority));
            setIncident(updated);
        } catch (e) {
            setError(e.message || "Failed to update priority");
        } finally {
            setSaving(false);
        }
    }

    if (loading) return <p style={{ padding: 16 }}>Loading...</p>;
    if (error) return <p style={{ padding: 16, color: "red" }}>{error}</p>;
    if (!incident) return <p style={{ padding: 16 }}>Not found.</p>;

    return (
        <div style={{ padding: 16, maxWidth: 800 }}>
            <button onClick={onBack} disabled={saving}>← Back</button>

            <h1 style={{ marginTop: 12 }}>{incident.title}</h1>

            <p><b>ID:</b> {incident.id}</p>

            <p>
                <b>Created:</b> {new Date(incident.createdAtUtc).toLocaleString()}
                {incident.updatedAtUtc ? (
                    <> | <b>Updated:</b> {new Date(incident.updatedAtUtc).toLocaleString()}</>
                ) : null}
            </p>

            <div style={{ marginTop: 12 }}>
                <b>Description</b>
                <p style={{ whiteSpace: "pre-wrap" }}>{incident.description}</p>
            </div>

            <div style={{ display: "flex", gap: 16, marginTop: 16 }}>
                <div>
                    <label><b>Status</b></label>
                    <br />
                    <select
                        value={incident.status}
                        onChange={(e) => changeStatus(e.target.value)}
                        disabled={saving}
                    >
                        {StatusOptions.map((o) => (
                            <option key={o.value} value={o.value}>
                                {o.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label><b>Priority</b></label>
                    <br />
                    <select
                        value={incident.priority}
                        onChange={(e) => changePriority(e.target.value)}
                        disabled={saving}
                    >
                        {PriorityOptions.map((o) => (
                            <option key={o.value} value={o.value}>
                                {o.label}
                            </option>
                        ))}
                    </select>
                </div>

                {saving && <p style={{ marginTop: 22 }}>Saving...</p>}
            </div>
        </div>
    );
}
