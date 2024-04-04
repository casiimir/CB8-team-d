import { useState, useEffect } from "react";

export default function Dailies() {
  const [dailies, setDailies] = useState([]);
  useEffect(() => {
    fetch("/api/dailies")
      .then((res) => res.json())
      .then((dailies) => setDailies(dailies.data));
  }, []);

  return (
    <div>
      <h2>Lista dailies</h2>
      {dailies.length > 0 &&
        dailies.map((daily) => (
          <div key={daily._id}>
            <p>{daily.title}</p>
          </div>
        ))}
    </div>
  );
}
