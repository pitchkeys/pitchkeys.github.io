import React, { Component } from 'react';

import "./admin.css"
class Admin extends Component {
    state = { 
        criteria: ["ncs", "classic", "otheredm", "meme", "possible", "impossible", "leveled"],
        songname: '',
        date: '',
        desc: '',
        duration: '',
        bpm: '',
        notecount: '',
        creditLink: '',
        creditText: '',

        audioLink: '',
        midiLink: '',
        msczLink: '',
        ytLink: '',
        sheetMusic: '',
        coverImage: '',

        filters: '',
        keywords: '',
        
    }  

    
    sendNewSong(e){
        const allChars = "abdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
        let randomString = '/'
        for(let i = 0; i < 7; i++){
            randomString += allChars.charAt(Math.floor(Math.random() * 62))
        }

        e.preventDefault();
        let rootDomain = '/'
        let info = {
            songname: this.state.songname,
            date: new Date(this.state.date).getTime(),
            desc: this.state.desc,
            duration: this.state.duration,
            bpm: this.state.bpm,
            notecount: this.state.notecount,
            generatedLink: randomString,
            credits: {
                link: this.state.creditLink.split(','),
                textToDisplay: this.state.creditText,
            },

            download: {
                audioLink: rootDomain + this.state.audioLink,
                midiLink: rootDomain + this.state.midiLink,
                msczLink: rootDomain + this.state.msczLink,
                ytLink: this.state.ytLink,
                sheetMusic: rootDomain + this.state.sheetMusic,
                coverImage: this.state.coverImage,
            },

            filters: this.state.filters,
            keywords: this.state.keywords.split(','),

            stats: {
                ratings: [],
                midiDownloads: 0,
                mp3Downloads: 0,
                msczDownloads: 0,
                pdfDownloads: 0,
                visits: 0  
            }
        }
        console.log("Info is: " + JSON.stringify(info));
        return fetch('https://pitchkeys-api.herokuapp.com/add', {
            method: 'POST',
            body: JSON.stringify(info),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(data => console.log('successfully added ' + data))
    }

    handleChange(e){
        this.setState(
            {[e.target.name]: e.target.value}
        )
        console.log(this.state);
    }

    render() { 
        return (
            <div>
             
                <form onSubmit={(e) => this.sendNewSong(e)}>
                    <h1 style = {{color: 'white'}}>General info</h1>
                    <input type="text" className = "box" name = "songname" placeholder='Song name' onChange = {(e) => this.handleChange(e)}/>
                    <input type="text" className = "box" name = "date" placeholder='MM-DD-YYYY' onChange = {(e) => this.handleChange(e)}/>
                    <input type="text" className = "box" name = "desc" placeholder='Description' onChange = {(e) => this.handleChange(e)}/>
                    <input type="text" className = "box" name = "duration" placeholder='Duration (in s)' onChange = {(e) => this.handleChange(e)}/>
                    <input type="text" className = "box" name = "bpm" placeholder='BPM' onChange = {(e) => this.handleChange(e)}/>
                    <input type="text" className = "box" name = "notecount" placeholder='Note Count' onChange = {(e) => this.handleChange(e)}/>
                    <h1 style = {{color: 'white'}}>Download info</h1>
                    <br />
                    <input type="text" className = "box" name = "audioLink" placeholder='Audio Link' onChange = {(e) => this.handleChange(e)}/>
                    <input type="text" className = "box" name = "midiLink" placeholder='MIDI Link' onChange = {(e) => this.handleChange(e)}/>
                    <input type="text" className = "box" name = "msczLink" placeholder='MSCZ Link' onChange = {(e) => this.handleChange(e)}/>
                    <input type="text" className = "box" name = "ytLink" placeholder='YT Link' onChange = {(e) => this.handleChange(e)}/>
                    <input type="text" className = "box" name = "sheetMusic" placeholder='Sheet Music' onChange = {(e) => this.handleChange(e)}/>
                    <input type="text" className = "box" name = "coverImage" placeholder='Cover img link' onChange = {(e) => this.handleChange(e)}/>

                    <h1 style = {{color: 'white'}}>Filters</h1>
                    {this.state.criteria.map(c => 
                        <span style = {{color: 'white', marginLeft: "5%", fontSize: "150%"}}>{this.state.criteria.indexOf(c) + 1}. {c}</span>
                    )}
                    <input type="text" className = "box" name = "filters" placeholder='Filter #s, no separation' onChange = {(e) => this.handleChange(e)}/>
                    <input type="text" className = "box" name = "keywords" placeholder='Keywords (separate by commas)' onChange = {(e) => this.handleChange(e)}/>

                    <h1 style = {{color: 'white'}}>Credits</h1>
                    <input type="text" className = "box" name = "creditLink" placeholder='Link to the original video(s) (if any); separate by commas' onChange = {(e) => this.handleChange(e)}/>
                    <input type="text" className = "box" name = "creditText" placeholder='Keywords (separate by commas)' onChange = {(e) => this.handleChange(e)}/>

                    <button id = 'create'>Submit</button>
                </form>
            </div>
            
        );
    }
}
 
export default Admin;