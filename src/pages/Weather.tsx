import { makeStyles } from '@mui/styles';
import {Box, Grid, Typography} from '@mui/material';
import React, { useState } from 'react';
import 'dotenv/config'

import COUNTRIES from '~/components/CountrySelect';
import CountryType from '~/components/CountrySelect';
import Outfit from '~/components/Outfit';

import Cloud from '@mui/icons-material/Cloud';
import Sun from '@mui/icons-material/LightMode';

import sunhat from '../images/outfits/sunhat.png';

//https://api.openweathermap.org/geo/1.0/zip?zip=L6Y4W6,CA&appid=c0f957daa1315f627f7244c78fc760e7
//


const useStyles = makeStyles({
    root:{
        display:'flex',
        gap: '2rem',
        textAlign:'center',
        fontWeight: 500,
        fontSize: '125%',
        height: '100vh'
    },
    header:{
        fontWeight: 600,
        fontSize: '150%',
        textAlign: 'left'
    },
    rightHeader:{
      fontWeight: 700,
      fontSize: '150%',
  },
    titleBox:{
        fontWeight: 800,
        fontSize: '150%',
        textAlign: 'left',
        height: '5vh'
    },
    heading1: {
        color:'#4271e7',
        fontSize: '200%',
        textAlign: 'right'
    },
    leftSide:{
        display:'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width:'60vw',
        padding: '5rem',
        backgroundColor: '#CAF0F8',
        gap: '2rem'
    },
    homeButton:{
        width: '30%',
        padding: '1rem 2rem',
        borderRadius: '1rem',
        backgroundColor:'#158dfc'
    },
    rightSide:{
        display:'flex',
        flexDirection:'column',
        gap: '2rem',

        height: '100vh',
        width:'40vw',
        padding:'2%'
    },
    currentWeather: {
        height:'50vh',
        backgroundColor: 'white',
        padding:'3rem',

    },
    week: {
        height:'20vh',
    },
    blue: {
        backgroundColor: '#4271E7',
        color: '#FEFCFB',
        height: '100%',
        borderRadius: '5%',
        padding: '5%'
    },
    white: {
        backgroundColor: 'white',
        color: 'blue',
        height: '100%',
        borderRadius: '5%',
        padding: '5%'
    },
    iconAndTemp: {
        display:'flex',
        flexdirection: 'row',
        alignItems: 'center', 
        height: '60%',
    },
    whiteUnderline:{
        borderBottom: '0.2rem solid white',
        width: '100%',
        display: 'block'
        },
    blueUnderline: {
        borderBottom: '0.2rem solid #4271E7',
        width: '100%',
        display: 'block'    
    },
    content: {
        height:'100%',
        align:'center',
        alignItems:'center',
        padding: '1rem'
    },
    submitButton:{
      width: '30%',
      color: 'white',
      padding: '1rem 2rem',
      borderRadius: '1rem',
      backgroundColor:'#546D64',
      '&:hover': {
          backgroundColor: '#3a4742',
        }
    },
})
const days = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];
const dayWeather = ['1','2','3','4','5','6','7']
const dayList = days.map((day, index) =>
 <Grid item key = {index} xs={1}>
  <Box sx={{
        backgroundColor: 'white',
        color: '#4271E7',
        height: '100%',
        borderRadius: '5%',
        padding: '5%'
    }}>
      <Box sx={{borderBottom: '0.2rem solid #4271E7',
        width: '100%',
        display: 'block' }}>{day}</Box>

        <Box sx={{
        height:'100%',
        align:'center',
        alignItems:'center',
        padding: '1rem'
    }}>
    <Typography align='center' alignItems='center'>{dayWeather[index]}</Typography>
    </Box>
  </Box>
</Grid>
);


const subtitles = ['a', 'b', 'c', 'd'];
const titles = ['Wind', 'Humidity', 'UV', 'Precipitation'];

const titleList = titles.map((title, index) => 
{
if (index%2===0) {
    return <Grid key = {index} item xs={3}>
    <Box sx={{
        backgroundColor: '#4271E7',
        color: 'white',
        height: '100%',
        borderRadius: '5%',
        padding: '5%'
    }}>
    <Box sx={{
        borderBottom: '0.2rem solid white',
        width: '100%',
        display: 'block'
        }}>{title}</Box>
    <Box sx={{
        height:'100%',
        align:'center',
        alignItems:'center',
        padding: '1rem'
    }}>
    <Typography align='center' alignItems='center'>{subtitles[index]}</Typography>
    </Box>
    </Box>
    </Grid>
}
else{
return <Grid key = {index} item xs={3}>
    <Box sx={{
        backgroundColor: 'white',
        color: '#4271E7',
        height: '100%',
        borderRadius: '5%',
        padding: '5%'
    }}>
    <Box sx={{
        borderBottom: '0.2rem solid #4271E7',
        width: '100%',
        display: 'block'
        }}>{title}</Box>
    <Box sx={{
        height:'100%',
        align:'center',
        alignItems:'center',
        padding: '1rem'
    }}>
    <Typography color='light gray' align='center' alignItems='center' >{subtitles[index]}</Typography>
    </Box>
    </Box>
    </Grid>
}
}
);





const Weather: React.FC = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [latitude, setLatitude] = useState(43.65);
    const [longitude, setLongitude] = useState(-79.38);
    
    const classes= useStyles();
    const fetchWeatherData = async () => {
      try {
          const options = {method: 'GET', headers: {accept: 'application/json'}};
          // console.log(process.env.API_KEY)
  
          const APIREQ = "https://api.openweathermap.org/data/3.0/onecall?lat=" + latitude + "&lon="+ longitude + "&appid=c0f957daa1315f627f7244c78fc760e7"
          const response = await fetch(APIREQ);
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          const jsonData = await response.json();
  
          console.log(jsonData)
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          setWeatherData(jsonData)
  
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };
  
    return (
      <Box>
        
        
<Box className={classes.root}>
        <Box className={classes.leftSide}>
        <Box className={classes.titleBox}>

        <button className={classes.submitButton} onClick={fetchWeatherData}>Get Weather</button>
        </Box>
        <Box>
  
          {weatherData? (weatherData["timezone"]) : <p>no data yet</p>}
          {weatherData ? (
            <pre>{JSON.stringify(weatherData, null, 2)}</pre>
          ) : (
            <p>No data fetched yet.</p>
          )}
        </Box>
            <Box  className={classes.currentWeather}>
                <Box height='80%' className={classes.header}  justify-content="center">Current Weather
                    <Typography color='gray' alignItems='start' fontSize='70%'paddingLeft='2rem'>1:05AM</Typography>
                    <Box height='90%' className={classes.iconAndTemp}   justifyContent="space-evenly">
                        <img width="25%" src="icons/cloud.png"></img>
                        <Box >
                            <Typography color='#4271E7' alignItems='end' fontSize='300%'fontWeight='700'>23°C</Typography>
                            <Typography color='gray' alignItems='end' fontSize='85%'>Feels like 30°C</Typography>
                        </Box>
                    </Box>
                </Box>
                <Grid container columnSpacing={5}>
                    {titleList}
                </Grid>
            </Box>

            <Grid container columns={8} className={classes.week}>
                <Grid item xs={1}>
                    <Box className={classes.blue}>
                            <Box className={classes.whiteUnderline}>Date</Box>
                        </Box>
                </Grid>
                {dayList}
                
            </Grid>
        </Box>
        <Box className={classes.rightSide}>
          <h1 className={classes.rightHeader}>Your Recommended Outfit</h1>
          <Grid container columns={2}>
          <Outfit outfitPic={sunhat} heading={"Hat"} description={"Wide-brimmed sunhat"} icon={<Sun/>} chipColor={"warning"} chipDescription={"It is sunny outside!"}/>
          <Outfit outfitPic={sunhat} heading={"Hat"} description={"Wide-brimmed sunhat"} icon={<Sun/>} chipColor={"warning"} chipDescription={"It is sunny outside!"}/>
          </Grid>
        </Box>
    </Box>
      </Box>

    );
  };
  
  export default Weather;