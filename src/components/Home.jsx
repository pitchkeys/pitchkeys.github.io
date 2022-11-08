import React, { Component } from 'react';
import "./home.css"
import Header from "./Header"
import APIgetTop from './APIget';
import { Link } from "react-router-dom";
import SongPreview from './SongPreview';
import APIget from './APIget';
import APIgetFull from './APIgetFull';
import Footer from "./Footer"



class Home extends Component {
    state = { 
        color1: this.props.firstCol,
        color2: this.props.secondCol,
        isPlaying: false,
        newAudio: new Audio("https://easymath.github.io/download-test/PreludeinG.mp3"),
        searchQuery: '',
        status: 'fail',
        incoming: [],
        view: "grid",
        fullSongList: [],
        searchResults: []
    } 

    playRandom() {
        if(this.state.isPlaying === false){
            this.setState({isPlaying: true})
            this.state.newAudio.play()
            
        }else{
            this.setState({isPlaying: false})
            this.state.newAudio.pause();
        }
    }

    componentDidMount(){

        document.title = "Home | PitchKeys"
        
    }

    componentDidUpdate(){
        fetch('https://pitchkeys-api.herokuapp.com/api/songs').then(res => res.text())
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
            })
    }

    onChangeSearch(e){
        this.setState({
            searchQuery: e.target.value
        })
    }

    getUploadStyle(){
        return {color: "white"}
    }

    /*, borderBottom: "5px solid " + this.state.color1, borderRight: "5px solid " + this.state.color1*/

    sendSearch(e){
        /*e.preventDefault();
        let d = {searchQuery: this.state.searchQuery}
       return fetch('http://127.0.0.1:9000/search', {
            method: 'POST',
            body: JSON.stringify(d),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(data => console.log(data)).then(this.setState({
            status: 'successfully sent'
        }))*/
    }

    getProperty(){
        let a = this.state.incoming;
        return(a)
    }

    changeView(e){
        this.setState({
            view: e.target.value
            
        })
    }

    determineSearchPredictorVisibility(){
        if(this.state.searchQuery.length > 0){
            return "block";
        }else{
            return "none";
        }
    }

    render() { 
        return (
            <div>
                <div id = 'mainDisplay'>
                    <img src="https://easymath.github.io/download-test/2020-08-05%20(3).png" alt="" id = 'topImg'/>
                    <div id = 'mainDisplayComponents'>
                        <p id = 'mainTextCenter'>{/*Give credit to YourSaviorBagel for helping w/freeway*/} Testing Trae Gaming N Food UPDATED!!!!11!</p>
                        <p id = 'subTextCenter' style={{color: this.state.color2}}>I create piano covers and impossible piano remixes of various popular songs.</p>
                        
                        <input autocomplete="off" type="text" id = "searchBar" placeholder = "Search for a song..." name = "searchQuery" style={{backgroundImage: "linear-gradient(to right, " + this.state.color1 + ", " + this.state.color2 + ")", border: "2px solid " + this.state.color1, caretColor: this.state.color1}} onChange = {(e) => this.onChangeSearch(e)} />
                        
                        <audio id = 'myAudio' src="https://easymath.github.io/download-test/PreludeinG.mp3" type="audio/mpeg"></audio>
                    </div>
                </div>

                <div style = {{display: this.determineSearchPredictorVisibility(), border: "2px solid " + this.state.color1}} id = "searchPreviewer">
                    {this.state.searchResults.map (c => 
                        <Link to = {"/music" + c.generatedLink} target = "_blank" className = 'individualSearchPrediction'>{c.songname}</Link>
                    )}
                </div>

                <div className = 'uploadHeaderGradient' style={{backgroundImage: "linear-gradient(10deg, " + this.state.color2 + ", " + this.state.color1 + ")"}}>
                    <p className = 'uploadHeader' style={this.getUploadStyle()}>Popular Uploads</p>
                </div>  
                
                <div className = "viewSwitcher">
                    <label htmlFor="" className = "viewBy">View by...</label>
                    <select onChange = {(e) => this.changeView(e)} className = "viewSwitcherSelector">
                        <option value="grid" className = "viewSwitcherOption" selected >Grid</option>
                        <option value="row" className = "viewSwitcherOption">Row</option>
                    </select>
                </div>
                
                <APIget count = "3" view = {this.state.view} type = "popular" firstCol = {this.state.color1} secondCol = {this.state.color2} leftLine = {true}/>

                {/*<div className = 'breakGradient' style={{backgroundImage: "linear-gradient(10deg, " + this.state.color2 + ", " + this.state.color1 + ")"}}></div>*/}

                <div className = 'uploadHeaderGradient' style={{backgroundImage: "linear-gradient(10deg, " + this.state.color2 + ", " + this.state.color1 + ")"}}>
                    <p className = 'uploadHeader' style={this.getUploadStyle()}>Recent uploads</p>
                </div>  

                <APIget count = "3" view = {this.state.view} type = "recent" firstCol = {this.state.color1} secondCol = {this.state.color2} leftLine = {true}/>

                <p id = "asOfNow">As of now...</p>

                <APIgetFull color1 = {this.state.color1} color2 = {this.state.color2}/>
 
            </div>
        );
    }
}
 
export default Home;