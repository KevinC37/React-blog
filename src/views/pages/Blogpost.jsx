import React, { useCallback } from 'react';
import { useQueries } from 'react-query';

/* Redux imports */
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { postsSelect } from '../../storage/selectors/postsSelector.js';

/* Utils import */
import capitalize from '../../utils/textFormatters/capitalize.js';
import getObjectSize from '../../utils/objectUtils/getObjectSize.js';

/* Local imports */
import NotFound from './404.jsx';

function Blogpost({ localPosts }) {
  const queryPostId = window.location.pathname.match(/\d+/)[0];

  const currentLocalPost = localPosts
    .filter((post) => Number(post.id) === Number(queryPostId))
    .shift();
  const fetchPost = async () =>
    await (
      await fetch(`https://jsonplaceholder.typicode.com/posts/${queryPostId}`)
    ).json();

  const fetchAuthor = async () =>
    await (await fetch(`https://jsonplaceholder.typicode.com/users/`)).json();

  const [post, authors] = useQueries([
    {
      queryKey: 'post',
      queryFn: fetchPost,
      enabled: String(typeof currentLocalPost) === 'undefined',
    },
    {
      queryKey: 'author',
      queryFn: fetchAuthor,
      enabled: String(typeof currentLocalPost) === 'undefined',
    },
  ]);

  const formatText = useCallback((text) => capitalize(text), []);

  return (
    <div>
      {currentLocalPost ? (
        <div>
          <h1>{formatText(currentLocalPost.title)}</h1>
          <p>Author: {currentLocalPost.user.name}</p>
          <p>{formatText(currentLocalPost.body)}</p>
        </div>
      ) : post.isFetching ? (
        <div>Loading...</div>
      ) : getObjectSize(post.data) === 0 ? (
        <NotFound />
      ) : post.data && authors.data ? (
        <div>
          <h1>{formatText(post.data.title)}</h1>
          <p>
            Author:{' '}
            {authors.data.map((author) =>
              author.id === post.data.userId ? author.name : ''
            )}
          </p>
          <p>{formatText(post.data.body)}</p>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  localPosts: postsSelect,
});

export default connect(mapStateToProps)(Blogpost);
