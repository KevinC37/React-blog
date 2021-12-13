import React from "react";
import _ from 'lodash'
import {useQueries} from 'react-query';
import NotFound from "./404";
import "../../styles/main.css";

function Blogpost() {
  
  const fetchPost = async () => await( await fetch(`https://jsonplaceholder.typicode.com/posts${window.location.pathname.replace('/posts','')}`)).json();
  const fetchAuthor = async () => await ( await fetch(`https://jsonplaceholder.typicode.com/users/`)).json();
  const [post, authors ] = useQueries([
    {queryKey: 'post', queryFn: fetchPost},
    {queryKey: 'author', queryFn: fetchAuthor},
  ])

  const formatText = (text) => _.capitalize(text);

  return ( 
    <div>
      {_.size(post.data) === 0  ? <NotFound />
          :  post.data && authors.data
          ? 
          <div>
            <h1>{formatText(post.data.title)}</h1> 
            <p>Author: {authors.data.map(author => author.id === post.data.userId ? author.name : '')}</p>
            <p>{formatText(post.data.body)}</p>
            </div>
          : <div>Loading...</div>
    }


    </div>
  )
}

export default Blogpost;