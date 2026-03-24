import { useState, useEffect } from "react";
import Modal from "../components/Modal";
import { getLeaderboard, getEvents, getMachines } from "../services/api";

type Item = {
  product_name: string;
  count: number;
};

function Leaderboard() {
  const [data, setData] = useState<Item[]>([]);
  const [selected, setSelected] = useState<Item | null>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [machines, setMachines] = useState<any[]>([]);

  const [machine, setMachine] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const maxCount = Math.max(...data.map((d) => d.count), 1);

  // LOAD MACHINES
  useEffect(() => {
    getMachines().then(setMachines);
  }, []);

  // LOAD LEADERBOARD (FILTERED)
  useEffect(() => {
    getLeaderboard(machine, startDate, endDate).then(setData);
  }, [machine, startDate, endDate]);

  // REFRESH MODAL DATA ON FILTER CHANGE
  useEffect(() => {
    if (selected) {
      getEvents(selected.product_name, machine, startDate, endDate)
        .then(setEvents);
    }
  }, [machine]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Leaderboard</h1>

      {/* FILTER PANEL */}
      <div className="panel" style={{ marginBottom: "20px" }}>
        <h2>Filters</h2>

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <select onChange={(e) => setMachine(e.target.value)}>
            <option value="">All Machines</option>
            {machines.map((m) => (
              <option key={m.id} value={m.id}>
                {m.machine_name}
              </option>
            ))}
          </select>

          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />

          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      {/* BAR CHART */}
      <div style={{ display: "flex", gap: "20px", alignItems: "flex-end" }}>
        {data.map((item, index) => (
          <div
            key={index}
            className="bar"
            onClick={() => {
              setSelected(item);
              getEvents(item.product_name, machine, startDate, endDate)
                .then(setEvents);
            }}
            style={{
              width: "60px",
              height: `${(item.count / maxCount) * 300}px`,
              cursor: "pointer"
            }}
          >
            <span>{item.count}</span>
          </div>
        ))}
      </div>

      {/* LABELS */}
      <div style={{ display: "flex", gap: "20px", marginTop: "10px" }}>
        {data.map((item, index) => (
          <div key={index} style={{ width: "60px", textAlign: "center" }}>
            {item.product_name}
          </div>
        ))}
      </div>

      {/* MODAL */}
      {selected && (
        <Modal onClose={() => setSelected(null)}>
          <h2 style={{ fontSize: "28px", marginBottom: "10px" }}>
            {selected.product_name}
          </h2>

          <div style={{ marginBottom: "10px", opacity: 0.8 }}>
            {events.length} rows loaded
          </div>

          <div style={{ maxHeight: "400px", overflowY: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid var(--border)" }}>
                  <th style={{ padding: "12px", textAlign: "left" }}>Machine</th>
                  <th style={{ padding: "12px", textAlign: "left" }}>Date</th>
                  <th style={{ padding: "12px", textAlign: "left" }}>Event Type</th>
                </tr>
              </thead>

              <tbody>
                {events.map((ev, i) => (
                  <tr
                    key={i}
                    style={{
                      borderBottom: "1px solid var(--border)",
                      transition: "background 0.2s ease"
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background =
                        "rgba(255,255,255,0.05)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "transparent")
                    }
                  >
                    <td style={{ padding: "12px" }}>{ev.machine_name}</td>
                    <td style={{ padding: "12px" }}>{ev.event_time}</td>
                    <td style={{ padding: "12px" }}>{ev.event_type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {events.length === 0 && (
            <p style={{ marginTop: "15px", opacity: 0.7 }}>
              No events found for this filter.
            </p>
          )}
        </Modal>
      )}
    </div>
  );
}

export default Leaderboard;