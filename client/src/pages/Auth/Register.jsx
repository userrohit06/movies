import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import { setCredentials } from '../../redux/features/auth/authSlice'
import { useSignUpMutation } from '../../redux/api/usersApi'

const Register = () => {
    console.log(useSignUpMutation());

    return (
        // main container
        <div className='pl-[10rem] flex flex-wrap'>
            {/* form container */}
            <div className='mr-[4rem] mt-[5rem]'>
                {/* heading */}
                <h1 className="text-2xl font-semibold mb-4">Register</h1>

                {/* form */}
                <form className="container w-[40rem]">
                    {/* name field */}
                    <div className="my-[2rem]">
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-white"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            id='name'
                            placeholder='Enter Name'
                            className="mt-1 p-2 border rounded w-full"
                        />
                    </div>

                    {/* email field */}
                    <div className="my-[2rem]">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-white"
                        >
                            Email Address
                        </label>
                        <input
                            type="email"
                            id='email'
                            placeholder='Enter Email'
                            className="mt-1 p-2 border rounded w-full"
                        />
                    </div>

                    {/* password field */}
                    <div className="my-[2rem]">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-white"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id='password'
                            placeholder='Enter Password'
                            className="mt-1 p-2 border rounded w-full"
                        />
                    </div>

                    {/* confirm password field */}
                    <div className="my-[2rem]">
                        <label
                            htmlFor="confirmPassowrd"
                            className="block text-sm font-medium text-white"
                        >
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id='confirmPassword'
                            placeholder='Confirm Password'
                            className="mt-1 p-2 border rounded w-full"
                        />
                    </div>

                    {/* register button */}
                    <button
                        type='submit'
                        className='bg-teal-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]'
                    >
                        Register
                    </button>
                </form>

                {/* redirection link */}
                <div>
                    <p>
                        Already have an account?{" "}
                        <Link
                            className='text-teal-500 hover:underline'
                        >
                            Login
                        </Link>
                    </p>
                </div>
            </div>

            {/* image */}
            <img
                src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="image"
                className='h-[65rem] w-[55%] xl:block md:hidden sm:hidden rounded-lg'
            />
        </div>
    )
}

export default Register