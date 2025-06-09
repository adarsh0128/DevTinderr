import  io from "socket.io-client"
import {BASE_URL } from '../utils/Constant'
  

export const createSockerConnection = ()=>{

    return io(BASE_URL)
}