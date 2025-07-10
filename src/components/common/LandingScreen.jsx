import styled from "styled-components";
import logo from '../../assets/png-images/democratometer.png';
import { palette } from "../../assets/colorsPalette";
import HighFiveButton from "./highfiveIcon";

const LandingScreen = () => {
    const header = "VoteMate";

    return (
        <HeaderWrapper>
            <LogoHeaderContainer>
                <LogoImage src={logo} alt="Logo" />
                <LandingScreenHeader>{header}</LandingScreenHeader>
            </LogoHeaderContainer>

            {/* כאן בעתיד תוכל לשים קומפוננטות נוספות */}
            <HeaderRightContent>
            </HeaderRightContent>
        </HeaderWrapper>
    );
};

export default LandingScreen;

const HeaderWrapper = styled.div`
  font-family: Assistant, sans-serif;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  direction: rtl;
  width: 100%;
  box-sizing: border-box;
`;

const LogoHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const LandingScreenHeader = styled.div`
  font-weight: 600;
  font-size: 24px;
  color: ${palette.brand};
`;

const LogoImage = styled.img`
  height: 40px;
  width: auto;
  object-fit: contain;
`;

const HeaderRightContent = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
