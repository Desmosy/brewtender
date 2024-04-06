import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import "./DetailView.css";

function DetailView() {
  const { id } = useParams();
  const [brewery, setBrewery] = useState(null);
  

  useEffect(() => {
    const fetchBrewery = async () => {
      try {
        const response = await Axios.get(`https://api.openbrewerydb.org/v1/breweries/${id}`);
        setBrewery(response.data);
      } catch (error) {
        console.error('Error fetching brewery:', error);
      }
    };

    fetchBrewery();
  }, [id]);

  if (!brewery) {
    return <p>Loading...</p>;
  }

  return (
    <div className="detail-view">
      <h2>{brewery.name}</h2>
      <p>Type: {brewery.brewery_type}</p>
      <p>Address: {brewery.address_1} {brewery.address_2} {brewery.address_3}</p>
      <p>City: {brewery.city}</p>
      <p>State/Province: {brewery.state_province}</p>
      <p>Postal Code: {brewery.postal_code}</p>
      <p>Country: {brewery.country}</p>
      <p>Longitude: {brewery.longitude}</p>
      <p>Latitude: {brewery.latitude}</p>
      <p>Phone: {brewery.phone}</p>
      <p>Website: <a href={brewery.website_url}>{brewery.website_url}</a></p>
      <p>State: {brewery.state}</p>
      <p>Street: {brewery.street}</p>
      <Link to="/" className="go-to-home">Go to Home</Link>
    </div>
  );
}

export default DetailView;
