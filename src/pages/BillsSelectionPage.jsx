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
  StyledButton,
} from "./BillsSelection.styled";
import SearchBills from "../components/common/SearchBills";
import BillsTable from "../components/Tables/BillsTable";
import { useDispatch, useSelector } from "react-redux";
import { addBills } from "../components/redux/finalBillsSlice";
import LeftArrow from "../assets/svg-icons/LeftArrow";
import { tableFlags } from "../assets/consts";
import { useNavigate } from "react-router-dom";
import { getVotesScore } from "../utils/apiUtils";
import { updateResults } from "../components/redux/compassResultsSlice";
import TooltipInfo from "../components/common/TooltipInfo";
import { useState } from "react";
import Loader from "../components/common/Loader";

const BillsSelectionPage = () => {
  const prefix = "bills_selection_page";
  const header = "שקיפות בכנסת";
  const hint =
    "שירות זה נועד כדי לספק לציבור בישראל אפשרות להשוות בין דעותיהם הפוליטיות להצבעות חברי כנסת ישראל";
  const possibleTableContent = "הצבעות אפשריות";
  const possibleTableInfo =
    "יש לבחור את הצעות החוק הרלוונטיות מבין כל ההצעות שחופשו";
  const finalTableContent = "הצבעות שנבחרו";
  const finalTableInfo =
    "יש להצביע עבור כל הצעת חוק שנבחרה על מנת להשוות עם הצבעות חברי הכנסת";
  const [isLoading, setIsLoading] = useState(false);
  const selectedBills = useSelector((state) => state.selectedBills);
  const finalBills = useSelector((state) => state.finalBills);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loadAllBillsHandler = () => {
    dispatch(addBills(selectedBills));
  };

  const onFindMatchesButtonHandler = () => {
    const user_votes = [];
    const bill_ids = [];
    finalBills.forEach((bill) => {
      user_votes.push(bill.vote === 1 ? true : false);
      bill_ids.push(bill.id);
    });
    const body = {
      bill_ids: bill_ids,
      user_votes: user_votes,
    };
    setIsLoading(true);
    getVotesScore(body)
      .then((res) => {
        dispatch(updateResults(res.data));
        navigate("/results");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <BillsSelectionWrapper>
      <HeadersWrapper>
        <Header id={`${prefix}-header`}>{header}</Header>
        <Hint id={`${prefix}-hint`}>{hint}</Hint>
        <SearchBills setIsLoading={setIsLoading} />
      </HeadersWrapper>
      {isLoading && <Loader />}
      <FormContainer isLoading={isLoading}>
        <BillsTablesContainer>
          <BillsTableWrapper>
            <TableDescription id={`${prefix}-possible_votes`}>
              <TooltipInfo info={possibleTableInfo} />
              {possibleTableContent}
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
              disabled={selectedBills.length ? false : true}
            >
              טען הכל
            </LoadSelectedBillsButton>
            <LeftArrow prefix={prefix} />
          </ArrowBox>
          <BillsTableWrapper>
            <TableDescription id={`${prefix}-selected_votes`}>
              <TooltipInfo info={finalTableInfo} />
              {finalTableContent}
            </TableDescription>
            <BillsTable
              prefix="selected_bills"
              data={finalBills}
              action={tableFlags.VOTE_ROW}
            />
          </BillsTableWrapper>
        </BillsTablesContainer>
        <StyledButton
          id={`${prefix}-search_button`}
          onClick={onFindMatchesButtonHandler}
          disabled={finalBills.length ? false : true}
        >
          מצא התאמות
        </StyledButton>
      </FormContainer>
    </BillsSelectionWrapper>
  );
};

export default BillsSelectionPage;
