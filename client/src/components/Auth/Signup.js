import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Avatar,
} from "@chakra-ui/react";
import {signup} from "../../actions/auth";
import FileBase64 from "react-file-base64";

const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatar: "",
  });

  const handleInputChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signup(formData)).then(() => {
      const user = JSON.parse(localStorage.getItem("profile"));
      if (user) {
        navigate("/");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={4} align="stretch" p={5}>
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Confirm Password</FormLabel>
          <Input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Avatar</FormLabel>
          <FileBase64
            multiple={false}
            onDone={(file) => {
              setFormData({...formData, avatar: file.base64});
            }}
          />
          <Avatar size="sm" name={formData.name} src={formData.avatar} />
        </FormControl>

        <Button type="submit" colorScheme="blue">
          Sign Up
        </Button>
      </VStack>
    </form>
  );
};

export default SignupForm;
