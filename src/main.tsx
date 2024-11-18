import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { questionsList } from "./utils/constans.ts";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Question from "./components/Question/Question.tsx";
import Scores from "./components/Scores/Scores.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      ...questionsList.map((questionData, index) => {
        if (index === 0) {
          return {
            index: true,
            element: (
              <Question
                data={questionData}
                prevPath=""
                submitText="Next"
                nextPath={`/${index + 1}`}
                key={questionData.question}
              />
            ),
          };
        } else {
          return {
            path: `/${index}`,
            element: (
              <Question
                data={questionData}
                prevPath={`/${index > 1? index - 1 : ''}`}
                submitText={
                  index < questionsList.length - 1 ? "Next" : "Submit"
                }
                nextPath={`/${
                  index < questionsList.length - 1 ? index + 1 : "scores"
                }`}
                key={questionData.question}
              />
            ),
          };
        }
      }),
      { path: "/scores", element: <Scores /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
