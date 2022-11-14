import { NextApiRequest,NextApiResponse } from "next";

import  sanityClient  from "@sanity/client";
// import { sanityClient } from "../../sanity";
 const config = {
    
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    token:process.env.SANITY_API_TOKEN,
    useCdn: process.env.NODE_ENV === "production",
  };

   const client = sanityClient(config);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const {_id,name,email,comment} = JSON.parse(req.body)
    console.log(_id);
    try {
        await client.create({
_type:'comment',
post:{
_type:'reference',
_ref:_id
},
name,
email,
comment

        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'cant submit comment',error })
    }
    
    
   return  res.status(200).json({ msg: 'comment sent' })
}

// export default function postComment(req,res){
//     req: NextApiRequest,
// //   res: NextApiResponse<Data>
//     res.status(200).json({ name: 'John Doe' })
// }