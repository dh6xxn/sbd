// src/services/api.ts
import { supabase } from '../lib/supabase';

export type MetricData = {
  id: string;
  value: number;
  timestamp: string;
  metric_type: string;
};

export type OrderData = {
  id: string;
  total: number;
  status: string;
  customer_id: string;
  created_at: string;
};

class ApiService {
  async subscribeToMetrics(callback: (data: MetricData) => void) {
    const channel = supabase
      .channel('metrics')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'metrics',
      }, (payload) => {
        callback(payload.new as MetricData);
      })
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }

  async getMetrics(type: string, timeRange: string): Promise<MetricData[]> {
    const { data, error } = await supabase
      .from('metrics')
      .select('*')
      .eq('metric_type', type)
      .gte('timestamp', timeRange)
      .order('timestamp', { ascending: false });

    if (error) throw error;
    return data;
  }

  async getOrders(status?: string): Promise<OrderData[]> {
    let query = supabase.from('orders').select('*');
    if (status) {
      query = query.eq('status', status);
    }
    
    const { data, error } = await query.order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  }
}

export const api = new ApiService();