import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [seriesList, setSeriesList] = useState([]);

  async function getSeries() {
    try {      
      const res = await axios.get(
        "https://api.cricapi.com/v1/series?apikey=40dfeb76-6f23-4ff0-934b-6f2eb3b7375f&offset=0"
      );
      setSeriesList(res.data.data || []); // Handle empty response
    } catch (error) {
      console.error("Error fetching series:", error);
    }
  }

  useEffect(() => {
    getSeries();
  }, []);

  return (
    <div>
      <h1>Welcome to Free Cricket Live Score</h1>
      <div className="matches">
        {seriesList.length > 0 ? (
          seriesList.map((series, i) => (
            <div className="match" key={series.id}>
              <h2>{series.name}</h2>
              <p>Start Date: {series.startDate}</p>
              <p>End Date: {series.endDate}</p>
              <p>
                Matches: {series.matches} | ODIs: {series.odi} | T20s:{" "}
                {series.t20} | Tests: {series.test}
              </p>
            </div>
          ))
        ) : (
          <p>Loading series data...</p>
        )}
      </div>
    </div>
  );
}

export default App;
//added