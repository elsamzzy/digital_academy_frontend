import classes from "./otp.module.scss";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Logo from "../../assets/images/logo/digital-academy-logos_transparent_name_only.png";
import { MDBInput, MDBBtn, MDBRow, MDBCol } from "mdb-react-ui-kit";
import * as Icon from "iconsax-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const otp = {
  otp: "",
};

const OTP = (props: any) => {
  let [formField, setFormField] = useState(otp);
  let [loading, setLoading] = useState(false);
  let [errorMessage, setErrorMessage] = useState("");

  function onSubmit(e: any) {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    if (formField.otp === "") {
      setErrorMessage("Fill all fields");
      setLoading(false);
      return;
    }
    props.validate(formField.otp);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }
  function handleInputChange(event: any) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setFormField({ ...formField, [name]: value });
  }

  let navigate = useNavigate();
  const login = () => {
    navigate("/auth/register");
  };
  return (
    <div className={classes["card-contianer"]}>
      <div className={classes["card-details"]}>
        <div className={classes["card-box"]}>
          <Card
            style={{
              width: "40rem",
              paddingBottom: "3%",
              paddingTop: "1%",
              paddingLeft: "1%",
              paddingRight: "1%",
            }}
          >
            <MDBBtn floating color="light" onClick={login}>
              <Icon.ArrowLeft2 size="32" />
            </MDBBtn>
            <Card.Img variant="top" src={Logo} />

            {props.correctOTP === "" ? (
              <>
                <form autoComplete="off" onSubmit={onSubmit}>
                  <Card.Body>
                    <Card.Title
                      className={
                        classes["text-center"] + " " + classes["enlarge-text"]
                      }
                    >
                      OTP
                    </Card.Title>
                    <Card.Text className={classes["text-center"] + " mb-5"}>
                      A code has been sent to your mobile number input it below
                    </Card.Text>
                    <MDBInput
                      style={{ backgroundColor: "#fbfbfb" }}
                      size="lg"
                      type="text"
                      id="form2Example1"
                      name={"otp"}
                      required={true}
                      label="Code"
                      value={formField.otp}
                      onChange={handleInputChange}
                    />
                    {props.wrongOTP !== "" && (
                      <p className="text-danger m-1 text-center">
                        {props.wrongOTP}
                      </p>
                    )}
                    {errorMessage !== "" && (
                      <p className="text-danger m-1 text-center">
                        {errorMessage}
                      </p>
                    )}
                  </Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroup.Item>
                      <Button
                        variant="warning"
                        size="lg"
                        type="submit"
                        className={classes["max-width"]}
                      >
                        {loading ? (
                          <div className={classes["loadingbutton"]}>
                            <div className="sk-swing">
                              <div className="sk-swing-dot"></div>
                              <div className="sk-swing-dot"></div>
                            </div>
                          </div>
                        ) : (
                          "Verify"
                        )}
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </form>
              </>
            ) : (
              <Card.Body>
                <MDBRow>
                  <MDBCol md="12" className="text-center">
                    <div className="text-success">{props.correctOTP}</div>
                    <p className="text-muted">
                      You will be redirected to login in 5 seconds
                    </p>
                  </MDBCol>
                </MDBRow>
              </Card.Body>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OTP;
