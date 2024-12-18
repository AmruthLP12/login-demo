import React from "react";

import { BrowserRouter as Router, Route, Routes, Link } from "react-router";
import Register from "./components/Register";
import Login from "./components/Login";
import FetchData from "./components/FetchData";

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/register">Register</Link> | <Link to="/login">Login</Link> |{" "}
          <Link to="/fetch-data">Fetch Data</Link>
        </nav>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/fetch-data" element={<FetchData />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

