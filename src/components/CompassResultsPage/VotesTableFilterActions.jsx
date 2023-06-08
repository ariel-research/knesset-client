import { VOTES_TYPES } from "../../assets/consts";
import StyledSelect from "../common/StyledSelect";
import {
  FilterActionsContainer,
  FilterButton,
  FilterFieldsWrapper,
} from "./VotesTableFilterActions.styled";

const VotesTableFilterActions = (props) => {
  const {
    selectedKnessetMember,
    onKnessetMemberSelectHandler,
    allKnessetMembers,
    voteFilter,
    onVoteSelectHandler,
    onKnessetMemberFilterChange,
  } = props;

  return (
    <FilterFieldsWrapper>
      <FilterActionsContainer>
        <StyledSelect
          idPrefix="filter-results"
          onChangeFunc={onKnessetMemberSelectHandler}
          selectValue={selectedKnessetMember}
          optionsLabels={allKnessetMembers}
          optionsValues={allKnessetMembers}
          defaultLabel="בחר חבר כנסת"
          defaultValue="0"
        />
        <StyledSelect
          idPrefix="filter-votes"
          onChangeFunc={onVoteSelectHandler}
          selectValue={voteFilter}
          optionsLabels={Object.keys(VOTES_TYPES)}
          optionsValues={Object.values(VOTES_TYPES)}
          defaultLabel="בחר סוג הצבעה"
          defaultValue="0"
        />
      </FilterActionsContainer>
      <FilterButton onClick={onKnessetMemberFilterChange}>חפש</FilterButton>
    </FilterFieldsWrapper>
  );
};

export default VotesTableFilterActions;
