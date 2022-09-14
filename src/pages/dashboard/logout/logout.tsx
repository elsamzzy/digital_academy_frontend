import { MDBCol, MDBRow } from "mdb-react-ui-kit";
import { useEffect } from "react";
import classes from "./logout.module.scss";

const Logout = () => {
  useEffect(() => {
    const storedUsers = window.localStorage.getItem("users");
    if (storedUsers) {
      const newStroredUsers = JSON.parse(storedUsers);
      const currentUser = window.localStorage.getItem("currentlyLoggedInUser");
      const getUsers = newStroredUsers.filter((value: any) => {
        return value.id.toString() !== currentUser;
      });
      if (getUsers.length === 0) {
        window.localStorage.removeItem("users");
        window.localStorage.removeItem("currentlyLoggedInUser");
        setTimeout(() => {
          window.location.href = "/";
        }, 3000);
      } else {
        const signin = getUsers[0].id;
        window.localStorage.setItem("currentlyLoggedInUser", signin);
        window.localStorage.setItem("users", JSON.stringify(getUsers));
        setTimeout(() => {
          window.location.href = "/";
        }, 3000);
      }
    } else {
      window.location.href = "/";
    }
  }, []);
  return (
    <>
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
    </>
  );
};

export default Logout;
