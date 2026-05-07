import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import VirtualizedBillsTable from "../components/Table/VirtualizedBillsTable";
import AutoCompleteV2 from "../components/BillsSelectionPage/AutoComplete";
import Loader from "../components/common/Loader";
import StyledSelect from "../components/common/StyledSelect";
import CompassResultsPage from "./CompassResultsPage";

import useBillsFeed from "../hooks/useBillsFeed";

import { setDisplayedBills } from "../components/redux/displayedBillsSlice";
import { addMultipleBills, clearAllBills } from "../components/redux/selectedBillsSlice";
import { updateResults } from "../components/redux/compassResultsSlice";

import { getVotesScoreV2 } from "../utils/apiUtils";
import { ALL_KNESSET_NUMBERS } from "../assets/consts";

import {
  HomepageWrapper, PageContent,
  Hero, HeroTag, HeroTitle, HeroBody,
  StatsRow, StatPill,
  TabsWrapper, TabButton, TabCount,
  TableWrapper, EmptyMatchesMessage,
} from "./Homepage.styled";

// ─── Styled ───────────────────────────────────────────────────────────────────

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  direction: rtl;
  flex-wrap: wrap;
`;

const SortNote = styled.div`
  font-size: 0.78rem;
  color: #94a3b8;
  direction: rtl;
  padding: 4px 2px 0;
`;


// ─── Component ────────────────────────────────────────────────────────────────

const DEFAULT_KNESSET = Object.entries(ALL_KNESSET_NUMBERS).at(-1);

const HomepageV2 = () => {
  const [activeTab, setActiveTab]     = useState("all");
  const [isScoreLoading, setScore]    = useState(false);
  const [knessetNum, setKnessetNum]   = useState(DEFAULT_KNESSET[1]);

  const dispatch = useDispatch();
  const selectedBills = useSelector((s) => s.selectedBills);

  // ── useBillsFeed owns all data fetching ─────────────────────────────────────
  const { bills, hasMore, total, loading, error, mode, query, setQuery, loadMore } =
    useBillsFeed(knessetNum);

  // Keep Redux displayedBills in sync (needed by scores / results page)
  useEffect(() => {
    dispatch(setDisplayedBills(bills));
  }, [bills]); // eslint-disable-line react-hooks/exhaustive-deps

  // Restore votes from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("selectedBills");
    if (stored) dispatch(addMultipleBills(JSON.parse(stored)));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    localStorage.setItem("selectedBills", JSON.stringify(selectedBills));
  }, [selectedBills]);

  // ── Scores ──────────────────────────────────────────────────────────────────

  const onFindMatches = () => {
    const bill_ids   = selectedBills.map((b) => b.id);
    const user_votes = selectedBills.map((b) => b.vote || 3);
    setScore(true);
    getVotesScoreV2({ bill_ids, user_votes })
      .then((res) => dispatch(updateResults(res.data)))
      .catch(console.error)
      .finally(() => setScore(false));
  };

  useEffect(() => {
    if (activeTab === "matches" && selectedBills.length) onFindMatches();
  }, [activeTab, selectedBills]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Table data per tab ──────────────────────────────────────────────────────

  const unvoted = bills.filter((b) => !selectedBills.find((s) => s.id === b.id));

  const tableData = () => {
    if (activeTab === "all")     return bills;
    if (activeTab === "voted")   return [...selectedBills].reverse();
    if (activeTab === "unvoted") return unvoted;
    return null;
  };

  const renderContent = () => {
    if (activeTab === "matches") {
      if (!selectedBills.length)
        return <EmptyMatchesMessage>יש להצביע לחוק אחד לפחות על מנת לראות התאמות</EmptyMatchesMessage>;
      return <CompassResultsPage />;
    }
    return (
      <VirtualizedBillsTable
        data={tableData()}
        removeBill={[activeTab === "voted"]}
        onLoadMore={activeTab === "all" ? loadMore : null}
        hasMore={activeTab === "all" ? hasMore : false}
        loading={activeTab === "all" ? loading : false}
        noSort={activeTab === "voted"}
      />
    );
  };

  return (
    <HomepageWrapper>
      <PageContent>
        <Hero>
          <HeroTag>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
            </svg>
            נתונים רשמיים מהכנסת
          </HeroTag>
          <HeroTitle>גלו אילו ח"כים<br/><em>מייצגים אתכם</em></HeroTitle>
          <HeroBody>הצביעו על הצעות החוק שחשובות לכם, וגלו עד כמה כל חבר כנסת הולך בקנה אחד עם עמדותיכם.</HeroBody>
        </Hero>

        {/* Search bar */}
        <SearchBar>
          <AutoCompleteV2
            query={query}
            onQueryChange={setQuery}
            suggestions={mode === "search" ? bills.slice(0, 30) : []}
            mode={mode}
            totalResults={mode === "search" ? bills.length : 0}
            hasMoreResults={mode === "search" ? hasMore : false}
          />
          <StyledSelect
            idPrefix="knesset_num_v2_"
            onChangeFunc={(e) => setKnessetNum(e.target.value)}
            selectValue={knessetNum}
            optionsLabels={Object.keys(ALL_KNESSET_NUMBERS)}
            optionsValues={Object.values(ALL_KNESSET_NUMBERS)}
          />
        </SearchBar>

        {/* Stats */}
        <StatsRow>
          <StatPill>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
            </svg>
            <strong>{bills.length}{total != null ? `/${total}` : ""}</strong> הצעות חוק נטענו
          </StatPill>
          <StatPill>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
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
              <line x1="8" y1="18" x2="21" y2="18"/>
            </svg>
            כל התוצאות
            {total != null && (
              <TabCount muted>
                {bills.length}/{total}
              </TabCount>
            )}
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
            <TabCount muted>{unvoted.length}</TabCount>
          </TabButton>
          <TabButton isActive={activeTab === "matches"} onClick={() => setActiveTab("matches")}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            התאמות
          </TabButton>
        </TabsWrapper>

        {activeTab === "voted" && (
          <SortNote>ממוין לפי סדר ההצבעה — האחרונה תחילה</SortNote>
        )}

        {/* Content */}
        {isScoreLoading ? <Loader /> : (
          <TableWrapper>
            {error && <p style={{ color: "red", padding: "1rem" }}>{error}</p>}
            {renderContent()}
            {activeTab === "all" && loading && <Loader />}
          </TableWrapper>
        )}
      </PageContent>
    </HomepageWrapper>
  );
};

export default HomepageV2;
