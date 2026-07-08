import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import userAuthorContextObj from "../../contexts/UserAuthorContext";
import { FaEdit } from "react-icons/fa";
import { MdDelete, MdRestore } from "react-icons/md";
import {useState} from 'react'


const ArticleById = () => {
  const { state } = useLocation();
  const { currentUser } = useContext(userAuthorContextObj);
  // console.log("aid" , state.comments)
  let [editStatus , setEditStatus] = useState(false)


  const setEditStat = ()=>{
    setEditStatus(!editStatus);
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-lg border-0">
        <div className="card-body">
          {!editStatus ? (
          <>
          <div className="d-flex justify-content-between align-items-center flex-wrap">

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

            <div className="d-flex align-items-center gap-4">

              {currentUser?.role === "Author" && (
                <div className="d-flex me-2">
                  <button className="btn btn-light me-2" onClick={setEditStat}>
                    <FaEdit  className="text-warning fs-5" />
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
                <div className="border rounded-3 p-3 bg-light">
                  {state.comments.map((commentObj, index) => (
                    <div
                      key={index}
                      className="py-2 border-bottom"
                    >
                      <span className="fw-bold text-primary">
                        {commentObj.nameOfUser}
                      </span>
                      <span className="fw-semibold"> : </span>
                      <span className="text-dark">
                        {commentObj.comment}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="alert alert-light border text-center">
                  No comments yet.
                </div>
              )}
            </div>  
        </>):
       <>
  <div className="container mt-4">
    <div className="card shadow p-4">
      <h2 className="mb-4 text-center">Edit Article</h2>

      <form>
        {/* Title */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Title</label>
          <input
            type="text"
            className="form-control"
            defaultValue={state.title}
          />
        </div>

        {/* Category */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Category</label>
          <select
            className="form-select"
            defaultValue={state.category}
          >
            <option value="Programming">Programming</option>
            <option value="Technology">Technology</option>
            <option value="AI">AI</option>
            <option value="Education">Education</option>
            <option value="Others">Others</option>
          </select>
        </div>

        {/* Content */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Content</label>
          <textarea
            className="form-control"
            rows="10"
            defaultValue={state.content}
          />
        </div>

        {/* Buttons */}
        <div className="d-flex justify-content-end gap-3">
          <button
            type="button"
            className="btn btn-outline-secondary"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="btn btn-primary"
          >
            Update Article
          </button>
        </div>
      </form>
    </div>
  </div>
</>
        }

    

              </div>
            </div>
          </div>
        );
      };

      export default ArticleById;