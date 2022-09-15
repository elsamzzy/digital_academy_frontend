import classes from "./register.module.scss";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Logo from "../../../assets/images/logo/digital-academy-logos_transparent_name_only.png";
import React, { useEffect, useState } from "react";
import { MDBCol, MDBInput, MDBRow } from "mdb-react-ui-kit";
import { useNavigate, Link } from "react-router-dom";
import API from "../../../services/api";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import * as firebase from "firebase/app";
import OTP from "../../../shared/otp/otp";
// import { firbaseAuth, auth } from "../../../services/firebase";

export const data = {
  username: "",
  name: "",
  phone_number: "09068831312",
  email: "",
  password: "",
  password_confirmation: "",
};

export interface Fire {
  recaptchaVerifier: any;
  confirmationResult: any;
  confirm: any;
  recaptchaWidgetId: any;
}
const fire: Fire = {
  recaptchaVerifier: "",
  confirmationResult: "",
  confirm: "",
  recaptchaWidgetId: "",
};

const Register = () => {
  let [loading, setLoading] = useState(false);
  let [formField, setFormField] = useState(data);
  let [errorMessage, setErrorMessage] = useState("");
  let [successMessage, setSuccessMessage] = useState("");
  let [intervalID, setIntervalID] = useState();
  let [final, setFinal] = useState(fire);
  let [show, setshow] = useState(false);
  let [sentOTP, setSentOTP] = useState();
  let [wrongOTP, setWrongOTP] = useState("");
  let [correctOTP, setCorrectOTP] = useState("");
  let navigate = useNavigate();

  // Add your firebase config here
  const firebaseConfig = {};

  initializeApp(firebaseConfig);
  const auth = getAuth();

  const home = () => {
    navigate("/");
  };

  function handleInputChange(event: any) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setFormField({ ...formField, [name]: value });
  }

  async function startProcess() {
    setLoading(true);
    if (
      formField.username === "" ||
      formField.name === "" ||
      formField.email === "" ||
      formField.phone_number === "" ||
      formField.password === "" ||
      formField.password_confirmation === ""
    ) {
      setErrorMessage("Fill all fields");
      setLoading(false);
      return;
    }
    const re = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "normal",
        callback: (response: any) => {
          console.log(response);
          // first create user account then send otp to number
          // sendOtp();
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          // ...
        },
        "expired-callback": (response: any) => {
          console.log(response);
          // Response expired. Ask user to solve reCAPTCHA again.
          // ...
        },
      },
      auth
    );
    setFinal({ ...final, recaptchaVerifier: re });
    sendOtp(re);
  }

  function onSubmit(e: any) {
    setLoading(true);
    if (
      formField.username === "" ||
      formField.name === "" ||
      formField.email === "" ||
      formField.phone_number === "" ||
      formField.password === "" ||
      formField.password_confirmation === ""
    ) {
      setErrorMessage("Fill all fields");
      setLoading(false);
      return;
    }
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    API.post(`/users/register`, {
      ...formField,
    })
      .finally(() => {})
      .then((response) => {
        if (response.data.error) {
          setLoading(false);
          setErrorMessage(response.data.message);
          return;
        }
        const re = new RecaptchaVerifier(
          "recaptcha-container",
          {
            size: "normal",
            callback: (response: any) => {
              console.log(response);
              // first create user account then send otp to number
              // sendOtp();
              // reCAPTCHA solved, allow signInWithPhoneNumber.
              // ...
            },
            "expired-callback": (response: any) => {
              console.log(response);
              // Response expired. Ask user to solve reCAPTCHA again.
              // ...
            },
          },
          auth
        );
        setFinal({ ...final, recaptchaVerifier: re });
        sendOtp(re);
      })
      .catch((error) => {
        setLoading(false);
        if (error.response.data.error) {
          setErrorMessage(error.response.data.message);
          return;
        }
        setErrorMessage(error.message);
      });
  }

  const sendOtp = (v: any) => {
    let verify = v;
    const phoneNumber = `+234${formField.phone_number}`;
    signInWithPhoneNumber(auth, phoneNumber, verify)
      .then((result) => {
        // @ts-ignore
        setSentOTP(result);
        console.log(result);
        setshow(true);
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage("There was an error sending otp");
      });
  };

  // Validate OTP
  const ValidateOtp = async (otp: any) => {
    console.log(otp);
    if (otp === null || final === null) return;
    setWrongOTP("");
    // @ts-ignore
    await sentOTP
      .confirm(otp)
      .then((result: any) => {
        setCorrectOTP("Successfully registered and vrified phone number");
        setTimeout(() => {
          window.location.href = "/auth/login";
        }, 4000);
        // success
        console.log(result);
      })
      .catch((err: any) => {
        setWrongOTP("Wrong OTP Code");
        console.log(err);
      });
  };

  return (
    <>
      {!show ? (
        <div className={classes["card-contianer"]}>
          <div className={classes["card-details"]}>
            <div className={classes["card-box"]}>
              <form onSubmit={onSubmit} autoComplete="off">
                <Card
                  style={{ width: "40rem", paddingBottom: "3%" }}
                  className={"animate__animated animate__slideInLeft"}
                >
                  <Card.Img onClick={home} variant="top" src={Logo} />
                  <Card.Body>
                    <Card.Title
                      className={
                        classes["text-center"] + " " + classes["enlarge-text"]
                      }
                    >
                      Register
                    </Card.Title>
                    <Card.Text className={classes["text-center"] + " mb-5"}>
                      Regiter your information below
                    </Card.Text>
                    <MDBInput
                      style={{ backgroundColor: "#fbfbfb" }}
                      size="lg"
                      required={true}
                      className="mb-4"
                      type="text"
                      color="warning"
                      label="Full Name"
                      value={formField.name}
                      name={"name"}
                      onChange={handleInputChange}
                    />
                    <MDBInput
                      style={{ backgroundColor: "#fbfbfb" }}
                      size="lg"
                      required={true}
                      className="mb-4"
                      type="text"
                      color="warning"
                      label="Username"
                      value={formField.username}
                      name={"username"}
                      onChange={handleInputChange}
                    />
                    <MDBInput
                      style={{ backgroundColor: "#fbfbfb" }}
                      size="lg"
                      className="mb-4"
                      required={true}
                      type="tel"
                      color="warning"
                      label="Mobile Number"
                      name={"phone_number"}
                      onChange={handleInputChange}
                      value={formField.phone_number}
                    />
                    <MDBInput
                      style={{ backgroundColor: "#fbfbfb" }}
                      size="lg"
                      className="mb-4"
                      required={true}
                      type="email"
                      color="warning"
                      name={"email"}
                      label="Email Address"
                      onChange={handleInputChange}
                      value={formField.email}
                    />
                    <MDBInput
                      style={{ backgroundColor: "#fbfbfb" }}
                      size="lg"
                      className="mb-4"
                      type="password"
                      required={true}
                      color="warning"
                      name={"password"}
                      label="Password"
                      value={formField.password}
                      onChange={handleInputChange}
                    />
                    <MDBInput
                      style={{ backgroundColor: "#fbfbfb" }}
                      size="lg"
                      className="mb-4"
                      type="password"
                      color="warning"
                      label="Confirm Password"
                      value={formField.password_confirmation}
                      onChange={handleInputChange}
                      name={"password_confirmation"}
                    />
                  </Card.Body>
                  {errorMessage !== "" && (
                    <p className="text-danger m-1 text-center">
                      {errorMessage}
                    </p>
                  )}
                  {successMessage !== "" && (
                    <p className="text-success m-1 text-center">
                      {successMessage}
                    </p>
                  )}
                  <MDBRow>
                    <MDBCol className="text-center" md="12">
                      <div id="recaptcha-container"></div>
                    </MDBCol>
                  </MDBRow>
                  <ListGroup className="list-group-flush">
                    <ListGroup.Item>
                      <Button
                        variant="warning"
                        size="lg"
                        type="submit"
                        className={classes["max-width"] + " mb-2 text-center"}
                        // type="submit"
                      >
                        {loading ? (
                          <div className={classes["loadingbutton"]}>
                            <div className="sk-swing">
                              <div className="sk-swing-dot"></div>
                              <div className="sk-swing-dot"></div>
                            </div>
                          </div>
                        ) : (
                          "Register"
                        )}
                      </Button>
                    </ListGroup.Item>
                    <ListGroup.Item className="mt-2">
                      Have an account? Login
                      <Link to="/auth/login"> Here...</Link>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <OTP
          validate={ValidateOtp}
          wrongOTP={wrongOTP}
          correctOTP={correctOTP}
        />
      )}
    </>
  );
};

export default Register;
