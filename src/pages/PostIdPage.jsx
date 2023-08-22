import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetching } from "../hooks/useFetching";
import PostService from "../API/PostService";
import Loader from "../components/UI/Loader/Loader";
const PostIdPage = () => {
    const params = useParams()
    const [post, setPost] = useState({});
    const [comms, setComms] = useState([]);
    const [fetchPostbyId, isLoading, error] = useFetching(async(id) => {
        const response = await PostService.getById(id)
        setPost(response.data);
    })
    const [fetchComments, isComLoading, comError] = useFetching(async(id) => {
        const response = await PostService.getComsById(id)
        setComms(response.data);
    })
    useEffect(()=>{
        fetchPostbyId(params.id)
        fetchComments(params.id)
    }, [])
    return (
        <div>
            <h1>
                Вы открыли страницу поста c ID = {params.id}
            </h1>
            {
                isLoading
                ?<Loader/>
                :<div>{post.id} {post.title}</div>
            }
            <h1>
                Комментарии:
            </h1>
            {isComLoading
                ? <Loader/>
                : <div>
                    {comms.map(comm =>
                        <div key={comm.id} style={{marginTop: 15}}>
                            <h5>{comm.email}</h5>
                            <div>{comm.body}</div>
                        </div>   
                    )}
                </div>
            }
        </div>
    );
}

export default PostIdPage;