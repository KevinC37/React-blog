import React, { useCallback, useMemo, memo } from 'react';
import { useQueries } from 'react-query';

/* Material UI Imports */
import { Box } from '@material-ui/core';

/* Redux Imports */
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { postsSelect } from '../../storage/selectors/postsSelector.js';

/* Local imports */
import CardTemplate from '../components/partials/cards/Cards.jsx';

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

function MemoizedBlogposts({ localPosts }) {
  const [posts, users] = useQueries([
    { queryKey: 'posts', queryFn: loadPosts },
    { queryKey: 'users', queryFn: loadUsers },
  ]);

  //Wait for the posts coming from API to load and concats the incoming data with local storage posts
  const loadAllPosts = useCallback(() => {
    const mergedPosts = [];

    if (posts.isSuccess) {
      //API POSTS
      linkUserToPost(posts, users);
      posts.data.map((e) => mergedPosts.push(e));

      //Local posts
      if (localPosts.length) {
        localPosts.forEach((e) => mergedPosts.unshift(e));
      }
    }

    return mergedPosts;
  }, [users, posts, localPosts]);

  const allPosts = useMemo(() => loadAllPosts(), [loadAllPosts]);

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
        allPosts.map((e) => <CardTemplate key={e.id} {...e} />)
      ) : (
        <div>Loading...</div>
      )}
    </Box>
  );
}

const Blogposts = memo(MemoizedBlogposts);
const mapStateToProps = createStructuredSelector({
  localPosts: postsSelect,
});

export default connect(mapStateToProps)(Blogposts);
