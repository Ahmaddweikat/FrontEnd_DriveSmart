import React from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const Dropdown = ({ title, icon, items }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div
      className="relative mx-2"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        className={`text-white flex items-center font-medium text-sm ${
          isOpen ? "text-customGreen" : "hover:text-customGreen"
        }`}
      >
        {icon}
        {title}
        <ArrowDropDownIcon className="h-3 w-3 ml-2" />
      </button>
      {isOpen && (
        <div className="absolute left-0 top-full bg-white border rounded shadow-lg z-50 w-48 font-medium text-sm">
          {items.map((item) => (
            <button
              key={item}
              className="w-full text-left py-2 px-4 hover:bg-gray-200"
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
