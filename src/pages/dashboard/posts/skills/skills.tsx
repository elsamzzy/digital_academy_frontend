import classes from "./skills.module.scss";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
  MDBProgress,
  MDBProgressBar,
  MDBRow,
  MDBCol,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalTitle,
  MDBModalBody,
  MDBRange,
  MDBInput,
} from "mdb-react-ui-kit";
import * as Icon from "iconsax-react";
import { useState } from "react";
import API from "../../../../services/api";

const data = {
  skill_name: "",
  skill_level: "",
};

export interface Skill {
  id: number;
  skill_name: string;
  skill_level: string;
}
const Skills = (props: any) => {
  let [formField, setFormField] = useState(data);
  let [skills, setSkills] = useState(props.skills);
  const [basicModal, setBasicModal] = useState(false);
  let [submitting, setSubmitting] = useState(false);
  let [errorMessage, setErrorMessage] = useState("");
  let [isEditingID, setIsEditingID] = useState(0);

  const toggleShow = () => setBasicModal(!basicModal);
  function handleInputChange(event: any) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setFormField({ ...formField, [name]: value });
  }

  function edit(inputs: Skill) {
    const form = {
      skill_name: inputs.skill_name,
      skill_level: inputs.skill_level,
    };
    setFormField(form);
    setIsEditingID(inputs.id);
    toggleShow();
  }

  function onSubmit(e: any) {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage("");
    if (formField.skill_name === "" || formField.skill_level === "") {
      setErrorMessage("Fill all fields");
      setSubmitting(false);
      return;
    }
    if (isEditingID !== 0) {
      API.post(`/dashboard/skill/edit/${isEditingID}`, {
        ...formField,
      })
        .finally(() => {
          setSubmitting(false);
        })
        .then((response) => {
          if (response.data.error) {
            setErrorMessage(response.data.message);
            return;
          }
          const allSkills = response.data.results.skills;
          setSkills(allSkills);
          setIsEditingID(0);
          setFormField({
            skill_name: "",
            skill_level: "",
          });
          toggleShow();
          return;
        })
        .catch((error) => {
          if (error.response.data.error) {
            setErrorMessage(error.response.data.message);
            return;
          }
          setErrorMessage(error.message);
        });
    } else {
      API.post(`/dashboard/skill/add`, {
        ...formField,
      })
        .finally(() => {
          setSubmitting(false);
        })
        .then((response) => {
          if (response.data.error) {
            setErrorMessage(response.data.message);
            return;
          }
          setSkills(response.data.results.skills);
          setFormField({
            skill_name: "",
            skill_level: "",
          });
          toggleShow();
          return;
        })
        .catch((error) => {
          if (error.response.data.error) {
            setErrorMessage(error.response.data.message);
            return;
          }
          setErrorMessage(error.message);
        });
    }
  }

  function onDelete() {
    setSubmitting(true);
    setErrorMessage("");
    API.delete(`/dashboard/skill/delete/${isEditingID}`)
      .finally(() => {
        setSubmitting(false);
      })
      .then((response) => {
        if (response.data.error) {
          setErrorMessage(response.data.message);
          return;
        }
        const allSkills = response.data.results.skills;
        setSkills(allSkills);
        setIsEditingID(0);
        toggleShow();
        return;
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
        className={
          classes["fixed"] +
          " " +
          (props.isProfile === true ? classes["width-43"] : "")
        }
      >
        <MDBCardBody>
          <MDBCardTitle className="mb-4 text-center">Skills</MDBCardTitle>
          {skills.length > 0 ? (
            <>
              {skills.map((skill: any) => {
                return (
                  <MDBRow key={skill.id} className="mt-2">
                    <MDBCol md="1">
                      <MDBBtn
                        onClick={() => {
                          edit(skill);
                        }}
                        floating
                        tag="a"
                        color="link"
                      >
                        <Icon.Edit color="#FFA900" size="26" />
                      </MDBBtn>
                    </MDBCol>
                    <MDBCol md="10">
                      <div className="ms-3 mt-2">
                        <MDBProgress>
                          <MDBProgressBar
                            bgColor="warning"
                            width={skill.skill_level}
                            valuemin={0}
                            valuemax={100}
                          />
                        </MDBProgress>
                        <p>{skill.skill_name}</p>
                      </div>
                    </MDBCol>
                  </MDBRow>
                );
              })}
            </>
          ) : (
            <MDBRow>
              <MDBCol className="text-center text-muted">
                You have no skills
              </MDBCol>
            </MDBRow>
          )}
          <div className="text-end">
            <MDBBtn
              color="warning"
              onClick={toggleShow}
              className="pt-1"
              floating
              tag="a"
            >
              <Icon.Add />
            </MDBBtn>
          </div>
        </MDBCardBody>
      </MDBCard>
      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
        <MDBModalDialog centered>
          <MDBModalContent>
            <form onSubmit={onSubmit} autoComplete="off">
              <MDBRow className="mt-3 mb-4">
                <MDBCol md="10">
                  <MDBModalTitle className="text-center ps-5 ms-5">
                    {isEditingID !== 0 ? "Edit skill" : "Add a skill"}
                  </MDBModalTitle>
                </MDBCol>
                <MDBCol md="2">
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
                  className="mb-4"
                  label="Skill Name"
                  type="text"
                  color="warning"
                  required={true}
                  name={"skill_name"}
                  value={formField.skill_name}
                  onChange={handleInputChange}
                />
                <MDBRange
                  defaultValue={50}
                  label="Skill Level"
                  color="warning"
                  required={true}
                  name={"skill_level"}
                  value={formField.skill_level}
                  onChange={handleInputChange}
                />
              </MDBModalBody>
              {errorMessage !== "" && (
                <p className="text-danger text-center">{errorMessage}</p>
              )}
              <MDBRow className="m-4">
                {isEditingID !== 0 ? (
                  <>
                    <MDBCol md="6" className="text-center">
                      <MDBBtn
                        onClick={() => {
                          onDelete();
                        }}
                        type="button"
                        color="danger"
                      >
                        {submitting ? (
                          <div className={classes["loadingbutton"]}>
                            <div className="sk-swing">
                              <div className="sk-swing-dot"></div>
                              <div className="sk-swing-dot"></div>
                            </div>
                          </div>
                        ) : (
                          "Delete"
                        )}
                      </MDBBtn>
                    </MDBCol>
                    <MDBCol md="6" className="text-center">
                      <MDBBtn color="warning">
                        {submitting ? (
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
                    </MDBCol>
                  </>
                ) : (
                  <MDBCol md="12" className="text-center">
                    <MDBBtn color="warning">
                      {submitting ? (
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
                  </MDBCol>
                )}
              </MDBRow>
            </form>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default Skills;
