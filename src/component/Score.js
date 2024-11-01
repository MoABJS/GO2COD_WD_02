const Score = (props) => {
  const setStarted = props.setStarted;
  const score = props.marks;

  const remarks = () => {
    switch (true) {
      case score <= 2:
        return "Oooops!, You can do better.";
      case score <= 4:
        return "Okay, But there is room for improvement.";
      case score <= 6:
        return "Good. keep it up.";
      case score <= 8:
        return "Great well done.";
      case score <= 10:
        return "Wooooow.... You killed it, kudos.";
    }
  };

  return (
    <div className="score">
      <p>{remarks()}</p>
      <p>You got {score} out of 10 correct.</p>
      <button onClick={() => setStarted(false)}>Go home 🏠</button>
    </div>
  );
};

export default Score;
