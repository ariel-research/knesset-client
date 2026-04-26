import { useSelector } from "react-redux";
import { useEffect, useState, useMemo } from "react";
import styled from "styled-components";
import { ThumbUpIcon, ThumbDownIcon, NeutralIcon } from "../common/Thumbs";
import { ArrowButton } from "../common/Arrows";

const voteConfig = {
  1: { label: "בעד",  bg: "#eef2ff", color: "#4f46e5", border: "#c7d2fe", Icon: ThumbUpIcon },
  2: { label: "נגד",  bg: "#fff1f2", color: "#e11d48", border: "#fecdd3", Icon: ThumbDownIcon },
  3: { label: "נמנע", bg: "#fffbeb", color: "#d97706", border: "#fde68a", Icon: NeutralIcon },
};

const VotePill = ({ vote }) => {
  const cfg = voteConfig[vote];
  if (!cfg) return null;
  const { label, bg, color, border, Icon } = cfg;
  return (
    <Pill style={{ background: bg, color, borderColor: border }}>
      <Icon size={12} color={color} />
      {label}
    </Pill>
  );
};

const VoteTable = ({ data }) => {
  const [userVotes, setUserVotes] = useState([]);
  const [sortField, setSortField] = useState("label");
  const [sortDirection, setSortDirection] = useState("asc");
  const userBillsSelection = useSelector((state) => state.selectedBills);

  useEffect(() => {
    if (userBillsSelection) setUserVotes([...userBillsSelection]);
  }, [userBillsSelection]);

  const sortedData = useMemo(() => {
    if (!data) return [];
    if (!sortField) return data;
    return [...data].sort((a, b) => {
      if (sortField === "date") {
        const da = a.date ? new Date(a.date) : 0;
        const db = b.date ? new Date(b.date) : 0;
        return sortDirection === "asc" ? da - db : db - da;
      }
      const aVal = sortField === "km_name" ? (a.km_name || "") : (a.label || "");
      const bVal = sortField === "km_name" ? (b.km_name || "") : (b.label || "");
      return sortDirection === "asc"
        ? aVal.localeCompare(bVal, "he")
        : bVal.localeCompare(aVal, "he");
    });
  }, [data, sortField, sortDirection]);

  const handleSort = (field, direction) => {
    setSortField(field);
    setSortDirection(direction);
  };

  const renderSortButtons = (field) => (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginRight: 4 }}>
      <ArrowButton direction="up" active={sortField === field && sortDirection === "asc"} onClick={() => handleSort(field, "asc")} />
      <ArrowButton direction="down" active={sortField === field && sortDirection === "desc"} onClick={() => handleSort(field, "desc")} />
    </div>
  );

  return (
    <TableWrap>
      <THead>
        <TH style={{ flex: "0 0 150px", display: "flex", alignItems: "center" }}>
          שם ח"כ
          {renderSortButtons("km_name")}
        </TH>
        <TH style={{ flex: 1, display: "flex", alignItems: "center" }}>
          הצעת חוק
          {renderSortButtons("label")}
        </TH>
        <TH style={{ flex: "0 0 106px", display: "flex", alignItems: "center" }}>
          תאריך
          {renderSortButtons("date")}
        </TH>
        <TH style={{ flex: "0 0 52px", textAlign: "center" }}>קישור</TH>
        <TH style={{ flex: "0 0 110px" }}>הצבעת ח"כ</TH>
        <TH style={{ flex: "0 0 100px" }}>הצבעתך</TH>
      </THead>
      <TBody>
        {sortedData.map(({ id, label, km_name, km_vote, link, date }, i) => {
          const user_vote = userVotes.find((b) => b.id === id);
          return (
            <TRow key={i}>
              <TD style={{ flex: "0 0 150px", fontWeight: 600 }}>{km_name}</TD>
              <TD style={{ flex: 1, wordBreak: "break-word", lineHeight: 1.4, alignItems: "flex-start", paddingTop: "4px", paddingBottom: "4px" }}>{label}</TD>
              <TD style={{ flex: "0 0 106px", color: "#64748b", fontSize: "0.85rem" }}>
                {date ? new Date(date).toLocaleDateString("he-IL") : "—"}
              </TD>
              <TD style={{ flex: "0 0 52px", justifyContent: "center" }}>
                {link && (
                  <LinkBtn href={link} target="_blank" rel="noopener noreferrer" title="פתח קישור">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                      <polyline points="15 3 21 3 21 9"/>
                      <line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                  </LinkBtn>
                )}
              </TD>
              <TD style={{ flex: "0 0 110px" }}><VotePill vote={km_vote} /></TD>
              <TD style={{ flex: "0 0 100px" }}><VotePill vote={user_vote?.vote} /></TD>
            </TRow>
          );
        })}
      </TBody>
    </TableWrap>
  );
};

export default VoteTable;

const TableWrap = styled.div`
  width: 100%;
  min-width: 480px;
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  overflow-x: auto;
`;

const THead = styled.div`
  display: flex;
  background: #f8fafc;
  border-bottom: 2px solid #e2e8f2;
  padding: 0 1rem;
`;

const TH = styled.div`
  padding: 0.75rem 0.6rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TBody = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  direction: ltr;

  &::-webkit-scrollbar { width: 5px; }
  &::-webkit-scrollbar-thumb { background: #dde3f0; border-radius: 4px; }
`;

const TRow = styled.div`
  display: flex;
  padding: 0.82rem 1rem;
  border-bottom: 1px solid #f1f5f9;
  align-items: flex-start;
  direction: rtl;
  transition: background 0.12s;
  &:hover { background: #f8faff; }
  &:last-child { border-bottom: none; }
`;

const TD = styled.div`
  font-size: 0.92rem;
  color: #1b2a45;
  padding: 0 0.6rem;
  line-height: 1.5;
  word-break: break-word;
  display: flex;
  align-items: center;
`;

const LinkBtn = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 7px;
  background: #f1f5fb;
  border: 1px solid #e2e8f2;
  color: #64748b;
  text-decoration: none;
  transition: background 0.12s, color 0.12s;
  &:hover { background: #1b2a45; color: #fff; }
`;

const Pill = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.22rem 0.6rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 700;
  border: 1px solid transparent;
  white-space: nowrap;
`;
