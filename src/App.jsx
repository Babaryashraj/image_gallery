import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1); // only new state needed for page

  async function getData() {
    try {
      const response = await axios.get(
        `https://picsum.photos/v2/list?page=${page}&limit=10`
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    getData();
  }, [page]);

  return (
    <div className="main">

      <h1 className="heading"> Image Gallery</h1>

      <div className="gallery">
        {data.length > 0 ? (
          data.map((e, idx) => (
            <div className="card" key={idx}>
              <img className="image" src={e.download_url} alt="pic" />
              <h3 className="author">{e.author}</h3>
            </div>
          ))
        ) : (
          <h2 className="no-data">Loading...</h2>
        )}
      </div>

      <div className="scroll">
        <button
          onClick={() => page > 1 && setPage(page - 1)}
          className="btn"
        >
          Prev
        </button>

        <span className="page-number">Page: {page}</span>

        <button
          onClick={() => setPage(page + 1)}
          className="btn"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
