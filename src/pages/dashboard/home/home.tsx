import DashboardNavbar from "../../../layouts/dashboard/dashboardNavbar/dashboardNabar";
import DashboardSideBar from "../../../layouts/dashboard/dashboardSidebar/dashboardSidebar";
import Posts from "../posts/posts";
import classes from "./home.module.scss";
import { MDBRow, MDBCol } from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import API from "../../../services/api";

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

const DashboardHome = () => {
  let [loading, setLoading] = useState(true);
  let [skills, setSkills] = useState();
  let [post, setPost] = useState();
  let [currentUser, setCurrentUser] = useState(User);
  let [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem("users")!);
    const currentID = window.localStorage.getItem("currentlyLoggedInUser");
    user.forEach((value: any) => {
      if (value.id.toString() === currentID) {
        setCurrentUser(value);
      }
    });

    setAllUsers(user);
    API.get(`/dashboard/skill/all`)
      .finally(() => {})
      .then((res) => {
        setSkills(res.data.results.skills);
      });
    API.get(`/dashboard/post/all`)
      .finally(() => {
        setLoading(false);
      })
      .then((res) => {
        setPost(res.data.results.posts);
      });
  }, []);

  return (
    <>
      <DashboardNavbar allUsers={allUsers} currentUser={currentUser} />
      <div className="container mt-5">
        <MDBRow>
          <MDBCol md="2">
            <DashboardSideBar />
          </MDBCol>
          <MDBCol md="10">
            {loading ? (
              <MDBRow className="vh-100">
                <MDBCol
                  md="12"
                  className="align-self-center d-flex justify-content-center text-center"
                >
                  <div className={classes["preloader"]}>
                    <div className="sk-swing">
                      <div className="sk-swing-dot"></div>
                      <div className="sk-swing-dot"></div>
                    </div>
                  </div>
                </MDBCol>
              </MDBRow>
            ) : (
              <Posts posts={post} skills={skills} currentUser={currentUser} />
            )}
          </MDBCol>
        </MDBRow>
      </div>
    </>
  );
};

export default DashboardHome;
