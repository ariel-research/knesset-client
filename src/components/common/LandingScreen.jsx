import styled from "styled-components";

const LandingScreen = () => {
  return (
    <NavBar>
      <NavInner>
      <Brand>
        <LogoMark>
          {/* layers / stacks icon — matches the VoteMate identity */}
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z"/>
            <path d="M2 17l10 5 10-5"/>
            <path d="M2 12l10 5 10-5"/>
          </svg>
        </LogoMark>
        <BrandText>
          <BrandName>VoteMate</BrandName>
          <BrandSub>מצפן הצבעות כנסת</BrandSub>
        </BrandText>
      </Brand>

      <KnessetPill>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2"/>
          <path d="M8 21h8M12 17v4"/>
        </svg>
        כנסת 25
      </KnessetPill>
      </NavInner>
    </NavBar>
  );
};

export default LandingScreen;

const NavBar = styled.header`
  width: 100%;
  align-self: stretch;
  height: 62px;
  background: #1b2a45;
  box-shadow: 0 2px 14px rgba(0,0,0,.22);
  position: sticky;
  top: 0;
  z-index: 100;
`;

const NavInner = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  height: 100%;
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  direction: rtl;
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const LogoMark = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 9px;
  background: linear-gradient(140deg, #6366f1, #2563eb);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 10px rgba(99,102,241,.45);
  flex-shrink: 0;
`;

const BrandText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
`;

const BrandName = styled.span`
  font-size: 1.18rem;
  font-weight: 800;
  color: #fff;
  letter-spacing: -0.015em;
  line-height: 1.15;
`;

const BrandSub = styled.span`
  font-size: 0.68rem;
  color: #93c5fd;
  font-weight: 400;
  letter-spacing: 0.01em;
`;

const KnessetPill = styled.div`
  display: flex;
  align-items: center;
  gap: 0.38rem;
  background: rgba(255,255,255,.08);
  border: 1px solid rgba(255,255,255,.14);
  color: #cbd5e1;
  font-size: 0.78rem;
  font-weight: 600;
  padding: 0.3rem 0.85rem;
  border-radius: 20px;
`;
