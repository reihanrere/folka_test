import RoutePath from "./utils/Routes";
import React, { Suspense } from "react";

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <RoutePath />
      </Suspense>
    </div>
  );
}
export default App;
