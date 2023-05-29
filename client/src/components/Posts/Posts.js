import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import Post from "./PostPreview";
import {getPosts} from "../../actions/posts";
import {useLocation} from "react-router-dom";
import {Grid, Box} from "@chakra-ui/react";

const Posts = ({sortBy}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const location = useLocation();
  const [, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  const posts = useSelector((state) => state.posts);

  if (sortBy === "newest") {
    posts.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  } else if (sortBy === "oldest") {
    posts.sort((a, b) => {
      return new Date(a.createdAt) - new Date(b.createdAt);
    });
  } else if (sortBy === "likes") {
    posts.sort((a, b) => {
      return b.likes.length - a.likes.length;
    });
  } else if (sortBy === "comments") {
    posts.sort((a, b) => {
      return b.comments.length - a.comments.length;
    });
  }

  return (
    <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={6} p={3}>
      {posts.map((post) => (
        <Box key={post._id}>
          <Post post={post} />
        </Box>
      ))}
    </Grid>
  );
};

export default Posts;
