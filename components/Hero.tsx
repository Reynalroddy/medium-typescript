import React from 'react'

const Hero = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 items-center max-w-7xl mx-auto p-3 bg-yellow-400 h-96'>
        <div>
<h4 className='text-5xl'>
    Medium is a place to write, read, and connect.
</h4>

<p className='text-md mt-3'>its easy and free to post your thinking on any topic and connect with millions of readers.</p>

        </div>


<div className='text-center'>
<h1 className='hidden md:block text-black font-extrabold' style={{fontSize:'14rem'}}>M</h1>

</div>
    </div>
  )
}

export default Hero