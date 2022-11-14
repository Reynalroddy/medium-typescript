import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <header className='flex items-center justify-between p-3 h-16 max-w-7xl mx-auto'>
       <div className='flex gap-4 items-center'>
<div className='w-44'>
<Link href={'/'}>
    <img  src='https://links.papareact.com/yvf' className='object-fit w-full'/>
    </Link>
</div>
<div className='links hidden md:flex gap-2  '>
<Link href={'/about'}>About</Link>
<Link href={'/contact'}>Contact</Link>
<button className='bg-green-500 text-white rounded-lg px-4'>Follow</button>
</div>
       </div>

       <div className='flex gap-2 text-green-500 items-center'>
       <Link href={'/login'} >Sign in</Link>
<button className='bg-white rounded-lg px-4 border border-green-600'>Get Started</button>
             
        </div>
    </header>
  )
}

export default Header