import ScoreGraph from "../components/CompassResultsPage/ScoreGraph";
import VoteTable from "../components/Tables/VotesTable";
import {
  CompassResWrapper,
  DataContainer,
  FilterActionsContainer,
  FilterButton,
  FilterFieldsWrapper,
  OptionMemberKnesset,
  OptionVote,
  ScoreGraphContainer,
  SelectMemberKnesset,
  VotesTableWrapper,
} from "./CompassResultsPage.styled";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useCallback } from "react";

const CompassResultsPage = () => {
  const [data, setData] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [selectedKnessetMember, setSelectedKnessetMember] = useState();
  const [voteFilter, setVoteFilter] = useState(0);
  const [allKnessetMembers, setAllKnessetMembers] = useState([]);
  const compassResults = useSelector((state) => state.compassResults);

  const parseData = useCallback(() => {
    if (compassResults) {
      const parsed = [];
      const parsedGraphData = [];
      const res = [...compassResults];
      res.forEach((record) => {
        const ans = {
          id: record.bill_id,
          label: record.bill_name,
        };

        record.voters.forEach((voter) => {
          const isExist = parsedGraphData.some(
            (el) => el.voter_name === voter.voter_name
          );
          if (!isExist) {
            parsedGraphData.push({
              voter_name: voter.voter_name,
              תוצאות: voter.graded,
            });
          }
          parsed.push({
            ...ans,
            km_name: voter.voter_name,
            km_vote: voter.ballot,
          });
        });
      });
      const all_km = parsed.filter((object, index, self) => {
        return index === self.findIndex((o) => o.km_name === object.km_name);
      });
      setAllKnessetMembers(all_km.map((bill) => bill.km_name).sort());
      setGraphData(parsedGraphData);
      setData(parsed);
      setOriginalData(parsed);
    }
  }, [compassResults]);

  const KnessetMemberFilter = () => {
    if (!selectedKnessetMember) {
      return originalData;
    }
    const filtered = originalData.filter(
      (suggestion) =>
        suggestion.km_name.toLowerCase() === selectedKnessetMember.toLowerCase()
    );
    return filtered;
  };

  const VoteFilter = (data) => {
    //if all votes selected - don't filter
    if (voteFilter === 0) {
      return data;
    }
    return data.filter((record) => record.km_vote === voteFilter);
  };

  const onKnessetMemberFilterChange = () => {
    const filteredKnessetMember = KnessetMemberFilter();
    const filtered = VoteFilter(filteredKnessetMember);
    setData(filtered);
  };

  const onKnessetMemberSelectHandler = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === "0") {
      setSelectedKnessetMember();
      return;
    }
    setSelectedKnessetMember(selectedValue);
  };

  const onVoteSelectHandler = (e) => {
    setVoteFilter(parseInt(e.target.value));
  };

  useEffect(() => {
    parseData();
  }, [parseData]);

  return (
    <CompassResWrapper>
      <h1>תוצאות</h1>
      <DataContainer>
        <ScoreGraphContainer>
          <ScoreGraph data={graphData} />
        </ScoreGraphContainer>
        <VotesTableWrapper>
          <FilterFieldsWrapper>
            <FilterActionsContainer>
              <SelectMemberKnesset
                id="filter-results"
                value={selectedKnessetMember}
                onChange={onKnessetMemberSelectHandler}
              >
                <OptionMemberKnesset
                  id={`knesset-member_${0}`}
                  key={`knesset-member${0}`}
                  value="0"
                >
                  חבר כנסת
                </OptionMemberKnesset>
                {allKnessetMembers.map((record, index) => (
                  <OptionMemberKnesset
                    id={`knesset-member_${index + 1}`}
                    key={`knesset-member_${index + 1}`}
                    value={record}
                  >
                    {record}
                  </OptionMemberKnesset>
                ))}
              </SelectMemberKnesset>
              <SelectMemberKnesset
                id="filter-votes"
                value={voteFilter}
                onChange={onVoteSelectHandler}
              >
                <OptionVote id={`for_vote`} value={0}>
                  כל ההצבעות
                </OptionVote>
                <OptionVote id={`for_vote`} value={1}>
                  בעד
                </OptionVote>
                <OptionVote id={`against_vote`} value={2}>
                  נגד
                </OptionVote>
                <OptionVote id={`for_vote`} value={3}>
                  נמנע
                </OptionVote>
              </SelectMemberKnesset>
            </FilterActionsContainer>
            <FilterButton onClick={onKnessetMemberFilterChange}>
              חפש
            </FilterButton>
          </FilterFieldsWrapper>
          <VoteTable data={data} />
        </VotesTableWrapper>
      </DataContainer>
    </CompassResWrapper>
  );
};

export default CompassResultsPage;
