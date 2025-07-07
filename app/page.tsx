import { Hero } from '@/components/Hero';
import { BlogCard } from '@/components/BlogCard';
import { CategorySection } from '@/components/CategorySection';
import { fetchPosts, fetchUsers } from '@/lib/api';
import { getCarImageUrl, getCarCategory, getReadTime } from '@/lib/utils';
import { BlogPost } from '@/types';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function Home() {
  let latestPosts: BlogPost[] = [];
  let trendingPosts: BlogPost[] = [];
  let error: string | null = null;

  try {
    const [posts, users] = await Promise.all([
      fetchPosts(),
      fetchUsers()
    ]);

    const userMap = new Map(users.map((user: any) => [user.id, user]));
    
    const blogPosts: BlogPost[] = posts.map((post: any, index: number) => ({
      ...post,
      user: userMap.get(post.userId)!,
      imageUrl: getCarImageUrl(post.id),
      category: getCarCategory(index),
      readTime: getReadTime(post.body),
      publishedAt: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1)
        .toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }));

    latestPosts = blogPosts.slice(0, 4);
    trendingPosts = blogPosts.slice(6, 10);
  } catch (err) {
    error = 'Failed to load blog posts';
    console.error('Error fetching posts:', err);
  }

  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <section className="dark-section spacing-responsive">
        <div className="container mx-auto container-responsive">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 lg:mb-12 space-y-4 sm:space-y-0">
            <div>
              <h2 className="text-responsive-lg font-bold text-white mb-2 lg:mb-4">Latest Posts</h2>
              <p className="text-slate-400 text-sm lg:text-base">Stay updated with the newest automotive content</p>
            </div>
            <Link href="/blog">
              <Button variant="outline" className="border-slate-700 text-black hover:bg-slate-800 hover:text-white text-sm lg:text-base">
                View All
              </Button>
            </Link>
          </div>

          {error ? (
            <div className="text-center py-8 lg:py-12">
              <p className="text-red-400 text-base lg:text-lg">{error}</p>
            </div>
          ) : (
            <div className="responsive-grid">
              {latestPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>
      <section className="bg-slate-900 spacing-responsive">
        <div className="container mx-auto container-responsive">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 lg:mb-12 space-y-4 sm:space-y-0">
            <div>
              <h2 className="text-responsive-lg font-bold text-white mb-2 lg:mb-4">Trending Posts</h2>
              <p className="text-slate-400 text-sm lg:text-base">Most popular automotive stories this week</p>
            </div>
            <Link href="/blog">
              <Button variant="outline" className="border-slate-700 text-black hover:bg-slate-800 hover:text-white text-sm lg:text-base">
                View All
              </Button>
            </Link>
          </div>

          {!error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {trendingPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>

      <CategorySection />
    </div>
  );
}