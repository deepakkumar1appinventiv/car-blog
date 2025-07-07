import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative min-h-[70vh] sm:min-h-[60vh] md:min-h-[50vh] flex items-center justify-center overflow-hidden bg-gray-900">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1920&h=1080&fit=crop")',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/70 to-transparent"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
            Our Journey
            <br />
            <span className="text-red-500"> Our Car</span>
            <br />
            Our Way
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Discover the latest automotive trends, expert reviews, and comprehensive guides 
            to help you make the perfect choice for your next vehicle.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/blog">
              <Button 
                size="lg" 
                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-4 text-lg rounded-full transition-colors duration-300"
              >
                Explore Blog
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            
            <Link href="/about">
              <Button 
                variant="outline" 
                size="lg" 
                className="border-gray-300 text-black hover:bg-gray-800 hover:text-white font-semibold px-8 py-4 text-lg rounded-full transition-colors duration-300"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}