import React, { useState, useEffect } from "react";
import Axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import BreweryChart from "./BreweryChart";
import DetailView from "./DetailView";

function App() {
  const [query, setQuery] = useState("");
  const [breweries, setBreweries] = useState([]);
  const [totalBreweries, setTotalBreweries] = useState(0);
  const [filterCriteria, setFilterCriteria] = useState("");

  useEffect(() => {
    let apiUrl = `https://api.openbrewerydb.org/v1/breweries?by_city=${query}`;

    if (filterCriteria !== "") {
      apiUrl += `&by_type=${filterCriteria}`;
    }

    getBreweries(apiUrl);
  }, [query, filterCriteria]);

  const getBreweries = async (apiUrl) => {
    try {
      const response = await Axios.get(apiUrl);
      setBreweries(response.data || []);
      setTotalBreweries(response.data ? response.data.length : 0);
    } catch (error) {
      console.error("Error fetching breweries:", error);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    let apiUrl = `https://api.openbrewerydb.org/v1/breweries?by_city=${query}`;

    if (filterCriteria !== "") {
      apiUrl += `&by_type=${filterCriteria}`;
    }

    getBreweries(apiUrl);
  };

  const handleFilterChange = (e) => {
    setFilterCriteria(e.target.value);
  };

  return (
    <Router>
      <div className="app">
        <h1>BrewTender</h1>
        <form className="app__searchForm" onSubmit={onSubmit}>
          <input
            className="app__input"
            type="text"
            placeholder="Enter city"
            autoComplete="off"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <select onChange={handleFilterChange}>
            <option value="">All Types</option>
            <option value="micro">Micro</option>
            <option value="regional">Regional</option>
            <option value="brewpub">Brewpub</option>
            <option value="large">Large</option>
            <option value="planning">Planning</option>
            <option value="contract">Contract</option>
            <option value="proprietor">Proprietor</option>
          </select>
          <button type="submit"> Search </button>
        </form>
        <BreweryChart />
        <div>
          <h2>Breweries Found: {totalBreweries}</h2>
        </div>
        <div>
          <h2>Filtered Breweries</h2>
          <ul className="brewery-list">
            {breweries.map((brewery) => (
              <li key={brewery.id}>
                <h3>{brewery.name}</h3>
                <p>Type: {brewery.brewery_type}</p>

                <Link to={`/brewery/${brewery.id}`}>View Details</Link>
              </li>
            ))}
          </ul>
        </div>
        
      </div>
    </Router>
  );
}

export default App;
