import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TradeTable } from "./components/Dashboard/TradeTable";
import { Report } from "./components/generateReport/report";
import Navbar from "./components/Navbar";
import Login from "./components/Login";

const App = () => {
  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
    };

    checkLoggedIn();
  }, []);

  return (
    <>
      <Router>
        <Navbar></Navbar>

        <Routes>
          <Route path="/" element={<TradeTable />} />
          <Route exact path="/login" element={<Login />} />
          <Route path="/report-generation" element={<Report />} />
          <Route path="/logout" element={<TradeTable />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
