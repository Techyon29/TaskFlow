'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import {ArrowLeft} from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { forgetEmailValidation, loginFormValidation, otpVerifyValidation, resetPasswordValidation } from '../../lib/validation/auth.validation'
import z from 'zod'
import toast from 'react-hot-toast'
import { forgetEmailType, otpVerifyType, resetPasswordType } from '@/src/types/auth.type'
const Page = () => {
    const [forgetPasswordModel, setForgetPasswordModel] = useState(false)
    const [forgetEmailModel, setForgetEmailModel] = useState(false)
    const [forgetOtpModel, setForgetOtpModel] = useState(false)
    const [email, setEmail] = useState('')
    const router = useRouter();

     

    type loginFormType = z.infer<typeof loginFormValidation>

    const {
        register: LoginForm,
        handleSubmit: LoginSubmit,
        watch,reset: loginReset,
        formState:{errors},

    } = useForm({resolver:zodResolver(loginFormValidation)});

    const forgetEmail = useForm({resolver:zodResolver(forgetEmailValidation)})

    const onLogin = async (data : loginFormType)=>{
        try {
            const response = await fetch("/api/auth/login",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify(data)
            })
            const res = await response.json()
            if(res.success){
                toast.success(res.message)
                loginReset()
            }else{
                toast.error(res.message);
            }
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Something Went wrong")
        }
    }

    const onError = (error : any)=>{
        Object.values(error).forEach((e : any)=>{
            if(e?.message){
                toast.error(e.message)
            }
        })
    }

    const forgetEmailSubmit = async ( data : forgetEmailType)=>{
        try {
            const response = await fetch('/api/auth/otp',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(data)
            })

            const res = await response.json()
            if(!res.success){
                toast.error(res.message)
            }else{
                toast.success(res.message);
                forgetEmail.reset()
                setEmail(data.email)
                setForgetEmailModel(false)
                setForgetOtpModel(true)
            }
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Something Went wrong")
        }
    }

    const otpVerify = useForm({resolver:zodResolver(otpVerifyValidation)})
    
    const otpVerifySubmit = async ( data : otpVerifyType)=>{
        try {
            const response = await fetch("/api/auth/otp/verify",{
                method:"POST",
                body:JSON.stringify({otp:data,email})
            })

            const res = await response.json()
            if(!res.success){
                toast.error(res.message)
            }else{
                toast.success(res.message)
                otpVerify.reset()
                setForgetOtpModel(false)
                setForgetPasswordModel(true)
            }
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Something Went Wrong")
        }
    }

    const resetPassword = useForm({resolver:zodResolver(resetPasswordValidation)})

    const resetPasswordSubmit = async ( data : resetPasswordType)=>{
        try {
            const response = await fetch("/api/auth/resetPassword",{
                method:"POST",
                body:JSON.stringify({email,data})
            })

            const res = await response.json()
            if(!res.success){
                toast.error(res.message)
            }else{
                toast.success(res.message)
                setForgetPasswordModel(false)
                resetPassword.reset()
                setEmail('')
            }
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Something Went Wrong")
        }
    }

  return (
    <div className=' min-h-screen flex justify-center items-center'>
        { !forgetEmailModel && !forgetOtpModel && !forgetPasswordModel &&
        <form className=' bg-background text-primary w-full max-w-sm p-7 border rounded-2xl flex flex-col gap-5 mx-5' onSubmit={LoginSubmit(onLogin,onError)}>
            <h1 className=' text-4xl font-bold text-center'>Task <span className=' text-indigo-500'>Flow</span></h1>
            <div className=' flex flex-col gap-2'>
                <label htmlFor="email" className=' text-sm text-muted-foreground'>Email</label>
                <input type="email" placeholder='e.g. jhon@gmail.com' className=' w-full p-2 rounded-lg border outline-0' {...LoginForm('email')} />
            </div>
            <div className=' flex flex-col gap-2'>
                <label htmlFor="email" className=' text-sm text-muted-foreground'>Password</label>
                <input {...LoginForm('password')} type="password" placeholder='e.g. Jhon123' className=' w-full p-2 rounded-lg border outline-0' />
                <h3 className=' text-sm text-indigo-500 ml-auto hover:underline cursor-pointer' onClick={()=>setForgetEmailModel(true)}>Forget Password ?</h3>
            </div>
                <button className=' rounded-full bg-indigo-500 p-2 font-semibold cursor-pointer'>Login</button>
            <h4 className=' text-center text-sm'>Don&apos;t have account ? <span className=' text-indigo-500 cursor-pointer hover:underline' onClick={()=>router.push('/auth/signup')}>Registration</span></h4>
        </form>
         }

         {/* Forget Email  */}
         {
            forgetEmailModel && <form className=' bg-background text-primary w-full max-w-sm p-7 border rounded-2xl flex flex-col gap-5 mx-5' onSubmit={forgetEmail.handleSubmit(forgetEmailSubmit,onError)}>
                <h2 className=' flex items-center gap-1 hover:text-indigo-500 cursor-pointer' onClick={()=>{setForgetEmailModel(false)}}><ArrowLeft className='  cursor-pointer size-5'/>Back</h2>
            <h1 className=' text-4xl font-bold text-center'>Send <span className=' text-indigo-500'>OTP</span></h1>
            <div className=' flex flex-col gap-2'>
                <label htmlFor="email" className=' text-sm text-muted-foreground'>Email</label>
                <input type="email" placeholder='e.g. jhon@gmail.com' className=' w-full p-2 rounded-lg border outline-0' {...forgetEmail.register('email')}/>
            </div>
                <button className=' rounded-full bg-indigo-500 p-2 font-semibold cursor-pointer'>Send Email</button>
        </form>
         }
         {/* Otp Model */}
         {forgetOtpModel && <form onSubmit={otpVerify.handleSubmit(otpVerifySubmit,onError)} className=' bg-background text-primary w-full max-w-sm p-7 border rounded-2xl flex flex-col gap-5 mx-5'>
            <h2 className=' flex items-center gap-1 hover:text-indigo-500 cursor-pointer' onClick={()=>{setForgetEmailModel(true); setForgetOtpModel(false)}}><ArrowLeft className='  cursor-pointer size-5'/>Back</h2>
            <h1 className=' text-4xl font-bold text-center'>Verify <span className=' text-indigo-500'>OTP</span></h1>
            <div className=' flex flex-col gap-2'>
                <label htmlFor="email" className=' text-sm text-muted-foreground'>OTP</label>
                <input type="text" placeholder='e.g. 123456' className=' w-full p-2 rounded-lg border outline-0' {...otpVerify.register("otp")}/>
            </div>
                <button className=' rounded-full bg-indigo-500 p-2 font-semibold cursor-pointer'>Verify OTP</button>
        </form>
        }

        {/* Reset Password Model */}
        { forgetPasswordModel && <form className=' bg-background text-primary w-full max-w-sm p-7 border rounded-2xl flex flex-col gap-5 mx-5' onSubmit={resetPassword.handleSubmit(resetPasswordSubmit,onError)}>
            <h1 className=' text-4xl font-bold text-center'>Reset <span className=' text-indigo-500'>Password</span></h1>
            <div className=' flex flex-col gap-2'>
                <label htmlFor="email" className=' text-sm text-muted-foreground'>New Password</label>
                <input type="password" placeholder='e.g. Jhon123' className=' w-full p-2 rounded-lg border outline-0' {...resetPassword.register('password')}/>
            </div>
            <div className=' flex flex-col gap-2'>
                <label htmlFor="email" className=' text-sm text-muted-foreground'>Confirm Password</label>
                <input type="password" placeholder='e.g. Jhon123' className=' w-full p-2 rounded-lg border outline-0' {...resetPassword.register('confirmPassword')}/>
            </div>
                <button className=' rounded-full bg-indigo-500 p-2 font-semibold cursor-pointer'>Reset Password</button>
            </form>}
    </div>
  )
}

export default Page