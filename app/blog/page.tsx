'use client';

import { useState, useEffect, useCallback } from 'react'; // Added useCallback
import { BlogCard } from '@/components/BlogCard';
import { fetchPosts, fetchUsers } from '@/lib/api';
import { getCarImageUrl, getCarCategory, getReadTime } from '@/lib/utils';
import { BlogPost } from '@/types';
import { Button } from '@/components/ui/button';
import { Car, Zap, Crown, Truck, Grid, List, Loader2 } from 'lucide-react'; // Added Loader2 for load more button

const categories = [
  { name: 'All', value: 'all', icon: Grid },
  { name: 'Electric', value: 'electric', icon: Zap },
  { name: 'Luxury', value: 'luxury', icon: Crown },
  { name: 'Sports', value: 'sports', icon: Car },
  { name: 'SUV', value: 'suv', icon: Truck }
];

const POSTS_PER_PAGE = 8; 

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [displayedPosts, setDisplayedPosts] = useState<BlogPost[]>([]); 
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false); 
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1); 

  const processPosts = useCallback((postsData: any[], users: any[]) => {
    const userMap = new Map(users.map((user: any) => [user.id, user]));

    return postsData.map((post: any, index: number) => ({
      ...post,
      user: userMap.get(post.userId)!,
      imageUrl: getCarImageUrl(post.id),
      category: getCarCategory(post.id + index), 
      readTime: getReadTime(post.body),
      publishedAt: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1)
        .toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }));
  }, []);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        setError(null); 
        const [postsData, users] = await Promise.all([
          fetchPosts(),
          fetchUsers()
        ]);

        const blogPosts: BlogPost[] = processPosts(postsData, users);
        setPosts(blogPosts);
        setFilteredPosts(blogPosts);
        setDisplayedPosts(blogPosts.slice(0, POSTS_PER_PAGE));
        setPage(1); 
      } catch (err) {
        setError('Failed to load blog posts. Please try again later.');
        console.error('Error fetching posts:', err);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [processPosts]); 
  useEffect(() => {
    const filtered = selectedCategory === 'all'
      ? posts
      : posts.filter(post =>
          post.category.toLowerCase() === selectedCategory.toLowerCase()
        );
    setFilteredPosts(filtered);
    setDisplayedPosts(filtered.slice(0, POSTS_PER_PAGE)); 
    setPage(1); 
  }, [selectedCategory, posts]);

 
  const handleLoadMore = () => {
    setLoadingMore(true);
    const nextPage = page + 1;
    const startIndex = (nextPage - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;
    const newPostsToShow = filteredPosts.slice(startIndex, endIndex);

    setTimeout(() => { 
      setDisplayedPosts(prev => [...prev, ...newPostsToShow]);
      setPage(nextPage);
      setLoadingMore(false);
    }, 500);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };
  const hasMorePosts = displayedPosts.length < filteredPosts.length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 spacing-responsive flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-slate-300">Loading car blog posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 spacing-responsive text-white"> 
      <div className="container mx-auto container-responsive">
        <div className="text-center mb-8 lg:mb-12">
          <h1 className="text-responsive-xl font-bold text-white mb-4">Car Blog</h1> 
          <p className="text-slate-400 max-w-2xl mx-auto text-sm lg:text-base"> 
            Discover comprehensive automotive content, from detailed reviews to industry insights
          </p>
        </div>

        <div className="mb-8 lg:mb-12">
          <div className="flex flex-wrap justify-center gap-3 lg:gap-4">
            {categories.map((category) => (
              <Button
                key={category.value}
                variant={selectedCategory === category.value ? "default" : "outline"}
                onClick={() => handleCategoryChange(category.value)}
                className={`flex items-center space-x-2 text-sm lg:text-base ${
                  selectedCategory === category.value
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'border-slate-700 text-black hover:bg-slate-800 hover:text-white'
                }`}
              >
                <category.icon className="w-4 h-4" />
                <span>{category.name}</span>
                {category.value !== 'all' && (
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    selectedCategory === category.value
                      ? 'bg-red-600'
                      : 'bg-slate-700 text-slate-400' 
                  }`}>
                    {posts.filter(post => post.category.toLowerCase() === category.value.toLowerCase()).length}
                  </span>
                )}
              </Button>
            ))}
          </div>
        </div>

        <div className="mb-6 lg:mb-8">
          <p className="text-slate-400 text-center text-sm lg:text-base">
            {selectedCategory === 'all'
              ? `Showing ${displayedPosts.length} of ${filteredPosts.length} articles` 
              : `Found ${filteredPosts.length} ${selectedCategory} ${filteredPosts.length === 1 ? 'article' : 'articles'} (showing ${displayedPosts.length})` 
            }
          </p>
        </div>

        {error ? (
          <div className="text-center py-8 lg:py-12">
            <p className="text-red-400 text-base lg:text-lg">{error}</p> 
          </div>
        ) : displayedPosts.length > 0 ? ( 
          <>
            <div className="responsive-grid">
              {displayedPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
            {hasMorePosts && ( 
              <div className="text-center mt-10">
                <Button
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 text-base"
                >
                  {loadingMore ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    'Load More Posts'
                  )}
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-8 lg:py-12">
            <div className="w-16 h-16 bg-slate-700 rounded-lg flex items-center justify-center mx-auto mb-4"> 
              <List className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2"> 
              No {selectedCategory === 'all' ? '' : selectedCategory} articles found
            </h3>
            <p className="text-slate-400 mb-6 text-sm lg:text-base"> 
              {selectedCategory === 'all'
                ? "We're working on bringing you the latest automotive content."
                : `No ${selectedCategory} articles available at the moment. Try Browse other categories.`
              }
            </p>
            {selectedCategory !== 'all' && (
              <Button
                onClick={() => handleCategoryChange('all')}
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                View All Articles
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}