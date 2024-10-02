const app = require("./app");
const { port } = require("./settings");

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
