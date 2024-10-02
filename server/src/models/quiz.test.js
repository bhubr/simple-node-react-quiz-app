const assert = require("assert");
const { importQuizFromMarkdown } = require("./quiz");

const sample = `# Sample quiz

## Who's the most powerful villain?

* [x] Sauron
* [ ] Lord Voldemort
* [ ] Darth Sidious

## What's the answer to life?

* [ ] 13
* [x] 42
* [ ] 421
`;

describe("importQuizFromMarkdown", () => {
  it("imports simple quiz", () => {
    const quiz = importQuizFromMarkdown(sample);

    assert.strictEqual(quiz.title, "Sample quiz");
    assert.strictEqual(quiz.questions.length, 2);

    assert.deepStrictEqual(quiz.questions[1].answers[1], {
      correct: true,
      label: "42",
    });
  });
});
