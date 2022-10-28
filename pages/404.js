import Link from 'next/link'
import React from 'react'
import ContainerBlock from '../components/ContainerBlock'

function error() {
    return (
        <ContainerBlock title="404 Not Found.">
            <h1 className='text-center mt-20 text-7xl'>Error 404 Page Not Found.</h1>
            <div className="text-center mb-20 mt-8 text-4xl text-blue-600 underline"><Link href="/">← Go Back</Link></div>
        </ContainerBlock>
    )
}

export default error