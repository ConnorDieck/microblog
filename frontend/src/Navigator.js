import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import PostForm from "./PostForm";
import Home from "./Home";
import Post from "./Post";
import PageNotFound from "./PageNotFound";

const Navigator = () => {
	return (
		<Routes>
			<Route path="*" element={<PageNotFound />} />
			<Route path="/" element={<Home />} />
			<Route path="/posts/:postId" element={<Post />} />
			<Route path="/posts/new" element={<PostForm editMode={false} />} />
			<Route path="/posts/edit/:id" element={<PostForm editMode={true} />} />
		</Routes>
	);
};

export default Navigator;
