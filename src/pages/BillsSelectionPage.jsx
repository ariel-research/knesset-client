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
import SearchBills from "../components/common/SearchBills";
import BillsSuggestionsTable from "../components/Tables/BillsSuggestionsTable";
import SelectedBillsTable from "../components/Tables/SelectedBillsTable";
import { useDispatch, useSelector } from "react-redux";
import { addBills } from "../components/redux/finalBillsSlice";

const BillsSelectionPage = () => {
  const header = "שקיפות בכנסת";
  const hint =
    "שירות זה נועד כדי לספק לציבור בישראל אפשרות להשוות בין דעותיהם הפוליטיות להצבעות חברי כנסת ישראל";
  const selectedBills = useSelector((state) => state.selectedBills);
  const dispatch = useDispatch();

  const loadAllBillsHandler = () => {
    dispatch(addBills(selectedBills));
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
            <BillsSuggestionsTable />
          </BillsTableWrapper>
          <ArrowBox>
            <LoadSelectedBillsButton onClick={loadAllBillsHandler}>
              טען הכל
            </LoadSelectedBillsButton>
          </ArrowBox>
          <BillsTableWrapper>
            <div>הצבעות שנבחרו</div>
            <SelectedBillsTable />
          </BillsTableWrapper>
        </BillsTablesContainer>
      </FormContainer>
    </BillsSelectionWrapper>
  );
};

export default BillsSelectionPage;
