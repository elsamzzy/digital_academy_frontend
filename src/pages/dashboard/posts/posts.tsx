import classes from "./posts.module.scss";
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBBtn,
  MDBRow,
  MDBCol,
  MDBCardFooter,
  MDBInputGroup,
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
} from "mdb-react-ui-kit";
import * as Icon from "iconsax-react";
import Skills from "./skills/skills";
import Avatar from "react-avatar";
import React, { useState } from "react";
import API from "../../../services/api";
import ReactDOM from "react-dom";
const moment = require("moment");

function convertTime(date: string) {
  const dateTime = moment(date);
  return moment(dateTime).days();
}
const data = {
  post: "",
};
const comment = {
  comment: "",
  posts_id: "",
};
const deleteCommentData = {
  comment_id: "",
  posts_id: "",
};
const deletePostData = {
  post: "",
  posts_id: 0,
};
const editPostData = {
  post: "",
  posts_id: 0,
};

const Posts = (props: any) => {
  let [formField, setFormField] = useState(data);
  let [posts, setPosts] = useState(props.posts);
  let [submitting, setSubmitting] = useState(false);
  let [errorMessage, setErrorMessage] = useState("");
  let [optSmModal, setOptSmModal] = useState(false);
  let [addComment, setAddComment] = useState(comment);
  let [submittingComment, setSubmittingComment] = useState(false);
  let [commentErrorMessage, setCommentErrorMessage] = useState("");
  let [commentErrorID, setCommentErrorID] = useState(0);
  let [deleteComment, setDeleteComment] = useState(deleteCommentData);
  let [deletePost, setDeletePost] = useState(deletePostData);
  let [isDeletePost, setIsDeletePost] = useState(false);
  let [deleting, setDeleting] = useState(false);
  let [deletingError, setDeletingError] = useState("");
  let [editPost, setEditPost] = useState(editPostData);
  let [edittingPost, setEdittingPost] = useState(false);
  let [edittingPostError, setEdittingPostError] = useState("");
  const [basicModal, setBasicModal] = useState(false);

  const toggleWarningShow = () => setBasicModal(!basicModal);
  const toggleShow = () => setOptSmModal(!optSmModal);

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
    if (formField.post === "") {
      setErrorMessage("Fill all fields");
      setSubmitting(false);
      return;
    }
    API.post(`/dashboard/post/add`, {
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
        setPosts(response.data.results.posts);
        setFormField({
          post: "",
        });
      })
      .catch((error) => {
        if (error.response.data.error) {
          setErrorMessage(error.response.data.message);
          return;
        }
        setErrorMessage(error.message);
      });
  }

  function handleInputCommentChange(event: any) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setAddComment({ ...addComment, [name]: value });
  }

  function onSubmitComment(e: number) {
    // e.preventDefault();
    setSubmittingComment(true);
    setCommentErrorID(e);
    setCommentErrorMessage("");

    if (addComment.comment === "") {
      setCommentErrorMessage("Type a comment");
      setSubmittingComment(false);
      return;
    }
    const newcomment = {
      comment: addComment.comment,
      posts_id: e.toString(),
    };
    setAddComment(newcomment);
    API.post(`/dashboard/comment/add`, {
      ...newcomment,
    })
      .finally(() => {
        setSubmittingComment(false);
      })
      .then((response) => {
        if (response.data.error) {
          setCommentErrorMessage(response.data.message);
          return;
        }
        const freshcomments = response.data.results.comment;
        const newPost = posts;
        for (let i = 0; i < newPost.length; i++) {
          if (newPost[i].id === e) {
            newPost[i].comments = freshcomments;
          }
        }
        setPosts(newPost);
        setAddComment({
          comment: "",
          posts_id: "",
        });
      })
      .catch((error) => {
        setCommentErrorMessage(error.message);
        return;
      });
  }

  function onDeleteComment(commentId: number, postId: number) {
    setDeleteComment({
      comment_id: commentId.toString(),
      posts_id: postId.toString(),
    });
    toggleWarningShow();
  }
  function onDeletePost(post: string, postId: number) {
    setDeletePost({
      post: post,
      posts_id: postId,
    });
    setIsDeletePost(true);
    toggleWarningShow();
  }

  function deleteCommentAPI() {
    setDeleting(true);
    setDeletingError("");
    API.delete(
      `/dashboard/comment/delete/${deleteComment.posts_id}/${deleteComment.comment_id}`
    )
      .finally(() => {
        setDeleting(false);
      })
      .then((response) => {
        if (response.data.error) {
          setDeletingError(response.data.message);
          return;
        }
        const comments = response.data.results.comment;
        const newPost = posts;
        for (let i = 0; i < newPost.length; i++) {
          if (newPost[i].id.toString() === deleteComment.posts_id) {
            newPost[i].comments = comments;
          }
        }
        setPosts(newPost);
        console.log(newPost);
        setDeleteComment({
          comment_id: "",
          posts_id: "",
        });
        toggleWarningShow();
      })
      .catch((error) => {
        setDeleting(false);
        if (error.response.data.error) {
          setDeletingError(error.response.data.message);
          return;
        }
        setDeletingError(error.message);
      });
  }

  function deletePostAPI() {
    setDeleting(true);
    setDeletingError("");
    API.delete(`/dashboard/post/delete/${deletePost.posts_id}`)
      .finally(() => {
        setDeleting(false);
      })
      .then((response) => {
        if (response.data.error) {
          setDeletingError(response.data.message);
          return;
        }
        setPosts(response.data.results.posts);
        setIsDeletePost(false);
        setDeletePost({
          post: "",
          posts_id: 0,
        });
        toggleWarningShow();
      })
      .catch((error) => {
        setDeleting(false);
        if (error.response.data.error) {
          setDeletingError(error.response.data.message);
          return;
        }
        setDeletingError(error.message);
      });
  }

  function handleInputEditPostChange(event: any) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setEditPost({ ...editPost, [name]: value });
  }

  function onEdit(post: string, postId: number) {
    const newEditPostData = {
      post: post,
      posts_id: postId,
    };
    setEditPost(newEditPostData);
    toggleShow();
  }

  function onSubmitEditPost(e: any) {
    e.preventDefault();
    setEdittingPost(true);
    setEdittingPostError("");
    if (editPost.post === "") {
      setEdittingPostError("Fill all fields");
      setEdittingPost(false);
      return;
    }
    API.post(`/dashboard/post/edit/${editPost.posts_id}`, {
      ...editPost,
    })
      .finally(() => {
        setEdittingPost(false);
      })
      .then((response) => {
        if (response.data.error) {
          setEdittingPostError(response.data.message);
          return;
        }
        setPosts(response.data.results.posts);
        toggleShow();
        setEditPost({
          post: "",
          posts_id: 0,
        });
      })
      .catch((error) => {
        if (error.response.data.error) {
          setEdittingPostError(error.response.data.message);
          return;
        }
        setEdittingPostError(error.message);
      });
  }

  return (
    <div className={classes["contianer"]}>
      <MDBRow>
        <MDBCol md="8">
          <MDBCard className="w-100">
            <form onSubmit={onSubmit} autoComplete="off">
              <MDBCardBody>
                <MDBInputGroup>
                  <textarea
                    className={classes["fields"] + " w-100 mb-4"}
                    placeholder="Post a topic"
                    aria-label="Search"
                    rows={6}
                    required={true}
                    name={"post"}
                    value={formField.post}
                    onChange={handleInputChange}
                  ></textarea>
                </MDBInputGroup>
                {/* <MDBTextArea label="Post a topic" id="textAreaExample" rows={4} /> */}
                {errorMessage !== "" && (
                  <p className="text-danger text-center">{errorMessage}</p>
                )}
                <MDBRow>
                  <MDBCol md="6" className="align-self-center">
                    <Icon.Paperclip2 />
                    <span>&nbsp;&nbsp;&nbsp;</span>
                    <Icon.Camera />
                  </MDBCol>
                  <MDBCol className="text-end" md="6">
                    <div className="text-end">
                      <MDBBtn color="warning">
                        <span style={{ fontWeight: "bold" }}>Post </span>
                        {submitting ? (
                          <div className={classes["loadingbutton"]}>
                            <div className="sk-swing">
                              <div className="sk-swing-dot"></div>
                              <div className="sk-swing-dot"></div>
                            </div>
                          </div>
                        ) : (
                          <>
                            <Icon.Send />
                          </>
                        )}
                      </MDBBtn>
                    </div>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </form>
          </MDBCard>
          {posts.length > 0 ? (
            <>
              {posts.map((post: any) => {
                return (
                  <MDBCard key={post.id} className="w-100 mt-5 px-2">
                    <MDBCardBody>
                      <MDBRow>
                        <MDBCol md="1">
                          <Avatar
                            name={post.owner.name}
                            size="30"
                            round={true}
                          />
                        </MDBCol>
                        <MDBCol md="8">
                          <span
                            className={
                              classes["profile-name"] + " text-capitalize"
                            }
                          >
                            {post.owner.name}
                          </span>{" "}
                          <span className={classes["user-title"]}>
                            {post.owner.title ? `- ${post.owner.title}` : ""}
                          </span>
                        </MDBCol>
                        <MDBCol
                          md="3"
                          className="text-end"
                          style={{ fontStyle: "italic" }}
                        >
                          {convertTime(post.created_at)} d{" "}
                          {props.currentUser.id === post.created_by && (
                            <MDBDropdown group className="shadow-0">
                              <MDBDropdownToggle color="link">
                                <Icon.MoreSquare size="18" color="#FFA900" />
                              </MDBDropdownToggle>
                              <MDBDropdownMenu>
                                <MDBDropdownItem
                                  link
                                  onClick={() => {
                                    onEdit(post.post, post.id);
                                  }}
                                >
                                  Edit
                                </MDBDropdownItem>
                                <MDBDropdownItem
                                  link
                                  onClick={() => {
                                    onDeletePost(post.post, post.id);
                                  }}
                                >
                                  Delete
                                </MDBDropdownItem>
                              </MDBDropdownMenu>
                            </MDBDropdown>
                          )}
                        </MDBCol>
                      </MDBRow>
                      <MDBRow className="mt-4">
                        <MDBCol md="12">
                          <MDBCardText>{post.post}</MDBCardText>
                        </MDBCol>
                      </MDBRow>
                    </MDBCardBody>
                    <MDBCardFooter className="text-muted ps-5">
                      {post.comments.length > 0 ? (
                        <>
                          {post.comments.map((comment: any) => {
                            return (
                              <MDBRow key={comment.id} className="mt-2">
                                <MDBCol md="1">
                                  <Avatar
                                    name={comment.owner.name}
                                    size="30"
                                    round={true}
                                  />
                                </MDBCol>
                                <MDBCol md="9">
                                  <span className={classes["profile-name"]}>
                                    {comment.owner.name}
                                  </span>
                                  <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                  <span>{comment.comment}</span>
                                </MDBCol>
                                <MDBCol
                                  md="2"
                                  className="text-end"
                                  style={{ fontStyle: "italic" }}
                                >
                                  {convertTime(comment.created_at)} d
                                  {props.currentUser.id ===
                                    comment.owner.id && (
                                    <Icon.Trash
                                      size="18"
                                      className="ms-2"
                                      onClick={() => {
                                        onDeleteComment(comment.id, post.id);
                                      }}
                                      color="#F93154"
                                    />
                                  )}
                                </MDBCol>
                              </MDBRow>
                            );
                          })}
                        </>
                      ) : (
                        <MDBRow>
                          <MDBCol md="12" className="text-muted">
                            {" "}
                            No comments{" "}
                          </MDBCol>
                        </MDBRow>
                      )}
                      <MDBRow className="mt-5 mb-3">
                        <MDBCol md="1" className="align-self-center">
                          <Avatar
                            name={props.currentUser.name}
                            size="30"
                            round={true}
                          />
                        </MDBCol>
                        <MDBCol md="9" className="align-self-center">
                          <input
                            className={classes["fields"] + ""}
                            type="text"
                            required={true}
                            hidden={true}
                            id={"post_id"}
                            name={"post_id"}
                            value={post.id}
                            onChange={handleInputCommentChange}
                          />
                          <MDBInputGroup tag="form">
                            <input
                              className={classes["fields"] + ""}
                              placeholder="Add a comment"
                              type="text"
                              required={true}
                              name={"comment"}
                              onChange={handleInputCommentChange}
                            />
                          </MDBInputGroup>
                        </MDBCol>
                        <MDBCol md="1" className="align-self-center">
                          <MDBBtn
                            outline
                            rounded
                            color="light"
                            type="button"
                            onClick={() => {
                              onSubmitComment(post.id);
                            }}
                          >
                            {submittingComment ? (
                              <div className={classes["loadingbuttonColor"]}>
                                <div className="sk-swing">
                                  <div className="sk-swing-dot"></div>
                                  <div className="sk-swing-dot"></div>
                                </div>
                              </div>
                            ) : (
                              <Icon.Send color="#FFA900" />
                            )}
                          </MDBBtn>
                        </MDBCol>
                      </MDBRow>
                      {commentErrorMessage !== "" &&
                        commentErrorID === post.id && (
                          <p className="text-danger text-center">
                            {commentErrorMessage}
                          </p>
                        )}
                    </MDBCardFooter>
                  </MDBCard>
                );
              })}
            </>
          ) : (
            <MDBRow>
              <MDBCol md="12" className="text-center text-muted">
                Currently no posts
              </MDBCol>
            </MDBRow>
          )}
        </MDBCol>
        <MDBCol md="1"></MDBCol>
        <MDBCol md="3">
          <Skills isProfile={false} skills={props.skills}></Skills>
        </MDBCol>
      </MDBRow>
      <MDBModal show={optSmModal} tabIndex="-1" setShow={setOptSmModal}>
        <MDBModalDialog centered size="lg">
          <MDBModalContent>
            <form onSubmit={onSubmitEditPost} autoComplete="off">
              <MDBModalHeader>
                <MDBModalTitle>
                  <MDBRow>
                    <MDBCol md="12" className="text-center text-muted">
                      Edit Post
                    </MDBCol>
                  </MDBRow>
                </MDBModalTitle>
                <MDBBtn
                  className="btn-close"
                  color="none"
                  type="button"
                  onClick={toggleShow}
                ></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody>
                <textarea
                  className={classes["fields"] + " w-100"}
                  placeholder="Post a topic"
                  rows={6}
                  required={true}
                  name={"post"}
                  value={editPost.post}
                  onChange={handleInputEditPostChange}
                ></textarea>
              </MDBModalBody>
              {edittingPostError !== "" && (
                <p className="text-danger text-center">{edittingPostError}</p>
              )}
              <MDBRow className="m-4">
                <MDBCol md="12" className="text-center">
                  <MDBBtn color="warning">
                    {edittingPost ? (
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
              </MDBRow>
            </form>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalBody className="my-3">
              <MDBRow>
                <MDBCol md="12" className="text-center text-muted">
                  Are you sure you want to delete the{" "}
                  {isDeletePost ? "post?" : "comment?"}
                </MDBCol>
              </MDBRow>
              {deletingError !== "" && (
                <p className="text-danger text-center">{deletingError}</p>
              )}
              <MDBRow className="mt-4">
                <MDBCol className="text-center" md="6">
                  <MDBBtn
                    onClick={isDeletePost ? deletePostAPI : deleteCommentAPI}
                    color="danger"
                  >
                    {deleting ? (
                      <div className={classes["loadingbutton"]}>
                        <div className="sk-swing">
                          <div className="sk-swing-dot"></div>
                          <div className="sk-swing-dot"></div>
                        </div>
                      </div>
                    ) : (
                      "Yes"
                    )}
                  </MDBBtn>
                </MDBCol>
                <MDBCol className="text-center" md="6">
                  <MDBBtn onClick={toggleWarningShow} color="link">
                    No
                  </MDBBtn>
                </MDBCol>
              </MDBRow>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
  );
};

export default Posts;
