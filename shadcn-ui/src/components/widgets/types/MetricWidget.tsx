// src/components/widgets/types/MetricWidget.tsx
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { api } from '@/services/api';
import type { MetricData } from '@/services/api';

interface MetricWidgetProps {
  title: string;
  metricType: string;
  timeRange: string;
}

export const MetricWidget: React.FC<MetricWidgetProps> = ({
  title,
  metricType,
  timeRange,
}) => {
  const [data, setData] = useState<MetricData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const metrics = await api.getMetrics(metricType, timeRange);
      if (metrics.length > 0) {
        setData(metrics[0]);
      }
    };

    fetchData();

    const unsubscribe = api.subscribeToMetrics((newData) => {
      if (newData.metric_type === metricType) {
        setData(newData);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [metricType, timeRange]);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {data ? data.value.toLocaleString() : '-'}
        </div>
      </CardContent>
    </Card>
  );
};