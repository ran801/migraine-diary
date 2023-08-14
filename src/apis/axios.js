import axios from "axios";

const axioxInstance = axios.create({
    baseURL:"http://localhost:3000/",

    headers:{
        Accept: "application/json",
        ContentType: "application/json",
    },
})


export default axioxInstance;