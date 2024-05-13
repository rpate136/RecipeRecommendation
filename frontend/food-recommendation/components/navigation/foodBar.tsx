import React, { useState , useEffect } from 'react';
import Search from "../../public/svg/search.svg";
import AddBtn from "../../public/svg/add.svg"

interface FoodNavBarProps {
  display: string;
  handleClick: (display: string) => void;
}

export default function FoodNavBar({ display,handleClick }: FoodNavBarProps) {

  // const [currentDisplay, setCurrentDisplay] = useState<string>(display);

  return (
    <div className="w-fit ml-auto mr-auto mt-0 my-2 text-center">
      <h1 className='font-bold font-sans'>Food Recipies</h1>
      <button className='btn bg-neutral text-white' onClick={() => handleClick('pantry')}>
        <AddBtn height='25' width='25'></AddBtn>
        <span className="btm-nav-label">Edit My Pantry</span>
      </button>
      <button className='btn bg-neutral text-white' onClick={() => handleClick('recipes')}>
        <Search height='25' width='25'></Search>
        <span className="btm-nav-label">Get Recipies</span>
      </button>
      <button className='btn bg-neutral text-white' onClick={() => handleClick('upload')}>
        <Search height='25' width='25'></Search>
        <span className="btm-nav-label">Upload Reciept</span>
      </button>
    </div>
  );
}
