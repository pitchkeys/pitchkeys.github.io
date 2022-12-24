

//GET RID OF F CORS PROBLEMS

/*function APIget(props){
    const [incomingData, updateData] = React.useState([]);
    const [display, updateView] = React.useState({})
    
    React.useEffect(() => {
        
            fetch('https://blue-clean-eel.cyclic.app/api/songs/' + props.type + "/" + props.count)
            .then(res => res.text())
            .then(data => {
                
                if(JSON.stringify(incomingData) !== JSON.stringify(data)){
                    updateData(JSON.parse(data))
                    
                }
            })
        
        if(props.view == "grid"){
            updateView({width: "90%", marginLeft: "5%", display: "grid", gridTemplateColumns: "33% 33% 33% "})
            
        }else{
            updateView({width: "100%", display: "block"})
          
        }
    }, [])
    
    return(
        <div style = {display}>
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
}*/

import React, { Component } from 'react';
import SongPreview from "./SongPreview";

class APIget extends Component{
    state = {
        incomingData: [],
        view: {},
        matches: window.matchMedia("(orientation: landscape)").matches
    }

    componentDidMount(){
        const handler = e => this.setState({matches: e.matches})
        window.matchMedia("(orientation: landscape)").addEventListener('change', handler);
        fetch('https://blue-clean-eel.cyclic.app/api/songs/' + this.props.type + "/" + this.props.count)
        .then(res => res.text())
        .then(data => {
            this.setState({
                incomingData: JSON.parse(data)
            })
        })
    }

    returnGridFormat(){
        if(this.state.matches){
            if(this.props.view == "grid"){
                return {width: "85%", marginLeft: "7.5%", display: "grid", gridTemplateColumns: "33% 33% 33% "}
            }else{
                return {width: "100%", display: "block"}
            }
        }else{
            return{width: "90%", marginLeft: "5%", display: "grid", gridTemplateColumns: "100% "}
        }
        
    }
    render(){
        return(
        <div style = {this.returnGridFormat()}>
            {this.state.incomingData.map(s => (
                <SongPreview coverImage = {s.download.coverImage}
                view = {this.props.view}
                generatedLink = {"/music" + s.generatedLink} 
                songname = {s.songname} 
                desc = {s.desc} 
                duration = {s.duration} 
                downloadInfo = {s.download} 
                noteCount = {s.notecount} 
                date = {s.date}
                firstCol = {this.props.firstCol} 
                secondCol = {this.props.secondCol}
                stats = {s.stats}
                leftLine = {this.props.leftLine}
                format = "landscape"/>
            ))}
        </div>
        )
    }
}

export default APIget;

