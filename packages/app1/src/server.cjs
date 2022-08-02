const express = require("express");
const serverEntry = require("../dist/server/serverEntry");

(async () => {
  const app = express();
  const initMiddleware = serverEntry.default;
  await initMiddleware(app);
  console.log('sdfjsdjfsdl________________________')
  app.listen(3000);
})();
