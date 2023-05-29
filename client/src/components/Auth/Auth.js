import React, {useState} from "react";
import SigninForm from "./Signin";
import SignupForm from "./Signup";
import {Box, Button} from "@chakra-ui/react";

const Auth = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <>
      {isSignIn ? <SigninForm /> : <SignupForm />}
      <Box ml={5}>
        <Button onClick={() => setIsSignIn(!isSignIn)}>
          {isSignIn
            ? "Dont Have an Account? Sign Up"
            : "Already Have an Account? Sign In"}
        </Button>
      </Box>
    </>
  );
};

export default Auth;
