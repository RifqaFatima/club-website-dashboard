
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import MemberDashboard from './memberDashboard/pages/memberDashboard.jsx'


import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
     <MemberDashboard />
  </React.StrictMode>
);
