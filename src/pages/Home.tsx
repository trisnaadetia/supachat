import { useState, useEffect } from 'react'
import Logo from '/logo.png'
import { Button } from '../components/ui/button'

function Home() {

  return (
    <div className='p-6 flex flex-col items-center justify-start h-screen bg-cover bg-center bg-no-repeat text-white'
        style={{ backgroundImage: "url('/bg.jpg')" }}>
        <div className='w-full flex justify-center items-center'>
            <img src={Logo} className="w-14 logo" alt="React logo" />
            <h4 className=''>Supachat</h4>
        </div>
        <div className='my-8'>
            <h1 className='mb-4 text-6xl leading-snug'>
                Connect friends <span className='font-bold'>easily & quickly</span>
            </h1>
            <h6 className='text-gray-400'>Our chat app is the perfect way to stay connected with friends and family.</h6>
        </div>
        <Button className='w-full bg-white text-black hover:bg-gray-300 rounded-xl'>Signup with email</Button>
    </div>
  )
}

export default Home
