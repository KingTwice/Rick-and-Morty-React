import React, { useState, useEffect } from "react";
import Cards from "../components/Cards/Cards";
import InputGroup from "../components/Filters/Category/InputGroup";
import Footer from "../components/Footer/Footer";

const Episodes = () => {
  let [episodeId, setEpisodeId] = useState(1);
  let [info, setInfo] = useState([]);
  let [results, setResults] = useState([]);
  let { count, air_date, name } = info;
  let api = `https://rickandmortyapi.com/api/episode/${episodeId}`;

  useEffect(() => {
    (async function () {
      let data = await fetch(api).then((res) => res.json());
      setInfo(data);

      let a = await Promise.all(
        data.characters.map((x) => {
          return fetch(x).then((res) => res.json());
        })
      );
      setResults(a);
    })();
  }, [api]);

  return (
    <div className="container">
      <div className="row mb-5">
        <h1 className="text-center mb-4">
          Episode :{" "}
          <span className="text-info ">{name === "" ? "Unknown" : name}</span>
        </h1>
        <h5 className="text-center">
          {" "}
          Air Date: {air_date === "" ? "Unknown" : air_date}{" "}
        </h5>
      </div>
      <div className="row">
        <div className="col-lg-3 col-12">
          <h4 className="text-center mb-4">Pick Episode</h4>
          <InputGroup setEpisodeId={setEpisodeId} name="Episode" total={51} />
        </div>
        <div className="col-lg-8 col-12">
          <div className="row">
            <Cards results={results} />
          </div>
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default Episodes;
