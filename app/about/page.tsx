import { Users, Target, Award, Zap, Car, Calendar, Globe, TrendingUp } from 'lucide-react';
import Image from 'next/image';

export default function AboutPage() {
  const features = [
    {
      icon: Target,
      title: 'Expert Reviews',
      description: 'In-depth analysis of the latest vehicles from industry professionals with over a decade of experience'
    },
    {
      icon: Zap,
      title: 'Latest Technology',
      description: 'Comprehensive coverage of cutting-edge automotive technology, from electric powertrains to autonomous driving'
    },
    {
      icon: Award,
      title: 'Trusted Content',
      description: 'Reliable and unbiased automotive news, reviews, and insights backed by rigorous testing and analysis'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Connect with fellow car enthusiasts, share experiences, and join discussions about automotive trends'
    }
  ];

  const stats = [
    { icon: Car, label: 'Cars Reviewed', value: '500+' },
    { icon: Users, label: 'Monthly Readers', value: '50K+' },
    { icon: Calendar, label: 'Years Experience', value: '10+' },
    { icon: Globe, label: 'Countries Covered', value: '25+' }
  ];

  const teamMembers = [
    {
      name: 'Alex Johnson',
      role: 'Chief Editor & Founder',
      specialty: 'Electric Vehicles & Sustainability',
      experience: '12 years',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    {
      name: 'Sarah Chen',
      role: 'Senior Automotive Journalist',
      specialty: 'Luxury & Performance Cars',
      experience: '8 years',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Technical Reviewer',
      specialty: 'SUVs & Off-Road Vehicles',
      experience: '10 years',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">About CarBlog</h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-8">
              Your trusted source for automotive insights, reviews, and the latest industry trends. 
              we are  passionate about cars and committed to helping you make informed decisions.
            </p>
            <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden mb-8">
              <Image
                src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&h=600&fit=crop"
                alt="Modern car showroom"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  Driving the Future of Automotive Journalism
                </h2>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="bg-slate-900 rounded-lg p-6 text-center">
                <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-slate-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="bg-slate-900 rounded-lg p-8 mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-semibold text-white mb-6">Our Mission</h2>
                <p className="text-slate-300 text-lg leading-relaxed mb-6">
                  At CarBlog, we are passionate about automobiles and committed to providing our readers with 
                  comprehensive, unbiased, and engaging automotive content. Whether you are a seasoned car 
                  enthusiast or just starting your automotive journey, we are  here to guide you through the 
                  exciting world of cars.
                </p>
                <p className="text-slate-300 text-lg leading-relaxed">
                  Our team of automotive experts and writers brings you the latest news, detailed reviews, 
                  maintenance tips, and industry insights to help you make informed decisions about your 
                  next vehicle purchase.
                </p>
              </div>
              <div className="relative h-64 lg:h-80 rounded-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop"
                  alt="Car testing and review process"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-semibold text-white mb-8 text-center">What We Cover</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-slate-800 rounded-lg p-6 hover:bg-slate-700 transition-colors">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mr-4">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                  </div>
                  <p className="text-slate-400 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 rounded-lg p-8 mb-16">
            <h2 className="text-3xl font-semibold text-white mb-8 text-center">Topics We Cover</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-red-400 mb-4">Vehicle Reviews</h3>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                    Electric vehicle reviews and comparisons
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                    Luxury car assessments and features
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                    SUV and crossover evaluations
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                    Sports car performance analysis
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-red-400 mb-4">Automotive Technology</h3>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                    Autonomous driving developments
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                    Electric vehicle technology advances
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                    Safety innovations and testing
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                    Infotainment and connectivity systems
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-red-400 mb-4">Maintenance & Care</h3>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                    Regular maintenance schedules
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                    DIY repair guides and tutorials
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                    Car care tips and best practices
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                    Troubleshooting common issues
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-red-400 mb-4">Industry News</h3>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                    Market trends and analysis
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                    New model announcements
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                    Industry partnerships and mergers
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                    Regulatory changes and impact
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-semibold text-white mb-8 text-center">Meet Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="bg-slate-800 rounded-lg p-6 text-center hover:bg-slate-700 transition-colors">
                  <div className="relative w-24 h-24 mx-auto mb-4">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{member.name}</h3>
                  <p className="text-red-400 font-medium mb-2">{member.role}</p>
                  <p className="text-slate-400 text-sm mb-2">{member.specialty}</p>
                  <p className="text-slate-500 text-xs">{member.experience} experience</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div className="bg-slate-800 rounded-lg p-8">
            <h2 className="text-3xl font-semibold text-white mb-6 text-center">Our Tech Stack</h2>
            <p className="text-slate-300 mb-8 text-center max-w-3xl mx-auto">
              This website is built with modern web technologies to ensure fast performance, 
              excellent user experience, and scalability. We leverage the latest tools and frameworks 
              to deliver content efficiently and maintain high standards of web development.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
                'Next.js 13',
                'TypeScript',
                'Tailwind CSS',
                'React',
              ].map((tech) => (
                <div key={tech} className="bg-slate-700 rounded-lg p-4 text-center hover:bg-slate-600 transition-colors">
                  <span className="text-slate-300 font-medium">{tech}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}