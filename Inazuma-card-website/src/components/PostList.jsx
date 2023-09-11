import React, { useEffect, useState } from 'react';

function PostList() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchPosts = () => {
      fetch("http://localhost:3000/articles", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((responseData) => {
          setArticles(responseData);
        });
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h2>Liste des posts :</h2>
      {articles.map((data) => (
        <div key={data.id}>
          <h2>{data.title}</h2>
          <p>{data.content}</p>
        </div>
      ))}
    </div>
  );
}

export default PostList;


