import { Link, useLocation } from 'react-router';
import { Wind, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export function Navbar() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navItems = [
    { path: '/', label: t('nav.map') },
    { path: '/about', label: t('nav.about') },
    { path: '/join', label: t('nav.join') },
    { path: '/donate', label: t('nav.donate') },
  ];

  const languages = [
    { code: 'en', label: 'EN' },
    { code: 'uk', label: 'UK' },
  ];

  
  return (
    <header className="bg-white border-b shadow-sm px-4 md:px-6 py-3 md:py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 md:gap-3">
          <div className="size-8 md:size-10 rounded-lg bg-blue-600 flex items-center justify-center">
            <Wind className="size-5 md:size-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg md:text-2xl font-bold">Air Quality Monitor</h1>
            <p className="text-xs md:text-sm text-gray-600 hidden sm:block">Cherkasy</p>
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-4 py-2 rounded-lg transition-colors ${
                location.pathname === item.path
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {item.label}
            </Link>
          ))}

          {/* Language Switcher */}
          <div className="ml-2 flex items-center gap-1">
            {languages.map((lng) => (
              <button
                key={lng.code}
                type="button"
                onClick={() => i18n.changeLanguage(lng.code)}
                className={`px-2 py-1 rounded-lg text-xs font-semibold transition-colors ${
                  i18n.language === lng.code
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {lng.label}
              </button>
            ))}
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="size-6" />
          ) : (
            <Menu className="size-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden mt-4 pb-4 border-t pt-4">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`px-4 py-3 rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {item.label}
              </Link>
            ))}

            <div className="pt-2 border-t mt-2 flex items-center gap-2">
              {languages.map((lng) => (
                <button
                  key={lng.code}
                  type="button"
                  onClick={() => {
                    i18n.changeLanguage(lng.code);
                    setIsMenuOpen(false);
                  }}
                  className={`flex-1 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    i18n.language === lng.code
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {lng.label}
                </button>
              ))}
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}