
import Home from './components/Home'
import Admin from './components/Admin'
import SongFull from './components/SongFull';
import {Routes, Route, HashRouter} from "react-router-dom"
import Header from './components/Header';
import Footer from './components/Footer';
import React from 'react';
import Search from './components/Search';
import Status404 from './components/Status404';

function App() {
  /*const [colorsList, updateColor] = React.useState([]);
  React.useEffect(() => {
    updateColor(['lightseagreen', "#c29500"])
  })*/
  let colorsList = ['#00bbff', "#70b509"];
  

  return (
    <div>
        <Header firstCol = {colorsList[0]} secondCol = {colorsList[1]}/>
       
          <Routes>
            <Route path = "/" element = {<Home firstCol = {colorsList[0]} secondCol = {colorsList[1]}/>}></Route>
            <Route path = "/admin" element = {<Admin />}></Route>
            <Route path = "/music/:id" element = {<SongFull firstCol = {colorsList[0]} secondCol = {colorsList[1]}/>}></Route>
            <Route path = "/music" element = {<Search firstCol = {colorsList[0]} secondCol = {colorsList[1]}/>}></Route>
            <Route path = "*" element = {<Status404 firstCol = {colorsList[1]} secondCol = {colorsList[0]}/>}></Route>
          </Routes>
          
      
        <Footer firstCol = {colorsList[0]} secondCol = {colorsList[1]}/>
    </div>
  );
}

export default App;

