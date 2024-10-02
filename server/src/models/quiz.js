// export interface IAnswer {
//   label: string;
//   correct: boolean;
// }

// export interface IQuestion {
//   title: string;
//   answers: IAnswer[];
// }

// export interface IQuiz {
//   id: number;
//   title: string;
//   tags: string[];
//   questions: IQuestion[];
// }

function importQuizFromMarkdown(markdown) {
  const lines = markdown.split("\n");
  let title = "";
  let i;
  for (i = 0; i < lines.length; i++) {
    if (lines[i].startsWith("# ")) {
      title = lines[i].slice(2);
      break;
    }
  }

  let questionTitle = "";
  const questions = [];
  let question = {};
  for (; i < lines.length; i++) {
    if (lines[i].startsWith("## ")) {
      questionTitle = lines[i].slice(3);
      question = {
        title: questionTitle,
        answers: [],
      };

      questions.push(question);
      continue;
    }
    const answerMatch = lines[i].match(/^(-|\*) \[( |x)\] (.*)/);
    if (answerMatch) {
      const [, , xOrBlank, label] = answerMatch;
      const correct = xOrBlank === "x";
      question.answers.push({
        correct,
        label,
      });
    }
  }
  return {
    id: 1,
    title,
    tags: [],
    questions,
  };
}

module.exports = {
  importQuizFromMarkdown,
};
