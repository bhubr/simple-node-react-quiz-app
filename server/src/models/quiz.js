const { resolve } = require("node:path");
// const { readdirSync } = require("fs")
const { readdir, readFile, writeFile } = require("node:fs/promises");

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
    id: Date.now().toString(16),
    title,
    tags: [],
    questions,
  };
}

const quizzesDir = resolve(__dirname, "..", "..", "quizzes");

async function readJSON(f) {
  return JSON.parse(await readFile(f, "utf-8"));
}

async function writeJSON(f, d) {
  await writeFile(f, JSON.stringify(d));
}

async function readQuizzes() {
  const files = (await readdir(quizzesDir)).filter((f) => f.endsWith(".json"));
  return Promise.all(files.map(f => readJSON(resolve(quizzesDir, f))));
}

const slug = (str) => str.replace(/ +/g, "-").toLowerCase();

async function markdownToJSON(mdFile) {
  const content = await readFile(mdFile, "utf-8");
  const quiz = importQuizFromMarkdown(content);
  const jsonFileName = slug(`${quiz.id}-${quiz.title}.json`);
  console.log(jsonFileName, quiz);
  const jsonFilePath = resolve(quizzesDir, jsonFileName)
  await writeJSON(jsonFilePath, quiz);
}

module.exports = {
  importQuizFromMarkdown,
  readQuizzes,
  markdownToJSON,
};
