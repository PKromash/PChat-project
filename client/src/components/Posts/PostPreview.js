// import React, {useEffect} from "react";
// import {useDispatch} from "react-redux";
// import {
//   getPosts,
//   likePost,
//   deletePost,
//   deleteComment,
// } from "../../actions/posts";
// import {Link, Box, Flex, Text, Heading, Image, Button} from "@chakra-ui/react";
// import moment from "moment";

// const Post = ({post}) => {
//   const dispatch = useDispatch();
//   const user = JSON.parse(localStorage.getItem("profile"));
//   const {_id: postId} = post;

//   useEffect(() => {
//     dispatch(getPosts());
//   }, [dispatch]);

//   const handleLike = () => {
//     dispatch(likePost(post._id));
//   };

//   const handleDelete = () => {
//     dispatch(deletePost(post._id));
//   };

//   const handleCommentDelete = (commentId) => {
//     dispatch(deleteComment(postId, commentId));
//   };

//   const formattedDate = moment(post.createdAt).format("MMMM DD, YYYY");

//   return (
//     <Box p={4} borderWidth="1px" borderRadius="md" boxShadow="md">
//       <Heading as="h2" size="lg" mb={2}>
//         {post.title}
//       </Heading>
//       <Text>
//         {post.name} | {formattedDate}
//       </Text>
//       <Text mt={2} mb={4}>
//         {post.message}
//       </Text>
//       {post.image && <Image src={post.image} alt="Post" mb={4} />}

//       <Flex align="center" mb={4}>
//         {user && (
//           <Button
//             colorScheme="blue"
//             size="sm"
//             onClick={handleLike}
//             disabled={!user}>
//             Like
//           </Button>
//         )}
//         <Text ml={2} fontSize="sm">
//           Likes: {post.likes.length} {!user && "(Login to like)"}
//         </Text>
//       </Flex>

//       <Flex align="center" mb={4}>
//         <Link href={`/posts/${postId}/comment`}>Comments:</Link>
//         <Text ml={2} fontSize="sm">
//           {post.comments.length || "No"} comment
//           {post.comments.length !== 1 && "s"}
//         </Text>
//       </Flex>

//       {post.comments.length ? (
//         post.comments.map((comment) => (
//           <Box key={comment._id} p={2} bg="gray.100" mb={2} borderRadius="md">
//             <Flex justify="space-between" align="center">
//               <Text maxWidth="80%" overflowWrap="break-word">
//                 {comment.commenter}: {comment.comment}
//               </Text>
//               {user && comment.commenter === user.result.name && (
//                 <Button
//                   colorScheme="red"
//                   size="sm"
//                   onClick={() => handleCommentDelete(comment._id)}>
//                   Delete
//                 </Button>
//               )}
//             </Flex>
//           </Box>
//         ))
//       ) : (
//         <Text>No comments yet.</Text>
//       )}
//       {!user && (
//         <Text>
//           <Link href="/auth">Login</Link> to comment.
//         </Text>
//       )}

// {user && user.result._id === post.creator && (
//   <Button colorScheme="red" size="sm" mt={4} onClick={handleDelete}>
//     Delete
//   </Button>
//       )}
//     </Box>
//   );
// };

// export default Post;

import React, {useState, useEffect} from "react";
import {
  Box,
  Flex,
  Text,
  Heading,
  Button,
  Image,
  Avatar,
} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
import moment from "moment";

const PostPreview = ({post}) => {
  const {title, name, createdAt, likes, comments, image, avatar} = post;

  const navigate = useNavigate();
  const formattedDate = moment(createdAt).format("MMMM DD, YYYY");
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    if (currentId) {
      navigate(`/posts/${currentId}/library`);
    }
  }, [currentId, navigate]);

  const onViewPost = () => {
    setCurrentId(post._id);
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="md"
      boxShadow="md"
      width="100%"
      maxWidth="sm"
      mx="auto">
      <Box position="relative" overflow="hidden" aspectRatio={16 / 9}>
        <Box
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          background="rgba(0, 0, 0, 0.6)"
          color="white"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          opacity="0"
          transition="opacity 0.3s"
          _hover={{opacity: 1}}>
          <Heading as="h2" size="lg" textAlign="center" mb={2}>
            {title}
          </Heading>
          <Flex>
            <Text>{name}</Text>
            <Avatar size="xs" ml={2} name={name} src={avatar} />
          </Flex>
          <Text>{formattedDate}</Text>
        </Box>

        <Image
          src={image}
          alt="Post"
          objectFit="cover"
          width="100%"
          height="100%"
          cursor="pointer"
          _hover={{opacity: 0.8}}
          onClick={onViewPost}
        />
      </Box>

      <Flex direction="column" p={4}>
        <Flex justify="space-between" alignItems="center">
          <Flex alignItems="center">
            <Text>{likes.length} likes</Text>
            <Text mx={2}>•</Text>
            <Text>{comments.length} comments</Text>
          </Flex>
          <Flex>
            <Button
              variant="ghost"
              colorScheme="blue"
              size="sm"
              mr={2}
              onClick={onViewPost}>
              View Post
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default PostPreview;
