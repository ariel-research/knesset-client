/**
 * VirtualizedBillsTable.jsx
 *
 * Drop-in replacement for Table.jsx that uses react-window's FixedSizeList to
 * render only the rows currently visible in the viewport — regardless of how
 * many rows are in `data`.
 *
 * Optional infinite-scroll props:
 *   sentinelRef  — attach to the sentinel div rendered below the list
 *   hasMore      — whether more pages exist (controls sentinel visibility)
 *   loading      — shows a loading indicator at the bottom
 *
 * All other props are identical to Table.jsx: { data, removeBill }
 */

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { FixedSizeList } from "react-window";
import styled from "styled-components";
import UserVoteBox from "../common/UserVoteBox";
import { ArrowButton } from "../common/Arrows";

// ─── Layout constants ─────────────────────────────────────────────────────────

const ROW_HEIGHT = 72;         // px — fixed row height for FixedSizeList
const TABLE_HEIGHT = 480;      // px — visible scrollport height
const COL = {
  date:       "0 0 110px",
  knesset:    "0 0 80px",
  name:       "1 1 0",
  link:       "0 0 60px",
  vote:       "0 0 140px",
};

// ─── Styled components ────────────────────────────────────────────────────────

const Wrapper = styled.div`
  direction: rtl;
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e2e8f2;
  box-shadow: 0 4px 16px rgba(0,0,0,.08);
  overflow: hidden;
`;

const HeaderRow = styled.div`
  display: flex;
  width: 100%;
  background: #f8fafc;
  border-bottom: 2px solid #e2e8f2;
  direction: rtl;
`;

const HeaderCell = styled.div`
  padding: 0.75rem 1rem;
  font-size: 0.76rem;
  font-weight: 700;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  display: flex;
  align-items: center;
  flex: ${({ flex }) => flex};
  justify-content: ${({ center }) => (center ? "center" : "flex-start")};
`;

const Row = styled.div`
  display: flex;
  width: 100%;
  direction: rtl;
  align-items: flex-start;
  border-bottom: 1px solid #f1f5f9;
  transition: background 0.12s;
  background: ${({ even }) => (even ? "#fafbff" : "#ffffff")};
  &:hover { background: #f0f4ff; }
  box-sizing: border-box;
`;

const Cell = styled.div`
  padding: 0 1rem;
  font-size: 0.93rem;
  color: #1b2a45;
  display: flex;
  align-items: center;
  flex: ${({ flex }) => flex};
  justify-content: ${({ center }) => (center ? "center" : "flex-start")};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const DateCell = styled(Cell)`
  color: #64748b;
  font-size: 0.85rem;
  flex: ${COL.date};
`;

const NameCell = styled(Cell)`
  font-weight: 500;
  flex: ${COL.name};
  white-space: normal;
  overflow: visible;
  text-overflow: unset;
  word-break: break-word;
  line-height: 1.4;
  align-items: flex-start;
  padding-top: 6px;
  padding-bottom: 6px;
`;

const ListOuter = styled.div`
  &::-webkit-scrollbar { width: 5px; }
  &::-webkit-scrollbar-thumb { background: #dde3f0; border-radius: 4px; }
  &::-webkit-scrollbar-track { background: transparent; }
`;

const Sentinel = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
  font-size: 0.8rem;
`;

// ─── Row renderer (memoised to avoid full-list re-render on scroll) ───────────

const BillRow = ({ index, style, data }) => {
  const { sortedBills, removeBill } = data;
  const bill = sortedBills[index];

  return (
    <Row style={style} even={index % 2 === 0}>
      <DateCell flex={COL.date}>
        {bill.date ? new Date(bill.date).toLocaleDateString("he-IL") : "—"}
      </DateCell>

      <Cell flex={COL.knesset}>
        <span style={{
          background: "#eff6ff", color: "#2563eb",
          padding: "2px 7px", borderRadius: "4px",
          fontSize: "0.73rem", fontWeight: 700,
        }}>
          {bill.knessetNum}
        </span>
      </Cell>

      <NameCell flex={COL.name} title={bill.label}>
        {bill.label}
      </NameCell>

      <Cell flex={COL.link} center>
        {bill.link && (
          <a
            href={bill.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              width: 28, height: 28, borderRadius: 7,
              background: "#f1f5fb", border: "1px solid #e2e8f2",
              color: "#64748b", textDecoration: "none",
            }}
            onMouseOver={(e) => { e.currentTarget.style.background = "#1b2a45"; e.currentTarget.style.color = "#fff"; }}
            onMouseOut={(e) => { e.currentTarget.style.background = "#f1f5fb"; e.currentTarget.style.color = "#64748b"; }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </a>
        )}
      </Cell>

      <Cell flex={COL.vote} center>
        <UserVoteBox bill={bill} removeBillButton={removeBill[0]} />
      </Cell>
    </Row>
  );
};

// ─── Main component ───────────────────────────────────────────────────────────

const VirtualizedBillsTable = ({
  data,
  removeBill,
  onLoadMore = null,
  hasMore = false,
  loading = false,
  noSort = false,
}) => {
  const [sortField, setSortField] = useState("date");
  const [sortDirection, setSortDirection] = useState("desc");
  const [visibleStop, setVisibleStop] = useState(-1);
  const onLoadMoreRef = useRef(onLoadMore);
  useEffect(() => { onLoadMoreRef.current = onLoadMore; });

  const sortedBills = useMemo(() => {
    if (noSort) return [...data];
    return [...data].sort((a, b) => {
      if (sortField === "date") {
        const da = new Date(a.date);
        const db = new Date(b.date);
        return sortDirection === "asc" ? da - db : db - da;
      }
      if (sortField === "label") {
        return sortDirection === "asc"
          ? a.label.localeCompare(b.label)
          : b.label.localeCompare(a.label);
      }
      return 0;
    });
  }, [data, sortField, sortDirection]);

  // Trigger load when loading finishes and user is near the bottom.
  // onItemsRendered alone misses this because FixedSizeList doesn't re-fire
  // after a prop change (e.g. loading → false) with no scroll event.
  useEffect(() => {
    if (onLoadMoreRef.current && hasMore && !loading && visibleStop >= sortedBills.length - 10) {
      onLoadMoreRef.current();
    }
  }, [loading, hasMore, visibleStop, sortedBills.length]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSort = useCallback((field, direction) => {
    setSortField(field);
    setSortDirection(direction);
  }, []);

  // Stable item data reference — prevents FixedSizeList from re-rendering every row
  const itemData = useMemo(
    () => ({ sortedBills, removeBill }),
    [sortedBills, removeBill]
  );

  const renderSortButtons = (field) => (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginRight: 4 }}>
      <ArrowButton direction="up"   active={sortField === field && sortDirection === "asc"}  onClick={() => handleSort(field, "asc")} />
      <ArrowButton direction="down" active={sortField === field && sortDirection === "desc"} onClick={() => handleSort(field, "desc")} />
    </div>
  );

  return (
    <Wrapper>
      {/* Sticky header */}
      <HeaderRow>
        <HeaderCell flex={COL.date}>
          תאריך {!noSort && renderSortButtons("date")}
        </HeaderCell>
        <HeaderCell flex={COL.knesset}>מספר כנסת</HeaderCell>
        <HeaderCell flex={COL.name}>
          שם הצעת חוק {!noSort && renderSortButtons("label")}
        </HeaderCell>
        <HeaderCell flex={COL.link} center>קישור</HeaderCell>
        <HeaderCell flex={COL.vote} center>הצבעתך</HeaderCell>
      </HeaderRow>

      {/* Virtualized body — only visible rows are in the DOM */}
      <FixedSizeList
        outerElementType={ListOuter}
        height={TABLE_HEIGHT}
        itemCount={sortedBills.length}
        itemSize={ROW_HEIGHT}
        itemData={itemData}
        width="100%"
        onItemsRendered={({ visibleStopIndex }) => setVisibleStop(visibleStopIndex)}
      >
        {BillRow}
      </FixedSizeList>

      <Sentinel>
        {loading ? "טוען..." : !hasMore ? "הכל נטען ✓" : ""}
      </Sentinel>
    </Wrapper>
  );
};

export default VirtualizedBillsTable;
