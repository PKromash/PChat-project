import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {FormControl, FormLabel, Input, Button, VStack} from "@chakra-ui/react";
import {signin} from "../../actions/auth";

const SigninForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signin(formData)).then(() => {
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

        <Button type="submit" colorScheme="blue">
          Sign In
        </Button>
      </VStack>
    </form>
  );
};

export default SigninForm;
