import { Car, Zap, Crown, Truck } from 'lucide-react';
import Link from 'next/link';

export function CategorySection() {
  const categories = [
    {
      icon: Zap,
      name: 'Electric',
      slug: 'electric',
      description: 'Latest electric vehicle reviews and technology insights',
      color: 'text-green-400',
      bgColor: 'bg-green-500',
      hoverColor: 'hover:bg-green-600',
      image: 'https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=400&h=300&fit=crop'
    },
    {
      icon: Crown,
      name: 'Luxury',
      slug: 'luxury',
      description: 'Premium vehicles and high-end automotive experiences',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500',
      hoverColor: 'hover:bg-yellow-600',
      image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=300&fit=crop'
    },
    {
      icon: Car,
      name: 'Sports',
      slug: 'sports',
      description: 'High-performance sports cars and racing technology',
      color: 'text-red-400',
      bgColor: 'bg-red-500',
      hoverColor: 'hover:bg-red-600',
      image: 'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?w=400&h=300&fit=crop'
    },
    {
      icon: Truck,
      name: 'SUV',
      slug: 'suv',
      description: 'Sport utility vehicles and off-road capabilities',
      color: 'text-blue-400',
      bgColor: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600',
      image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400&h=300&fit=crop'
    }
  ];

  return (
    <section className="py-16 bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Car Categories</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Explore our comprehensive collection of automotive content across different vehicle categories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link key={category.name} href={`/category/${category.slug}`}>
              <div className="group cursor-pointer">
                <div className="relative bg-slate-800 rounded-lg overflow-hidden hover:bg-slate-700 transition-all duration-300 hover:scale-105 hover:shadow-xl">

                  <div 
                    className="h-48 bg-cover bg-center"
                    style={{ backgroundImage: `url(${category.image})` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent"></div>
                  </div>
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <div className={`w-12 h-12 ${category.bgColor} ${category.hoverColor} rounded-lg flex items-center justify-center mb-4 transition-colors`}>
                      <category.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-red-400 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-red-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}