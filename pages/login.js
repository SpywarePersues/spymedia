import react, { useEffect, useEffect as UseEffect, useState as UseState } from "react";
import { app, database } from "../firebaseConfig";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from 'firebase/auth'
import { useRouter as UseRouter } from "next/router";
import ContainerBlock from '../components/ContainerBlock'

function login() {
    const [token, setToken] = UseState("")
    const auth = getAuth()
    const googleProvider = new GoogleAuthProvider()
    const githubProvider = new GithubAuthProvider()
    const router = UseRouter()

    const signUpWithGoogle = () => {
        signInWithPopup(auth, googleProvider)
        .then((response) => {
            sessionStorage.setItem('Token', response.user.accessToken)
            sessionStorage.setItem('Name', response.user.displayName)
            sessionStorage.setItem('PFP', response.user.photoURL)
            sessionStorage.setItem('Email', response.user.email)
            router.reload()
        })
    }

    const signUpWithGithub = () => {
        signInWithPopup(auth, githubProvider)
        .then((response) => {
            sessionStorage.setItem('Token', response.user.accessToken)
            sessionStorage.setItem('Name', response.user.displayName)
            sessionStorage.setItem('PFP', response.user.photoURL)
            sessionStorage.setItem('Email', response.user.email)
            router.reload()
        })
    }

    UseEffect(() => {
        setToken(sessionStorage.getItem('Token'))
    }, [])

    const manageSignOut = () => {
            sessionStorage.clear()
            router.reload()
    }

    return(
        <ContainerBlock title={token ? sessionStorage.getItem('Name') : 'Login'}>
            <style jsx>{`
                .login-container {
                    margin-left: 29rem;
                }
            `}</style>
            {!token ? (
                <div><h1 className='text-5xl text-center pb-5 pt-5 wonderful-text font-semibold'>Login</h1>
                <div class="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-14">
                    <div class="rounded overflow-hidden shadow-lg green-glassmorph">
                        <img class="w-24 block mx-auto my-auto mt-5 mb-2 rounded-full border-solid border-green-600 border-4" src="https://cdn.discordapp.com/attachments/910730837996224584/1028238445778309171/media_discordapp_net-unknown_1.png" alt="Google" />
                        <div class="px-6 py-4">
                            <div class="font-bold text-xl text-center">Google</div>
                        </div>
                            <button className="button px-4 py-3 rounded-md mb-4 mx-auto block" onClick={signUpWithGoogle}>Use Google</button>
                        </div>
                        <div class="rounded overflow-hidden shadow-lg blue-glassmorph">
                            <img class="w-24 block mx-auto my-auto mt-5 mb-2 rounded-full border-solid border-red-800 border-4" src="https://cdn.discordapp.com/attachments/910730837996224584/1028239951688650842/unknown.png" alt="Github" />
                        <div class="px-6 py-4">
                            <div class="font-bold text-xl text-center">Github</div>
                        </div>
                        <button className="button px-4 py-3 rounded-md mb-4 mx-auto block" onClick={signUpWithGithub}>Use Github</button>
                        </div>
                    </div>
                </div>
            ) : (<div className="user-container items-center w-6/12 my-20 mx-auto flex justify-center glassmorph p-10 rounded-lg">
            <div>
                <img className="rounded-full border-solid border-4 border-green-600"  src={sessionStorage.getItem("PFP")} style={{width:"200px"}}/>
            </div>  
            <div className="px-10">
                <p>Howdy, {sessionStorage.getItem("Name")}</p>
                <p className="pt-2">Welcome to SpyMedia.</p>
                <button className="text-center button px-4 py-3 rounded-md mt-4 lg:ml-10" onClick={manageSignOut}>Logout</button>
            </div>
            </div>)}
        </ContainerBlock>
    )
}

export default login