import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeBill } from "../redux/selectedBillsSlice";

const BillsSuggestionsTable = () => {
  const [rowsData, setRowsData] = useState([]);
  const selectedBills = useSelector((state) => state.selectedBills);
  const dispatch = useDispatch();

  const parseData = (data) => {
    const res = data.map((obj, index) => ({
      ...obj,
      index: index,
      id: obj.id,
      label: obj.label,
    }));
    return res;
  };

  const renderRemoveRowButton = (params, handler) => {
    const handleButtonClick = () => {
      handler(params.row.id);
    };
    return (
      <button variant="contained" color="primary" onClick={handleButtonClick}>
        הסר
      </button>
    );
  };

  const removeRow = (bill_id) => {
    dispatch(removeBill(bill_id));
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
    {
      field: "remove",
      headerName: "Action",
      headerAlign: "right",
      align: "right",
      flex: 0.1,
      renderCell: (params) => renderRemoveRowButton(params, removeRow),
    },
  ];

  useEffect(() => {
    setRowsData(parseData(selectedBills));
  }, [selectedBills]);

  return <DataGrid rows={rowsData} columns={[...columns].reverse()} />;
};

export default BillsSuggestionsTable;
