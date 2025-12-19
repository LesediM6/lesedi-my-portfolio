import React, { useState } from 'react';
import { Menu, X, Terminal } from 'lucide-react';
import { ThemeToggle } from './UiHelpers';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Certificates', href: '#certificates' },
    { name: 'Resume', href: '#resume' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-300 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20 transition-all">
          {/* Logo linked to top of page */}
          <div className="flex-shrink-0">
            <a href="#home" className="flex items-center gap-2 group p-2 -ml-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors" onClick={() => setIsOpen(false)}>
              <Terminal className="h-8 w-8 text-teal-600 group-hover:text-teal-700 dark:text-teal-400 dark:group-hover:text-teal-300 transition-colors" />
              <span className="font-bold text-xl text-slate-900 dark:text-slate-50 tracking-tight group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors">Lesedi.M</span>
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-baseline space-x-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-slate-50 dark:hover:bg-slate-900 px-4 py-2 rounded-md text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  {link.name}
                </a>
              ))}
            </div>
            <div className="h-6 w-px bg-slate-200 dark:bg-slate-700"></div>
            <ThemeToggle />
          </div>
          
          {/* Mobile menu button & Theme Toggle */}
          <div className="-mr-2 flex items-center gap-4 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center h-12 w-12 rounded-md text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500 transition-colors"
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isOpen && (
        <div className="md:hidden absolute top-[64px] left-0 w-full bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 shadow-lg animate-in slide-in-from-top-5 duration-200 z-50 h-[calc(100vh-64px)] overflow-y-auto">
          <div className="px-4 py-6 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-slate-700 dark:text-slate-200 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-50 dark:hover:bg-slate-900 block px-4 py-4 rounded-xl text-lg font-medium transition-colors border-b border-slate-50 dark:border-slate-900 last:border-0"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;