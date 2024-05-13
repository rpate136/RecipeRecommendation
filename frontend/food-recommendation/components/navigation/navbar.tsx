"use client"
import React,{ useEffect,useState} from "react";

import CocktailSVG from '../../public/svg/cocktail.svg';
import Cutlery from '../../public/svg/cutlery.svg';

export default function Navbar() {  
  
  const [theme, setTheme] = useState<string>('cupcake');

  // Update state based on toggle
  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  // Set theme state in localStorage on mount and update localStorage on state change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('data-theme', theme || 'cupcake');
      const localTheme = localStorage.getItem('data-theme');
      // Add custom data-theme attribute to html tag required to update theme using DaisyUI
      document.documentElement.setAttribute('data-theme', localTheme || 'cupcake');
    }
  }, [theme]);
  
  
  return (
    <div className="">
    <div className="navbar w-full bg-neutral text-white">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li><a href="/">Home</a></li>
            <li><a href="/cocktails/recommendation">Cocktails</a></li>
            <li><a href="/food/recipie">Food</a></li>
          </ul>
        </div>
    </div>
      <div className="navbar-center">
        <a href='/' className="btn btn-ghost text-lg lg:text-4xl font-serif font-extrabold">What should I make?</a>
      </div>
      <div className="navbar-end">
      <button className="btn btn-square btn-ghost">
          <label className="swap swap-rotate w-12 h-12">
            <input
              type="checkbox"
              onChange={handleToggle}
              // show toggle image based on localstorage theme
              checked={theme === "light" ? false : true}
            />
          {/* sun icon */}
          <svg className="swap-off fill-current w-7 h-7 md:w-10 md:h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>
          {/* moon icon */}
          <svg className="swap-on fill-current w-7 h-7 md:w-10 md:h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>  
        </label>
        </button>
      </div>
    </div>

    <div className="w-fit ml-auto mr-auto mt-0">
      <ul className="menu menu-horizontal bg-base-300 mt-0 flex space-x-4">
        <li><a className="tooltip bg-white hover:bg-transparent" data-tip="Cocktails" href="/cocktails/recommendation"> <CocktailSVG height='30' width='30'></CocktailSVG></a></li>
        <li><a className="tooltip bg-white" data-tip="Food" href="/food/recipie"><Cutlery height='30' width='30'></Cutlery></a></li>
        {/* <li><a className="tooltip bg-white" data-tip="Stats"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg></a></li> */}
      </ul>
    </div>    
    
    </div>

  );
}
