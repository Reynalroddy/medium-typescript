import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Header from '../components/Header'
import Hero from '../components/Hero'
// import Posts from '../components/Posts'
import {sanityClient,urlFor} from "../sanity"
import {Post} from "../typings";

interface props{
  posts:[Post]
}
const Home = ({posts}:props) => {
  console.log(posts);
  return (
    <div className="">
      <Head>
        <title>Medium next-app</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

     <Header />
     <Hero />
     <section className='py-3 max-w-7xl  mx-auto flex flex-wrap gap-4'>
{
  posts.map((pos)=>{
return <Link href={`/${pos._id}`} key={pos._id}>
<div className='p-4 drop-shadow-lg h-auto w-full md:w-80 rounded-lg border cursor-pointer group overflow-hidden' >
  {
    pos.mainImage &&
    <img src={urlFor(pos.mainImage).url()} alt='img' className='w-full h-64 object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out' />
  }
  <div className='flex justify-between gap-2 p-3 items-center'>
    <div>
    <p className='font-bold text-lg'>{pos.title}</p>
  <p className='text-sm'> {pos.description} by {pos.author.name}</p>
    </div>

  {
    pos.author.image &&
    <img src={urlFor(pos.author.image).url()} alt='img' className='w-8 h-8 rounded-full' />
  } 
   </div>
</div> 

</Link>
  })
}
     </section>
     {/* <Posts posts={posts}/> */}
    </div>
  )
}

export default Home



export const getServerSideProps = async () => {
  const res = `*[_type=="post"]{
    _id,
     title,
     author->{
     name,
     image
   },
   description,
   mainImage,
   body
    }`
    const posts = await sanityClient.fetch(res);
  return {
    props: {
      posts
    },
  };
};