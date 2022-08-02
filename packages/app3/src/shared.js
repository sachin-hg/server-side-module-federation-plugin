import { default as App2Shared } from "app2/shared";
import React from "react";
export default function Shared() {
  return (
    <div>
      I'm from App3... also nesting App2:   fdsd
      <App2Shared />
    </div>
  );
}
