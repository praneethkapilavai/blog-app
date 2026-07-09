import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import userAuthorContextObj from "../../contexts/UserAuthorContext";
import { FaEdit } from "react-icons/fa";
import { MdDelete, MdRestore } from "react-icons/md";
import {useState} from 'react'
import {useNavigate , useParams} from 'react-router-dom'
import axios from 'axios'
import {useForm} from 'react-hook-form'


const ArticleById = () => {
  const { state } = useLocation();
  const { currentUser } = useContext(userAuthorContextObj);
  const navigate = useNavigate();
  const {email , articleId} = useParams();
  // const {params} = useParams();
  // console.log("cur " , articleId);
  // console.log(id);
  // console.log("aid" , state.comments)
  // console.log("state" , state)
  const {register,handleSubmit,formState: { errors },} = useForm();
  let [editStatus , setEditStatus] = useState(false)


  const setEditStat = ()=>{
    setEditStatus(!editStatus);
  }

  async function SubmitForm(data) {

    // console.log("date" , data);

    let updatedArticle = {
        articleId: state.articleId,
        title: data.title,
        content: data.content,
        category: data.category
    };
    // console.log("up" , updatedArticle)

    const res = await axios.put(
        `http://localhost:3000/author-api/modifyarticle/${articleId}`,
        updatedArticle
    );

    setEditStatus(false);
    // console.log("resp" , res.data.payload);

    // navigate(`/author-profile/${email}/${articleId}`);
    navigate(`/author-profile/${email}/${articleId}`, {
      state: {
          ...state,
          ...updatedArticle
      }
  });
  }

  async function handleRestore(){
    let articleId = state.articleId;
    
    let updatedArticle = {...state , isArticleActive : true}

    let resp = await axios.put(`http://localhost:3000/author-api/modifyarticle/${articleId}`, updatedArticle);
    console.log(resp.data)

    navigate(`/author-profile/${email}/${articleId}`,{
      state: {
        ...state,
        ...updatedArticle
      }
    })
  }
  async function handleDelete(){
    let articleId = state.articleId;
    
    let updatedArticle = {...state , isArticleActive : false}

    let resp = await axios.put(`http://localhost:3000/author-api/modifyarticle/${articleId}`, updatedArticle);
    console.log(resp.data)

    navigate(`/author-profile/${email}/${articleId}`,{
      state: {
        ...state,
        ...updatedArticle
      }
    })
  }

  async function addComment(data){
    // console.log("comment" , data.comment)
    let newComment = {
      nameOfUser : currentUser.firstName + ' ' + currentUser.lastName,
      comment : data.comment
    };
    // console.log("new comment " , newComment)
    let resp = await axios.put(`http://localhost:3000/user-api/addcomment/${state.articleId}` , newComment)
    // console.log("res" ,resp.data)
    
    let toNav = (currentUser.role === "Author" ? "author" : "user");

    navigate(`/${toNav}-profile/${email}/${articleId}`,{
      state: {
        ...state,
        comments : [...state.comments , newComment]
      }
    })
  }


  return (
    <div className="container mt-5">
      {/* <h1>{state.title}</h1> */}
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
                            <button className="btn btn-light" onClick={handleDelete}>
                              <MdDelete className="text-danger fs-5" />
                            </button>
                          ) : (
                            <button className="btn btn-light" onClick={handleRestore}> 
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
                  <form action="" onSubmit={handleSubmit(addComment)} className="w-75">
                    <div className="flex-grow-1 w-100">

                      <textarea
                         {...register("comment", { required: true })}
                        className="form-control"
                        rows="2"
                        placeholder="Write a comment..."
                        style={{ resize: "none" }}
                      ></textarea>

                      <div className="text-end mt-2">
                        <button className="btn btn-primary btn-sm px-4" type = "submit">
                          Post
                        </button>
                      </div>

                    </div>
                  </form>
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

                      <form onSubmit={handleSubmit(SubmitForm)}>
                        {/* Title */}
                        <div className="mb-3">
                          <label className="form-label fw-semibold">Title</label>
                          <input
                            type="text"
                            className="form-control"
                            defaultValue={state.title}
                            {...register("title", { required: true })}
                          />
                          {errors.title && (
                            <p className="text-danger mt-1">Title is required</p>
                          )}
                        </div>

                        {/* Category */}
                        <div className="mb-3">
                          <label className="form-label fw-semibold">Category</label>
                          <select
                            className="form-select"
                            defaultValue={state.category}
                            {...register("category", { required: true })}
                          >
                            <option value="Programming">Programming</option>
                            <option value="Technology">Technology</option>
                            <option value="AI">AI</option>
                            <option value="Education">Education</option>
                            <option value="Others">Others</option>
                          </select>
                          {errors.category && (
                            <p className="text-danger mt-1">Category is required</p>
                          )}
                        </div>

                        {/* Content */}
                        <div className="mb-3">
                          <label className="form-label fw-semibold">Content</label>
                          <textarea
                            className="form-control"
                            rows="10"
                            defaultValue={state.content}
                            {...register("content", { required: true })}
                          />
                          {errors.content && (
                            <p className="text-danger mt-1">Content is required</p>
                          )}
                        </div>

                        {/* Buttons */}
                        <div className="d-flex justify-content-end gap-3">
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