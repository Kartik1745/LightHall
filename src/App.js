import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [clickCount, setClickCount] = useState(0);
  const [clickDistribution, setClickDistribution] = useState({});
  const [userCountry, setUserCountry] = useState("");

  useEffect(() => {
    axios
      .get("https://ipapi.co/json/")
      .then((response) => {
        setUserCountry(response.data.country_name);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://example.com/api/clicks")
      .then((response) => {
        setClickCount(response.data.count);
        setClickDistribution(response.data.distribution);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleClick = () => {
    setClickCount((count) => count + 1);
    axios
      .post("https://example.com/api/clicks", {
        country: userCountry,
      })
      .then((response) => {
        setClickDistribution(response.data.distribution);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleGeoClick = (e) => {
    const { name } = e.target;
    axios
      .post("https://example.com/api/clicks", {
        country: name,
      })
      .then((response) => {
        setClickDistribution(response.data.distribution);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="App">
      <h1>Click Counter</h1>
      <button onClick={handleClick}>Click me!</button>
      <p>You have clicked the button {clickCount} times.</p>
      <h2>Click Distribution by Geography</h2>
      <table>
        <thead>
          <tr>
            <th>Country</th>
            <th>Clicks</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(clickDistribution).map(([country, count]) => (
            <tr key={country}>
              <td>{country}</td>
              <td onClick={handleGeoClick} name={country}>
                {count}
              </td>
            </tr>
          ))}
          {userCountry && (
            <tr>
              <td>{userCountry} (you)</td>
              <td onClick={handleGeoClick} name={userCountry}>
                {clickDistribution[userCountry] || 0}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
