import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearAllBills } from "../redux/selectedBillsSlice";

const Bar = styled.nav`
  width: 100%;
  background: linear-gradient(90deg, #1b2a45 0%, #2563eb 100%);
  color: #fff;
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  direction: rtl;
  box-sizing: border-box;
`;

const LogoLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-weight: 700;
  font-size: 0.95rem;
  letter-spacing: 0.06em;
  &:hover { opacity: 0.85; }
`;

const NavLink = styled(Link)`
  color: rgba(255,255,255,0.75);
  font-size: 0.82rem;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.15s;
  &:hover { color: #fff; }
`;

const ClearBtn = styled.button`
  background: rgba(255,255,255,0.15);
  border: 1px solid rgba(255,255,255,0.35);
  color: #fff;
  font-size: 0.78rem;
  font-weight: 600;
  padding: 5px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-family: inherit;
  transition: background 0.15s;
  &:hover { background: rgba(255,255,255,0.28); }
`;

const NavBar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isHome = location.pathname === "/";

  const onClearVotes = () => {
    dispatch(clearAllBills());
    localStorage.removeItem("selectedBills");
  };

  return (
    <Bar>
      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
        <LogoLink to="/">VoteMate</LogoLink>
        <NavLink to="/about">אודות</NavLink>
      </div>
      {isHome && (
        <ClearBtn onClick={onClearVotes}>ניקוי הצבעות</ClearBtn>
      )}
    </Bar>
  );
};

export default NavBar;
