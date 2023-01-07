
import Home from './components/Home'
import Admin from './components/Admin'
import SongFull from './components/SongFull';
import {Routes, Route} from "react-router-dom"
import Header from './components/Header';
import Footer from './components/Footer';
import React from 'react';
import Search from './components/Search';
import Status404 from './components/Status404';
import About from './components/About';

function App() {
  /*const [colorsList, updateColor] = React.useState([]);
  React.useEffect(() => {
    updateColor(['lightseagreen', "#c29500"])
  })*/
  let colorsList = ["#c4ac25", 'lightseagreen'];

  

  return (
    <div style = {{width: "100%", height: "100%"}}>
        <Header firstCol = {colorsList[0]} secondCol = {colorsList[1]}/>
        {/*<div id = "colorPickerMenu" >
          <div style = {{display: "flex"}}>
            <input type = "text" placeholder='Color 1' className='colorInput' onChange={(e) => colorsList[0] = e.target.value} value = {colorsList[0]}></input>
            <input type = "text" placeholder='Color 2' className='colorInput' onChange={(e) => this.updateSecondField(e)}></input>
            <button>Update</button>
          </div>
          <div id = "colorPicker">⚙</div>
  </div>*/}
        
          <Routes>
            <Route path = "/" element = {<Home firstCol = {colorsList[0]} secondCol = {colorsList[1]}/>}></Route>
            <Route path = "/admin" element = {<Admin />}></Route>
            <Route path = "/about" element = {<About firstCol = {colorsList[0]} secondCol = {colorsList[1]}/>}></Route>
            <Route path = "/music/:id" element = {<SongFull firstCol = {colorsList[0]} secondCol = {colorsList[1]}/>}></Route>
            <Route path = "/music" element = {<Search firstCol = {colorsList[0]} secondCol = {colorsList[1]}/>}></Route>
            <Route path = "*" element = {<Status404 firstCol = {colorsList[1]} secondCol = {colorsList[0]}/>}></Route>
          </Routes>
          
      
        <Footer firstCol = {colorsList[0]} secondCol = {colorsList[1]}/>
    </div>
  );
}

export default App;

