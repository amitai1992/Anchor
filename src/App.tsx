import { useCallback, useState } from "react";
import classes from "./App.module.css";
import { Outlet } from "react-router-dom";
import { AnswersContext } from "./context/context";
import { FinalAnswers } from "./utils/types";
function App() {
  const [answers, setAnswers] = useState<FinalAnswers>({});
  const updateAnswers = useCallback((question: string, answer: string) => {
    setAnswers((prevAnswers) => {
      return { ...prevAnswers, [question]: answer };
    });
  },[setAnswers]);

  return (
    <AnswersContext.Provider value={{ answers, updateAnswers }}>
      <div className={classes.container}>
        <Outlet />
      </div>
    </AnswersContext.Provider>
  );
}

export default App;
