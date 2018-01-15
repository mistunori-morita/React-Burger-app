import axios from 'axios';


const instance = axios.create({
  baseURL: 'https://react-buger-be17f.firebaseio.com/'
});


export default instance;
