import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import {useContext} from "react";
import { UserAuthorContextObj } from "../../contexts/UserAuthorContext";
import {useNavigate} from "react-router-dom";

const PostArticle = () => {


  const { register, handleSubmit, formState: { errors } } = useForm();
  const {currentUser} = useContext(UserAuthorContextObj)
  const navigate = useNavigate();

    async function handlePublishArticle(articleObj){

        const authorData = {
        nameOfAuthor : currentUser.firstName + ' ' + currentUser.lastName,
        emailofAuthor : currentUser.email,
        profileUrl : currentUser.profileImageUrl
      }

      articleObj.authorData = authorData;
      articleObj.articleId = Date.now();

      let currDate = new Date();
      articleObj.dateOfCreation = currDate.getDate() 
                                  + "-"
                                  + currDate.getMonth()
                                  + "-"
                                  + currDate.getFullYear();
                                  + " "
                                  +currDate.toLocaleDateString("en-US" , {hour12 : true})
      articleObj.dateOfModification = currDate.getDate() 
                                  + "-"
                                  + currDate.getMonth()
                                  + "-"
                                  + currDate.getFullYear();
                                  + " "
                                  +currDate.toLocaleDateString("en-US" , {hour12 : true})

      articleObj.comments = []
      articleObj.isArticleActive = true;

      // console.log(articleObj)

      let resp = await axios.post("http://localhost:3000/author-api/createarticle" , articleObj)

      // console.log(resp)

      if(resp.statusText === "OK"){
        // go to articles page
        alert('article posted successfully')
        navigate('/author-profile/articles')
      }
      else{
        alert(resp.data.message)
        navigate('/author-profile/create-article')
      }

    }


  


  return (
    <div className="container mt-4 mb-5" style={{ maxWidth: '800px' }}>
      <div className="card shadow-sm border-0 rounded-4 p-4 p-md-5">
        <div className="mb-4 text-center">
          <h2 className="fw-bold text-dark mb-2">Create New Article</h2>
          <p className="text-secondary">Share your thoughts with the world</p>
        </div>

        <form onSubmit={handleSubmit(handlePublishArticle)}>
          {/* Title */}
          <div className="mb-4">
            <label className="form-label fw-medium text-dark">
              <i className="bi bi-type me-2 text-primary"></i>
              Article Title
            </label>
            <input
              type="text"
              className="form-control form-control-lg rounded-3 shadow-none border-secondary-subtle"
              placeholder="Enter an engaging title"
              {...register("title", {required:true})}
              name="title"
              />
          </div>

          {/* Category */}
          <div className="mb-4">
            <label className="form-label fw-medium text-dark">
              <i className="bi bi-tags me-2 text-primary"></i>
              Category
            </label>
            <select 
              className="form-select form-select-lg rounded-3 shadow-none border-secondary-subtle" 
              {...register("category", { required: true })}
            >
              <option value="">Select a Category</option>
              <option value="Technology">Technology</option>
              <option value="Education">Education</option>
              <option value="Sports">Sports</option>
              <option value="Politics">Politics</option>
              <option value="Health">Health</option>
              <option value="Entertainment">Entertainment</option>
            </select>
          </div>

          {/* Content */}
          <div className="mb-5">
            <label className="form-label fw-medium text-dark">
              <i className="bi bi-card-text me-2 text-primary"></i>
              Content
            </label>
            <textarea
              className="form-control rounded-3 shadow-none border-secondary-subtle"
              rows="12"
              placeholder="Write your amazing article here..."
              {...register("content", { required: true })}
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="d-grid gap-2 col-md-8 mx-auto">
            <button type="submit" className="btn btn-primary btn-lg rounded-pill fw-medium shadow-sm d-flex justify-content-center align-items-center">
              <i className="bi bi-send-fill me-2"></i>
              Publish Article
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostArticle;