import React from 'react';
import _ from 'lodash';
import { useQueries } from 'react-query';
import NotFound from './404';
import '../Styles/body.css';

function Blogpost() {
  const localStoragePosts = JSON.parse(
    window.localStorage.getItem('POSTS_ADDED')
  );
  const currentPost = _.filter(localStoragePosts, [
    'id',
    Number(window.location.pathname.match(/\d+/)[0]),
  ]);
  const dedupedPost = _.head(_.uniqBy(currentPost, 'id'));

  const fetchPost = async () =>
    await (
      await fetch(
        `https://jsonplaceholder.typicode.com/posts${window.location.pathname.replace(
          '/posts',
          ''
        )}`
      )
    ).json();
  const fetchAuthor = async () =>
    await (await fetch(`https://jsonplaceholder.typicode.com/users/`)).json();
  const [post, authors] = useQueries([
    {
      queryKey: 'post',
      queryFn: fetchPost,
      enabled: typeof dedupedPost == 'undefined',
    },
    {
      queryKey: 'author',
      queryFn: fetchAuthor,
      enabled: typeof dedupedPost == 'undefined',
    },
  ]);

  const formatText = (text) => _.capitalize(text);

  return (
    <div>
      {dedupedPost ? (
        <div>
          <h1>{formatText(dedupedPost.title)}</h1>
          <p>Author: {dedupedPost.author}</p>
          <p>{formatText(dedupedPost.body)}</p>
        </div>
      ) : post.isFetching ? (
        <div>Loading...</div>
      ) : _.size(post.data) === 0 ? (
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

export default Blogpost;
