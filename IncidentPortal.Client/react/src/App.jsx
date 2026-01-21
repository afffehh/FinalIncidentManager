import { useState } from "react";
import IncidentList from "./pages/IncidentList";
import IncidentCreate from "./pages/IncidentCreate";
import IncidentDetail from "./pages/IncidentDetail";

export default function App() {
    const [page, setPage] = useState("list");
    const [refreshKey, setRefreshKey] = useState(0);
    const [selectedId, setSelectedId] = useState(null);

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

    if (page === "detail" && selectedId) {
        return (
            <IncidentDetail
                id={selectedId}
                onBack={goToListAndRefresh}
            />
        );
    }

    return (
        <IncidentList
            refreshKey={refreshKey}
            onCreateClick={() => setPage("create")}
            onSelectIncident={(id) => {
                setSelectedId(id);
                setPage("detail");
            }}
        />
    );
}