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
//       )}
//     </div>
//   );
// };

// export default LocationMap;
import React, { useEffect, useState, useCallback } from "react";
import {
  GoogleMap,
  Marker,
  Circle,
  useLoadScript,
} from "@react-google-maps/api";
import { useSelector } from "react-redux";
import { locationMap } from "../form-container/inputs/styles";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const defaultZoom = 13;

const LocationMap = ({
  location,
  onLocationChange,
  clickable,
  fields,
  haveRadius,
}) => {
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

  const [mapRef, setMapRef] = useState(null);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY, // Or use Constants.manifest.extra
  });

  const handleMapClick = useCallback(
    (e) => {
      if (!clickable) return;
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      console.log(lat, lng, "locations");

      onLocationChange({
        [latitudeField]: lat,
        [longitudeField]: lng,
        ...(radiusField && { [radiusField]: radius }),
      });
    },
    [
      clickable,
      onLocationChange,
      latitudeField,
      longitudeField,
      radiusField,
      radius,
    ]
  );

  const handleRadiusChange = (e) => {
    const newRadius = Number(e.target.value);
    setRadius(newRadius);
    if (radiusField) {
      onLocationChange({
        [latitudeField]: lat,
        [longitudeField]: lng,
        [radiusField]: newRadius,
      });
    }
  };

  useEffect(() => {
    if (radiusField) {
      onLocationChange({
        [latitudeField]: lat,
        [longitudeField]: lng,
        [radiusField]: radius,
      });
    } else {
      onLocationChange({
        [latitudeField]: lat,
        [longitudeField]: lng,
      });
    }
  }, []);

  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <div className={locationMap.container}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={defaultZoom}
        center={{ lat, lng }}
        onClick={handleMapClick}
        onLoad={(map) => setMapRef(map)}
      >
        <Marker position={{ lat, lng }} />
        {radiusField && (
          <Circle
            center={{ lat, lng }}
            radius={radius}
            options={{
              strokeColor: "#4285F4",
              fillColor: "#4285F4",
              fillOpacity: 0.2,
              strokeWeight: 1,
            }}
          />
        )}
      </GoogleMap>

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
