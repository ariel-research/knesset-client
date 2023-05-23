import styled from 'styled-components';
import BillsSelectionPage from './pages/BillsSelectionPage';

function App() {

  return (
    <AppWrapper>
      <BillsSelectionPage />
    </AppWrapper>
  );
}

export default App;

const AppWrapper = styled.div`
  height: 100vh;
`;