import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {
  Box,
  Flex,
  Spacer,
  Link,
  Text,
  Button,
  Avatar,
  HStack,
} from "@chakra-ui/react";
import {useLocation} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import decode from "jwt-decode";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const logout = () => {
    setUser(null);
    dispatch({type: "LOGOUT"});
    navigate("/");
  };

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <Flex bg="blue.900" p={8} color="white" align="center" h="110px">
      <HStack
        spacing={{
          base: 1,
          sm: 2,
          md: 5,
        }}>
        <Box>
          <Text fontSize="3xl" fontWeight="bold">
            P-Chat
          </Text>
        </Box>
        <Link href="/" fontSize="xl" fontWeight="bold">
          Library
        </Link>
        {user && (
          <Link href="/create" fontSize="xl" fontWeight="bold">
            Create
          </Link>
        )}
      </HStack>
      <Spacer />
      <Box>
        {user ? (
          <Flex align="center" gap={5}>
            <Text fontSize="xl">{user.result.name}</Text>
            <Avatar
              size="sm"
              name={user.result.name}
              src={user.result.avatar}
            />
            <Button colorScheme="blue" variant="outline" onClick={logout}>
              Logout
            </Button>
          </Flex>
        ) : (
          <Link href="/auth" fontSize="xl">
            Login
          </Link>
        )}
      </Box>
    </Flex>
  );
}

export default Navbar;
