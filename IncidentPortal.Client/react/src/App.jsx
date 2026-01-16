import { useState } from "react";
import IncidentList from "./pages/IncidentList";
import IncidentCreate from "./pages/IncidentCreate";

export default function App() {
    const [page, setPage] = useState("list"); // "list" | "create"
    const [refreshKey, setRefreshKey] = useState(0);

    function goToListAndRefresh() {
        setPage("list");
        setRefreshKey((x) => x + 1);
    }

    if (page === "create") {
        return (
            <IncidentCreate
                onCancel={() => setPage("list")}
                onCreated={goToListAndRefresh}
            />
        );
    }

    return (
        <IncidentList
            refreshKey={refreshKey}
            onCreateClick={() => setPage("create")}
        />
    );
}
