import { useEffect, useState } from "react";
import "./App.css";
import Questions from "./component/Questions";

function App() {
  const [started, setStarted] = useState();
  const [questions, setQuestions] = useState([]);

  const takeQuiz = () => {
    setStarted(true);
  };

  const getQuizQuestions = async () => {
    const data = await fetch("https://the-trivia-api.com/v2/questions")
      .then((res) => res.json())
      .then((data) => data);

    return data;
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      const data = await getQuizQuestions();
      console.log("data", data);
      setQuestions(data);
    };
    fetchQuestions();
  }, []);

  return (
    <div className="App">
      <nav className="nav-bar">
        <h1>Quiz App</h1>
      </nav>
      {started ? (
        <Questions questions={questions} setStarted={setStarted} />
      ) : (
        <div className="home">
          <h2>Hey there 👋</h2>
          <p>Welcome to Quiz App 🤗</p>
          <p>Are you confident in the amount of random facts you know?</p>
          <p>
            Click on the button below to partake in a quiz to challenge
            yourself!
          </p>
          <button onClick={takeQuiz}>Accept Challenge</button>
        </div>
      )}
    </div>
  );
}

export default App;
