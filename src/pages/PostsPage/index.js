import React, { useState, useEffect, useContext } from "react";
import { Table, Spinner, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../../App";
import "./index.css";

function PostsPage() {
  const defaultPostsData = [{ id: 0, title: "" }];
  const [postsData, setPostsData] = useState(defaultPostsData);
  const [ogData, setOgData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const { state } = useContext(AuthContext);

  function fetchAllData(token, signal) {
    fetch("https://jsonplaceholder.typicode.com/posts", {
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
        setPostsData(data);
        setOgData(data);
      })
      .catch((e) => {
        console.log("Error loading posts", e);
        setError(e);
      })
      .finally(() => setIsLoading(false));
  }

  function removePost(id) {
    for (var i = 0; i < postsData.length; i++) {
      if (postsData[i].id === id) {
        postsData.splice(i, 1);
      }
    }
    setPostsData([...postsData]);
  }

  function handleSearch(event) {
    const searchKey = event.target.value;
    const foundPosts = ogData.filter((post) => post.title.includes(searchKey));
    setPostsData([...foundPosts]);
  }

  useEffect(() => {
    let isSubscribed = true;
    const controller = new AbortController();
    if (ogData.length === 0) {
      fetchAllData(state.token !== null ? "" : state.token, controller.signal);
    }
    return () => {
      isSubscribed = false;
      controller.abort();
    };
  }, [postsData]);

  return (
    <div className="PostsPage">
      {isLoading === false ? (
        error !== "" ? (
          <p>Error loading posts: {error}</p>
        ) : (
          <div className="postTable">
            <div className="searchBar">
              <input
                type="text"
                placeholder="Search by title"
                onChange={handleSearch}
              />
            </div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {postsData.map((post) => {
                  return (
                    <tr key={"Post" + post.id}>
                      <td>{post.id}</td>
                      <td>{post.title}</td>
                      <td>
                        <Link to={"" + post.id}>View Details</Link>
                        <Button
                          className="removeButton"
                          variant="danger"
                          size="sm"
                          onClick={() => removePost(post.id)}
                        >
                          Remove
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
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

export default PostsPage;
