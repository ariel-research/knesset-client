import FadeLoader from "react-spinners/FadeLoader";
import styled from "styled-components";

const Loader = () => {
  return (
    <LoaderWrapper>
      <FadeLoader />
    </LoaderWrapper>
  );
};

export const LoaderWrapper = styled.div`
  position: absolute;
  top: 50%;
`;

export default Loader;
