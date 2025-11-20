'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';
import { Menu, X, ChefHat } from 'lucide-react';

interface NavigationItem {
  label: string;
  route: string;
}

interface NavigationData {
  items: NavigationItem[];
}

interface NavigationProps {
  navigationData: NavigationData;
}

export default function Navigation({ navigationData }: NavigationProps) {
  const navigate = useSmartNavigation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const handleNavClick = (route: string) => {
    navigate(route);
    setIsOpen(false);
  };

  return (
    <section id="navigation" className="fixed top-0 left-0 right-0 z-50">
      <nav
        className={`transition-all duration-300 ${
          isScrolled
            ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="bg-primary text-primary-foreground p-2 rounded-lg">
                <ChefHat className="h-6 w-6" />
              </div>
              <span className="text-xl lg:text-2xl font-bold text-foreground">
                <span data-editable="brandName">Bella Vista</span>
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigationData.items.map(item => (
                <Button
                  key={item.route}
                  variant="ghost"
                  onClick={() => handleNavClick(item.route)}
                  className="text-foreground hover:text-primary hover:bg-accent/50 font-medium transition-colors duration-200 text-base"
                >
                  <span data-editable={`nav-${item.label.toLowerCase()}`}>{item.label}</span>
                </Button>
              ))}

              {/* CTA Button */}
              <Button
                onClick={() => navigate('#restaurant-menu')}
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2 font-medium shadow-md hover:shadow-lg transition-all duration-200"
              >
                <span data-editable="ctaText">Reserve Table</span>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(!isOpen)}
                className="text-foreground hover:bg-accent/50 p-2"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isOpen && (
            <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigationData.items.map(item => (
                  <Button
                    key={item.route}
                    variant="ghost"
                    onClick={() => handleNavClick(item.route)}
                    className="w-full text-left justify-start text-foreground hover:text-primary hover:bg-accent/50 font-medium py-3 px-4"
                  >
                    <span data-editable={`nav-mobile-${item.label.toLowerCase()}`}>
                      {item.label}
                    </span>
                  </Button>
                ))}

                {/* Mobile CTA */}
                <div className="pt-4 pb-2">
                  <Button
                    onClick={() => handleNavClick('#restaurant-menu')}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium py-3 shadow-md"
                  >
                    <span data-editable="mobileCta">Reserve Table</span>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </section>
  );
}
