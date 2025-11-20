'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';
import { ChefHat, Star, Clock, MapPin } from 'lucide-react';

export default function Hero() {
  const navigate = useSmartNavigation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const heroImages = [
    '/api/placeholder/1920/1080',
    '/api/placeholder/1920/1080',
    '/api/placeholder/1920/1080',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  const handleReservation = () => {
    navigate('/reservations');
  };

  const handleViewMenu = () => {
    if (typeof window !== 'undefined') {
      const menuSection = document.getElementById('menu');
      if (menuSection) {
        menuSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image Carousel */}
      <div className="absolute inset-0 z-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image}
              alt={`Restaurant ambiance ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-foreground/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Restaurant Badge */}
        <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full px-4 py-2 mb-6">
          <ChefHat className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary-foreground">
            <span data-editable="badge">Fine Dining Experience</span>
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
          <span data-editable="title" className="block">
            Bella Vista
          </span>
          <span
            data-editable="subtitle"
            className="block text-2xl sm:text-3xl lg:text-4xl font-light text-primary-foreground/90 mt-2"
          >
            Authentic Italian Cuisine
          </span>
        </h1>

        {/* Description */}
        <p className="text-lg sm:text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto leading-relaxed">
          <span data-editable="description">
            Experience the finest Italian flavors crafted with passion and tradition. From handmade
            pasta to wood-fired pizzas, every dish tells a story of authentic taste.
          </span>
        </p>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-8 mb-10">
          <div className="flex items-center gap-2 bg-card/20 backdrop-blur-sm rounded-lg px-4 py-2">
            <Star className="w-5 h-5 text-yellow-400 fill-current" />
            <span className="text-card-foreground font-semibold">
              <span data-editable="rating">4.9</span>
            </span>
            <span className="text-card-foreground/70 text-sm">Rating</span>
          </div>

          <div className="flex items-center gap-2 bg-card/20 backdrop-blur-sm rounded-lg px-4 py-2">
            <Clock className="w-5 h-5 text-primary" />
            <span className="text-card-foreground font-semibold">
              <span data-editable="experience">25+</span>
            </span>
            <span className="text-card-foreground/70 text-sm">Years</span>
          </div>

          <div className="flex items-center gap-2 bg-card/20 backdrop-blur-sm rounded-lg px-4 py-2">
            <MapPin className="w-5 h-5 text-destructive" />
            <span className="text-card-foreground font-semibold">
              <span data-editable="location">Downtown</span>
            </span>
            <span className="text-card-foreground/70 text-sm">Location</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={handleReservation}
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <span data-editable="cta-primary">Make Reservation</span>
          </Button>

          <Button
            onClick={handleViewMenu}
            variant="outline"
            size="lg"
            className="bg-card/20 backdrop-blur-sm border-card text-card-foreground hover:bg-card/30 px-8 py-3 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <span data-editable="cta-secondary">View Menu</span>
          </Button>
        </div>

        {/* Opening Hours */}
        <div className="mt-12 bg-card/10 backdrop-blur-sm rounded-lg p-6 max-w-md mx-auto">
          <h3 className="text-card-foreground font-semibold mb-3">
            <span data-editable="hours-title">Opening Hours</span>
          </h3>
          <div className="space-y-1 text-card-foreground/80">
            <div className="flex justify-between">
              <span data-editable="weekdays">Mon - Thu:</span>
              <span data-editable="weekdays-hours">5:00 PM - 10:00 PM</span>
            </div>
            <div className="flex justify-between">
              <span data-editable="weekend">Fri - Sat:</span>
              <span data-editable="weekend-hours">5:00 PM - 11:00 PM</span>
            </div>
            <div className="flex justify-between">
              <span data-editable="sunday">Sunday:</span>
              <span data-editable="sunday-hours">4:00 PM - 9:00 PM</span>
            </div>
          </div>
        </div>
      </div>

      {/* Image Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentImageIndex
                ? 'bg-primary scale-125'
                : 'bg-primary-foreground/50 hover:bg-primary-foreground/70'
            }`}
            aria-label={`View image ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-foreground/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary-foreground/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
