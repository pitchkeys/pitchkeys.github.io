import React, { Component } from 'react';
import "./status404.css"
import { Link } from 'react-router-dom';
class Status404 extends Component {
    state = { 
        searchQuery: "",
        searchResults: []
    } 

    determineSearchPredictorVisibility(){
        if(this.state.searchQuery.length > 0){
            return "block";
        }else{
            return "none";
        }
    }

    onChangeSearch(e){
        this.setState({
            searchQuery: e.target.value
        })
        console.log(this.state.searchQuery);
    }

    componentDidUpdate(){
        fetch('https://pitchkeys.up.railway.app/api/songs').then(res => res.text())
            .then(data => {
                let processedData = JSON.parse(data)
                //calculate number of "hits" based on keywords
                let splitArray = this.state.searchQuery.toLowerCase().split(" ")
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

                //insertion sort
                for (let i = 0; i < relevanceArray.length-1; i++){
                    let minPos = -1;
                    let minNum = Number.MAX_VALUE;
                    for (let j = i; j < relevanceArray.length; j++){
                        if (relevanceArray[j] < minNum){
                            minPos = j;
                            minNum = relevanceArray[j]
                        }
                    }
                    //swap
                    let temp = processedData[i];
                    processedData[i] = processedData[minPos]
                    processedData[minPos] = temp;

                    //swap relevanceArray
                    let t = relevanceArray[i];
                    relevanceArray[i] = relevanceArray[minPos]
                    relevanceArray[minPos] = t
                }
        
                for(let i = 0; i < relevanceArray.length; i++){
                    if(relevanceArray[i] == 0){
                        relevanceArray.splice(i, 1);
                        processedData.splice(i, 1);
                        i--;
                    }
                }

                //sort reverse cuz insertion sort doesn't want to listen to me
                for(let i = 0; i< processedData.length/2; i++){
                    let tempData = processedData[i];
                    processedData[i] = processedData[processedData.length-i-1];
                    processedData[processedData.length-i-1] = tempData;

                    let tempData2 = relevanceArray[i];
                    relevanceArray[i] = relevanceArray[relevanceArray.length-i-1];
                    relevanceArray[relevanceArray.length-i-1] = tempData2;
                }

                if(JSON.stringify(processedData) != JSON.stringify(this.state.searchResults)){
                    this.setState({
                        searchResults: processedData
                    })
                }
        
                console.log(processedData)
            })
    }

    render() { 
        return (
            <div style = {this.props.display}>
                <div id = "f" style={{backgroundImage: "linear-gradient(45deg, " + this.props.firstCol +"," + this.props.secondCol + ")"}}>404
                </div>
                <p id = "explanation">Hmm... the page that you requested <code style={{color: this.props.firstCol}}>{window.location.href.substring(window.location.href.lastIndexOf("/"))}</code> wasn't found or doesn't exist.</p>

                {/* <p id = "explanation">Sorry, the site is temporarily nonfunctional because of discontinuation of the service the API is hosted on. Please wait while I find a new hosting provider. Thank you!</p> */}

                <input autoComplete="off" type="text" id = "searchBar" placeholder = "Search something instead..." name = "searchQuery" style={{color: "white", border: "1px solid white", caretColor: this.state.color1, fontSize: "2.5vw"}} onChange = {(e) => this.onChangeSearch(e)} />

                <div style = {{display: this.determineSearchPredictorVisibility(), border: "2px solid " + this.state.color1}} id = "searchPreviewer404">
                    {this.state.searchResults.map (c => 
                        <Link to = {"/music" + c.generatedLink} target = "_blank" className = 'individualSearchPrediction'>{c.songname}</Link>
                    )}
                </div>

                <div style = {{display: "flex", justifyContent: "center", marginTop: "3%", marginBottom: "5%"}}>
                    <a href={window.location.href} className = "errorLink" style = {{color: this.props.secondCol}}>Reload the page</a>
                    <a href={"/report"} className = "errorLink" style = {{color: this.props.secondCol}}>Report broken link</a>
                </div>
                
            </div>
        );
    }
}
 
export default Status404;