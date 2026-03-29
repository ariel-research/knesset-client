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



            <TableHeaderCell>קישור</TableHeaderCell>
            <TableHeaderCell>הצבעתך</TableHeaderCell>
          </TableRow>
        </TableHead>

        <ScrollableTBody>
          {sortedData.map((el) => (
            <TableRow key={el.id}>
              <TableCell>{new Date(el.date).toLocaleDateString('he-IL')}</TableCell>
              <TableCell>
                <span style={{
                  background: "#eff6ff", color: "#2563eb",
                  padding: "2px 7px", borderRadius: "4px",
                  fontSize: "0.73rem", fontWeight: 700
                }}>{el.knessetNum}</span>
              </TableCell>
              <TableCell>{el.label}</TableCell>
              <TableCell>
                {el.link && (
                  <a
                    href={el.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "center",
                      width: 28, height: 28, borderRadius: 7,
                      background: "#f1f5fb", border: "1px solid #e2e8f2",
                      color: "#64748b", textDecoration: "none",
                      transition: "background 0.15s, color 0.15s"
                    }}
                    onMouseOver={e => { e.currentTarget.style.background = "#1b2a45"; e.currentTarget.style.color = "#fff"; }}
                    onMouseOut={e => { e.currentTarget.style.background = "#f1f5fb"; e.currentTarget.style.color = "#64748b"; }}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                      <polyline points="15 3 21 3 21 9"/>
                      <line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                  </a>
                )}
              </TableCell>
              <TableCell>
                <UserVoteBox bill={el} removeBillButton={removeBill[0]} />
              </TableCell>
            </TableRow>
          ))}
        </ScrollableTBody>
      </StyledTable>
    </TableWrapper>
  );
};

export default Table;