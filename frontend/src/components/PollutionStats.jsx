import { Card } from './ui/card';
import { useTranslation } from 'react-i18next';



export function PollutionStats({ pollutionType, average, max, min, unit }) {
  const { t } = useTranslation();
  return (
    <Card className="p-4 bg-white/95 backdrop-blur">
      <h3 className="font-semibold mb-3">{t('pollutionStats.title')}</h3>
      <div className="space-y-3">
        <div>
          <div className="text-sm text-gray-600">{t('pollutionStats.average')}</div>
          <div className="text-2xl font-semibold">{average.toFixed(1)} {unit}</div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-gray-600">{t('pollutionStats.max')}</div>
            <div className="text-lg font-medium">{max} {unit}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">{t('pollutionStats.min')}</div>
            <div className="text-lg font-medium">{min} {unit}</div>
          </div>
        </div>
      </div>
    </Card>
  );
}
