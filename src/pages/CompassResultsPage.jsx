import ScoreGraph from "../components/CompassResultsPage/ScoreGraph";
import VoteTable from "../components/Tables/VotesTable";
import {
  Card,
  CardsContainer,
  CompassResWrapper,
  DataContainer,
  ScoreGraphContainer,
  VotesTableWrapper,
} from "./CompassResultsPage.styled";

const CompassResultsPage = () => {
  return (
    <CompassResWrapper>
      <CardsContainer>
        <Card>:חבר הכנסת התואם ביותר</Card>
        <Card>:חבר הכנסת השונה ביותר</Card>
      </CardsContainer>
      <DataContainer>
        <input placeholder="חפש הצבעות של חבר כנסת"></input>
        <VotesTableWrapper>
          <VoteTable />
        </VotesTableWrapper>
        <ScoreGraphContainer>
          <ScoreGraph />
        </ScoreGraphContainer>
      </DataContainer>
    </CompassResWrapper>
  );
};

export default CompassResultsPage;
