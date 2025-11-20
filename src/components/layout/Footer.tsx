'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';
import { ChefHat, MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter } from 'lucide-react';

interface FooterLink {
  label: string;
  route: string;
}

interface SocialLink {
  platform: string;
  url: string;
  icon: React.ReactNode;
}

interface FooterData {
  company?: FooterLink[];
  legal?: FooterLink[];
  social?: SocialLink[];
  contact?: {
    address: string;
    phone: string;
    email: string;
    hours: string;
  };
  newsletter?: {
    title: string;
    description: string;
  };
}

interface FooterProps {
  footerData?: FooterData;
}

export default function Footer({ footerData }: FooterProps) {
  const navigate = useSmartNavigation();

  // Default data for elegant restaurant footer
  const defaultFooterData: FooterData = {
    company: [
      { label: 'About Us', route: '/about' },
      { label: 'Our Story', route: '/story' },
    ],
    legal: [
      { label: 'Privacy Policy', route: '/privacy' },
      { label: 'Terms of Service', route: '/terms' },
    ],
    social: [
      { platform: 'Facebook', url: '#', icon: <Facebook className="w-5 h-5" /> },
      { platform: 'Instagram', url: '#', icon: <Instagram className="w-5 h-5" /> },
      { platform: 'Twitter', url: '#', icon: <Twitter className="w-5 h-5" /> },
    ],
    contact: {
      address: '123 Culinary Street, Gourmet District',
      phone: '+1 (555) 123-4567',
      email: 'hello@restaurant.com',
      hours: 'Mon-Sun: 5:00 PM - 11:00 PM',
    },
    newsletter: {
      title: 'Stay Updated',
      description: 'Subscribe to receive our latest menu updates and special offers',
    },
  };

  const data = footerData || defaultFooterData;

  return (
    <section id="footer" className="bg-card text-card-foreground border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand & Description */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <ChefHat className="w-8 h-8 text-primary" />
                <span className="text-xl font-bold text-foreground" data-editable="brandName">
                  Saveur
                </span>
              </div>
              <p
                className="text-muted-foreground text-sm leading-relaxed mb-6"
                data-editable="brandDescription"
              >
                Experience culinary excellence with our carefully crafted dishes, made from the
                finest ingredients and served in an elegant atmosphere.
              </p>

              {/* Social Links */}
              {data.social && (
                <div className="flex space-x-4">
                  {data.social.map(social => (
                    <Button
                      key={social.platform}
                      variant="outline"
                      size="sm"
                      className="w-10 h-10 p-0 border-border hover:bg-accent hover:text-accent-foreground"
                      onClick={() => window.open(social.url, '_blank')}
                    >
                      {social.icon}
                    </Button>
                  ))}
                </div>
              )}
            </div>

            {/* Contact Information */}
            {data.contact && (
              <div className="lg:col-span-1">
                <h3
                  className="text-lg font-semibold text-foreground mb-4"
                  data-editable="contactTitle"
                >
                  Contact Info
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground" data-editable="address">
                      {data.contact.address}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm text-muted-foreground" data-editable="phone">
                      {data.contact.phone}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm text-muted-foreground" data-editable="email">
                      {data.contact.email}
                    </span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Clock className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground" data-editable="hours">
                      {data.contact.hours}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Company Links */}
            {data.company && (
              <div className="lg:col-span-1">
                <h3
                  className="text-lg font-semibold text-foreground mb-4"
                  data-editable="companyTitle"
                >
                  Company
                </h3>
                <div className="space-y-2">
                  {data.company.map(link => (
                    <button
                      key={link.route}
                      onClick={() => navigate(link.route)}
                      className="block text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                      data-editable={`company_${link.label.toLowerCase().replace(' ', '_')}`}
                    >
                      {link.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Newsletter Signup */}
            {data.newsletter && (
              <div className="lg:col-span-1">
                <h3
                  className="text-lg font-semibold text-foreground mb-4"
                  data-editable="newsletterTitle"
                >
                  {data.newsletter.title}
                </h3>
                <p
                  className="text-sm text-muted-foreground mb-4"
                  data-editable="newsletterDescription"
                >
                  {data.newsletter.description}
                </p>
                <div className="space-y-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 text-sm bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  />
                  <Button
                    size="sm"
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    <span data-editable="subscribeButton">Subscribe</span>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        <Separator className="bg-border" />

        {/* Bottom Footer */}
        <div className="py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="text-sm text-muted-foreground">
              <span data-editable="copyright">© 2024 Saveur Restaurant. All rights reserved.</span>
            </div>

            {/* Legal Links */}
            {data.legal && (
              <div className="flex space-x-6">
                {data.legal.map((link, index) => (
                  <React.Fragment key={link.route}>
                    <button
                      onClick={() => navigate(link.route)}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                      data-editable={`legal_${link.label.toLowerCase().replace(' ', '_')}`}
                    >
                      {link.label}
                    </button>
                    {index < data.legal!.length - 1 && (
                      <span className="text-muted-foreground">•</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
