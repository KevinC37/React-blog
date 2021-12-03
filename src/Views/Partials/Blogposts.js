import React, { useEffect, useState } from 'react';
import Cards from "../Components/Cards"
import { Box } from '@material-ui/core';


function Blogposts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function loadPosts() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/');
        const posts = await response.json();
        setPosts(posts);
      } catch (e) {
        console.log(e);
        return
      }
    };

    loadPosts();
  }, []);


  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        p: 1,
        m: 1,
        bgcolor: 'background.paper',
        height: 124,
        flexWrap: "wrap"
      }}
    >

      {//loading each card available from the API
        posts.map(e => (<Cards {...e} key={e.id}></Cards>))
      }
    </Box>
  )
}
export default Blogposts;