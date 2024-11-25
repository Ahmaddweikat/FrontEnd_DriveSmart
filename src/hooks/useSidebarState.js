import { useState } from "react";

const useSidebarState = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleSidebar = () => setIsExpanded((prev) => !prev);

  return { isExpanded, toggleSidebar };
};

export default useSidebarState;
