import { useState } from "react";
import { useDispatch } from "react-redux";
import { billVote } from "../redux/finalBillsSlice";

const UserVoteBox = (props) => {
  const { index, billId } = props;
  const [selectedValue, setSelectedValue] = useState(1);
  const dispatch = useDispatch();

  const onSelectHandler = (e) => {
    const vote = e.target.value;
    setSelectedValue(vote);
    dispatch(billVote({ billId, vote }));
  };

  return (
    <select
      id={`user_vote-${index}`}
      value={selectedValue}
      onChange={onSelectHandler}
    >
      <option id={`for_vote-${index}`} value={1}>
        בעד
      </option>
      <option id={`against_vote-${index}`} value={2}>
        נגד
      </option>
    </select>
  );
};

export default UserVoteBox;
