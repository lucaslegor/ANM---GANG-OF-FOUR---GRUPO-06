/**
 * Hook para cargar y procesar datos de crecimiento bacteriano
 * Utiliza modelos de regresión segmentada pre-calculados
 */

import { useState, useEffect } from 'react';
import { parseCSV, groupByCluster, ClusterData, CLUSTER_OPTIONS } from './data-processor';

export function useGrowthData() {
  const [clusters, setClusters] = useState<Map<string, ClusterData>>(new Map());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const response = await fetch('/data/growth-data.csv');
        
        if (!response.ok) {
          throw new Error('Failed to load data');
        }
        
        const csvText = await response.text();
        const dataPoints = parseCSV(csvText);
        
        // Agrupar por cluster y asignar modelos pre-calculados
        const clustersMap = groupByCluster(dataPoints);
        
        setClusters(clustersMap);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        console.error('Error loading growth data:', err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const getClusterById = (clusterId: string): ClusterData | undefined => {
    const option = CLUSTER_OPTIONS.find(opt => opt.id === clusterId);
    if (!option) return undefined;
    
    const clusterKey = `${option.temperature}-${option.medium}`;
    return clusters.get(clusterKey);
  };

  return {
    clusters,
    loading,
    error,
    getClusterById,
  };
}
