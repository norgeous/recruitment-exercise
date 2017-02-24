/* global $:true */

import React, {
  Component,
  PropTypes
}                       from 'react';
import XMLHttpRequestPromise from 'xhr-promise';
import moment from 'moment';

class Weather extends Component {

  constructor(props) {
    super(props);

    console.log(props);

    this.state = {
      cityname: props.for,
      forecast: []
    };
  }
  
  componentDidMount() {
    this.getApiData();
  }

  getApiData() {
    const me = this;
    var xhrPromise = new XMLHttpRequestPromise();
     xhrPromise.send({
      method: 'GET',
      url: 'http://api.openweathermap.org/data/2.5/forecast?q='+me.state.cityname+'&appid=5926a20191fdc7e62230c6d153a9d609'
    })
    .then(function (results) {

      if (results.status !== 200) throw new Error('request failed');

      let data = results.responseText;
      let trimmed_data = [];

      // itterate through list and push data into more organised structure
      for (let item of data.list) {

        let thismoment = moment(item.dt*1000);
        let today = thismoment.clone().startOf('day');
        let todayname = today.format('dddd');

        // add day object to trimmed_data (if not exist)
        if(trimmed_data.find(forecast => forecast.day === todayname) === undefined){
          trimmed_data.push({
            day: todayname,
            date: thismoment.format('dddd Do MMMM YYYY'),
            daily_forecast:[]
          });
        }

        // add this forecast into daily_forecast
        let todays_daily_forecast = trimmed_data.find(forecast => forecast.day === todayname).daily_forecast;
        todays_daily_forecast.push({
          description: item.weather[0].description,
          icon: "http://openweathermap.org/img/w/" + item.weather[0].icon + ".png",
          hour: thismoment.format('hA'),
          until: thismoment.fromNow()
        });

      }

      me.setState({
        cityname: data.city.name,
        forecast: trimmed_data
      });

    })
    .catch(function (e) {
      console.error('XHR error',e);
    });
  }

  render() {
    const { cityname, forecast } = this.state;
    return (
      <div className="Weather">
        <h2>{cityname}</h2>
        <div className="forecast flexy h">
          {forecast.map(day =>
            <div className="day" key={day.day}>
              <h3>{day.date}</h3>
              <div className="daily-forecast flexy h">
                {day.daily_forecast.map((daily_forecast_item, i) =>
                  <div key={i} className="item flexy v" title={daily_forecast_item.description+' '+daily_forecast_item.until}>
                    <div className="icon">
                      <img src={daily_forecast_item.icon} alt={daily_forecast_item.description}/>
                    </div>
                    <div className="time">
                      {daily_forecast_item.hour}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

}

export default Weather;
