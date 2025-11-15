import { useState, useEffect, useCallback } from 'react';
import { fetchCSV } from '../utils/csvParser';
import { EQUIPMENT_CSV_URL, REFRESH_INTERVAL } from '../utils/constants';

/**
 * Custom hook to fetch and manage equipment data from Google Sheets CSV
 * @param {boolean} autoRefresh - Whether to auto-refresh data
 * @returns {Object} Equipment data, loading state, error, and refresh function
 */
export function useEquipmentData(autoRefresh = true) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const equipmentData = await fetchCSV(EQUIPMENT_CSV_URL);
      setData(equipmentData);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err.message || 'Failed to fetch equipment data');
      console.error('Error fetching equipment data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Auto-refresh
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      fetchData();
    }, REFRESH_INTERVAL);

    return () => clearInterval(interval);
  }, [autoRefresh, fetchData]);

  return {
    data,
    loading,
    error,
    lastUpdated,
    refresh: fetchData,
  };
}

