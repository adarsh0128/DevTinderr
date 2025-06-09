import { useSelector } from "react-redux";
import { MdOutlineMessage } from "react-icons/md";
import { Link } from "react-router-dom";



const CardConnection = ({ user }) => {
  const { theme } = useSelector((store) => store.theme);
  
  if (!user) return null;

  return (
  
  
    <div className={`w-96  rounded-[10px] m-auto overflow-hidden shadow-lg  p-6 ${
        theme === 'dark'
          ? "bg-gradient-to-l to left from-[#7DC387] to-[#DBE9EA] text-gray-800"
          : "bg-base-100 text-white"
      }`}>
      <img
        src={user.photoUrl}
        alt={`${user.firstName} ${user.lastName}`}
        className="w-32 h-32 rounded-full mx-auto object-cover mb-4"
      />
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-400">
          {user.firstName} {user.lastName}
        </h2>
        <p className="text-gray-400">Age: {user.age}</p>
        <p className="text-gray-400">Gender: {user.gender}</p>
        
       
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-medium text-gray-400">Skills:</h3>
        <ul className="flex flex-wrap mt-2">
          {user.skills.map((skill, index) => (
            <li
              key={index}
              className="bg-blue-100 text-blue-800 text-sm px-3 py-1 m-1 rounded-full"
            >
              {skill}
            </li>
          ))}
        </ul>
        <Link to={`/app/chat/${user._id}`}  state={{ firstName: user.firstName , lastName: user.lastName}}>
        <div className="mt-5">
           <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-sm px-5 py-2 rounded-full shadow-md transition duration-300 ease-in-out">
             <MdOutlineMessage className="text-lg" /> Chat
           </button>
         </div>
         </Link>

        
      </div>
    </div>
    
    
  );
};

export default CardConnection;
