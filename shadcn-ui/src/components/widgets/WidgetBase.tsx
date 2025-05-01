// src/components/widgets/WidgetBase.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useStore } from '@/store';
import type { Widget } from './WidgetGrid';
import { MetricDisplay } from './types/MetricDisplay';
import { ChartDisplay } from './types/ChartDisplay';
import { TableDisplay } from './types/TableDisplay';

interface WidgetBaseProps {
  widget: Widget;
}

export const WidgetBase: React.FC<WidgetBaseProps> = ({ widget }) => {
  const { isEditMode, removeWidget } = useStore();

  const renderWidgetContent = () => {
    switch (widget.type) {
      case 'metric':
        return <MetricDisplay value={widget.data.value} />;
      case 'chart':
        return <ChartDisplay data={widget.data} />;
      case 'table':
        return <TableDisplay data={widget.data.tableData} />;
      default:
        return null;
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {widget.title}
        </CardTitle>
        {isEditMode && (
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={() => removeWidget(widget.id)}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {renderWidgetContent()}
      </CardContent>
    </Card>
  );
};