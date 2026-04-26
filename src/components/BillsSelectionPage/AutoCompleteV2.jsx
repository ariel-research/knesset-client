import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import {
  AutoCompleteInput,
  AutoCompleteRow,
  AutoCompleteRowsContainer,
  AutoCompleteWrapper,
} from "./AutoComplete.styled";

// ─── Visible input shell ──────────────────────────────────────────────────────

const InputShell = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  min-width: 280px;
  padding: 0 12px;
  background: #ffffff;
  border: 1.5px solid ${({ $focused }) => ($focused ? "#2563eb" : "#cbd5e1")};
  border-radius: 10px;
  box-shadow: ${({ $focused }) =>
    $focused ? "0 0 0 3px rgba(37,99,235,0.12)" : "0 1px 4px rgba(0,0,0,0.06)"};
  transition: border-color 0.18s, box-shadow 0.18s;
  direction: rtl;
`;

const SearchIcon = styled.svg`
  flex-shrink: 0;
  color: ${({ $focused }) => ($focused ? "#2563eb" : "#94a3b8")};
  transition: color 0.18s;
`;

const ClearBtn = styled.button`
  flex-shrink: 0;
  background: none;
  border: none;
  cursor: pointer;
  color: #94a3b8;
  font-size: 0.85rem;
  padding: 2px 4px;
  line-height: 1;
  border-radius: 4px;
  transition: color 0.12s, background 0.12s;
  &:hover { color: #1b2a45; background: #f1f5f9; }
`;

// ─── "See all results" footer button ─────────────────────────────────────────

const ShowAllButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px 14px;
  border: none;
  border-top: 1px solid #e2e8f2;
  background: #f8fafc;
  color: #2563eb;
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  direction: rtl;
  transition: background 0.12s;

  &:hover { background: #eff6ff; }

  span { color: #94a3b8; font-weight: 400; }
`;

// ─── Component ────────────────────────────────────────────────────────────────

const AutoCompleteV2 = ({
  query,
  onQueryChange,
  suggestions = [],
  mode,
  totalResults = 0,
  hasMoreResults = false,
}) => {
  const [open, setOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);

  // ── Close on click outside ──────────────────────────────────────────────────
  useEffect(() => {
    const handle = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  // ── Open dropdown only when input is $focused — NOT on suggestions change ────
  // (Watching suggestions here caused the dropdown to re-open on every scroll
  // page load because bills.slice(0,30) is a new array reference each render.)
  const showDropdown = isFocused && open && suggestions.length > 0 && !!query;

  // ── Handlers ────────────────────────────────────────────────────────────────

  const handleChange = (e) => {
    onQueryChange(e.target.value);
    if (e.target.value) setOpen(true);
    else setOpen(false);
  };

  const handleFocus = () => {
    setIsFocused(true);
    if (query && suggestions.length) setOpen(true);
  };

  const handleBlur = () => setIsFocused(false);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      inputRef.current?.blur();
    }
  };

  const handleSuggestionClick = (bill) => {
    onQueryChange(bill.label);
    setOpen(false);
  };

  const handleClear = () => {
    onQueryChange("");
    setOpen(false);
    inputRef.current?.focus();
  };

  // "See all in table" — just closes the dropdown; the table already shows results
  const handleShowAll = () => {
    setOpen(false);
    inputRef.current?.blur();
  };

  // ── Highlight matching substring ────────────────────────────────────────────

  const highlightMatch = (label) => {
    if (!query) return label;
    const lower = label.toLowerCase();
    const lowerQ = query.toLowerCase();
    const start = lower.indexOf(lowerQ);
    if (start === -1) return label;
    return (
      <>
        {label.slice(0, start)}
        <span style={{ fontWeight: "bold", color: "#000" }}>
          {label.slice(start, start + query.length)}
        </span>
        {label.slice(start + query.length)}
      </>
    );
  };

  const resultLabel = hasMoreResults
    ? `${totalResults}+ תוצאות בטבלה`
    : `${totalResults} תוצאות בטבלה`;

  return (
    <AutoCompleteWrapper ref={wrapperRef} id="autocomplete-wrapper-v2" style={{ position: "relative" }}>
      <InputShell $focused={isFocused}>
        {/* Search icon — right side (RTL) */}
        <SearchIcon
          $focused={isFocused}
          width="16" height="16" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </SearchIcon>

        <AutoCompleteInput
          ref={inputRef}
          id="autocomplete-input-v2"
          autoComplete="off"
          placeholder={mode === "search" ? "מחפש בכל הצעות החוק..." : "חיפוש הצעת חוק"}
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={{ flex: 1 }}
        />

        {/* Clear button — left side (RTL) */}
        {query && (
          <ClearBtn
            onMouseDown={(e) => e.preventDefault()}
            onClick={handleClear}
            title="נקה חיפוש"
          >
            ✕
          </ClearBtn>
        )}
      </InputShell>

      {showDropdown && (
        <AutoCompleteRowsContainer id="autocomplete-dropdown-v2">
          {suggestions.map((bill) => (
            <AutoCompleteRow
              key={bill.id}
              title={bill.label}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleSuggestionClick(bill)}
            >
              {highlightMatch(bill.label)}
            </AutoCompleteRow>
          ))}

          {/* "See all results in table" button */}
          {mode === "search" && totalResults > 0 && (
            <ShowAllButton
              onMouseDown={(e) => e.preventDefault()}
              onClick={handleShowAll}
            >
              ראה את כל התוצאות בטבלה
              <span>{resultLabel} ↓</span>
            </ShowAllButton>
          )}
        </AutoCompleteRowsContainer>
      )}
    </AutoCompleteWrapper>
  );
};

export default AutoCompleteV2;
