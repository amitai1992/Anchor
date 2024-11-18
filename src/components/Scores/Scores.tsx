import { questionsList } from "../../utils/constans";
import { AnswersContext } from "../../context/context";
import { useContext } from "react";
const Scores = () => {
  const { answers } = useContext(AnswersContext);
  const score: number = questionsList.reduce((acc, question) => {
    if (answers[question.question] === question.correctAnswer) {
      return acc + 20;
    }
    return acc;
  }, 0);
  return (
    <div>
      <h1 data-testid="scoresHeader">
        {Object.keys(answers).length !== questionsList.length
          ? "Please Answer all the questions"
          : `Scores: ${score}`}
      </h1>
    </div>
  );
};

export default Scores;
