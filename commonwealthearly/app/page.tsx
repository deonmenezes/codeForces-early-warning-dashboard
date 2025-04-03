'use client'
import React, { useState } from 'react';
import { 
  ComposableMap, 
  Geographies, 
  Geography,
  ZoomableGroup,
  Marker
} from 'react-simple-maps';
import { scaleQuantile } from 'd3-scale';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { SearchIcon, GlobeIcon } from 'lucide-react';

// Type definitions
type Coordinates = [number, number];

type Event = { 
  name: string; 
  coordinates: Coordinates;
  type: string;
  description: string;
};

type Position = {
  coordinates: Coordinates;
  zoom: number;
};

// Dummy data for map coloration and markers
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const eventData: Event[] = [
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

const colorScale = scaleQuantile<string>()
  .domain(eventData.map((_, i) => i))
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

// News data
const newsItems = [
  {
    id: 1,
    title: "ISRO's 100th mission faces technical glitch",
    category: "TECHNOLOGY",
    country: "India",
    severity: "VERY EXTREME",
  },
  // ... other news items
];

const Homepage: React.FC = () => {
  const [position, setPosition] = useState<Position>({ 
    coordinates: [0, 0], 
    zoom: 1 
  });
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const handleMoveEnd = (newPosition: Position) => {
    setPosition(newPosition);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          <div className="flex items-center space-x-4">
            <GlobeIcon className="w-8 h-8 text-blue-400" />
            <h1 className="text-2xl font-bold text-white">EWS</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input 
                placeholder="Search events" 
                className="pl-10 bg-gray-800/50 border-none text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                A
              </div>
              <span>Admin</span>
            </div>
          </div>
        </div>
      </header>

      {/* Map and News Container */}
      <div className="relative h-screen pt-16">
        {/* Interactive World Map */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <ComposableMap 
            projectionConfig={{ scale: 147 }}
            className="w-full h-full"
          >
            <ZoomableGroup 
              zoom={position.zoom}
              center={position.coordinates as [number, number]}
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
                      style={{
                        default: { outline: 'none' },
                        hover: { outline: 'none' },
                        pressed: { outline: 'none' }
                      }}
                    />
                  ))
                }
              </Geographies>

              {/* Event Markers */}
              {eventData.map((event, i) => (
                <Marker 
                  key={i} 
                  coordinates={event.coordinates}
                  onClick={() => setSelectedEvent(event)}
                >
                  <circle 
                    r={8}
                    fill={
                      event.type === 'technology' 
                        ? '#00ff00' 
                        : event.type === 'political' 
                        ? '#ff0000' 
                        : '#0000ff'
                    }
                    className="cursor-pointer animate-pulse"
                  />
                </Marker>
              ))}
            </ZoomableGroup>
          </ComposableMap>

          {/* Event Details Sidebar */}
          {selectedEvent && (
            <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-96 bg-gray-800/90 backdrop-blur-sm p-6 rounded-l-xl shadow-2xl z-50">
              <h2 className="text-2xl font-bold mb-4">{selectedEvent.name}</h2>
              <p className="text-gray-300 mb-4">{selectedEvent.description}</p>
              <p className="text-sm text-gray-500 capitalize">
                Event Type: {selectedEvent.type}
              </p>
              <Button 
                onClick={() => setSelectedEvent(null)}
                className="mt-4 w-full"
              >
                Close
              </Button>
            </div>
          )}
        </motion.div>

        {/* News Sidebar */}
        <div className="absolute top-1/2 -translate-y-1/2 right-8 w-96 bg-black/60 backdrop-blur-lg rounded-xl shadow-2xl">
          <Tabs defaultValue="active" className="w-full">
            <TabsList className="bg-transparent border-b border-gray-700 p-4">
              <TabsTrigger 
                value="active" 
                className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400 px-4 py-2 rounded-md"
              >
                Active Events
              </TabsTrigger>
              <TabsTrigger 
                value="potential" 
                className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400 px-4 py-2 rounded-md"
              >
                Potential Events
              </TabsTrigger>
              <TabsTrigger 
                value="all" 
                className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400 px-4 py-2 rounded-md"
              >
                All Events
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="p-6 space-y-4 max-h-[600px] overflow-y-auto">
            {newsItems.map((item) => (
              <div 
                key={item.id} 
                className="bg-gray-800/50 p-4 rounded-lg hover:bg-gray-700/50 transition-colors duration-200 cursor-pointer"
              >
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <span className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded">
                    {item.category}
                  </span>
                  <span>{item.country}</span>
                  <span className="text-red-500 font-semibold">{item.severity}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-gray-700">
            <Button className="w-full">
              View More Events
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;