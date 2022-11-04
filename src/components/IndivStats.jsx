import React from "react";
import "./indivstat.css"

export default function IndivStats(props){
    return(
        <div id = 'container'>
            <div id = 'outerGradient' style = {{backgroundImage: "linear-gradient(45deg, " + props.color1 + "," + props.color2 + ")"}}>
                <div id = 'innerGradient'>
                    <div id = 'info'>
                        <div id = "text" style = {{fontFamily: "Titillium Web', sans-serif"}}>{props.stat}</div>
                        <p id = 'description'>{props.desc}</p>
                    </div>
                    
                </div>
            </div>
            
        </div>
    )
}