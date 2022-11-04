import SongPreview from "./SongPreview";
import React, { Component } from 'react';

class FilterSongs extends Component {
    state = { 
        incoming: [],
        display: {display: "grid", gridTemplateColumns: "33% 33% 33%", width: "90%", marginLeft: "7.5%"},
        view: "grid"
    } 

    changeView(e){
        if(e.target.value == "grid"){
            this.setState({
                display: {display: "grid", gridTemplateColumns: "33% 33% 33%", width: "90%", marginLeft: "7.5%"},
                view: "grid"
            })

        }else{
            this.setState({
                display: {display: "block"},
                view: "normal"
            })
           
        }
    }

    componentDidUpdate() {
        console.log(JSON.stringify(this.props.filters))
        if(this.props.filters != undefined){
            /*console.log('http://127.0.0.1:9000/search?types=' + 
            this.props.filters.types.join("") + 
            "&files=" + this.props.filters.files.join("") + 
            "&noteCount=" + this.props.filters.numericalFilters[0].moreThan + "," + this.props.filters.numericalFilters[0].lessThan + 
            "&bpm=" + this.props.filters.numericalFilters[1].moreThan + "," + this.props.filters.numericalFilters[1].lessThan + 
            "&rating=" + this.props.filters.numericalFilters[2].moreThan + "," + this.props.filters.numericalFilters[2].lessThan + 
            "&duration=" + this.props.filters.numericalFilters[3].moreThan + "," + this.props.filters.numericalFilters[3].lessThan + 
            "&numRatings=" + this.props.filters.numericalFilters[4].moreThan + "," + this.props.filters.numericalFilters[4].lessThan + 
            "&order=" + this.props.filters.type + "," + this.props.filters.order)*/

            fetch('https://pitchkeys-api.herokuapp.com/search?types=' + 
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

                let processedData = JSON.parse(data)
                //the "hits" property is a problem and keeps on spamming the console.
                //console.log(data == JSON.stringify(this.state.incoming))
                //console.log("Data is: " + data + " | " + "and this.state.incoming is: " + JSON.stringify(this.state.incoming))
                //console.log("states r different");
                let splitArray = this.props.filters.query.toLowerCase().split(" ")
                let relevanceArray = [];
                if(splitArray.length > 0){
                    processedData.forEach(e => {
                        let hits = 0;
                        splitArray.forEach(s => {
                            if(splitArray.indexOf(s) == splitArray.length-1){
                                //runs if this is the last one
                                e.keywords.forEach(k => {
                                    if (k.includes(s)){
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
                }

                //process this array
                for(let i = 0; i < relevanceArray.length; i++){
                    if(relevanceArray[i] == 0){
                        relevanceArray.splice(i, 1);
                        processedData.splice(i, 1);
                        i--;
                    }
                }
                console.log(relevanceArray)
                    
                for (let i = 0; i < processedData.length; i++){      
                    if(processedData[i].hits < 1){
                        processedData.splice(i, 1)
                        i--;
                    }
                }

                console.log(processedData)
                            
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
                    }else if (this.props.filters.type == "download"){
                        processedData.forEach(e => {
                            let downloads = 0;
                            let keys = Object.keys(e.stats).slice(1);
                            keys.forEach(f => {
                                if (e.stats[f] && f != "visits"){
                                    downloads+=parseInt(e.stats[f])
                                }
                            })
                            tempArr.push(downloads);
                        })

                    }else if (this.props.filters.type == "relevance"){ 
                        tempArr = relevanceArray
                    }

                    if(JSON.stringify(insertionSort(sortingOrder)) != JSON.stringify(this.state.incoming)){
                        console.log("Data is: " + insertionSort(sortingOrder) + " | and");
                        this.setState({incoming: insertionSort(sortingOrder)})
                    }

                    function insertionSort(sort){
                        for (let i = 0; i < tempArr.length-1; i++){
                            let minPos = -1;
                            let minNum = Number.MAX_VALUE;
                            for (let j = i; j < tempArr.length; j++){
                                if (tempArr[j]< minNum){
                                    minPos = j;
                                    minNum = tempArr[j]
                                }
                            }
                            //swap
                            let temp = processedData[i];
                            processedData[i] = processedData[minPos]
                            processedData[minPos] = temp;

                            //swap tempArr
                            let t = tempArr[i];
                            tempArr[i] = tempArr[minPos]
                            tempArr[minPos] = t
                        }
                            
                        if(sort == -1){
                            //console.log("is reversing")
                            for(let i = 0; i< processedData.length/2; i++){
                                let tempData = processedData[i];
                                processedData[i] = processedData[processedData.length-i-1];
                                processedData[processedData.length-i-1] = tempData;
                            }
                        }
                        return processedData;
                    }
                }else{
                    if(JSON.stringify(this.state.incoming)!=data){
                        console.log("data is different")
                        this.setState({
                            incoming: processedData
                        }) 
                    }
                }
            })
        }else{
            fetch('https://pitchkeys-api.herokuapp.com/api/songs').then(res => res.text())
            .then(data => {
                this.setState({
                    incoming: JSON.parse(data)
                })      
            })
        }
    }
    
    render() { 
        return(
            //use componentdidupdate on SongPreview.jsx
            <div id = 'searchResults' style = {{marginLeft: "-7.5%", zIndex: 0}}>
                <div id = "topFlex" style = {{display: "flex"}}>
                    {<p style={{margin: "1% 50% 3% 9.5%", fontSize: "2vw", color: "white"}}><b>{this.state.incoming.length}</b> results found.</p>}
   
                    <label htmlFor="" style={{fontSize: "2vw", marginTop: "1%", marginBottom: "3%"}}>View by...</label>
                    <select onChange = {(e) => this.changeView(e)} style={{fontSize: "2vw", fontFamily: "IBM plex sans, sans serif", margin: "1% 0 3% 1%", outline: "none"}}>
                        <option value="grid" className = "viewSwitcherOption" selected >Grid</option>
                        <option value="row" className = "viewSwitcherOption">Row</option>
                    </select>
                   
                </div>
                
                <div style = {this.state.display}>
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
                    leftLine = {this.props.left}
                    isPlaying = {false}
                    view = {this.state.view}
                    format = "landscape"/>
                    ))}
                </div>
                
            </div>
        )
    }
}
 
export default FilterSongs;


