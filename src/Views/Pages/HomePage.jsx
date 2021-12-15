import React from 'react';
import { useQueries } from 'react-query';
import _ from 'lodash';

/* Material UI Imports */
import { Box } from '@material-ui/core';

/* Local imports */
import CardTemplate from '../Components/Partials/Cards/Cards.jsx';
import storageIsFull from '../../utils/LocalStorageSpace.jsx';

const loadPosts = async () =>
  await (await fetch(`https://jsonplaceholder.typicode.com/posts/`)).json();
const loadUsers = async () =>
  await (await fetch(`https://jsonplaceholder.typicode.com/users/`)).json();

function linkUserToPost(posts, users) {
  if (posts.isSuccess && users.isSuccess) {
    return posts.data.forEach((post) => {
      users.data.forEach((user) => {
        if (user.id === post.userId) post.user = user || '';
      });
    });
  } else {
    return;
  }
}

function loadLocalStoragePosts(posts, users) {
  const storageMemory = storageIsFull();

  if (!storageMemory) {
    const localPosts = JSON.parse(window.localStorage.getItem('POSTS_ADDED'));
    if (posts.isSuccess && users.isSuccess) {
      localPosts.forEach((localPost) =>
        posts.data.filter((post) => post.id === localPost.id).length > 1
          ? ''
          : posts.data.unshift(localPost)
      );
    }
  } else {
    return alert('Out of local storage memory');
  }
}

export default function Blogposts() {
  const [posts, users] = useQueries([
    { queryKey: 'posts', queryFn: loadPosts },
    { queryKey: 'users', queryFn: loadUsers },
  ]);

  linkUserToPost(posts, users);
  loadLocalStoragePosts(posts, users);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        p: 1,
        m: 1,
        bgcolor: 'background.paper',
        height: 124,
        flexWrap: 'wrap',
      }}
    >
      {posts.isSuccess && users.isSuccess ? (
        _.uniqBy(posts.data, 'id').map((e) => {
          return <CardTemplate {...e} key={e.id}></CardTemplate>;
        })
      ) : (
        <div>Loading...</div>
      )}
    </Box>
  );
}
