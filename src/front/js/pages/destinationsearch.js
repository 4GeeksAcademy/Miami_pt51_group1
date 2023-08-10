import React, { useState, useEffect } from "react";
import "../../styles/DestinationSearch.css";
import "bootstrap/dist/css/bootstrap.min.css";

function convertState(input) {
  var states = [
    ['Arizona', 'AZ'],
    ['Alabama', 'AL'],
    ['Alaska', 'AK'],
    ['Arkansas', 'AR'],
    ['California', 'CA'],
    ['Colorado', 'CO'],
    ['Connecticut', 'CT'],
    ['Delaware', 'DE'],
    ['Florida', 'FL'],
    ['Georgia', 'GA'],
    ['Hawaii', 'HI'],
    ['Idaho', 'ID'],
    ['Illinois', 'IL'],
    ['Indiana', 'IN'],
    ['Iowa', 'IA'],
    ['Kansas', 'KS'],
    ['Kentucky', 'KY'],
    ['Louisiana', 'LA'],
    ['Maine', 'ME'],
    ['Maryland', 'MD'],
    ['Massachusetts', 'MA'],
    ['Michigan', 'MI'],
    ['Minnesota', 'MN'],
    ['Mississippi', 'MS'],
    ['Missouri', 'MO'],
    ['Montana', 'MT'],
    ['Nebraska', 'NE'],
    ['Nevada', 'NV'],
    ['New Hampshire', 'NH'],
    ['New Jersey', 'NJ'],
    ['New Mexico', 'NM'],
    ['New York', 'NY'],
    ['North Carolina', 'NC'],
    ['North Dakota', 'ND'],
    ['Ohio', 'OH'],
    ['Oklahoma', 'OK'],
    ['Oregon', 'OR'],
    ['Pennsylvania', 'PA'],
    ['Rhode Island', 'RI'],
    ['South Carolina', 'SC'],
    ['South Dakota', 'SD'],
    ['Tennessee', 'TN'],
    ['Texas', 'TX'],
    ['Utah', 'UT'],
    ['Vermont', 'VT'],
    ['Virginia', 'VA'],
    ['Washington', 'WA'],
    ['West Virginia', 'WV'],
    ['Wisconsin', 'WI'],
    ['Wyoming', 'WY'],
  ];
  input = input.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
  for (let i = 0; i < states.length; i++) {
    if (states[i][0] === input) {
      return states[i][1];
    }
  }
}

const MySearch = () => {
  const [search, setSearch] = useState("");
  const [destinationResult, setDestinationResult] = useState([]);
  const [weatherResult, setWeatherResult] = useState([]);
  const [flightResult, setFlightResult] = useState([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setError(null);
    setLoading(true);

    if (search !== "") {
      fetch(`https://api.teleport.org/api/cities/?search=${search}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("cities", data);
          setDestinationResult(data._embedded?.["city:search-results"]);
          setLoading(false);
        })
        .catch((error) => {
          setError("Error fetching destination data. Please try again later.");
          setLoading(false);
        });
    } else {
      setLoading(false);
      setDestinationResult([]);
    }
  }, [search]);

  useEffect(() => {
    if (destinationResult.length > 0) {
      const result = destinationResult[0].matching_full_name;
      const all = result.split(", ");
      const city = all[0];
      const fullState = all[1];
      const state = convertState(fullState);

      const fetchWeatherData = async () => {
        const weatherUrl = `https://weatherapi-com.p.rapidapi.com/current.json?q=${city}&${state}`;
        const weatherOptions = {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': '26417e7137msh4d7acb99d1bc795p134430jsn57e3f84c008c',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
          }
        };

        try {
          const response = await fetch(weatherUrl, weatherOptions);
          const data = await response.json();
          console.log("weather", data);
          setWeatherResult(data);
        } catch (error) {
          setError("Error fetching weather data. Please try again later.");
        }
      };

      const fetchFlightData = async () => {
        const flightUrl = `https://tripadvisor16.p.rapidapi.com/api/v1/flights/searchAirport?query=${city}`;
        const flightOptions = {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': '26417e7137msh4d7acb99d1bc795p134430jsn57e3f84c008c',
            'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com'
          }
        };

        try {
          const response = await fetch(flightUrl, flightOptions);
          const data = await response.json();
          console.log("flights", data);
          setFlightResult(data);
        } catch (error) {
          setError("Error fetching flight data. Please try again later.");
        }
      };

      fetchWeatherData();
      fetchFlightData();
    } else {
      setWeatherResult([]);
      setFlightResult([]);
    }
  }, [destinationResult]);

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
    setWeatherResult([]);
    setFlightResult([]);
  };

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
                    className={`btn ${
                      isFavorite(city.matching_full_name) ? "btn-danger" : "btn-outline-danger"
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
          </div>
        ) : (
          <div className="alert alert-info">no results</div>
        )}

        {weatherResult.length > 0 ? (
          <div className="my-weather-results">
            <h2>Weather Information</h2>
            {weatherResult.map((weather1, index) => (
              <div key={index} className="card weather-item">
                <div className="card-body">
                  <p>Temperature: {weather1.temp}</p>
                  <p>Feels Like: {weather1.feels_like}</p>
                  <p>Humidity: {weather1.humidity}</p>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>

      {flightResult.length > 0 ? (
        <div className="my-flight-results">
          <h2>Flight Prices</h2>
          {flightResult.map((flight, index) => (
            <div key={index} className="card flight-item">
              <div className="card-body">
                <p>Flight Provider: {flight.provider}</p>
                <p>Price: {flight.price}</p>
                <p>Departure Date: {flight.departureDate}</p>
              </div>
            </div>
          ))}
        </div>
      ) : null}

      <button className="btn btn-secondary" onClick={clearResults}>
        Clear Results
      </button>
    </div>
  );
};

export default MySearch;
