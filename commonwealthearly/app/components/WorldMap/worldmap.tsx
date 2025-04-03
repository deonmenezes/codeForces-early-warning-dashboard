import React, { useState } from 'react';
import { 
  ComposableMap, 
  Geographies, 
  Geography,
  ZoomableGroup,
  Marker
} from 'react-simple-maps';
import { scaleQuantile } from 'd3-scale';

// Ensure you have the correct import for the world atlas
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Event data with global coordinates
const eventData = [
  { 
    name: "ISRO Mission", 
    coordinates: [78.9629, 20.5937],
    type: "technology",
    description: "100th mission faces technical glitch"
  },
  { 
    name: "WHO Event", 
    coordinates: [-95.7129, 37.0902],
    type: "political",
    description: "$400 million funding update"
  },
  { 
    name: "Canada Tariffs", 
    coordinates: [-106.3468, 56.1304],
    type: "economic",
    description: "25% tariffs on US goods"
  }
];

// Color scale for map
const colorScale = scaleQuantile<string>()
  .domain(Array.from({length: 9}, (_, i) => i))
  .range([
    "#ffedea",
    "#ffcec5", 
    "#ffad9f",
    "#ff8a75",
    "#ff5533",
    "#e2492d",
    "#be3d26",
    "#9a311f",
    "#782021"
  ]);

const WorldMap: React.FC = () => {
  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  // Handle map movement and zoom
  const handleMoveEnd = (position: any) => {
    setPosition(position);
  };

  // Get marker color based on event type
  const getMarkerColor = (type: string) => {
    switch (type) {
      case 'technology': return 'fill-green-500';
      case 'political': return 'fill-red-500';
      case 'economic': return 'fill-blue-500';
      default: return 'fill-gray-500';
    }
  };

  return (
    <div className="relative w-full h-[calc(100vh-4rem)] bg-gray-900">
      <ComposableMap 
        projectionConfig={{ 
          scale: 147,
          center: [0, 20]
        }}
        className="w-full h-full"
      >
        <ZoomableGroup 
          zoom={position.zoom}
          center={[position.coordinates[0], position.coordinates[1]]}
          onMoveEnd={handleMoveEnd}
        >
          {/* World Geography */}
          <Geographies geography={geoUrl}>
            {({ geographies }) => 
              geographies.map((geo, i) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={colorScale(i % 9)}
                  className="transition-all duration-300 hover:fill-blue-600"
                  stroke="#333"
                  strokeWidth={0.5}
                />
              ))
            }
          </Geographies>

          {/* Event Markers */}
          {eventData.map((event, i) => (
            <Marker 
              key={i} 
              coordinates={[event.coordinates[0], event.coordinates[1]]} 
              onClick={() => setSelectedEvent(event)}
            >
              <g 
                className="cursor-pointer group"
                transform="translate(-12, -12)"
              >
                <circle 
                  r={12} 
                  className={`${getMarkerColor(event.type)} opacity-70 group-hover:opacity-100 animate-pulse`}
                />
                <circle 
                  r={6} 
                  className={`${getMarkerColor(event.type)} animate-ping`}
                />
              </g>
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>

      {/* Event Details Sidebar */}
      {selectedEvent && (
        <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-96 bg-gray-800/90 backdrop-blur-sm p-6 rounded-l-xl shadow-2xl z-50">
          <div className={`w-16 h-16 rounded-full ${getMarkerColor(selectedEvent.type)} bg-opacity-20 flex items-center justify-center mb-4`}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="text-white"
            >
              <path d="M20 10c0 6-8 10-8 10s-8-4-8-10a8 8 0 1 1 16 0Z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2 text-white">
            {selectedEvent.name}
          </h2>
          <p className="text-gray-300 mb-4">
            {selectedEvent.description}
          </p>
          <p className="text-sm text-gray-500 capitalize mb-4">
            Event Type: {selectedEvent.type}
          </p>
          <button 
            onClick={() => setSelectedEvent(null)}
            className="w-full py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default WorldMap;