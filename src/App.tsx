import "./App.css";
import { Desktop } from "./Pages";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Stratto from "./Pages/Stratto";
import AvailabilityScreen from "./components/AvailabilityScreen";
import BRollScreen from "./components/BRollScreen";
import FloorPlansScreen from "./components/FloorPlansScreen";

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Desktop />} />
        <Route path="/stratto" element={<Stratto />} />
        <Route path="/availability" element={<AvailabilityScreen />} />
        <Route path="/b-roll" element={<BRollScreen />} />
        <Route path="/floorplans" element={<FloorPlansScreen />} />
        {/* <Route path="/error" component={ErrorPage} /> */}
        <Route path="/:builderId/:projectId" element={<Desktop />} />
      </Routes>
    </Router>
  );
};
