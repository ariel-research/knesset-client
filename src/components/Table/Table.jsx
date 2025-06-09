import UserVoteBox from "../common/UserVoteBox";
import {
  TableWrapper,
  StyledTable,
  TableHead,
  TableHeaderCell,
  ScrollableTBody,
  TableRow,
  TableCell
} from "./Table.styled";

const Table = ({ data, removeBill }) => {
  return (
    <TableWrapper>
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableHeaderCell>תאריך</TableHeaderCell>
            <TableHeaderCell>מספר כנסת</TableHeaderCell>
            <TableHeaderCell>שם הצעת חוק</TableHeaderCell>
            <TableHeaderCell>מספר הצבעה</TableHeaderCell>
            <TableHeaderCell>הצבעתך</TableHeaderCell>
          </TableRow>
        </TableHead>

        <ScrollableTBody>
          {data.map((el) => (
            <TableRow key={el.id}>
              <TableCell>{el.date}</TableCell>
              <TableCell>{el.knessetNum}</TableCell>
              <TableCell>{el.label}</TableCell>
              <TableCell>{el.ordinal}</TableCell>
              <TableCell>
                <UserVoteBox bill={{ id: el.id, label: el.label }} removeBillButton={removeBill[0]} />
              </TableCell>
            </TableRow>
          ))}
        </ScrollableTBody>
      </StyledTable>
    </TableWrapper>
  );
};

export default Table;
