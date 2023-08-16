import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components";
import { billVote, removeBill } from "../redux/selectedBillsSlice";
import TrashIcon from "../../assets/svg-icons/TrashIcon";

const voteOptions = {
  FOR: 1,
  AGAINST: 2,
  NEUTRAL: 3,
};

const UserVoteBox = (props) => {
  const { billId } = props;
  const selectedBills = useSelector((state) => state.selectedBills);
  const [selectedValue, setSelectedValue] = useState(selectedBills[billId]?.vote || voteOptions.NEUTRAL);
  const dispatch = useDispatch();

  const onClickHandler = (vote) => {
    const newVote = selectedValue === vote ? voteOptions.NEUTRAL : vote;// in case of double tap on button - vote is neutral

    setSelectedValue(newVote);
    dispatch(billVote({ billId: billId, vote: newVote }));
  };

  const removeBillHandler = () => {
    dispatch(removeBill(billId));
  }

  return (
    <VoteOptionsWrapper id={billId}>
      <RemoveButton onClick={removeBillHandler}><TrashIcon /></RemoveButton>
      <AgainstOptionButton isActive={voteOptions.AGAINST === selectedValue} onClick={() => onClickHandler(voteOptions.AGAINST)}>נגד</AgainstOptionButton>
      <ForOptionButton isActive={voteOptions.FOR === selectedValue} onClick={() => onClickHandler(voteOptions.FOR)}>בעד</ForOptionButton>
    </VoteOptionsWrapper>
  );
};

const VoteButton = css`
  width: 5rem;
  appearance: none;
  background-color: #2ea44f;
  border: 1px solid rgba(27, 31, 35, .15);
  border-radius: 6px;
  box-shadow: rgba(27, 31, 35, .1) 0 1px 0;
  box-sizing: border-box;
  display: inline-block;
  font-family: -apple-system,system-ui,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  padding: 6px 16px;
  position: relative;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: middle;
  white-space: nowrap;

`;

const VoteOptionsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 18rem;
`;

const ForOptionButton = styled.button`
  ${VoteButton}
  background: ${(props) => props.isActive ? '#C8E4B2' : '#f9f9f9'};
  cursor: pointer;
  &: hover {
    background-color: #C8E4B2;
  }
`;

const AgainstOptionButton = styled.button`
  ${VoteButton}
  background: ${(props) => props.isActive ? '#EF6262' : '#f9f9f9'};
  cursor: pointer;
  &: hover {
    background-color: #EF6262;
  }
`;

const RemoveButton = styled.button`
  width: fit-content;
  background-color: transparent;
  border: 1px solid transparent;
  cursor: pointer
`;

export default UserVoteBox;
