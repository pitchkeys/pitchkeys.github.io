

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
    }

    componentDidMount(){
        if(this.props.view == "grid"){
            this.setState({
                view: {width: "90%", marginLeft: "5%", display: "grid", gridTemplateColumns: "33% 33% 33% "}
            })
           
        }else{
            this.setState({
                view: {width: "100%", display: "block"}
            })
        }

        fetch('https://blue-clean-eel.cyclic.app/api/songs/' + this.props.type + "/" + this.props.count)
        .then(res => res.text())
        .then(data => {
            this.setState({
                incomingData: JSON.parse(data)
            })
        })
    }
    componentDidUpdate(){
        console.log('updated');
        if(this.props.view == "grid"){
            if(JSON.stringify(this.state.view)!= JSON.stringify({width: "90%", marginLeft: "5%", display: "grid", gridTemplateColumns: "33% 33% 33% "})){
                this.setState({
                    view: {width: "90%", marginLeft: "5%", display: "grid", gridTemplateColumns: "33% 33% 33% "}
                })
            }  
        }else{
            if(JSON.stringify(this.state.view) != JSON.stringify({width: "100%", display: "block"})){
            this.setState({              
                    view: {width: "100%", display: "block"}
                })
            }
        }
    }

    render(){
        return(
        <div style = {this.state.view}>
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

