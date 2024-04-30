'use client'
import React, { useState } from 'react';

interface CheckboxProps {
    list: { id: number; label: string; checked: boolean; }[];
    setList: React.Dispatch<React.SetStateAction<{ id: number; label: string; checked: boolean; }[]>>;
  }

  const Checkbox: React.FC<CheckboxProps> = ({ list, setList }) => {
    
  const [checkedItems, setCheckedItems] = useState<number[]>([]);

  const handleCheckboxChange = (id:any) => {
    const updatedList = list.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setList(updatedList);
    const checkedItemsIds = updatedList.filter((item) => item.checked).map((item) => item.id);
    setCheckedItems(checkedItemsIds);
  };

  return (
    <div className="flex flex-row">
      <div className="form-control flex-wrap flex-row justify-center">
        {list.map((item) => (
          <label key={item.id} className="label cursor-pointer">
            <span className="label-text text-center font-light px-1">{item.label}</span>
            <input
              type="checkbox"
              checked={item.checked}
              onChange={() => handleCheckboxChange(item.id)}
              className="checkbox"
            />
          </label>
        ))}
      </div>
      {/* <div>
        <h2>Checked Items</h2>
        <ul>
          {checkedItems.map((id) => (
            <li key={id}>{list.find((item) => item.id === id).label}</li>
          ))}
        </ul>
      </div> */}
    </div>
  );
}

export default Checkbox;
