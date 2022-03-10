import React, { useState, useEffect, useContext } from "react";
import { Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../App";
import useLogin from "../../../services/customHooks/useLogin";

function PostPage() {
  const params = useParams();
  const defaultPostData = { id: 0, title: "", body: "" };
  const [postData, setPostData] = useState(defaultPostData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { state } = useContext(AuthContext);

  function fetchPostData(id, token, signal) {
    fetch("https://jsonplaceholder.typicode.com/posts/" + id, {
      method: "GET",
      signal: signal,
      headers: new Headers({
        Authorization: token,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
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
    const controller = new AbortController();
    fetchPostData(params.id, state.token, controller.signal);
    return () => {
      controller.abort();
    };
  }, []);

  useLogin();

  return (
    <div className="PostsPage">
      {isLoading === false ? (
        error !== null ? (
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
