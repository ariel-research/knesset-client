import VoteTable from "../components/Tables/VotesTable";
import {
  CompassResWrapper,
  DataContainer,
  FilterActionsContainer,
  FilterButton,
  FilterFieldsWrapper,
  GradesWrapper,
  OptionMemberKnesset,
  OptionVote,
  ProgressVoterName,
  SelectMemberKnesset,
  VoterGradeWrapper,
  VotesTableWrapper,
} from "./CompassResultsPage.styled";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useCallback } from "react";
import ProgressBar from "../components/common/ProgressBar";

const CompassResultsPage = () => {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [selectedKnessetMember, setSelectedKnessetMember] = useState();
  const [voteFilter, setVoteFilter] = useState(0);
  const [allKnessetMembers, setAllKnessetMembers] = useState([]);
  const compassResults = useSelector((state) => state.compassResults);

  const parseData = useCallback(() => {
    if (compassResults) {
      const parsed = [];
      const res = [...compassResults];
      res.forEach((record) => {
        const ans = {
          id: parseInt(record.bill_id),
          label: record.bill_name,
        };

        record.voters.forEach((voter) => {
          parsed.push({
            ...ans,
            km_name: voter.voter_name,
            km_vote: voter.ballot,
            grade: voter.graded,
          });
        });
      });
      const all_km = parsed.filter((object, index, self) => {
        return index === self.findIndex((o) => o.km_name === object.km_name);
      });
      setAllKnessetMembers(all_km.map((bill) => bill.km_name).sort());
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

  const renderVotersGrade = () => {
    const sortedData = data.sort(
      (a, b) => parseInt(b.grade) - parseInt(a.grade)
    );
    const satBar = [];
    sortedData.forEach((el, i) => {
      satBar.push(
        <VoterGradeWrapper key={i}>
          <ProgressBar done={el.grade.toFixed(0)} />
          <ProgressVoterName>{el.km_name}</ProgressVoterName>
        </VoterGradeWrapper>
      );
    });
    return satBar;
  };

  useEffect(() => {
    parseData();
  }, [parseData]);

  return (
    <CompassResWrapper>
      <h1>תוצאות</h1>
      <DataContainer>
        <GradesWrapper>{renderVotersGrade()}</GradesWrapper>
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
