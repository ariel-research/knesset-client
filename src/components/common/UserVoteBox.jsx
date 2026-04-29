import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { billVote, removeBill, addBill } from "../redux/selectedBillsSlice";
import TrashIcon from "../../assets/svg-icons/TrashIcon";
import { ThumbUpIcon, ThumbDownIcon, NeutralIcon } from "./Thumbs";

const voteOptions = { DEFAULT: 0, FOR: 1, AGAINST: 2, NEUTRAL: 3 };

const voteColors = {
  for:     { border: "#4f46e5", bg: "#eef2ff", icon: "#4f46e5" },
  against: { border: "#e11d48", bg: "#fff1f2", icon: "#e11d48" },
  neutral: { border: "#d97706", bg: "#fffbeb", icon: "#d97706" },
};

const UserVoteBox = ({ bill, removeBillButton }) => {
  const billId = bill.id;
  const selectedBills = useSelector((state) => state.selectedBills);
  const dispatch = useDispatch();

  const selectedBill = selectedBills.find((item) => item.id === billId);
  const selectedValue = selectedBill ? selectedBill.vote : voteOptions.DEFAULT;

  const onClickHandler = (vote) => {
    if (selectedBill?.vote === vote) {
      dispatch(removeBill(billId));
      return;
    }
    if (!selectedBill) dispatch(addBill(bill));
    dispatch(billVote({ billId, vote }));
  };

  return (
    <VoteOptionsWrapper>
      {removeBillButton && (
        <RemoveButton onClick={() => dispatch(removeBill(billId))} title="הסר">
          <TrashIcon />
        </RemoveButton>
      )}

      {/* DOM order matches mockup: בעד → נגד → נמנע.
          In RTL flex, first child renders on the RIGHT. */}
      <IconWrap data-tip="בעד">
        <VoteButton voteType="for" isActive={selectedValue === voteOptions.FOR}
          onClick={() => onClickHandler(voteOptions.FOR)} aria-label="בעד">
          <ThumbUpIcon />
        </VoteButton>
      </IconWrap>

      <IconWrap data-tip="נגד">
        <VoteButton voteType="against" isActive={selectedValue === voteOptions.AGAINST}
          onClick={() => onClickHandler(voteOptions.AGAINST)} aria-label="נגד">
          <ThumbDownIcon />
        </VoteButton>
      </IconWrap>

      <IconWrap data-tip="נמנע">
        <VoteButton voteType="neutral" isActive={selectedValue === voteOptions.NEUTRAL}
          onClick={() => onClickHandler(voteOptions.NEUTRAL)} aria-label="נמנע">
          <NeutralIcon />
        </VoteButton>
      </IconWrap>
    </VoteOptionsWrapper>
  );
};

export default UserVoteBox;

const VoteOptionsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
`;

const IconWrap = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &::after {
    content: attr(data-tip);
    position: absolute;
    bottom: calc(100% + 7px);
    left: 50%;
    transform: translateX(-50%) translateY(4px);
    background: #1b2a45;
    color: #fff;
    font-family: 'Heebo', sans-serif;
    font-size: 0.72rem;
    font-weight: 500;
    padding: 0.28rem 0.6rem;
    border-radius: 5px;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.15s, transform 0.15s;
    z-index: 20;
  }

  &::before {
    content: '';
    position: absolute;
    bottom: calc(100% + 3px);
    left: 50%;
    transform: translateX(-50%) translateY(4px);
    border: 5px solid transparent;
    border-top-color: #1b2a45;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.15s, transform 0.15s;
    z-index: 20;
  }

  &:hover::after, &:hover::before {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
`;

const VoteButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: 1.5px solid ${({ isActive, voteType }) =>
    isActive ? voteColors[voteType].border : "#e2e8f2"};
  background: ${({ isActive, voteType }) =>
    isActive ? voteColors[voteType].bg : "#ffffff"};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.18s, background 0.18s, transform 0.12s;

  /* All icons are outline/stroke — just drive the stroke color */
  svg {
    stroke: ${({ isActive, voteType }) =>
      isActive ? voteColors[voteType].icon : "#94a3b8"};
    fill: none;
    transition: stroke 0.18s;
  }

  &:hover {
    border-color: #c8d0de;
    background: #f8fafc;
    transform: scale(1.08);
  }
`;

const RemoveButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  color: #94a3b8;
  transition: color 0.15s;
  &:hover { color: #e11d48; }
`;
