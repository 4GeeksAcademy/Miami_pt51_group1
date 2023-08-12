import React, { useContext, useState ,useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";


export const Private = () => {
	const { store, actions } = useContext(Context);
	const [email , setEmail] = useState("")
	const navigate = useNavigate();

	const token = localStorage.getItem("token");

	useEffect(() => {
		const gettingInfo = async () => {
            const options = {
                method: "GET",
				headers: {
				  "Content-Type": "application/json",
				  Authorization: `Bearer ${token}`,
            }
            }  
            try{
                const response = await fetch(`${process.env.BACKEND_URL}/private`,options)
				console.log("this is the response",response)
                const data =await response.json()
				console.log("this is the data", data)
                setEmail(data.email)
            } catch (error){console.log(error);}
	
			}
	
		  gettingInfo()
		  }, [])
	
		  console.log("this is the email", email);
		  console.log(store.token)
		  console.log("favorites: ", store.favorites)
	  return (
		<div className="text-center mt-5">
			
		  {token ? (
			<><button className="nav-link" to="/" onClick={() => {	
					localStorage.clear()
					navigate('/login')
				  } }>
					  Logout
				  </button><div>
						  <h1>U are now on your private page {email} </h1>
						  <div>
							{store.favorites.map(() => {
								return(
									<div>{destinations.city}</div>
								
								)
								
							})}
						  </div>
					  </div></>
		  ) : (
			// navigate("/")
			<div>
				<h1>{store.email}</h1>
			</div>	
		  )}
		</div>
	  );
	};
	
