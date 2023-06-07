import { useSelector } from "react-redux";
import {
  TableBody,
  TableContainer,
  TableHead,
  TableHeaderRow,
  TableRow,
} from "./BillsTable.styled";
import TableHeaderCell from "./TableHeaderCell";
import TableRowCell from "./TableRowCell";
import { useEffect } from "react";
import { useState } from "react";

const VoteTable = (props) => {
  const { data } = props;
  const prefix = "results-table";
  const [userVotes, setUserVotes] = useState([]);
  const finalBills = useSelector((state) => state.finalBills);

  const renderVoteValue = (vote) => {
    switch (vote) {
      case 1:
        return "בעד";
      case 2:
        return "נגד";
      case 3:
        return "נמנע";
      default:
        return "";
    }
  };

  const renderTableBody = () => {
    return (
      data &&
      data.map(({ id, label, km_name, km_vote }, index) => {
        const user_vote = userVotes.find((bill) => bill.id == id);
        return (
          <TableRow
            id={`${prefix}-table_row-${index}`}
            key={`${prefix}-table_row-${index}`}
          >
            <TableRowCell
              id={`${prefix}-user_vote-${index}`}
              key={`${prefix}-user_vote-${index}`}
              width="15%"
              textAlign="center"
            >
              {user_vote ? renderVoteValue(user_vote.vote) : ""}
            </TableRowCell>
            <TableRowCell
              id={`${prefix}-km_vote-${index}`}
              key={`${prefix}-km_vote-${index}`}
              width="15%"
              textAlign="center"
            >
              {renderVoteValue(km_vote)}
            </TableRowCell>
            <TableRowCell
              id={`${prefix}-km_name-${index}`}
              key={`${prefix}-km_name-${index}`}
              width="15%"
              textAlign="center"
            >
              {km_name}
            </TableRowCell>
            <TableRowCell
              id={`${prefix}-label-${index}`}
              key={`${prefix}-label-${index}`}
              width="65%"
              textAlign="center"
            >
              {label}
            </TableRowCell>
            <TableRowCell
              id={`${prefix}-identifier-${index}`}
              key={`${prefix}-identifier-${index}`}
              width="15%"
              textAlign="center"
            >
              {id}
            </TableRowCell>
            <TableRowCell
              id={`${prefix}-index-${index}`}
              key={`${prefix}-index-${index}`}
              width="5%"
              textAlign="center"
            >
              {index + 1}
            </TableRowCell>
          </TableRow>
        );
      })
    );
  };

  useEffect(() => {
    if (finalBills) {
      const res = [...finalBills];
      setUserVotes(res);
    }
  }, [finalBills]);

  return (
    <TableContainer>
      <TableHead>
        <TableHeaderRow>
          <TableHeaderCell
            key="user_vote_header"
            width="10%"
            textAlign="center"
          >
            הצבעתך
          </TableHeaderCell>
          <TableHeaderCell key="km_vote_header" width="10%" textAlign="center">
            הצבעת חבר כנסת
          </TableHeaderCell>
          <TableHeaderCell key="km_name_header" width="10%" textAlign="center">
            שם חבר כנסת
          </TableHeaderCell>
          <TableHeaderCell
            key="bill_label_header"
            width="40%"
            textAlign="center"
          >
            הצעת חוק
          </TableHeaderCell>
          <TableHeaderCell key="bill_id_header" width="10%" textAlign="center">
            מזהה חוק
          </TableHeaderCell>
          <TableHeaderCell key="user_header" width="3%" />
        </TableHeaderRow>
      </TableHead>
      <TableBody>{renderTableBody()}</TableBody>
    </TableContainer>
  );
};

export default VoteTable;
