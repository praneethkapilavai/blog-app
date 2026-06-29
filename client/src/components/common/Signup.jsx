import React from 'react'
import { SignUp } from '@clerk/react'

const Signup = () => {
  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
      <SignUp path="/signup" routing="path" signInUrl="/signin" />
    </div>
  )
}

export default Signup