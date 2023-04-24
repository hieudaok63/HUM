import "./App.css";
import { Desktop } from "./Pages";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Desktop />} />
        {/* <Route path="/error" component={ErrorPage} /> */}
        <Route path="/:builderId/:projectId" element={<Desktop />} />
      </Routes>
    </Router>
  );
};
