import { BlogCard } from '@/components/BlogCard';
import { fetchPosts, fetchUsers } from '@/lib/api';
import { getCarImageUrl, getCarCategory, getReadTime } from '@/lib/utils';
import { BlogPost } from '@/types';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Car, Zap, Crown, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

const categoryInfo = {
  electric: {
    name: 'Electric',
    icon: Zap,
    description: 'Discover the latest electric vehicle reviews, technology insights, and sustainable mobility solutions',
    color: 'text-green-400',
    bgColor: 'bg-green-500',
    image: 'https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=1200&h=400&fit=crop'
  },
  luxury: {
    name: 'Luxury',
    icon: Crown,
    description: 'Explore premium vehicles, high-end automotive experiences, and luxury car reviews',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500',
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&h=400&fit=crop'
  },
  sports: {
    name: 'Sports',
    icon: Car,
    description: 'High-performance sports cars, racing technology, and adrenaline-fueled automotive content',
    color: 'text-red-400',
    bgColor: 'bg-red-500',
    image: 'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?w=1200&h=400&fit=crop'
  },
  suv: {
    name: 'SUV',
    icon: Truck,
    description: 'Sport utility vehicles, off-road capabilities, and family-friendly automotive solutions',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500',
    image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=1200&h=400&fit=crop'
  }
};

export async function generateStaticParams() {
  return [
    { slug: 'electric' },
    { slug: 'luxury' },
    { slug: 'sports' },
    { slug: 'suv' }
  ];
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const category = categoryInfo[params.slug as keyof typeof categoryInfo];
  
  if (!category) {
    notFound();
  }

  let posts: BlogPost[] = [];
  let error: string | null = null;

  try {
    const [postsData, users] = await Promise.all([
      fetchPosts(),
      fetchUsers()
    ]);

    const userMap = new Map(users.map((user: any) => [user.id, user]));
    
    const allPosts: BlogPost[] = postsData.map((post: any, index: number) => ({
      ...post,
      user: userMap.get(post.userId)!,
      imageUrl: getCarImageUrl(post.id),
      category: getCarCategory(index),
      readTime: getReadTime(post.body),
      publishedAt: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1)
        .toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }));
    posts = allPosts.filter(post => 
      post.category.toLowerCase() === category.name.toLowerCase()
    );

  } catch (err) {
    error = 'Failed to load blog posts';
    console.error('Error fetching posts:', err);
  }

  return (
    <div className="min-h-screen bg-slate-950 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/">
          <Button variant="ghost" className="mb-8 text-black hover:text-white hover:bg-slate-800">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>
        <div className="relative mb-12 rounded-lg overflow-hidden">
          <div 
            className="h-64 md:h-80 bg-cover bg-center"
            style={{ backgroundImage: `url(${category.image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/50"></div>
            <div className="relative z-10 h-full flex items-center">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl">
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 ${category.bgColor} rounded-lg flex items-center justify-center mr-4`}>
                      <category.icon className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white">
                      {category.name} Cars
                    </h1>
                  </div>
                  <p className="text-xl text-slate-300 leading-relaxed">
                    {category.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Posts Count */}
        <div className="mb-8">
          <p className="text-slate-400">
            Found {posts.length} {category.name.toLowerCase()} car {posts.length === 1 ? 'article' : 'articles'}
          </p>
        </div>

        {/* Posts Grid */}
        {error ? (
          <div className="text-center py-12">
            <p className="text-red-400 text-lg">{error}</p>
          </div>
        ) : posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className={`w-16 h-16 ${category.bgColor} rounded-lg flex items-center justify-center mx-auto mb-4`}>
              <category.icon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No {category.name} Articles Yet</h3>
            <p className="text-slate-400 mb-6">
              We are working on bringing you the latest {category.name.toLowerCase()} car content. Check back soon!
            </p>
            <Link href="/blog">
              <Button className={`${category.bgColor} hover:opacity-90 text-white`}>
                Browse All Articles
              </Button>
            </Link>
          </div>
        )}

        {posts.length > 0 && (
          <div className="mt-16 bg-slate-900 rounded-lg p-8">
            <h2 className="text-2xl font-semibold text-white mb-6">
              {category.name} Category Insights
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">{posts.length}</div>
                <div className="text-slate-400">Articles Published</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">
                  {Math.round(posts.reduce((acc, post) => acc + parseInt(post.readTime), 0) / posts.length)}
                </div>
                <div className="text-slate-400">Avg. Read Time (min)</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">
                  {new Set(posts.map(post => post.user.name)).size}
                </div>
                <div className="text-slate-400">Expert Authors</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}