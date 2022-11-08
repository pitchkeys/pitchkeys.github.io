import React from "react"
import SongPreview from "./SongPreview";

function APIget(props){
    const [incomingData, updateData] = React.useState([]);
    const [view, updateView] = React.useState({})

    React.useEffect(() => {
        fetch('https://blue-clean-eel.cyclic.app/api/songs/' + props.type + "/" + props.count)
        .then(res => res.text())
        .then(data => {updateData(JSON.parse(data))})

        if(props.view == "grid"){
            updateView({width: "90%", marginLeft: "5%", display: "grid", gridTemplateColumns: "33% 33% 33% "})
        }else{
            updateView({width: "100%"})
        }
    }, [incomingData])
    
    return(
        <div style = {view}>
            {incomingData.map(s => (
                <SongPreview coverImage = {s.download.coverImage}
                view = {props.view}
                generatedLink = {"/music" + s.generatedLink} 
                songname = {s.songname} 
                desc = {s.desc} 
                duration = {s.duration} 
                downloadInfo = {s.download} 
                noteCount = {s.notecount} 
                date = {s.date}
                firstCol = {props.firstCol} 
                secondCol = {props.secondCol}
                stats = {s.stats}
                leftLine = {props.leftLine}
                format = "landscape"/>
            ))}
        </div>
    )
}

export default APIget;

