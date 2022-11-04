import React, { Component } from 'react';
import "./search.css"
import APIget from "./APIget";
import FilterSongs from './FilterSongs';

class Search extends Component {
    state = { 
        criteria: ["NCS", "Classical", "Other EDM", "Meme", "Possible", "Impossible", "X levels of (song)"],
        criteriaSelected: [true, true, true, true, true, true, true],
        files: ["MIDI (.mid/.midi)", "Audio (.mp3/.flac)", "Musescore file (.mscz)", "Sheet Music (.pdf)", "YouTube video"],
        filesSelected: [true, true, true, true, true],
        numericalFilters: [
            {filter: "Note Count", lessThan: 20000, moreThan: 0, order: "none"},
            {filter: "BPM", lessThan: 200, moreThan: 0, order: "none"},
            /*{filter: "Date Uploaded", lessThan: new Date().getTime(), moreThan: 0, order: "Descending"}*/
            {filter: "Rating", lessThan: 5, moreThan: 0, order: "none"},
            {filter: "Duration (in sec.)", lessThan: 600, moreThan: 0, order: "none"},
            {filter: "# of ratings", lessThan: 100, moreThan: 0, order: "none"},
        ],
        numericalFiltersVisibility: [false, false, false, false, false, false],
        normalFiltersVisibility: [false, false],
        display: {display: "block"},
        filter: "relevance",
        order: -1,
        searchQuery: ''
    } 

    getSongTypes(){
        let arr = []
        for (let i = 0; i < this.state.criteria.length; i++){
            if(this.state.criteriaSelected[i]){
                arr.push(this.state.criteria[i])
            }
        }

        if(arr.length == this.state.criteria.length){
            return ("All")
        }else{
            return arr.join(", ")
        }
    }

    getFileTypes(){
        let arr = []
        for (let i = 0; i < this.state.files.length; i++){
            if(this.state.filesSelected[i]){
                arr.push(this.state.files[i])
            }
        }

        if(arr.length == this.state.files.length){
            return ("All")
        }else{
            return arr.join(", ")
        }
    }
    
    applyChangesForType(){
        //process filters + search
        let typeFilters = [] //could contains numbers 1 thru 7
        
        for (let i = 0; i < this.state.criteriaSelected.length; i++){
            if (this.state.criteriaSelected [i]){
                typeFilters.push(i+1)
            }
        }
        return typeFilters;
    }

    applyChangesForFile(){
        let fileFilters = this.state.filesSelected;
        for (let i = 0; i < this.state.filesSelected.length; i++){
            fileFilters[i] = Number(fileFilters[i]);
        }
        return fileFilters;
    }
    

    changeValue(e){
        let c = this.state.criteriaSelected;
        c[this.state.criteria.indexOf(e.currentTarget.name)] = !c[this.state.criteria.indexOf(e.currentTarget.name)];
        this.setState({
            criteriaSelected: c
        })

    }

    changeFileValue(e){
        let c = this.state.filesSelected;
        c[this.state.files.indexOf(e.currentTarget.name)] = !c[this.state.files.indexOf(e.currentTarget.name)];
        this.setState({
            filesSelected: c
        })

    }

    changeNumericalFilters(e, index){
        let f = this.state.numericalFilters
        if (e.target.id == "from"){
            f[index].moreThan = parseInt(e.target.value);
        }else if (e.target.id == "to"){
            f[index].lessThan = parseInt(e.target.value);
        }else{
            f[index].order = e.target.value;
        }

        this.setState({
            numericalFilters: f
        })
    }

    updateNumericalFiltersVisibility(e){
        let index = e.currentTarget.id.substring(6)
        let c = this.state.numericalFiltersVisibility;
        c[index] = !c[index];
        this.setState({
            numericalFiltersVisibility: c
        })
    }

    updateNormalFiltersVisibility(index){
        let c = this.state.normalFiltersVisibility;
        c[index] = !c[index];
        this.setState({
            normalFiltersVisibility: c
        })
    }

    getVisibility(index){
        if(this.state.numericalFiltersVisibility[index]){
            return {display: "block"}
        }else{
            return {display: "none"}
        }
    }

    getNormalFiltersVisibility(index){
        if(this.state.normalFiltersVisibility[index]){
            return {display: "block"}
        }else{
            return {display: "none"}
        }
    }

    changeCriteria = (e) => {this.setState({filter: e.target.value})}
    changeOrder = (e) => {this.setState({order: e.target.value})}
    updateSearch = (e) => {
        this.setState({searchQuery: e.target.value})
        console.log(this.state.searchQuery)
    }

    render() { 
        return (
            <div>  
                <div id = "mainSearch">
                    <div id = "searchTypesList" /*style={{height: window.innerHeight + "px"}}*/>
                        <div className = "flexNumericalInput">
                        <label htmlFor="" className = "inequality">Sort by...</label>
                        <select className = "appliedNumericalFiltersInput" onChange = {(e) => this.changeCriteria(e)}>
                            <option value="songname">Alphabetical</option>
                            <option value="relevance" selected>Relevance</option>
                            <option value="download">Downloads</option>
                            <option value="date">Date Uploaded</option>
                            <option value="notecount">Notecount</option>
                            <option value="bpm">BPM</option>
                            <option value="rating" >Rating</option>
                            <option value="duration" >Duration</option>
                            <option value="numRatings" ># of ratings</option>
                        </select>
                        </div>

                        <div className = "flexNumericalInput">
                        <label htmlFor="order" className = "inequality">Order</label>
                        <select className = "appliedNumericalFiltersInput" onChange = {(e) => this.changeOrder(e)}>
                            <option value = {1} selected>Ascending</option>
                            <option value = {-1}>Descending</option>
                        </select>
                        </div>

                        <p className = "filtersHeader1">Filter by...</p>
                        <div className = "appliedNumericalFilters" style = {{borderLeft: "2px solid " + this.props.firstCol, color: this.props.firstCol}} onClick = {() => this.updateNormalFiltersVisibility(0)}>Song type</div>
                        <div className = "detailed" style = {this.getNormalFiltersVisibility(0)}>
                        {this.state.criteria.map(c => 
                            <div className = "sel">
                                <input type = "checkbox" name = {c} key = {c} class = 'inputBox' onChange = {(e) => this.changeValue(e)} checked = {this.state.criteriaSelected[this.state.criteria.indexOf(c)]}/>
                                <label for = {c} key = {c + "label"} class = 'inputText'>{c}</label>
                            </div>
                        )}
                        </div>
                        <p id = "filterConstraints">Applied: <span style={{fontWeight: "bold", color: this.props.secondCol}}>{this.getSongTypes()}</span></p>

                        <div className = "appliedNumericalFilters" style = {{borderLeft: "2px solid " + this.props.firstCol, color: this.props.firstCol}} onClick = {() => this.updateNormalFiltersVisibility(1)}>Files available</div>
                        <div className = "detailed" style = {this.getNormalFiltersVisibility(1)}>
                        {this.state.files.map(c => 
                            <div className = "sel">
                                <input type = "checkbox" name = {c} key = {c} class = 'inputBox' onChange = {(e) => this.changeFileValue(e)} checked = {this.state.filesSelected[this.state.files.indexOf(c)]}/>
                                <label for = {c} key = {c + "label"} class = 'inputText'>{c}</label>
                            </div>
                        )}
                        </div>
                        <p id = "filterConstraints">Applied: <span style={{fontWeight: "bold", color: this.props.secondCol}}>{this.getFileTypes()}</span></p>

                        <p className = "filtersHeader1">Customize range</p>
                        {this.state.numericalFilters.map(f=> (
                        <div>
                            <div className = "appliedNumericalFilters" id = {"filter" + this.state.numericalFilters.indexOf(f)} onClick = {(e) => this.updateNumericalFiltersVisibility(e)} style = {{borderLeft: "2px solid " + this.props.firstCol, color: this.props.firstCol}}>{f.filter}</div>

                            <div className = "detailed" style = {this.getVisibility(this.state.numericalFilters.indexOf(f))}>
                                <div className = "flexNumericalInput">
                                    <p className = "inequality">From</p>
                                    <input 
                                    type="number" 
                                    className = "appliedNumericalFiltersInput" 
                                    id = "from"
                                    value = {f.moreThan} 
                                    placeholder = "from"
                                        
                                    onChange = {(e) => this.changeNumericalFilters(e, this.state.numericalFilters.indexOf(f))}/>
                                </div>

                                <div className = "flexNumericalInput">
                                    <p className = "inequality">To</p>
                                    <input 
                                    type="number" 
                                    className = "appliedNumericalFiltersInput" 
                                    value = {f.lessThan } 
                                    id = "to"
                                    placeholder = "To"
                                        
                                    onChange = {(e) => this.changeNumericalFilters(e, this.state.numericalFilters.indexOf(f))}/>
                                </div>          
                            </div>
                            <p id = "filterConstraints">Range: <span style={{fontWeight: "bold", color: this.props.secondCol}}>{this.state.numericalFilters[this.state.numericalFilters.indexOf(f)].moreThan + "-" + this.state.numericalFilters[this.state.numericalFilters.indexOf(f)].lessThan}</span></p>
                            </div>
                        ))}
                    </div>
                    
                    <div style = {{width: "75%"}} id = "outer">
                        
                        <input type="text" placeholder={'Search a keyword'} id = "mainSearchBar" name = "q" onChange = {(e) => this.updateSearch(e)}/>
                        
                        <FilterSongs 
                        filters = {{types: this.applyChangesForType(), 
                        files: this.applyChangesForFile(), 
                        numericalFilters: this.state.numericalFilters, 
                        type: this.state.filter,
                        order: this.state.order,
                        query: this.state.searchQuery,
                        }}
  
                        firstCol = {this.props.firstCol} 
                        secondCol = {this.props.secondCol} 
                        left = {false}
                        limit = {1000}
                        random = {false}/>
                    </div>
                </div> 
            </div>
        );
    }

    
}
 
export default Search;