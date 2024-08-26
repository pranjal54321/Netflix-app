import React, { useEffect, useState } from "react";
import "./TitleCards.css";
import { Link } from "react-router-dom";

export default function TitleCards({ title, category }) {
  const [apiData, setApiData] = useState([]);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NmFkMTdhYjMxNzgzYjMxNGY4MTJmMmY4Y2ZiYWZjMCIsInN1YiI6IjY2NzU4YzE1YjU3NjhjOTU5NDNmN2UyZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BTvhHIDUCca_AUM-Li3xLbpAX75BQc4t7y9PpVYrBKk",
    },
  };

  useEffect(() => {
    fetch(
      ` https://api.themoviedb.org/3/movie/${
        category ? category : "now_playing"
      }?language=en-US&page=1`,
      options
    )
      .then((response) => response.json())
      .then((response) => setApiData(response.results))
      .catch((err) => console.error(err));
  });

  return (
    <div className="titlecards">
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list">
        {apiData.map((card, index) => {
          return (
            <Link to={`/player/${card.id}`} className="card" key={index}>
              <img
                src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path}
                alt=""
              />
              <p>{card.original_title}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
