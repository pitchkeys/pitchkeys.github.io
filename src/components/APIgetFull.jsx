import React from "react";
import IndivStats from "./IndivStats";

export default function APIgetFull(props){
    const [incomingDataFull, updateData] = React.useState([]);
    const [sum, updateSum] = React.useState("Fetching...");
    const [time, updateTime] = React.useState("Fetching...");

    React.useEffect(() => {
        console.log('why isn\'t this api working')
        if(incomingDataFull.length == 0){
            fetch('https://blue-clean-eel.cyclic.app/api/songs/')
            .then(res => res.text())
            .then(data => {updateData(JSON.parse(data))})
        }
        
        let s = 0;
        let time = 0;
        for (let i = 0; i < incomingDataFull.length; i++){
            s+=parseInt(incomingDataFull[i].notecount);
            time+=parseInt(incomingDataFull[i].duration)
        }
        updateSum(s);
        let temp = time;
        time = Math.floor(temp/3600) + ":" + Math.floor((temp%3600)/60) + ":" + Math.round(((temp%3600)/60 - Math.floor((temp%3600)/60))*60);
        updateTime(time);
    },[incomingDataFull])
    
    return(
        <div style={{display: "flex", width: "85%", marginLeft: "7.5%", justifyContent: "center"}}>
            <IndivStats desc = "songs uploaded" stat = {incomingDataFull.length} color1 = {props.color1} color2 = {props.color2}/>
            <IndivStats desc = "notes transcribed" stat = {sum.toLocaleString("en-US")} color1 = {props.color1} color2 = {props.color2}/>
            <IndivStats desc = "total duration" stat = {time} color1 = {props.color1} color2 = {props.color2}/>
        </div>
    )
}
