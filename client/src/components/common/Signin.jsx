import React from 'react'
import { SignIn } from '@clerk/react'

const Signin = () => {
  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
      <SignIn path="/signin" routing="path" signUpUrl="/signup" />
    </div>
  )
}

export default Signin