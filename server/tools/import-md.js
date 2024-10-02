const { markdownToJSON } = require("../src/models/quiz");

(async () => {
  const source = process.argv[2];
  await markdownToJSON(source);
})();
