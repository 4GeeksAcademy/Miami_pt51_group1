import React, { useContext } from "react";
import { Button, Form, FormControl } from 'react-bootstrap';
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const LandingPage = () => {
	const { store, actions } = useContext(Context);

	return (

		<div className="welcome_text bg-image">
			<Form className="">
				<FormControl type="text" placeholder="Where would you like to go...?" className="searchbar" />
			</Form>
			<Button className="searchbutton">Search</Button>
			<h1 className="">Welcome to the Travel Site!</h1>
			<div id="about-section" className="scroll-section text-center d-flex flex-column justify-content-center align-items-center px-5">
				<h2 className="text-dark">About Us</h2>
				<p className="w-51 text-dark about-text">
					This website is the product of a hardworking and competent team, and it has been carefully
					crafted to meet the needs of visitors in a number of ways.
					<span className="text-primary"> Julio Solis</span> oversaw and led the
					project bringing us all together;
					<span className="text-success"> Ojinga Anokwu</span> designed and coded the website's home page;
					<span className="text-info"> Oland Lamar Stokes</span> painstakingly designed and programmed the site's signup and login forms;
					and <span className="text-warning"> Sernaggio Blaise</span> dedicated a lot of time to finding and integrating the site's many APIs.
					You can easily find out the air quality, weather forecast, and flight status for any destination
					on Earth that piques your curiosity. We double-checked that everything we did to build the
					login page played well with one another. Get the most out of your membership by signing up
					and keeping your preferences up to date. We all want to make it easier for people to travel
					all over the world by consolidating resources. The time and effort spent preparing for trips
					will be reduced significantly. This website is evidence of our commitment to embracing technological
					solutions to common problems. In this case, we were looking for candidates from all around the world.
				</p>
			</div>
		</div>

	);
};
