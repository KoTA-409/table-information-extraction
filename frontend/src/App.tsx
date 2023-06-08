import React from "react";
import ReactDOM from "react-dom";
import TIE from "./Views/TIE"

import "./index.scss";

const App = () => (
  <div className="px-3 py-2 bg-white dark:bg-dark-main">
    <TIE />
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
