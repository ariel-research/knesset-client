import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CompassResultsPage from "./pages/CompassResultsPage";
import HomepageV2 from "./pages/HomepageV2";
import { useEffect } from "react";
import Homepage from "./pages/Homepage";

function App() {
  useEffect(() => {
    document.title = "VoteMate";
  }, []);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomepageV2 />} />
          <Route path="/results" element={<CompassResultsPage />} />
          <Route path="/classic" element={<Homepage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
