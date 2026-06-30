import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import userAuthorContextObj from "../../contexts/UserAuthorContext";
import { FaEdit } from "react-icons/fa";
import { MdDelete, MdRestore } from "react-icons/md";

const ArticleById = () => {
  const { state } = useLocation();
  const { currentUser } = useContext(userAuthorContextObj);
  // console.log("aid" , currentUser)

  return (
    <div className="container mt-5">
      <div className="card shadow-lg border-0">
        <div className="card-body">

          {/* Header */}
          <div className="d-flex justify-content-between align-items-center flex-wrap">

            {/* Left */}
            <div>
              <h1 className="display-5 fw-bold">{state.title}</h1>

              <div className="mt-3">
                <span className="badge bg-secondary me-2">
                  Created: {state.dateOfCreation}
                </span>

                <span className="badge bg-info text-dark">
                  Modified: {state.dateOfModification}
                </span>
              </div>
            </div>

            {/* Right */}
            <div className="d-flex align-items-center gap-4">

              {/* Action Buttons */}
              {currentUser?.role === "Author" && (
                <div className="d-flex me-2">
                  <button className="btn btn-light me-2">
                    <FaEdit className="text-warning fs-5" />
                  </button>

                  {state?.isArticleActive ? (
                    <button className="btn btn-light">
                      <MdDelete className="text-danger fs-5" />
                    </button>
                  ) : (
                    <button className="btn btn-light">
                      <MdRestore className="text-info fs-5" />
                    </button>
                  )}
                </div>
              )}

              {/* Author */}
              <div className="text-center">
                <img
                  src={state.authorData.profileImageUrl}
                  alt="Author"
                  className="rounded-circle border border-3 border-primary shadow"
                  width="80"
                  height="80"
                />

                <h5 className="mt-2 mb-0">
                  {state.authorData.nameOfAuthor}
                </h5>
              </div>

            </div>
          </div>

          <hr />

         

{/* Article Content */}
<div className="mt-4">
  <h3 className="mb-3">Content</h3>

  <div className="border rounded-3 p-4 bg-light">
    <p
      className="fs-5 lh-lg text-secondary mb-0"
      style={{ whiteSpace: "pre-wrap" }}
    >
      {state.content}
    </p>
  </div>
</div>

{/* Add Comment */}
{/* Add Comment */}
<div className="mt-5">
  <h4 className="mb-3">Leave a Comment</h4>

  <div className="d-flex gap-3 align-items-start">

    <img
      src={currentUser.profileImageUrl}
      alt=""
      className="rounded-circle"
      width="45"
      height="45"
    />

    <div className="flex-grow-1">

      <textarea
        className="form-control"
        rows="2"
        placeholder="Write a comment..."
        style={{ resize: "none" }}
      ></textarea>

      <div className="text-end mt-2">
        <button className="btn btn-primary btn-sm px-4">
          Post
        </button>
      </div>

    </div>

  </div>
</div>

{/* Comments */}
<div className="mt-5">
  <h3 className="mb-3">Comments</h3>

  {state.comments?.length > 0 ? (
    state.comments.map((commentObj, index) => (
      <div
        key={index}
        className="border rounded-3 p-3 mb-3 shadow-sm"
      >
        <div className="d-flex align-items-center mb-3">

          <img
            src={commentObj.profileImageUrl}
            alt=""
            className="rounded-circle me-3"
            width="50"
            height="50"
          />

          <div>
            <h6 className="mb-0">
              {commentObj.username}
            </h6>

            <small className="text-muted">
              {commentObj.date}
            </small>
          </div>

        </div>

        <p className="mb-0">
          {commentObj.comment}
        </p>
      </div>
    ))
  ) : (
    <div className="alert alert-light border text-center">
      No comments yet.
    </div>
  )}
</div>  

        </div>
      </div>
    </div>
  );
};

export default ArticleById;