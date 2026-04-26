import Table from "../components/Table/Table";
import SearchBills from "../components/BillsSelectionPage/SearchBills";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LandingScreen from "../components/common/LandingScreen";
import Loader from "../components/common/Loader";
import CompassResultsPage from "./CompassResultsPage";
import {
  HomepageWrapper, PageContent,
  Hero, HeroTag, HeroTitle, HeroBody,
  StatsRow, StatPill,
  TabsWrapper, TabButton, TabCount,
  TableWrapper, EmptyMatchesMessage,
} from "./Homepage.styled";
import { getVotesScore } from "../utils/apiUtils";
import { updateResults } from "../components/redux/compassResultsSlice";

const Homepage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  const dispatch = useDispatch();
  const selectedBills = useSelector((state) => state.selectedBills);
  const displayedBills = useSelector((state) => state.displayedBills);

  const onFindMatchesButtonHandler = () => {
    const bill_ids = [];
    const user_votes = [];
    selectedBills.forEach((bill) => {
      bill_ids.push(bill.id);
      user_votes.push(bill.vote || 3);
    });
    setIsLoading(true);
    getVotesScore({ bill_ids, user_votes })
      .then((res) => dispatch(updateResults(res.data)))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  const getUnvotedBills = () => {
    const selectedIds = selectedBills.map((b) => b.id);
    return displayedBills.filter((b) => !selectedIds.includes(b.id));
  };

  const renderTable = () => {
    if (activeTab === "all")     return <Table data={displayedBills} removeBill={[false]} />;
    if (activeTab === "voted")   return <Table data={selectedBills}  removeBill={[true]} />;
    if (activeTab === "unvoted") return <Table data={getUnvotedBills()} removeBill={[false]} />;
    if (activeTab === "matches") {
      if (!selectedBills.length)
        return <EmptyMatchesMessage>יש להצביע לחוק אחד לפחות על מנת לראות התאמות</EmptyMatchesMessage>;
      return <CompassResultsPage />;
    }
  };

  useEffect(() => {
    if (activeTab === "matches" && selectedBills.length) onFindMatchesButtonHandler();
  }, [activeTab, selectedBills]);

  useEffect(() => {
    localStorage.setItem("selectedBills", JSON.stringify(selectedBills));
  }, [selectedBills]);

  return (
    <HomepageWrapper>
      <LandingScreen />

      <PageContent>
        {/* Hero */}
        <Hero>
          <HeroTag>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
            </svg>
            נתונים רשמיים מהכנסת
          </HeroTag>
          <HeroTitle>גלה אילו ח"כים<br/><em>מייצגים אותך</em></HeroTitle>
          <HeroBody>הצבע על הצעות החוק שחשובות לך, וגלה עד כמה כל חבר כנסת הולך בקנה אחד עם עמדותיך.</HeroBody>
        </Hero>

        {/* Search */}
        <SearchBills setIsLoading={setIsLoading} />

        {/* Stats */}
        <StatsRow>
          <StatPill>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
            </svg>
            <strong>{displayedBills.length}</strong> הצעות חוק
          </StatPill>
          <StatPill>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
            </svg>
            <strong>147</strong> חברי כנסת
          </StatPill>
          <StatPill>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
            </svg>
            <strong>{selectedBills.length}</strong> הצבעות שלי
          </StatPill>
        </StatsRow>

        {/* Tabs */}
        <TabsWrapper>
          <TabButton isActive={activeTab === "all"} onClick={() => setActiveTab("all")}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/>
              <line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/>
              <line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
            </svg>
            כל ההצעות
          </TabButton>
          <TabButton isActive={activeTab === "voted"} onClick={() => setActiveTab("voted")}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            הצבעתי
            {selectedBills.length > 0 && <TabCount>{selectedBills.length}</TabCount>}
          </TabButton>
          <TabButton isActive={activeTab === "unvoted"} onClick={() => setActiveTab("unvoted")}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
            לא הצבעתי
            <TabCount muted>{getUnvotedBills().length}</TabCount>
          </TabButton>
          <TabButton isActive={activeTab === "matches"} onClick={() => setActiveTab("matches")}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            התאמות
          </TabButton>
        </TabsWrapper>

        {/* Content */}
        {isLoading ? <Loader /> : (
          <TableWrapper>
            {renderTable()}
          </TableWrapper>
        )}
      </PageContent>
    </HomepageWrapper>
  );
};

export default Homepage;
