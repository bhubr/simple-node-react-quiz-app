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
    console.log(quiz)

    assert.strictEqual(quiz.title, "Sample quiz");
    assert.strictEqual(quiz.questions.length, 2);
  });
});
