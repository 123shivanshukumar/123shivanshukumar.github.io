
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Github, Linkedin, Twitter } from 'lucide-react';
import { Input } from './ui/input';
import { Switch } from './ui/switch';
import { useTheme } from './ThemeProvider';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  
  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') {
      return true;
    }
    return location.pathname.startsWith(path) && path !== '/';
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results page or filter current page
      console.log(`Searching for: ${searchQuery}`);
      // For now, we'll just navigate to the blog page with a query parameter
      navigate(`/blog?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="bg-background py-4">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between space-x-4">
          <nav className="flex items-center space-x-6">
            <Link to="/" className={`terminal-link text-lg ${isActive('/') ? 'text-pink' : ''}`}>
              Home
            </Link>
            
            <div className="relative group">
              <span className={`terminal-link-orange text-lg cursor-pointer ${isActive('/blog') ? 'text-orange' : ''}`}>
                Blog
              </span>
              <div className="absolute hidden group-hover:block top-full left-0 bg-black shadow-md border border-border overflow-hidden min-w-[160px] animate-fade-in z-10">
                <Link to="/blog/personal" className="block px-4 py-2 hover:bg-muted no-underline text-sm text-orange">
                  Personal
                </Link>
                <Link to="/blog/technical" className="block px-4 py-2 hover:bg-muted no-underline text-sm text-orange">
                  Technical
                </Link>
              </div>
            </div>
            
            <Link to="/resources" className={`terminal-link-yellow text-lg ${isActive('/resources') ? 'text-yellow' : ''}`}>
              Resources
            </Link>
          </nav>
          
          <div className="flex-1 mx-4">
            <form onSubmit={handleSearch} className="relative">
              <Input 
                type="text" 
                placeholder="Search..." 
                className="w-full bg-black border-border text-foreground pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <Search className="h-4 w-4 text-muted-foreground" />
              </button>
            </form>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-xs text-muted-foreground">🌙</span>
              <Switch 
                checked={theme === 'dark'}
                onCheckedChange={toggleTheme}
                className="data-[state=checked]:bg-pink"
              />
              <span className="text-xs text-muted-foreground">☀️</span>
            </div>
            
            <a href="https://x.com/shivan123shu" target="_blank" rel="noopener noreferrer" className="h-6 w-6 text-foreground hover:text-pink flex items-center justify-center">
              <Twitter size={20} />
            </a>
            <a href="https://github.com/123shivanshukumar" target="_blank" rel="noopener noreferrer" className="h-6 w-6 text-foreground hover:text-pink flex items-center justify-center">
              <Github size={20} />
            </a>
            <a href="https://linkedin.com/in/shivanshu-kumar-b4814928a" target="_blank" rel="noopener noreferrer" className="h-6 w-6 text-foreground hover:text-pink flex items-center justify-center">
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
