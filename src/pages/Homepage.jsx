import styled from "styled-components";
import Table from "../components/Table/Table";
import SearchBills from "../components/BillsSelectionPage/SearchBills";
import { useState } from "react";
import { palette } from "../assets/colorsPalette";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMultipleBills } from "../components/redux/selectedBillsSlice";

const Homepage = () => {
    const tableHeaders = ['', 'נושא ההצבעה', 'תאריך'];
    const prefix = "bills_selection_page";
    const header = "שקיפות בכנסת";
    const hint =
        "שירות זה נועד כדי לספק לציבור בישראל אפשרות להשוות בין דעותיהם הפוליטיות להצבעות חברי כנסת ישראל";
    const [isLoading, setIsLoading] = useState(false);
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
            <HeadersWrapper>
                <Header id={`${prefix}-header`}>{header}</Header>
                <Hint id={`${prefix}-hint`}>{hint}</Hint>
                <SearchBills setIsLoading={setIsLoading} />
            </HeadersWrapper>
            <TableWrapper>
                <Table headers={tableHeaders} data={selectedBills} rows={2} />
            </TableWrapper>
        </HomepageWrapper>
    )

};

export const HeadersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  color: ${palette.brand};
`;

export const Header = styled.div`
  font-family: Open Sans;
  align-self: center;
  font-weight: 400;
  font-size: 40px;
  font-family: Poppins, sans-serif;
`;

export const Hint = styled.header`
  font-size: 16px;
  font-weight: 500;
  font-size: 20px;
  font-family: Poppins, sans-serif;
`;

const HomepageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;

`;

const TableWrapper = styled.div`
    width: min(1000px, 100% - 3rem);
`;

export default Homepage;