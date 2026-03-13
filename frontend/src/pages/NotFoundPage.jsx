import { Link } from 'react-router';
import { AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useTranslation } from 'react-i18next';

export function NotFoundPage() {
  const { t } = useTranslation();
  return (
    <div className="flex-1 flex items-center justify-center bg-gray-50">
      <div className="text-center px-6">
        <div className="flex justify-center mb-6">
          <div className="size-24 rounded-full bg-red-100 flex items-center justify-center">
            <AlertCircle className="size-12 text-red-600" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4">{t('notFoundPage.title')}</h1>
        <p className="text-xl text-gray-600 mb-8">
          {t('notFoundPage.description')}
        </p>
        <Link to="/">
          <Button size="lg">
            {t('notFoundPage.returnButton')}
          </Button>
        </Link>
      </div>
    </div>
  );
}
