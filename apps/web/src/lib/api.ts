const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const token = typeof window !== "undefined" ? localStorage.getItem("zyvara_token") : null;
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...init?.headers
    },
    cache: "no-store"
  });
  if (!res.ok) throw new Error((await res.json().catch(() => null))?.message || "Request failed");
  return res.json();
}
