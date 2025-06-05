
"use client";

import { useState, useEffect } from 'react';
import { LoginForm } from '@/components/admin/login-form';
import { AdminDashboard } from '@/components/admin/admin-dashboard';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Lock } from "lucide-react";

const AUTH_STORAGE_KEY = 'draftport_admin_auth';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const storedAuthState = localStorage.getItem(AUTH_STORAGE_KEY);
    if (storedAuthState === 'true') {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    localStorage.setItem(AUTH_STORAGE_KEY, 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  if (isAuthenticated === undefined) {
    return (
      <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
        <Card className="w-full max-w-md text-center shadow-xl bg-card text-card-foreground">
          <CardHeader>
             <div className="mx-auto bg-muted text-muted-foreground rounded-full p-3 w-fit mb-4">
                <Lock className="h-8 w-8 animate-pulse text-primary" />
              </div>
            <CardTitle className="font-headline text-2xl">Loading Admin Panel</CardTitle>
            <CardDescription className="text-muted-foreground">
              Checking authentication status...
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-10rem)] bg-background">
      {isAuthenticated ? (
        <AdminDashboard onLogout={handleLogout} />
      ) : (
        <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center">
          <LoginForm onLoginSuccess={handleLoginSuccess} />
        </div>
      )}
    </div>
  );
}
