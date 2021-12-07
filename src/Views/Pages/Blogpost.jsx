import React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";



function Blogpost() {
  const [body, setBody] = useState();
  const [title, setTitle] = useState();
  const [user, setUser] = useState();
  const [userId, setUserId] = useState();


  useEffect( () => {
      async function getPosts() {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts${window.location.pathname}`);
        const result = await response.json();
        setBody(formatText(result.body));
        setTitle(formatText(result.title))
        setUserId(result.userId)
      }

      async function getUser() {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        const result = await response.json();
        setUser(result.name)
      }
      getPosts();
      getUser();
    }, []
  );

  
  function formatText(text) {
    return text[0].toUpperCase() + text.slice(1,);
  }


  return ( 
    <div>
    <h1>{title}</h1>
    <h5>Posted by:  {user} </h5>
    <p>{body}</p>
    </div>
  )
}

export default Blogpost;