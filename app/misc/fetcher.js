export default function fetcher(url) {
  return fetch(url).then(r => {
    if (!r.ok) throw new Error("Request failed");
    return r.json();
  });
}
