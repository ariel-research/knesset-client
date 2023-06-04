import ScoreGraph from "../components/CompassResultsPage/ScoreGraph";
import VoteTable from "../components/Tables/VotesTable";
import {
  CompassResWrapper,
  DataContainer,
  FilterButton,
  ScoreGraphContainer,
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
      setAllKnessetMembers(all_km);
      setGraphData(parsedGraphData);
      setData(parsed);
      setOriginalData(parsed);
    }
  }, [compassResults]);

  const onKnessetMemberFilterChange = () => {
    const filtered = originalData.filter(
      (suggestion) =>
        suggestion.km_name.toLowerCase() === selectedKnessetMember.toLowerCase()
    );
    if (selectedKnessetMember) {
      setData(filtered);
    } else {
      setData(originalData);
    }
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
          <select
            id="filter-results"
            value={selectedKnessetMember}
            onChange={(e) => setSelectedKnessetMember(e.target.value)}
          >
            {allKnessetMembers.map((record, index) => (
              <option
                id={`knesset-num_${index}`}
                key={`knesset-num_${index}`}
                value={record.km_name}
              >
                {record.km_name}
              </option>
            ))}
          </select>
          <FilterButton onClick={onKnessetMemberFilterChange}>חפש</FilterButton>
          <VoteTable data={data} />
        </VotesTableWrapper>
      </DataContainer>
    </CompassResWrapper>
  );
};

export default CompassResultsPage;
