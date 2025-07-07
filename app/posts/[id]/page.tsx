import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, User, Clock, Tag, Mail, Calendar, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CarSpecs } from '@/components/CarSpecs';
import { fetchPost, fetchUser, fetchPosts } from '@/lib/api';
import { getCarImageUrl, getCarCategory, getReadTime } from '@/lib/utils';
import { CarSpecs as CarSpecsType } from '@/types';

interface PostPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  try {
    const posts = await fetchPosts();
    return posts.map((post: any) => ({
      id: post.id.toString(),
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params;
  
  let post: any = null;
  let user: any = null;
  let error: string | null = null;

  try {
    post = await fetchPost(id);
    user = await fetchUser(post.userId);
  } catch (err) {
    console.error('Error fetching post:', err);
    error = 'Failed to load post';
  }

  if (error || !post) {
    notFound();
  }

  const imageUrl = getCarImageUrl(post.id);
  const category = getCarCategory(post.id);
  const readTime = getReadTime(post.body);
  const publishedAt = new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1)
    .toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const getCarSpecsByCategory = (category: string): CarSpecsType => {
    const specs: Record<string, CarSpecsType> = {
      Electric: {
        modelYear: '2024',
        fuelType: 'Electric',
        topSpeed: '155 mph',
        price: '$45,000 - $85,000',
        engine: 'Dual Motor Electric',
        transmission: 'Single-Speed Automatic'
      },
      Luxury: {
        modelYear: '2024',
        fuelType: 'Premium Gasoline',
        topSpeed: '180 mph',
        price: '$75,000 - $150,000',
        engine: 'V8 4.0L Twin-Turbo',
        transmission: '8-Speed Automatic'
      },
      SUV: {
        modelYear: '2024',
        fuelType: 'Gasoline',
        topSpeed: '130 mph',
        price: '$35,000 - $65,000',
        engine: 'V6 3.5L',
        transmission: 'AWD 9-Speed Automatic'
      },
      Sports: {
        modelYear: '2024',
        fuelType: 'Premium Gasoline',
        topSpeed: '200 mph',
        price: '$60,000 - $120,000',
        engine: 'V8 5.0L Supercharged',
        transmission: '6-Speed Manual'
      },
      default: {
        modelYear: '2024',
        fuelType: 'Gasoline',
        topSpeed: '140 mph',
        price: '$25,000 - $45,000',
        engine: 'I4 2.0L Turbo',
        transmission: '8-Speed CVT'
      }
    };
    return specs[category] || specs.default;
  };

  const carSpecs = getCarSpecsByCategory(category);
  const getEnhancedContent = (originalBody: string, category: string) => {
    const categoryContent: Record<string, string> = {
      Electric: `
        The automotive industry is experiencing a revolutionary shift towards electric mobility, and this comprehensive review explores the cutting-edge technology that's reshaping our roads. ${originalBody}
        
        Electric vehicles represent more than just an alternative to traditional combustion engines – they embody a complete reimagining of what personal transportation can be. With instant torque delivery, whisper-quiet operation, and zero local emissions, these vehicles offer a driving experience that's both exhilarating and environmentally conscious.
        
        The latest generation of electric vehicles features advanced battery technology that delivers impressive range capabilities, often exceeding 300 miles on a single charge. Fast-charging infrastructure continues to expand globally, making long-distance travel more convenient than ever before.
        
        From a performance perspective, electric motors provide immediate power delivery, resulting in acceleration that often surpasses traditional sports cars. The low center of gravity, thanks to floor-mounted battery packs, contributes to exceptional handling characteristics and overall driving dynamics.
      `,
      Luxury: `
        Luxury automotive excellence reaches new heights in this detailed examination of premium craftsmanship and innovative technology. ${originalBody}
        
        The world of luxury automobiles represents the pinnacle of automotive engineering, where every detail is meticulously crafted to provide an unparalleled driving experience. From hand-stitched leather interiors to precision-engineered powertrains, these vehicles showcase the finest materials and most advanced technologies available.
        
        Modern luxury vehicles seamlessly blend traditional craftsmanship with cutting-edge innovation. Advanced driver assistance systems, premium audio experiences, and climate control technologies create a sanctuary of comfort and convenience.
        
        The attention to detail extends beyond mere aesthetics – luxury vehicles often pioneer safety technologies and performance innovations that eventually make their way to mainstream automotive markets, setting new standards for the entire industry.
      `,
      SUV: `
        Sport Utility Vehicles continue to dominate the automotive landscape, offering versatility and capability that appeals to modern families and adventure seekers alike. ${originalBody}
        
        Today's SUVs represent a perfect balance of practicality, comfort, and performance. With spacious interiors, advanced all-wheel-drive systems, and impressive towing capabilities, these vehicles are designed to handle everything from daily commutes to weekend adventures.
        
        Modern SUV design emphasizes both form and function, featuring aerodynamic profiles that improve fuel efficiency without compromising the commanding road presence that drivers expect. Advanced suspension systems provide smooth on-road comfort while maintaining off-road capability.
        
        Safety remains a top priority, with comprehensive airbag systems, advanced collision avoidance technology, and robust construction designed to protect occupants in various driving scenarios.
      `,
      Sports: `
        Performance engineering reaches its zenith in this exploration of automotive excellence designed for pure driving pleasure. ${originalBody}
        
        Sports cars represent the ultimate expression of automotive passion, where every component is optimized for performance, handling, and driver engagement. These machines are built for those who understand that driving is more than transportation – it's an art form.
        
        Advanced aerodynamics, lightweight construction materials, and precision-tuned suspension systems work in harmony to deliver exceptional performance on both road and track. High-performance braking systems ensure that stopping power matches acceleration capabilities.
        
        The driving experience is enhanced by sport-tuned steering systems, performance-oriented seating, and driver-focused cockpit designs that put all essential controls within easy reach while maintaining an unobstructed view of the road ahead.
      `,
      default: `
        This comprehensive automotive review explores the features and capabilities that make this vehicle an excellent choice for today's drivers. ${originalBody}
        
        Modern automotive engineering focuses on delivering reliable, efficient, and safe transportation that meets the diverse needs of contemporary drivers. Advanced manufacturing techniques and quality control processes ensure long-lasting performance and dependability.
        
        Fuel efficiency remains a key consideration, with advanced engine technologies and aerodynamic designs working together to maximize miles per gallon without sacrificing performance or comfort.
        
        Comprehensive warranty coverage and extensive dealer networks provide peace of mind and convenient service access, making ownership a worry-free experience for drivers and their families.
      `
    };
    
    return categoryContent[category] || categoryContent.default;
  };

  const enhancedContent = getEnhancedContent(post.body, category);

  return (
    <div className="min-h-screen bg-slate-950 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link href="/blog">
            <Button variant="ghost" className="mb-8 text-slate-300 hover:text-white hover:bg-slate-800">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
          <article className="bg-slate-900 rounded-lg overflow-hidden shadow-xl">
            <div className="relative">
              <Image
                src={imageUrl}
                alt={post.title}
                width={1200}
                height={600}
                className="w-full h-64 md:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-500 text-white">
                    <Tag className="w-4 h-4 mr-1" />
                    {category}
                  </span>
                  <div className="flex items-center space-x-4 text-white text-sm">
                    <div className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{Math.floor(Math.random() * 5000) + 1000} views</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 mb-8 text-slate-400">
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span className="font-medium text-white">{user.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-5 h-5" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span>{readTime}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>{publishedAt}</span>
                </div>
              </div>

              <div className="prose prose-invert max-w-none">
                <div className="text-slate-300 text-lg leading-relaxed space-y-6">
                  {enhancedContent.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-6">
                      {paragraph.trim()}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </article>
          <div className="mt-8">
            <CarSpecs specs={carSpecs} />
          </div>
          <div className="mt-8 bg-slate-900 rounded-lg p-8">
            <h3 className="text-2xl font-semibold text-white mb-6">About the Author</h3>
            <div className="flex items-start space-x-6">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-xl">
                  {user.name.charAt(0)}
                </span>
              </div>
              <div className="flex-1">
                <h4 className="text-xl font-semibold text-white mb-2">{user.name}</h4>
                <p className="text-red-400 mb-3">{user.email}</p>
                <p className="text-slate-300 leading-relaxed">
                  {user.name} is a seasoned automotive journalist with over 10 years of experience in the industry. 
                  Specializing in {category.toLowerCase()} vehicles, they have driven and reviewed hundreds of cars, 
                  providing readers with honest, detailed insights into the latest automotive trends and technologies. 
                  Their expertise spans from performance testing to sustainability analysis, making them a trusted voice 
                  in the automotive community.
                </p>
                <div className="mt-4 flex items-center space-x-4 text-sm text-slate-400">
                  <span>• 500+ Reviews Published</span>
                  <span>• Industry Expert Since 2014</span>
                  <span>• {category} Specialist</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 bg-slate-800 rounded-lg p-8">
            <h3 className="text-2xl font-semibold text-white mb-6">You Might Also Like</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-700 rounded-lg p-4 hover:bg-slate-600 transition-colors cursor-pointer">
                <h4 className="text-white font-semibold mb-2">Latest {category} Technology Trends</h4>
                <p className="text-slate-400 text-sm">Discover the cutting-edge innovations shaping the future of {category.toLowerCase()} vehicles.</p>
              </div>
              <div className="bg-slate-700 rounded-lg p-4 hover:bg-slate-600 transition-colors cursor-pointer">
                <h4 className="text-white font-semibold mb-2">Best {category} Cars of 2024</h4>
                <p className="text-slate-400 text-sm">Our comprehensive guide to the top {category.toLowerCase()} vehicles available this year.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}