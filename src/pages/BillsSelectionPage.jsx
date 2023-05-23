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
  TableDescription,
} from "./BillsSelection.styled";
import SearchBills from "../components/common/SearchBills";
import BillsTable from "../components/Tables/BillsTable";
import { useDispatch, useSelector } from "react-redux";
import { addBills } from "../components/redux/finalBillsSlice";
import { removeBill } from "../components/redux/selectedBillsSlice";

const BillsSelectionPage = () => {
  const header = "שקיפות בכנסת";
  const hint =
    "שירות זה נועד כדי לספק לציבור בישראל אפשרות להשוות בין דעותיהם הפוליטיות להצבעות חברי כנסת ישראל";
  const selectedBills = useSelector((state) => state.selectedBills);
  const finalBills = useSelector((state) => state.finalBills);
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
            <TableDescription>הצבעות אפשריות</TableDescription>
            <BillsTable data={selectedBills} action={removeBill} />
          </BillsTableWrapper>
          <ArrowBox>
            <LoadSelectedBillsButton onClick={loadAllBillsHandler}>
              טען הכל
            </LoadSelectedBillsButton>
          </ArrowBox>
          <BillsTableWrapper>
            <TableDescription>הצבעות שנבחרו</TableDescription>
            <BillsTable data={finalBills} />
          </BillsTableWrapper>
        </BillsTablesContainer>
      </FormContainer>
    </BillsSelectionWrapper>
  );
};

export default BillsSelectionPage;
