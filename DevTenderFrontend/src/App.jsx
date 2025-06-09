import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";

// Component imports
import Prelogin from "./component/Prelogin";
import Body from "./component/Body";
import Login from "./component/Login";
import Profile from "./component/Profile";
import Feed from "./component/Feed";
import EditProfile from "./component/EditProfile";
import Connection from "./component/Connection";
import Request from "./component/Request";
import About from "./component/About";
import Skills from "./component/Skills";
import Jobs from "./Jobs";
import Contact from "./component/Contact";
import PreLoginHandle from "./component/PreLoginHandle";
import Notifications from "./component/Notifications";
import Message from "./component/Message";
import AddFile from "./component/AddFile";
import AddReel from "./component/AddReel";
import GetReel from "./component/GetReel";
import Gold from "./payment/Gold";
import Payment from "./payment/Payment";
import Silver from "./payment/Silver";
import OtpLogin from "./otpLogin/OtpLogin";
import UpdatePassword from "./updatepassword/UpdatePassword";
import ProfilePage from "./seeProfile/ProfilePage";
import Chat from "./chat/Chat";

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <Routes>
          {/* Prelogin route */}
          <Route path="/" element={<PreLoginHandle />} />
          <Route path="login" element={<Login />} />
          <Route path="otp" element={<OtpLogin />} />
          <Route path="updatePassword" element={<UpdatePassword />} />

          {/* Main app routes */}
          <Route path="/app" element={<Body />}>
            <Route index element={<Feed />} /> {/* Default child */}
            <Route path="profile" element={<Profile />} />
            <Route path="addFile" element={<AddFile />} />
            <Route path="addreel" element={<AddReel />} />
            <Route path="getreel" element={<GetReel />} />
            <Route path="EditProfile" element={<EditProfile />} />
            <Route path="connection" element={<Connection />} />
            <Route path="notification" element={<Notifications />} />
            <Route path="message" element={<Message />} />
            <Route path="request" element={<Request />} />
            <Route path="about" element={<About />} />
            <Route path="skills" element={<Skills />} />
            <Route path="jobs" element={<Jobs />} />
            <Route path="contact" element={<Contact />} />
            <Route path="gold" element={<Gold />} />
            <Route path="payment" element={<Payment />} />
            <Route path="silver" element={<Silver />} />
            <Route path="profile/:id" element={<ProfilePage />} />
            <Route path="chat/:chatid" element={<Chat />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
