import { useState } from "react";
import {
  AutoCompleteInput,
  AutoCompleteRow,
  AutoCompleteRowsContainer,
  AutoCompleteWrapper,
} from "./AutoComplete.styled";
import { useDispatch, useSelector } from "react-redux";
import { update } from "../redux/searchedBillSlice";
import {setDisplayedBills} from "../redux/displayedBillsSlice";
import { useEffect } from "react";

const AutoComplete = (props) => {
  const { data } = props;
  const [userInput, setUserInput] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const searchedBill = useSelector((select) => select.searchedBill);
  const dispatch = useDispatch();

  const onSuggestionClickHandler = (val) => {
    setUserInput(val.label);
    setFilteredSuggestions([]);
    dispatch(update(val));
    dispatch(setDisplayedBills([val]))

  };

  const onChangeHandler = (e) => {
    const value = e.target.value;
    setUserInput(value);
    const filtered = data.filter(
      (suggestion) =>
        suggestion.label.toLowerCase().indexOf(value.toLowerCase()) > -1
    );
    if (value) {
      //sort by prefix
      filtered.sort((a, b) => {
        if (a.label.startsWith(value) && !b.label.startsWith(value)) {
          return -1;
        }
        if (b.label.startsWith(value) && !a.label.startsWith(value)) {
          return 1;
        }
        return a.label.localeCompare(b.label);
      });
      //present only the first 30 results
      setFilteredSuggestions(
        filtered.splice(0, filtered.length < 30 ? filtered.length : 30)
      );
    } else {
      setFilteredSuggestions([]);
    }
  };

  const onSearchClick = () => {
    dispatch(setDisplayedBills(filteredSuggestions))
  }

  const onKeyDownHandler = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (userInput !== "" && filteredSuggestions.length){
        console.log("enter!")
        onSearchClick(); // Trigger the table
      }
    }
  };
  

  const formatText = (text) => text.replace(/ /g, '\u00A0'); // non-breaking space
 
  const highlightMatch = (label) => {
    if (!userInput) return label;
  
    const lowerLabel = label.toLowerCase();
    const lowerInput = userInput.toLowerCase();
    const startIndex = lowerLabel.indexOf(lowerInput);
  
    if (startIndex === -1) return label;
    
    const beforeMatch = formatText(label.slice(0, startIndex));
    const matchText = formatText(label.slice(startIndex, startIndex + userInput.length));
    const afterMatch = formatText(label.slice(startIndex + userInput.length));
  
    return (
      <>
        {beforeMatch}
        <span style={{ fontWeight: 'bold', color: '#000000' }}>{matchText}</span>
        {afterMatch}
      </>
    );
  };
  
  useEffect(() => {
    setUserInput(searchedBill.label);
  }, [searchedBill]);

  return (
    <AutoCompleteWrapper id="autocomplete-wrapper">
      <AutoCompleteInput
        id="autocomplete-input"
        autoComplete="off"
        placeholder="שם הצעת חוק"
        onChange={onChangeHandler}
        onKeyDown={onKeyDownHandler} 
        value={userInput}
      />
      {filteredSuggestions.length > 0 && (
        <AutoCompleteRowsContainer id="autocomplete-dropdown">
          {filteredSuggestions.map((bill, index) => {
            return (
              <AutoCompleteRow
                key={index}
                title={bill.label}
                onClick={() => onSuggestionClickHandler(bill)}
              >
                {highlightMatch(bill.label)}
              </AutoCompleteRow>
            );
          })}
        </AutoCompleteRowsContainer>
      )}
    </AutoCompleteWrapper>
  );
};

export default AutoComplete;
