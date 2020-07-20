export const addHits = (name: string) => {
  return fetch('/api/coupang/hit', {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name })
  })
} 