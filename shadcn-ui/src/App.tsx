// src/App.tsx
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { LoginForm } from '@/components/auth/LoginForm';
import { WidgetGrid } from '@/components/widgets/WidgetGrid';
import { useStore } from '@/store';
import { Edit2, Save } from 'lucide-react';
import { supabase } from '@/lib/supabase';

function App() {
  const { user, setUser, isEditMode, toggleEditMode } = useStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
      } catch (error) {
        console.error('Error checking auth status:', error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, [setUser]);

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <LoginForm />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">SmartRetailer OS</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {user.email}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleEditMode}
            >
              {isEditMode ? (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Layout
                </>
              ) : (
                <>
                  <Edit2 className="h-4 w-4 mr-2" />
                  Edit Layout
                </>
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => supabase.auth.signOut()}
            >
              Sign Out
            </Button>
          </div>
        </header>
        
        <main>
          <WidgetGrid />
        </main>
      </div>
    </div>
  );
}

export default App;