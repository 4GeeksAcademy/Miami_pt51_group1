import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { Navbar, Nav, Container } from "react-bootstrap";
import "../../styles/MyNavbar.css"; // Importing the CSS file




export const MyNavbar = () => {
	return (
		<div style={{ borderBottom: "50px solid transparent" }}>
			<Navbar bg="light" expand="lg" className="my-navbar">
				<Container>
					<Navbar.Brand >
						<RouterLink to="/">
							<a className="navbar-brand" href="#" src=".../front/img/IMG_0273.jpg" alt="" width="30px" height="24px">
							</a>
						</RouterLink>
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav >
							<RouterLink className="nav-link" to="/login">Login</RouterLink>
							<RouterLink className="nav-link" to="/register">Register</RouterLink>
							<RouterLink className="nav-link" to="/currency">CurrencyConverter</RouterLink>
							<RouterLink className="nav-link" to="/destinations">Search</RouterLink>
							<RouterLink className="nav-link" to="/">About</RouterLink>
							<button className="logoutButton" to="/logout">Logout</button>

						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</div>
	);
};
