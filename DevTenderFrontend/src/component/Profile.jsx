import { useSelector } from "react-redux";

import ShowProfile from "./ShowProfile";
import {  Outlet } from "react-router-dom";

const Profile = () => {
  const user = useSelector((store) => store.user);

  return (
    <div>
      <ShowProfile user={user} />
      <Outlet />
    </div>
  );
};

export default Profile;
