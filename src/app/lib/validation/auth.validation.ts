import {z} from 'zod'


export const loginFormValidation = z.object({
        email:z.string().min(1,"Email is required").email("Invalid Email"),
        password:z.string().trim().min(4,"Password is too short")
    })

export const signUpSchema = z.object({
    name:z.string().trim().min(2,"Name should be greater than 2 characters"),
    email:z.string().email(),
    password:z.string().min(4,"Password is to short"),
    confirmPassword:z.string(),
  }).refine((data)=> data.password === data.confirmPassword,{path:['confirmPassword'],message:"Password is not match"})

export const forgetEmailValidation = z.object({
    email:z.string().min(1,"Invalid Email").email("Invalid Email")
})

export const otpVerifyValidation = z.object({
    otp:z.string().length(6,"OTP length is 6")
})

export const resetPasswordValidation = z.object({
    password:z.string().min(4,"Password is too short"),
    confirmPassword:z.string().min(4,"Password is too short")
}).refine((data)=> data.password === data.confirmPassword,{path:['confirmPassword'],message:"Password is not match"})