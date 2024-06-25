const API_BASE_URL = "https://api.coingecko.com/api/v3";

export async function fetchCoinList() {
  const response = await fetch(
    `${API_BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch coin list");
  }
  return response.json();
}

export async function fetchCoinDetails(id) {
  const response = await fetch(`${API_BASE_URL}/coins/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch coin details");
  }
  return response.json();
}
