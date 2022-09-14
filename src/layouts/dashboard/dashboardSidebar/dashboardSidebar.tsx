import classes from "./dashbaordSidebar.module.scss";
import * as Icon from "iconsax-react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { MDBBtn } from "mdb-react-ui-kit";

const DashboardSideBar = () => {
  let navigate = useNavigate();
  const logout = () => {
    navigate("/logout");
  };

  return (
    <div className={classes["contianer"]}>
      <div className="mb-5">
        <NavLink
          end={true}
          className={(navData) =>
            navData.isActive
              ? "text-center bg-warning rounded-pill p-3 text-white"
              : "text-dark"
          }
          to="/dashboard"
        >
          <Icon.MenuBoard size="28" />
          <span className={classes["nav-text"]}> Posts</span>
        </NavLink>
      </div>
      <div className="mb-5">
        <NavLink
          end={true}
          className={(navData) =>
            navData.isActive
              ? "text-center bg-warning rounded-pill p-3 text-white"
              : "text-dark"
          }
          to="/dashboard/profile"
        >
          <Icon.Profile size="28" />
          <span className={classes["nav-text"]}> Profile</span>
        </NavLink>
      </div>
      <div className="mb-5">
        {/* className={"text-center bg-warning rounded-pill py-2 text-white"} */}
        <div>
          <Icon.Profile2User size="28" />
          <span className={classes["nav-text"]}> People</span>
        </div>
      </div>
      <div className="mb-5">
        <div>
          <Icon.People size="28" />
          <span className={classes["nav-text"]}> Groups</span>
        </div>
      </div>
      <div className="mb-5">
        <div>
          <Icon.DirectInbox size="28" />
          <span className={classes["nav-text"]}> Inbox</span>
        </div>
      </div>
      <div className="mb-5">
        <div>
          <Icon.Briefcase size="28" />
          <span className={classes["nav-text"]}> Jobs</span>
        </div>
      </div>
      <div className="mb-5">
        <div
          onClick={() => {
            logout();
          }}
        >
          <Icon.LogoutCurve size="28" color="#F93154" />
          <span className={classes["nav-text"] + " text-danger"}> Logout</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardSideBar;
