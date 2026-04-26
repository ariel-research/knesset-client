import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CompassResultsPage from "./pages/CompassResultsPage";
import Homepage from "./pages/Homepage";
import { useEffect } from "react";
import HomepageOld from "./pages/HomepageOld";

function App() {
  useEffect(() => {
    document.title = "VoteMate";
  }, []);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/results" element={<CompassResultsPage />} />
          <Route path="/classic" element={<HomepageOld />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
