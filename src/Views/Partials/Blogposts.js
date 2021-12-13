import React from 'react';
import CardTemplate from '../Components/Cards';
import { Box } from '@material-ui/core';
import { useQueries } from 'react-query';

function Blogposts() {
  const loadPosts = async () => await (await fetch(`https://jsonplaceholder.typicode.com/posts/`)).json();
  const loadUsers = async () => await (await fetch(`https://jsonplaceholder.typicode.com/users/`)).json();
  const [posts, users] = useQueries([
    { queryKey: 'posts', queryFn: loadPosts },
    { queryKey: 'users', queryFn: loadUsers }
  ])

  function linkUserToPost() {
    if (posts.status === 'success' && users.status === 'success') {
      return posts.data.forEach(post => {
        users.data.forEach(user => {
          if (user.id === post.userId) post.user = user || '';
        })
      })
    }
    return;
  }
  linkUserToPost();

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
      {(posts.status === 'success' && users.status === 'success')
        ? posts.data.map(e => {
          return <CardTemplate {...e} key={e.id}></CardTemplate>
        })
        : <div>Loading...</div>}
    </Box>

  )
}

export default Blogposts;