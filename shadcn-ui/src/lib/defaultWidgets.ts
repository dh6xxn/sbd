// src/lib/defaultWidgets.ts
import { Widget } from '@/components/widgets/WidgetGrid';
import { sampleMetrics, chartData } from '@/data/sampleData';

export const defaultWidgets: Widget[] = [
  {
    id: 'sales-overview',
    type: 'metric',
    title: 'Total Sales Today',
    data: { value: sampleMetrics.sales[4].value },
    layout: { x: 0, y: 0, w: 3, h: 2 },
  },
  {
    id: 'orders-pending',
    type: 'metric',
    title: 'Pending Orders',
    data: { value: sampleMetrics.orders.filter(o => o.status === 'pending').length },
    layout: { x: 3, y: 0, w: 3, h: 2 },
  },
  {
    id: 'sales-chart',
    type: 'chart',
    title: 'Sales Trend',
    data: chartData,
    layout: { x: 0, y: 2, w: 6, h: 4 },
  },
  {
    id: 'recent-orders',
    type: 'table',
    title: 'Recent Orders',
    data: {
      tableData: sampleMetrics.orders.map(order => ({
        id: order.id,
        total: `$${order.total.toFixed(2)}`,
        status: order.status,
        created: new Date(order.created_at).toLocaleString(),
      })),
    },
    layout: { x: 6, y: 0, w: 6, h: 6 },
  },
  {
    id: 'low-stock',
    type: 'table',
    title: 'Low Stock Items',
    data: {
      tableData: sampleMetrics.inventory
        .filter(item => item.stock < item.reorder_point)
        .map(item => ({
          id: item.id,
          name: item.name,
          stock: item.stock,
          reorder_point: item.reorder_point,
        })),
    },
    layout: { x: 0, y: 6, w: 6, h: 4 },
  },
];