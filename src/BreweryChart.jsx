import React, { useState, useEffect } from "react";
import Axios from "axios";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const BreweryChart = () => {
  const [breweryData, setBreweryData] = useState([]);
  const [breweryTypeData, setBreweryTypeData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get("https://api.openbrewerydb.org/v1/breweries");
        const breweries = response.data;

        const stateBreweryCount = {};
        breweries.forEach((brewery) => {
          if (brewery.state) {
            stateBreweryCount[brewery.state] = (stateBreweryCount[brewery.state] || 0) + 1;
          }
        });

        const stateChartData = Object.keys(stateBreweryCount).map((state) => ({
          state,
          breweries: stateBreweryCount[state],
        }));

        setBreweryData(stateChartData);

        const typeBreweryCount = {};
        breweries.forEach((brewery) => {
          if (brewery.brewery_type) {
            typeBreweryCount[brewery.brewery_type] = (typeBreweryCount[brewery.brewery_type] || 0) + 1;
          }
        });

        const typeChartData = Object.keys(typeBreweryCount).map((type) => ({
          name: type,
          value: typeBreweryCount[type],
        }));

        setBreweryTypeData(typeChartData);
      } catch (error) {
        console.error("Error fetching brewery data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="chart-container">
      <div className="chart">
        <h2>Number of Breweries by State</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={breweryData}>
            <XAxis dataKey="state" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="breweries" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="chart">
        <h2>Distribution of Brewery Types Over Time</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={breweryTypeData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            
            {breweryTypeData.map((entry, index) => (
              <Line key={`line-${index}`} type="monotone" dataKey="value" stroke="#8884d8" />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BreweryChart;
