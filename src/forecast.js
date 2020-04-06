const request = require('request');

const forecast = (latitude,longitude, callback)=>{

    const url = 'https://api.darksky.net/forecast/8eb0821ccd353688ab675f39bc4ffd9f/' + latitude + ',' + longitude;

    request({url, json:true}, (error,response)=>{
        if(error){
            callback('Unable to connect to wather service.',undefined)
        }else if(response.body.error){
            callback('Unable to find location.', undefined)
        }else{
            callback(undefined, response.body.daily.data[0].summary)
        }
    })
}   
module.exports = forecast;