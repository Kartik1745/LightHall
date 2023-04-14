import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [clickCount, setClickCount] = useState(parseInt(localStorage.getItem("clickCount")) || 0);
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

  return (
    <div className="App">
      <h1>Click Counter</h1>
      <button onClick={handleClick}>Click me!</button>
      <p>You have clicked the button {clickCount} times.</p>
    </div>
  );
}
export default App;