import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvent,
} from "react-leaflet";
import { Link } from "@material-ui/core";

import { greenIcon, redIcon, goldIcon } from "./MapIcons";

const Map = ({ data }) => {
  function SetViewOnClick() {
    const map = useMapEvent("click", (e) => {
      map.setView(e.latlng, map.getZoom(), {
        animate: true,
      });
    });

    return null;
  }

  return (
    <div>
      <MapContainer
        style={{ height: "93.2vh", width: "100%", zIndex: 0 }}
        center={[27.7172, 85.324]}
        zoom={12}
      >
        <TileLayer
          attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
          url={`https://api.mapbox.com/styles/v1/${"uppa"}/${"ckj33midlb79e19s3j29z2osx"}/tiles/256/{z}/{x}/{y}@2x?access_token=${"pk.eyJ1IjoidXBwYSIsImEiOiJja2ozM2t0aDIzZ3RqMnFzYzNqNnZ1YjAyIn0.5t935eucUorqCEYQ0Orj0A"}`}
        />
        {data.map((info, index) => (
          <Marker
            key={index}
            position={[info.lat, info.lon]}
            icon={
              info.type === "Indoors"
                ? greenIcon
                : info.type === "Outdoors"
                ? goldIcon
                : redIcon
            }
          >
            <Popup>
              <div style={{ width: "300px", height: "auto" }}>
                <h2>{info.name}</h2>
                <h4 style={{ color: "gray" }}>{info.type}</h4>
                <img
                  style={{
                    width: "100%",
                    maxHeight: "200px",
                    objectFit: "cover",
                  }}
                  src={info.image}
                  alt={info.title}
                />
                <p>{info.body.slice(0, 150).concat("...")}</p>
                <p>
                  <Link component={RouterLink} to={`/place/${info.id}`}>
                    View
                  </Link>
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
        <SetViewOnClick />
      </MapContainer>
    </div>
  );
};

export default Map;
