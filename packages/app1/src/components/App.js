import React, {lazy, Suspense} from "react";
// import { default as App2Shared } from "app2/shared";
// import { default as App3Shared } from "app3/shared";
const LocalMessage = lazy(/* webpackChunkName: "message" */() => import("./message"));
const App2Shared = lazy(() => global.loadComponent('app2', './shared'));
const App2Message = lazy(() => global.loadComponent('app2', './message'));
const App3Shared = lazy(() => global.loadComponent('app3', './shared'));

export default function App() {
  return (
    <div>
      I'm in App1
      <Suspense fallback={<>loading local message..</>}>
        <LocalMessage />
      </Suspense>
      <Suspense fallback={<>loading app2 message from app1..</>}>
        <App2Message />
      </Suspense>
      <Suspense fallback={<>loading app2 shared from app1..</>}>
        <App2Shared />
      </Suspense>
      <Suspense fallback={<>loading app3 shared from app1..</>}>
        <App3Shared />
      </Suspense>
    </div>
  );
}
