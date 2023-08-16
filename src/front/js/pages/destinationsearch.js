import React, { useState, useEffect } from "react";
import "../../styles/DestinationSearch.css";
import "bootstrap/dist/css/bootstrap.min.css";

const MySearch = () => {
  const [search, setSearch] = useState("");
  const [destinationResult, setDestinationResult] = useState([]);
  const [flightResult, setFlightResult] = useState([]);
  const [secondFlight, setSecondFlight] = useState([]);
  const [airportResult, setAirportResult] = useState([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    setError(null);
    setLoading(true);

    const fetchCities = async () => {
      if (search !== "") {
        try {
          const response = await fetch(`https://api.teleport.org/api/cities/?search=${search}`);
          const data = await response.json();
          console.log("cities", data);
          setLoading(false);
          return data._embedded?.["city:search-results"];
        } catch (error) {
          setError("Error fetching destination data. Please try again later.");
          setLoading(false);
        }
      }
    };

    const fetchAirports = async (city) => {
      const url = `https://tripadvisor16.p.rapidapi.com/api/v1/flights/searchAirport?query=${city}`;
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '26417e7137msh4d7acb99d1bc795p134430jsn57e3f84c008c',
          'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com'
        }
      };
      try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log("airports", result.data);
        return result.data;
      } catch (error) {
        console.error(error);
      }
    };

    const fetchFlights = async (airport) => {
      const date = new Date().toISOString().slice(0, 10);
      const url = `https://tripadvisor16.p.rapidapi.com/api/v1/flights/searchFlights?sourceAirportCode=MIA&destinationAirportCode=${airport}&date=${date}&itineraryType=ONE_WAY&sortOrder=ML_BEST_VALUE&numAdults=1&numSeniors=0&classOfService=ECONOMY&pageNumber=1&currencyCode=USD`;
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '26417e7137msh4d7acb99d1bc795p134430jsn57e3f84c008c',
          'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com'
        }
      };
      try {
        const response = await fetch(url, options);
        const result = await response.json();
        // console.log(result.data.flights, "flights");
         console.log(result,"flights")
         setFlights(result.data.flights);
         console.log("flights") 
      } catch (error) {
        console.error(error);
      }
    };
   

    const fetchBoth = async () => {
      const cities = await fetchCities();
      if (cities && cities.length > 0) {
        const destination = cities[0].matching_full_name;
        const wholeLocationName = destination.split(", ");
        const city = wholeLocationName[0];
        const airports = await fetchAirports(city);
        if (airports && airports.length > 0) {
          const airport = airports[0].airportCode;
          console.log(airports, "here");
          const flights = await fetchFlights(airport);
          //  console.log(flights, "flights")
          setDestinationResult(cities);
          setAirportResult(airports);
          setFlightResult(flights);
        }
      }
    };

    fetchBoth();
  }, [search]);

  const startSearch = (event) => {
    event.preventDefault();
    setSearch(input);
    setInput("");
  };

  const addToFavorites = (destination) => {
    setFavorites([...favorites, destination]);
  };

  const removeFromFavorites = (destination) => {
    setFavorites(favorites.filter((fav) => fav !== destination));
  };

  const isFavorite = (destination) => {
    return favorites.includes(destination);
  };

  const clearResults = () => {
    setDestinationResult([]);
    setFlightResult([]);
  };
  const getFlights =  () => {
    fetch("https://sblaise123-fictional-barnacle-5wq5jw6pq4rfv6v9-3001.app.github.dev/api/getflightinfo",{
      method:"GET",
      headers:{"Content-Type":"application/json"}
    })
    .then((res) => res.json())
        .then((data) =>  setSecondFlight( data ))
        .catch((error) => console.log("error", error));
  };
  getFlights()
  return (
    <div className="my-search-container">
      <div className="jumbotron">
        <h1>It's Time To Get Away</h1>
        <p>Where Do You Want To Go!</p>
      </div>
      <form onSubmit={startSearch} className="form-inline my-search-form">
        <div className="input-group">
          <input
            className="form-control"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            id="searchInput"
            name="fname"
            placeholder="Your Next Destination"
            aria-label="Destination"
            required
          />
          <div className="input-group-append">
            <button className="btn btn-primary" type="submit">
              Search
            </button>
          </div>
        </div>
      </form>
      {loading ? <div className="loader">Loading...</div> : null}
      {error ? <div className="alert alert-danger">{error}</div> : null}
      <div className="my-results-container">
        {destinationResult.length > 0 ? (
          <div className="my-search-results">
            {destinationResult.map((city) => (
              <div
                key={city._links["city:item"].href}
                className="card my-search-result-item"
              >
                <div className="card-body">
                  <h3 className="card-title">{city.matching_full_name}</h3>
                  <p className="card-text">{city.matching_alternate_names.name}</p>
                  <button
                    className={`btn ${isFavorite(city.matching_full_name) ? "btn-danger" : "btn-outline-danger"
                      }`}
                    onClick={() =>
                      isFavorite(city.matching_full_name)
                        ? removeFromFavorites(city.matching_full_name)
                        : addToFavorites(city.matching_full_name)
                    }
                  >
                    {isFavorite(city.matching_full_name) ? (
                      <i className="fas fa-heart"></i>
                    ) : (
                      <i className="far fa-heart"></i>
                    )}
                  </button>
                </div>
              </div>
            ))}
            <div className="my-flight-results">
              <h2>Flight Prices</h2>
              {secondFlight.length > 0 ? (
                secondFlight.map((flight, index) => (
                  <div key={index} className="card flight-item">
                    <div className="card-body">
                      <p>Flight Provider: {flight.flightProvider}</p>
                      <p>Price: {flight.price}</p>
                      <p>Departure Date: {flight.departureDate}</p>
                      {/* <p>{getFlights()}</p> */}
                    </div>
                  </div>
                ))
              ) : (
                <><p>No flight data available.</p></>
              )}
            </div>
          </div>
        ) : (
          <div className="alert alert-info">No results found.</div>
        )}
      </div>
      <button className="btn btn-secondary" onClick={clearResults}>
        Clear Results
      </button>
    </div>
  );
};

export default MySearch;
