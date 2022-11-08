import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import "./songfull.css"
import {Link} from "react-router-dom"
import FilterSongs from './FilterSongs';
import Status404 from './Status404';

class SongFull extends Component {
    state = {
        incoming: {
            songname: "Fetching...",
            date: "Fetching...",
            desc: "Fetching...",
            duration: "Fetching...",
            bpm: "Fetching...",
            notecount: "Fetching...",
            filters: "Fetching...",
            keywords: [],
            generatedLink: "-1",
            credits: {
                link: [],
                textToDisplay: "Fetching...",
            },

            download: {
                audioLink: "Fetching...",
                midiLink: "Fetching...",
                msczLink: "Fetching...",
                ytLink: "Fetching...",
                sheetMusic: "Fetching...",
                coverImage: "Fetching...",
            },

            stats: {
                ratings: [],
                midiDownloads: "Fetching...",
                mp3Downloads: "Fetching...",
                msczDownloads: "Fetching...",
                pdfDownloads: "Fetching...",
                visits: "Fetching...",  
            },
        },

        display:{
            midiLink: ["MIDI (.mid/.midi)", "midiDownloads"],
            audioLink: ["Audio (.mp3/.flac)", "mp3Downloads"],
            msczLink: ["Musescore file (.mscz)", "msczDownloads"],
            sheetMusic: ["Sheet Music (.pdf)", "pdfDownloads"]
        },

        review: ["", "5/5 (I love it!)", "4/5 (I like it!)", "3/5 (Mediocre)", "2/5 (I dislike it)", "1/5 (I hate it)"],
        reviewValue: -1,
        formSubmitted: false,
        status404: {display: "none"},
        page: {display: "none"},
        titleDisplay: {display: "block"}
   
    }

    componentDidMount(){
        window.scrollTo(0, 0)
        if(window.location.href.charAt(window.location.href.length-12) == "/"){
            fetch ('https://blue-clean-eel.cyclic.app/api/songs/' + window.location.href.substring(window.location.href.length-11)).then(res => res.text()).then(data => {
                let x = JSON.parse(data);
                if(x.length > 0){
                    this.setState({
                        incoming: x[0],
                        page: {display: "block", display: "flex"}
                    })
                    document.title = x[0].songname;
                }else{
                    this.setState({
                        status404:{display: "block"},
                        titleDisplay: {display: "none"}
                    })
                }
            })
        }else{
            console.log('https://blue-clean-eel.cyclic.app/api/songs/' + window.location.href.substring(window.location.href.length-7))
            fetch('https://blue-clean-eel.cyclic.app/api/songs/' + window.location.href.substring(window.location.href.length-7)).then(res => res.text()).then(data => 
            {
                let x = JSON.parse(data);
                if(x.length > 0){
                    this.setState({
                        incoming: x[0],
                        page: {display: "block", display: "flex"}
                    })
                    document.title = x[0].songname;
                }else{
                    this.setState({
                        status404:{display: "block"},
                        titleDisplay: {display: "none"}
                    })
                }
            })
        }
        
    }

    updateDownloadCount(e){
  
        let property = this.state.display[e.currentTarget.id][1]
        let newObject = this.state.incoming.stats
        newObject[property] = this.state.incoming.stats[property] + 1
        let d = {stats: newObject}
    
        fetch("https://blue-clean-eel.cyclic.app/api/songs/"+ window.location.href.substring(window.location.href.length-7), {
            method: 'POST',
            body: JSON.stringify(d),
            headers: {
                'Content-Type': 'application/json'
            },
        })
    }

    submitRating(e){
        e.preventDefault()
        if(this.state.reviewValue < 6 && this.state.reviewValue > 0 && this.state.reviewValue.length > 0){
            this.setState({
                formSubmitted: true
            })

            let newObject = this.state.incoming.stats
            newObject.ratings.push(this.state.reviewValue);
            let d = {stats: newObject}
            fetch("https://blue-clean-eel.cyclic.app/api/songs/"+ window.location.href.substring(window.location.href.length-7) + "/add", {
            method: 'POST',
            body: JSON.stringify(d),
            headers: {
                'Content-Type': 'application/json'
            },
            })
        }
    }

    getValidFiles(){
        let validFiles = [];
        for (let i = 0; i < Object.keys(this.state.incoming.download).length-1; i++){
            if(this.state.incoming.download[Object.keys(this.state.incoming.download)[i]].length > 0 && Object.keys(this.state.incoming.download)[i] != "ytLink"){
                validFiles.push(Object.keys(this.state.incoming.download)[i])
            }
        }
        return(validFiles)
        
    }

    getTotalDownloads(){
        let sum = 0;
        let valid = this.getValidFiles();
        for(let i = 0; i < valid.length; i++){
            sum+=parseInt(this.state.incoming.stats[this.state.display[valid[i]][1]]);
        }
        return sum;
    }

    convertToMinutes(arg){
        let seconds = arg % 60
        if (seconds < 10){
            seconds = "0" + seconds
        }
        return(arg + " seconds; " + Math.floor(arg / 60) + ":" + (seconds))
    }

    getAttributes(){
        let criteria = ["NCS", "Classical", "Other EDM", "Meme", "Possible (Sheet Music)", "Impossible", "Leveled"];
        let emptyArr = [];
        let newString = "";
        let split = this.state.incoming.filters;
        for(let a = 0; a<split.length; a++){
            if(a == split.length-1){
                newString += (criteria[split.charAt(a)-1])
            }else{
                newString += (criteria[split.charAt(a)-1]) + ", \n"
            }
        }
        return newString;
    }

    getKeywords(){
        let newString = "";
        for(let b = 0; b < this.state.incoming.keywords.length; b++){
            if(b == this.state.incoming.keywords.length-1){
                newString += this.state.incoming.keywords[b];
            }else{
                newString += this.state.incoming.keywords[b] + ", ";
            }
        }
        return newString;
    }

    getRatings(){
        let sum = 0;
        if(this.state.incoming.stats.ratings.length == 0){
            return sum + "/5 (No ratings yet)"
        }else{
            for (let i = 0; i < this.state.incoming.stats.ratings.length; i++){
                sum+=parseInt(this.state.incoming.stats.ratings[i])
            }
            return (sum / this.state.incoming.stats.ratings.length).toFixed(2);
        }
    }

    getEntireDisplay(){
        if(this.state.incoming.songname == "Fetching..."){
            return {display: "none"}
        }else{
            return {display: "block", display: "flex"}
        }
    }

    getDisplayFirst(){
        if(this.state.incoming.stats.ratings.length == 0){
            return "block";
        }else{
            return "none";
        }
    }

    getDisplay(){
        if(this.state.incoming.stats.ratings.length == 0 || this.state.formSubmitted){
            return {display: "none"}
        }else{
            return {display: "block", display: "flex"}
        }
    }

    getFormSubmitted(){
        if(this.state.formSubmitted){
            return {display: "none"}
        }else{
            return {display: "block"}
        }
    }

    getFormSubmittedFirst(){
        if(this.state.formSubmitted){
            return {display: "block"}
        }else{
            return {display: "none"}
        }
    }

    changeRating(e){
        this.setState({
            reviewValue: e.currentTarget.value
        })
    }

    render() { 
        return (
            <div>
                <Status404 firstCol = {this.props.secondCol} secondCol = {this.props.firstCol} display = {this.state.status404}/>
                
                {/*<img src={this.state.incoming.download.coverImage} className = "mainBodyImg"/>*/}
                <div id = 'downloadDiv' style = {this.state.page}>
                    <div id = "downloadLeft">
                        <p id = 'songTitle' style = {this.state.titleDisplay}>Download <span style={{color: this.props.firstCol}}> "{this.state.incoming.songname}"</span></p>
                        <p id = 'songDescription' style = {this.state.titleDisplay}>{this.state.incoming.desc}</p>
                        <p className = "downloadAs" style = {{color: this.props.firstCol, borderBottom: "3px solid "+ this.props.firstCol}}>Download As...</p>
                        <Link to = "./report" id = "reportLink">Report broken links</Link>
                        {this.getValidFiles().map(a => (
                            <li className='downloadLinkContainer'>
                                <a href = {"/media/" + this.state.incoming.download[a]}  className = "downloadLink" style={{backgroundColor: this.props.secondCol}} onClick = {(e) => this.updateDownloadCount(e)} id = {a} download>{this.state.display[a][0]}</a> 

                                <div className = "downloadCount">({this.state.incoming.stats[this.state.display[a][1]]} <u className = 'downloadCount'>🡣</u>)</div>
                            </li>
                        ))}
                        <p className = "downloadAs" style = {{color: this.props.firstCol, borderBottom: "3px solid "+ this.props.firstCol}}>Take a listen</p>
                        <audio controls src= {"/media/" + this.state.incoming.download.audioLink} controlsList="nodownload noremoteplayback" className = "audioPlayer"></audio>
                        <ul style = {{color: "white"}}>
                            <li id = "ytLinkHolder">
                                <p id = "ytLink" style = {{color: "white"}}>Watch on YouTube: <a href={this.state.incoming.download.ytLink} style = {{color: this.props.secondCol}} target = "_blank">{this.state.incoming.download.ytLink}</a></p>
                            </li> 
                        </ul>
                       
                        <p className = "downloadAs" style = {{color: this.props.firstCol, borderBottom: "3px solid "+ this.props.firstCol}}>Leave a rating</p>
                        <i style = {{display: this.getDisplayFirst()}} id = "firstRate">Be the first to rate!</i>
                        <p style = {this.getFormSubmittedFirst()} id = "thanksMsg">Thank you for your rating!</p>
                        <div className = 'ratingsDivFull' style = {this.getDisplay()}>
                            <div id = 'ratingTextFull'>Rating:</div> 
                            <div style={{backgroundColor: "black", border: "1px solid " + this.props.firstCol, width: "100%", borderRadius: "15px"}} className = 'barFull'>
                                <div style={{width: ((this.getRatings() / 5)*100) - 3.5 + "%", backgroundImage: "linear-gradient(90deg, " + this.props.firstCol + ", " + this.props.secondCol + ")", color: "white", borderRadius: "10px"}} className = "numberFull">{this.getRatings() + "/5.00"}</div>
                            </div>
                            <p id = 'numRatingsFull'>{"(" + this.state.incoming.stats.ratings.length + ")"}</p>
                        </div>
                        
                        <div id = "reviewForm" style={this.getFormSubmitted()}>
                            <label htmlFor="review">Leave a rating...</label>
                            <select name="review" id="reviewSelector" onChange = {(e) => this.changeRating(e)}>
                                {this.state.review.map(r => (
                                    <option value={r.charAt(0)} className = "choice">{r}</option>
                                ))}
                            </select>
                            <button id = "submitRating" onClick={(e) => this.submitRating(e)}>Submit</button>
                        </div>

                        <p className = "downloadAs" style = {{color: this.props.firstCol, borderBottom: "3px solid "+ this.props.firstCol}}>Credits</p>
                        <p id = "creditText">{this.state.incoming.credits.textToDisplay}</p>
                        <ul id = "creditBulletHolder">
                            {this.state.incoming.credits.link.map (l => (
                                <li style = {{color: this.props.secondCol}}><a href = {l} className = "creditLinks" target = "_blank" style={{color: this.props.secondCol}}>{l}</a></li>
                            ))}
                        </ul>
                    </div>

                    {/*Too lazy to use map method xD*/}
                    <div id = "downloadRight">
                        <p className = "infoPanelBig">Information</p>
                        
                        <div id = "thumbnail-holder">
                            
                            <img src={this.state.incoming.download.coverImage} alt="" className = "thumbnail"/>
                            <div id = "inner-thumbnail-holder">
                                <p id = "thumbnail-text">Thumbnail</p>

                                {/*<p id = "thumbnail-link">Copy thumbnail link</p*/}

                            </div>
                            
                        </div>
                        
                        

                        <div className = "infoPanel">
                            <p className = "attribute">Tot. downloads</p>
                            <p className = "attributeValue" style = {{color: this.props.secondCol}}>{this.getTotalDownloads()}</p>
                        </div>

                        <div className = "infoPanel">
                            <p className = "attribute">BPM</p>
                            <p className = "attributeValue"  style = {{color: this.props.secondCol}}>♩ = {this.state.incoming.bpm}</p>
                        </div>

                        <div className = "infoPanel">
                            <p className = "attribute">Note Count</p>
                            <p className = "attributeValue" style = {{color: this.props.secondCol}}>{this.state.incoming.notecount.toLocaleString("en-US")}</p>
                        </div>

                        <div className = "infoPanel">
                            <p className = "attribute">Duration</p>
                            <p className = "attributeValue" style = {{color: this.props.secondCol}}>{this.convertToMinutes(parseInt(this.state.incoming.duration))}</p>
                        </div>

                        <div className = "infoPanel">
                            <p className = "attribute">Notes/sec.</p>
                            <p className = "attributeValue" style = {{color: this.props.secondCol}}>{(this.state.incoming.notecount / this.state.incoming.duration).toFixed(3)}</p>
                        </div>

                        <div className = "infoPanel">
                            <p className = "attribute">Categories</p>
                            <p className = "attributeValue" style = {{color: this.props.secondCol}}>{this.getAttributes()}</p>
                        </div>

                        <div className = "infoPanel">
                            <p className = "attribute">Keywords</p>
                            <p className = "attributeValue" style = {{color: this.props.secondCol}}>{this.getKeywords()}</p>
                        </div>
                    </div>
                </div>
                {/*<p className = "similarSongs" style = {{color: this.props.firstCol, borderBottom: "3px solid "+ this.props.firstCol, display: this.state.page.display}} >Similar songs</p>
                <div style={{width: "90%", marginLeft: "5%"}}>
                <FilterSongs 
                    filters = {{
                        types:[this.state.incoming.filters[0]],
                        files:[1,1,1,1,1],
                        numericalFilters:[
                            {filter:"Note Count",lessThan:20000,moreThan:0,order:"none"},
                            {filter:"BPM",lessThan:200,moreThan:0,order:"none"},
                            {filter:"Rating",lessThan:5,moreThan:0,order:"none"},
                            {filter:"Duration (in sec.)",lessThan:600,moreThan:0,order:"none"},{filter:"# of ratings",lessThan:100,moreThan:0,order:"none"}
                        ],
                        
                        type:"songname",
                        order:1,
                        query:""
                    }}
                        
                    firstCol = {this.props.firstCol} 
                    secondCol = {this.props.secondCol} 
                    left = {true}
                    limit = {1000}
                random = {false}/>
               
                </div>*/}
            </div> 
        );
    }
}
 
export default SongFull;