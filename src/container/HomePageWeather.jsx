  import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import "./style.css"
import axios from 'axios'
import BaseUrl from '../BaseURL'
import { ApiKey } from '../BaseURL'
import Card from '../Component/card'
import moment from 'moment'

function HomePageWeather() {

  const forecastRef = useRef(null);

  const [searchCity,setSearchCity]=useState('')
  const [weatherData, setWeatherData]=useState('')
  const [forecastData, setforecastData]=useState([])

  const getWeatherData=async(getdata)=>{

    // e.preventDefault()
    // -----name of Api--------//
    const getDataByCity=`${BaseUrl}/weather?q=${searchCity}&units=imperial&appid=${ApiKey}`;
    const getDataByLatitude= `${BaseUrl}/weather?lat=${getdata?.latitude}&lon=${getdata?.longitude}&units=imperial&appid=${ApiKey}`


    await axios.get(searchCity!==''?getDataByCity:getDataByLatitude)
    .then((resp)=>{
      setWeatherData(resp?.data)
      setSearchCity('')

    }).catch((err)=>{
      console.log(err)
      setSearchCity('')
    })

  }

  const getForecastData=async(getdata)=>{

    // e.preventDefault()
    // -----name of Api--------//
    
    const getDataByCity=`${BaseUrl}/forecast?q=${searchCity}&cnt=14&units=imperial&appid=${ApiKey}`;
    const getDataByLatitude= `${BaseUrl}/forecast?lat=${getdata?.latitude}&lon=${getdata?.longitude}&cnt=14&units=imperial&appid=${ApiKey}`


    await axios.get(searchCity!==''?getDataByCity:getDataByLatitude)
    .then((resp)=>{
      setforecastData(resp?.data?.list)

    }).catch((err)=>{
      console.log(err)
    })

  }


  useEffect(() => {
    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                  getWeatherData(position?.coords)
                   getForecastData(position?.coords)
                },
                error => {
                    console.log(error.message);
                }
            ); 
        } else {
          console.log("Geolocation is not supported by this browser.");
        }
    };
    getLocation();
}, []);

const scrollLeft = () => {
  if (forecastRef.current) {
    forecastRef.current.scrollLeft -= 100; 
  }
};

const scrollRight = () => {
  if (forecastRef.current) {
    forecastRef.current.scrollLeft += 100;
  }
};

  return (
    <div className='MainContainer'>
     <div className='container-fluid'>

     
      {/************************SearchBar*************************** */}
       <div className='Searchbar'>
          <input type='text' placeholder='Search City' autoFocus="off" value={searchCity} 
          onChange={(e)=>{
            setSearchCity(e.target.value)
          }}
          
          onKeyPress={(e)=>{
            if(e.key==='Enter'&&e.target.value!==""){
              
                getWeatherData()
                getForecastData()
             
            }

          }}
          ></input>
            <i className="fa fa-spinner fa-spin"></i>
          <button type="submit" id="btn" className='bi bi-search' onClick={(e)=>{
            if(e.target.value!==""){
              getWeatherData()
              getForecastData()
            }
           
          }}></button>
        </div>

       
      

        <div className='MainContent'>
        {/************************Temperature*************************** */}
          <div className='firstConatiner'>
            <div className='Loaction bold'><h2>{weatherData.name&&weatherData.name}</h2></div>
            <div className='temp'>
              <h1>{weatherData?.main&&weatherData?.main?.temp.toFixed()}°C</h1>
            </div>
            <div className='Description'><p>{weatherData?.weather&&weatherData?.weather[0]?.description}</p>
            </div>

          </div>

          {/************************Humidity*************************** */}

          <div className='lastContainer'>
            <div className='lastContainerChild'>
              <li className='bi bi-thermometer-sun' ></li>
              <p className='bold'>{weatherData?.main&&weatherData?.main?.feels_like.toFixed()}°C</p>
              <p>Feels Like</p>
            </div>
            <div className='lastContainerChild'>
              <li className='bi bi-droplet-half' ></li>
              <p  className='bold'>{weatherData?.main&&weatherData?.main?.humidity}%</p>
                <p >Humidity</p>
            </div>
            <div className='lastContainerChild'>
              <li className='bi bi-wind' ></li>
                <p  className='bold'>{weatherData?.wind&&weatherData?.wind?.speed}MPH</p>
                <p>Wind</p>
            </div>
          </div>
        </div>
        <div className='forecast'>
        <button className='carousel-button left' onClick={scrollLeft} onTouchStart={scrollLeft}>
          {/* <li className="bi bi-chevron-left"></li> */}
          </button>
        <button className='carousel-button right' onClick={scrollRight} onTouchStart={scrollRight}>
          {/* <li className="bi bi-chevron-right"></li> */}
          </button>
      
        <div className='forecastInside'>
        
        <div className='srollDiv' ref={forecastRef}>
              <Card  forecastData={forecastData}/>
        </div>
        
        </div>
        </div>
        </div>
        
      
      
    </div>
  )
}

export default HomePageWeather






