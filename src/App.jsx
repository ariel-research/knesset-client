import styled from "styled-components";
import BillsSelectionPage from "./pages/BillsSelectionPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CompassResultsPage from "./pages/CompassResultsPage";

function App() {
  return (
    <Router>
      <AppWrapper>
        <Routes>
          <Route path="/" element={<BillsSelectionPage />} />
          <Route path="/results" element={<CompassResultsPage />} />
        </Routes>
      </AppWrapper>
    </Router>
  );
}

export default App;

const AppWrapper = styled.div`
  height: 100vh;
`;
