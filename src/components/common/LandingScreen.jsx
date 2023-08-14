import styled from "styled-components";
import RectangleIcon from "../../assets/svg-icons/RectangleIcon";
import WomanOne from '../../assets/png-images/Woman_1.png';
import WomanTwo from '../../assets/png-images/Woman_2.png';
import ManOne from '../../assets/png-images/Man_1.png';
import ManTwo from '../../assets/png-images/Man_2.png';
import ManThree from '../../assets/png-images/Man_3.png';
import CompassIcon from "../../assets/svg-icons/CompassIcon";
import LeftMic from "../../assets/svg-icons/LeftMic";
import RightMic from "../../assets/svg-icons/RightMic";
import { palette } from "../../assets/colorsPalette";

const LandingScreen = () => {
    const header = "שקיפות בכנסת";

    return (
        <LandingScreenWrapper>
            <LandingScreenHeader>{header}</LandingScreenHeader>
            <PodiumContainer>
                <StyledWrapper>
                    <img src={WomanTwo} alt="React Logo" />
                    <RectangleIcon width='221' height='488' />
                </StyledWrapper>
                <StyledWrapper>
                    <img src={ManOne} alt="React Logo" />
                    <RectangleIcon width='276' height='509' />
                </StyledWrapper>
                <StyledWrapper>
                    <CompassIcon />
                    <MainStandWrapper>
                        {/* <LeftMic /> */}
                        <img src={ManThree} alt="React Logo" />
                        {/* <RightMic /> */}
                    </MainStandWrapper>
                    <RectangleIcon width='300' height='533' />
                </StyledWrapper>
                <StyledWrapper>
                    <img src={WomanOne} alt="React Logo" />
                    <RectangleIcon width='276' height='509' />
                </StyledWrapper>
                <StyledWrapper>
                    <img src={ManTwo} alt="React Logo" />
                    <RectangleIcon width='221' height='488' />
                </StyledWrapper>
            </PodiumContainer>
        </LandingScreenWrapper>
    )
};

const LandingScreenWrapper = styled.div`
display: flex;
flex-direction: column;
`;

const PodiumContainer = styled.div`
    display: flex;
    align-items: flex-end;
`;

export const LandingScreenHeader = styled.div`
  font-family: Open Sans;
  align-self: center;
  font-weight: 400;
  font-size: 40px;
  font-family: Poppins, sans-serif;
  color: ${palette.brand};
`;

const MainStandWrapper = styled.div`
    display: flex;
    align-items: flex-end;
`;

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export default LandingScreen;