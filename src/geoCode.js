const request = require('request')


const geoCode = (address,callback)=>{

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1Ijoic3RlZmFudnVrc2ljIiwiYSI6ImNrOGVkejQxazE1MG8zbG1qMGd3b3U0bmkifQ.t9n1FFz9Y7su-vHOYWA1MQ&limit=1'

    request({url,json:true}, (error,response)=>{
        if(error){
            callback("Unable to connect", undefined)
        }
        else if(response.body.features.length === 0){
            callback("unable to find location,try another search.",undefined)
        }
        else{
            callback(undefined, {
                latitude:response.body.features[0].center[1],
                longitude:response.body.features[0].center[0],
                location:response.body.features[0].place_name
            })
        }
    })
}
 
module.exports = geoCode;