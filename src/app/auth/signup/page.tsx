'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import {useForm} from 'react-hook-form'
import {z}from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import { forgetEmailValidation, signUpSchema } from '../../../lib/validation/auth.validation'
const Page = () => {

  const [loading, setLoading] = useState(false)
  const router = useRouter();

  type signUpSchemaType = z.infer<typeof signUpSchema>
  const { register, handleSubmit,watch, reset, formState : {errors}, } = useForm({resolver:zodResolver(signUpSchema),})

  const forgetEmail = useForm({resolver:zodResolver(forgetEmailValidation)})

  const onSubmit = async (data : signUpSchemaType)=>{
    setLoading(true)
    try {
      const response = await fetch("/api/auth/signup",{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body: JSON.stringify(data)
      });

      const res = await response.json();
      if(!res.success){
        toast.error(res.message)
      }
      else{
        toast.success(res.message)
        router.push("/auth/login")
        reset()
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Internal Server Error")
    }finally{
      setLoading(false)
    }
  }

  const onError = (errors : any)=>{
    Object.values(errors).forEach((errors : any)=>{
    if(errors?.message){
      toast.error(errors?.message)
    }}
    )
  }
  return (
    <div className=' min-h-screen flex justify-center items-center'>
      <form className=' bg-background text-primary w-full max-w-sm p-7 border rounded-2xl flex flex-col gap-5 mx-5' onSubmit={handleSubmit(onSubmit, onError)}>
            <h1 className=' text-4xl font-bold text-center'>Task <span className=' text-indigo-500'>Flow</span></h1>
            <div className=' flex flex-col gap-2'>
                <label htmlFor="name" className=' text-sm text-muted-foreground'>Name</label>
                <input type="text" id='name' placeholder='e.g. Jhon' className=' w-full p-2 rounded-lg border outline-0'  {...register('name')}/>
            </div>
            <div className=' flex flex-col gap-2'>
                <label htmlFor="email" className=' text-sm text-muted-foreground'>Email</label>
                <input type="email" id='email' placeholder='e.g. jhon@gmail.com' className=' w-full p-2 rounded-lg border outline-0'  {...register('email')}/>
                
            </div>
            <div className=' flex flex-col gap-2'>
                <label htmlFor="password" className=' text-sm text-muted-foreground'>Password</label>
                <input type="password" id='password' placeholder='e.g. Jhon123' className=' w-full p-2 rounded-lg border outline-0' {...register('password')}/>
                
            </div>
            <div className=' flex flex-col gap-2'>
                <label htmlFor="confirmPassword" className=' text-sm text-muted-foreground'>Confirm Password</label>
                <input type='password' id="confirmPassword" placeholder='e.g. Jhon123' className=' w-full p-2 rounded-lg border outline-0'  {...register('confirmPassword')}/>
                
            </div>
                <button type='submit' className='rounded-full bg-indigo-500 p-2 font-semibold cursor-pointer'>{loading ? 
                  <div className=' flex justify-center items-center gap-4'><div className=' size-4 rounded-full border-3 animate-spin border-white duration-100 border-l-0 border-b-0'></div> Signup..</div>
                  :"Sign Up"}</button>
            <h4 className=' text-center text-sm'>I have account ? <span className=' text-indigo-500 cursor-pointer hover:underline' onClick={()=>router.push("/auth/login")}>Login</span></h4>
        </form>
    </div>
  )
}

export default Page