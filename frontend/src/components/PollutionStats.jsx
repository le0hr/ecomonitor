import { Card } from './ui/card';
import { useTranslation } from 'react-i18next';

export function PollutionStats({ pollutionType, average, max, min, unit }) {
  const { t } = useTranslation();

  return (
    <Card className="p-5 bg-white/95 backdrop-blur rounded-2xl shadow-sm">
      <h3 className="font-semibold text-lg mb-4">
        {t('pollutionStats.title')}
      </h3>

      <div className="space-y-4">
        <div>
          <div className="text-base text-gray-600">
            {t('pollutionStats.average')}
          </div>
          <div className="text-3xl font-semibold">
            {average.toFixed(1)} {unit}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div>
            <div className="text-base text-gray-600">
              {t('pollutionStats.max')}
            </div>
            <div className="text-xl font-medium">
              {max} {unit}
            </div>
          </div>

          <div>
            <div className="text-base text-gray-600">
              {t('pollutionStats.min')}
            </div>
            <div className="text-xl font-medium">
              {min} {unit}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}