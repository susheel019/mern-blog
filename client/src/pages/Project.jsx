import React from 'react'
import CallToAction from '../components/CallToAction'

function Project() {
  return (
    <>
    <div className='main-h-screen max-w-2xl mx-auto flex justify-center items-center gap-6 p-3'>
        <h1 className='text-3xl font-semibold '>Projects</h1>
        <p>
          Build fun and engaging projects while learning HTML , CSS and JAVASCRIPT
        </p>
        <CallToAction></CallToAction>
    </div>

    </>
  )
}

export default Project