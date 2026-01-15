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
