import React, {useEffect, useLayoutEffect, useState} from "react";
import {
  Box,
  Flex,
  Text,
  Heading,
  Image,
  Button,
  VStack,
  useBreakpointValue,
  Input,
  Divider,
  Icon,
  HStack,
  Avatar,
} from "@chakra-ui/react";
import {useParams} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import moment from "moment";
import {DeleteIcon, EditIcon} from "@chakra-ui/icons";
import {FaThumbsUp} from "react-icons/fa";

import {
  deletePost,
  likePost,
  deleteComment,
  commentPost,
} from "../../actions/posts";
import {useNavigate} from "react-router-dom";

const FullPost = () => {
  const {postId, backDestination} = useParams();
  const [, setWindowWidth] = useState(window.innerWidth);
  const [comment, setComment] = useState("");
  const [showCommentForm, setShowCommentForm] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get post from Redux store or local storage
  let post = useSelector((state) =>
    state.posts.find((post) => post._id === postId)
  );
  if (post) localStorage.setItem("post", JSON.stringify(post));
  else post = JSON.parse(localStorage.getItem("post"));

  const {title, name, createdAt, likes, comments, image, message} = post;
  const formattedDate = moment(createdAt).format("MMMM DD, YYYY");
  const user = JSON.parse(localStorage.getItem("profile"));

  // Update window width on resize
  useLayoutEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const shouldDisplayCommentsRight = useBreakpointValue({
    base: false,
    md: true,
  });

  const handleEditPost = () => {
    navigate(`/update/${postId}`);
  };

  const handleDelete = () => {
    dispatch(deletePost(postId)).then(handleClose);
  };

  const handleClose = () => {
    navigate(`/${backDestination}`);
  };

  const handleComment = () => {
    setShowCommentForm(false);
    if (!comment) return;
    dispatch(commentPost({id: postId, name: user.result.name}, comment));
    setComment("");
  };

  const handleDeleteComment = (commentId) => {
    dispatch(deleteComment(postId, commentId));
  };

  const [isLiked, setIsLiked] = useState(
    JSON.parse(localStorage.getItem(`like-${postId}`)) || false
  );

  useEffect(() => {
    setIsLiked(post?.likes.includes(user?.result._id));
  }, [post, user]);

  const handleLike = () => {
    dispatch(likePost(postId))
      .then(() => {
        const updatedPost = {...post};
        if (isLiked) {
          // Remove user ID from likes array if already liked
          updatedPost.likes = updatedPost.likes.filter(
            (id) => id !== user.result._id
          );
        } else {
          // Add user ID to likes array if not already liked
          updatedPost.likes = [...updatedPost.likes, user.result._id];
        }
        // Update the local copy of the post object
        post.likes = updatedPost.likes;
        // Update the like status
        setIsLiked(!isLiked);
        // Update the post data in local storage
        localStorage.setItem("post", JSON.stringify(post));
      })
      .catch((error) => {
        console.log("Error liking post:", error);
      });
  };

  return (
    <Box p={4} borderWidth="1px" borderRadius="md" boxShadow="md">
      <Flex align="center" gap={5}>
        <HStack spacing={4}>
          <Avatar size="md" name={name} src={post?.avatar} />
          <Heading size="xl" mb={1}>
            {title}
          </Heading>
        </HStack>
        {user && user.result._id === post.creator && (
          <Button colorScheme="red" size="sm" mr="auto" onClick={handleDelete}>
            Delete
            <DeleteIcon boxSize={4} ml={2} />
          </Button>
        )}
      </Flex>
      <HStack>
        <Text>
          {name} | {formattedDate}
        </Text>
        {user && user.result._id === post.creator && (
          <Button variant="ghost" onClick={handleEditPost}>
            <EditIcon boxSize={3} mr={2} />
            Edit
          </Button>
        )}
      </HStack>
      <Flex align="flex-start" justify="flex-start" mt={4} gap={6}>
        <Image
          src={image}
          ml="auto"
          mr="auto"
          mb={4}
          mt={4}
          pr={2}
          maxW={{
            base: "100%",
            md: "70%",
          }}
          minW={{
            base: "100%",
            md: "35%",
          }}
          alt="Post"
        />
        {shouldDisplayCommentsRight && comments.length <= 4 && (
          <VStack align="normal" spacing={4} mt={4}>
            {comments.length ? (
              comments.map((comment) => (
                <Box
                  key={`${comment._id}${comment.comment}`}
                  minW={{
                    base: "100%",
                    md: "200px",
                    lg: "300px",
                    xl: "400px",
                    "2xl": "500px",
                  }}
                  maxW={{
                    base: "100%",
                    md: "400px",
                    lg: "500px",
                    xl: "600px",
                    "2xl": "700px",
                  }}
                  p={2}
                  bg="gray.100"
                  mb={2}
                  borderRadius="md">
                  <Text as="b">{comment.commenter}</Text>
                  <Text>{comment.comment}</Text>

                  {user && comment.commenter === user.result.name && (
                    <Button
                      mt={2}
                      colorScheme="red"
                      size="sm"
                      onClick={() => handleDeleteComment(comment._id)}>
                      Delete
                      <DeleteIcon boxSize={4} ml={2} />
                    </Button>
                  )}
                </Box>
              ))
            ) : (
              <Text mr="100px">No comments yet.</Text>
            )}
            {showCommentForm && (
              <Box mt={4}>
                <Text fontSize="lg" mb={2}>
                  Add a Comment:
                </Text>
                <Input
                  placeholder="Write your comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <Button
                  colorScheme="blue"
                  size="sm"
                  mt={4}
                  onClick={handleComment}
                  disabled={!comment.length}>
                  Add Comment
                </Button>
              </Box>
            )}
            {user && (
              <Button
                maxW="117px"
                colorScheme={showCommentForm ? "red" : "blue"}
                size="sm"
                onClick={() => setShowCommentForm(!showCommentForm)}>
                {showCommentForm ? "Cancel" : "Add Comment"}
              </Button>
            )}
            {!user && (
              <Text fontSize="lg" mb={2}>
                Login to comment.
              </Text>
            )}
          </VStack>
        )}
      </Flex>
      <Text mt={2} mb={4} bg="gray.200" borderRadius="md" p={2} fontSize="lg">
        {message}
      </Text>

      <Flex align="center" mb={4} gap={4}>
        {user && (
          <Button
            colorScheme={isLiked ? "blue" : "gray"}
            variant="ghost"
            size="sm"
            leftIcon={<Icon as={FaThumbsUp} />}
            onClick={handleLike}>
            Like
          </Button>
        )}
        <Button colorScheme="gray" size="sm" onClick={handleClose}>
          Close
        </Button>

        <Flex align="center" mb={4} mt={2}>
          <Text fontSize="sm">
            Likes: {likes.length} | Comments: {comments.length}
          </Text>
        </Flex>
      </Flex>

      {!shouldDisplayCommentsRight && <Divider mb={4} />}

      {(!shouldDisplayCommentsRight || comments.length > 4) && (
        <>
          <Text fontSize="lg" mb={2}>
            Comments:
          </Text>
          <VStack align="start" spacing={4}>
            {comments.length ? (
              comments.map((comment) => (
                <Box
                  key={`${comment._id}${comment.comment}`}
                  minW={{
                    base: "100%",
                    md: "35%",
                  }}
                  p={2}
                  bg="gray.100"
                  mb={1}
                  borderRadius="md">
                  <Text as="b">{comment.commenter}</Text>
                  <Text>{comment.comment}</Text>
                  {user && comment.commenter === user.result.name && (
                    <Button
                      mt={2}
                      colorScheme="red"
                      size="sm"
                      onClick={() => handleDeleteComment(comment._id)}>
                      Delete
                      <DeleteIcon boxSize={4} ml={2} />
                    </Button>
                  )}
                </Box>
              ))
            ) : (
              <Text>No comments yet.</Text>
            )}
            {showCommentForm && (
              <Box mt={4}>
                <Text fontSize="lg" mb={2}>
                  Add a Comment:
                </Text>
                <Input
                  placeholder="Write your comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <Button
                  colorScheme="blue"
                  size="sm"
                  mt={2}
                  onClick={handleComment}
                  disabled={!comment.length}>
                  Add Comment
                </Button>
              </Box>
            )}
          </VStack>
          {user && (
            <Button
              mt={2}
              maxW="117px"
              colorScheme={showCommentForm ? "red" : "blue"}
              size="sm"
              onClick={() => setShowCommentForm(!showCommentForm)}>
              {showCommentForm ? "Cancel" : "Add Comment"}
            </Button>
          )}
          {!user && (
            <Text fontSize="lg" mb={2}>
              Login to comment.
            </Text>
          )}
        </>
      )}
    </Box>
  );
};

export default FullPost;
