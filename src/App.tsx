import "./App.css";
import { Desktop } from "./Pages";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Stratto from "./Pages/Stratto";
import AvailabilityScreen from "./components/AvailabilityScreen";
import BRollScreen from "./components/BRollScreen";
import FloorPlansScreen from "./components/FloorPlansScreen";
import AmenitiesArea from "./components/AmenitiesArea";
import FloorPlan3DTour from "./components/FloorPlansScreen/FloorPlan3DTour";
import { ModalStratto } from "./components";

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Desktop />} />
        <Route path="/stratto" element={<Stratto />} />
        <Route path="/availability" element={<AvailabilityScreen />} />
        <Route path="/b-roll" element={<BRollScreen />} />
        <Route path="/floorplans" element={<FloorPlansScreen />} />
        <Route path="/amenities-area" element={<AmenitiesArea />} />
        <Route path="/floorplans-3d" element={<FloorPlan3DTour />} />
        <Route path="/test" element={<ModalStratto />} />
        {/* <Route path="/error" component={ErrorPage} /> */}
        <Route path="/:builderId/:projectId" element={<Desktop />} />
      </Routes>
    </Router>
  );
};
