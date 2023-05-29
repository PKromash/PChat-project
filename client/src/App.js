import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar";
import Library from "./components/Library";
import Auth from "./components/Auth/Auth";
import CreatePost from "./components/CreatePost";
import PostContent from "./components/Posts/PostContent";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Library />} />
        <Route path="/library" exact element={<Library />} />
        <Route path="/auth" exact element={<Auth />} />
        <Route path="/create" exact element={<CreatePost />} />
        <Route path="/update/:id" exact element={<CreatePost />} />
        <Route
          path="/posts/:postId/:backDestination"
          exact
          element={<PostContent />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
