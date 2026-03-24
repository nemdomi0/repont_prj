const BASE_URL = "http://127.0.0.1:8000";

// LEADERBOARD
export async function getLeaderboard(
  machine?: string,
  start?: string,
  end?: string
) {
  const params = new URLSearchParams();

  if (machine) params.append("machine", machine);
  if (start) params.append("start", start);
  if (end) params.append("end", end);

  const res = await fetch(`${BASE_URL}/leaderboard?${params}`);
  return res.json();
}

// EVENTS (with pagination + filters)
export async function getEvents(
  product: string,
  machine?: string,
  start?: string,
  end?: string
) {
  const params = new URLSearchParams({
    product,
  });

  if (machine) params.append("machine", machine);
  if (start) params.append("start", start);
  if (end) params.append("end", end);

  const res = await fetch(`${BASE_URL}/events?${params}`);
  return res.json();
}

// MACHINES (for dropdown)
export async function getMachines() {
  const res = await fetch(`${BASE_URL}/machines`);
  return res.json();
}