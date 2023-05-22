import styled from "styled-components";
import MyTabs from "../../pages/TabsCard";
import { useState } from "react";
import { useEffect } from "react";
import { getAllBills } from "../../utils/apiUtils";
import { parseBills } from "../../utils/localUtils";

const SearchBills = (props) => {
  const { searchBillHandler } = props;
  const [allBills, setAllBills] = useState([]);
  const [currentChosenBill, setCurrentChosenBill] = useState("");

  const handleInputChange = (e) => {
    setCurrentChosenBill(e.target.value);
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
      content: (
        <input
          value={currentChosenBill}
          placeholder="...הקלד כאן"
          onChange={handleInputChange}
        ></input>
      ),
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
      <MyTabs tabsHeaders={tabsHeaders} />
      <button onClick={searchBillHandler}>!חפש</button>
    </BillsSelectionContainer>
  );
};

const BillsSelectionContainer = styled.div``;

export default SearchBills;
