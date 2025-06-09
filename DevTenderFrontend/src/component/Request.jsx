import axios from "axios"
import { BASE_URL } from "../utils/Constant"
import { useDispatch, useSelector } from "react-redux"
import { addRequest } from "../utils/requstSlice"
import { useEffect } from "react"
import CardRequest from "./CardRequest"


const Request = () => {
  const dispatch = useDispatch()
  const selector = useSelector((store)=> store.request)
  const { theme } = useSelector((store) => store.theme);

  const fetchRequest = async()=>{
     try{
      const res = await axios.get(BASE_URL+"/user/requests/received" , {
          withCredentials:true,
      })
      dispatch(addRequest(res.data.data))
      
      

     }catch(err){
      console.error(err)
     }
  }

  useEffect(()=>{
    fetchRequest()
  } ,[])

  if(!selector) return
  if (selector.length === 0) {
    return (
    <div className={`flex items-center justify-center min-h-screen w-full ${
      theme === "dark"
        ? "bg-gradient-to-l from-[#7DC387] to-[#DBE9EA] text-gray-800"
        : "bg-gradient-to-br from-base-100 to-base-300 text-white"
    }`}>
      <div
        className={`flex items-center justify-center max-h-screen ${
          theme === "dark"
            ? "bg-gradient-to-l from-[#7DC387] to-[#DBE9EA] text-gray-800"
            : "bg-gradient-to-br from-base-100 to-base-300 text-white"
        }`}
      >
        <div className={` p-12 rounded-xl shadow-xl flex flex-col items-center${
          theme === "dark"
            ? "bg-gradient-to-l from-[#7DC387] to-[#DBE9EA] text-gray-800"
            : "bg-gradient-to-br from-base-100 to-base-300 text-white"
        }`}>
          <svg
            className="w-20 h-20 text-blue-400 mb-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 17v2a2 2 0 002 2h2a2 2 0 002-2v-2m0-2a6 6 0 10-12 0v1a2 2 0 002 2h8a2 2 0 002-2v-1m-4-4v1m0-4v.01M13 13h1v1m-4-4h.01"
            />
          </svg>
          <h1 className="text-3xl font-bold text-blue-600 mb-4">No Requests Found</h1>
          <p className="text-gray-400 text-lg text-center max-w-md">
            You currently have no incoming requests. Check back later or refresh the page to see if new requests arrive.
          </p>
        </div>
      </div>
      </div>
    );
  }
  
  

  return selector && (
    <div
    className={`flex flex-col items-center gap-5 my-5 ${
      theme === "dark"
        ? "bg-gradient-to-l from-[#7DC387] to-[#DBE9EA] text-gray-800"
        : "bg-gray-900 text-white"
    }`}>
          {selector.map((user, index) => (
        <CardRequest key={index} user={user} />
      ))}
    </div>
     
  )
}

export default Request