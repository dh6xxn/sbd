// src/components/layout/MainLayout.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { useStore } from '@/store';
import { WidgetGrid } from '../widgets/WidgetGrid';

export const MainLayout: React.FC = () => {
  const { isEditMode, toggleEditMode, user } = useStore();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border p-4">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">SmartRetailer OS</h1>
          <div className="flex items-center gap-4">
            <Button
              variant={isEditMode ? "destructive" : "secondary"}
              onClick={toggleEditMode}
            >
              {isEditMode ? "Exit Edit Mode" : "Edit Dashboard"}
            </Button>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {user?.email}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-4">
        <WidgetGrid />
      </main>

      {/* Footer */}
      <footer className="border-t border-border p-4">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          © 2024 SmartRetailer OS. All rights reserved.
        </div>
      </footer>
    </div>
  );
};