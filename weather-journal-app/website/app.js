/* Global Variables */
const apiKey= '07901b9bb7532b5bf90d188ed809cdcb';
let baseURL= `https://api.openweathermap.org/data/2.5/weather?zip=`
let restBaseURL= '&units=metric&appid=';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();
// here we initiate the first async function
document.getElementById('generate').addEventListener('click', getWeatherLink);
//fetching data from weather api
const getWeather = async (baseURL,zip,rest,key )=>{
    const res = await fetch(baseURL+zip+rest+key)
    try{
        const data = await res.json();
        return data
        console.log(data.main.temp)
    } catch (error) {
        console.log('error'+error)
    }
}
// here we make our GET and Post and another GET request to update UI
function getWeatherLink(){
    let feelingsArea= document.getElementById('feelings').value;
    let zipCode= document.getElementById('zip').value;
    if ((zipCode >= 10001)&&(zipCode <= 99950) ){
        getWeather(baseURL, zipCode, restBaseURL, apiKey)
            .then(function (data) {
                // console.log(data);
                postData('/addEntry',{temperature: data.main.temp, date: newDate,
                    feel: feelingsArea})
                updateUI()
            })
    }else if (isNaN(zipCode)){
        alert('Please Enter a ZipCode')
    }else {
        alert('Please Enter a Valid US ZipCode')
    }
}
const postData = async (url = '', data = {})=>{
    const response = await fetch ( url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const newData= await response.json();
        return newData;
    } catch (error){
        console.log('error', error);
    }
}

const updateUI = async ()=>{
    let date= document.getElementById('date')
    let temp= document.getElementById('temp')
    let content= document.getElementById('content')
    const req = await fetch('/combinedData');
    try {
        const combinedData= await req.json();
        date.innerHTML= 'Date: '+combinedData.dates
        temp.innerHTML= 'Temperature: '+combinedData.temperatures + '&#8451;'
        content.innerHTML= 'Message: '+combinedData.feels
    } catch (error) {
        console.log('error',error)
    }
}
