import { useState, useEffect } from 'react';
import { PollutionLegend } from '../components/PollutionLegend';
import { PollutionStats } from '../components/PollutionStats';
import { PollutionMap } from '../components/PollutionMap';
import axios from 'axios';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Card } from '../components/ui/card';
import { Wind, Droplets, Factory, ChevronUp, ChevronDown, Car } from 'lucide-react';
import { Button } from '../components/ui/button';

// Mock pollution data for different types with percentage positions
// Each location has measurements for all 5 pollutants
const pollutionTypes = [
  { value: 'co', label: 'CO', icon: Car, unit: 'AQI' },
  { value: 'alcohol', label: 'Alcohol', icon: Droplets, unit: 'AQI' },
  { value: 'co2', label: 'CO2', icon: Factory, unit: 'AQI' },
  { value: 'toluene', label: 'Toluene', icon: Droplets, unit: 'AQI' },
  { value: 'nh3', label: 'NH3', icon: Wind, unit: 'AQI' },
];

export function MapPage() {
  const [selectedType, setSelectedType] = useState('co2');
  const [hoveredLocation, setHoveredLocation] = useState(null);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [pointOnMap, setPoints] = useState([]);
  const currentType = pollutionTypes.find(t => t.value === selectedType);
  const Icon = currentType.icon;
  
  const average = 0;
  const max = 0;
  const min = 0;

  useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('/api/data');
          console.log(response.data);
          setPoints(response.data);
          console.log(response.data);
        } catch (error) {
          console.error("Failed to fetch", error);
        }
      };
      fetchData();
    }, []);

  return (
    <div className="h-full  flex-1 flex flex-col bg-gray-100">
      {/* Controls Bar */}
      <div className="bg-white border-b px-4 md:px-6 py-3 positions:absolute z-[9999]">
        <div className="max-w-7xl mx-auto flex items-center justify-between ">
          <div className="flex items-center gap-2">
            <span className="text-xs md:text-sm text-gray-600">Type:</span>
            <Select className="bg-white" value={selectedType} onValueChange={(value) => setSelectedType(value)}>
              <SelectTrigger className="w-32 md:w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white z-[9999] shadow-md border border-gray-200">
                {pollutionTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Mobile Info Toggle */}
          <Button
            variant="outline"
            size="sm"
            className="md:hidden"
            onClick={() => setIsInfoOpen(!isInfoOpen)}
          >
            Info
            {isInfoOpen ? (
              <ChevronDown className="size-4 ml-1" />
            ) : (
              <ChevronUp className="size-4 ml-1" />
            )}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 relative">
        {/* Map area with gradient background */}
        <div className="size-full bg-gradient-to-br from-slate-100 to-slate-200 relative">
          {/* Pollution markers */}
          <PollutionMap points = {pointOnMap} selected={selectedType}></PollutionMap>
        </div>
        
        {/* Desktop Overlay Cards - Right Side */}
      <div className="hidden md:block absolute top-2 right-2 space-y-2 w-52 z-[1000] scale-[0.85] origin-top-right transition-all">
        <Card className="p-2.5 bg-white/95 backdrop-blur shadow-sm border-gray-100">
          <div className="flex items-center gap-2"> 
            <div className="size-8 rounded-md bg-blue-100 flex items-center justify-center shrink-0">
              <Icon className="size-4 text-blue-600" />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] text-gray-500 uppercase leading-none mb-0.5">Type</div>
              <div className="font-bold text-xs truncate uppercase tracking-tight">
                {currentType.label}
              </div>
            </div>
          </div>
        </Card>
        
        <PollutionStats
          pollutionType={currentType.label}
          average={average}
          max={max}
          min={min}
          unit={currentType.unit}
        />
        
        <PollutionLegend pollutionType={currentType.label} />
      </div>

      {/* Mobile Info Panel */}
      {isInfoOpen && (
        <div className="md:hidden absolute bottom-0 left-0 right-0 z-[1000] bg-white border-t shadow-2xl max-h-[50vh] overflow-y-auto">
          <div className="p-3 space-y-3 scale-90 origin-bottom"> 
            <Card className="p-3 bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="size-9 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Icon className="size-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-[11px] text-gray-600">Current Type</div>
                  <div className="font-semibold text-sm">{currentType.label}</div>
                </div>
              </div>
            </Card>
            
            <PollutionStats
              pollutionType={currentType.label}
              average={average}
              max={max}
              min={min}
              unit={currentType.unit}
            />
            
            <PollutionLegend pollutionType={currentType.label} />
          </div>
        </div>
      )}

        {/* Bottom Info Bar - Desktop Only */}
        <div className="hidden md:block absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur border-t px-6 py-3 z-[1000]">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-sm">
            <div className="text-gray-600">
              Last updated: {new Date().toLocaleString()}
            </div>
            <div className="flex items-center gap-6">
              <div>
                <span className="text-gray-600">Monitoring Stations: </span>
                <span className="font-medium">{0}</span>
              </div>
              <div>
                <span className="text-gray-600">Coverage Area: </span>
                <span className="font-medium">468 km²</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}