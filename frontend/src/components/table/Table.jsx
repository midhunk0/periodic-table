import React, { useEffect, useState } from "react";
import "./Table.css";
import data from "../../data.json";
import { useNavigate } from "react-router-dom";
import Loader from "../loader/Loader";

export default function Table({ filterOption }){
    const navigate=useNavigate();
    const elements=data.elements;
    const [showElements, setShowElements]=useState(elements);
    const [loading, setLoading]=useState(true);
    const [hover, setHover]=useState("");

    useEffect(()=>{
        const timer=setTimeout(()=>setLoading(false), 2000);
        return ()=>clearTimeout(timer);
    }, []);
    
    useEffect(()=>{
        const data=filterOption.value==="all" ? 
            elements : [...elements.filter((element)=>
                element.block===filterOption.value || 
                element.phase===filterOption.value || 
                element.category===filterOption.value
            )];
        setShowElements(data);
    }, [elements, filterOption]);
    
    if(loading){
        return <Loader/>
    }

    return(
        <div className="table">
            <h1>{filterOption.name}</h1>
            {Array.from({ length: 10 }, (_, rowIndex)=>(
                <div className="table-row" key={rowIndex}>
                {Array.from({ length: 18 }, (_, colIndex)=>{
                    const element=elements.find((element)=>element.ypos-1===rowIndex && element.xpos-1===colIndex);
                    if(rowIndex===5 && colIndex===2){
                        return(
                            <div className="table-f lanthanide" onMouseEnter={()=>setHover("lanthanide")} onMouseLeave={()=>setHover("")} key={colIndex}>
                                <p className="table-f-number">57-71</p>
                            </div>
                        )
                    }
                    if(rowIndex===6 && colIndex===2){
                        return(
                            <div className="table-f actinide" onMouseEnter={()=>setHover("actinide")} onMouseLeave={()=>setHover("")} key={colIndex}>
                                <p className="table-f-number">89-103</p>
                            </div>
                        )
                    }
                    return(
                        <div 
                            className={`table-element 
                                ${element?.block} ${hover===element?.category ? "hover" : ""} 
                                ${showElements.find((showElement)=>showElement?.number===element?.number) ? "active" : ""}
                            `} 
                            key={colIndex} 
                            onClick={()=>element && navigate(`/element/${element?.number}`)}
                        >
                            <p className="table-element-number">{element?.number}</p>
                            <p className="table-element-symbol">{element?.symbol}</p>
                        </div>
                    )
                })}
                </div>
            ))}
        </div>
    )
}