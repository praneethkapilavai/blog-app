import React from 'react'
import { UserAuthorContextObj } from '../../contexts/UserAuthorContext.jsx'
import { useContext, useEffect } from 'react'
import { useUser } from '@clerk/react'
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Home = () => {
  const { currentUser, setCurrentUser } = useContext(UserAuthorContextObj)
  const navigate = useNavigate()
  const { isSignedIn, user, isLoaded } = useUser()
  // to know whether somebody is signed in or not
  const [error, setError] = useState("")
  // console.log(user , isLoaded , isSignedIn)

  


  async function onSelectRole(e) {
    setError('')
    const selectedRole = e.target.value

    const updatedUser = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.emailAddresses[0]?.emailAddress,
      profileImageUrl: user.imageUrl,
      role: selectedRole
    };
    setCurrentUser(updatedUser);

    if (selectedRole === "User") {
      // console.log(updatedUser)
      let res = await axios.post(
        "http://localhost:3000/user-api/registeruser",
        updatedUser
      );
      let { message, payload } = res.data
      if (message === "new user created" || message === "You are already a user") {
        navigate(`/user-profile/${currentUser.email}`)
        setCurrentUser({ ...currentUser, ...payload })
      } else {
        setError(message)
        // console.log(message)
      }
    }

    if (selectedRole === "Author") {
      // console.log(updatedUser)
      let res = await axios.post(
        "http://localhost:3000/author-api/registerauthor",
        updatedUser
      );
      let { message, payload } = res.data
      if (message === "new author created" || message === "You are already an author") {
        navigate(`/author-profile/${updatedUser.email}`)
        setCurrentUser({ ...updatedUser, ...payload })
      } else {
        setError(message)
        // console.log(message)
      }
    }
  }

  return (
    <div>
      {
        isSignedIn === true && (
          <div>
            <h1 className="d-flex justify-content-center align-items-center display-5 bg-info mt-3">
              <div className="d-flex justify-content-center align-items-center  p-1">
                Welcome {currentUser.firstName} {currentUser.lastName}
                {currentUser.profileImageUrl && (<img src={currentUser.profileImageUrl} alt="" className='rounded-circle m-5' style={{ width: "70px", height: "70px" }} />)}
              </div>
            </h1>


            <h1 className='display-5'>Select Role : </h1>
            {
              error.length !== 0 && (
                <div className="alert alert-danger d-flex justify-content-center">{error}</div>
              )
            }
            <div className='d-flex justify-content-center align-items-center mt-3 gap-4 bg-secondary p-2 rounded-2 fw-semibold'>
              <div className='form-check '>
                <input type="radio" name="role" value="User" className="form-check-input" onChange={onSelectRole} />
                <label htmlFor="role" className="form-label text-white">User</label>
              </div>
              <div className='form-check'>
                <input type="radio" name="role" value="Author" className="form-check-input" onChange={onSelectRole} />
                <label htmlFor="role" className="form-label text-white">Author</label>
              </div>
            </div>

          </div>
        )
      }
      {
        !isSignedIn && (
          <div>
            <h1>Home</h1>
          </div>
        )
      }
    </div>

  )
}

export default Home