import { MdDarkMode, MdLightMode, MdRefresh } from 'react-icons/md';
import { useTheme } from '../contexts/ThemeContext';
import { formatDistanceToNow } from 'date-fns';

export function Header({ lastUpdated, onRefresh, refreshing }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Frank Worrell Hall
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Maintenance Dashboard
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Last Updated */}
            {lastUpdated && (
              <div className="hidden md:block text-right mr-2">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Last updated
                </p>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {formatDistanceToNow(lastUpdated, { addSuffix: true })}
                </p>
              </div>
            )}

            {/* Refresh Button */}
            <button
              onClick={onRefresh}
              disabled={refreshing}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Refresh data"
            >
              <MdRefresh
                size={24}
                className={refreshing ? 'animate-spin' : ''}
              />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              title="Toggle theme"
            >
              {isDark ? <MdLightMode size={24} /> : <MdDarkMode size={24} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

