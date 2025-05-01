// src/components/widgets/WidgetGrid.tsx
import React, { useEffect, useState } from 'react';
import { Responsive, WidthProvider, Layout, Layouts } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { useStore } from '@/store';
import { WidgetBase } from './WidgetBase';

const ResponsiveGridLayout = WidthProvider(Responsive);

export type WidgetData = {
  value?: number;
  labels?: string[];
  datasets?: Array<{
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
  }>;
  tableData?: Record<string, unknown>[];
};

export type Widget = {
  id: string;
  type: string;
  title: string;
  data: WidgetData;
  layout: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
};

export const WidgetGrid: React.FC = () => {
  const { widgets, updateWidgetLayout, isEditMode } = useStore();
  const [layouts, setLayouts] = useState<Layouts>({});

  useEffect(() => {
    const newLayouts = {
      lg: widgets.map((widget) => ({
        i: widget.id,
        ...widget.layout,
      })),
    };
    setLayouts(newLayouts);
  }, [widgets]);

  const handleLayoutChange = (layout: Layout[], layouts: Layouts) => {
    setLayouts(layouts);
    if (!isEditMode) return;

    layout.forEach((item) => {
      updateWidgetLayout(item.i, {
        x: item.x,
        y: item.y,
        w: item.w,
        h: item.h,
      });
    });
  };

  return (
    <ResponsiveGridLayout
      className="layout"
      layouts={layouts}
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
      rowHeight={100}
      onLayoutChange={handleLayoutChange}
      isDraggable={isEditMode}
      isResizable={isEditMode}
    >
      {widgets.map((widget) => (
        <div key={widget.id}>
          <WidgetBase widget={widget} />
        </div>
      ))}
    </ResponsiveGridLayout>
  );
};