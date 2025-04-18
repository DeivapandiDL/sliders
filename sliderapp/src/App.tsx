import React, { useEffect, useState } from 'react';
import './App.css';
// import { slider } from './slider';
import { carouselSlider } from './carouselslider';
import './slider.scss'
import image from './assets/banner1.jpg'

interface sliderInterace {
  id:number;
  imageUrl?:string;
  caption?:string;
  link?:string;
  className?:string;
}
interface sliderObj {
  interval:number,
  sliderType:string;
  sliderAuto:boolean;
  customWidth?:number
}

function App() {

let sliderList:sliderInterace[] = [
{id:1,imageUrl:'/assets/banner1.jpg',caption:'first banner',link:"first link"},
{id:2,imageUrl:'/assets/banner2.jpg',caption:'second banner',link:"second link"},
{id:3,imageUrl:'/assets/banner3.jpg',caption:'Third banner',link:"third link"}
];
let sliderData:sliderObj = {
  interval:3000,
  sliderType:'carousel',
  sliderAuto:false,
  customWidth:1000
}


  let initialLoad = 0;
  useEffect(() =>{
    if(initialLoad == 0){ 
    // slider(sliderList,sliderData);
    carouselSlider(sliderList,sliderData);
    initialLoad = 1;
    }
  },[])

  return (
    <>
    <div className="sliderContainer" id='devaSlider'></div>
    </>
  );
}

export default App;
