import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Scores from "../components/Scores/Scores";
import { AnswersContext } from "../context/context";
import { questionsList } from "../utils/constans";

const mockAnswers = {
    [questionsList[0].question]: questionsList[0].correctAnswer,
    [questionsList[1].question]: questionsList[1].correctAnswer,
    [questionsList[2].question]: questionsList[2].possibleAnswers[0],
    [questionsList[3].question]: questionsList[3].possibleAnswers[2],
    [questionsList[4].question]: questionsList[4].possibleAnswers[3],
};

const mockUpdateAnswers = vi.fn();



describe("Scores component tests", () => {
    test("should render Scores component and display the score", () => {
        render(
        <AnswersContext.Provider value={{ answers: mockAnswers, updateAnswers:mockUpdateAnswers }}>
            <Scores />
        </AnswersContext.Provider>
        );
        const scoreElement = screen.getByTestId("scoresHeader");
        expect(scoreElement).toBeDefined();
        expect(scoreElement).toHaveProperty("textContent", "Scores: 40");
    });
    
    test("should render Scores component and display the message", () => {
        render(
        <AnswersContext.Provider value={{ answers: {},updateAnswers:mockUpdateAnswers  }}>
            <Scores />
        </AnswersContext.Provider>
        );
        const scoreElement = screen.getByTestId("scoresHeader");
        expect(scoreElement).toHaveProperty("textContent", "Please Answer all the questions");
    });
});