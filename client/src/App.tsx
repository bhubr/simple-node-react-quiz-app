import { useState, useEffect, useMemo } from "react";
import { Routes, Route, Link, useParams } from "react-router-dom";
import "./App.css";

function Quiz({ quizzes }) {
  // const { }
  const [currentIndex, setCurrentIndex] = useState(0);
  const { quizId } = useParams();

  console.log(quizzes, quizId)

  const quiz = useMemo(
    () => quizzes.find((q) => q.id === quizId),
    [quizzes, quizId]
  );
  if (!quiz) {
    return <p>Loading&hellip;</p>
  }
  return (
    <div>
      <div style={{ textAlign: "right" }}>
        <Link to="/">X</Link>
      </div>
      <h3>
        {currentIndex + 1}/{quiz.questions.length} -{" "}
        {quiz.questions[currentIndex].title}
      </h3>
      {quiz.questions[currentIndex].answers.map((a, aIdx) => (
        <div key={a.label}>
          <label htmlFor={`q${currentIndex}-a${aIdx}`}>
            <input id={`q${currentIndex}-a${aIdx}`} type="checkbox" /> {a.label}
          </label>
        </div>
      ))}
    </div>
  );
}

function Home({ quizzes }) {
  return (
    <>
      {quizzes.map((q) => (
        <Link key={q.id} to={`/quizzes/${q.id}`}>
          {q.title}
        </Link>
      ))}
    </>
  );
}

function App() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/quizzes")
      .then((res) => res.json())
      .then(setQuizzes);
  }, []);

  return (
    <>
      <h1>Quiz app</h1>
      <Routes>
        <Route path="/" element={<Home quizzes={quizzes} />} />
        <Route path="/quizzes/:quizId" element={<Quiz quizzes={quizzes} />} />
      </Routes>
    </>
  );
}

export default App;
