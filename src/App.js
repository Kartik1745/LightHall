import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [clickCount, setClickCount] = useState(0);
  const [clickDistribution, setClickDistribution] = useState({});

  const handleClick = () => {
    setClickCount((count) => count + 1);
  };

  useEffect(() => {
    const storedCount = parseInt(localStorage.getItem("clickCount"));
    if (!isNaN(storedCount)) {
      setClickCount(storedCount);
    }
    const storedDistribution = JSON.parse(localStorage.getItem("clickDistribution"));
    if (storedDistribution) {
      setClickDistribution(storedDistribution);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("clickCount", clickCount.toString());
    localStorage.setItem("clickDistribution", JSON.stringify(clickDistribution));
  }, [clickCount, clickDistribution]);

  const handleGeoClick = (e) => {
    const { name } = e.target;
    setClickDistribution((distribution) => {
      const updatedDistribution = {
        ...distribution,
        [name]: (distribution[name] || 0) + 1,
      };
      localStorage.setItem("clickDistribution", JSON.stringify(updatedDistribution));
      return updatedDistribution;
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
        </tbody>
      </table>
    </div>
  );
}

export default App;
