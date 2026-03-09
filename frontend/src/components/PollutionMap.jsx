import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';


// Function to get color based on pollution level
function getColor(value){
  
  if (value <100) return '#41d61f'; // Green - Low
  if (value <200) return '#e4d125'; // Yellow - Moderate
  if (value<300) return '#faa022'; // Desert - Moderate-hight
  if (value< 400) return '#f04f23';// Orange - Hight
  return '#8B0000'; // Dark red - Very high
}


const createPoint = (color) => {
  return L.divIcon({
    html: `<div style="
      background-color: ${color};
      width: 16px;
      height: 16px;
      border-radius: 50%;
      border: 2px solid white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    "></div>`,
    className: 'custom-leaflet-marker', 
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });
};

export function PollutionMap({ points = []}) {
  const center = [49.444, 32.06];
  console.log(points);
  
  // color of the marker depends on max AQI of the point.
  // TODO:
  // fix gas selection menu
  const maxValue = points.length > 0 ? Math.max(...points.map(d => d.value)) : 1;
  return (
    <div className="size-full relative overflow-hidden">
      <MapContainer 
        center={center} 
        zoom={13} 
        className="size-full z-0"
        zoomControl={false} 
      >
        {/* map style (CartoDB Positron) */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
        />

        {points.map((point) => {
          const color = getColor(point.value);
          
          return (
            <Marker
              key={point.id}
              position={[point.lat, point.lng]}               icon={createPoint(color)}
            >
              {/*Tooltip window */}
              <Tooltip direction="top" offset={[0, -10]} opacity={1} className="custom-leaflet-tooltip">
                <div className="p-1">
                  <div className="font-semibold text-gray-900">{point.location}</div>
                  <div className="text-sm text-gray-600">
                    {"заглушка"}: <span className="font-medium text-black">{point.value}</span>
                  </div>
                </div>
              </Tooltip>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
