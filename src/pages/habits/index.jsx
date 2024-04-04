import { useState, useEffect } from "react";

export default function Habits() {
  const [habits, setHabits] = useState([]);
  useEffect(() => {
    fetch("/api/habits")
      .then((res) => res.json())
      .then((habits) => setHabits(habits.data));
  }, []);

  return (
    <div>
      <h2>Lista habits</h2>
      {habits.length > 0 &&
        habits.map((habit) => (
          <div key={habit._id}>
            <p>{habit.title}</p>
          </div>
        ))}
    </div>
  );
}
