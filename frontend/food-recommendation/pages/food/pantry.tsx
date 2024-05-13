import React, { useState,useEffect } from 'react';

interface RecipieProps {
    
}

export default function Recipie () {    
    
    const [display,setDisplay] = useState<string>('search');
     
    return (  
        
        <>
        {display=='pantry' && <h1>pantry</h1>}
        {display=='recipes' && <h1>recipes</h1>}
        {display=='upload' && <h1>upload</h1>}
        </>
    );

}
