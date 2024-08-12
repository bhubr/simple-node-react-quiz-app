import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("N/A");

  useEffect(() => {
    fetch("http://localhost:5000")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <p>
          Message from server: <strong>{message}</strong>
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
