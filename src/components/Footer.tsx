
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-terminal-gray/30 bg-black py-6">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link to="/" className="font-mono text-pink text-lg no-underline">
              Shivanshu
            </Link>
          </div>
          
          <div className="flex space-x-6">
            <Link to="/" className="text-foreground hover:text-pink">
              About
            </Link>
            <div className="relative group">
              <span className="text-foreground hover:text-orange cursor-pointer">
                Blog
              </span>
              <div className="absolute hidden group-hover:block bottom-full left-0 bg-black shadow-md border border-border overflow-hidden min-w-[160px] animate-fade-in z-10 mb-2">
                <Link to="/blog/personal" className="block px-4 py-2 hover:bg-muted no-underline text-sm text-orange">
                  Personal
                </Link>
                <Link to="/blog/technical" className="block px-4 py-2 hover:bg-muted no-underline text-sm text-orange">
                  Technical
                </Link>
              </div>
            </div>
            <Link to="/resources" className="text-foreground hover:text-yellow">
              Resources
            </Link>
          </div>
        </div>
        
        <div className="mt-8 text-center text-sm text-terminal-gray">
          <p>© {year} Radion. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
