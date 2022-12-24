import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import "./songpreview.css"

class SongPreview extends Component {
    state = { 
        availability: [],
        backgroundColors: /*['seagreen', '#b08400', '#004fcf', 'gray', '#b00000']*/ [this.props.secondCol],
        fileTypes: ['MIDI', 'MP3/FLAC', 'MSCZ', 'PDF', 'YouTube'],
        ref: ["midiDownloads", "mp3Downloads", "msczDownloads", "pdfDownloads"],
        newAudio: new Audio (this.props.downloadInfo.audioLink),
        newAudioRef: this.props.downloadInfo.audioLink,
        isPlaying: this.props.isPlaying,
        statusText: '▶︎ Listen',
        showGradient: {color: this.props.secondCol},
        extrasHidden: true,
        angledBracket: {top: "50%"},
        backgroundGradient: {backgroundImage: "linear-gradient (0deg, " + this.props.firstCol + "," + this.props.firstCol + ")"},
        format: this.props.format
    } 

    convertToMinutes(){
        let seconds = this.props.duration % 60
        let blank = ''
        if (seconds < 10){
            seconds = "0" + seconds
        }

        if (!this.state.isPlaying){
            return("(" + Math.floor(this.props.duration / 60) + ":" + (seconds) + ")")
        }
    }

    playSong(){
        if(this.state.isPlaying === false){
            this.setState({
                isPlaying: true,
                statusText: 'Pause'
            })
            this.state.newAudio.play()
            
        }else{
            this.setState({
                isPlaying: false,
                statusText: 'Resume'
            })
            this.state.newAudio.pause();
        }
    }

    componentDidMount(){
        //("component mounted")
        
        let arr = [(this.props.downloadInfo.midiLink.length > 0), (this.props.downloadInfo.audioLink.length > 0), (this.props.downloadInfo.msczLink.length > 0), (this.props.downloadInfo.sheetMusic.length > 0), (this.props.downloadInfo.ytLink.length > 0)]
        
        let translatedArr = []
        for (let i = 0; i < arr.length; i++){
            if(arr[i]){
                translatedArr.push('inline-block')
            }else{
                translatedArr.push('none')
            }
        }
        this.setState({
            availability: translatedArr,
            isPlaying: false
        })
    }

    componentDidUpdate(){
        let arr = [(this.props.downloadInfo.midiLink.length > 0), (this.props.downloadInfo.audioLink.length > 0), (this.props.downloadInfo.msczLink.length > 0), (this.props.downloadInfo.sheetMusic.length > 0), (this.props.downloadInfo.ytLink.length > 0)]
        
        let translatedArr = []
        for (let i = 0; i < arr.length; i++){
            if(arr[i]){
                translatedArr.push('block')
            }else{
                translatedArr.push('none')
            }
        }
        if(this.state.newAudioRef != this.props.downloadInfo.audioLink){
            
            this.setState({
                availability: translatedArr,
                isPlaying: false,
                newAudioRef: this.props.downloadInfo.audioLink,
                newAudio: new Audio (this.props.downloadInfo.audioLink),
            })
        }

    }

    componentWillUnmount(){

        this.state.newAudio.pause()
        this.setState(
            {
                newAudio: null,
                newAudioRef: null,
                isPlaying: false
            }
        )
    }
 
    getTotalDownloads(){
        let totalDownloads = 0;
        for (let i = 0; i < this.state.availability.length - 1; i++){
            if(this.state.availability[i] == "block"){
                totalDownloads+=parseInt(this.props.stats[this.state.ref[i]])
            }
        }
        return totalDownloads;
    }

    getRatings(){
        let sum = 0;
        if(this.props.stats.ratings.length == 0){
            return 0
        }else{
            for (let i = 0; i < this.props.stats.ratings.length; i++){
                sum+=parseInt(this.props.stats.ratings[i])
            }
            return (sum / this.props.stats.ratings.length).toFixed(2);
        }
    }

    getLeftLine(){
    
        if (this.props.leftLine){
       
            if(this.state.extrasHidden){
                return {backgroundColor: this.props.firstCol}
            }else{
                return {backgroundColor: "white"}
            }
            
        }else{
            return {backgroundColor: "black"}
        }
    }

    displayGradient(){
        this.setState({
            showGradient: {color: this.props.firstCol},
            backgroundGradient: {backgroundImage: "linear-gradient (0deg, " + this.props.firstCol + "," + this.props.secondCol + ")"}
        })
    }

    removeGradient(){
        this.setState({
            showGradient: {color: this.props.secondCol},
            backgroundGradient: {backgroundImage: "linear-gradient (0deg, " + this.props.firstCol + "," + this.props.firstCol + ")"}
        })
    }

    showExtraInfo(){
        this.setState({
            extrasHidden: !this.state.extrasHidden
        })
    }

    getVisibility(){
        if(this.state.extrasHidden){
            return {display: "none"}
        }else{
            return {display: "block"}
        }
    }

    getAngledBracketDirection(){
        if(this.state.extrasHidden){
            return {transform: "rotate(0deg) "}
        }else{
            return {transform: "translateY(-25%) rotate(90deg)", color: "white"}
        }
    }

    /*shortenSongName(){
        if(this.props.songname.length > 35){
            return this.props.songname.substring(0, 35) + "..."
        }else{
            return this.props.songname
        }
    }*/

    getView(){
        if(this.props.view == "grid"){
            return [{display: "none"}, {display: "block"}]
        }else{
            return [{display: "block"}, {display: "none"}]
        }
    }
    render() { 
        return (
            <div>
                <div style = {this.getView()[0]}>{/*start of landscape preview*/}
                    <div className = 'outerGradient' style={this.getLeftLine()}>
                        <div className = 'previewContainer'>
                            <div className = 'containerRight'>     
                                <div id = "block-div-song-preview">
                                    <div id = "flex-song-preview-left" onClick={() => this.showExtraInfo()} style = {this.getAngledBracketDirection()}>
                                        <p id = "angledBracket" ><b>&gt;</b></p>
                                    </div>
                                    <div id = "flex-song-preview-right"> 
                                        <Link to = {this.props.generatedLink} className = 'link' onMouseEnter = {() => this.displayGradient()}
                                        onMouseLeave = {() => this.removeGradient()}
                                        style = {this.state.showGradient}>{this.props.songname}</Link>
                                        <p className = 'songDesc'>{this.props.desc}</p>
                                    </div>
                                </div>
                                <div id = "hidden-div-song-preview" style = {this.getVisibility()}>
                        
                                <div className='statisticsDiv'>
                                    {/*<button id = 'play' onClick={() => this.playSong()} style={{border: "1px solid white"}}>{this.state.statusText} {this.convertToMinutes()} </button>*/}
                                    {<audio controls src= {"/media/" + this.props.downloadInfo.audioLink} controlsList="nodownload noremoteplayback" className = "audioPlayer"></audio>}
                                    <div className = 'ratingsDiv1'>
                                        <div id = 'ratingText1'>Rating:</div> 
                                        <div style={{backgroundColor: "black", border: "1px solid " + this.props.firstCol, width: "100%"}} className = 'bar1'>
                                            <div style={{width: ((this.getRatings() / 5)*100) - 3.5 + "%", backgroundImage: "linear-gradient(90deg, " + this.props.firstCol + ", " + this.props.firstCol + ")", color: "white"}} className = "number1">{this.getRatings() + "/5.00"}</div>
                                        </div>
                                        <p id = 'numRatings1'>({this.props.stats.ratings.length})</p>
                                    </div>
                                    <div id = 'numDownloadsDiv'>
                                        <div id = 'downloadIcon'>↓</div>
                                        <p id = 'numDownloads'>{" " + this.getTotalDownloads()}</p>
                                    </div>
                                    <div id = 'numNotesDiv'>Uploaded: {new Date(parseInt(this.props.date)).toString().substring(4, 16).slice(0, 6) + ", " + new Date(parseInt(this.props.date)).toString().substring(4, 16).slice(6)}</div>
                            
                                </div>
                                <div className='availableAsDiv'>
                                    <p id = 'availabilityText'>Available as: </p>
                                    <div className = 'spanBox' style={{backgroundColor: this.state.backgroundColors[0], display: this.state.availability[0]}}>{this.state.fileTypes[0]}</div>

                                    <div className = 'spanBox' style={{backgroundColor: this.state.backgroundColors[0], display: this.state.availability[1]}}>{this.state.fileTypes[1]}</div>

                                    <div className = 'spanBox' style={{backgroundColor: this.state.backgroundColors[0], display: this.state.availability[2]}}>{this.state.fileTypes[2]}</div>

                                    <div className = 'spanBox' style={{backgroundColor: this.state.backgroundColors[0], display: this.state.availability[3]}}>{this.state.fileTypes[3]}</div>

                                    <div className = 'spanBox' style={{backgroundColor: this.state.backgroundColors[0], display: this.state.availability[4]}}>{this.state.fileTypes[4]}</div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>{/*end of landscape preview*/}
            <div style = {this.getView()[1]} className = "portrait-outer-container">{/*start of portrait preview*/}
                {<img src={this.props.coverImage} alt="" className = "portrait-thumbnail" style = {{borderTop: "8px solid" + this.props.firstCol}}/> }
                <div class = "portrait-outer-link-holder">
                <Link to = {this.props.generatedLink} className = 'portrait-link'  onMouseEnter = {() => this.displayGradient()}
                    onMouseLeave = {() => this.removeGradient()}
                    style = {this.state.showGradient}>{this.props.songname}</Link>
                </div>
                    
              
                
                {/*<p className = 'portrait-description'>{this.props.desc}</p>*/}
                <p className = 'portrait-show-more'  onClick={() => this.showExtraInfo()}>Show More ></p>
                <div id = "portrait-hidden-area" style = {this.getVisibility()}>
                    <p className = 'portrait-description'>{this.props.desc}</p>
                    {/*<audio controls src= {"/media/" + this.props.downloadInfo.audioLink} controlsList="nodownload noremoteplayback" className = "portrait-audio-player"></audio>*/}
                    <div className = 'portrait-ratings-div'>
                        <div style={{backgroundColor: "black", border: "1px solid " + this.props.firstCol}} className = 'portrait-rating-bar'>

                        <div style={{width: ((this.getRatings() / 5)*100) - 3.5 + "%", backgroundImage: "linear-gradient(90deg, " + this.props.firstCol + ", " + this.props.secondCol + ")", color: "white"}} className = "portrait-rating-value">Rating: {this.getRatings() + "/5.00"}</div>
                        </div>
                        <p id = 'portrait-rating-numRatings'>({this.props.stats.ratings.length})</p>
                    </div>

                    <div id = "portrait-misc-div">{new Date(parseInt(this.props.date)).toString().substring(4, 16).slice(0, 6) + ", " + new Date(parseInt(this.props.date)).toString().substring(4, 16).slice(6)}&nbsp;&nbsp;|&nbsp;&nbsp;{"⬇ " + this.getTotalDownloads()}&nbsp;&nbsp;|&nbsp;&nbsp;🎹 = {this.props.noteCount.toLocaleString("en-US")}
                    </div>
                    <div id = 'portrait-available-files'><acronym title = "MIDI (.mid, .midi) available" className = 'portrait-span-box' style={{backgroundColor: this.state.backgroundColors[0], display: this.state.availability[0]}}>{this.state.fileTypes[0]}</acronym>

<acronym title = "Audio (.mp3, .flac) available" className = 'portrait-span-box' style={{backgroundColor: this.state.backgroundColors[0], display: this.state.availability[1]}}>{this.state.fileTypes[1]}</acronym>

<acronym title = "Musescore file (.mscz) available" className = 'portrait-span-box' style={{backgroundColor: this.state.backgroundColors[0], display: this.state.availability[2]}}>{this.state.fileTypes[2]}</acronym>

<acronym title = "Sheet Music (.pdf) available" className = 'portrait-span-box' style={{backgroundColor: this.state.backgroundColors[0], display: this.state.availability[3]}}>{this.state.fileTypes[3]}</acronym>

<acronym title = "Available on YouTube" className = 'portrait-span-box' style={{backgroundColor: this.state.backgroundColors[0], display: this.state.availability[4]}}>{this.state.fileTypes[4]}</acronym></div>
                        
                    
                </div>
            </div>
            </div>
        );
    }
}
 
export default SongPreview;