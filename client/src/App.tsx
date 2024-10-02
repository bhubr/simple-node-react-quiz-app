import { useState, useEffect } from "react";
import "./App.css";

function Quiz({ quiz, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <div>
      <div style={{ textAlign: "right" }}>
        <button onClick={onClose}>X</button>
      </div>
      <h3>
        {currentIndex + 1}/{quiz.questions.length} -{" "}
        {quiz.questions[currentIndex].title}
      </h3>
      {quiz.questions[currentIndex].answers.map((a, aIdx) => (
        <div key={a.label}>
          <label htmlFor={`q${currentIndex}-a${aIdx}`}>
            <input id={`q${currentIndex}-a${aIdx}`} type="checkbox" />{" "}
          {a.label}
          </label>
          </div>
      ))}
    </div>
  );
}

function App() {
  const [quizzes, setQuizzes] = useState([]);
  const [currentQuiz, setCurrentQuiz] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/quizzes")
      .then((res) => res.json())
      .then(setQuizzes);
  }, []);

  const onCloseQuiz = () => setCurrentQuiz(null);

  return (
    <>
      <h1>Quiz app</h1>
      {currentQuiz ? (
        <Quiz quiz={currentQuiz} onClose={onCloseQuiz} />
      ) : (
        quizzes.map((q) => (
          <button key={q.id} onClick={() => setCurrentQuiz(q)}>
            {q.title}
          </button>
        ))
      )}
    </>
  );
}

export default App;
