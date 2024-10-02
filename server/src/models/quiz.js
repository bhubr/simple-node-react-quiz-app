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
  for (; i < lines.length; i++) {
    console.log(lines[i])
    if (lines[i].startsWith("## ")) {
      questionTitle = lines[i].slice(3);
      questions.push({
        title: questionTitle,
      });
      continue;
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
