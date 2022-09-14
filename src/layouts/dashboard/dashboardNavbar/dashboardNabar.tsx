import classes from "./dashbaordNavbar.module.scss";
import shortLogo from "../../../assets/images/logo/digital-academy-logos_short.png";
import {
  MDBNavbar,
  MDBContainer,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
  MDBNavbarNav,
  MDBIcon,
  MDBInputGroup,
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import Avatar from "react-avatar";
import * as Icon from "iconsax-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

const DashboardNavbar = (props: any) => {
  let navigate = useNavigate();
  const login = () => {
    navigate("/auth/login");
  };
  const home = () => {
    navigate("/");
  };
  function switchUser(id: number) {
    window.localStorage.setItem("currentlyLoggedInUser", id.toString());
    navigate("/switch/user");
  }
  return (
    <MDBNavbar
      fixed="top"
      expand="lg"
      light
      bgColor="light"
    >
      <MDBContainer>
        <MDBNavbarToggler
          type="button"
          data-target="#navbarTogglerDemo03"
          aria-controls="navbarTogglerDemo03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>
        <MDBNavbarBrand onClick={home}>
          <img src={shortLogo} height="30" alt="" loading="lazy" />
        </MDBNavbarBrand>
        <MDBCollapse navbar>
          <MDBNavbarNav className="justify-content-center">
            <MDBInputGroup tag="form" className={classes["width10"] + " "}>
              <Icon.SearchNormal />
              <input
                className={classes["fields"] + " ms-4"}
                placeholder="Search for people, posts and more..."
                aria-label="Search"
                type="Search"
              />
            </MDBInputGroup>
          </MDBNavbarNav>
          <MDBNavbarNav
            right
            className={classes["width5"] + " justify-content-end"}
            style={{ width: "25% !important" }}
          >
            <MDBNavbarItem>
              <MDBNavbarLink href="#">
                <Icon.Notification />
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBDropdown group className="shadow-0">
                <MDBDropdownToggle color="link">
                  <Avatar
                    name={props.currentUser.name}
                    size="30"
                    round={true}
                  />
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <>
                    {props.allUsers.map((value: any) => {
                      return (
                        <MDBDropdownItem
                          key={value.id}
                          link
                          className="border-bottom"
                          onClick={() => {
                            props.currentUser.id != value.id &&
                              switchUser(value.id);
                          }}
                        >
                          <MDBRow>
                            <MDBCol md="12" className="mt-2">
                              <Avatar
                                name={value.name}
                                size="30"
                                round={true}
                              />
                              <span className="ms-3 fs-5 text-capitalize">
                                {value.name}
                              </span>
                              <br />
                              {props.currentUser.id == value.id && (
                                <span className="text-muted fst-italic text-center">
                                  Signed in
                                </span>
                              )}
                            </MDBCol>
                          </MDBRow>
                        </MDBDropdownItem>
                      );
                    })}
                  </>
                  <MDBDropdownItem link onClick={login}>
                    <MDBRow>
                      <MDBCol md="12" className="p-2">
                        <Icon.UserCirlceAdd />
                        <span className="ms-3 fs-5">Login another user</span>
                      </MDBCol>
                    </MDBRow>
                  </MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default DashboardNavbar;
