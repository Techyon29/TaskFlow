'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import {ArrowLeft} from 'lucide-react'
const Page = () => {
    const [forgetPasswordModel, setForgetPasswordModel] = useState(false)
    const [forgetEmailModel, setForgetEmailModel] = useState(false)
    const [forgetOtpModel, setForgetOtpModel] = useState(false)
    const router = useRouter();
  return (
    <div className=' min-h-screen flex justify-center items-center'>
        { !forgetEmailModel && !forgetOtpModel && !forgetPasswordModel &&
        <form className=' bg-background text-primary w-full max-w-sm p-7 border rounded-2xl flex flex-col gap-5 mx-5'>
            <h1 className=' text-4xl font-bold text-center'>Task <span className=' text-indigo-500'>Flow</span></h1>
            <div className=' flex flex-col gap-2'>
                <label htmlFor="email" className=' text-sm text-muted-foreground'>Email</label>
                <input type="email" placeholder='e.g. jhon@gmail.com' className=' w-full p-2 rounded-lg border outline-0' required/>
            </div>
            <div className=' flex flex-col gap-2'>
                <label htmlFor="email" className=' text-sm text-muted-foreground'>Password</label>
                <input type="password" placeholder='e.g. Jhon123' className=' w-full p-2 rounded-lg border outline-0' required/>
                <h3 className=' text-sm text-indigo-500 ml-auto hover:underline cursor-pointer' onClick={()=>setForgetEmailModel(true)}>Forget Password ?</h3>
            </div>
                <button className=' rounded-full bg-indigo-500 p-2 font-semibold cursor-pointer'>Login</button>
            <h4 className=' text-center text-sm'>Don&apos;t have account ? <span className=' text-indigo-500 cursor-pointer hover:underline' onClick={()=>router.push('/auth/signup')}>Registration</span></h4>
        </form>
         }

         {/* Forget Email  */}
         {
            forgetEmailModel && <form className=' bg-background text-primary w-full max-w-sm p-7 border rounded-2xl flex flex-col gap-5 mx-5'>
                <h2 className=' flex items-center gap-1 hover:text-indigo-500 cursor-pointer' onClick={()=>{setForgetEmailModel(false)}}><ArrowLeft className='  cursor-pointer size-5'/>Back</h2>
            <h1 className=' text-4xl font-bold text-center'>Send <span className=' text-indigo-500'>OTP</span></h1>
            <div className=' flex flex-col gap-2'>
                <label htmlFor="email" className=' text-sm text-muted-foreground'>Email</label>
                <input type="email" placeholder='e.g. jhon@gmail.com' className=' w-full p-2 rounded-lg border outline-0' required/>
            </div>
                <button className=' rounded-full bg-indigo-500 p-2 font-semibold cursor-pointer'>Send Email</button>
        </form>
         }
         {/* Otp Model */}
         {forgetOtpModel && <form className=' bg-background text-primary w-full max-w-sm p-7 border rounded-2xl flex flex-col gap-5 mx-5'>
            <h2 className=' flex items-center gap-1 hover:text-indigo-500 cursor-pointer' onClick={()=>{setForgetEmailModel(true); setForgetOtpModel(false)}}><ArrowLeft className='  cursor-pointer size-5'/>Back</h2>
            <h1 className=' text-4xl font-bold text-center'>Verify <span className=' text-indigo-500'>OTP</span></h1>
            <div className=' flex flex-col gap-2'>
                <label htmlFor="email" className=' text-sm text-muted-foreground'>OTP</label>
                <input type="email" placeholder='e.g. 123456' className=' w-full p-2 rounded-lg border outline-0' required/>
            </div>
                <button className=' rounded-full bg-indigo-500 p-2 font-semibold cursor-pointer'>Verify OTP</button>
        </form>
        }

        {/* Reset Password Model */}
        { forgetPasswordModel && <form className=' bg-background text-primary w-full max-w-sm p-7 border rounded-2xl flex flex-col gap-5 mx-5'>
            <h1 className=' text-4xl font-bold text-center'>Reset <span className=' text-indigo-500'>Password</span></h1>
            <div className=' flex flex-col gap-2'>
                <label htmlFor="email" className=' text-sm text-muted-foreground'>New Password</label>
                <input type="password" placeholder='e.g. Jhon123' className=' w-full p-2 rounded-lg border outline-0' required/>
            </div>
            <div className=' flex flex-col gap-2'>
                <label htmlFor="email" className=' text-sm text-muted-foreground'>Confirm Password</label>
                <input type="password" placeholder='e.g. Jhon123' className=' w-full p-2 rounded-lg border outline-0' required/>
            </div>
                <button className=' rounded-full bg-indigo-500 p-2 font-semibold cursor-pointer'>Reset Password</button>
            </form>}
    </div>
  )
}

export default Page