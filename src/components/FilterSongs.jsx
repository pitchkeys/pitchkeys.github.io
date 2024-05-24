import SongPreview from "./SongPreview";
import React, { Component } from 'react';

class FilterSongs extends Component {
    state = { 
        incoming: [],
        display: {display: "grid", gridTemplateColumns: "33% 33% 33%", width: "90%", marginLeft: "7.5%"},
        view: "grid",
        initial: JSON.stringify(this.props.filters),
        matches: window.matchMedia("(orientation: landscape)").matches,
        dataIn: false
    } 

    changeView(e){
   
        if(e.target.value === "grid"){
            this.setState({
                /*display: {display: "grid", gridTemplateColumns: "33% 33% 33%", width: "90%", marginLeft: "7.5%"},*/
                view: "grid"
            })

        }else{
            this.setState({
                /*display: {display: "block"},*/
                view: "normal"
            })
        }
        
    }

    obtainView(){
        if(this.state.matches){
            if(this.state.view === "grid"){
                return({display: "grid", gridTemplateColumns: "33% 33% 33%", width: "95%", marginLeft: "3%"})
            }else{
                return({display: "block"})
            }
        }else{
            if(this.state.view === "grid"){
                return ({width: "90%", marginLeft: "5%",  display: "grid", gridTemplateColumns: "100%"})
            }else{
                return({display: "block"})
            }
        }
    }

    componentDidMount(){
        const handler = e => this.setState({matches: e.matches})
        window.matchMedia("(orientation: landscape)").addEventListener('change', handler)
        fetch('https://pitchkeys.up.railway.app/api/songs').then(res => res.text())
            .then(data => {
                this.setState({
                    dataIn: true,
                    incoming: JSON.parse(data)
                })      
            }) 
    }

    componentDidUpdate() {
        //console.log(JSON.stringify(this.props.filters))
        
        if(this.props.filters != undefined){
            if(JSON.stringify(this.props.filters) != this.state.initial){
                this.setState({
                    initial: JSON.stringify(this.props.filters)
                })
                /*console.log('https://pitchkeys.up.railway.app/search?types=' + 
                this.props.filters.types.join("") + 
                "&files=" + this.props.filters.files.join("") + 
                "&noteCount=" + this.props.filters.numericalFilters[0].moreThan + "," + this.props.filters.numericalFilters[0].lessThan + 
                "&bpm=" + this.props.filters.numericalFilters[1].moreThan + "," + this.props.filters.numericalFilters[1].lessThan + 
                "&rating=" + this.props.filters.numericalFilters[2].moreThan + "," + this.props.filters.numericalFilters[2].lessThan + 
                "&duration=" + this.props.filters.numericalFilters[3].moreThan + "," + this.props.filters.numericalFilters[3].lessThan + 
                "&numRatings=" + this.props.filters.numericalFilters[4].moreThan + "," + this.props.filters.numericalFilters[4].lessThan + 
                "&order=" + this.props.filters.type + "," + this.props.filters.order)*/

                fetch('https://pitchkeys.up.railway.app/search?types=' + 
                this.props.filters.types.join("") + 
                "&files=" + this.props.filters.files.join("") + 
                "&noteCount=" + this.props.filters.numericalFilters[0].moreThan + "," + this.props.filters.numericalFilters[0].lessThan + 
                "&bpm=" + this.props.filters.numericalFilters[1].moreThan + "," + this.props.filters.numericalFilters[1].lessThan + 
                "&rating=" + this.props.filters.numericalFilters[2].moreThan + "," + this.props.filters.numericalFilters[2].lessThan + 
                "&duration=" + this.props.filters.numericalFilters[3].moreThan + "," + this.props.filters.numericalFilters[3].lessThan + 
                "&numRatings=" + this.props.filters.numericalFilters[4].moreThan + "," + this.props.filters.numericalFilters[4].lessThan + 
                "&order=" + this.props.filters.type + "," + this.props.filters.order)
                .then(res => res.text())
                .then(data => {
                    //NUMRATINGS + RATING NEEDS PROCESSING
                    let processedData = JSON.parse(data)
                    let splitArray = this.props.filters.query.toLowerCase().split(" ")
                    let relevanceArray = [];
                    console.log(splitArray)
                    if(splitArray[0] !== ""){
                        processedData.forEach(e => {
                            let hits = 0;
                            splitArray.forEach(s => {
                                console.log(s)
                                
                                    if(splitArray.indexOf(s) === splitArray.length-1  && (s != "")){
                                        //runs if this is the last one
                                        e.keywords.forEach(k => {
                                            if (k.includes(s) ){
                                                hits+=0.1;
                                            }
                                        })
                                    }
                                    if(e.keywords.includes(s)){
                                        hits++;
                                    }
                            
                                
                            })
                        relevanceArray.push(hits);
                        })
                    }else{
                        processedData.forEach(e => {
                            relevanceArray.push(1)
                        })
                    }
                    //process this array
                    for(let i = 0; i < relevanceArray.length; i++){
                        if(relevanceArray[i] === 0 || (relevanceArray[i] < (Math.max(...relevanceArray)*0.1))){
                            relevanceArray.splice(i, 1);
                            processedData.splice(i, 1);
                            i--;
                        }
                    }
                    //taking into account ratings and numRatings

                    for(let i = 0; i < processedData.length; i++){
                        let sum = 0;
                            if(processedData[i].stats.ratings.length > 0){
                                processedData[i].stats.ratings.forEach(f => {
                                    sum+=parseInt(f);
                                })
                                processedData[i].avgrating = (sum / processedData[i].stats.ratings.length).toFixed(2)
                            }else{
                                processedData[i].avgrating = 0;
                            }

                        if(processedData[i].stats.ratings.length < this.props.filters.numericalFilters[4].moreThan || 
                        processedData[i].stats.ratings.length > this.props.filters.numericalFilters[4].lessThan || 
                        processedData[i].avgrating < this.props.filters.numericalFilters[2].moreThan || 
                        processedData[i].avgrating > this.props.filters.numericalFilters[2].lessThan){
                            
                            processedData.splice(i, 1);
                            relevanceArray.splice(i,1)
                            i--;
                        }
                    }
                    
                    if(this.props.filters.type == "relevance" || this.props.filters.type == "numRatings" || this.props.filters.type == "rating" || this.props.filters.type == "download"){
                        let sortingOrder = this.props.filters.order
                        let tempArr = [];
                        let type = ""
                        if (this.props.filters.type == "numRatings"){
                            processedData.forEach(e => {
                                tempArr.push(e.stats.ratings.length);
                            })
                        }else if (this.props.filters.type == "rating"){
                            processedData.forEach(e => {
                                let sum = 0;
                                if(e.stats.ratings.length > 0){
                                    e.stats.ratings.forEach(f => {
                                        sum+=parseInt(f);
                                    })
                                    tempArr.push(sum / e.stats.ratings.length).toFixed(2)
                                }else{
                                    tempArr.push(0)
                                }
                            })
                        }else if (this.props.filters.type === "download"){
                            processedData.forEach(e => {
                                let downloads = 0;
                                let keys = Object.keys(e.stats).slice(1);
                                keys.forEach(f => {
                                    if (e.stats[f] && f !== "visits"){
                                        downloads+=parseInt(e.stats[f])
                                    }
                                })
                                tempArr.push(downloads);
                            })
    
                        }else if (this.props.filters.type === "relevance"){ 
                            tempArr = relevanceArray
                        }

                        //insertionsort
                        for (let i = 0; i < tempArr.length; i++){
                            let minPos = -1;
                            let minNum = Number.MAX_VALUE;
                            for (let j = i; j < tempArr.length; j++){
                                if (tempArr[j]< minNum){
                                    minPos = j;
                                    minNum = tempArr[j]
                                }
                            }
                            //swap tempArr
                            let t = tempArr[i];
                            tempArr[i] = tempArr[minPos]
                            tempArr[minPos] = t

                            //swap
                            let temp = processedData[i];
                            processedData[i] = processedData[minPos]           
                            processedData[minPos] = temp;
                        }
                            
                        if(this.props.filters.order == -1){
                            processedData.reverse()
                        }
                        //set state

                        if(JSON.stringify(processedData) !== JSON.stringify(this.state.incoming)){
                            /*console.log("Data is: " + insertionSort(sortingOrder) + " | and");*/
                            this.setState({dataIn: true, incoming: processedData})
                        }
 
                    }else{
                        if(JSON.stringify(this.state.incoming)!=data){
                            //console.log("data is different")
                            this.setState({
                                dataIn: true,
                                incoming: processedData
                            }) 
                        }
                    }
                })
            }
        }else{       
            fetch('https://pitchkeys.up.railway.app/api/songs').then(res => res.text())
            .then(data => {
                this.setState({
                    incoming: JSON.parse(data),
                    dataIn: true,
                })      
            }) 
        }
    }
    
    render() { 
        return(
            //use componentdidupdate on SongPreview.jsx
            <div id = 'searchResults' style = {{marginLeft: "-1%", zIndex: 0, width: "100%"}}>
                <div id = "topFlex" style = {{display: "flex", marginLeft: "-6%"}}>
                    {<p id = "numHits" style={{color: "white"}}><b>{this.state.incoming.length}</b> results found.</p>}
   
                    {(this.state.matches) && <div>
                        <label id = "viewByText" htmlFor="">View by...</label>
                        <select id = "selector" onChange = {(e) => this.changeView(e)} style={{ fontFamily: "IBM plex sans, sans serif", margin: "1% 0 3% 1%", outline: "none"}}>
                        <option value="grid" className = "viewSwitcherOption" selected >Grid</option>
                        <option value="row" className = "viewSwitcherOption">Row</option>
                        </select>
                        </div>}
                </div>

                {(this.state.incoming.length == 0 && !this.state.dataIn) && <center className = "fetchingMsg">Fetching...</center>}

                {(this.state.incoming.length == 0 && this.state.dataIn) && <center className = "fetchingMsg">No Results Found</center>}
                
                
                {(this.state.incoming.length > 0) && <div style = {this.obtainView()}>
                    {this.state.incoming.map(s => (
                    <SongPreview coverImage = {s.download.coverImage}
                    j = {s} 
                    songId = {this.state.incoming.indexOf(s)}
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
                    isPlaying = {false}
                    view = {this.state.view}
                    format = "landscape"/>
                    ))}
                </div>}
                
            </div>
        )
    }
}
 
export default FilterSongs;


