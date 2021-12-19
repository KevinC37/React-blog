import React, { useCallback, useMemo } from 'react';
import { useQueries } from 'react-query';

/* Material UI Imports */
import { Box } from '@material-ui/core';

/* Redux Imports */
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { postsSelect } from '../../storage/selectors/postsSelector.js';

/* Local imports */
import CardTemplate from '../components/partials/cards/Cards.jsx';
// import storageIsFull from '../../utils/LocalStorageSpace.jsx';

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

// function loadLocalStoragePosts(posts, users) {
//   const storageMemory = storageIsFull();

//   if (!storageMemory) {
//     const localPosts = JSON.parse(window.localStorage.getItem('POSTS_ADDED'));
//     if (posts.isSuccess && users.isSuccess) {
//       localPosts.forEach((localPost) =>
//         posts.data.filter((post) => post.id === localPost.id).length > 1
//           ? ''
//           : posts.data.unshift(localPost)
//       );
//     }
//   } else {
//     return alert('Out of local storage memory');
//   }
// }

function Blogposts({ localPosts }) {
  const [posts, users] = useQueries([
    { queryKey: 'posts', queryFn: loadPosts },
    { queryKey: 'users', queryFn: loadUsers },
  ]);

  const allPosts = [];

  //Wait for the posts coming from API to load and concats the incoming data with local storage posts
  const loadAllPosts = useCallback(() => {
    if (posts.isSuccess) {
      //API POSTS
      linkUserToPost(posts, users);
      posts.data.map((e) => allPosts.push(e));

      //Local posts
      localPosts.forEach((e) => allPosts.unshift(e));
    }
  }, [allPosts, localPosts, posts, users]);

  loadAllPosts();

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
      {!!posts.data && !!users.data && !!allPosts.length ? (
        allPosts.map((e) => <CardTemplate {...e} key={e.id}></CardTemplate>)
      ) : (
        <div>Loading...</div>
      )}
    </Box>
  );
}

const mapStateToProps = createStructuredSelector({
  localPosts: postsSelect,
});

export default connect(mapStateToProps)(Blogposts);
