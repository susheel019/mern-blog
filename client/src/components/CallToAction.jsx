import { Button } from 'flowbite-react'
import React from 'react'

function CallToAction() {
  return (
    <>
    <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
        <div className='flex-1 justify-center flex flex-col '> 
            <h2 className='text-2xl'>Want to learn more about javascript</h2>
            <p className='text-gray-500 my-2'>Checkout these resources for learning more about javascript </p>
            <Button className='rounded-tl-xl rounded-bl-none' color='blue'><a href="https://javascript.info/" target='_blank' rel='noopener noreferror'>Learn More</a></Button>
        </div>
        <div className='flex-2 m-2'>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5_xpul_qIjiuZvEO5RbvKIWYe-hS1GHdK2Z5vM8Yafw&s"  />
        </div>
    </div>
    </>
  )
}

export default CallToAction