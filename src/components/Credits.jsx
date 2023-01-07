import React, { Component } from 'react';
class Credits extends Component {
    state = {  } 
    render() { 
        return (
            <div>
                <h1 className = "bodyTextHeader" style = {{color: this.props.firstCol}}>Credits</h1>
                <div className = "block" style = {{backgroundColor: this.props.secondCol}}></div>
                <p className = 'bigText'>Thank you to:</p>

                <li className='indivList'>Tobu, Noisestorm, Shut Eye (Multex) and other musical artists who created the epic songs I could transcribe!</li>
                <li className='indivList'><a href="https://www.youtube.com/@LionelYuOfficial" style = {{color: this.props.firstCol}}>MusicalBasics</a> and other piano-based YouTube channels to inspire me to create PitchKeys</li>
                <li className='indivList'>My first few subscribers and viewers!</li>
                <li className='indivList'>All other subscribers and viewers!</li>
                <li className='indivList'><a href="https://freecodecamp.org" style = {{color: this.props.firstCol}}>FreeCodecamp</a> and this <a href="https://www.youtube.com/watch?v=Ke90Tje7VS0" style = {{color: this.props.firstCol}}>React tutorial</a> to help me get into full stack development!</li>
            </div>
        );
    }
}
 
export default Credits;