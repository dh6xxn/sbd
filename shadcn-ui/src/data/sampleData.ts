// src/data/sampleData.ts
export const sampleMetrics = {
  sales: [
    { timestamp: '2024-03-10', value: 15234.56 },
    { timestamp: '2024-03-11', value: 18456.78 },
    { timestamp: '2024-03-12', value: 16789.23 },
    { timestamp: '2024-03-13', value: 19876.45 },
    { timestamp: '2024-03-14', value: 21345.67 },
  ],
  orders: [
    { id: '1', total: 234.56, status: 'completed', customer_id: 'c1', created_at: '2024-03-14T10:30:00Z' },
    { id: '2', total: 567.89, status: 'processing', customer_id: 'c2', created_at: '2024-03-14T11:45:00Z' },
    { id: '3', total: 123.45, status: 'completed', customer_id: 'c3', created_at: '2024-03-14T09:15:00Z' },
    { id: '4', total: 789.12, status: 'pending', customer_id: 'c4', created_at: '2024-03-14T13:20:00Z' },
  ],
  inventory: [
    { id: 'p1', name: 'Product A', stock: 156, reorder_point: 50 },
    { id: 'p2', name: 'Product B', stock: 43, reorder_point: 75 },
    { id: 'p3', name: 'Product C', stock: 89, reorder_point: 100 },
    { id: 'p4', name: 'Product D', stock: 234, reorder_point: 150 },
  ],
};

export const chartData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  datasets: [
    {
      label: 'Daily Sales',
      data: [15234.56, 18456.78, 16789.23, 19876.45, 21345.67],
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
    },
  ],
};