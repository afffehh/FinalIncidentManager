import { useState } from "react";
import { createIncident } from "../api/incidentsApi";

export default function IncidentCreate({ onCancel, onCreated }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState(1); // Medium = 1 i enum
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setSaving(true);

        try {
            await createIncident({
                title,
                description,
                priority: Number(priority)
            });

            onCreated(); // gå tillbaka + refresh
        } catch (e) {
            setError(e.message || "Failed to create incident");
        } finally {
            setSaving(false);
        }
    }

    return (
        <div style={{ padding: 16, maxWidth: 600 }}>
            <h1>Create incident</h1>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: 12 }}>
                    <label>Title</label>
                    <br />
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        style={{ width: "100%" }}
                    />
                </div>

                <div style={{ marginBottom: 12 }}>
                    <label>Description</label>
                    <br />
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={5}
                        style={{ width: "100%" }}
                    />
                </div>

                <div style={{ marginBottom: 12 }}>
                    <label>Priority</label>
                    <br />
                    <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                        <option value={0}>Low</option>
                        <option value={1}>Medium</option>
                        <option value={2}>High</option>
                        <option value={3}>Critical</option>
                    </select>
                </div>

                <div style={{ display: "flex", gap: 8 }}>
                    <button type="submit" disabled={saving}>
                        {saving ? "Saving..." : "Create"}
                    </button>
                    <button type="button" onClick={onCancel} disabled={saving}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
