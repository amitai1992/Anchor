import { FC, useState, useContext } from "react";
import { QuestionData } from "../../utils/types";
import classes from "./Question.module.css";
import { useNavigate } from "react-router-dom";
import { AnswersContext } from "../../context/context";


interface QuestionProps {
  data: QuestionData;
  nextPath: string;
  prevPath: string;
  submitText: string;
}

const Question: FC<QuestionProps> = ({
  data,
  nextPath,
  submitText,
  prevPath,
}) => {
  const { updateAnswers, answers } = useContext(AnswersContext);
  const [answerState, setAnswer] = useState<string | undefined>(
    answers[data.question]
  );

  const navigate = useNavigate();
  const handleAnswerClick = (ans: string) => {
    setAnswer(ans);
  };

  const handleNextClick = () => {
    if (!answerState) {
      return;
    }
    updateAnswers(data.question, answerState);
    navigate(nextPath);
  };

  return (
    <div>
      <h2>{data.question}</h2>
      <div>
        {data.possibleAnswers.map((answer) => (
          <div key={answer}>
            <input
              id={answer}
              data-testid={answer}
              type="radio"
              name={data.question}
              value={answer}
              onChange={() => handleAnswerClick(answer)}
              checked={answerState === answer}
            />
            {answer}
          </div>
        ))}
      </div>
      <div className={classes.buttons__container}>
        <button
          className={!prevPath ? classes.hide : ""}
          onClick={() => navigate(prevPath)}
          data-testid="prevBtn"
        >
          Previous
        </button>
        <button data-testid="nextBtn" disabled={!answerState} onClick={handleNextClick}>
          {submitText}
        </button>
      </div>
    </div>
  );
};

export default Question;
