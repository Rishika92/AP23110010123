"use client";

import { useEffect, useState } from "react";
import { fetchNotifications } from "../services/api";
import { Log } from "../utils/logger";

export default function Home() {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const loadData = async () => {
      await Log("frontend", "info", "page", "Home page loaded");

      const data = await fetchNotifications();

      // Sort: Placement first, then latest timestamp
      const sorted = data.sort((a, b) => {
        if (a.Type === "Placement" && b.Type !== "Placement") return -1;
        if (a.Type !== "Placement" && b.Type === "Placement") return 1;

        return new Date(b.Timestamp) - new Date(a.Timestamp);
      });

      setNotifications(sorted);
    };

    loadData();
  }, []);

  // Filter handler
  const handleFilter = (type) => {
    setFilter(type);
    Log("frontend", "info", "component", `Filter changed to ${type}`);
  };

  // Apply filter
  const filteredNotifications =
    filter === "All"
      ? notifications
      : notifications.filter((n) => n.Type === filter);

  return (
    <div className="container">
      <h1>Notifications</h1>

      {/*  Filter Buttons */}
      <div className="filter-buttons">
        <button onClick={() => handleFilter("All")}>All</button>
        <button onClick={() => handleFilter("Placement")}>Placement</button>
        <button onClick={() => handleFilter("Result")}>Result</button>
        <button onClick={() => handleFilter("Event")}>Event</button>
      </div>

      {/* Notifications List */}
      {filteredNotifications.length === 0 ? (
        <p>No notifications found</p>
      ) : (
        filteredNotifications.map((n) => (
          <div key={n.ID} className="card">
            <h3>{n.Type}</h3>
            <p>{n.Message}</p>
            <small>{n.Timestamp}</small>
          </div>
        ))
      )}
    </div>
  );
}