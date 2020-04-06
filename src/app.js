const path = require('path');
const hbs = require('hbs');
const express = require('express');

const geoCode = require('./geoCode')
const forecast = require('./forecast')


const app =express();

//Define paths for express confiquration
const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialPath = path.join(__dirname,'../templates/partials');

//HandleBars engine and views location
app.set('view engine', 'hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialPath);
//Set up static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index', {
        title:"Wather App",
        name:"Stefan Vuksic"
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        name:"Stefan Vuksic",
        title:"About me"
    })
})


app.get('/help',(req,res)=>{
    res.render('help',{
        helpText:"This is some helpfull text example.",
        title:'Page Help',
        name:"Stefan Vuksic"
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404', {
        title:'404',
        name:"Stefan Vuksic",
        errorMessage:"Help article not found."
    })
})

app.get('/weather',(req,res)=>{ 
    if(!req.query.address){
        return res.send({
            error:'You must provide an address.'
        })
    }
    geoCode(req.query.address,(error,{longitude,latitude,location}={})=>{
            if(error){
                return res.send({
                    error
                })
            }

            forecast(latitude,longitude, (error, forecastData)=>{
                if(error){
                    return res.send({error})
                }
                res.send({
                    forecast:forecastData,
                    location,
                    address:req.query.address
                })
            })
    })
})

app.get('/products', (req,res)=>{
    if(!req.query.search){
        return res.send({
           error:'You must provide your search tearm.' 
        })
    }
    console.log(req.query)
    res.send({
        products:[]
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        errorMessage:"Page not found.",
        title:"404",
        name:"Stefan Vuksic"
    })
})





app.use(express.static(path.join(__dirname, '../public/about.html')))
app.use(express.static(path.join(__dirname, '../public/help.html')))




app.listen(3000,()=>{
    console.log('Server is on port 3000')
})

