import { Card } from './ui/card';


const legendItems = [
  { label: 'Very High', color: '#8B0000' },
  { label: 'High', color: '#f04f23' },
  { label: 'Moderate-High', color: '#faa022' },
  { label: 'Moderate', color: '#e4d125' },
  { label: 'Low', color: '#41d61f' },
];

export function PollutionLegend({ pollutionType }) {
  return (
    <Card className="p-4 bg-white/95 backdrop-blur">
      <h3 className="font-semibold mb-3">{pollutionType} Levels</h3>
      <div className="space-y-2">
        {legendItems.map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <div
              className="size-4 rounded-full border border-gray-300"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-sm">{item.label}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
