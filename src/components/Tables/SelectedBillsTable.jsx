import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const SelectedBillsTable = () => {
  const [rowsData, setRowsData] = useState([]);
  const finalBills = useSelector((state) => state.finalBills);

  const parseData = (data) => {
    const res = data.map((obj, index) => ({
      ...obj,
      id: index,
    }));
    return res;
  };

  const columns = [
    {
      field: "index",
      headerName: " ",
      flex: 1,
      headerAlign: "right",
      align: "center",
    },
    {
      field: "id",
      headerName: "מזהה חוק",
      flex: 0.5,
      headerAlign: "right",
      align: "center",
    },
    {
      field: "label",
      headerName: "הצעת חוק",
      flex: 1,
      headerAlign: "right",
    },
  ];

  useEffect(() => {
    setRowsData(parseData(finalBills));
  }, [finalBills]);

  return <DataGrid rows={rowsData} columns={[...columns].reverse()} />;
};

export default SelectedBillsTable;
