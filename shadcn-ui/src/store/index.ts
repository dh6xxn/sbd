// src/store/index.ts
import { create } from 'zustand';
import type { User } from '@/lib/supabase';
import type { Widget } from '@/components/widgets/WidgetGrid';
import { defaultWidgets } from '@/lib/defaultWidgets';

interface Store {
  user: User | null;
  isEditMode: boolean;
  widgets: Widget[];
  setUser: (user: User | null) => void;
  toggleEditMode: () => void;
  addWidget: (widget: Widget) => void;
  removeWidget: (id: string) => void;
  updateWidgetLayout: (id: string, layout: Widget['layout']) => void;
}

export const useStore = create<Store>((set) => ({
  user: null,
  isEditMode: false,
  widgets: defaultWidgets,

  setUser: (user) => set({ user }),
  
  toggleEditMode: () => set((state) => ({ isEditMode: !state.isEditMode })),
  
  addWidget: (widget) => set((state) => ({
    widgets: [...state.widgets, widget],
  })),
  
  removeWidget: (id) => set((state) => ({
    widgets: state.widgets.filter((w) => w.id !== id),
  })),
  
  updateWidgetLayout: (id, layout) => set((state) => ({
    widgets: state.widgets.map((w) => 
      w.id === id ? { ...w, layout } : w
    ),
  })),
}));