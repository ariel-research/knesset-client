import { useEffect } from "react";
import ScoreGraph from "../components/CompassResultsPage/ScoreGraph";
import VoteTable from "../components/Tables/VotesTable";
import {
  CompassResWrapper,
  DataContainer,
  ScoreGraphContainer,
  VotesTableWrapper,
} from "./CompassResultsPage.styled";
import { useSelector } from "react-redux";
import { useState } from "react";
import { getVotesScore } from "../utils/apiUtils";

const CompassResultsPage = () => {
  const [data, setData] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [filterValue, setFilterValue] = useState();
  const finalBills = useSelector((state) => state.finalBills);

  const parseData = (rawData) => {
    if (rawData) {
      const parsed = [];
      const parsedGraphData = [];
      const res = [...rawData.batch];
      console.log(res);
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
              graded: voter.graded,
            });
          }
          parsed.push({
            ...ans,
            km_name: voter.voter_name,
            km_vote: voter.ballot,
          });
        });
      });
      setGraphData(parsedGraphData);
      return parsed;
    }
  };

  const onKnessetMemberFilterHandler = () => {
    console.log(data);
    const filtered = data.filter(
      (suggestion) =>
        suggestion.label.toLowerCase().indexOf(filterValue.toLowerCase()) > -1
    );
    if (filterValue) {
      //sort by prefix
      filtered.sort((a, b) => {
        if (parseInt(a.id) > parseInt(b.id)) {
          return -1;
        } else {
          return 1;
        }
      });
      setData(filtered);
    } else {
      setData(originalData);
    }
  };

  useEffect(() => {
    let bill_id = "";
    const user_votes = [];
    finalBills.forEach((bill) => {
      bill_id = bill_id.concat(", ", bill.id);
      user_votes.push(parseInt(bill.vote) === 1 ? true : false);
    });
    const body = {
      bill_id: bill_id,
      user_votes: user_votes,
    };
    getVotesScore(body)
      .then((res) => {
        const ans = parseData(res.data);
        setData(ans);
        setOriginalData(ans);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [finalBills]);

  return (
    <CompassResWrapper>
      <h1>תוצאות</h1>
      <DataContainer>
        <ScoreGraphContainer>
          <ScoreGraph data={graphData} />
        </ScoreGraphContainer>
        <VotesTableWrapper>
          <input
            onChange={(e) => {
              setFilterValue(e.target.value);
            }}
            placeholder="חפש הצבעות של חבר כנסת"
          />
          <button onClick={onKnessetMemberFilterHandler}>חפש</button>
          <VoteTable data={data} />
        </VotesTableWrapper>
      </DataContainer>
    </CompassResWrapper>
  );
};

export default CompassResultsPage;
