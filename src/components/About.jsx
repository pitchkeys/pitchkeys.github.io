import React, { Component } from 'react';
import "./About.css"
class About extends Component {
    state = {  } 
    render() { 
        return (
            <div className = "fullText">
                <h1 className = "bodyTextHeader" style = {{color: this.props.firstCol}}>About me + this website</h1>
                <div className = "block" style = {{backgroundColor: this.props.secondCol}}></div>
                <p className = "bodyText">Hi, it's PitchKeys! <br /><br /> As you may know, I'm a small YouTuber focused on creating my own piano covers and impossible remixes of popular songs. I may also upload my original songs. <br /><br /> This website is created for the <span><b style = {{color: this.props.firstCol}}>free</b></span> downloading of the files that I use to create my videos. Platforms such as MuseScore have these capabilities; however subscriptions are required to download the files. Therefore, I created this website so that all viewers to my YouTube channel can download the files that I use. For example, I usually make my songs in MuseScore and export it to MIDI (.mid), so users may download the MuseScore file (.mscz), MIDI (.mid), audio (.mp3/.flac), or even a PDF (if sheet music for the piano cover is available.) <br /><br />On a side note, I coded this website myself! It utilizes the MERN stack, with React with the UI and MongoDB as a database to store all the songs.</p>
                
                <h1 className = "bodyTextHeader" style = {{color: this.props.firstCol}}>Site map (ish)</h1>
                <div className = "block" style = {{backgroundColor: this.props.secondCol}}></div>
                <p className = "bodyText">*This website isn't perfect, and while coding I may have overlooked some glitches. Please let me know at <a href="mailto:pitchk808@gmail.com" style = {{color: this.props.firstCol}}>pitchk808@gmail.com</a> if any glitches/bugs were found. <b style = {{color: this.props.firstCol}}>A report feature within the website should be coming soon.</b></p>
                <p className = "bodyText">This site is easy to use! There are only a few website paths, as indicated below: </p>
                <table >
                    <tr>
                        <td style={{width: "25%", color: this.props.firstCol}} className = "chartHeader"><b>Title</b></td>
                        <td style={{width: "75%", color: this.props.firstCol}} className = "chartHeader"><b>Path</b></td>
                    </tr>
                    <tr>
                        <td>Home</td>
                        <td><a href="/" style = {{color: this.props.secondCol}}><code>[domain name]/</code></a></td>
                    </tr>
                    <tr>
                        <td>About</td>
                        <td><a href="/#/about" style = {{color: this.props.secondCol}}><code>[domain name]/#/ about</code> </a></td>
                    </tr>
                    <tr>
                        <td>Credits</td>
                        <td><a href="/#/credits" style = {{color: this.props.secondCol}}><code>[domain name]/#/credits</code></a></td>
                    </tr>
                    <tr>
                        <td>Usage Policy</td>
                        <td><a href="/#/usage" style = {{color: this.props.secondCol}}><code>[domain name]/#/usage/</code></a></td>
                    </tr>
                    <tr>
                        <td>Song search</td>
                        <td><a href="/#/music" style = {{color: this.props.secondCol}}><code>[domain name]/#/music</code></a></td>
                    </tr>
                    <tr>
                        <td>Song page</td>
                        <td><a href="/#/music/ROJD2Xq" style = {{color: this.props.secondCol}}><code>[domain name]/#/music/xxxxxxx</code></a> (7-digit generated string)<br /><a href="/#/music/_Q_mt1Ftrto" style = {{color: this.props.secondCol}}><code>[domain name]/#/music/xxxxxxxxxxx</code></a> (YouTube watch ID)</td>
                    </tr>

                </table>
                
            </div>
        );
    }
}
 
export default About;