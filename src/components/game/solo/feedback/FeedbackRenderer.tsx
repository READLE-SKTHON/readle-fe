import MultipleChoiceFeedback from "./MultipleChoiceFeedback";
import OxFeedback from "./OxFeedback";

import type { FeedbackStatus, Quiz } from "@/types/quiz";

type FeedbackRendererProps = {
  quiz: Quiz;
  status: FeedbackStatus;
};

export default function FeedbackRenderer({ quiz, status }: FeedbackRendererProps) {
  switch (quiz.type) {
    case "MULTIPLE_CHOICE":
      return <MultipleChoiceFeedback isCorrect={status === "CORRECT"} />;

    case "OX":
      return <OxFeedback status={status} />;

    case "SUBJECTIVE":
      return null;
  }
}
