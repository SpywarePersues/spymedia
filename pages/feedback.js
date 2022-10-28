import react, { useEffect, useEffect as UseEffect, useState as UseState } from "react";
import { app, database } from "../firebaseConfig";
import ContainerBlock from '../components/ContainerBlock'
import { RoughNotation } from "react-rough-notation";
import { addDoc, collection, onSnapshot, orderBy, query, Timestamp } from "firebase/firestore";
import Link from "next/link";

function feedback() {
    const colors = ["#f59e0b", "#10b981", "#8a2be2", "#3b82f6"];

    const [messageSent, setMessageSent] = UseState(false)

    const [reviews, setReviews] = UseState([])

    const [mounted, setMounted] = UseState(false)

    UseEffect(() => {
        const collectionRef = collection(database, "reviews")

        const q = query(collectionRef, orderBy("message", "desc"));

        const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
            setReviews(QuerySnapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
            setMounted(true)
        });
        
        return unsubscribe;
    }, [])

    const [name, setUserName] = UseState('')

    const [pfp, setPfp] = UseState("")

    UseEffect(() => {
        setUserName(sessionStorage.getItem("Name"))
        setPfp(sessionStorage.getItem("PFP"))
        setMessageSent(localStorage.getItem('sent'))
    }, [mounted])

    const [message, setmessage] = UseState('')
    
    const submitHandler = async () => {
        const docRef = await addDoc(collection(database, "reviews"), {
            name,
            message,
            pfp,
            timestamp: Timestamp.fromDate(new Date()),
        });
        setMessageSent(true)
        console.log("Document written with ID: ", docRef.id);

        localStorage.setItem("sent", true)
    }
    return (
        <ContainerBlock title="Feedbacks">
            {mounted ?
            <div className="w-9/12 mx-auto">
                <style jsx>
                    {`
                        label {
                            display: block;
                            margin-bottom: .2em;
                            padding: 0.7em;
                        }

                        .contact {
                            font-size: 44px;
                            margin-bottom: .9em;
                            margin:0 auto;
                        }
                        h1 {
                            font-size: 44px;
                            margin-bottom: .9em;
                            margin:0 auto;
                        }
                        form {
                            margin:0 auto;
                            margin-bottom: 2em;
                        }
                        input {
                            width: 50%;
                            height: 2.5em;
                            border-radius: 7px;
                            border: 5px solid transparent;
                            padding-left: 8px;
                            padding-top: 8px;
                            padding-bottom: 8px;
                            padding-right: 8px
                        }
                        textarea {
                            width: 50%;
                            height: 6em;
                            margin-bottom: 1.2em;
                            border-radius: 7px;
                            padding-left: 8px;
                            padding-top: 8px;
                            padding-bottom: 8px;
                            padding-right: 8px;
                        }
                        u {
                            cursor: pointer;
                        }
                    `}
                </style>

            <RoughNotation show={true} type="circle" color={colors[0]} className="">
                <p className="text-center w-fit mx-auto font-Indie text-5xl p-5 mb-10 font-bold">FEEDBACKS!</p>
            </RoughNotation>
                <p className="w-11/12 pb-8 font-sans lg:w-12/12">Leave a comment below! It could literally be anything - a joke, a quote or even a cool fact. We just love to hear you!</p>
                {localStorage.getItem("sent") ?
                    <div className="border-2 py-1 px-3 border-cyan-600 w-fit bg-blue-800 bg-opacity-20">Thank you for your kind words!</div>:
                    name ?
                    <div>
                        <p className="text-center">
                            <label htmlFor="message">Message</label>
                            <textarea className="glassmorph outline-none p-4 text-gray-300" name="message" value={message} onChange={(e) => setmessage(e.target.value)} />
                        </p>
                        <p className="text-center">
                            <button type="submit" onClick={submitHandler} className="border-2 py-1 px-3 cursor-pointer border-cyan-600 w-fit hover:bg-blue-800 hover:bg-opacity-20">
                                Submit
                            </button>
                        </p>
                    </div>:
                        <Link href="/login">
                            <div>
                                <div className="border-2 py-1 px-3 cursor-pointer border-cyan-600 w-fit hover:bg-blue-800 hover:bg-opacity-20">
                                    Login to comment
                                </div>
                                <p className="font-extralight py-2 ">Your information is only used to display your name to avoid impersonation.</p>
                            </div>
                        </Link>
                }
                <br></br>
                <br></br>
                <div className="mb-10">
                {
                    reviews.map(review => <div key={review.id} className="py-5 flex border-zinc-600 border-b-2 lg:w-2/3 dark:border-gray-500"><div><img src={review.pfp} className="px-2 rounded-xl hidden w-24 lg:block"/></div><div className="pl-10 align-middle"><p className="text-xl">{review.message}</p><p className="text-l pt-2 font-light text-gray-600 dark:text-gray-300">- {review.name}</p></div></div>)
                }
                </div>
            </div>:
            <div>
                <div>
                    <div style={{borderTopColor:"transparent"}}
                        className="mx-auto my-20 w-16 h-16 border-8 border-cyan-300 border-dotted rounded-full animate-spin duration-1000"></div>
                </div>
            </div>
            } 
        </ContainerBlock>
    )
}

export default feedback