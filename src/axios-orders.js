import axios from 'axios';

const instance = axios.create({
    baseURL: "https://suhash-react-burger.firebaseio.com/"
});

export default instance;