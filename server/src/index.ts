import app from "./app";
import { port } from "./settings";

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
