import { useParams } from 'react-router-dom';

function DetailView({ breweries }) {
  const { id } = useParams();
  const brewery = breweries.find(brewery => brewery.id === Number(id));

  if (!brewery) {
    return <p>Brewery not found</p>;
  }

  return (
    <div>
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
    </div>
  );
}

export default DetailView;