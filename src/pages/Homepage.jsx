import styled from "styled-components";
import Table from "../components/Table/Table";
import SearchBills from "../components/BillsSelectionPage/SearchBills";
import { useState } from "react";
import { palette } from "../assets/colorsPalette";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMultipleBills } from "../components/redux/selectedBillsSlice";
import LandingScreen from "../components/common/LandingScreen";
import Loader from "../components/common/Loader";

const Homepage = () => {
    const tableHeaders = ['', 'נושא ההצבעה', 'תאריך'];
    const hint = 'מחפשים הצעות חוק מהמאגר על פי מספר כנסת או חיפוש חופשי, לכל חוק מצביעים על פי דעתכם וממשיכים לדף תוצאות המשקף את חברי הכנסת הדומים לכם בדעתכם.'; 
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const selectedBills = useSelector((state) => state.selectedBills);

    const data = [
        {
            "id": 15752,
            "label": "חוק רשות הספנות והנמלים, התשסד-2004",
            "knessetNum": "16"
        },
        {
            "id": 16127,
            "label": "חוק להגנת חיית הבר (תיקון מס 6), התשסט-2008",
            "knessetNum": "17"
        },
        {
            "id": 16399,
            "label": "חוק סדר הדין הפלילי (תיקון מס 33) (הוראת שעה) (תיקון), התשסד-2004",
            "knessetNum": "16"
        },
        {
            "id": 16633,
            "label": "חוק המדיניות הכלכלית לשנת הכספים 2004 (תיקוני חקיקה), התשסד-2004",
            "knessetNum": "16"
        },
        {
            "id": 16634,
            "label": "חוק גיל פרישה, התשסד-2004",
            "knessetNum": "16"
        },
        {
            "id": 17516,
            "label": "חוק הפיקוח על עסקי ביטוח (תיקון מס 15), התשסה-2005",
            "knessetNum": "16"
        },
        {
            "id": 17660,
            "label": "הצעת חוק עבודת נשים (תיקון מס 31) (עידוד הנקה לתקופה ממושכת), התשסה-2005",
            "knessetNum": "16"
        },
        {
            "id": 17673,
            "label": "חוק חופש המידע (תיקון מס 3), התשסה-2005",
            "knessetNum": "16"
        },
        {
            "id": 17689,
            "label": "הצעת חוק שמאי מקרקעין (תיקון - ראש מועצת שמאי המקרקעין), התשסד-2003",
            "knessetNum": "16"
        },
        {
            "id": 17728,
            "label": "חוק העמותות (תיקון מס 6), התשסה-2005",
            "knessetNum": "16"
        },
        {
            "id": 17729,
            "label": "הצעת חוק השירות האזרחי, התשסד-2003",
            "knessetNum": "16"
        },
    ];

    useEffect(() => {
        dispatch(addMultipleBills(data));
    }, []);

    return (
        <HomepageWrapper>
            <LandingScreen />
            <HeadersWrapper>
                <HintsWrapper>
                    <StyledHint>{hint}</StyledHint>
                </HintsWrapper>
                <SearchBills setIsLoading={setIsLoading} />
            </HeadersWrapper>
            {isLoading && <Loader />}
            <TableWrapper loadingState={isLoading}>
                <Table headers={tableHeaders} data={selectedBills} rows={2} />
            </TableWrapper>
        </HomepageWrapper>
    )

};

export const HeadersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${palette.brand};
  margin-bottom: 0.5rem;
`;

export const Header = styled.div`
  font-family: Open Sans;
  align-self: center;
  font-weight: 400;
  font-size: 40px;
  font-family: Poppins, sans-serif;
`;

export const HintsWrapper = styled.ul`
  font-size: 16px;
  font-weight: 500;
  font-size: 20px;
  font-family: Poppins, sans-serif;
  list-style-position: inside;
  direction: rtl;
`;

const HomepageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;

`;

const StyledHint = styled.h3`
    width: 50rem;
    text-align: center;
`;

const TableWrapper = styled.div`
    opacity: ${(props) => props.loadingState? 0.2 : 1};
    width: min(1000px, 100% - 3rem);
`;

export default Homepage;