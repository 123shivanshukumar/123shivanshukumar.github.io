
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useTheme } from '../components/ThemeProvider';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { theme } = useTheme();
  
  return (
    <div className={`min-h-screen flex flex-col bg-black text-foreground ${theme === 'light' ? 'light-mode' : 'dark-mode'}`}>
      <Navbar />
      <div className="container mx-auto px-4 pt-4 pb-8">
        <h1 className="text-2xl font-mono mb-2">Shivanshu Kumar's Homepage</h1>
        <div className="border-b border-dashed border-terminal-gray/30 mb-6"></div>
        <main className="animate-fade-in">{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
