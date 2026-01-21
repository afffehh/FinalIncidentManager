export async function getIncidents() {
    const res = await fetch("/api/incidents");

    if (!res.ok) {
        throw new Error("Failed to fetch incidents");
    }

    return await res.json();
}

export async function createIncident(payload) {
    const res = await fetch("/api/incidents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });

    if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.message || "Failed to create incident");
    }

    return await res.json();
}

export async function getIncidentById(id) {
    const res = await fetch(`/api/incidents/${id}`);

    if (!res.ok) {
        throw new Error("Failed to fetch incident");
    }

    return await res.json();
}

export async function updateIncidentStatus(id, status) {
    const res = await fetch(`/api/incidents/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
    });

    if (!res.ok) {
        throw new Error("Failed to update status");
    }

    return await res.json();
}

export async function updateIncidentPriority(id, priority) {
    const res = await fetch(`/api/incidents/${id}/priority`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priority })
    });

    if (!res.ok) {
        throw new Error("Failed to update priority");
    }

    return await res.json();
}