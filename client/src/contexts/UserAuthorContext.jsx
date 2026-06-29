import {createContext , useState} from 'react'

export const UserAuthorContextObj = createContext()


export const UserAuthorContext = ({children}) => {
    let [currentUser , setCurrentUser] = useState({
        firstName : "",
        lastName : "",
        email : '',
        profileImageUrl : "",
        role : ""
    })

  return (
    <UserAuthorContextObj.Provider value = {{currentUser , setCurrentUser}}>
        {children}
    </UserAuthorContextObj.Provider>
  )
}

export default UserAuthorContextObj