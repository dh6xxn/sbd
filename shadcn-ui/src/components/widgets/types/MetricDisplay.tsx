// src/components/widgets/types/MetricDisplay.tsx
import React from 'react';

interface MetricDisplayProps {
  value?: number;
}

export const MetricDisplay: React.FC<MetricDisplayProps> = ({ value }) => {
  if (typeof value !== 'number') {
    return <div className="text-2xl font-bold">-</div>;
  }

  return (
    <div className="text-2xl font-bold">
      ${value.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}
    </div>
  );
};