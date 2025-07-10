import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { billVote, removeBill, addBill } from "../redux/selectedBillsSlice";
import TrashIcon from "../../assets/svg-icons/TrashIcon";
import {
  ThumbUpIcon,
  ThumbDownIcon,
  NeutralIcon,
}
from "./Thumbs";
const voteOptions = {
  DEFAULT: 0,
  FOR: 1,
  AGAINST: 2,
  NEUTRAL: 3,
};

const UserVoteBox = ({ bill, removeBillButton }) => {
  const billId = bill.id;
  const selectedBills = useSelector((state) => state.selectedBills);
  const dispatch = useDispatch();

  const selectedBill = selectedBills.find(item => item.id === billId);
  const selectedValue = selectedBill ? selectedBill.vote : voteOptions.DEFAULT;

  const onClickHandler = (vote) => {
    if (!selectedBill) {
      dispatch(addBill(bill));
    }
    dispatch(billVote({ billId, vote }));
  };

  const removeBillHandler = () => {
    dispatch(removeBill(billId));
  };

  return (
    <VoteOptionsWrapper>
      {removeBillButton && (
        <RemoveButton onClick={removeBillHandler}>
          <TrashIcon />
        </RemoveButton>
      )}
      <VoteButton
        isActive={selectedValue === voteOptions.AGAINST}
        onClick={() => onClickHandler(voteOptions.AGAINST)}
        aria-label="נגד"
      >
        <Tooltip>נגד</Tooltip>
        <ThumbDownIcon/>
      </VoteButton>

      <VoteButton
        isActive={selectedValue === voteOptions.FOR}
        onClick={() => onClickHandler(voteOptions.FOR)}
        aria-label="בעד"
      >
        <Tooltip>בעד</Tooltip>
        <ThumbUpIcon/>
      </VoteButton>

      <VoteButton
        isActive={selectedValue === voteOptions.NEUTRAL}
        onClick={() => onClickHandler(voteOptions.NEUTRAL)}
        aria-label="נמנע"
      >
        <Tooltip>נמנע</Tooltip>
        <NeutralIcon/>
      </VoteButton>
    </VoteOptionsWrapper>
  );
};

export default UserVoteBox;

// Styled Components:

const VoteOptionsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  position: relative;
`;

const VoteButton = styled.button`
  position: relative;
  width: 3rem;
  height: 3rem;
  font-size: 1.5rem;
  border: none;
  border-radius: 50%;
  background-color: ${props => props.isActive ? '#C8E4B2' : '#f0f0f0'};
  box-shadow: ${props => props.isActive ? '0 0 8px rgba(0,0,0,0.3)' : 'none'};
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: ${props => props.isActive ? '#C8E4B2' : '#e0e0e0'};
  }

  &:hover span {
    opacity: 1;
    visibility: visible;
    transform: translateY(-120%);
  }
`;

const Tooltip = styled.span`
  position: absolute;
  bottom: 25%;
  background-color: #333;
  color: white;
  padding: 5px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  z-index: 10;
`;
  
const RemoveButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;
