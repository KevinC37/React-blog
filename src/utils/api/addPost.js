export const addPostViaAPI = async (post) => await fetch(`https://jsonplaceholder.typicode.com/posts/`, {
  method: 'POST',
  body: JSON.stringify(post),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  }
}
)


export const setPostIds = async (setPostId, setUserId) => {
  const urls = [
    'https://jsonplaceholder.typicode.com/posts',
    'https://jsonplaceholder.typicode.com/users/',
  ];
  const requests = urls.map((url) => fetch(url, { method: 'GET' }));
  let result = [];

  await Promise.all(requests)
    .then((responses) => {
      const errors = responses.filter((response) => !response.ok);

      if (errors.length > 0) {
        throw errors.map((response) => Error(response.statusText));
      }

      const json = responses.map((response) => response.json());
      return Promise.all(json);
    })
    .then((data) =>
      data.forEach((datum, index) =>
        index === 0 ? setPostId(Date.now()) : setUserId(datum.length + 1)
      )
    )
    .catch((errors) => {
      errors.forEach((error) => console.error(error));
    });

  return result;
};