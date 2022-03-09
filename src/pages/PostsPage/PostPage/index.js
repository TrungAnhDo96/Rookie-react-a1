import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";

function PostPage() {
  const params = useParams();
  const defaultPostData = { id: 0, title: "", body: "" };
  const [postData, setPostData] = useState(defaultPostData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  function FetchPostData(id, isSubscribed, signal) {
    let subscribed = isSubscribed;
    fetch("https://jsonplaceholder.typicode.com/posts/" + id, {
      signal: signal,
    })
      .then((response) => {
        if (subscribed) {
          if (response.ok) {
            return response.json();
          }
          throw response;
        }
      })
      .then((data) => {
        setPostData(data);
      })
      .catch((e) => {
        console.log("Error loading posts", e);
        setError(e);
      })
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    let isSubscribed = true;
    const controller = new AbortController();
    FetchPostData(params.id, isSubscribed, controller.signal);
    return () => {
      isSubscribed = false;
      controller.abort();
    };
  }, [params]);

  return (
    <div className="PostsPage">
      {isLoading === false ? (
        error !== "" ? (
          <p>Error loading posts: {error}</p>
        ) : (
          <div className="postDetail">
            <p>ID: {postData.id}</p>
            <p>Title: {postData.title}</p>
            <p>Body: {postData.body}</p>
          </div>
        )
      ) : (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
    </div>
  );
}

export default PostPage;
