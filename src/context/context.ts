import { createContext } from "react";
import { IAnswersContext } from "../utils/types";


export const AnswersContext = createContext<IAnswersContext>({
    answers: {},
    updateAnswers: () => {}
});