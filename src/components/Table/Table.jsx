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

import {
  ArrowButton
}
from "../common/Arrows";

import { useState, useEffect } from "react";
import { FixedSizeList as List } from "react-window";


const Table = ({ data, removeBill }) => {
  const [sortedData, setSortedData] = useState([...data]);
  const [sortDirection, setSortDirection] = useState("desc");
  const [sortField, setSortField] = useState("date");

  const sortBy = (field, direction) => {
    const sorted = [...data].sort((a, b) => {
      if (field === "date") {
        return direction === "asc"
          ? (new Date(a.date) - new Date(b.date))
          : new Date(b.date) - new Date(a.date);
      }
      if (field === "label") {
        return direction === "asc"
          ? a.label.localeCompare(b.label)
          : b.label.localeCompare(a.label);
      }
      return 0;
    });
    console.log(sorted, field, direction)
    setSortedData(sorted);
    setSortDirection(direction);
    setSortField(field);
  };

  useEffect(() => {
    sortBy("date","desc")
  }, [data]);
  

  const renderSortButtons = (field) => (
    <div style={{
      display: "flex",
      flexGrow: "1",
      flexDirection: "column",
      alignItems: "center",
    }}>
      <ArrowButton
        direction="up"
        active={sortField === field && sortDirection === "asc"}
        onClick={() => sortBy(field, "asc")}
      />
      <ArrowButton
        direction="down"
        active={sortField === field && sortDirection === "desc"}
        onClick={() => sortBy(field, "desc")}
      />
    </div>
  );
  

const Row = ({ index, data }) => {
  const el = data[index];
  return (
    <TableRow key={el.id} >
      <TableCell>{new Date(el.date).toLocaleDateString("he-IL")}</TableCell>
      <TableCell>{el.knessetNum}</TableCell>
      <TableCell>{el.label}</TableCell>
      <TableCell>{el.ordinal}</TableCell>
      <TableCell>
        <UserVoteBox bill={el} removeBillButton={removeBill[0]} />
      </TableCell>
    </TableRow>
  );
};

  

  return (
    <TableWrapper>
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableHeaderCell>
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            תאריך
              {renderSortButtons("date")}
            </div>
            </TableHeaderCell>

            <TableHeaderCell>מספר כנסת</TableHeaderCell>

            <TableHeaderCell>
  <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
    שם הצעת חוק
    {renderSortButtons("label")}
  </div>
</TableHeaderCell>



            <TableHeaderCell>מספר הצבעה</TableHeaderCell>
            <TableHeaderCell>הצבעתך</TableHeaderCell>
          </TableRow>
        </TableHead>

        <List
          height={500} // גובה כולל
          itemCount={sortedData.length}
          itemSize={50} // גובה כל שורה
          width="100%"
          itemData={sortedData}
          >
          {Row}
        </List>

      </StyledTable>
    </TableWrapper>
  );
};

export default Table;
