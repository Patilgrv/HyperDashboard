import type { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface DashboardLayoutProps {
  locations: string[];
  selectedLocation: string;
  onLocationChange: (location: string) => void;
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
  children: ReactNode;
}

export function DashboardLayout({
  locations,
  selectedLocation,
  onLocationChange,
  theme,
  onThemeToggle,
  children,
}: DashboardLayoutProps) {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard__main">
        <Header
          locations={locations}
          selectedLocation={selectedLocation}
          onLocationChange={onLocationChange}
          theme={theme}
          onThemeToggle={onThemeToggle}
        />
        <main className="dashboard__content">{children}</main>
      </div>
    </div>
  );
}
