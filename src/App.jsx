import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CompassResultsPage from "./pages/CompassResultsPage";
import Homepage from "./pages/Homepage";
import AboutPage from "./pages/AboutPage";
import NavBar from "./components/common/NavBar";
import { useEffect } from "react";
import HomepageOld from "./pages/HomepageOld";

function App() {
  useEffect(() => {
    document.title = "VoteMate";
  }, []);

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/results" element={<CompassResultsPage />} />
        <Route path="/classic" element={<HomepageOld />} />
      </Routes>
    </Router>
  );
}

export default App;
