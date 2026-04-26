import VoteTable from "../components/Tables/VotesTable";
import {
  CompassResWrapper,
  DataContainer,
  ScoresCard,
  CardHeader,
  CardIcon,
  CardTitleBlock,
  CardTitle,
  CardSub,
  ScoresList,
  ScoreRow,
  ScoreRank,
  ScoreName,
  ScoreTrack,
  ScoreFill,
  ScoreVal,
  VotesCard,
  VotesCardHeader,
  FilterRow,
  FilterLabel,
  FilterSelect,
} from "./CompassResultsPage.styled";

import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

const CompassResultsPage = () => {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [selectedKnessetMember, setSelectedKnessetMember] = useState();
  const [allKnessetMembers, setAllKnessetMembers] = useState([]);
  const [gradesData, setGradesData] = useState([]);
  const [gradesFilteredData, setGradesFilteredData] = useState([]);
  const compassResults = useSelector((state) => state.compassResults);
  const selectedBills  = useSelector((state) => state.selectedBills);

  const applyFilters = (member) => {
    let filtered = [...originalData];
    if (member) {
      filtered = filtered.filter((r) => r.km_name.toLowerCase() === member.toLowerCase());
    }

    // update scores panel to only show members in filtered view
    const seen = new Set();
    const res = [];
    filtered.forEach((el) => {
      if (seen.has(el.km_name)) return;
      const idx = gradesData.findIndex((r) => r.km_name === el.km_name);
      if (idx !== -1) { res.push(gradesData[idx]); seen.add(el.km_name); }
    });
    setGradesFilteredData(res);
    setData(filtered);
  };

  const onKnessetMemberSelectHandler = (e) => {
    const val = e.target.value;
    const member = val === "0" ? undefined : val;
    setSelectedKnessetMember(member);
    applyFilters(member);
  };

  const renderScores = () => {
    const sorted = [...gradesFilteredData].sort((a, b) => b.grade - a.grade);
    return sorted.map((el, i) => {
      const pct = el.grade?.toFixed(0);
      const isPos = el.grade >= 0;
      const barWidth = Math.max(Math.abs(pct), 3);
      return (
        <ScoreRow key={i}>
          <ScoreRank>#{i + 1}</ScoreRank>
          <ScoreName title={el.km_name}>{el.km_name}</ScoreName>
          <ScoreTrack>
            <ScoreFill positive={isPos} style={{ width: `${barWidth}%` }} />
          </ScoreTrack>
          <ScoreVal positive={isPos}>{pct}%</ScoreVal>
        </ScoreRow>
      );
    });
  };

  useEffect(() => {
    if (!compassResults.length) return;

    const parsed = [];
    const gradedDataParsed = [];

    compassResults.forEach((record) => {
      const billId = parseInt(record.bill_id);
      const link = record.bill_link ?? selectedBills.find((b) => b.id === billId)?.link ?? null;
      const ans = { id: billId, label: record.vote_name, link, date: record.vote_date ?? null };
      record.voters.forEach((voter) => {
        parsed.push({ ...ans, km_name: voter.voter_name, km_vote: voter.ballot });
        if (!gradedDataParsed.find((km) => km.km_name === voter.voter_name)) {
          gradedDataParsed.push({ km_name: voter.voter_name, grade: voter.graded });
        }
      });
    });

    const all_km = [...new Map(parsed.map((p) => [p.km_name, p])).values()];
    setGradesData(gradedDataParsed);
    setGradesFilteredData(gradedDataParsed);
    setAllKnessetMembers(all_km.map((b) => b.km_name).sort());
    setData(parsed);
    setOriginalData(parsed);
  }, [compassResults]);

  return (
    <CompassResWrapper>
      <DataContainer>
        {/* ── Scores panel ── */}
        <ScoresCard>
          <CardHeader>
            <CardIcon>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
            </CardIcon>
            <CardTitleBlock>
              <CardTitle>ציוני חברי הכנסת</CardTitle>
              <CardSub>לפי התאמה לעמדותיך</CardSub>
            </CardTitleBlock>
          </CardHeader>
          <ScoresList>{renderScores()}</ScoresList>
        </ScoresCard>

        {/* ── Votes detail panel ── */}
        <VotesCard>
          <VotesCardHeader>
            <CardIcon>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <line x1="3" y1="9" x2="21" y2="9" />
                <line x1="9" y1="21" x2="9" y2="9" />
              </svg>
            </CardIcon>
            <CardTitleBlock>
              <CardTitle>פירוט הצבעות</CardTitle>
              <CardSub>השוואה לעמדות ח"כ</CardSub>
            </CardTitleBlock>
            <FilterRow>
              <FilterLabel>ח"כ:</FilterLabel>
              <FilterSelect value={selectedKnessetMember || "0"} onChange={onKnessetMemberSelectHandler}>
                <option value="0">הכל</option>
                {allKnessetMembers.map((name) => (
                  <option key={name} value={name}>{name}</option>
                ))}
              </FilterSelect>
            </FilterRow>
          </VotesCardHeader>
          <VoteTable data={data} />
        </VotesCard>
      </DataContainer>
    </CompassResWrapper>
  );
};

export default CompassResultsPage;
