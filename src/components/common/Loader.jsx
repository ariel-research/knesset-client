import styled, { keyframes } from "styled-components";

const ROWS = 6;

const Loader = () => (
  <SkeletonWrap>
    {Array.from({ length: ROWS }).map((_, i) => (
      <SkeletonRow key={i}>
        <Shimmer style={{ width: "72px", flexShrink: 0 }} />
        <Shimmer style={{ width: "38px", flexShrink: 0 }} />
        <Shimmer style={{ flex: 1 }} />
        <Shimmer style={{ width: "26px", flexShrink: 0 }} />
        <Shimmer style={{ width: "90px", flexShrink: 0 }} />
      </SkeletonRow>
    ))}
  </SkeletonWrap>
);

export default Loader;

const shimmerAnim = keyframes`
  0%   { background-position: -800px 0; }
  100% { background-position:  800px 0; }
`;

const SkeletonWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.95rem;
  padding: 1rem;
  background: #fff;
  border-radius: 12px;
  border: 1px solid #e2e8f2;
  box-shadow: 0 2px 8px rgba(0,0,0,.06);
`;

const SkeletonRow = styled.div`
  display: flex;
  gap: 0.8rem;
  align-items: center;
`;

const Shimmer = styled.div`
  height: 12px;
  border-radius: 5px;
  background: linear-gradient(90deg, #edf0f7 25%, #e4e9f2 50%, #edf0f7 75%);
  background-size: 1600px 100%;
  animation: ${shimmerAnim} 1.5s infinite;
`;
