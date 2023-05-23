import React, { useState } from "react";
import styled from "styled-components";
import { palette } from "../../assets/colorsPalette";

const TabsCard = (props) => {
  const { tabsHeaders } = props;

  const [activeTab, setActiveTab] = useState(tabsHeaders.length - 1);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <TabContainer>
      <TabHeader>
        {tabsHeaders.map((tab, index) => (
          <TabButton
            key={index}
            active={activeTab === index}
            onClick={() => handleTabClick(index)}
          >
            {tab.title}
          </TabButton>
        ))}
      </TabHeader>
      <TabContent>
        <TabDescription>
          {tabsHeaders[activeTab].description &&
            tabsHeaders[activeTab].description}
        </TabDescription>
        {tabsHeaders[activeTab].content && tabsHeaders[activeTab].content}
        {tabsHeaders[activeTab].action && tabsHeaders[activeTab].action}
      </TabContent>
    </TabContainer>
  );
};

const TabContainer = styled.div`
  width: 100%;
  max-width: 500px;
`;

const TabHeader = styled.div`
  display: flex;
  justify-content: center;
`;

const TabButton = styled.button`
  padding: 10px 20px;
  background-color: white;
  font-size: 16px;
  border-right: ${(props) => (props.active ? "1px solid #dee2e6" : "none")};
  border-left: ${(props) => (props.active ? "1px solid #dee2e6" : "none")};
  border-top: ${(props) => (props.active ? `5px solid ${palette.brand}` : "none")};
  border-bottom: ${(props) => (props.active ? `1px solid ${palette.bleakWhite}` : "none")};
  color: ${palette.brand};
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.active ? "blue" : "lightgray")};
  }
`;

const TabContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 100px;
  align-items: center;
  border: 1px solid #dee2e6;
  padding: 20px;
  gap: 10px;
`;

const TabDescription = styled.div`
  font-weight: 500;
  color: ${palette.greyish};
`;

export default TabsCard;
