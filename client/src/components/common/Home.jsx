import React from 'react'
import { UserAuthorContextObj } from '../../contexts/UserAuthorContext.jsx'
import {useContext , useEffect} from 'react'
import {useUser} from '@clerk/react'
import axios from "axios";
import{useNavigate} from 'react-router-dom'

const Home = () => {
  const {currentUser , setCurrentUser} = useContext(UserAuthorContextObj)
  const navigate = useNavigate()
  const {isSignedIn , user , isLoaded} = useUser()
  // to know whether somebody is signed in or not

    // console.log(user , isLoaded , isSignedIn)

    useEffect(()=>{
      if (isLoaded && isSignedIn && user) {
        setCurrentUser({
            ...currentUser,
            firstName : user.firstName || "",
            lastName : user.lastName || "",
            email : user.emailAddresses[0]?.emailAddress || "",
            profileImageUrl : user.imageUrl || ""
        })
      }
    }, [isLoaded])

    if(!isLoaded){
      return <div>Loading...</div>
    }


  async  function onSelectRole(e){
      const selectedRole = e.target.value
      
      const updatedUser = {
        ...currentUser,
        role: selectedRole
      };
      
      setCurrentUser(updatedUser);
      
      if (selectedRole === "User") {
          // console.log(updatedUser)
        let res = await axios.post(
            "http://localhost:3000/user-api/registeruser",
            updatedUser
          );
          // <Navigate to = "/user-home"></Navigate>
          navigate(`/user-profile/${currentUser.email}`)
          // console.log("user response" , res)
        }
        
        if (selectedRole === "Author") {
          // console.log(updatedUser)
          await axios.post(
            "http://localhost:3000/author-api/registerauthor",
            updatedUser
          );
        }
      }
    return (
      <div>
        {
          isSignedIn === true &&   (
            <div>
                <h1 className = "d-flex justify-content-center align-items-center display-5 bg-info mt-3">
                  <div className = "d-flex justify-content-center align-items-center  p-1">
                      Welcome {currentUser.firstName} {currentUser.lastName}
                      {  currentUser.profileImageUrl && (<img src = {currentUser.profileImageUrl} alt = "" className='rounded-circle m-5' style = {{width : "70px" , height : "70px"}} />)}
                      </div>
                </h1>


                  <h1 className = 'display-5'>Select Role : </h1>
                <div className = 'd-flex justify-content-center align-items-center mt-3 gap-4 bg-secondary p-2 rounded-2 fw-semibold'>
                  <div className = 'form-check '>
                      <input type = "radio" name = "role" value = "User" className = "form-check-input" onChange={onSelectRole} />
                      <label htmlFor = "role" className = "form-label text-white">User</label>
                  </div>
                  <div className = 'form-check'>
                    <input type = "radio" name = "role" value = "Author" className = "form-check-input" onChange={onSelectRole} />
                    <label htmlFor = "role" className = "form-label text-white">Author</label>
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