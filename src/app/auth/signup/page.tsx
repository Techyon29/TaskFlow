'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
const Page = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter();
  const handleSubmit = (e : any)=>{
    e.preventDefault();
    setLoading(true)
    try{
      const formData = {
      name,email,password
    }
    console.log(formData)
    }catch(error){
      throw new Error(error instanceof Error ? error.message : "Internal Error")
    } finally{
      setLoading(false)
    }
    
  }
  return (
    <div className=' min-h-screen flex justify-center items-center'>
      <form className=' bg-background text-primary w-full max-w-sm p-7 border rounded-2xl flex flex-col gap-5 mx-5' onSubmit={(e)=>handleSubmit(e)}>
            <h1 className=' text-4xl font-bold text-center'>Task <span className=' text-indigo-500'>Flow</span></h1>
            <div className=' flex flex-col gap-2'>
                <label htmlFor="name" className=' text-sm text-muted-foreground'>Name</label>
                <input type="email" id='name' placeholder='e.g. Jhon' className=' w-full p-2 rounded-lg border outline-0' required onChange={(e)=>setName(e.target.value)}/>
            </div>
            <div className=' flex flex-col gap-2'>
                <label htmlFor="email" className=' text-sm text-muted-foreground'>Email</label>
                <input type="email" id='email' placeholder='e.g. jhon@gmail.com' className=' w-full p-2 rounded-lg border outline-0' required onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div className=' flex flex-col gap-2'>
                <label htmlFor="password" className=' text-sm text-muted-foreground'>Password</label>
                <input type="password" id='password' placeholder='e.g. Jhon123' className=' w-full p-2 rounded-lg border outline-0' required onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <div className=' flex flex-col gap-2'>
                <label htmlFor="confirmPassword" className=' text-sm text-muted-foreground'>Confirm Password</label>
                <input type='password' id="confirmPassword" placeholder='e.g. Jhon123' className=' w-full p-2 rounded-lg border outline-0' required onChange={(e)=>setConfirmPassword(e.target.value)}/>
            </div>
                <button type='submit' className=' rounded-full bg-indigo-500 p-2 font-semibold cursor-pointer'>Sign Up</button>
            <h4 className=' text-center text-sm'>I have account ? <span className=' text-indigo-500 cursor-pointer hover:underline' onClick={()=>router.push("/auth/login")}>Login</span></h4>
        </form>
    </div>
  )
}

export default Page