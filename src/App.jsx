import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GeneralLayout from "./layouts/GeneralLayout";
import JoinPage from "./pages/JoinPage";
import MultiStepForm from "./pages/MultiStepForm";

function App() {
  return (
    <Router>
      <Routes>
        {/* Onboarding Routes */}
        <Route path="/onboarding" element={<GeneralLayout />}>
          <Route index element={<JoinPage />} />
          <Route path="route1" element={<MultiStepForm step={1} />} />
          <Route path="route2" element={<MultiStepForm step={2} />} />
          <Route path="route3" element={<MultiStepForm step={3} />} />
          <Route path="route4" element={<MultiStepForm step={4} />} />
          <Route path="route5" element={<MultiStepForm step={5} />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
