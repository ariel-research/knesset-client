import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { ThumbUpIcon, ThumbDownIcon, NeutralIcon } from "../common/Thumbs";

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
  const userBillsSelection = useSelector((state) => state.selectedBills);

  useEffect(() => {
    if (userBillsSelection) setUserVotes([...userBillsSelection]);
  }, [userBillsSelection]);

  return (
    <TableWrap>
      <THead>
        <TH style={{ flex: "0 0 160px" }}>שם ח"כ</TH>
        <TH style={{ flex: "0 0 110px" }}>הצבעת ח"כ</TH>
        <TH style={{ flex: "0 0 100px" }}>הצבעתך</TH>
        <TH style={{ flex: 1 }}>הצעת חוק</TH>
      </THead>
      <TBody>
        {data && data.map(({ id, label, km_name, km_vote }, i) => {
          const user_vote = userVotes.find((b) => b.id === id);
          return (
            <TRow key={i}>
              <TD style={{ flex: "0 0 160px", fontWeight: 600 }}>{km_name}</TD>
              <TD style={{ flex: "0 0 110px" }}><VotePill vote={km_vote} /></TD>
              <TD style={{ flex: "0 0 100px" }}><VotePill vote={user_vote?.vote} /></TD>
              <TD style={{ flex: 1 }}>{label}</TD>
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
`;

const TBody = styled.div`
  max-height: 460px;
  overflow-y: auto;

  &::-webkit-scrollbar { width: 5px; }
  &::-webkit-scrollbar-thumb { background: #dde3f0; border-radius: 4px; }
`;

const TRow = styled.div`
  display: flex;
  padding: 0.82rem 1rem;
  border-bottom: 1px solid #f1f5f9;
  align-items: flex-start;
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
