import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("Breaking Bad");
const [searchTerm, setSearchTerm] = useState("Breaking Bad");

  useEffect(() => {
  const fetchShow = async () => {
    try {
      setLoading(true);
      setError("");
      setShow(null);

      const url =
        "https://api.tvmaze.com/singlesearch/shows?q=" +
        encodeURIComponent(searchTerm);

      const response = await fetch(url);

      if (response.status === 404) {
  throw new Error("TV show not found! Try another name.");
}

if (!response.ok) {
  throw new Error("Failed to fetch data");
}

      const data = await response.json();
      setShow(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchShow();
}, [searchTerm]);

  return (
    <div>
      <h1> TV Show Information</h1>

      <input
  type="text"
  value={query}
  onChange={(e) => setQuery(e.target.value)}
  placeholder="Enter a TV show name"
/>

<button onClick={() => setSearchTerm(query.trim())}>
  Search
</button>

      {loading && <p>Loading...</p>}

      {error && <p>{error}</p>}

      {show && (
        <div>
          <h2>{show.name}</h2>
          <p>Rating: {show.rating?.average ?? "N/A"}</p>
          <p>Language: {show.language}</p>
          <p>Premiered: {show.premiered}</p>
          <p>Genres: {show.genres.join(", ")}</p>

          {show.image && (
            <img
              src={show.image.medium}
              alt={show.name}
              width="200"
            />
          )}

          <div
            dangerouslySetInnerHTML={{
              __html: show.summary || "No summary available."
            }}
          />
        </div>
      )}
    </div>
  );
}

export default App;