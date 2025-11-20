'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Star, Leaf, Flame, Clock } from 'lucide-react';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  dietary: ('vegetarian' | 'vegan' | 'gluten-free' | 'spicy')[];
  popular?: boolean;
  prepTime?: string;
}

interface MenuCategory {
  id: string;
  name: string;
  description: string;
  items: MenuItem[];
}

export default function Restaurantmenu() {
  const [selectedCategory, setSelectedCategory] = useState('appetizers');

  const menuCategories: MenuCategory[] = [
    {
      id: 'appetizers',
      name: 'Appetizers',
      description: 'Start your culinary journey with our exquisite starters',
      items: [
        {
          id: 'truffle-arancini',
          name: 'Truffle Arancini',
          description:
            'Crispy risotto balls filled with wild mushrooms and truffle oil, served with parmesan cream',
          price: 18,
          dietary: ['vegetarian'],
          popular: true,
          prepTime: '15 min',
        },
        {
          id: 'tuna-tartare',
          name: 'Yellowfin Tuna Tartare',
          description:
            'Fresh diced tuna with avocado, citrus, and sesame oil on crispy wonton chips',
          price: 24,
          dietary: ['gluten-free'],
          prepTime: '10 min',
        },
        {
          id: 'burrata',
          name: 'Burrata & Prosciutto',
          description:
            'Creamy burrata cheese with San Daniele prosciutto, fresh figs, and honey drizzle',
          price: 22,
          dietary: ['vegetarian'],
          prepTime: '8 min',
        },
      ],
    },
    {
      id: 'mains',
      name: 'Main Courses',
      description: 'Our signature dishes crafted with the finest ingredients',
      items: [
        {
          id: 'wagyu-steak',
          name: 'Wagyu Ribeye',
          description:
            'Premium A5 Wagyu ribeye with roasted bone marrow, seasonal vegetables, and red wine jus',
          price: 85,
          dietary: ['gluten-free'],
          popular: true,
          prepTime: '25 min',
        },
        {
          id: 'lobster-risotto',
          name: 'Lobster Risotto',
          description: 'Creamy arborio rice with fresh Maine lobster, saffron, and microgreens',
          price: 48,
          dietary: ['gluten-free'],
          prepTime: '30 min',
        },
        {
          id: 'duck-confit',
          name: 'Duck Confit',
          description:
            'Slow-cooked duck leg with cherry gastrique, roasted fingerling potatoes, and wilted spinach',
          price: 42,
          dietary: ['gluten-free'],
          prepTime: '20 min',
        },
        {
          id: 'vegan-wellington',
          name: 'Mushroom Wellington',
          description:
            'Flaky pastry filled with wild mushrooms, lentils, and herbs, served with red wine reduction',
          price: 32,
          dietary: ['vegan'],
          prepTime: '35 min',
        },
      ],
    },
    {
      id: 'desserts',
      name: 'Desserts',
      description: 'Sweet endings to complete your dining experience',
      items: [
        {
          id: 'chocolate-souffle',
          name: 'Dark Chocolate Soufflé',
          description: 'Warm chocolate soufflé with vanilla bean ice cream and gold leaf',
          price: 16,
          dietary: ['vegetarian'],
          popular: true,
          prepTime: '20 min',
        },
        {
          id: 'tiramisu',
          name: 'Classic Tiramisu',
          description:
            'Traditional Italian dessert with espresso-soaked ladyfingers and mascarpone',
          price: 14,
          dietary: ['vegetarian'],
          prepTime: '5 min',
        },
        {
          id: 'lemon-tart',
          name: 'Meyer Lemon Tart',
          description: 'Buttery pastry shell filled with silky lemon curd and torched meringue',
          price: 12,
          dietary: ['vegetarian'],
          prepTime: '8 min',
        },
      ],
    },
  ];

  const getDietaryIcon = (dietary: string) => {
    switch (dietary) {
      case 'vegetarian':
        return <Leaf className="h-3 w-3 text-green-600" />;
      case 'vegan':
        return <Leaf className="h-3 w-3 text-green-700" />;
      case 'gluten-free':
        return <span className="text-xs font-medium text-blue-600">GF</span>;
      case 'spicy':
        return <Flame className="h-3 w-3 text-red-500" />;
      default:
        return null;
    }
  };

  const currentCategory = menuCategories.find(cat => cat.id === selectedCategory);

  return (
    <section id="restaurant-menu" className="bg-background py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            <span data-editable="menu-title">Our Menu</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            <span data-editable="menu-subtitle">
              Discover our carefully curated selection of dishes, prepared with passion and the
              finest seasonal ingredients
            </span>
          </p>
        </div>

        {/* Menu Navigation */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-muted">
            {menuCategories.map(category => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="text-sm sm:text-base font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <span data-editable={`category-${category.id}`}>{category.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Category Description */}
          {currentCategory && (
            <div className="text-center mb-8">
              <p className="text-muted-foreground text-lg">
                <span data-editable={`category-desc-${currentCategory.id}`}>
                  {currentCategory.description}
                </span>
              </p>
            </div>
          )}

          {/* Menu Items */}
          {menuCategories.map(category => (
            <TabsContent key={category.id} value={category.id} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {category.items.map(item => (
                  <Card
                    key={item.id}
                    className="bg-card text-card-foreground border-border hover:shadow-lg transition-shadow duration-300"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <CardTitle className="text-xl font-semibold">
                              <span data-editable={`item-name-${item.id}`}>{item.name}</span>
                            </CardTitle>
                            {item.popular && (
                              <Badge
                                variant="secondary"
                                className="bg-accent text-accent-foreground"
                              >
                                <Star className="h-3 w-3 mr-1 fill-current" />
                                Popular
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-2xl font-bold text-primary">${item.price}</span>
                            {item.prepTime && (
                              <div className="flex items-center gap-1 text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                <span className="text-xs">{item.prepTime}</span>
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            {item.dietary.map(diet => (
                              <div key={diet} className="flex items-center gap-1">
                                {getDietaryIcon(diet)}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <CardDescription className="text-muted-foreground text-sm leading-relaxed mb-4">
                        <span data-editable={`item-desc-${item.id}`}>{item.description}</span>
                      </CardDescription>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        Add to Order
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <Separator className="my-12 bg-border" />

        {/* Menu Footer */}
        <div className="text-center">
          <p className="text-muted-foreground mb-4">
            <span data-editable="menu-footer-text">
              All dishes are prepared fresh to order. Please inform us of any allergies or dietary
              requirements.
            </span>
          </p>
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3"
          >
            <span data-editable="view-full-menu-text">View Full Menu & Wine List</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
