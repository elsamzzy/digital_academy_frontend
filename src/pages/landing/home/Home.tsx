import "./Home.module.scss";
import AppNavbar from "../../../layouts/navbar/appNavbar";
import HomeCard from "./card/card";
import CardLoggedIn from "./cardLoggedIn/cardLoggedIn";
import { useEffect, useState } from "react";
import DashboardNavbar from "../../../layouts/dashboard/dashboardNavbar/dashboardNabar";

const User = {
  id: 0,
  name: "",
  username: "",
  phone_number: "",
  active: 0,
  email: "",
  phone_number_verified_at: "",
  email_verified_at: "",
  last_login_at: "",
  created_at: "",
  updated_at: "",
  deleted_at: "",
  token: "",
};
const LandingHome = () => {
  let [currentUser, setCurrentUser] = useState(User);
  let [allUsers, setAllUsers] = useState([]);
  const isLoggedIn = window.localStorage.getItem("currentlyLoggedInUser")
    ? true
    : false;
  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem("users")!);
    const currentID = window.localStorage.getItem("currentlyLoggedInUser");
    if (user) {
      user.forEach((value: any) => {
        if (value.id.toString() === currentID) {
          setCurrentUser(value);
        }
      });
    }
    setAllUsers(user);
  }, []);
  return (
    <>
      <AppNavbar
        isLoggedIn={isLoggedIn}
        allUsers={allUsers}
        currentUser={currentUser}
      />
      {isLoggedIn ? <CardLoggedIn /> : <HomeCard />}
      <div className="container-video">
        {/* video-height */}
        <video
          className="video-height"
          width="auto"
          height="auto"
          preload="auto"
          autoPlay
          muted
          loop
        >
          <source
            src={require("../../../assets/video/home4.mp4")}
            type="video/ogg"
          />
          Your browser does not support the video tag.
        </video>
      </div>
    </>
  );
};

export default LandingHome;
