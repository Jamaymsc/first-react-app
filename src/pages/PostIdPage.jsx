import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFetching } from "../hooks/useFetching";
import { useState } from "react";
import PostService from "../API/PostService";
import Loader from "../components/UI/Loader/Loader";

const PostIdPage = () => {
    const params = useParams()
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [fetchPostById, isLoading, error] = useFetching(async (id) => {
        const response = await PostService.getById(id)   
        setPost(response.data);
    })
    const [fetchComments, isCommentLoading, commentError] = useFetching(async (id) => {
        const response = await PostService.getCommentsByPostID(id)   
        setComments(response.data);
    })

    useEffect(() => {
         fetchPostById(params.id)
         fetchComments(params.id)
    }, [params])
    return (
        <div>
         <h1>Вы открыли страницу поста с ID = {params.id}</h1>
         {isLoading
         ? <Loader/>
         : <div>{post.id}. {post.title}</div>
         }
         <h1>Комментарии</h1>
         {isCommentLoading
           ? <Loader/>
           : <div>
            {comments.map( comm =>
               <div key={comm.id} style={{marginTop: 15}}>
                <h5>{comm.email}</h5>
                <div>{comm.body}</div>
               </div>
           )} 
             </div>
         }
        </div>
    );
};

export default PostIdPage;