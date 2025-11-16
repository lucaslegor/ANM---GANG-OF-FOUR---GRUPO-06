import { useState, useEffect } from 'react';
import { parseCSV, groupByCluster, fitModel, ClusterData, CLUSTER_OPTIONS } from './data-processor';

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
        const clustersMap = groupByCluster(dataPoints);
        
        // Ajustar modelos para cada cluster
        const fittedClusters = new Map<string, ClusterData>();
        for (const [key, cluster] of clustersMap.entries()) {
          // Usar grado 5 para mejor ajuste
          const fitted = fitModel(cluster, 5);
          fittedClusters.set(key, fitted);
        }
        
        setClusters(fittedClusters);
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

