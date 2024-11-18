import { describe, expect, test, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Question from "../components/Question/Question";
import {  questionsList  } from "../utils/constans";
import { AnswersContext } from "../context/context";
import classes from "../components/Question/Question.module.css";

const mockUpdateAnswers = vi.fn();
const mockNavigate = vi.fn();

vi.mock("react-router-dom", () => ({
  ...vi.importActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("question component tests", () => {
  test("should render question component and display the answers and question", () => {
    render(
      <Question
        data={questionsList[0]}
        nextPath="/"
        prevPath="/"
        submitText="submit"
      />
    );
    const questionElement = screen.getByText(questionsList[0].question);
    expect(questionElement).toBeDefined();
    const answerElement1 = screen.getByText(questionsList[0].possibleAnswers[0]);
    const answerElement2 = screen.getByText(questionsList[0].possibleAnswers[1]);
    const answerElement3 = screen.getByText(questionsList[0].possibleAnswers[2]);
    const answerElement4 = screen.getByText(questionsList[0].possibleAnswers[3]);
    expect(answerElement1).toBeDefined();
    expect(answerElement2).toBeDefined();
    expect(answerElement3).toBeDefined();
    expect(answerElement4).toBeDefined();
    const nextButton = screen.getByTestId("nextBtn");
    expect(nextButton).toBeDefined();
    const prevButton = screen.getByTestId("prevBtn");
    expect(prevButton).toBeDefined();
  });

  test("next button should be disabled when no answer is selected", () => {
    render(
      <Question
        data={questionsList[0]}
        nextPath="/"
        prevPath="/"
        submitText="submit"
      />
    );
    const nextButton = screen.getByTestId("nextBtn");
    expect(nextButton).toHaveProperty("disabled", true);
  });

  test("should call updateAnswers and navigate when next button is clicked", async () => {
    render(
      <AnswersContext.Provider
        value={{ updateAnswers: () => mockUpdateAnswers(), answers: {} }}
      >
        <Question
          data={questionsList[0]}
          nextPath="/"
          prevPath=""
          submitText="submit"
        />
      </AnswersContext.Provider>
    );
    const answerOption = screen.getByTestId(questionsList[0].possibleAnswers[0]);
    fireEvent.click(answerOption);
    const nextButton = await screen.findByTestId("nextBtn");
    fireEvent.click(nextButton);
    await waitFor(() => expect(mockUpdateAnswers).toHaveBeenCalled());
    expect(mockNavigate).toHaveBeenCalled();
  });

  test("should call navigate when prev button is clicked", async () => {
    render(
      <AnswersContext.Provider
        value={{ updateAnswers: () => mockUpdateAnswers(), answers: {} }}
      >
        <Question
          data={questionsList[0]}
          nextPath="/"
          prevPath="/"
          submitText="submit"
        />
      </AnswersContext.Provider>
    );
    const prevButton = screen.getByTestId("prevBtn");
    fireEvent.click(prevButton);
    await waitFor(() => expect(mockNavigate).toHaveBeenCalled());
  });

  test("prev button should be hidden when prevPath is not provided", () => {
    render(
      <AnswersContext.Provider
        value={{ updateAnswers: () => mockUpdateAnswers(), answers: {} }}
      >
        <Question
          data={questionsList[0]}
          nextPath="/"
          prevPath=""
          submitText="submit"
        />
      </AnswersContext.Provider>
    );
    const prevButton = screen.getByTestId("prevBtn");
    expect(prevButton).toBeDefined();
    expect(prevButton).toHaveProperty("className", classes.hide);
  });
});
