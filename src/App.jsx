import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CompassResultsPage from "./pages/CompassResultsPage";
import { useEffect } from "react";
import Homepage from "./pages/Homepage";

function App() {
  useEffect(() => {
    document.title = "Political Transparency";
  }, []);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/results" element={<CompassResultsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
