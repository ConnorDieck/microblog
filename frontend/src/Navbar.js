import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
	return (
		<div>
			<h1>Microblog</h1>
			<h4>Get in the rhythm of blogging!</h4>
			<nav>
				<Link to={"/"}>Blog</Link>
				<Link to={"/posts/new"}>Add a new post</Link>
			</nav>
		</div>
	);
};

export default Navbar;
