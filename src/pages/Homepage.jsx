import Table from "../components/Table/Table";
import SearchBills from "../components/BillsSelectionPage/SearchBills";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LandingScreen from "../components/common/LandingScreen";
import Loader from "../components/common/Loader";
import { ActionButton, HeadersWrapper, HintsWrapper, HomepageWrapper, StyledHint, TableWrapper } from "./Homepage.styled";
import { useNavigate } from "react-router-dom";
import { getVotesScore } from "../utils/apiUtils";
import { updateResults } from "../components/redux/compassResultsSlice";

const Homepage = () => {
  const tableHeaders = ['', 'נושא ההצבעה', 'תאריך'];
  const hint = 'מחפשים הצעות חוק מהמאגר על פי מספר כנסת או חיפוש חופשי, לכל חוק מצביעים על פי דעתכם וממשיכים לדף תוצאות המשקף את חברי הכנסת הדומים לכם בדעתכם.';
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const selectedBills = useSelector((state) => state.selectedBills);
  const navigate = useNavigate();

  const onFindMatchesButtonHandler = () => {
    const user_votes = [];
    const bill_ids = [];
    selectedBills.forEach((bill) => {
      bill_ids.push(bill.id);
      const vote = bill.vote ? bill.vote : 3; //if user didn't vote - vote neutral
      user_votes.push(vote);
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
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <HomepageWrapper>
      <LandingScreen />
      <HeadersWrapper>
        <HintsWrapper>
          <StyledHint>{hint}</StyledHint>
        </HintsWrapper>
        <SearchBills setIsLoading={setIsLoading} />
      </HeadersWrapper>
      <ActionButton disabled={!selectedBills.length} onClick={onFindMatchesButtonHandler}>מצא התאמות</ActionButton>
      {isLoading && <Loader />}
      <TableWrapper loadingState={isLoading}>
        <Table headers={tableHeaders} data={selectedBills} rows={2} />
      </TableWrapper>
    </HomepageWrapper>
  )

};

export default Homepage;