import React, {useState} from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import {useDispatch} from "react-redux";
import {commentPost} from "../actions/posts";
import {useParams} from "react-router-dom";

const CommentForm = () => {
  const {postId} = useParams();
  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    comment: "",
  });

  const handleInputChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(
      commentPost({id: postId, name: user.result.name}, formData.comment)
    );
    setFormData({
      comment: "",
    });
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <VStack spacing={4} align="stretch">
        <FormControl>
          <FormLabel>Comment</FormLabel>
          <Textarea
            name="comment"
            value={formData.comment}
            onChange={handleInputChange}
            required
          />
        </FormControl>

        <Button type="submit" colorScheme="blue">
          Submit
        </Button>
      </VStack>
    </form>
  );
};

export default CommentForm;
