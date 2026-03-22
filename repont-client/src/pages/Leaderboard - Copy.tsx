import { useState } from "react";
import Modal from "../components/Modal";

type Item = {
  product: string;
  count: number;
};

function Leaderboard() {
  const data: Item[] = [
    { product: "Cola", count: 120 },
    { product: "Fanta", count: 90 },
    { product: "Viz", count: 60 },
    { product: "Juice", count: 40 },
    { product: "Tea", count: 20 }
  ];

  const [selected, setSelected] = useState<Item | null>(null);

  // FILTERS
  const [machine, setMachine] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // PAGINATION
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState<number | null>(10);

  // FAKE EVENTS
  const events = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    type: 123000 + i,
    time: `2025-01-${(i % 30) + 1}`
  }));

  const visible =
    limit === null
      ? events
      : events.slice(page * limit, page * limit + limit);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Leaderboard</h1>

      {/* FILTER PANEL */}
      <div className="panel" style={{ marginBottom: "20px" }}>
        <h2>Filters</h2>

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <select onChange={(e) => setMachine(e.target.value)}>
            <option value="">All Machines</option>
            <option>Alpha</option>
            <option>Beta</option>
            <option>Gamma</option>
            <option>Delta</option>
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
            }}
            style={{
              width: "60px",
              height: `${item.count * 2}px`
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
            {item.product}
          </div>
        ))}
      </div>

      {/* MODAL */}
      {selected && (
        <Modal onClose={() => setSelected(null)}>
          <h2>{selected.product}</h2>

          {/* LIMIT SELECTOR */}
          <div style={{ marginBottom: "10px" }}>
            <label>Rows: </label>
            <select
              value={limit ?? "all"}
              onChange={(e) => {
                const value = e.target.value;
                setLimit(value === "all" ? null : Number(value));
                setPage(0);
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
            {visible.map((item) => (
              <div key={item.id} style={{ padding: "5px 0" }}>
                Type: {item.type} | Time: {item.time}
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
              onClick={() => setPage((p) => Math.max(p - 1, 0))}
              disabled={page === 0 || limit === null}
            >
              ⬅ Prev
            </button>

            <span>Page {page + 1}</span>

            <button
              onClick={() =>
                setPage((p) =>
                  limit === null
                    ? p
                    : (p + 1) * limit < events.length
                    ? p + 1
                    : p
                )
              }
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