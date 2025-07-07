'use client';

import Link from 'next/link';
import { Facebook, Twitter, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Footer() {
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for subscribing to our newsletter!');
  };

  const categories = [
    { name: 'Electric Cars', slug: 'electric' },
    { name: 'Luxury Vehicles', slug: 'luxury' },
    { name: 'SUVs', slug: 'suv' },
    { name: 'Sports Cars', slug: 'sports' }
  ];

  return (
    <footer className="dark-section">
      <div className="container mx-auto container-responsive spacing-responsive">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <span className="text-white font-bold text-xl">CarBlog</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Your ultimate destination for automotive insights, reviews, and the latest car trends.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-slate-800">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-slate-800">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-slate-800">
                <Instagram className="h-5 w-5" />
              </Button>
            </div>
          </div>

      
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-slate-400 hover:text-white transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-slate-400 hover:text-white transition-colors text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-400 hover:text-white transition-colors text-sm">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-400 hover:text-white transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Categories</h3>
            <ul className="space-y-3">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link 
                    href={`/category/${category.slug}`} 
                    className="text-slate-400 hover:text-white hover:text-red-400 transition-colors text-sm group"
                  >
                    <span className="group-hover:underline">{category.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Newsletter</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Subscribe to our newsletter to get latest updates and car news.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-slate-800 border-slate-700 text-white placeholder-slate-400 text-sm"
                required
              />
              <Button type="submit" className="w-full bg-red-500 hover:bg-red-600 text-white text-sm">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 text-center">
          <p className="text-slate-400 text-sm">&copy; 2024 CarBlog. All rights reserved.
            Devepoled by Deepak Kumar
          </p>
        </div>
      </div>
    </footer>
  );
}