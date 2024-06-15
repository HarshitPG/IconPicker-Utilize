import IconPicker from "@/components/IconPicker";
import React, { useState } from "react";
import * as Icons from "react-feather";

const Home: React.FC = () => {
  const [selectedIcon, setSelectedIcon] = useState<keyof typeof Icons | null>(
    null
  );
  const [pickerVisible, setPickerVisible] = useState(true);

  const handleSelectIcon = (iconName: keyof typeof Icons) => {
    setSelectedIcon(iconName);
    setPickerVisible(false);
  };

  const SelectedIconComponent = selectedIcon ? Icons[selectedIcon] : null;

  return (
    <div className="flex justify-center items-center ">
      <div
        className="flex justify-center items-center"
        onClick={() => setPickerVisible(true)}
      >
        {SelectedIconComponent ? (
          <SelectedIconComponent
            size={50}
            onClick={() => {
              setSelectedIcon(null);
              setPickerVisible(true);
            }}
          />
        ) : (
          <>
            {pickerVisible && (
              <div
                onClick={(e) => {
                  setPickerVisible(true);
                  e.stopPropagation();
                }}
              >
                <IconPicker
                  rowsInOnePage={4}
                  columnsInOnePage={4}
                  iconHeight={50}
                  iconWidth={50}
                  onSelect={handleSelectIcon}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
