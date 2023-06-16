import React from "react";
import ReactDOM from "react-dom";
import TIE from "./Views/TIE"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "./index.scss";

const App = () => (
  <div className="px-3 py-2 bg-white dark:bg-dark-main">
    <TIE />
    <ToastContainer position="bottom-right" />
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
