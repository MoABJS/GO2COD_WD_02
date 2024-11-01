import { useEffect, useState } from "react";

import Score from "./Score";

const Questions = (props) => {
  const questions = props.questions;
  const setStarted = props.setStarted;
  const [questionNum, setQuestionNum] = useState(1);
  const [choices, setChoices] = useState([]);
  const choiceNum = ["A", "B", "C", "D"];
  let [participantsAnswers, setParticipantsAnswers] = useState(
    Array(10).fill("")
  );
  const [marks, setMarks] = useState(0);
  const [choiceIndex, setChoiceIndex] = useState();
  const [displayMarks, setDisplayMarks] = useState();

  const storingAnswers = (value, qNum, chIndx) => {
    setParticipantsAnswers(
      participantsAnswers.map((answer, index) =>
        index === qNum - 1 ? value : answer
      )
    );
    setChoiceIndex(chIndx);
  };

  const handleNextQuestion = () => {
    setQuestionNum(questionNum + 1);
    setChoiceIndex(null);
  };

  const marking = () => {
    let scores = 0;
    participantsAnswers.forEach((answer, index) =>
      answer === questions[index].correctAnswer ? scores++ : scores
    );

    setMarks(scores);
    setDisplayMarks(true);
  };

  useEffect(() => {
    setChoices([
      questions[questionNum - 1].correctAnswer,
      ...questions[questionNum - 1].incorrectAnswers,
    ]);
  }, [questionNum]);
  return (
    <div>
      {displayMarks ? (
        <Score setStarted={setStarted} marks={marks} />
      ) : (
        <div className="quiz-card">
          <div className="question-card">
            <div className="number">
              <p>
                <span>🛈</span>
                {` Question No.${questionNum} of 10`}
              </p>
            </div>
            <div className="question">
              <p>{`Q. ${questions[questionNum - 1].question.text}`}</p>
            </div>
          </div>
          <div className="choices-card">
            <p>Please choose one of the following answers:</p>
            <hr />
            <div className="choices">
              <ul>
                {choices.map((choice, index) => (
                  <li
                    key={index}
                    onClick={() => storingAnswers(choice, questionNum, index)}
                  >
                    <div>
                      <span>{`${choiceNum[index]}. `}</span>
                      {choice}
                    </div>
                    {choiceIndex === index ||
                    participantsAnswers[questionNum - 1] === choice ? (
                      <div>✓</div>
                    ) : (
                      <></>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <hr />
            <div className="buttons">
              {questionNum > 1 && (
                <button onClick={() => setQuestionNum(questionNum - 1)}>
                  <span>{"<"}</span>
                  Previous
                </button>
              )}
              <div></div>
              {questionNum < 10 ? (
                <button onClick={handleNextQuestion}>
                  Next
                  <span>{">"}</span>
                </button>
              ) : (
                <button onClick={marking}>Submit</button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Questions;
