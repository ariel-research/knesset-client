import { useState } from "react";
import {
  ArrowBox,
  BillsSelectionWrapper,
  BillsTableWrapper,
  BillsTablesContainer,
  FormContainer,
  Header,
  HeadersWrapper,
  Hint,
  LoadSelectedBillsButton,
} from "./BillsSelection.styled";
import BillsSuggestionsTable from "../components/common/BillsSuggestionsTable";
import SelectedBillsTable from "../components/common/SelectedBillsTable";
import SearchBills from "../components/common/SearchBills";

const BillsSelectionPage = () => {
  const [selectedData, setSelectedData] = useState([]);
  const [finalSelectedBillsData, setFinalSelectedBillsData] = useState([]);
  const [data, setData] = useState([]);

  const header = "שקיפות בכנסת";
  const hint =
    "שירות זה נועד כדי לספק לציבור בישראל אפשרות להשוות בין דעותיהם הפוליטיות להצבעות חברי כנסת ישראל";

  const loadSelectedBillsHandler = () => {
    const res = [...selectedData];
    setFinalSelectedBillsData(res);
  };

  const loadAllBillsHandler = () => {
    const res = [...data];
    setFinalSelectedBillsData(res);
  };

  return (
    <BillsSelectionWrapper>
      <HeadersWrapper>
        <Header>{header}</Header>
        <Hint>{hint}</Hint>
      </HeadersWrapper>
      <FormContainer>
        <SearchBills />
        <BillsTablesContainer>
          <BillsTableWrapper>
            <div>הצבעות אפשריות</div>
            <BillsSuggestionsTable
              selectedData={selectedData}
              setSelectedData={setSelectedData}
              data={data}
              setData={setData}
            />
          </BillsTableWrapper>

          <ArrowBox>
            <LoadSelectedBillsButton onClick={loadSelectedBillsHandler}>
              טען הצעות חוק שנבחרו
            </LoadSelectedBillsButton>
            <button onClick={loadAllBillsHandler}>טען הכל</button>
          </ArrowBox>
          <BillsTableWrapper>
            <div>הצבעות שנבחרו</div>
            <SelectedBillsTable data={finalSelectedBillsData} />
          </BillsTableWrapper>
        </BillsTablesContainer>
      </FormContainer>
    </BillsSelectionWrapper>
  );
};

export default BillsSelectionPage;
