import {
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBCol,
  MDBRow,
} from "mdb-react-ui-kit";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import classes from "./cardLoggedIn.module.scss";
import Avatar from "react-avatar";
import * as Icon from "iconsax-react";
import { useEffect, useState } from "react";

const CardLoggedIn = () => {
  let [allUsers, setAllUsers] = useState([]);

  let navigate = useNavigate();
  const login = () => {
    navigate("/auth/login");
  };
  const register = () => {
    navigate("/auth/register");
  };

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem("users")!);
    const currentID = window.localStorage.getItem("currentlyLoggedInUser");
    setAllUsers(user);
  }, []);
  function switchUser(id: number) {
    window.localStorage.setItem("currentlyLoggedInUser", id.toString());
    navigate("/switch/user");
  }
  return (
    <div className={classes["card-contianer"]}>
      <div className={classes["card-details"]}>
        <div className={classes["card-box"]}>
          <MDBCard
            style={{ width: "30rem" }}
            className={"animate__animated animate__fadeIn"}
          >
            <MDBCardBody>
              <MDBRow className="mb-4">
                <MDBCol md="12" className="text-center fw-bolder fs-3">
                  Logged In Users
                </MDBCol>
              </MDBRow>
              <MDBRow>
                {
                  <>
                    {allUsers.map((value: any) => {
                      return (
                        <MDBCol
                          key={value.id}
                          md="6"
                          className="mt-3"
                          onClick={() => {
                            switchUser(value.id);
                          }}
                        >
                          <MDBCard>
                            <MDBCardBody className="text-center justify-content-center">
                              <Avatar
                                name={value.name}
                                size="150"
                                round={true}
                              />
                            </MDBCardBody>
                            <MDBCardFooter className="text-center justify-content-center fw-bolder">
                              {value.name}
                            </MDBCardFooter>
                          </MDBCard>
                        </MDBCol>
                      );
                    })}
                  </>
                }
                <MDBCol md="6" className="mt-3">
                  <MDBCard onClick={login}>
                    <MDBCardBody className="text-center justify-content-center">
                      <Icon.UserAdd size="150" color="#FFA900" />
                    </MDBCardBody>
                    <MDBCardFooter className="text-center justify-content-center fw-bolder">
                      Add a user
                    </MDBCardFooter>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
        </div>
      </div>
    </div>
  );
};

export default CardLoggedIn;
