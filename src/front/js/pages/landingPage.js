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
					Our dedicated team, led by Julio Solis, has meticulously crafted this
                    website to cater to visitors' diverse needs. Ojinga Anokwu designed the
                    homepage, coded the currency converter, password recovery page, and
                    handpicked the design to capture users' attention, ensuring
                    a user-friendly experience. Oland Lamar Stokes created the seamless
                    signup and login forms, while Oland Lamar Stokes and Sernaggio
                    Blaise dedicated extensive time to integrating various APIs,
                    including airport information. Every team member took their time
                    to ensure that this platform offers the best possible experience.
                    Explore flight statuses, destinations, currency conversion, and
                    travel details worldwide. Simplify your travel preparations by
                    signing up and updating preferences. Our goal is to enhance
                    global travel by harnessing technology, exemplified by this platform.
				</p>
			</div>
		</div>

	);
};
