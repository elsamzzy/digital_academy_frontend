import classes from "./profileCard.module.scss";
import {
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalTitle,
  MDBModalBody,
  MDBInput,
} from "mdb-react-ui-kit";
import Avatar from "react-avatar";
import * as Icon from "iconsax-react";
import Skills from "../../posts/skills/skills";
import { useState } from "react";
import API from "../../../../services/api";

export const data = {
  username: "",
  name: "",
  title: "",
};

const ProfileCard = (props: any) => {
  let [optSmModal, setOptSmModal] = useState(false);
  let [user, setUser] = useState(props.userProfile);
  let [formField, setFormField] = useState(data);
  let [errorMessage, setErrorMessage] = useState("");
  let [loading, setLoading] = useState(false);

  function handleInputChange(event: any) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setFormField({ ...formField, [name]: value });
  }

  const toggleShow = () => setOptSmModal(!optSmModal);

  function onEdit() {
    const newData = {
      username: user.username,
      name: user.name,
      title: user.title ? user.title : "",
    };
    setFormField(newData);
    toggleShow();
  }

  function onSubmit(e: any) {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    if (formField.username === "" || formField.name === "") {
      setErrorMessage("Fill all fields");
      setLoading(false);
      return;
    }
    API.post(`/dashboard/user/profile/update`, {
      ...formField,
    })
      .finally(() => {
        setLoading(false);
      })
      .then((response) => {
        if (response.data.error) {
          setErrorMessage(response.data.message);
          return;
        }
        const res = response.data.results.user;
        const storedUsers = window.localStorage.getItem("users");
        if (storedUsers) {
          const allUsers = JSON.parse(storedUsers);
          const currentUser = window.localStorage.getItem(
            "currentlyLoggedInUser"
          );
          for (let i = 0; i < allUsers.length; i++) {
            if (allUsers[i].id.toString() === currentUser) {
              allUsers[i].name = res.name;
              allUsers[i].title = res.title;
              allUsers[i].username = res.username;
            }
          }
          window.localStorage.setItem("users", JSON.stringify(allUsers));
        }
        setUser({
          ...user,
          name: res.name,
          title: res.title,
          username: res.username,
        });
        toggleShow();
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
    <>
      <MDBCard
        className="mt-5 mb-4"
        style={{ width: "43vw", height: "40vh", paddingBottom: "3%" }}
      >
        <MDBCardBody>
          <MDBRow className="pt-5 pb-5">
            <MDBCol
              md="6"
              className="text-center justify-content-center"
              style={{
                alignItems: "center",
                alignSelf: "center",
              }}
            >
              <Avatar name={user.name} round={true} />
              <p className={classes["text-large"] + " mt-3"}>{user.name}</p>
              <small className=" text-muted">{user.title}</small>
              <MDBRow className="mt-3">
                <MDBCol md="1"></MDBCol>
                <MDBCol md="5">
                  <p className={classes["counting-text"]}>
                    {user.posts.length}
                  </p>
                  <small className="text-muted">Posts</small>
                </MDBCol>
                <MDBCol md="5">
                  <p className={classes["counting-text"]}>
                    {props.skills.length}
                  </p>
                  <small className="text-muted">Skills</small>
                </MDBCol>
              </MDBRow>
            </MDBCol>
            <MDBCol md="6">
              <div className="d-flex align-items-center">
                <Icon.Information size="35" color="#ffa900" />
                <span className="fw-bolder fs-5 ms-2">About</span>
              </div>
              <div className="m-3"></div>
              <MDBRow>
                <MDBCol md="4">
                  <Icon.User size="24" color="#ffa900" />
                  <span className="fw-bold ms-2">Username</span>
                </MDBCol>
                <MDBCol md="8">
                  <span>{user.username}</span>
                </MDBCol>
              </MDBRow>
              <MDBRow className="mt-2">
                <MDBCol md="4">
                  <Icon.DirectInbox size="24" color="#ffa900" />
                  <span className="fw-bold ms-2">Email</span>
                </MDBCol>
                <MDBCol md="8">
                  <span>{user.email}</span>
                </MDBCol>
              </MDBRow>
              <MDBRow className="mt-2">
                <MDBCol md="4">
                  <Icon.Mobile size="24" color="#ffa900" />
                  <span className="fw-bold ms-1">Phone Number</span>
                </MDBCol>
                <MDBCol md="8">
                  <span>{user.phone_number}</span>
                </MDBCol>
              </MDBRow>
              <MDBRow className="mt-4">
                <MDBCol>
                  <MDBBtn
                    color="warning"
                    onClick={() => {
                      onEdit();
                    }}
                  >
                    <Icon.Edit2 size="24" /> Edit
                  </MDBBtn>
                </MDBCol>
              </MDBRow>
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
      <Skills isProfile={true} skills={props.skills} />
      <MDBModal show={optSmModal} tabIndex="-1" setShow={setOptSmModal}>
        <MDBModalDialog centered size="lg">
          <MDBModalContent>
            <form onSubmit={onSubmit} autoComplete="off">
              <MDBRow className="mt-3">
                <MDBCol md="10" className="text-center ms-5">
                  <MDBModalTitle className="ms-5">Edit Profile</MDBModalTitle>
                </MDBCol>
                <MDBCol md="1">
                  <MDBBtn
                    className="btn-close"
                    color="none"
                    type="button"
                    onClick={toggleShow}
                  ></MDBBtn>
                </MDBCol>
              </MDBRow>
              <MDBModalBody>
                <MDBInput
                  style={{ backgroundColor: "#fbfbfb" }}
                  size="lg"
                  className="mb-4"
                  required={true}
                  type="text"
                  color="warning"
                  label="Username"
                  name={"username"}
                  onChange={handleInputChange}
                  value={formField.username}
                />
                <MDBInput
                  style={{ backgroundColor: "#fbfbfb" }}
                  size="lg"
                  className="mb-4"
                  required={true}
                  type="text"
                  color="warning"
                  label="Name"
                  name={"name"}
                  onChange={handleInputChange}
                  value={formField.name}
                />
                <MDBInput
                  style={{ backgroundColor: "#fbfbfb" }}
                  size="lg"
                  className="mb-4"
                  type="text"
                  color="warning"
                  label="Title"
                  name={"title"}
                  value={formField.title}
                  onChange={handleInputChange}
                />
                {errorMessage !== "" && (
                  <p className="text-danger text-center">{errorMessage}</p>
                )}
                <MDBRow className="mt-3">
                  <MDBCol md="12" className="text-center">
                    <MDBModalTitle>
                      <MDBBtn color="warning">
                        {loading ? (
                          <div className={classes["loadingbutton"]}>
                            <div className="sk-swing">
                              <div className="sk-swing-dot"></div>
                              <div className="sk-swing-dot"></div>
                            </div>
                          </div>
                        ) : (
                          "Save"
                        )}
                      </MDBBtn>
                    </MDBModalTitle>
                  </MDBCol>
                </MDBRow>
              </MDBModalBody>
            </form>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default ProfileCard;
