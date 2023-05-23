import styled from "styled-components";
import { useState } from "react";
import { useEffect } from "react";
import { getAllBills } from "../../utils/apiUtils";
import AutoComplete from "../BillsSelectionPage/AutoComplete";
import { useDispatch, useSelector } from "react-redux";
import { clear } from "../redux/searchedBillSlice";
import { addBill } from "../redux/selectedBillsSlice";
import TabsCards from "../Tabs/TabsCards";

const EMPTY_BILL = { id: "", label: "" };

const SearchBills = () => {
  const [allBills, setAllBills] = useState([]);
  const currentSearchedBill = useSelector((state) => state.searchedBill);
  const dispatch = useDispatch();

  const addBillHandler = () => {
    if (currentSearchedBill.id !== EMPTY_BILL.id) {
      dispatch(addBill(currentSearchedBill));
      dispatch(clear());
    }
  };

  const tabsHeaders = [
    {
      title: "מספר כנסת",
      description: "חפש הצעות חוק המשוייכות לכנסת מסויימת",
      content: <input type="number"></input>,
    },
    {
      title: "טקסט חופשי",
      description: "חפש הצעות חוק על פי טקסט חופשי",
      content: <AutoComplete data={allBills} />,
      action: <button onClick={addBillHandler}>הוסף הצעת חוק</button>,
    },
  ];

  useEffect(() => {
    getAllBills()
      .then((res) => {
        setAllBills(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <BillsSelectionContainer>
      <TabsCards tabsHeaders={tabsHeaders} />
    </BillsSelectionContainer>
  );
};

const BillsSelectionContainer = styled.div``;

export default SearchBills;
