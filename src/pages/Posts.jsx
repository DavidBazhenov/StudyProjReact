import React, { useEffect, useRef, useState } from 'react';
import {getPagesCount} from '../utils/pages'
import '../styles/App.css';
import PostList from '../components/PostList';
import PostForm from '../components/PostForm';
import PostFilter from '../components/PostFilter';
import MyModal from '../components/MyModal/MyModal';
import MyButton from '../components/UI/button/MyButton';
import { usePosts } from '../hooks/usePosts';
import PostService from '../API/PostService';
import Loader from '../components/UI/Loader/Loader';
import { useFetching } from '../hooks/useFetching';
import MyPagination from '../components/UI/Pagination/MyPagination';
import { useObserver } from '../hooks/useObserver';
import MySelect from '../components/UI/select/MySelect';
function Posts() {
  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState({sort: '', query: ''});
  const [modal, setModal] = useState(false)
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const sortedandSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const lastElement = useRef()


  const [fetchPosts, isPostsLoading, postError] = useFetching(async(limit, page)=>{
    const response = await PostService.getAll(limit, page);
    setPage(page); 
    setPosts([...posts, ...response.data])
    const totalCount = response.headers['x-total-count'];
    setTotalPages(getPagesCount(totalCount, limit))
  }, [])
  useObserver(lastElement, page<totalPages, isPostsLoading, ()=>{
    setPage(page+1);
  })

  useEffect(()=>{
    fetchPosts(limit, page)
  }, [page, limit])
  const createPost = (newPost) =>{
    if(newPost.title === '' || newPost.body ===''){
      window.alert("Заполните все поля!");
    }
    else{
      setPosts([...posts, newPost])
      setModal(false)
    }
    
  } 
  const removePost = (post) => {
    setPosts(posts.filter(p =>p.id !== post.id))
  }
  const changePage = (page)=>{
    setPage(page);
    fetchPosts(limit, page)
  }
  return (
    <div className="App">
        <MyButton style = {{marginTop:"30px"}} onClick={() => setModal(true)}>
          Создать пост
        </MyButton>
        <MyModal visible={modal} setVisibal={setModal}>
          <PostForm create={createPost}/>
        </MyModal>
        <PostFilter
          filter = {filter}
          setfilter = {setFilter}
        />
        <MySelect
          value={limit}
          onChange={value=>setLimit(value)}
          defaultValue="Количество элементов на странице"
          options={[
            {value:5, name:'5'},
            {value:10, name:'10'},
            {value:25, name:'25'},
            {value:-1, name:'все посты'}

          ]}
        />
        {postError &&
          <h1>Произошла ошибка загрузки! ${postError}</h1>
        }
        <PostList remove={removePost} posts={sortedandSearchedPosts} title = "Список постов 1"/>
        <div ref={lastElement} style={{height:20, background: 'red'}}/>
        {isPostsLoading &&
           <div style={{display:"flex", justifyContent:"center", marginTop:"30px"}}><Loader/></div>
        }
        
        
        <MyPagination totalPages={totalPages} page = {page} funck = {changePage}/>
    </div>
  );
}

export default Posts;
