export interface Post {

    _id:string;
    _createdAt:string;
    title:string;
    author:{
        name:string;
        image:string;
    };
    description:string;
    publishedAt:string;
    comments:[comment];
    mainImage:{
        asset:{
            url:string;
        }
    };
    slug:{
        current:string;
    }
    body:[object]
}

export interface comment {
approved:boolean;
comment:string;
email:string;
name:string;
post:{
    _ref:string;
    _type:string;
}

_createdAt:string;
_id:string;
_rev:string;
_type:string;
_updatedAt:string;

}