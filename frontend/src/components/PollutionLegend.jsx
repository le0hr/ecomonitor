import { Card } from './ui/card';
import { useTranslation } from 'react-i18next';


const legendItems = [
  { labelKey: 'pollutionLegend.veryHigh', color: '#8B0000' },
  { labelKey: 'pollutionLegend.high', color: '#f04f23' },
  { labelKey: 'pollutionLegend.moderateHigh', color: '#faa022' },
  { labelKey: 'pollutionLegend.moderate', color: '#e4d125' },
  { labelKey: 'pollutionLegend.low', color: '#41d61f' },
];

export function PollutionLegend({ pollutionType }) {
  const { t } = useTranslation();
  return (
    <Card className="p-4 bg-white/95 backdrop-blur">
      <h3 className="font-semibold mb-3">{pollutionType} {t('pollutionLegend.levels')}</h3>
      <div className="space-y-2">
        {legendItems.map((item) => (
          <div key={item.labelKey} className="flex items-center gap-2">
            <div
              className="size-4 rounded-full border border-gray-300"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-sm">{t(item.labelKey)}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
