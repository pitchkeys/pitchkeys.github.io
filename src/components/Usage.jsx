import React, { Component } from 'react';
import "./About.css"
class Usage extends Component {
    state = {  } 
    render() { 
        return (
            <div>
                <h1 className = "bodyTextHeader" style = {{color: this.props.firstCol}}>Usage policy</h1>
                <div className = "block" style = {{backgroundColor: this.props.secondCol}}></div>
                <p className='bodyText'>The files that you download from this website (.mp3/.flac, .mid, .mscz, .pdf) can be used for <b style = {{color: this.props.firstCol}}>personal use</b> as well as <b style = {{color: this.props.firstCol}}>some instances on social media (e.g. YouTube, Instagram, etc...)</b> only. All of these transcriptions belong to me and you may not <i>claim</i> any of these files as yours.</p>

                <p className = 'bigText'>You <b style = {{color: this.props.firstCol}}>may</b>:</p>
               
                    <li className='indivList'>Use these files for personal use.</li>
                    <li className='indivList'>Use these files for both <b style = {{color: this.props.firstCol}}>monetized and unmonetized</b> YouTube videos, Instagram posts, and other social media <b style = {{color: this.props.firstCol}}>as long as you give me credit.</b></li>
                    <li className='indivList'>Remix (i.e. significantly change) the files and upload a remixed version of my transcriptions/covers on social media.</li>
             
                <p className = 'bigText'>You <b style = {{color: this.props.secondCol}}>may not</b>:</p>
               
               <li className='indivList'>Claim these files.</li>
               <li className='indivList'>Use these files on social media without giving credit.</li>
               <li className='indivList'>Re-upload or "half-remix" (e.g. increasing tempo, transposing, changing soundfont) my transcriptions on social media.</li>
            </div>
        );
    }
}
 
export default Usage;