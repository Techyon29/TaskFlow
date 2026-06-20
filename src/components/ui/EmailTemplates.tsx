import React from 'react'


type data = {
    firstName : string,
    otp:string,
}
const EmailTemplates = ({firstName, otp} : data) => {
  return (
    <div>
        <h1 className=' text-2xl font-semibold'>Hi {firstName}</h1>
        <p className=' text-lg'> Your Otp for password reset is <span className=' text-blue-500 font-semibold'>{otp}</span></p>
    </div>
  )
}

export default EmailTemplates