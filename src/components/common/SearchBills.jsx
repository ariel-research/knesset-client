import { useState } from "react";
import { useEffect } from "react";
import { getAllBills, getBillsOfKnesset } from "../../utils/apiUtils";
import AutoComplete from "../BillsSelectionPage/AutoComplete";
import { useDispatch, useSelector } from "react-redux";
import { clear } from "../redux/searchedBillSlice";
import { addBill, addMultipleBills } from "../redux/selectedBillsSlice";
import {
  ActionButton,
  ActionButtonsContainer,
  AutoCompleteContainer,
  BillsSelectionContainer,
  OptionKnessetNum,
  SelectKnessetNum,
  TabContainer,
  TabContent,
  TabDescription,
  TabHeader,
} from "./SearchBills.styled";

const EMPTY_BILL = { id: "", label: "" };
const ALL_KNESSET_NUM = [
  "השש-עשרה",
  "השבע-עשרה",
  "השמונה-עשרה",
  "התשע-עשרה",
  "העשרים",
  "העשרים ואחת",
  "העשרים ושתיים",
  "העשרים ושלוש",
  "העשרים וארבע",
  "העשרים וחמש",
];
const KNESSET_NUM_BASE_COUNT = 16; // available data is from the 16 knesset

const SearchBills = (props) => {
  const { setIsLoading } = props;
  const title = "חיפוש הצעות חוק";
  const description =
    "חיפוש הצעות חוק השייכות לכנסת ספציפית, או על פי טקסט חופשי";
  const [allBills, setAllBills] = useState([]);
  const [filteredBillsByKnessetNum, setFilteredBillsByKnessetNum] = useState(
    []
  );
  const [selectedKnessetNum, setSelectedKnessetNum] = useState("0");
  const currentSearchedBill = useSelector((state) => state.searchedBill);
  const dispatch = useDispatch();

  const addBillHandler = () => {
    if (currentSearchedBill.id !== EMPTY_BILL.id) {
      dispatch(addBill(currentSearchedBill));
      dispatch(clear());
    }
  };

  const onKnessetNumSelectHandler = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === "0") {
      setFilteredBillsByKnessetNum([...allBills]);
    }
    setSelectedKnessetNum(selectedValue);
    const arr = [];
    getBillsOfKnesset(selectedValue).then((res) => {
      const bills = res.data.bills;
      bills.forEach((bill) => {
        const current = { id: bill.id, label: bill.name };
        arr.push(current);
      });
      setFilteredBillsByKnessetNum([...arr]);
    });
  };

  const addKnessetNumBIlls = () => {
    setIsLoading(true);
    const arr = [];

    //if the default option was selected - load all bills
    if (selectedKnessetNum === "0") {
      dispatch(addMultipleBills(allBills));
      setIsLoading(false);
      return;
    }

    getBillsOfKnesset(selectedKnessetNum)
      .then((res) => {
        const bills = res.data.bills;
        bills.forEach((bill) => {
          const current = { id: bill.id, label: bill.name };
          arr.push(current);
        });
        dispatch(addMultipleBills(arr));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    getAllBills()
      .then((res) => {
        setAllBills(res.data);
        setFilteredBillsByKnessetNum(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [setIsLoading]);

  return (
    <TabContainer>
      <TabHeader id={`tab_title`}>{title}</TabHeader>
      <TabContent>
        <TabDescription id="tab_description">{description}</TabDescription>
        <BillsSelectionContainer>
          <SelectKnessetNum
            id="knesset_num_select"
            value={selectedKnessetNum}
            onChange={onKnessetNumSelectHandler}
          >
            <OptionKnessetNum
              id={`knesset-num_${0}`}
              key={`knesset-num_${0}`}
              value="0"
            >
              מספר כנסת
            </OptionKnessetNum>
            {ALL_KNESSET_NUM.map((num, index) => (
              <OptionKnessetNum
                id={`knesset-num_${index + KNESSET_NUM_BASE_COUNT}`}
                key={`knesset-num_${index + KNESSET_NUM_BASE_COUNT}`}
                value={index + KNESSET_NUM_BASE_COUNT}
              >
                {num}
              </OptionKnessetNum>
            ))}
          </SelectKnessetNum>
          <AutoCompleteContainer>
            <AutoComplete data={filteredBillsByKnessetNum} />
          </AutoCompleteContainer>
        </BillsSelectionContainer>
        <ActionButtonsContainer>
          <ActionButton id="add_bill" onClick={addBillHandler}>
            הוסף הצעת חוק שנבחרה
          </ActionButton>
          <ActionButton id="add_all_bills" onClick={addKnessetNumBIlls}>
            הוסף את כל הצעות הכנסת
          </ActionButton>
        </ActionButtonsContainer>
      </TabContent>
    </TabContainer>
  );
};

export default SearchBills;
