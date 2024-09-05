import { useState } from "react";

export const useStatusTab = () => {
  const [activeTab, setActiveTab] = useState<"prepare" | "result">("prepare");

  const tabClick = (tab: "prepare" | "result") => {
    setActiveTab(tab);
    console.log(`Tab clicked: ${tab}`);
  };

  return {
    activeTab,
    tabClick,
  };
};
