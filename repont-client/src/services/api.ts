const BASE_URL = "http://127.0.0.1:8000";

// LEADERBOARD
export async function getLeaderboard() {
  const res = await fetch(`${BASE_URL}/leaderboard`);
  return res.json();
}

// EVENTS (with pagination + filters)
export async function getEvents(
  product: string,
  page: number,
  limit: number,
  machine?: string
) {
  const params = new URLSearchParams({
    product,
    page: String(page),
    limit: String(limit),
  });

  if (machine && machine !== "") {
    params.append("machine", machine);
  }

  const res = await fetch(
    `${BASE_URL}/events?${params.toString()}`
  );

  return res.json();
}

// MACHINES (for dropdown)
export async function getMachines() {
  const res = await fetch(`${BASE_URL}/machines`);
  return res.json();
}