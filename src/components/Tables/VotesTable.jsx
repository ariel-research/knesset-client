import {
  TableBody,
  TableContainer,
  TableHead,
  TableHeaderRow,
} from "./BillsTable.styled";
import TableHeaderCell from "./TableHeaderCell";

const VoteTable = (props) => {
  return (
    <TableContainer>
      <TableHead>
        <TableHeaderRow>
          <TableHeaderCell key="group_header" width="10%" textAlign="center">
            הצבעתך
          </TableHeaderCell>
          <TableHeaderCell key="group_header" width="10%" textAlign="center">
            הצבעת חבר כנסת
          </TableHeaderCell>
          <TableHeaderCell key="group_header" width="40%" textAlign="center">
            הצעת חוק
          </TableHeaderCell>
          <TableHeaderCell key="platform_header" width="10%" textAlign="center">
            מזהה חוק
          </TableHeaderCell>
          <TableHeaderCell key="user_header" width="3%" />
        </TableHeaderRow>
      </TableHead>
      <TableBody></TableBody>
    </TableContainer>
  );
};

export default VoteTable;
