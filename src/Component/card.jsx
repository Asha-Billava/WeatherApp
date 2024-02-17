import React from 'react'
import './card.css'
import moment from 'moment'

function Card (props) {
  return (
    <React.Fragment>
    {props.forecastData!==0&&props.forecastData.map((item,index)=>{
        return(

        <div class="card" style={{ display: 'inline-block' }} key={index}>
            {moment(item.dt_txt).format('HH:mm')=='00:00'?(
                <div class="card-header">{moment(item.dt_txt).format('MM/DD')}</div>
            ):(
                <div class="card-header">{moment(item.dt_txt).format('HH:mm')}</div>
            )}
        
        <div >
        <img  src= {`http://openweathermap.org/img/w/${item.weather[0].icon}.png`} height={40} width={40}></img> 

           <h6>{item.main?.temp?.toFixed()}°C</h6> 
          <span style={{fontSize:'11px'}}>{item.weather[0].description}</span>
        </div>
      </div>
    )})}
    </React.Fragment>
  )
}

export default Card