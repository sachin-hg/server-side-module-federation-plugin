import { renderToPipeableStream } from "react-dom/server";
import React from "react";
import App from "../components/App";
//
// export default () => {
//   const html = renderToString(<App />);
//   return { html };
// };


export default function (req, res) {
  // The new wiring is a bit more involved.
  res.socket.on("error", (error) => {
    console.error("Fatal", error);
  });
  let didError = false;
  const stream = renderToPipeableStream(
      <App />,
    {
      bootstrapScripts: [],
      onAllReady() {
        // If something errored before we started streaming, we set the error code appropriately.
        res.statusCode = didError ? 500 : 200;
        res.setHeader("Content-type", "text/html");
        stream.pipe(res);
      },
      onError(x) {
        didError = true;
        console.error(x, 'sdfsdfsdfsdfsdfs');
      }
    }
  );
  // Abandon and switch to client rendering if enough time passes.
  // Try lowering this to see the client recover.
  setTimeout(() => stream.abort(), 3000);
};
