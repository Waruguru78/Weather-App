import axios from 'axios';

const api_key = '48b119bfa29977ee63c83c5192714518';
const city = 'London';

axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });