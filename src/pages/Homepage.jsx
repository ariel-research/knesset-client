import Table from "../components/Table/Table";
import SearchBills from "../components/BillsSelectionPage/SearchBills";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LandingScreen from "../components/common/LandingScreen";
import Loader from "../components/common/Loader";
import { ActionButton, HeadersWrapper, HomepageWrapper, TableWrapper, TabsWrapper, TabButton } from "./Homepage.styled";
import { useNavigate } from "react-router-dom";
import { getVotesScore } from "../utils/apiUtils";
import { updateResults } from "../components/redux/compassResultsSlice";

const Homepage = () => {
  const tableHeaders = ['תאריך', 'נושא ההצבעה', 'מספר כנסת', 'הצבעת משתמש'];
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  const dispatch = useDispatch();
  const selectedBills = useSelector((state) => state.selectedBills);
  const displayedBills = useSelector((state) => state.displayedBills);
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

  const getUnvotedBills = () => {
    const selectedIds = selectedBills.map(bill => bill.id);
    return displayedBills.filter(bill => !selectedIds.includes(bill.id));
  };

  const renderTable = () => {
    if (activeTab === "all") {
      return <Table headers={tableHeaders} data={displayedBills} removeBill={[false]} />;
    } else if (activeTab === "voted") {
      return <Table headers={tableHeaders} data={selectedBills} removeBill={[true]} />;
    } else if (activeTab === "unvoted") {
      const unvotedBills = getUnvotedBills();
      return <Table headers={tableHeaders} data={unvotedBills} removeBill={[false]} />;
    }
  };

  return (
    <HomepageWrapper>
      <LandingScreen />
      <HeadersWrapper>
        <SearchBills setIsLoading={setIsLoading} />
      </HeadersWrapper>

      {isLoading && <Loader />}

      <TabsWrapper>
        <TabButton isActive={activeTab === "all"} onClick={() => setActiveTab("all")}>
          כל ההצעות
        </TabButton>
        <TabButton isActive={activeTab === "voted"} onClick={() => setActiveTab("voted")}>
          הצעות שהצבעתי להן ({selectedBills.length})
        </TabButton>
        <TabButton isActive={activeTab === "unvoted"} onClick={() => setActiveTab("unvoted")}>
          הצעות שלא הצבעתי
        </TabButton>
      </TabsWrapper>

      <TableWrapper loadingState={isLoading}>
        {renderTable()}
        <ActionButton disabled={!selectedBills.length} onClick={onFindMatchesButtonHandler}>
        מצא התאמות
      </ActionButton>
      </TableWrapper>
    </HomepageWrapper>
  );
};

export default Homepage;
