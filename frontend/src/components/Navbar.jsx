import React from 'react'

const Navbar = () => {
    return (

        <nav className='bg-slate-800 text-white '>
            <div className='mx-auto md:px-40 flex justify-around items-center py-5 h-12'>

                <div className="logo font-bold text-2xl flex justify-center items-center">
                    {/* <span><img className="h-12" src="public\icons\password.png" alt="" srcset="" /></span> */}
                    <span className='text-green-500'>&lt;</span>
                    Password123
                    <span className='text-green-500'>OP/&gt;</span>

                </div>
                {/* <ul className='flex gap-4 text-xl'>
                    <a className="hover:font-bold" href="">Home</a>
                    <a className="hover:font-bold" href="">About</a>
                    <a className="hover:font-bold" href="">Contact Us</a>
                </ul> */}
                <button className='text-white bg-green-700 mx-2 rounded-full flex  justify-between items-center ring-white ring-1'>
                    <img className='invert  w-10 p-1' src="/icons/github.svg" alt="github logo" />
                    <span className='font-bold px-2'>GitHub</span>

                </button>
            </div>


        </nav>
    )
}

export default Navbar
