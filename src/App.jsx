import { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { FilterBar } from './components/FilterBar';
import { ClusterView } from './components/ClusterView';
import { ReportModal } from './components/ReportModal';
import { FloatingActionButton } from './components/FloatingActionButton';
import { LoadingSkeleton } from './components/LoadingSkeleton';
import { OfflineNotice } from './components/OfflineNotice';
import { useEquipmentData } from './hooks/useEquipmentData';
import { ThemeProvider } from './contexts/ThemeContext';

function AppContent() {
  const { data, loading, error, lastUpdated, refresh } = useEquipmentData(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filters, setFilters] = useState({
    cluster: '',
    type: '',
    status: '',
    search: '',
  });
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportModalType, setReportModalType] = useState('issue');
  const [selectedEquipment, setSelectedEquipment] = useState(null);

  // Handle manual refresh
  const handleRefresh = async () => {
    setRefreshing(true);
    await refresh();
    setTimeout(() => setRefreshing(false), 500);
  };

  // Filter equipment based on filters
  const filteredEquipment = useMemo(() => {
    return data.filter((item) => {
      // Cluster filter
      if (filters.cluster && item.cluster !== filters.cluster) {
        return false;
      }

      // Type filter
      if (filters.type && item.type !== filters.type) {
        return false;
      }

      // Status filter
      if (filters.status && item.status !== filters.status) {
        return false;
      }

      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesId = item.id?.toLowerCase().includes(searchLower);
        if (!matchesId) {
          return false;
        }
      }

      return true;
    });
  }, [data, filters]);

  // Handle report issue
  const handleReportIssue = (equipment = null, type = 'issue') => {
    setSelectedEquipment(equipment);
    setReportModalType(type);
    setReportModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <OfflineNotice />
      
      <Header
        lastUpdated={lastUpdated}
        onRefresh={handleRefresh}
        refreshing={refreshing}
      />

      <main className="container mx-auto px-4 py-6">
        {error && (
          <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg mb-6">
            <p className="font-medium">Error loading equipment data</p>
            <p className="text-sm mt-1">{error}</p>
            <p className="text-sm mt-2">
              Please make sure you've configured your Google Sheets CSV URL in{' '}
              <code className="bg-red-200 dark:bg-red-800 px-2 py-1 rounded">
                src/utils/constants.js
              </code>
            </p>
          </div>
        )}

        {loading && !data.length ? (
          <LoadingSkeleton />
        ) : (
          <>
            <FilterBar filters={filters} onFilterChange={setFilters} />
            <ClusterView
              equipment={filteredEquipment}
              onReportIssue={(equipment) => handleReportIssue(equipment, 'status')}
            />
          </>
        )}
      </main>

      <FloatingActionButton onClick={() => handleReportIssue(null)} />

      <ReportModal
        isOpen={reportModalOpen}
        onClose={() => {
          setReportModalOpen(false);
          setSelectedEquipment(null);
        }}
        prefilledEquipment={selectedEquipment}
        type={reportModalType}
      />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
