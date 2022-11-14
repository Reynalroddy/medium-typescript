import { GetStaticProps } from 'next';
import React,{useRef} from 'react'
import {sanityClient,urlFor} from "../sanity"
import {Post} from "../typings";
import Header from "../components/Header"
import {useState} from "react";
// interface props{
//   posts:[Post]
// }
interface props{
  post:Post
}

// interface formInp{
//   _id:string,
//   name:string,
//   email:string,
//   comment:string
// }

const singlePost = ({post}:props) => {
  const [name,setName] = useState('')
  const [comment,setComment] = useState('')
  const [email,setEmail] = useState('')
  const [id,setId] = useState(post._id);
  // const postId = useRef(null)
  console.log(post)

  const formHandler=async (e:any)=>{
    e.preventDefault();
    console.log(id);
const pos = {name,comment,email,_id:id}
    await fetch('/api/postComment',{
  method:'POST',
  body:JSON.stringify(pos)
}).then((data)=>{
console.log(data)
}).catch((err)=>{
console.log(err);
})
  }
  return (
    <>
    <Header/>
     <div className='max-w-7xl mx-auto p-4 '>
<img  className='w-full object-cover h-64' src={urlFor(post.mainImage).url()!}/>
   
   <h1 className=' text-3xl  my-2'>{post.title}</h1>
   <h3 className='text-grey-500 text-xl mb-2'>{post.title}</h3>
<div className='flex gap-4'>

<img src={urlFor(post.author.image).url()} alt='img' className='w-8 h-8 rounded-full' />
<span>Blog post by {post.author.name}-{ new Date (post.publishedAt).toLocaleString()}</span>
</div>
<form className="mt-8 space-y-6 w-full lg:w-1/2 mx-auto" onSubmit={formHandler}>
           <h3 className='font-bold text-xl'>Add coment to post.</h3>
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full focus:ring  appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm my-3"
                  placeholder="Email address"
                  onChange={(e)=>setEmail(e.target.value)}
                />
                 <input
                  type="hidden"
                  // onChange={()=>setId()}
                  name="id"
                  value={id}
                  // ref={postId}
                />
              </div>
              <div>
                <label htmlFor="name" className="sr-only">
                  name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  // autoComplete="current-password"
                  required
                  className="relative block w-full focus:ring  appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Name"
                  onChange={(e)=>setName(e.target.value)}
                />
              </div>
            
              <div className="my-5">
                      <textarea
                        id="about"
                        name="about"
                        rows={3}
                        className="mt-1 block w-full focus:ring rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="comment"
                        defaultValue={''}
                        onChange={(e)=>setComment(e.target.value)}
                      />
                    </div>

            </div>

         

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                
               Share a Comment
              </button>

              <>
<h3>Comments</h3>
{post.comments.map((comm,i)=>{
  return <h5 className='text-red-500 font-bold' key={i}>{comm.name} - {comm.comment} commented on { new Date (comm._createdAt).toLocaleString()}</h5>
})}

            </>
            </div>


          </form>
    </div>
    </>
  )
}

export default singlePost;

export const getStaticPaths = async () => {

  const res = `*[_type=="post"]{
    _id,
     title,
     author->{
     name,
     image
   },
   description,
   mainImage,
   body,
   _createdAt,
   publishedAt
    }`

    const posts = await sanityClient.fetch(res);
  // const res = await fetch(
  //   "https://api.coinstats.app/public/v1/coins?skip=0&limit=50"
  // );
  // const data = await res.json();

  const paths = posts.map((pos:Post) => {
    return {
      params: {
        id: pos._id,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps:GetStaticProps = async ({ params }) => {
  
  const res = `*[_type=="post" && _id==$id][0]{
    _id,
     title,
     author->{
     name,
     image
   },
   'comments':*[
    _type == 'comment' &&
    post._ref==^._id 
  ],
   mainImage,
   body,
   _createdAt,
   publishedAt
    }`
    const posts = await sanityClient.fetch(res,{
      id:params?.id,
    });

if(!posts){
return {
  notFound:true
}
}


  return {
    props: {
      post: posts,
    },
    revalidate:60
  };
};