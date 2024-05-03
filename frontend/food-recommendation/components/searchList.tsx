import React, { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/16/solid";

interface TextInputProps {
 ingredientList: { id: number; label: string; checked: boolean }[];
 setIngredientList: React.Dispatch<React.SetStateAction<{ id: number; label: string; checked: boolean }[]>>;
}

const SearchField: React.FC<TextInputProps> = ({ ingredientList , setIngredientList}) => {

  const [inputValue, setInputValue] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState<{ value: string; label: string }[]>([]);
  const [selectedItems, setSelectedItems] = useState<{ id: number; label: string; checked: boolean }[]>([]);

 useEffect(() => {
   const options = ingredientList.map((item) => ({
     value: item.label.toLowerCase(),
     label: item.label,
   }));

   setFilteredOptions(
     options.filter((option) =>
       option.label.toLowerCase().includes(inputValue.toLowerCase())
     )
   );
 }, [inputValue, ingredientList]);

 const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
   setInputValue(event.target.value);
   setIsDropdownOpen(true);
 };

 const handleItemSelect = (option: { value: string; label: string }) => {
   const selectedItem = ingredientList.find(
     (item) => item.label.toLowerCase() === option.value
   );
   if (selectedItem) {
     setSelectedItems([...selectedItems, selectedItem]);
     setIngredientList([...selectedItems, selectedItem]);
     setInputValue("");
     setIsDropdownOpen(false);
   }
 };

 const handleItemRemove = (index: number) => {
   const updatedList = [...selectedItems];
   updatedList.splice(index, 1);
   setSelectedItems(updatedList);
   setIngredientList(updatedList);
 };

 const handleClickOutside = (event: MouseEvent) => {
  if (event.target instanceof Element) {
    const dropdownElement = event.target;

    if (!dropdownElement.closest(".dropdown")) {
      setIsDropdownOpen(false);
    }
  }
};

useEffect(() => {
  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

 return (
    <div className="flex flex-col md:flex-row">
    <div className="relative">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Search ingredients..."
        className="m-5 text-lg border h-8 bg-white border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {isDropdownOpen && (
        <div className="absolute left-5 right-0 z-50">
          <ul className="bg-white dropdown text-sm container max-h-[300px] overflow-auto">
            {filteredOptions.map((option, index) => (
              <li
                key={index}
                onClick={() => handleItemSelect(option)}
                className="text-sm px-3 py-2 hover:bg-blue-100 cursor-pointer"
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
    <div className="m-5 text-sm flex flex-row form-control flex-wrap space-x-4 justify-center">
      <ul className="form-control flex-wrap flex-row justify-center">
        {selectedItems.map((item, index) => (
          <li key={item.id} className="flex flex-row items-center text-lg">
            {item.label}
            <XMarkIcon
              className="text-sm h-5 w-5 text-red-500 cursor-pointer"
              onClick={() => handleItemRemove(index)}
            />
          </li>
        ))}
      </ul>
    </div>
  </div>
 );
};

export default SearchField;