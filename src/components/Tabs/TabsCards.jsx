import React, { useState } from "react";
import {
  TabButton,
  TabContainer,
  TabContent,
  TabDescription,
  TabHeader,
} from "./TabsCards.styled";

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
            id={`tab-${index + 1}_title`}
            key={index}
            active={activeTab === index}
            onClick={() => handleTabClick(index)}
          >
            {tab.title}
          </TabButton>
        ))}
      </TabHeader>
      <TabContent>
        <TabDescription id="tab_description">
          {tabsHeaders[activeTab].description &&
            tabsHeaders[activeTab].description}
        </TabDescription>
        {tabsHeaders[activeTab].content && tabsHeaders[activeTab].content}
        {tabsHeaders[activeTab].action && tabsHeaders[activeTab].action}
      </TabContent>
    </TabContainer>
  );
};

export default TabsCard;
