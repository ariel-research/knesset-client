import VoteTable from "../components/Tables/VotesTable";
import {
  CompassResWrapper,
  DataContainer,
  GradesWrapper,
  ProgressVoterName,
  VoterGradeWrapper,
  VotesTableWrapper,
} from "./CompassResultsPage.styled";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import ProgressBar from "../components/common/ProgressBar";
import VotesTableFilterActions from "../components/CompassResultsPage/VotesTableFilterActions";
import { useNavigate } from "react-router-dom";

const CompassResultsPage = () => {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [selectedKnessetMember, setSelectedKnessetMember] = useState();
  const [voteFilter, setVoteFilter] = useState(0);
  const [allKnessetMembers, setAllKnessetMembers] = useState([]);
  const [gradesData, setGradesData] = useState([{ km_name: "", grade: 0 }]);
  const [gradesFilteredData, setGradesFilteredData] = useState([
    { km_name: "", grade: 0 },
  ]);
  const compassResults = useSelector((state) => state.compassResults);
  const navigate = useNavigate();



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

  const filterGrades = (membersToShow) => {
    const res = [];
    membersToShow.forEach((el) => {
      const index = gradesData.findIndex(
        (record) => record.km_name === el.km_name
      );
      // if the data should be filtered
      if (index !== -1) {
        res.push(gradesData[index]);
      }
    });
    setGradesFilteredData(res);
  };

  const onKnessetMemberFilterChange = () => {
    const filteredKnessetMember = KnessetMemberFilter();
    const filtered = VoteFilter(filteredKnessetMember);
    filterGrades(filtered);
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
    const sortedData = gradesFilteredData.sort(
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
    if (!compassResults.length) {
      navigate("/");
    }
    const parsed = [];
    const gradedDataParsed = [];
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
        });
        const index = gradedDataParsed.findIndex(
          (km) => km.km_name === voter.voter_name
        );
        if (index === -1) {
          gradedDataParsed.push({
            km_name: voter.voter_name,
            grade: voter.graded,
          });
        }
      });
    });
    const all_km = parsed.filter((object, index, self) => {
      return index === self.findIndex((o) => o.km_name === object.km_name);
    });
    setGradesData(gradedDataParsed);
    setGradesFilteredData(gradedDataParsed);
    setAllKnessetMembers(all_km.map((bill) => bill.km_name).sort());
    setData(parsed);
    setOriginalData(parsed);
  }, []);

  return (
    <CompassResWrapper>
      <h1>תוצאות</h1>
      <DataContainer>
        <GradesWrapper>{renderVotersGrade()}</GradesWrapper>
        <VotesTableWrapper>
          <VotesTableFilterActions
            selectedKnessetMember={selectedKnessetMember}
            allKnessetMembers={allKnessetMembers}
            onKnessetMemberFilterChange={onKnessetMemberFilterChange}
            onKnessetMemberSelectHandler={onKnessetMemberSelectHandler}
            onVoteSelectHandler={onVoteSelectHandler}
            voteFilter={voteFilter}
          />
          <VoteTable data={data} />
        </VotesTableWrapper>
      </DataContainer>
    </CompassResWrapper>
  );
};

export default CompassResultsPage;
