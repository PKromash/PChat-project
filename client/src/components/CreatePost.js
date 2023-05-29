import React, {useState} from "react";
import FileBase64 from "react-file-base64";
import {useParams} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {updatePost, createPost} from "../actions/posts";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
} from "@chakra-ui/react";

const CreatePost = () => {
  const user = JSON.parse(localStorage.getItem("profile"));

  const {id} = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    image: "",
  });

  const handleInputChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (id) {
      dispatch(updatePost(id, formData));
    } else {
      dispatch(
        createPost({
          ...formData,
          creator: JSON.parse(localStorage.getItem("profile")).result._id,
          name: user.result.name,
          avatar: user.result.avatar,
        })
      );
    }
    setFormData({
      title: "",
      message: "",
      image: "",
    });
    navigate("/");
  };

  return (
    <VStack
      as="form"
      onSubmit={handleFormSubmit}
      spacing={4}
      align="stretch"
      p={5}>
      <FormControl>
        <FormLabel>Title</FormLabel>
        <Input
          required
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          size="lg"
        />
      </FormControl>

      <FormControl>
        <FormLabel>Message</FormLabel>
        <Textarea
          required
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          size="lg"
          minHeight="100px"
        />
      </FormControl>

      <FormControl>
        <FormLabel>Image</FormLabel>
        <FileBase64
          multiple={false}
          onDone={(file) => {
            setFormData({...formData, image: file.base64});
          }}
        />
      </FormControl>

      <Button type="submit" colorScheme="blue" size="lg">
        {id ? "Update" : "Create"} Post
      </Button>
    </VStack>
  );
};

export default CreatePost;
