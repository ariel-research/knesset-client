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
import LeftArrow from "../assets/LeftArrow";
import { tableFlags } from "../assets/consts";
import { useNavigate } from "react-router-dom";
import { getVotesScore } from "../utils/apiUtils";
import { updateResults } from "../components/redux/compassResultsSlice";

const BillsSelectionPage = () => {
  const prefix = "bills_selection_page";
  const header = "שקיפות בכנסת";
  const hint =
    "שירות זה נועד כדי לספק לציבור בישראל אפשרות להשוות בין דעותיהם הפוליטיות להצבעות חברי כנסת ישראל";
  const selectedBills = useSelector((state) => state.selectedBills);
  const finalBills = useSelector((state) => state.finalBills);
  const results = useSelector((state) => state.CompassResults);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loadAllBillsHandler = () => {
    dispatch(addBills(selectedBills));
  };

  const onFindMatchesButtonHandler = () => {
    navigate("/results");
  };

  return (
    <BillsSelectionWrapper>
      <HeadersWrapper>
        <Header id={`${prefix}-header`}>{header}</Header>
        <Hint id={`${prefix}-hint`}>{hint}</Hint>
        <SearchBills />
      </HeadersWrapper>
      <FormContainer>
        <BillsTablesContainer>
          <BillsTableWrapper>
            <TableDescription id={`${prefix}-possible_votes`}>
              הצבעות אפשריות
            </TableDescription>
            <BillsTable
              prefix="possible_bills"
              data={selectedBills}
              action={tableFlags.REMOVE_ROW}
            />
          </BillsTableWrapper>
          <ArrowBox>
            <LoadSelectedBillsButton
              id={`${prefix}-load_votes_button`}
              onClick={loadAllBillsHandler}
            >
              טען הכל
            </LoadSelectedBillsButton>
            <LeftArrow prefix={prefix} />
          </ArrowBox>
          <BillsTableWrapper>
            <TableDescription id={`${prefix}-selected_votes`}>
              הצבעות שנבחרו
            </TableDescription>
            <BillsTable
              prefix="selected_bills"
              data={finalBills}
              action={tableFlags.VOTE_ROW}
            />
          </BillsTableWrapper>
        </BillsTablesContainer>
        <button
          id={`${prefix}-search_button`}
          onClick={onFindMatchesButtonHandler}
          disabled={finalBills.length ? false : true}
        >
          מצא התאמות
        </button>
        <button
          onClick={() => {
            console.log(results);
          }}
        >
          ss
        </button>
      </FormContainer>
    </BillsSelectionWrapper>
  );
};

export default BillsSelectionPage;
