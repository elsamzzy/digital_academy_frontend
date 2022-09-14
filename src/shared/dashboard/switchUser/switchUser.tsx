import { MDBCol, MDBRow } from "mdb-react-ui-kit";
import { useEffect } from "react";
import classes from "./switchUser.module.scss";

const SwitchUser = () => {
  useEffect(() => {
    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 2000);
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

export default SwitchUser;
