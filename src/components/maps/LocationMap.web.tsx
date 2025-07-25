// import React, { useContext, useEffect, useState } from "react";
// import {
//   MapContainer,
//   TileLayer,
//   Marker,
//   Popup,
//   useMapEvents,
//   Circle,
// } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";
// import { locationMap } from "../form-container/inputs/styles";
// import { useSelector } from "react-redux";
// // Fix for Leaflet marker icons not showing correctly
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl:
//     "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
//   iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
//   shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
// });

// const LocationMap = ({
//   location,
//   onLocationChange,
//   clickable,
//   fields,
//   haveRadius,
// }) => {
//   const localization = useSelector((state) => state.localization.localization);

//   const latitudeField = fields.find(
//     (param) =>
//       param.parameterType ===
//       (haveRadius ? "areaMapLatitudePoint" : "mapLatitudePoint")
//   )?.parameterField;

//   const longitudeField = fields.find(
//     (param) =>
//       param.parameterType ===
//       (haveRadius ? "areaMapLongitudePoint" : "mapLongitudePoint")
//   )?.parameterField;

//   const radiusField = haveRadius
//     ? fields.find((param) => param.parameterType === "areaMapRadius")
//         ?.parameterField
//     : null;

//   const [radius, setRadius] = useState(location[radiusField] || 100);

//   const lat = +location[latitudeField] || 20; // Default latitude
//   const lng = +location[longitudeField] || 24; // Default longitude

//   const MapClickHandler = () => {
//     useMapEvents({
//       click(e) {
//         const { lat, lng } = e.latlng;
//         onLocationChange({
//           [latitudeField]: lat,
//           [longitudeField]: lng,
//           ...(radiusField && { [radiusField]: radius }),
//         });
//       },
//     });
//     return null;
//   };

//   const handleRadiusChange = (e) => {
//     setRadius(Number(e.target.value));
//   };

//   useEffect(() => {
//     if (radiusField) {
//       onLocationChange({
//         [latitudeField]: lat,
//         [longitudeField]: lng,
//         [radiusField]: radius,
//       });
//     }
//   }, []);
//   useEffect(() => {
//     onLocationChange({
//       [latitudeField]: lat,
//       [longitudeField]: lng,
//       // [radiusField]: radius,
//     });
//   }, []);
//   return (
//     <div className={locationMap.container}>
//       <MapContainer
//         center={[lat, lng]}
//         zoom={13}
//         className={locationMap.mapContainer}
//         attributionControl={false}
//       >
//         <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//         {clickable && <MapClickHandler />}
//         {location && (
//           <>
//             <Marker position={[lat, lng]}>
//               <Popup>{localization.inputs.locationMap.popupTitle}</Popup>
//             </Marker>
//             {radiusField && (
//               <Circle
//                 center={[lat, lng]}
//                 radius={radius}
//                 color="var(--main-color2)"
//                 fillColor="var(--main-color2)"
//                 fillOpacity={0.2}
//               />
//             )}
//           </>
//         )}
//       </MapContainer>
//       {/*
//       {radiusField && clickable && haveRadius && (
//         <div className={locationMap.radiusContainer}>
//           <label>
//             {localization.inputs.locationMap.radius.replace("{radius}", radius)}
//             <input
//               type="range"
//               min="50"
//               max="1000"
//               step="20"
//               value={radius}
//               onChange={handleRadiusChange}
//               className={locationMap.radiusInput}
//             />
//           </label>
//         </div>
//       )} */}
//     </div>
//   );
// };

// export default LocationMap;
import React, { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import { useSelector } from "react-redux";
import "maplibre-gl/dist/maplibre-gl.css";
import { locationMap } from "../form-container/inputs/styles";

const LocationMap = ({
  location,
  onLocationChange,
  clickable,
  fields,
  haveRadius,
}) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  const localization = useSelector((state) => state.localization.localization);

  const latitudeField = fields.find(
    (param) =>
      param.parameterType ===
      (haveRadius ? "areaMapLatitudePoint" : "mapLatitudePoint")
  )?.parameterField;

  const longitudeField = fields.find(
    (param) =>
      param.parameterType ===
      (haveRadius ? "areaMapLongitudePoint" : "mapLongitudePoint")
  )?.parameterField;

  const radiusField = haveRadius
    ? fields.find((param) => param.parameterType === "areaMapRadius")
        ?.parameterField
    : null;

  const [radius, setRadius] = useState(location[radiusField] || 100);

  const lat = +location[latitudeField] || 20;
  const lng = +location[longitudeField] || 24;

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialize MapLibre GL map
    mapRef.current = new maplibregl.Map({
      container: mapContainerRef.current,
      style: "https://demotiles.maplibre.org/style.json",
      center: [lng, lat],
      zoom: 13,
    });

    // Add marker
    const marker = new maplibregl.Marker()
      .setLngLat([lng, lat])
      .addTo(mapRef.current);

    // Add circle layer (only visual approximation using GeoJSON)
    if (radiusField) {
      const circleGeoJSON = {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [lng, lat],
            },
            properties: {},
          },
        ],
      };

      mapRef.current.on("load", () => {
        mapRef.current.addSource("circle", {
          type: "geojson",
          data: circleGeoJSON,
        });

        mapRef.current.addLayer({
          id: "circle-fill",
          type: "circle",
          source: "circle",
          paint: {
            "circle-radius": {
              stops: [
                [0, 0],
                [20, radius / 2], // adjust based on zoom/radius
              ],
            },
            "circle-color": "#007cbf",
            "circle-opacity": 0.3,
          },
        });
      });
    }

    // Add click handler
    if (clickable) {
      mapRef.current.on("click", (e) => {
        const { lng, lat } = e.lngLat;

        onLocationChange({
          [latitudeField]: lat,
          [longitudeField]: lng,
          ...(radiusField && { [radiusField]: radius }),
        });

        marker.setLngLat([lng, lat]);
      });
    }

    return () => {
      mapRef.current.remove();
    };
  }, [clickable, radius]);

  // Initial trigger
  useEffect(() => {
    const payload = {
      [latitudeField]: lat,
      [longitudeField]: lng,
    };
    if (radiusField) payload[radiusField] = radius;
    onLocationChange(payload);
  }, []);

  const handleRadiusChange = (e) => {
    setRadius(Number(e.target.value));
  };

  return (
    <div className={locationMap.container}>
      <div
        ref={mapContainerRef}
        className={locationMap.mapContainer}
        style={{ height: "400px", borderRadius: "10px" }}
      />
      {radiusField && clickable && haveRadius && (
        <div className={locationMap.radiusContainer}>
          <label>
            {localization.inputs.locationMap.radius.replace("{radius}", radius)}
            <input
              type="range"
              min="50"
              max="1000"
              step="20"
              value={radius}
              onChange={handleRadiusChange}
              className={locationMap.radiusInput}
            />
          </label>
        </div>
      )}
    </div>
  );
};

export default LocationMap;
