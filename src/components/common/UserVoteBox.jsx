import { useState } from "react";
import { useDispatch } from "react-redux";
import { billVote } from "../redux/finalBillsSlice";

const UserVoteBox = (props) => {
  const { billId } = props;
  const [selectedValue, setSelectedValue] = useState(1);
  const dispatch = useDispatch();

  const onSelectHandler = (e) => {
    const vote = e.target.value;
    setSelectedValue(vote);
    dispatch(billVote({ billId, vote }));
  };

  return (
    <select value={selectedValue} onChange={onSelectHandler}>
      <option value={1}>בעד</option>
      <option value={2}>נגד</option>
      <option value={3}>נמנע</option>
    </select>
  );
};

export default UserVoteBox;
