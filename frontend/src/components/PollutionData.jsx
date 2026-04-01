import { Card } from "./ui/card";

// Function to get AQI state based on pollution level
function getState(value){
  
  if (value <100) return 'Very low'; // Green - Very low
  if (value <200) return 'Low'; // Yellow - Low
  if (value<300) return 'Moderate'; // Desert - Moderate
  if (value< 400) return 'High';// Orange - High
  return 'Very high'; // Dark red - Very high
}

function getColor(value){
  
  if (value <100) return '#41d61f'; // Green - Low
  if (value <200) return '#e4d125'; // Yellow - Moderate
  if (value<300) return '#faa022'; // Desert - Moderate-hight
  if (value< 400) return '#f04f23';// Orange - Hight
  return '#8B0000'; // Dark red - Very high
}


export function PollutionData({ point }) {
  if (!point?.geom?.coordinates) return null;

  const [lng, lat] = point.geom.coordinates;

  const values = [
    point.co2,
    point.nh3,
    point.alcohol,
    point.toluene,
    point.acetone,
  ].filter(v => v != null);

  const max = values.length ? Math.max(...values) : null;

  return (
    <div className="rounded-3xl bg-white p-5 shadow-xl">
      <div className="flex flex-col gap-5">
        <div className="relative rounded-3xl bg-gray-100 p-5 text-center overflow-hidden border border-dashed border-gray-300">
          <div className="absolute right-3 top-3 rounded-full bg-amber-100 px-3 py-1 text-[11px] font-medium text-amber-700">
            In progress
          </div>

          <div className="opacity-80">
            <h2 className="text-2xl font-semibold leading-tight text-gray-800">
              Street
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Live street metadata soon
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="aspect-square rounded-3xl bg-gray-100 p-4 flex flex-col items-center justify-center">
            <h3 className="text-lg font-semibold">AQI</h3>
            <span className="mt-3 text-5xl font-bold">{max ?? "—"}</span>
            <span className="mt-3 text-lg italic" style={{color: getColor(max)}}>{getState(max)}</span>

          </div>

          <div className="aspect-square rounded-3xl bg-gray-100 p-4 overflow-hidden">
            <h3 className="text-lg font-semibold">Raw data</h3>
            <div className="mt-3 space-y-2 text-sm text-gray-600 break-words leading-6">
              <div>• Pos: {lat.toFixed(4)}, {lng.toFixed(4)}</div>
              <div>• CO2: {(point.co2 ?? 0).toFixed?.(2) ?? "—"}</div>
              <div>• NH3: {(point.nh3 ?? 0).toFixed?.(2) ?? "—"}</div>
              <div>• Alcohol: {(point.alcohol ?? 0).toFixed?.(2) ?? "—"}</div>
              <div>• Toluene: {(point.toluene ?? 0).toFixed?.(2) ?? "—"}</div>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-gray-100 p-5 border border-dashed border-gray-300">
          <div className="absolute right-3 top-3 rounded-full bg-amber-100 px-3 py-1 text-[11px] font-medium text-amber-700">
            Coming soon
          </div>

          <h3 className="text-xl font-semibold text-center text-gray-800 opacity-80">
            Last measurements
          </h3>

          <div className="mt-5 flex h-[140px] items-end justify-between gap-3 opacity-40 blur-[0.3px]">
            {[40, 70, 55, 65, 80, 75].map((v, i) => (
              <div key={i} className="flex flex-1 justify-center">
                <div
                  className="w-10 rounded-t-full bg-indigo-600"
                  style={{ height: `${v * 1.2}px` }}
                />
              </div>
            ))}
          </div>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="rounded-2xl bg-white/80 px-4 py-2 text-sm font-medium text-gray-600 shadow-sm backdrop-blur-sm">
              Chart module under development
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}