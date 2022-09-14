import classes from "./login.module.scss";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Logo from "../../../assets/images/logo/digital-academy-logos_transparent_name_only.png";
import React, { useState } from "react";
import { MDBInput } from "mdb-react-ui-kit";
import { useNavigate, Link } from "react-router-dom";
import API from "../../../services/api";

const data = {
  credential: "",
  password: "",
};

const Login = (props: any) => {
  let [formField, setFormField] = useState(data);
  let [submitting, setSubmitting] = useState(false);
  let [errorMessage, setErrorMessage] = useState("");

  let navigate = useNavigate();
  const home = () => {
    navigate("/");
  };

  function handleInputChange(event: any) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setFormField({ ...formField, [name]: value });
  }

  function onSubmit(e: any) {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage("");
    if (formField.password === "" || formField.credential === "") {
      setErrorMessage("Fill all fields");
      setSubmitting(false);
      return;
    }
    API.post(`/users/login`, {
      ...formField,
    })
      .finally(() => {
        setSubmitting(false);
      })
      .then((response: any) => {
        if (response.data.error) {
          setErrorMessage(response.data.message);
          return;
        }
        const user = response.data.results.user;
        const storedUsers = window.localStorage.getItem("users");
        let doesExsit = false;
        if (storedUsers) {
          const newStroredUsers = JSON.parse(storedUsers);
          if (newStroredUsers.length > 0) {
            newStroredUsers.forEach((value: any) => {
              if (value.id === user.id) {
                doesExsit = true;
              }
            });
            if (doesExsit) {
              window.localStorage.setItem("currentlyLoggedInUser", user.id);
              window.location.href = "/dashboard";
            } else {
              newStroredUsers.push(user);
              window.localStorage.setItem(
                "users",
                JSON.stringify(newStroredUsers)
              );
              window.localStorage.setItem("currentlyLoggedInUser", user.id);
              window.location.href = "/dashboard";
            }
          } else {
            newStroredUsers.push(user);
            window.localStorage.setItem(
              "users",
              JSON.stringify(newStroredUsers)
            );
            window.localStorage.setItem("currentlyLoggedInUser", user.id);
            window.location.href = "/dashboard";
          }
        } else {
          const listOfUser = [];
          listOfUser.push(user);
          window.localStorage.setItem("users", JSON.stringify(listOfUser));
          window.localStorage.setItem("currentlyLoggedInUser", user.id);
          window.location.href = "/dashboard";
        }
      })
      .catch((error) => {
        if (error.response.data.error) {
          setErrorMessage(error.response.data.message);
          return;
        }
        setErrorMessage(error.message);
      });
  }

  return (
    <div className={classes["card-contianer"]}>
      <div className={classes["card-details"]}>
        <div className={classes["card-box"]}>
          <form onSubmit={onSubmit} autoComplete="off">
            <Card
              style={{ width: "40rem", paddingBottom: "3%" }}
              className={"animate__animated animate__slideInRight"}
            >
              <Card.Img onClick={home} variant="top" src={Logo} />
              <Card.Body>
                <Card.Title
                  className={
                    classes["text-center"] + " " + classes["enlarge-text"]
                  }
                >
                  Log In
                </Card.Title>
                <Card.Text className={classes["text-center"] + " mb-5"}>
                  Login with your DO email or phone number and password
                </Card.Text>
                <MDBInput
                  style={{ backgroundColor: "#fbfbfb" }}
                  size="lg"
                  className="mb-4"
                  type="text"
                  color="warning"
                  label="Email address / Phone number"
                  required={true}
                  name={"credential"}
                  value={formField.credential}
                  onChange={handleInputChange}
                />
                <MDBInput
                  style={{ backgroundColor: "#fbfbfb" }}
                  size="lg"
                  className="mb-4"
                  type="password"
                  color="warning"
                  label="Password"
                  name={"password"}
                  required={true}
                  value={formField.password}
                  onChange={handleInputChange}
                />
              </Card.Body>
              {errorMessage !== "" && (
                <p className="text-danger text-center">{errorMessage}</p>
              )}
              <ListGroup className="list-group-flush">
                <ListGroup.Item>
                  <Button
                    variant="warning"
                    size="lg"
                    className={classes["max-width"] + " mb-2"}
                    type="submit"
                  >
                    {submitting ? (
                      <div className={classes["loadingbutton"]}>
                        <div className="sk-swing">
                          <div className="sk-swing-dot"></div>
                          <div className="sk-swing-dot"></div>
                        </div>
                      </div>
                    ) : (
                      "Login"
                    )}
                  </Button>
                </ListGroup.Item>
                <ListGroup.Item className="mt-2">
                  Don't have an account? Register
                  <Link to="/auth/register"> Here...</Link>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
