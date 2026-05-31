import axios from 'axios'

const API =  axios.create({
    baseURL: "https://adamo-47-15-118-72.run.pinggy-free.link",
    headers:{
        "Content-Type":"application/json"
    }
})
// auto token attach
API.interceptors.request.use((config)=>{

    const token = localStorage.getItem("token")
    const userId = localStorage.getItem("telegram_id")

    if(token){
        config.headers["x-session-token"] = token
    }

    if(userId){
        config.headers["x-telegram-id"] = userId
    }

    return config
})

export default API