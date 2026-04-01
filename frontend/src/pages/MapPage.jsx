import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { PollutionLegend } from '../components/PollutionLegend';
import { PollutionStats } from '../components/PollutionStats';
import { PollutionData } from '../components/PollutionData';

import { PollutionMap } from '../components/PollutionMap';
import axios from 'axios';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Wind, Droplets, Factory, ChevronUp, ChevronDown, Car } from 'lucide-react';
import { Button } from '../components/ui/button';

// Mock pollution data for different types with percentage positions
// Each location has measurements for all 5 pollutants
const pollutionTypes = [
  { value: 'co', labelKey: 'pollutionTypes.co', icon: Car, unit: 'AQI' },
  { value: 'alcohol', labelKey: 'pollutionTypes.alcohol', icon: Droplets, unit: 'AQI' },
  { value: 'co2', labelKey: 'pollutionTypes.co2', icon: Factory, unit: 'AQI' },
  { value: 'toluene', labelKey: 'pollutionTypes.toluene', icon: Droplets, unit: 'AQI' },
  { value: 'nh3', labelKey: 'pollutionTypes.nh3', icon: Wind, unit: 'AQI' },
];

export function MapPage() {
  const { t } = useTranslation();
  const [selectedType, setSelectedType] = useState('alcohol');
  const [hoveredLocation, setHoveredLocation] = useState(null);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [pointOnMap, setPoints] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchError, setSearchError] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);
  const [mapCenter, setMapCenter] = useState([49.444, 32.06]);
  const [mapZoom, setMapZoom] = useState(12);
  const [dotsCount, setDotsCount] = useState(0);

  const [selectedPoint, setSelectedPoint] = useState('')

  const currentType = pollutionTypes.find((t) => t.value === selectedType);
  const currentTypeLabel = currentType ? t(currentType.labelKey) : '';
  const Icon = currentType?.icon;
  
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axios.get('/api/data');
        console.log(response.data);
        setPoints(response.data);
        
        response = await axios.get('/api/data/counts');
        console.log(response.data);
        setDotsCount(response.data);

      } catch (error) {
        console.error("Failed to fetch", error);
      }
    };
    fetchData();
  }, []);
  
  const stats = (() => {
    if (!Array.isArray(pointOnMap) || pointOnMap.length === 0) {
      return { avg: 0, min: 0, max: 0 };
    }

    let sum = 0;
    let min = Infinity;
    let max = -Infinity;
    let count = 0;

    for (const point of pointOnMap) {
      const value = point[selectedType];

      if (value == null) continue;

      sum += value;
      if (value < min) min = value;
      if (value > max) max = value;
      count++;
    }

    if (count === 0) {
      return { avg: 0, min: 0, max: 0 };
    }

    return {
      avg: Math.round(sum / count),
      min,
      max,
    };
  })();

  const latestTime = (() => {
  if (!Array.isArray(pointOnMap) || pointOnMap.length === 0) return null;

  let maxTime = 0;

  for (const point of pointOnMap) {
    if (!point.time) continue;

    const t = new Date(point.time).getTime();
    if (t > maxTime) maxTime = t;
  }

  return maxTime ? new Date(maxTime) : null;
})();

  const avg = stats.avg;
  const min = stats.min;
  const max = stats.max;
  
  return (
    <div className="h-full  flex-1 flex flex-col bg-gray-100">
      {/* Controls Bar */}
      <div className="bg-white border-b px-4 md:px-6 py-3 positions:absolute z-[9999]">
        <div className="max-w-7xl mx-auto flex items-center justify-between ">
          <div className="flex items-center gap-2 flex-1">
            <span className="text-xs md:text-sm text-gray-600">{t('mapPage.type_label')}</span>
            <Select className="bg-white" value={selectedType} onValueChange={(value) => setSelectedType(value)}>
              <SelectTrigger className="w-32 md:w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white z-[9999] shadow-md border border-gray-200">
                {pollutionTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {t(type.labelKey)}
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
          <PollutionMap points={pointOnMap} selected={selectedType} center={mapCenter} zoom={mapZoom} onPointSelect={setSelectedPoint} />
        </div>


        {/* Desktop Overlay Cards - Left Side */}
        <div className="hidden md:block absolute top-4 left-4 z-[1000] w-[420px] max-w-[calc(100vw-2rem)] max-h-[calc(100vh-140px)] overflow-y-auto">
          {selectedPoint && (
            <PollutionData
              point={selectedPoint}
              onClose={() => setSelectedPoint(null)}
            />
          )}
          
        </div>



        {/* Desktop Overlay Cards - Right Side */}
        <div className="hidden md:block absolute top-4 right-4 space-y-3 w-[300px]">
          
          <PollutionStats
            pollutionType={currentTypeLabel}
            average={avg}
            max={max}
            min={min}
            unit={currentType.unit}
          />
          
          <PollutionLegend pollutionType={currentTypeLabel} />
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
                  <div className="text-[11px] text-gray-600">{t('mapPage.current_type')}</div>
                  <div className="font-semibold text-sm">{currentTypeLabel}</div>
                </div>
              </div>
            </Card>
            
            <PollutionStats
              pollutionType={currentTypeLabel}
              average={avg}
              max={max}
              min={min}
              unit={currentType.unit}
            />
            
            <PollutionLegend pollutionType={currentTypeLabel} />
          </div>
        </div>
      )}

        {/* Bottom Info Bar - Desktop Only */}
        <div className="hidden md:block absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur border-t px-6 py-3 z-[1000]">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-sm">
            <div className="text-gray-600">
              {t('mapPage.last_updated')} {latestTime ? latestTime.toLocaleString() : "—"}
            </div>
            <div className="flex items-center gap-6">
              <div>
                <span className="text-gray-600">{t('mapPage.monitoring_stations')} </span>
                <span className="font-medium">{dotsCount}</span>
              </div>
              <div>
                <span className="text-gray-600">{t('mapPage.coverage_area')} </span>
                <span className="font-medium">72 km²</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}