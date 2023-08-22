import React from "react";
import MyButton from "./UI/button/MyButton";
import {
    useNavigate 
  } from "react-router-dom";
const PostItem = function(props){
    const navigate = useNavigate ()
    return(
        <div className='post'>
            <div className='post__content'>
                <strong>{props.number}. {props.post.title}</strong>
                <div>
                    {props.post.body}
                </div>
            </div>
            <div className='post__buttons'>
                <MyButton onClick ={() => props.remove(props.post)}>Удалить</MyButton>
                <MyButton onClick ={() => navigate(`/posts/${props.post.id}`)}> Открыть пост</MyButton>
            </div>
        </div>
    )
}
export default PostItem;