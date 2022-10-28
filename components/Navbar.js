import Link from "next/link"
import React, { useEffect as UseEffect, useState as UseState } from 'react'
import { BsCart4 } from 'react-icons/bs'
import { BiSearchAlt2 } from 'react-icons/bi'

export default function Navbar(){
    const [token, setToken] = UseState("")

    UseEffect(() => {
        setToken(sessionStorage.getItem('Token'))
    }, [])
    return(
        <div className="py-5">
            <div className="lg:flex justify-between w-11/12 text-center font-Koho cursor-pointer lg:w-9/12 mx-auto py-5 text-gray-200 rounded-md lg:px-36">
                <ul>
                    <Link href={{pathname: '/'}}><li className="hover:text-gray-100 font-Koho text-3xl">SpyMedia</li></Link>
                </ul>
                <ul className="lg:flex justify-between w-5/12 mx-auto mt-2">
                    <Link href={{pathname: '/feedback'}}><li className="hover:text-gray-400 transition-all duration-300">Feedback</li></Link>
                    <Link href={{pathname: '/upload'}}><li className="hover:text-gray-400 transition-all duration-300">Upload</li></Link>
                    {token ? (<Link href={{pathname: '/login'}}><li className="hover:text-gray-400 transition-all duration-300">{sessionStorage.getItem('Name')}</li></Link>) : (<Link href={{pathname: '/login'}}><li className="hover:text-gray-400 transition-all duration-300">Login</li></Link>)}
                </ul>
            </div>
        </div>
    )
}