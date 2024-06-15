import React, { useState } from "react";
import * as Icons from "react-feather";
import { IconProps } from "react-feather";
import styled from "styled-components";

interface IconPicker {
  rowsInOnePage: number;
  columnsInOnePage: number;
  iconHeight: number;
  iconWidth: number;
  pickerHeight?: number;
  pickerWidth?: number;
  onSelect: (iconName: any) => void;
}

const IconPicker: React.FC<IconPicker> = ({
  rowsInOnePage,
  columnsInOnePage,
  pickerHeight = 500,
  pickerWidth = 500,
  iconHeight,
  iconWidth,
  onSelect,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const iconNames = Object.keys(Icons) as Array<keyof typeof Icons>;
  const iconsPerPage = rowsInOnePage * columnsInOnePage;

  const handleClick = (iconName: keyof typeof Icons) => {
    onSelect(iconName);
  };

  const GridContainer = styled.div<{
    columnsInOnePage: number;
    iconWidth: number;
  }>`
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(
      ${(props) => props.columnsInOnePage},
      ${(props) => props.iconWidth}px
    );
  `;

  const renderIcons = () => {
    const start = currentPage * iconsPerPage;
    const end = start + iconsPerPage;
    return iconNames.slice(start, end).map((iconName) => {
      const IconComponent = Icons[iconName];
      return (
        <div
          key={iconName}
          className="flex justify-center items-center cursor-pointer"
          style={{ width: iconWidth, height: iconHeight }}
          onClick={() => handleClick(iconName)}
        >
          <IconComponent size={iconHeight} />
        </div>
      );
    });
  };
  const totalPages = Math.ceil(iconNames.length / iconsPerPage);

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border shadow-lg px-4 z-50 ">
      <div
        className="bg-white p-4 overflow-auto grid gap-4"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${columnsInOnePage}, ${iconWidth}px)`,
          gridAutoRows: `${iconHeight}px`,
          gap: "1rem",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {renderIcons()}
      </div>
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setCurrentPage(Math.max(currentPage - 1, 0))}
          disabled={currentPage === 0}
          className="px-4 py-2 bg-gray-200 disabled:bg-gray-100"
        >
          Previous
        </button>
        <span>
          {currentPage + 1} / {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage(Math.min(currentPage + 1, totalPages - 1))
          }
          disabled={currentPage === totalPages - 1}
          className="px-4 py-2 bg-gray-200 disabled:bg-gray-100"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default IconPicker;
