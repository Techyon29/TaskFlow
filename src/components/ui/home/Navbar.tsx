import React from 'react'

const Navbar = () => {
  return (
    <div className='py-5 mx-12 md:mx-22'>
        <nav className=' flex items-center justify-between'>
            <h1 className=' text-white text-3xl font-semibold'>Task<span className=' text-indigo-500'>Flow</span></h1>
            <div className=' flex gap-4 font-semibold'>
                <button className='bg-indigo-400 hover:bg-indigo-500 text-white px-4 py-1.5 rounded-full cursor-pointer'>Login</button>
                <button className=' border border-indigo-500 rounded-full py-1.5 px-4 text-indigo-500 cursor-pointer'>SignUp</button>
            </div>
        </nav>
    </div>
  )
}

export default Navbar