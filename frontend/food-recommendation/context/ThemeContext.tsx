"use client"
import {createContext, useState, useEffect} from "react";

// type ThemeContextValue = { theme: string; changeTheme: (theme: string) => void }
// const ThemeContext = createContext<ThemeContextValue>("", (theme: string) => void)

export const ThemeContext = createContext("");

export const ThemeProvider = ({children}: any) => {
    const [theme, setTheme] = useState("light");
    const [isMounted, setIsMounted] = useState(false);

    useEffect (() => {
        setIsMounted (true);
        const storedTheme = localStorage.getItem ("theme") || "light";
        setTheme(storedTheme);

    }, [])

    if(!isMounted) {
        return <>Loading...</>
    }

    const changeTheme = (theme:string) => {
        setTheme(theme);
        localStorage.setItem("theme", theme);
    };

    return (
        <ThemeContext.Provider value={{ theme, changeTheme }}> 
        {children}
        </ThemeContext.Provider>
    );
    
};

// "use client"
// import { createContext, useState, useEffect } from "react";

// type ThemeContextValue = { theme: string; changeTheme: (theme: string) => void };
// export const ThemeContext = createContext<ThemeContextValue>({ theme: "light", changeTheme: () => {} });

// export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
//   const [theme, setTheme] = useState("light");
//   const [isMounted, setIsMounted] = useState(false);

//   useEffect(() => {
//     setIsMounted(true);
//     const storedTheme = localStorage.getItem("theme") || "light";
//     setTheme(storedTheme);
//   }, []);

//   if (!isMounted) {
//     return <div>Loading...</div>;
//   }

//   const changeTheme = (theme: string) => {
//     setTheme(theme);
//     localStorage.setItem("theme", theme);
//   };

//   return (
//     <ThemeContext.Provider value={{ theme, changeTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };
