import classes from "./appNavbar.module.scss";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import shortLogo from "../../assets/images/logo/digital-academy-logos_short.png";
import * as Icon from "iconsax-react";
import {
  MDBDropdown,
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
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import Avatar from "react-avatar";
import { useNavigate } from "react-router-dom";

const AppNavbar = (props: any) => {
  let navigate = useNavigate();

  const login = () => {
    navigate("/auth/login");
  };

  function switchUser(id: number) {
    window.localStorage.setItem("currentlyLoggedInUser", id.toString());
    navigate("/switch/user");
  }
  return (
    <Navbar bg="dark" sticky="top" className={classes.transparent}>
      <Container>
        <Navbar.Brand>
          <img src={shortLogo} height="30" alt="" loading="lazy" />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {props.isLoggedIn ? (
            <MDBDropdown group className="shadow-0">
              <MDBDropdownToggle color="dark">
                <Avatar name={props.currentUser.name} size="30" round={true} />
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
                            <Avatar name={value.name} size="30" round={true} />
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
          ) : (
            <Icon.UserSquare size="32" />
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
