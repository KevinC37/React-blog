import React from "react";
import { useEffect, useState, memo } from "react";


function WrappedComponent() {
  const [body, setBody] = useState('');
  const [title, setTitle] = useState('');
  const [user, setUser] = useState('');
  const [userId, setUserId] = useState('');


  function formatText(text) {
    return text[0].toUpperCase() + text.slice(1,);
  }
  function getPostData() {

    async function getPosts() {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts${window.location.pathname}`);
      const result = await response.json();
      setBody(formatText(result.body));
      setTitle(formatText(result.title));
      setUserId(result.userId);
    };
    getPosts();
  }
  useEffect( () => {
      return  getPostData();
    }, []
  );

  async function getUser() {
    if(userId) {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
      const result = await response.json();
      setUser(result.name)

    } else {
      return;
    }

  };

  getUser();


  return ( 
    <div>
    <h1>{title}</h1>
    <h5>Posted by:  {user} </h5>
    <p>{body}</p>
    </div>
  )
}

const Blogpost = memo(WrappedComponent);
export default Blogpost;