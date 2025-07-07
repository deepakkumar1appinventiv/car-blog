'use client';

import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { BlogCard } from './BlogCard';
import { fetchPosts, fetchUsers } from '@/lib/api';
import { debounce, getCarImageUrl, getCarCategory, getReadTime } from '@/lib/utils';
import { BlogPost } from '@/types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const loadPosts = async () => {
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

        setAllPosts(blogPosts);
      } catch (error) {
        console.error('Error loading posts:', error);
      }
    };

    if (isOpen && allPosts.length === 0) {
      loadPosts();
    }
  }, [isOpen, allPosts.length]);

  const debouncedSearch = debounce((term: string) => {
    setIsLoading(true);
    
    if (term.trim() === '') {
      setSearchResults([]);
      setIsLoading(false);
      return;
    }

    const filteredPosts = allPosts.filter(post =>
      post.title.toLowerCase().includes(term.toLowerCase()) ||
      post.body.toLowerCase().includes(term.toLowerCase()) ||
      post.category.toLowerCase().includes(term.toLowerCase())
    );

    setSearchResults(filteredPosts.slice(0, 6));
    setIsLoading(false);
  }, 300);

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm, debouncedSearch]);

  const handleClose = () => {
    setSearchTerm('');
    setSearchResults([]);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-slate-900 border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-white">Search Car Blog Posts</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              type="text"
              placeholder="Search for car reviews, tips, and more..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-slate-800 border-slate-700 text-white placeholder-slate-400"
              autoFocus
            />
          </div>

          {isLoading && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500 mx-auto"></div>
              <p className="text-slate-400 mt-2">Searching...</p>
            </div>
          )}

          {searchResults.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map((post) => (
                <div key={post.id} onClick={handleClose}>
                  <BlogCard post={post} />
                </div>
              ))}
            </div>
          )}

          {searchTerm && !isLoading && searchResults.length === 0 && (
            <div className="text-center py-8">
              <p className="text-slate-400">No results found for "{searchTerm}"</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}