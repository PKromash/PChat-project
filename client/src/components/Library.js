import React, {useState, useEffect} from "react";
import Posts from "./Posts/Posts";
import {getPosts} from "../actions/posts";
import {useDispatch} from "react-redux";
import {Flex, Select, Text} from "@chakra-ui/react";

const Library = () => {
  const dispatch = useDispatch();

  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch, sortBy]);

  const handleChange = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <>
      <Flex align="center" mt={2} ml={2}>
        <Text fontSize="3xl" fontWeight="bold" ml={3} mr={3}>
          Sort By:
        </Text>

        <Select w="130px" onChange={handleChange}>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="likes">Likes</option>
          <option value="comments">Comments</option>
        </Select>
      </Flex>

      <Posts sortBy={sortBy} />
    </>
  );
};

export default Library;
