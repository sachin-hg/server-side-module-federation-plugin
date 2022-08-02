import React from "react";
import { default as App2Shared } from "app2/shared";
import { default as App3Shared } from "app3/shared";

export default function App() {
  return (
    <div>
      I'm in App1
      <App2Shared />
      <App3Shared />
    </div>
  );
}
