const BASE_URL = "/api";

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

const res = await fetch(`${BASE_URL}/leaderboard?${params}`, {
  credentials: "include",
}); 
 return res.json();
}

// EVENTS (with pagination + filters)
export async function getEvents(
  productId: number,
  machine?: string,
  start?: string,
  end?: string
) {
  const params = new URLSearchParams({
    product: String(productId),
  });

  if (machine) params.append("machine", machine);
  if (start) params.append("start", start);
  if (end) params.append("end", end);

  const res = await fetch(`${BASE_URL}/events?${params}`, {
    credentials: "include",
  });
  return res.json();
}

// MACHINES (for dropdown)
export async function getMachines() {
  const res = await fetch(`${BASE_URL}/machines`, {
    credentials: "include",
  });
  return res.json();
}