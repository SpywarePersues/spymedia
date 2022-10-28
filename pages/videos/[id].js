/* eslint-disable @next/next/no-img-element */
import React, { useEffect as UseEffect, useState as UseState } from 'react'
import ContainerBlock from '../../components/ContainerBlock'
import { useRouter as UseRouter } from 'next/router'
import { database } from '../../firebaseConfig'
import { collection, getDocs, doc, getDoc } from 'firebase/firestore'
import Link from 'next/link'
import { BiLike } from 'react-icons/bi'
import ReactPlayer from 'react-player/lazy'

function productsScreen() {
    const router = UseRouter()
    const { id } = router.query;

    const databaseRef = collection(database, 'Videos')
    const [firedata, setFiredata] = UseState([])
    const [currentData, setCurrentData] = UseState({})

    UseEffect(() => {
        getData()
    }, [])

    const htmlJSX = (
        <div>
            <iframe src={currentData.video} className='mx-10 my-6 w-10/12 h-[35rem] rounded-lg border-4 border-slate-900' allowfullscreen="true"  />
            <h1 className='mx-10 mb-6 text-3xl md:text-5xl'>{currentData.name}</h1>
            <h1 className='mb-4 text-xl w-10/12 mx-10 my-6 text-gray-300'>{currentData.desc}</h1>
            <div className='flex lg:w-2/12 md:w-4/12 w-7/12 mx-10'>
                <img src={currentData.authorPFP} className="w-3/12 h-2/6 mb-8 rounded-full" />
                <h1 className='my-5 text-center md:text-xl px-4 font-semibold'>{currentData.author}</h1>
            </div>
        </div>
    )

    const getData = async () => {
        await getDocs(databaseRef)
        .then((response) => {
            setFiredata(response.docs.map((data) => {
                return {...data.data(), id: data.id}
            }))
        })
    }

    UseEffect(() =>{
        firedata.map((data) => {
            if(data.id == id){
                setCurrentData(data)
            }
        })


    
    }, [firedata])

    console.log(currentData)

    return (
        <ContainerBlock title={currentData.Name}>
            {htmlJSX}
        </ContainerBlock>
    )
}

export default productsScreen