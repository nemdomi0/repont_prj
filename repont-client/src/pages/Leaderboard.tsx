import { useState, useEffect } from "react";
import Modal from "../components/Modal";
import { getLeaderboard, getEvents } from "../services/api";

type Item = {
  product_name: string;
  count: number;
};

function Leaderboard() {
  const [data, setData] = useState<Item[]>([]);
  const [selected, setSelected] = useState<Item | null>(null);

  const [events, setEvents] = useState<any[]>([]);
  const [machines, setMachines] = useState<any[]>([]);                                 /////////


  // FILTERS (for later)
  const [machine, setMachine] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // PAGINATION
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState<number | null>(10);

  // Load leaderboard
  useEffect(() => {
    getLeaderboard().then(setData);
  }, []);

  useEffect(() => {
  fetch("http://127.0.0.1:8000/machines")
    .then(res => res.json())
    .then(setMachines);
}, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Leaderboard</h1>

      {/* FILTER PANEL */}
      <div className="panel" style={{ marginBottom: "20px" }}>
        <h2>Filters</h2>

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <select onChange={(e) => setMachine(e.target.value)}>
            <option value="">All Machines</option>
              <option value="">All Machines</option>
              {machines.map((m) => (
                 <option key={m.id} value={m.machine_name}>
                  {m.machine_name}
                </option>
              ))}
          </select>

          <input type="date" onChange={(e) => setStartDate(e.target.value)} />
          <input type="date" onChange={(e) => setEndDate(e.target.value)} />

          <button
            onClick={() =>
              console.log("Filters:", machine, startDate, endDate)
            }
          >
            Apply
          </button>
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
              setPage(0);

              getEvents(item.product_name, 0, limit ?? 10).then(setEvents);
            }}
            style={{
              width: "60px",
              height: `${item.count * 0.05}px`
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
          <h2>{selected.product_name}</h2>

          {/* LIMIT SELECTOR */}
          <div style={{ marginBottom: "10px" }}>
            <label>Rows: </label>
            <select
              value={limit ?? "all"}
              onChange={(e) => {
                const value = e.target.value;
                const newLimit = value === "all" ? null : Number(value);

                setLimit(newLimit);
                setPage(0);

                getEvents(
                  selected.product_name,
                  0,
                  newLimit ?? 1000000
                ).then(setEvents);
              }}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={100}>100</option>
              <option value="all">No limit</option>
            </select>
          </div>

          {/* DATA */}
          <div style={{ maxHeight: "300px", overflowY: "auto" }}>
            {events.map((ev, i) => (
              <div key={i} style={{ padding: "5px 0" }}>
                Type: {ev.type_number} | Date: {ev.event_time}
              </div>
            ))}
          </div>

          {/* PAGINATION */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "10px"
            }}
          >
            <button
              onClick={() => {
                const prevPage = Math.max(page - 1, 0);
                setPage(prevPage);

                getEvents(
                  selected.product_name,
                  prevPage,
                  limit ?? 10
                ).then(setEvents);
              }}
              disabled={page === 0 || limit === null}
            >
              ⬅ Prev
            </button>

            <span>Page {page + 1}</span>

            <button
              onClick={() => {
                const nextPage = page + 1;
                setPage(nextPage);

                getEvents(
                  selected.product_name,
                  nextPage,
                  limit ?? 10
                ).then(setEvents);
              }}
              disabled={limit === null}
            >
              Next ➡
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default Leaderboard;