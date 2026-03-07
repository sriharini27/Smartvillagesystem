import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import axios from "axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix marker icon issue
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// village coordinates
const villageCoords = {
  "Illupaiyurani": [9.1792, 77.8677],
  "Kovilpatti": [9.1717, 77.8694],
  "Ettayapuram": [9.1457, 77.9909],
  "Kayathar": [8.9483, 77.7741],
  "Kadambur": [9.0106, 77.9152],
};

function MapView() {

  const [locations, setLocations] = useState([]);

  useEffect(() => {

    axios.get("http://127.0.0.1:5000/complaints")
      .then(res => {

        const complaints = res.data;

        const mapped = complaints.map(c => {

          const coords = villageCoords[c.village];

          if (coords) {
            return {
              ...c,
              lat: coords[0],
              lon: coords[1]
            };
          }

          return null;

        });

        setLocations(mapped.filter(Boolean));

      })
      .catch(err => console.log(err));

  }, []);

  return (

    <MapContainer
      center={[9.17, 77.87]}
      zoom={10}
      style={{ height: "900px", width: "100%" }}
    >

      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {locations.map((loc, i) => (

        <Marker key={i} position={[loc.lat, loc.lon]}>

          <Popup>

            <b>{loc.issue_type}</b>
            <br />

            {loc.village}, {loc.city}
            <br />

            {loc.description}

          </Popup>

        </Marker>

      ))}

    </MapContainer>

  );

}

export default MapView;