import ContainerBlock from '../components/ContainerBlock'
import { database } from '../firebaseConfig'
import { collection, getDocs } from 'firebase/firestore'
import React, { useEffect as UseEffect, useState as UseState } from 'react'
import {BiLike} from 'react-icons/bi'

export default function Home() {
    const databaseRef = collection(database, 'Videos')
    const [firedata, setFiredata] = UseState([])

    UseEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        await getDocs(databaseRef)
        .then((response) => {
            setFiredata(response.docs.map((data) => {
                return {...data.data(), id: data.id}
            }))
        })
    }
    return (
        <ContainerBlock title="Home">
            <div className='my-10 p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'>
                {firedata.map((data) => {
                    return(
                        <a href={`/videos/${data.id}`} key={data.id} className="glassmorph md:mx-10 mx-4 w-[18rem] lg:w-[18rem] xl:w-[21rem] rounded-lg hover:scale-105 transition-scale duration-300 my-6">
                            <img src={data.thumbnail} className="w-[46rem] rounded-md" alt='' />
                            <h1 className='md:text-3xl text-2xl my-4 text-center font-bold'>{data.name}</h1>
                            <div className='flex lg:w-7/12 md:w-8/12 w-9/12 mx-auto'>
                            <img src={data.authorPFP} className="w-2/12 h-2/6 mt-3 mb-8 rounded-full" />
                            <h1 className='my-4 text-center md:text-xl px-3 font-semibold'>{data.author}</h1>
                            </div>
                        </a>
                    )
                })}
            </div>
            </ContainerBlock>
    )
}
