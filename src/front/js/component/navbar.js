import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { Navbar, Nav, Container } from "react-bootstrap";
import "../../styles/MyNavbar.css"; // Importing the CSS file

export const MyNavbar = () => {
	return (
		<Navbar bg="light" expand="lg" className="my-navbar">
			<Container>
				<Navbar.Brand >
					<RouterLink to="/">
						<span className="navbar-brand mb-0 h1">Travel Website</span>
					</RouterLink>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav >
						<RouterLink className="nav-link" to="/login">Login</RouterLink>
						<RouterLink className="nav-link" to="/register">Register</RouterLink>
						
						<ScrollLink activeClass="active" to="search-section" spy={true} smooth={true} offset={-70} duration={500} className="nav-link" >
							Search
						</ScrollLink>

						<ScrollLink activeClass="active" to="about-section" spy={true} smooth={true} offset={-70} duration={500} className="nav-link" >
							About
						</ScrollLink>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};
