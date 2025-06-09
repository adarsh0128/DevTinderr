import {  Outlet, useNavigate } from "react-router-dom"
import NavBar from "./NavBar"
import axios from "axios"
import {BASE_URL}  from '../utils/Constant'
import { useDispatch, useSelector } from "react-redux"
import {addUser} from '../utils/userSlice'
import { useEffect } from "react"
import Footer from "./Footer"
import Sidebar from "./Sidebar"
import AddPostFeature from "./AddPostFeature"
import HelpCenter from "../help/HelpCenter"



const Body = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { theme } = useSelector((store) => store.theme);
  const selector = useSelector((store)=>store.user)

  const fetchUser = async()=>{
    if(selector) return
    try{
      const res =await axios.get(BASE_URL+"/profile/view" ,{
        withCredentials:true,
      })
      dispatch(addUser(res.data))

    }catch(err){
      if(err.status === 401){
        navigate("/login")
      }
      
      console.error(err)
    }
    
  }

  useEffect(()=>{
    
       fetchUser()
    
   
  } ,[])

  return (
    // <div>
    //     <NavBar />
    //     <Outlet/>
        
    // </div>
    <div
    className={`font-sans  flex flex-col ${
      theme == "light"
        ? "bg-gray-900 text-white"
        : "bg-gradient-to-l to left from-[#7DC387] to-[#DBE9EA] text-gray-800"
    }`}
  >

    <div className="flex flex-col h-full">
    <NavBar />
    <div className="relative flex-grow  ">
      <Sidebar />
         
       <HelpCenter /> {/* Add HelpCenter component */}
         <Outlet />
         
       
      
       
      
      
    </div>
    <Footer /> 
  </div>
  </div>
  )
}

export default Body